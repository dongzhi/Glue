/*---load modules---*/
// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

var fs = require('fs-plus');
var path = require('path');

//public variables
var startTime;
var drag = null, dPoint, resizeid = null,pointer_slider = null;
var dash = null, tempLine = [];
var canvas;
var modified = false;
var windowTitle;
var WIDTH, HEIGHT;
var stageWIDTH = 6000, stageHEIGHT = 4000;

//elements
var ele = [];

//connection
var connections = {};

//sizes
var sizes = {};

//db
var db = {};

var tempFile = null,fileName,filePath;

//menu status
var addState = false;

//this window
var thisWindow = gui.Window.get();
//loading page settings
var loadSettings = thisWindow.loadSettings;

//require jquery from node results in sharing $
//window.$ = window.jQuery = require('./js/lib/jquery');


var scriptToLoad = [
  './js/app/board.js',
  './js/app/output.js',
  './js/app/fx.js'
]

//hardware layer
var Readable = require("stream").Readable;
var util = require("util");
util.inherits(MyStream, Readable);
function MyStream(opt) {
  Readable.call(this, opt);
}

MyStream.prototype._read = function() {};
// hook in our stream
process.__defineGetter__("stdin", function() {
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});

var five = require("johnny-five");
var aboard = null;

// serialport
var serialPort = require("johnny-five/node_modules/serialport");
var sPorts = [];
var allboards = [];

//timers
var timerdb = {};
var timeoutdb = {};
var sensordb = {};

//led matrix
var outputdb = {};

//server
if(global.io){
  global.io.close();
  global.io = null;
}

var io = require('socket.io')(global.server);
global.io = io;

var phones = [];

io.on('connection', function (socket) {
  socket.on('getpv', function (data) {
    socket.emit('phone', phones);
  });

  socket.on('setValue', function (data) {
    for(var i=0;i<phones.length;i++){
      if(phones[i].id === data.tid){
        var con = phones[i].content;
        for(var j=0;j<con.length;j++){
          if(con[j].id === data.id){
            if(data.fx==='slider'){
              con[j].value = data.val;
              sandbox[data.id].val = data.val;
            }else if(data.fx==='matrix'){
              con[j].value[0] = data.val;
              con[j].value[1][con[j].value[0][0]][con[j].value[0][1]] = con[j].value[0][2];
              sandbox[data.id].val = con[j].value;
            }

            sandbox.loop(2); //escape phoneblock
          }
        }
      }
    }
    socket.broadcast.emit('phone', phones);
  });
});

///////////////////////////////

$( document ).ready(function() {

  try {
    startTime = Date.now();


    var cacheDir = path.join(process.env.GLUE_HOME, 'compile-cache');

    //check if cacheDir exists
    if(!fs.existsSync(cacheDir)){
      try {
        fs.mkdirSync(cacheDir, 0766);
      } catch (error){
        console.error("Failed to create cacheDir :/");
        throw error;
      }
    }

    //set up database
    if(loadSettings.pathToOpen){

      filePath = path.normalize(loadSettings.initialPath);
      fileName = filePath.split('/').pop();
      tempFile = filePath;
      document.title = windowTitle = fileName + ' - ' + getPath(filePath) + ' - Glue';

      //load json data
      try{
        db = fs.readFileSync(filePath, 'utf8');
        db = JSON.parse(db);
      }catch(error){
        console.error("Failed to load file: " + error);
        throw error;
      }

    }else{
      filePath = path.normalize(loadSettings.initialPath);
      fileName = 'Untitled';
      tempFile = filePath;
      document.title = windowTitle = fileName + ' - Glue';

      //load json data
      try{
        db = fs.readFileSync(filePath, 'utf8');
        db = JSON.parse(db);
      }catch(error){
        console.error("Failed to load file: " + error);
        throw error;
      }
    }


    //show window
    thisWindow.resizeTo(1024,720);
    thisWindow.setPosition('center');

    //prepare the stage
    WIDTH = $(window).width();
    HEIGHT = $(window).height();

    //add stage
    var stage = '<div id="stage"></div>';
    $('body').prepend(stage);
    $('#stage').css({
      width:stageWIDTH,
      height: stageHEIGHT
    });

    //scrolltocenter
    $( "body" ).scrollTop( stageHEIGHT/2 - 360  );
    $( "body" ).scrollLeft( stageWIDTH/2 - 1024/2 );

    //add menu
    initAddMenu();

    //add feedback
    initFeedback();

    //hide serialPanel
    $('#serialPanel').hide();
    $('.notify').hide();

    //add canvas
    canvas = Raphael(document.getElementById("stage"),stageWIDTH, stageHEIGHT);

    //show window
    thisWindow.show();
    thisWindow.focus();

    //parse db
    parseDB(db);

    //bond events
    document.addEventListener("dblclick", ClickEdit, false);
    document.addEventListener("mousedown", DragStart, false);
    document.addEventListener("mouseup", DragEnd, false);

    //serialPorts event
    $('#updatePort').on('click',function(){
      activeSerialPanel();
    });

    //add button events
    var showMenu = function(){
          $('#add').removeClass('bounce');
          $('#add').animate({
            width: "220",
            height: "374",
          },300,function(){
            // Animation complete.
            //remove event
            $('#add').off('click', showMenu);
            $('#addmenu').show();
            addState = true;
            $('#search').show();
          });

    var closeFx = function(){
          $('#add .add_btn').removeClass('moveright').animate({
            'margin-left': '15'
          },300,function(){
            $(this).off('click',closeFx);
          });

          $('#add').animate({
            width: "50",
            height: "50",
          },300,function(){
            $('#addmenu').hide();
            addState = false;
            $('#search').hide();
            $('#add').addClass('bounce').on('click', showMenu);
          });
    };
          $('#add .add_btn').addClass('moveright').animate({
            'margin-left': '190'
          },300,function(){
              $(this).on('click',closeFx);
          });
    };

    $('#add').on('click',showMenu);

    //delete event
    $('#stage').on('click','.node_del',function(){
        var d = confirm("Are you sure you want to delete this item?");
        if(d){
          var id_to_del = this.dataset.del;

          //del in sandbox
          sandbox.del(id_to_del);

          //del in ele
          for(var i=0;i<ele.length;i++){
            if(ele[i].id === id_to_del){
                ele.splice(i,1);
            }
          }

          //del in allboards
          for(var i=0;i<allboards.length;i++){
            if(allboards[i].id === id_to_del){
                allboards.splice(i,1);
            }
          }

          //del recorder data
          if(bee.bb['wave_'+id_to_del]){
            delete bee.bb['wave_'+id_to_del];
          }

          //del in phones
          for(var i=0;i<phones.length;i++){
            if(phones[i].id === id_to_del){
              phones.splice(i,1);
              io.emit('phone', phones);
            }
          }

          //del in ui
          $('#'+id_to_del).remove();
          updateUI();
        }
    })

    //saving events
    thisWindow.on('save', function(){
      quitNew(0,1);
    });

    thisWindow.on('saveas', function(){
      var dialog = document.querySelector('#saveDialog');
      var saveDialog = function(e){
        if(this.value){
             saveFile(this.value,1);
             dialog.removeEventListener("change", saveDialog, false);
             //close the window
             thisWindow.loadSettings.saved = true;
             thisWindow.close(true);

             //open new window
             global.glueApplication.openPaths({
                pathsToOpen: [this.value]
             });
          }
      };

      dialog.removeEventListener("change", saveDialog, false);
      dialog.addEventListener("change", saveDialog, false);

      dialog.click();
    });

    thisWindow.on('newfile',function(){
      if($('body .dialog_box').length === 0){
        showConfirm('<strong>'+fileName+'</strong> has changes, would you like to save before closing?',1);
      }
    });

    thisWindow.on('quitsave', function() {
      if($('body .dialog_box').length === 0){
        showConfirm('<strong>'+fileName+'</strong> has changes, would you like to save before closing?',0);
      }
    });


    //recorder events
    $('.stop_btn').hide();

    $('#stage').on('click','.record_btn',function(e){
      e.preventDefault();
      var pid = this.dataset.pid;
      var uid = this.dataset.uid;
      $('#'+pid+' .record_btn').hide();
      $('#'+pid+' .play_btn').hide();
      $('#'+pid+' .stop_btn').show();
      setTimeout(function(){
        bee.play(uid);
      },1000);

    })

    $('#stage').on('click','.stop_btn',function(e){
      e.preventDefault();
      var pid = this.dataset.pid;
      var uid = this.dataset.uid;
      $('#'+pid+' .stop_btn').hide();
      $('#'+pid+' .record_btn').show();
      $('#'+pid+' .play_btn').show();
      bee.stop(uid);
    })

    $('#stage').on('click','.play_btn',function(e){
      e.preventDefault();
      var uid = this.dataset.uid;
      bee.replay(uid);
    })

    //start the board
    $('#stage').on('click','.board_start',function(e){
      e.preventDefault();
      var pid = this.dataset.pid;
      sandbox[pid].isOn = 1;
      sandbox.loop();
      $(this).addClass('board_stop').removeClass('board_start');
      if(!aboard){
        initBoard();
      }
    })

    $('#stage').on('click','.board_stop',function(e){
      e.preventDefault();
      var pid = this.dataset.pid;
      sandbox[pid].isOn = 0;
      sandbox.clearTimers();
      $(this).addClass('board_start').removeClass('board_stop');
    })

    //resize
    $( window ).resize(function() {
      WIDTH = $(window).width();
      HEIGHT = $(window).height();

      var navWidth = $("#navigator").width(), navHeight = $("#navigator").height();
      $("#navigator .nav").css({
         width: WIDTH*navWidth/stageWIDTH,
         height: HEIGHT*navHeight/stageHEIGHT,
      });
    });

    //scroll
    $(window).on('scroll', function () {
        var disTop = $(window).scrollTop(), disLeft = $(window).scrollLeft();
        var navWidth = $("#navigator").width(), navHeight = $("#navigator").height();
        $("#navigator .nav").css({
           top: disTop*navHeight/stageHEIGHT,
           left: disLeft*navWidth/stageWIDTH,
        });

    });


    //load time
    if (global.glue) {
      global.glue.loadTime = Date.now() - startTime;
      console.log('Window load time: ' + global.glue.getWindowLoadTime() + 'ms');
    }

  } catch (error) {
    thisWindow.resizeTo(800, 600);
    thisWindow.setPosition("center");
    thisWindow.show();
    thisWindow.showDevTools();
    throw new Error(error.stack || error);
  }
});

