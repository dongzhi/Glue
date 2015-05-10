var active = 0;
var tid = $_GET('id');
var socket = io();
var phonedb = null;
var qrID = null;
var tempQR = null;
var isTouchDevice = 'ontouchstart' in document.documentElement;

$( document ).ready(function() {
  socket.on('connect', function () {
    socket.emit('getpv',{ my: 'data' });
    socket.on('phone', function (data) {
      phonedb = data;
      $('body').html('');
      $('body').css({
        background:'#fff'
      })
      if(!tid){
        //no tid, admin view
        if(data.length===0){
          //no items
          $('body').css({
            background:'#f1f1f1'
          })
          $('body').html('<div class="nophone"><img src="/glue.svg"/>Not Available</div>');
        }else{
          $('body').append('<ul class="menu"></ul>');
          $('body').append('<div class="views"></div>');
          $('body').append('<div id="qr"></div>');
          if(active >= data.length){
            active = 0;
          }
          for(var i=0;i<data.length;i++){
            var listr = '<li id="lid'+i+'" data-id='+i+'';
            var con = '<div id="vid'+i+'" data-id='+i+' class="conview';
            if(i===active){
              listr+=' class="active"';
              con+=' show';
            }
            listr+='>'+i+'</li>';
            con+='"></div>';

            $(".menu").append(listr);
            $(".views").append(con);
            parseCon(data[i],'body #vid'+i);
          }
          getQR(data[active].id);
        }

      }else{
        //has tid, client view
        //console.log(tid);
        if(data.length===0){
          //no items
          $('body').css({
            background:'#f1f1f1'
          })
          $('body').html('<div class="nophone"><img src="/glue.svg"/>Not Available</div>');
        }else{
          for(var i=0;i<data.length;i++){
            if(data[i].id === "phoneblock_"+tid){
              //$('body').html('<div>'+parseCon(data[i])+'</div>');
              parseCon(data[i],'body');
            }
          }
        }

      }
      //(JSON.stringify(data.d));
    });
    //Disconnect
    socket.on('disconnect', function() {
      $('body').css({
        background:'#f1f1f1'
      })
      $('body').html('<div class="disconnect">Disconnected</div>');
    });
  });


  $('body').on('click','.menu li',function(e){
    e.preventDefault();
    var uid = this.dataset.id;
    active = parseInt(uid);
    $('body .menu li').removeClass("active");
    $('body #lid'+uid).addClass("active");
    $('body .views .conview').removeClass("show");
    $('body #vid'+uid).addClass("show");
    getQR(phonedb[uid].id);
  })

  $("body").on('mousedown','.matrix_dot',function(e){
        e.preventDefault();
        var pos = this.dataset.m.split('_');
        var pid = this.dataset.pid;
        var uid = this.dataset.t;
        var status = parseInt(this.dataset.of) === 0? 1:0;
        if(status){
          this.dataset.of = 1;
          $(this).addClass('dotactive');
        }else{
          this.dataset.of = 0;
          $(this).removeClass('dotactive');
        }
        socket.emit('setValue',{ fx:'matrix',tid: pid, id:uid, val:[pos[0],pos[1],status]});
  })

});

function parseCon(data,parent){
  var pid = data.id;
  var con = data.content;
  for(var i= 0; i< con.length;i++){
    var json = con[i];
    if(json.fx === 'slider'){
      var sid = json.id;
      $(parent).append('<div id="'+sid+'"></div>');
      $("#"+sid).css({
        'position':'absolute',
        'display':'inline-block',
        'top': parseInt(json.x),
        'left': parseInt(json.y),
        'width': parseInt(json.w),
        'height': parseInt(json.h)
      });
      $("#"+sid).noUiSlider({
        start: parseInt(json.value),
	      connect: "lower",
        direction: 'rtl',
	      orientation: 'vertical',
      	range: {
      		'min': parseInt(json.r[0]),
      		'max': parseInt(json.r[1])
      	}
      });

      $("#"+sid).on({
      	slide: function(){
          socket.emit('setValue',{ fx:'slider',tid: pid, id:sid, val:parseInt($(this).val())});
      	},
      });

    }else if(json.fx === 'matrix'){
      //console.log('refresh');
      var matrix = ledmatrix(pid, json.id, json.x, json.y, json.w, json.num, json.value);
      $(parent).html(matrix);
    }
    ////////
  }
}

function getQR(uid){
  //console.log("getting QR...");
  if(qrID !== uid){
    var pid = uid.split('phoneblock_');
    var _url = "/qr/"+pid[1];
    $.ajax({
      type: "GET",
      url: _url,
      success: function(data) {
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+data.size+' '+data.size+'">';
        svg+='<path d="'+data.path+'"></path></svg>';
        $('body #qr').html(svg);
        tempQR = svg;
        qrID = uid;
      }
    }).fail(function(res) {
      // Optionally alert the user of an error here...
        $('body #qr').html("Server Error: " + res.status + " " + res.statusText);
    });
  }else{
    $('body #qr').html(tempQR);
  }

  //return JSON.stringify(json)
}

function $_GET(q,s) {
    s = (s) ? s : window.location.search;
    var re = new RegExp('&amp;'+q+'=([^&amp;]*)','i');
    return (s=s.replace(/^\?/,'&amp;').match(re)) ?s=s[1] :s='';
}

var ledmatrix = function(pid, id, x, y, w, num, val){ //IIFE

  //private params & functions
  //var width = 150, height = 123;
  // public
  var _ledmatrix = function(pid, id, x, y, w, num, val){
    // Re-purposing an existing div element.
    var _this = this;

    if (!_this._component) {
      _this._component = document.createElement('div');
    }

    //Set properties
    _this._component.width = w;
    _this._component.height = w;
    _this._component.x = x;
    _this._component.y = y;

    _this._component.id = id;
    _this._component.className = 'ledmatrix';
    _this._component.style.width = w + 'px';
    _this._component.style.height = w + 'px';
    _this._component.style.left = x+ 'px';
    _this._component.style.top = y+ 'px';

    while (_this._component.hasChildNodes()) {
      _this._component.removeChild(_this._component.firstChild);
    }

    //Create container
    _this._node = document.createElement("div");
    _this._node.className = 'matrix_container';
    _this._node.style.width = w + 'px';
    _this._node.style.height = w + 'px';

    while (_this._node.hasChildNodes()) {
      _this._node.removeChild(_this._node.firstChild);
    }

    //Create dots
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        var dot = document.createElement("div");
        dot.id = id+'_'+i+'_'+j;
        dot.dataset.pid = pid;
        dot.dataset.t = id;
        dot.dataset.m =i+'_'+j;
        dot.dataset.of = val[1][i][j];
        dot.className = 'matrix_dot';
        if(val[1][i][j]){
          dot.className += ' dotactive';
        }
        dot.width = 0.8*w/8;
        dot.height = 0.8*w/8;
        dot.x = j*w/8+0.1*w/8;
        dot.y = i*w/8+0.1*w/8;
        dot.style.width = dot.width + 'px';
        dot.style.height = dot.height + 'px';
        dot.style.left = dot.x + 'px';
        dot.style.top = dot.y + 'px';
        _this._node.appendChild(dot);
      }
    }

    _this._component.appendChild(_this._node);

    return _this._component;
  };

  //return
  return _ledmatrix;
}();