/*--- db parser ---*/
var parseDB = function(data){
  var d = data;
  if(d.ele){
    for(var i=0;i<d.ele.length;i++){
        var id = d.ele[i].id;
        var type = d.ele[i].type;
        var name = d.ele[i].name;
        var x = d.ele[i].x;
        var y = d.ele[i].y;
        var v = typeof d.ele[i].value !== 'undefined'? d.ele[i].value : null;
        var j = 'new '+type+'.'+name+'("'+name+'_'+id+'","'+type+'", '+x+', '+y;
        if(type === 'helper' && name === 'note'){
          j+= ', '+d.sizes['note_'+id][0]+','+d.sizes['note_'+id][1]+', "'+d.sizes['note_'+id][2]+'"';
        }
        if(type === 'data' && v !== null){
          j+= ', "'+v+'"';
        }
        if(type === 'fx' && name === 'log'){
          j+= ', '+d.sizes['log_'+id][0]+','+d.sizes['log_'+id][1];
        }
        if(type === 'control' && name === 'slider'){
          var rg = v.split('|');
          j+= ', '+rg[0]+','+rg[1];
        }
        if(type === 'control' && name === 'toggle'){
          j+= ', "'+v+'"';
        }
        j+=')';
        j = (new Function('return ' +j)());
        ele.push(j);
        $('#stage').append(j);
        //board
        if(type === 'board'){
          allboards.push({
            type: name,
            id: name+'_'+id
          });
          activeSerialPanel();
        }
        //log
        if(type === 'fx'){
          if(name === 'log'){
            //log
          }else if( name === 'recorder'){
            //recorder
            bee.init("wave_"+j.id);
            sandbox.init(j.id);
          }else if( name === 'colorpicker'){
            //colorpicker
            $('#'+j.id+' .colorpicker').colpick({
              flat:true,
              layout:'glue',
              height: 100
            });
          }
        }

        sandbox.init(j.id);
    }

    connections = d.con;
    for(var i in connections){
      sandbox.link(i, connections[i][0]);
    }
    sizes = d.sizes;
    updateUI();
  }
};

var quitNew = function(quit,openNew){
  if(loadSettings.hasPathToOpen){
    saveFile(tempFile,1);
    thisWindow.loadSettings.saved = true;
    //close the window
    if(quit){
      thisWindow.close(true);
    }
  }else{
    //save as
    var dialog = document.querySelector('#saveDialog');
    var saveDialog = function(e){
      if(this.value){
           saveFile(this.value,1);
           dialog.removeEventListener("change", saveDialog, false);
           //close the window
           thisWindow.loadSettings.saved = true;
           thisWindow.close(true);

           //open new window
           if(openNew){
             global.glueApplication.openPaths({
                  pathsToOpen: [this.value]
             });
           }
        }
    };

    dialog.removeEventListener("change", saveDialog, false);
    dialog.addEventListener("change", saveDialog, false);

    dialog.click();
  }
};

var saveFile = function(pathToSave, sync){
  var json= {};
  json.name = null;
  json.created = Date.now();
  json.modified = Date.now();
  json.opened = startTime;
  json.author = "Dongzhi Xia";
  json.ele = [];
  for(var i in ele){
    var item = {};
    item.id = ele[i].id.slice(-13);
    item.type = ele[i].className;
    item.name = ele[i].dataset.name;
    item.x = ele[i].x;
    item.y = ele[i].y;
    if(ele[i].dataset.value){
      item.value = ele[i].dataset.value;
    }
    item.layer = i;
    json.ele.push(item);
  }
  json.con = connections;
  json.sizes = sizes;
  json = JSON.stringify(json);

  if(sync){
    //sync
    try{
      fs.writeFileSync(pathToSave, json);
      modified = false;
      setSaved(true);
      document.title = windowTitle;
    }catch(error){
      console.error("Failed to save file: " + error);
      throw error;
    }
  }else{
    fs.writeFile(pathToSave, json, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  }

};

/*---utility functions---*/
var setSaved = function(data){
  return thisWindow.loadSettings.saved = data;
};


var getPath = function(filePath){
  filePath = filePath.split('/');
  filePath.pop();
  return filePath.join('/');
};

//click eidt
function ClickEdit(e){
  if(e.preventDefault) e.preventDefault();
  var targ = e.target ? e.target : e.srcElement;
  if(targ.dataset.edit === 'true'){
      var text = targ.textContent;
      var newtext = prompt("Edit the note", text);
      if(newtext){
        targ.textContent = newtext;
        sizes[targ.dataset.pid][2] = newtext;
      }
  }else if(targ.dataset.toggle === 'true'){
      var val = parseInt(targ.dataset.value) === 1 ? 0 : 1;
      document.getElementById(targ.dataset.pid).dataset.value = val;
      targ.dataset.value = val;
      sandbox.set(targ.dataset.pid,Boolean(val));
      if(val){
        targ.textContent = "TRUE";
      }else{
        targ.textContent = "FALSE";
      }
  }else if(targ.dataset.int === 'true'){
      var val = parseInt(targ.dataset.value);
      var newval = prompt("Enter new value", val);
      if(newval){
        targ.textContent = parseInt(newval);
        targ.dataset.value = parseInt(newval);
        document.getElementById(targ.dataset.pid).dataset.value = parseInt(newval);
        sandbox.set(targ.dataset.pid,parseInt(newval));
      }
  }else if(targ.dataset.array === 'true'){
      var val = targ.dataset.value === null ? 'null' : targ.dataset.value.split('|').join();
      var newval = prompt("Enter new value", val);
      if(newval){
        var newarr = newval.split(',')
        targ.textContent = '['+newval+']';
        targ.dataset.value = newarr.join('|');
        document.getElementById(targ.dataset.pid).dataset.value = newarr.join('|');
        sandbox.set(targ.dataset.pid,newarr);
      }
  }else if(targ.dataset.range === 'true'){
      var val = targ.dataset.value.split('|');
      var newval = prompt("Enter new range", val);
      if(newval){
        var newarr = newval.split(',')
        targ.innerHTML = '<div class="min_val">'+newarr[0]+'</div><div class="max_val">'+newarr[1]+'</div>';
        targ.dataset.value = newarr.join('|');
        document.getElementById(targ.dataset.pid).dataset.value = newarr.join('|');
        //set new value
        var newrg = parseInt(newarr[1])-parseInt(newarr[0]);
        var sp = document.getElementById('pointer_'+targ.dataset.pid).x;
        var vv = parseInt(newarr[0]) + parseInt((sp-66)*newrg/160);
        document.getElementById('pointer_'+targ.dataset.pid).dataset.value = vv;
        sandbox.set(targ.dataset.pid,vv);
      }
  }
}
// start dragging
function DragStart(e) {
    if(e.preventDefault) e.preventDefault();

    var targ = e.target ? e.target : e.srcElement;

    if(targ.id === 'search'){
      autoSuggest();
    }else{
      hideSuggest();
    }

    if(targ.className === 'pin'){
      dash = targ;
      targ.className += ' start';
      //console.log("Dash Start");
      tempLine[0] = document.getElementById(targ.dataset.t).x + targ.x + targ.width/2;
      tempLine[1] = document.getElementById(targ.dataset.t).y + targ.y + + targ.height/2;
    }

    document.addEventListener("mousemove", Dragging, false);

    e = MousePos(e);

    if(targ.className === 'navigator_wrapper'){
        moveNavTo(e, 300);
    }

    if(targ.dataset.drag === 'true'){
      drag = targ.dataset.pid;
    }

    if(targ.className === 'pointer'){
      pointer_slider = targ.id;
    }

    if(targ.className === 'node_resize'){
      resizeid = targ.dataset.resizeid;
    }

    if(targ.dataset.onoff === 'true'){
        var val = parseInt(targ.dataset.value) === 1 ? 0 : 1;
        document.getElementById(targ.dataset.pid).dataset.value = val;
        targ.dataset.value = val;
        if(val){
          targ.style.left = '95px';
        }else{
          targ.style.left = '75px';
        }
        sandbox.set(targ.dataset.pid, Boolean(val));
    }

    if(targ.dataset.option === 'true'){
        var val = parseInt(targ.dataset.value) === 1 ? 0 : 1;
        document.getElementById(targ.dataset.pid).dataset.value = val;
        targ.dataset.value = val;
        if(val){
          targ.style.left = '77px';
        }else{
          targ.style.left = '10px';
        }
    }
    //var dx, dy;
    dPoint = e;

    return false;
  }

  // dragging
function Dragging(e) {

  var targ = e.target ? e.target : e.srcElement;
  if(targ.className === 'pin'){
    targ.className += ' active';
  }else{
    var actives = document.getElementsByClassName("active");
    for(var i in actives){
      actives[i].className = 'pin';
    }
  }

  e = MousePos(e);

  if(targ.className === 'navigator_wrapper'){
      moveNavTo(e);
  }

  if (drag) {
    document.getElementById(drag).x += e.x - dPoint.x;
    document.getElementById(drag).y += e.y - dPoint.y;
    dPoint = e;
    updateUI();
  }

  if(resizeid) {
    document.getElementById(resizeid).width += e.x - dPoint.x;
    document.getElementById(resizeid).height += e.y - dPoint.y;
    dPoint = e;
    updateUI();
  }

  if(pointer_slider && targ.dataset.pid){
    var incre = e.x - dPoint.x;
    var rg = document.getElementById(targ.dataset.pid).dataset.value.split('|');
    var newrg = parseInt(rg[1])-parseInt(rg[0]);
    document.getElementById(pointer_slider).x += incre;
    var sp = document.getElementById(pointer_slider).x;
    //console.log(document.getElementById(pointer_slider));
    if(sp < 66){
      document.getElementById(pointer_slider).x = 66;
      sp = 66;
    }else if(sp > 225){
      document.getElementById(pointer_slider).x = 225;
      sp = 225;
    }
    var vv = parseInt(rg[0]) + parseInt((sp-66)*newrg/160);
    document.getElementById(pointer_slider).dataset.value = vv;
    document.getElementById(pointer_slider).style.left = sp+'px';
    sandbox.set(targ.dataset.pid,vv);
    dPoint = e;
  }else{
    pointer_slider = null;
  }

  if(dash){
    tempLine[2] = e.x;
    tempLine[3] = e.y;
    makeDash();
  }

  return false;
}


// end dragging
function DragEnd(e) {
  var targ = e.target ? e.target : e.srcElement;


  canvas.clear();
  var starts = document.getElementsByClassName("start");
  for(var i in starts){
    starts[i].className = 'pin';
  }
  var actives = document.getElementsByClassName("active");
  for(var i in actives){
    actives[i].className = 'pin';
  }

  if(targ.className === 'pin' && dash){
    if(connections[dash.id] !== dash.id && targ.dataset.t !== dash.dataset.t){
      //if not itself & pins on the same board
      if(targ.dataset.type !== dash.dataset.type){

        if(targ.dataset.type === 'in'){
          //from dash to targ
          //check pipe
          var output = dash.dataset.pipeout;
          var input = targ.dataset.pipein;
          var match = input.indexOf(output);
          if(match > -1){
            if(connections[targ.id]){
              connections[targ.id] = [dash.id];
            }else{
                connections[targ.id] = [dash.id];
            }
            sandbox.link(targ.id, dash.id);
          }

        }else if(targ.dataset.type === 'out'){
          //from targ to dash
          //check pipe
          var output = targ.dataset.pipeout;
          var input = dash.dataset.pipein.split('_');
          var match = input.indexOf(output);
          if(match > -1){
            if(connections[dash.id]){
                connections[dash.id] = [targ.id];
            }else{
                connections[dash.id] = [targ.id];
            }
            sandbox.link(dash.id, targ.id);
          }

        }else{
          //both
          //check the type of dash
          if(dash.dataset.type === 'in'){
            //from targ to dash
            var output = targ.dataset.pipeout;
            var input = dash.dataset.pipein.split('_');
            var match = input.indexOf(output);
            if(match > -1){
              if(connections[dash.id]){
                  connections[dash.id] = [targ.id];
              }else{
                  connections[dash.id] = [targ.id];
              }
              sandbox.link(dash.id, targ.id);
            }
            /////////////
          }else if(dash.dataset.type === 'out'){
            //from dash to targ
            //check pipe
            var output = dash.dataset.pipeout;
            var input = targ.dataset.pipein.split('_');
            var match = input.indexOf(output);
            if(match > -1){
              if(connections[targ.id]){
                connections[targ.id] = [dash.id];
              }else{
                connections[targ.id] = [dash.id];
              }
              sandbox.link(targ.id, dash.id);
            }
            ////////////
          }
        }
      }else{
        notify('Unable to Link');
      }

    }//end

    //console.log(connections);
  }

  updateUI();

  drag = null;
  pointer_slider = null;

  if(resizeid){
    sizes[resizeid][0] = document.getElementById(resizeid).width;
    sizes[resizeid][1] = document.getElementById(resizeid).height;
    resizeid = null;
  }
  dash = null;

  document.removeEventListener("mousemove", Dragging, false);
}


// event parser
var MousePos = function(event) {
  event = (event ? event : window.event);
  return {
    x: event.pageX,
    y: event.pageY,
    cx: event.clientX,
    cy: event.clientY,
  }
};

//update
var updateUI = function(){
    modified = true;
    setSaved(false);
    document.title = windowTitle + '*';

    //console.log('updateUI');
    for(var i in ele){
      ele[i].style.left = ele[i].x + 'px';
      ele[i].style.top = ele[i].y + 'px';
      ele[i].style.width = ele[i].width + 'px';
      ele[i].style.height = ele[i].height + 'px';
      ele[i].getElementsByClassName("node_title")[0].innerHTML = ele[i].x +';'+ ele[i].y
    }

    makeConnections();
};

//make connections
var makeConnections = function(){
  canvas.clear();

  //console.log(connections);

  for(var i in connections){
    var targ = document.getElementById(i);
    if(targ){
      var start = {
        from: targ.id,
        x: document.getElementById(targ.dataset.t).x + targ.x + targ.width/2,
        y: document.getElementById(targ.dataset.t).y + targ.y + targ.height/2
      };

      var con_to_del = [];

      for(var j in connections[i]){
        var _targ = document.getElementById(connections[i][j]);
        if(_targ){
          var stop = {
            to: _targ.id,
            x: document.getElementById(_targ.dataset.t).x + _targ.x + _targ.width/2,
            y: document.getElementById(_targ.dataset.t).y + _targ.y + _targ.height/2
          };

          bezier(start.x,start.y,stop.x,stop.y,start.from,stop.to);
        }else{
          //connection to del
          con_to_del.push(connections[i][j]);
        }
      }

      //del cons
      for(var k =0;k<con_to_del.length;k++){
        var p = connections[i].indexOf(con_to_del[k]);
        connections[i].splice(p, 1);
      }

      if(connections[i].length === 0){
        delete connections[i];
      };

    }else{
      delete connections[i];
    }

  }
};

//make dash
var makeDash = function(){
  //canvas.clear();
  //updateUI();
  $('#dash').remove();

  var str = 'M';
  str += tempLine[0]+' '+tempLine[1]+'L'+tempLine[2]+' '+tempLine[3];

  var c = canvas.path(str).attr({
    "fill": "none",
    "stroke-linecap": "round",
    "stroke": "#ffaa00",
    "stroke-width": 2,
    "stroke-dasharray":"-"
  });

  c.node.id = 'dash';
};

var bezier = function(x1,y1,x2,y2,from,to){
  var str = 'M';
  if(x1<x2){
    c=50;
  }else{
    c=-50;
  }
  str += x1+' '+y1+' C'+(x1+c)+' '+y1+' '+(x2-c)+' '+y2+' '+x2+' '+y2;
  //console.log(str);
  var c = canvas.path(str).attr({
    "fill": "none",
    "stroke-linecap": "round",
    "stroke": "#ccc",
    "stroke-width": 2,
  }).data("from", from).data("to", to).mouseover(function() {
    this.attr({
      "stroke": "#ffaa00",
      "stroke-width": 3,
    });
  }).mouseout(function() {
    this.attr({
      "stroke": "#ccc",
      "stroke-width": 2,
    });
  }).mousedown(function(){
    removeCon(from,to);
    sandbox.unlink(from, to);
  });
};

var removeCon = function(from,to){
  var a = connections[from];
  if(a){
    var p = connections[from].indexOf(a);
    connections[from].splice(p,1);
  }
  makeConnections();
};

var initAddMenu = function(){
  var str = '<ul>';

  for(var i = 0; i < additems.length;i++){
    var sm = additems[i].submenu;
    str += '<li';
    if(sm){
      str +=' class="has-sub"';
    }
    if(additems[i].action){
      str += ' onclick="'+additems[i].action+'"';
    }
    str +='><img class="iconone" src="./images/add/'+additems[i].icon +'"/><a href="javascript:void(0)"';
    str +='><span>'+ additems[i].label +'</span></a>';
    if(sm){
      str += '<ul>';
      for(var j = 0; j < sm.length ; j++){
        str += '<li';
        if(sm[j].half){
          str +=' class="half';
          if(j%2){
            str +=' spc';
          }
          str +='"';
        }
        if(sm[j].action){
          str += ' onclick="'+sm[j].action+'"';
        }
        str += '><img src="./images/add/'+sm[j].icon +'"/><a href="javascript:void(0)"';
        str +='"><span>'+ sm[j].label +'</span></a>';
        str += '</li>';
      }
      str += '</ul>';
    }
    str += '</li>';
  }

  str +="</ul>";

  $('#addmenu').append(str).hide();
  addState = false;
  $('#search').hide();
};

/* search  */
var autoSuggest = function(){
  $('#search').focus();
  $('#search').autocomplete({
    lookup: modules,
    appendTo: '#suggestions',
    lookupLimit: 4,
    triggerSelectOnValidInput: false,
    onSearchStart : function(){
        $('#add').css({
          height: '44'
        });
        $('#addmenu').hide();
    },
    width: '220',
    zIndex: 10020,
    onSelect: function (suggestion) {
      var j = suggestion.data + '()';
      j = (new Function('return ' +j)());
      $('#search').val('');
    }
});
};

var hideSuggest = function(){
  $('#search').blur();
  if(addState){
    $('#add').css({
      height: '374'
    });
    $('#addmenu').show();
  }
};


var initFeedback = function(){
  $('body').append('<div id="feedback"><a href="mailto:xiatwo@gmail.com">Feedback</a><a href="javascript:void(0)"class="close">X</a></div>');
  $('#feedback').on('click','a.close',function(){
    $('#feedback').remove();
  });
};

var moveNavTo = function(data, time){
  var t = typeof time !== 'undefined' ? time : 0;
  var disTop = data.cy - (HEIGHT - $('#navigator').height());
  var disLeft = data.cx - (WIDTH - $('#navigator').width());
  if(time){
    $('body').animate({
      scrollTop : disTop*stageHEIGHT/$('#navigator').height(),
      scrollLeft : disLeft*stageWIDTH/$('#navigator').width()
    }, time);
  }else{
    $( "body" ).scrollTop(disTop*stageHEIGHT/$('#navigator').height());
    $( "body" ).scrollLeft(disLeft*stageWIDTH/$('#navigator').width());
  }
};

var initBoard = function(){
  if(global.board){
    aboard = global.board
  }else{
    activeSerialPanel();
    if(sPorts.length){
      aboard = new five.Board({repl:false});
      global.board = aboard;
      aboard.on("ready", function() {
        activeSerialPanel();
        notify("Your board is ready.");
      });
    }
  }
};

var activeSerialPanel = function(){
  serialPort.list(function(err, ports) {
    sPorts = []; //empty ports db
    $('#serialPanel .portsList').html(''); // empty the ui

    for(var i=0;i<ports.length;i++){
      var port = ports[i];
      //console.log(port);
      if(port.comName.indexOf('usbmodem') > -1){
        if(port.manufacturer.indexOf('Arduino') > -1 || port.manufacturer.indexOf('arduino') > -1){
          sPorts.unshift(port);
          $('#serialPanel ul.portsList').append('<li class="choosedPort" data-port="'+ port.comName+'">'+port.comName+'</li>');
        }else{
          sPorts.push(port);
          $('#serialPanel ul.portsList').prepend('<li class="inactivePort" data-port="'+ port.comName+'">'+port.comName+'</li>');
        }
      }
      // sPorts.push(port);
      // $('#serialPanel ul.portsList').prepend('<li class="inactivePort" data-port="'+ port.comName+'">'+port.comName+'</li>');
    }

    if(!sPorts.length){
      $('#serialPanel ul.portsList').append('<li class="choosedPort" data-port="">No available port</li>');
      notify("No board is detected. Please connect your board!");
    }

    //$('#serialPanel ul.portsList .inactivePort').hide();
    $('#serialPanel ul.portsList .choosedPort').show();
    $('#serialPanel ul.portsList').on('click','.choosedPort',function(){
        $(this).removeClass('choosedPort').addClass('activePort');
        if(sPorts.length > 1){
          $('#serialPanel ul.portsList').css({
            'margin-top': -20 * sPorts.length
          });
        }

        $('#serialPanel ul.portsList .inactivePort').show();
    });

    $('#serialPanel ul.portsList').on('click','.activePort',function(){
        $(this).removeClass('activePort').addClass('choosedPort');
        $('#serialPanel ul.portsList').css({
          'margin-top': 0
        });
        $('#serialPanel ul.portsList .inactivePort').hide();
    });

    $('#serialPanel ul.portsList').on('click','.inactivePort',function(){
        //update the sPorts
        var port = $(this).dataset.port;
        var position = sPorts.indexOf(port);
        var p = sPorts.splice(position, 1);
        sPorts.unshift(p);

        $('#serialPanel ul.portsList .activePort').removeClass('activePort').addClass('inactivePort');
        $(this).removeClass('inactivePort').addClass('choosedPort');
        var li = $(this);
        $(this).remove();
        $('#serialPanel ul.portsList').append(li);
        $('#serialPanel ul.portsList').css({
          'margin-top': 0
        });
        $('#serialPanel ul.portsList .inactivePort').hide();
    });

    //show panelUI
    var bName = boardName();

    $('#serialPanel .boardName').html(bName+' on');
    $('#serialPanel').show(200);
  });

};

var boardName = function(){
  if(allboards.length){
    switch(allboards[0].type){
      case 'uno':
        return 'Arduino UNO';
        break;
      case 'leno':
        return 'Arduino Lenonardo';
        break;
    }
  }
};

var checkBoard = function(){
  return allboards.length !== 0 ? false : true;
};

var bee = {
  bb:{},
  random : [
    40,40,40,40,40,40,40,40,25,20,
    18,16,10,7,10,13,20,40,60,70,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,15,30,
    10,13,5,10,16,13,35,45,50,65,
    43,42,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,35,30,
    21,23,20,20,24,28,30,45,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,30,34,44,35,20,
    18,14,14,10,14,17,25,30,65,70,
    45,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,25,10,
    25,20,23,28,19,30,35,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40,
    40,40,40,40,40,40,40,40,40,40
  ],
  init: function(id){
    bee.bb[id] = {};
    bee.bb[id].frame = 0;
    bee.bb[id].playing = false;
    bee.bb[id].redline = null;
    bee.bb[id].canvas = Raphael(document.getElementById(id),250, 80);
    bee.bb[id].data = [];
    bee.bb[id].timer = null;
  },
  replay: function(id){
    bee.bb[id].frame = 0;
    bee.bb[id].timer = setInterval(function(){
      var str = 'M';
      str += bee.bb[id].frame+' '+0+'L'+bee.bb[id].frame+' '+80;
      bee.bb[id].canvas.clear();
      bee.draw(id);
      bee.bb[id].redline = bee.bb[id].canvas.path(str).attr({
        "fill": "none",
        "stroke": "#ff0c06",
        "stroke-width": 1,
      });
      bee.bb[id].canvas.circle(bee.bb[id].frame, parseInt(bee.bb[id].data[bee.bb[id].frame-1]), 2).attr({
        "fill": "#ff0c06",
        "stroke": "none",
      });

      var new_id = id.split('_');
      if(sandbox['recorder_'+new_id[2]]){
        sandbox['recorder_'+new_id[2]].val = map(bee.bb[id].data[bee.bb[id].frame],0,80,0,1024);
        sandbox.loop();
      }

      if(bee.bb[id].frame >= (bee.bb[id].data.length - 1)){
        bee.stop(id);
      }else{
        bee.bb[id].frame++;
      }
    }, 20);
  },
  play: function(id){
    bee.bb[id].frame = 0;
    bee.bb[id].data = [];
    bee.bb[id].playing = true;
    // bee.bb[id].timer = setInterval(function(){
    //   //var random = 28*Math.sin(bee.bb[id].frame*0.1) + 30;
    //
    //   bee.bb[id].data.push(bee.random[bee.bb[id].frame]);
    //
    //   var str = 'M';
    //   str += bee.bb[id].frame+' '+0+'L'+bee.bb[id].frame+' '+80;
    //   bee.bb[id].canvas.clear();
    //   bee.draw(id);
    //   bee.bb[id].redline = bee.bb[id].canvas.path(str).attr({
    //     "fill": "none",
    //     "stroke": "#ff0c06",
    //     "stroke-width": 1,
    //   });
    //   bee.bb[id].canvas.circle(bee.bb[id].frame, parseInt(bee.bb[id].data[bee.bb[id].data.length-1]), 2).attr({
    //     "fill": "#ff0c06",
    //     "stroke": "none",
    //   });
    //
    //   if(bee.bb[id].frame >= 250){
    //     bee.stop(id);
    //   }else{
    //     bee.bb[id].frame++;
    //   }
    //
    // }, 10);

  },
  rec: function(id,read){
      //var random = 28*Math.sin(bee.bb[id].frame*0.1) + 30;
    if(bee.bb[id].playing){


      if(bee.bb[id].frame < 250 ){
        read = map(read,0,1024,0.,80);
        bee.bb[id].data.push(read);

        var str = 'M';
        str += bee.bb[id].frame+' '+0+'L'+bee.bb[id].frame+' '+80;
        bee.bb[id].canvas.clear();
        bee.draw(id);
        bee.bb[id].redline = bee.bb[id].canvas.path(str).attr({
          "fill": "none",
          "stroke": "#ff0c06",
          "stroke-width": 1,
        });
        bee.bb[id].canvas.circle(bee.bb[id].frame, parseInt(bee.bb[id].data[bee.bb[id].data.length-1]), 2).attr({
          "fill": "#ff0c06",
          "stroke": "none",
        });

        bee.bb[id].frame++;
      }
    }
  },
  stop: function(id){
    bee.bb[id].playing = false;
    clearInterval(bee.bb[id].timer);
    bee.bb[id].timer = null;
  },
  draw: function(id){
    var str = '';
    for(var i= 0; i<bee.bb[id].data.length;i++){
      if (i) {
        str += ',' + [i, bee.bb[id].data[i]];
      } else {
        str += 'M' + [i, bee.bb[id].data[i]] + 'C';
      }
    }

    bee.bb[id].canvas.path(str).attr({
      "fill": "none",
      "stroke": "#543f10",
      "stroke-width": 1,
    });
  },

};

/*    notification   */
var notify = function (str){
  $('.notify').html(str).show();
  setTimeout(function(){
    $('.notify').hide(300);
  }, 2000);
}

var showConfirm = function(str,open){
  var confirm = '<div class="confirm dialog_box"><div class="dialog_info">'+str+'</div>';
  confirm +='<div class="dbtns"><div class="nosave dbtn">Not Save</div><div class="cancel dbtn">Cancel</div><div class="save dbtn">Save</div></div>'
  confirm +='</div>';
  $('body').append(confirm);
  $('body .dialog_box').animate({
    top: "0px"
  },300,function(){
    //cancel
    $('body').on('click','.cancel',function(e){
      e.preventDefault();
      $('body .dialog_box').animate({
        top:"-400px"
      },300,function(){
        $('body .dialog_box').remove();
      });
    })

    //No Save
    $('body').on('click','.nosave',function(e){
      e.preventDefault();
      //clean cache
      global.glueApplication.emit('application:del-cache');
      thisWindow.close(true);

      //open new window
      if(open){
        global.glueApplication.openPaths({
             pathsToOpen: []
        });
      }
    })

    //Save As
    $('body').on('click','.save',function(e){
      e.preventDefault();
      //save as
      $('body .dialog_box').animate({
        top:"-400px"
      },300,function(){
        $('body .dialog_box').remove();
        quitNew(1,open);
      });
    })

  });
}

/*    Elements  */
var menu_uno = function(){
  //var led = new output.led('123141234','output', 690, 180);
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  if(checkBoard()){
    var i = new board.uno("uno_"+id, "board",cx,cy );
    allboards.push({
      type: 'uno',
      id: "uno_"+id
    });
    ele.push(i);
    $('#stage').append(i);
    sandbox.init(i.id);
  }else{
    alert('Current version doesn\'t supprt multi-board in one sketch. Delete the existing board if you want to use different boards.');
  }
};

var menu_leno = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  if(checkBoard()){
    var i = new board.leno("leno_"+id, "board",cx,cy );
    allboards.push({
      type: 'leno',
      id: "leno_"+id
    });
    ele.push(i);
    $('#stage').append(i);
    activeSerialPanel();
    sandbox.init(i.id);
  }else{
    alert('Current version doesn\'t support multi-board in one sketch. Delete the existing board if you want to use different boards.');
  }
};

/*   Sensor   */
var menu_pot = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var pot = new sensor.pot('pot_'+id,'sensor', cx, cy);
  ele.push(pot);
  $('#stage').append(pot);
  sandbox.init(pot.id);
};

var menu_knock = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var knock = new sensor.knock('knock_'+id,'sensor', cx, cy);
  ele.push(knock);
  $('#stage').append(knock);
};

/*   Output   */
var menu_piezo = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var piezo = new output.piezo('piezo_'+id,'output', cx, cy);
  ele.push(piezo);
  $('#stage').append(piezo);
  sandbox.init(piezo.id);
};

var menu_led = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var led = new output.led('led_'+id,'output', cx, cy);
  ele.push(led);
  $('#stage').append(led);
  sandbox.init(led.id);
};

var menu_rgbled = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var rgbled = new output.rgbled('rgbled_'+id,'output', cx, cy);
  ele.push(rgbled);
  $('#stage').append(rgbled);
  sandbox.init(rgbled.id);
};

var menu_ledmatrix = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var lmatrix = new output.ledmatrix('ledmatrix_'+id,'output', cx, cy);
  ele.push(lmatrix);
  $('#stage').append(lmatrix);
  sandbox.init(lmatrix.id);
};

var menu_servo = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var servo = new output.servo('servo_'+id,'output', cx, cy);
  ele.push(servo);
  $('#stage').append(servo);
  sandbox.init(servo.id);
};

var menu_solenoid = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var solenoid = new output.solenoid('solenoid_'+id,'output', cx, cy);
  ele.push(solenoid);
  $('#stage').append(solenoid);
  sandbox.init(solenoid.id);
};

/*  Controls  */
var menu_if = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var ifelse = new control.ifelse('ifelse_'+id,'control', cx, cy);
  ele.push(ifelse);
  $('#stage').append(ifelse);
  sandbox.init(ifelse.id);
};

var menu_forloop = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var forloop = new control.forloop('forloop_'+id,'control', cx, cy);
  ele.push(forloop);
  $('#stage').append(forloop);
  sandbox.init(forloop.id);
};

var menu_whileloop = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var whileloop = new control.whileloop('whileloop_'+id,'control', cx, cy);
  ele.push(whileloop);
  $('#stage').append(whileloop);
  sandbox.init(whileloop.id);
};

var menu_do = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var dodo = new control.dodo('dodo_'+id,'control', cx, cy);
  ele.push(dodo);
  $('#stage').append(dodo);
  sandbox.init(dodo.id);
};

var menu_do = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var dodo = new control.dodo('dodo_'+id,'control', cx, cy);
  ele.push(dodo);
  $('#stage').append(dodo);
  sandbox.init(dodo.id);
};

var menu_sequence = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var sequence = new control.sequence('sequence_'+id,'control', cx, cy);
  ele.push(sequence);
  $('#stage').append(sequence);
  sandbox.init(sequence.id);
}

var menu_slider = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var slider = new control.slider('slider_'+id,'control', cx, cy);
  ele.push(slider);
  $('#stage').append(slider);
  sandbox.init(slider.id);
};

var menu_toggle = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var toggle = new control.toggle('toggle_'+id,'control', cx, cy, 0);
  ele.push(toggle);
  $('#stage').append(toggle);
  sandbox.init(toggle.id);
};

var menu_timer = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var timer = new control.timer('timer_'+id,'control', cx, cy, 0);
  ele.push(timer);
  $('#stage').append(timer);
};

/*  math  */
var menu_min = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getMin = new math.mathMin('min_'+id,'math', cx, cy);
  ele.push(getMin);
  $('#stage').append(getMin);
  sandbox.init(getMin.id);
};

var menu_max = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getMax = new math.mathMax('max_'+id,'math', cx, cy);
  ele.push(getMax);
  $('#stage').append(getMax);
  sandbox.init(getMax.id);
};

var menu_abs = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getAbs = new math.mathAbs('abs_'+id,'math', cx, cy);
  ele.push(getAbs);
  $('#stage').append(getAbs);
  sandbox.init(getAbs.id);
};

var menu_pow = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getPow = new math.mathPow('pow_'+id,'math', cx, cy);
  ele.push(getPow);
  $('#stage').append(getPow);
  sandbox.init(getPow.id);
};

var menu_sqrt = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getSqrt = new math.mathSqrt('sqrt_'+id,'math', cx, cy);
  ele.push(getSqrt);
  $('#stage').append(getSqrt);
  sandbox.init(getSqrt.id);
};

var menu_sin = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getSin = new math.mathSin('sin_'+id,'math', cx, cy);
  ele.push(getSin);
  $('#stage').append(getSin);
  sandbox.init(getSin.id);
};

var menu_cos = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getCos = new math.mathCos('cos_'+id,'math', cx, cy);
  ele.push(getCos);
  $('#stage').append(getCos);
  sandbox.init(getCos.id);
};

var menu_tan = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getTan = new math.mathTan('tan_'+id,'math', cx, cy);
  ele.push(getTan);
  $('#stage').append(getTan);
  sandbox.init(getTan.id);
};

var menu_constrain = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getConstrain = new math.mathConstrain('constrain_'+id,'math', cx, cy);
  ele.push(getConstrain);
  $('#stage').append(getConstrain);
  sandbox.init(getConstrain.id);
};

var menu_map = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getMap = new math.mathMap('map_'+id,'math', cx, cy);
  ele.push(getMap);
  $('#stage').append(getMap);
  sandbox.init(getMap.id);
};

var menu_random = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var getRandom = new math.mathRandom('random_'+id,'math', cx, cy);
  ele.push(getRandom);
  $('#stage').append(getRandom);
  sandbox.init(getRandom.id);
};

/*   operator  */
var menu_addition = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var addition = new operator.addition('addition_'+id,'operator', cx, cy);
  ele.push(addition);
  $('#stage').append(addition);
  sandbox.init(addition.id);
};

var menu_subtraction = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var subtraction = new operator.subtraction('subtraction_'+id,'operator', cx, cy);
  ele.push(subtraction);
  $('#stage').append(subtraction);
  sandbox.init(subtraction.id);
};

var menu_multiplication = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var multiplication = new operator.multiplication('multiplication_'+id,'operator', cx, cy);
  ele.push(multiplication);
  $('#stage').append(multiplication);
  sandbox.init(multiplication.id);
};

var menu_division = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var division = new operator.division('division_'+id,'operator', cx, cy);
  ele.push(division);
  $('#stage').append(division);
  sandbox.init(division.id);
};

var menu_modulo = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var modulo = new operator.modulo('modulo_'+id,'operator', cx, cy);
  ele.push(modulo);
  $('#stage').append(modulo);
  sandbox.init(modulo.id);
};

var menu_equal = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var equal = new operator.equal('equal_'+id,'operator', cx, cy);
  ele.push(equal);
  $('#stage').append(equal);
  sandbox.init(equal.id);
};

var menu_notequal = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var notequal = new operator.notequal('notequal_'+id,'operator', cx, cy);
  ele.push(notequal);
  $('#stage').append(notequal);
  sandbox.init(notequal.id);
};

var menu_smaller = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var smaller = new operator.smaller('smaller_'+id,'operator', cx, cy);
  ele.push(smaller);
  $('#stage').append(smaller);
  sandbox.init(smaller.id);
};

var menu_bigger = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var bigger = new operator.bigger('bigger_'+id,'operator', cx, cy);
  ele.push(bigger);
  $('#stage').append(bigger);
  sandbox.init(bigger.id);
};

var menu_smallerequal = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var smallerequal = new operator.smallerequal('smallerequal_'+id,'operator', cx, cy);
  ele.push(smallerequal);
  $('#stage').append(smallerequal);
  sandbox.init(smallerequal.id);
};

var menu_biggerequal = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var biggerequal = new operator.biggerequal('biggerequal_'+id,'operator', cx, cy);
  ele.push(biggerequal);
  $('#stage').append(biggerequal);
  sandbox.init(biggerequal.id);
};

var menu_and = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var conand = new operator.conand('and_'+id,'operator', cx, cy);
  ele.push(conand);
  $('#stage').append(conand);
  sandbox.init(conand.id);
};

var menu_or = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var conor = new operator.conor('or_'+id,'operator', cx, cy);
  ele.push(conor);
  $('#stage').append(conor);
  sandbox.init(conor.id);
};

var menu_not = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var connot = new operator.connot('not_'+id,'operator', cx, cy);
  ele.push(connot);
  $('#stage').append(connot);
  sandbox.init(connot.id);
};
/*   math   */
var menu_boolean = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var boolea = new data.boolea('boolean_'+id,'data', cx, cy,1);
  ele.push(boolea);
  $('#stage').append(boolea);
  sandbox.init(boolea.id);
};

var menu_integer = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var integer = new data.integer('integer_'+id,'data', cx, cy,0);
  ele.push(integer);
  $('#stage').append(integer);
  sandbox.init(integer.id);
};

var menu_array = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var array = new data.array('array_'+id,'data', cx, cy, null);
  ele.push(array);
  $('#stage').append(array);
  sandbox.init(array.id);
};
/*   fx   */
var menu_log = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var log = new fx.log('log_'+id,'fx', cx, cy);
  ele.push(log);
  sizes['log_'+id] = [100,40]; //size
  $('#stage').append(log);
  sandbox.init(log.id);
};

var menu_blink = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var blink = new fx.blink('blink_'+id,'fx', cx, cy);
  ele.push(blink);
  $('#stage').append(blink);
  sandbox.init(blink.id);
};

var menu_colorpicker = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var colorpicker = new fx.colorpicker('colorpicker_'+id,'fx', cx, cy);
  ele.push(colorpicker);
  $('#stage').append(colorpicker);
  $('#'+colorpicker.id+' .colorpicker').colpick({
    flat:true,
    layout:'glue',
    height: 100,
    onChange: function(){
      var val = $('#'+colorpicker.id+' .colpick_hex_field input').val();
      sandbox.set(colorpicker.id, val);
      //sandbox[colorpicker.id].val = val;
    }
  });

  sandbox.init(colorpicker.id);
};

var menu_recorder = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var recorder = new fx.recorder('recorder_'+id,'fx', cx, cy);
  ele.push(recorder);
  $('#stage').append(recorder);
  bee.init("wave_"+recorder.id);
  sandbox.init(recorder.id);
};

/*   note   */
var menu_note = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var note = new helper.note('note_'+id,'helper', cx, cy, 150, 40, "Double click to edit");
  ele.push(note);
  sizes['note_'+id] = [150,40,"Double click to edit"];
  $('#stage').append(note);
};

/*  phone   */
var menu_phoneblock = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var phoneblock = new phone.phoneblock('phoneblock_'+id,'phone', cx, cy);
  ele.push(phoneblock);
  $('#stage').append(phoneblock);
  global.glueApplication.emit('application:phoneviewfocus');
  phones.push({'id':phoneblock.id,'content':[]});
  io.emit('phone', phones);
  sandbox.init(phoneblock.id);
};

var menu_phoneslider = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var phoneslider = new phone.phoneslider('phoneslider_'+id,'phone', cx, cy);
  ele.push(phoneslider);
  $('#stage').append(phoneslider);
  sandbox.init(phoneslider.id);
};

var menu_phoneledmatrix = function(){
  var id = Date.now();
  var cy = $(window).scrollTop() + HEIGHT/2,
  cx = $(window).scrollLeft()+ WIDTH/2;
  var phoneledmatrix = new phone.phoneledmatrix('phoneledmatrix_'+id,'phone', cx, cy);
  ele.push(phoneledmatrix);
  $('#stage').append(phoneledmatrix);
  sandbox.init(phoneledmatrix.id);
};


var map = function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
