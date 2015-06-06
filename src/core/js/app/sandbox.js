var sandbox = {
  def:{},
  main:{},
  alwaysOn: true,
  action:{},
  update: function(){
    var str = '';
    for(var i in sandbox.def){
      if(sandbox.def[i]){
        var item = sandbox.def[i];
        for(var j=0;j<item.length;j++){
          str+=item[j];
          str+='<br/>';
        }
      }
      str+='<br/>';
    }
    str+='var main = function(){ <br/>';
    for(var i in sandbox.main){
      if(sandbox.main[i]){
        str += sandbox.main[i];
      }
    }
    str+='<br/>};';
    str+='<br/>';
    str+='main();';

    if(global.glueApplication.lastFocusedWindow){
      global.glueApplication.lastFocusedWindow.browserWindow.cv = str;
    }
    if(global.glueApplication.codeView){
      global.glueApplication.codeView.updateCV();
    }
  },
  init: function(uid){
      var type = sandbox.getType(uid);
      switch(type){
        case 'boolea':
          return sandbox.boolea(uid);
          break;
        case 'integer':
          return sandbox.integer(uid);
          break;
        case 'array':
          return sandbox.array(uid);
          break;
        case 'slider':
          return sandbox.slider(uid);
          break;
        case 'toggle':
          return sandbox.toggle(uid);
          break;
        case 'log':
          return sandbox.logit(uid);
          break;
        case 'mathMin':
          return sandbox.getMin(uid);
          break;
        case 'mathMax':
          return sandbox.getMax(uid);
          break;
        case 'mathAbs':
          return sandbox.getAbs(uid);
          break;
        case 'mathPow':
          return sandbox.getPow(uid);
          break;
        case 'mathSqrt':
          return sandbox.getSqrt(uid);
          break;
        case 'mathSin':
          return sandbox.getSin(uid);
          break;
        case 'mathCos':
          return sandbox.getCos(uid);
          break;
        case 'mathTan':
          return sandbox.getTan(uid);
          break;
        case 'mathConstrain':
          return sandbox.getConstrain(uid);
          break;
        case 'mathMap':
          return sandbox.getMap(uid);
          break;
        case 'mathRandom':
          return sandbox.getRandom(uid);
          break;
        case 'addition':
          return sandbox.addition(uid);
          break;
        case 'subtraction':
          return sandbox.subtraction(uid);
          break;
        case 'multiplication':
          return sandbox.multiplication(uid);
          break;
        case 'division':
          return sandbox.division(uid);
          break;
        case 'modulo':
          return sandbox.modulo(uid);
          break;
        case 'equal':
          return sandbox.equal(uid);
          break;
        case 'notequal':
          return sandbox.notequal(uid);
          break;
        case 'smaller':
          return sandbox.smaller(uid);
          break;
        case 'bigger':
          return sandbox.bigger(uid);
          break;
        case 'smallerequal':
          return sandbox.smallerequal(uid);
          break;
        case 'biggerequal':
          return sandbox.biggerequal(uid);
          break;
        case 'conand':
          return sandbox.conand(uid);
          break;
        case 'conor':
          return sandbox.conor(uid);
          break;
        case 'connot':
          return sandbox.connot(uid);
          break;
        case 'ifelse':
          return sandbox.ifelse(uid);
          break;
        case 'forloop':
          return sandbox.forloop(uid);
          break;
        case 'whileloop':
          return sandbox.whileloop(uid);
          break;
        case 'dodo':
          return sandbox.dodo(uid);
          break;
        case 'leno':
          return sandbox.leno(uid);
          break;
        case 'uno':
          return sandbox.uno(uid);
          break;
        case 'led':
          return sandbox.led(uid);
          break;
        case 'piezo':
          return sandbox.piezo(uid);
          break;
        case 'knock':
          return sandbox.knock(uid);
          break;
        case 'solenoid':
          return sandbox.solenoid(uid);
          break;
        case 'servo':
          return sandbox.servo(uid);
          break;
        case 'ledmatrix':
          return sandbox.ledmatrix(uid);
          break;
        case 'rgbled':
          return sandbox.rgbled(uid);
          break;
        case 'blink':
          return sandbox.blink(uid);
          break;
        case 'sequence':
          return sandbox.sequence(uid);
          break;
        case 'colorpicker':
          return sandbox.colorpicker(uid);
          break;
        case 'pot':
          return sandbox.pot(uid);
          break;
        case 'phoneblock':
          return sandbox.phoneblock(uid);
          break;
        case 'phoneslider':
          return sandbox.phoneslider(uid);
          break;
        case 'phoneledmatrix':
          return sandbox.phoneledmatrix(uid);
          break;
        case 'recorder':
          return sandbox.recorder(uid);
        case 'note':
          break;
      }
  },
  getType: function(uid){
    for(var i=0;i<ele.length;i++){
      if(ele[i].id === uid){
        return ele[i].dataset.name;
      }
    }
  },
  set: function(uid, val){
    sandbox.def[uid][1] = uid+'= { index:'+ sandbox[uid].index+',fx:'+sandbox[uid].fx+'};';
    sandbox[uid].val = val;
    sandbox.update();
    sandbox.loop();
    return true;
  },
  del: function(uid){
    //todo
    //del phone components

    if(sandbox[uid]){
      for(var i in sandbox[uid].in){
        var p_name = sandbox[uid].in[i];
        delete sandbox.def[p_name];
      }
    }
    if(sandbox[uid]){
      for(var i in sandbox[uid].out){
        var p_name = sandbox[uid].out[i];
        delete sandbox.def[p_name];

        //find linked ins
        //!!! could be improved
        //passin data instead of search/integrated with connections del
        for(var j in connections){
          if(connections[j][0] === p_name){
              sandbox[j] = null;
          }
        }
      }
    }
    delete sandbox.def[uid];
    delete sandbox[uid];
    if(timerdb[uid]){
      clearInterval(timerdb[uid]);
      delete timerdb[uid];
    }
    if(timeoutdb[uid]){
      clearTimeout(timeoutdb[uid]);
      delete timeoutdb[uid];
    }
    sandbox.update();
    return true;
  },
  link: function(to,from){
    var tid = document.getElementById(to).dataset.t;
    var fid = document.getElementById(from).dataset.t;
    sandbox[to] = sandbox[from];

    //code ui
    sandbox.def[fid][1] = fid+'= { index:'+ sandbox[fid].index+',fx:'+sandbox[fid].fx+'};';
    sandbox.main[to] = 'sandbox["'+to+'"]= sandbox["'+from+'"];';
    sandbox.update();

    sandbox.loop();
    return true;
  },
  unlink: function(from,to){
    var rid = document.getElementById(from).dataset.t;
    var tid = document.getElementById(to).dataset.t;
    sandbox[from] = null;

    //check timer
    if(timerdb[tid]){
      clearInterval(timerdb[tid]);
      delete timerdb[tid];
    }
    if(timeoutdb[tid]){
      clearTimeout(timeoutdb[tid]);
      delete timeoutdb[tid];
    }

    //check phones
    for(var i=0;i<phones.length;i++){
      if(phones[i].id === rid){
        var con = phones[i].content;
        for(var j=0;j<con.length;j++){
          if(con[j].id === tid){
            con.splice(j,1);
            io.emit('phone', phones);
          }
        }
      }
    }

    //code ui
    delete sandbox.main[from];
    sandbox.update();

    sandbox.loop();
  },
  clearTimers: function(){
    //reset timers
    for(var i in timerdb){
      clearInterval(timerdb[i]);
      delete timerdb[i];
    }
    for(var i in timeoutdb){
      clearTimeout(timeoutdb[i]);
      delete timeoutdb[i];
    }
  },
  loop: function(escape){

    var esc = escape === null? true: escape;

    //update index
    sandbox.sortIndex();

    for(var i in sandbox){
      if(typeof sandbox[i] !== 'undefined' && sandbox[i] !== null && sandbox[i] !== 'null' && typeof sandbox[i].index !== 'undefined'){

          // if(i === escape){
          //   esc = false;
          // }else{
          //   esc = true;
          // }
          esc = sandbox[i].src=== escape? false :true;

          if(sandbox[i].index === 0 && esc){
            sandbox.resultFx(i);
          }


      }
    }
    return true;
  },
  resultFx: function(id){
    //console.log(id);
    var pins = sandbox[id].in; //name arr
    var result = [];
    if(pins){
      for(var j = 0; j<pins.length;j++){
        var in_pin = pins[j];
        result.push(sandbox.getPinFx(in_pin));
      }
    }

    return sandbox[id].fx(result);
  },
  getPinFx: function(pinid){
    //console.log("getPinFx: "+pinid);
    var from_data = sandbox[pinid];
    var from_pin = connections[pinid];
    var result = [];
    if(from_pin){
      var pid = document.getElementById(from_pin).dataset.t;
      var pins = sandbox[pid].in; //name arr
      if(pins && sandbox[pid].index !== 0){
        for(var j = 0; j<pins.length;j++){
          var in_pin = pins[j];
          result.push(sandbox.getPinFx(in_pin));
        }
      }
    }else{
      from_data = null;
    }
    //console.log(pinid+';'+from_data+';'+result);
    if(typeof from_data === 'function'){
      return from_data(result);
    }else{
      return from_data;
    }

  },
  sortIndex: function(){

    //would add a loop to set all indexs 0 before update the Index
    ////sandbox[i].index = 0;
    for(var i in sandbox){
      //find sandbox
      if(typeof sandbox[i] !== 'undefined' && sandbox[i] !== null && sandbox[i] !== 'null' && typeof sandbox[i].index !== 'undefined'){
        //if(sandbox[i].index === 0){
            //find links
            sandbox.indexItem(i);
        //}
      }
    }

  },
  indexItem: function(i){
    //console.log("sort indexing..."+i);
    for(var j=0;j<sandbox[i].in.length;j++){
        var in_pin = sandbox[i].in[j];
        var from_pin = connections[in_pin];
        //console.log("checking input pin... "+in_pin+' from '+from_pin);
        if(from_pin){
          //from_pin array
          var pid = document.getElementById(from_pin).dataset.t;

          //console.log("checking parent block:"+pid);
          //lower from index
          //sandbox[pid].index = 0; //bug! when unlink
          if(sandbox[pid].index >= sandbox[i].index && sandbox[pid].src !== 1 && sandbox[pid].src !== 2){
            sandbox[pid].index = sandbox[i].index;
            sandbox[pid].index--;
            //console.log('set '+pid+': '+sandbox[pid].index);
            sandbox.indexItem(pid);
          }
        }
    }
  },
  pot: function(uid){
    var vfx = function(data){
      if(data[0]!== null && typeof data[0] === 'object'){
          var num = parseInt(data[0].pin);
          if(data[0].isOn){
            if(global.board.isReady){
              if(!sensordb[uid]){
                var sensor = new five.Sensor({
                  id: uid,
                  pin: "A"+num,
                  freq: 20,
                });
                sensor.on("data", function() {
                  //console.log("haha");
                  sandbox[uid].val = this.raw;
                  sandbox.loop();
                });
                sensordb[uid] = sensor;
              }

            }
            return sandbox[uid].val;
          }else{
            if(typeof sensordb[uid] !== 'undefined' && sensordb[uid] !== null){
              sensordb[uid].removeAllListeners("data");
              sensordb[uid].io.removeAllListeners("analog-read-"+num);
              sensordb[uid].io.reset();
              delete sensordb[uid];
              for(var i in global.board.register){
                if(global.board.register[i].id === uid){
                  global.board.register.splice(i,1);
                }
              }
            }
          }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: 0
    };
    var pins = [
      {
        'name':'IN',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  knock: function(uid){
    var vfx = function(data){
      if(data[0]!== null && typeof data[0] === 'object'){
          var num = parseInt(data[0].pin);
          if(data[0].isOn){
            if(global.board.isReady){
              if(!sensordb[uid]){
                var sensor = new five.Sensor({
                  id: uid,
                  pin: "A"+num,
                  freq: 20,
                });
                sensor.on("data", function() {
                  //console.log("haha");
                  sandbox[uid].val = this.raw;
                  sandbox.loop();
                });
                sensordb[uid] = sensor;
              }

            }
            return sandbox[uid].val;
          }else{
            if(typeof sensordb[uid] !== 'undefined' && sensordb[uid] !== null){
              sensordb[uid].removeAllListeners("data");
              sensordb[uid].io.removeAllListeners("analog-read-"+num);
              sensordb[uid].io.reset();
              delete sensordb[uid];
              for(var i in global.board.register){
                if(global.board.register[i].id === uid){
                  global.board.register.splice(i,1);
                }
              }
            }
          }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: 0
    };
    var pins = [
      {
        'name':'IN',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  integer: function(uid){
    var vfx = function(){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: 0,
    };
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  boolea: function(uid){
    var vfx = function(){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: true,
    };
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  array: function(uid){
    var vfx = function(){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: [],
    };
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  toggle: function(uid){
    var vfx = function(){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: false,
    };
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  slider: function(uid){
    var vfx = function(){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val: 0,
    };
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  logit: function(uid){
    var tid = 'log_'+uid;
    var vfx = function(data){
      var str = '';
      if(typeof data[0] === 'function'){
        str = data[0];
      }else{
        str = JSON.stringify(data[0]);
      }
      document.getElementById(tid).innerHTML = '<div class="inner" data-drag="true" data-pid="'+uid+'">'+str+'</div>';
      return data;
    };
    sandbox[uid] = {
      index: 0,
      src:0,
      out:[],
      in:[],
      fx: vfx
    };
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
          sandbox[uid].in.push(pin);
      }else if(type === 'out'){
          sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
    return true;
  },
  getMin: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return Math.min(data[0], data[1]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getMax: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return Math.max(data[0], data[1]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getAbs: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        return Math.abs(data[0]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getPow: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return Math.pow(data[0], data[1]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'BASE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'EXPONENT',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getSqrt: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        return Math.sqrt(data[0]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getSin: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        return Math.sin(data[0]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'RAD',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getCos: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        return Math.cos(data[0]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'RAD',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getTan: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        return Math.tan(data[0]);
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'RAD',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getConstrain: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        if(data[0] !== null && data[1] !== null){
          //min data[1][0]
          //max data[1][1]
          var val = data[0];
          if(val>data[1][1]){
            val = data[1][1];
          }
          if(val<data[1][0]){
            val = data[1][0];
          }
          return val;
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'RANGE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getMap: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 3){
        if(data[0] !== null && data[1] !== null && data[2] !== null){
            return parseFloat(data[2][0] + (data[2][1] - data[2][0]) * ((data[0] - data[1][0]) / (data[1][1] - data[1][0])));
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FROMRANGE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'TORANGE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  getRandom: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        if(data[0] !== null){
          return Math.floor((Math.random()*data[0][1]) + data[0][0]);
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'RANGE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  addition: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return data[0]+data[1];
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  subtraction: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return data[0]-data[1];
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  multiplication: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return data[0]*data[1];
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  division: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return data[0]/data[1];
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  modulo: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        return data[0]%data[1];
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'IN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  equal: function(uid){
    var vfx = function(){
      return '==';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  notequal: function(uid){
    var vfx = function(){
      return '!=';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  smaller: function(uid){
    var vfx = function(){
      return '<';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  bigger: function(uid){
    var vfx = function(){
      return '>';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  smallerequal: function(uid){
    var vfx = function(){
      return '<=';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  biggerequal: function(uid){
    var vfx = function(){
      return '>=';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  conand: function(uid){
    var vfx = function(){
      return '&&';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  conor: function(uid){
    var vfx = function(){
      return '||';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  connot: function(uid){
    var vfx = function(){
      return '!';
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  ifelse: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 5){
        if(data[2] === '!'){
          if(data[0]!== null){
            var j = (new Function('if('+data[2]+data[0]+'){ return true;}else{ return false;}')());
            if(j){
              return data[3];
            }else{
              return data[4];
            }
          }else if(data[1]!== null){
            var j = (new Function('if('+data[2]+data[1]+'){ return true;}else{ return false;}')());
            if(j){
              return data[3];
            }else{
              return data[4];
            }
          }
        }else{
          if(data[0]!== null && data[1]!== null && data[2]!== null){
            var j = (new Function('if('+data[0]+data[2]+data[1]+'){ return true;}else{ return false;}')());
            if(j){
              return data[3];
            }else{
              return data[4];
            }
          }
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'INPUT1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'INPUT2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'CONDITION',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'TRUEFX',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FALSEFX',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  forloop: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 3){
        if(data[0]!== null && data[1]!== null && data[2]!== null && typeof data[2] !== 'undefined'){
          var j = {
            type: 'sequence',
            data: [],
          };
          if(typeof data[2] === 'object'){
              var sub = data[2];
              if(sub.type === 'sequence'){
                if(sub.data!==null){
                  for(var i=0;i<data[1]-data[0];i++){
                    for(var k in sub.data){
                      j.data.push(sub.data[k]);
                    }
                  }
                }
              }else{
                for(var i=0;i<data[1]-data[0];i++){
                  j.data.push(sub);
                }
              }
          }
          return j;
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'FIRSTINDEX',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'LASTINDEX',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FX',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  sequence: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 5){
        var j = {
          type: 'sequence',
          data: [],
        };
        for(var i=0;i<5;i++){
          // if(typeof data[i] === 'function' && data[i] !== null){
          //   j.data.push(data[i]);
          // }
          if(typeof data[i] === 'object' && data[i] !== null){
            var sub = data[i];
            if(sub.type === 'sequence'){
              if(sub.data!==null){
                //j.data.concat(sub.data);
                for(var k in sub.data){
                  j.data.push(sub.data[k]);
                }
              }
            }else{
              j.data.push(sub);
            }
          }
        }
        return j;
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'FX1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FX2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FX3',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FX4',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FX5',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  colorpicker: function(uid){
    var color = function(data){
      if(data[0]!==null || data[1]!==null || data[2]!==null){
        data[0] = data[0] === null? $('#'+uid+' .colpick_rgb_r input').val():data[0];
        data[1] = data[1] === null? $('#'+uid+' .colpick_rgb_g input').val():data[1];
        data[2] = data[2] === null? $('#'+uid+' .colpick_rgb_b input').val():data[2];
        var col = {
          r: parseInt(data[0]),
          g: parseInt(data[1]),
          b: parseInt(data[2]),
        };
        $('#'+uid+' .colorpicker').colpickSetColor(col,true);
        sandbox[uid].val = $.colpick.rgbToHex(col);
      }else if(data[3]!==null){

      }
      return sandbox[uid].val;
    };
    var vfx = function(data){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src:0,
      out:[],
      in:[],
      fx: vfx,
      val: 'ffffff'
    };
    var pins = [
      {
        'name':'R',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'G',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'B',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'H',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'S',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'B',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': color,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  leno: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 15){
        data[0] === null ? 1 : data[0];

        if(!aboard){
          if(global.board){
            aboard = global.board
          }else{
            aboard = new five.Board();
            global.board = aboard;
            aboard.on("ready", function() {
              notify("Your board is ready.");
            });
          }
        }

        if(data[0]){
          if(aboard.isReady){
            sandbox[uid].isOn = 1;
            for(var i = 1; i < 15; i++){
              if(typeof data[i] === 'function'){
                data[i]();
              }
            }
          }else{
            notify("Board is not ready. Please try again.");
          }
        }else{
          sandbox[uid].isOn = 0;
          //notify('Stop');
        }
      }
    };
    var analog = function(i){
      return function(){
        var j = {
          pid: uid,
          isOn: sandbox[uid].isOn,
          pin: sandbox[uid].analog[i],
        }
        return j;
      }
    };
    sandbox[uid] = {
      isOn: 0,
      index: 0,
      src:1,
      out:[],
      in:[],
      fx: vfx,
      analog:[0,1,2,3,4,5]
    };
    var pins = [
      {
        'name':'START',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN0',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN3',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN4',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN5',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN6',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN7',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN8',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN9',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN10',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN11',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN12',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN13',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'A0',
        'type': 'out',
        'pfx': analog(0),
      },
      {
        'name':'A1',
        'type': 'out',
        'pfx': analog(1),
      },
      {
        'name':'A2',
        'type': 'out',
        'pfx': analog(2),
      },
      {
        'name':'A3',
        'type': 'out',
        'pfx': analog(3),
      },
      {
        'name':'A4',
        'type': 'out',
        'pfx': analog(5),
      },
      {
        'name':'A5',
        'type': 'out',
        'pfx': analog(5),
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
    sandbox.loop();
  },
  uno: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 14){

          if(!aboard){
            initBoard();
          }

          if(sandbox[uid].isOn){
            if(aboard.isReady){
              //sandbox[uid].isOn = 1;
              for(var i = 0; i < 14; i++){
                if(typeof data[i] === 'function'){
                  data[i]();
                }
              }
            }else{
              notify("Board is not ready. Please try again.");
            }
          }else{
            //notify('Stop');
          }
      }
    };
    var analog = function(i){
      return function(){
        var j = {
          pid: uid,
          isOn: sandbox[uid].isOn,
          pin: sandbox[uid].analog[i],
        }
        return j;
      }
    };
    sandbox[uid] = {
      isOn: 0,
      index: 0,
      src:1,
      out:[],
      in:[],
      fx: vfx,
      analog:[0,1,2,3,4,5]
    };
    var pins = [
      {
        'name':'PIN0',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN1',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN2',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN3',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN4',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN5',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN6',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN7',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN8',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN9',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN10',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN11',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN12',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'PIN13',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'A0',
        'type': 'out',
        'pfx': analog(0),
      },
      {
        'name':'A1',
        'type': 'out',
        'pfx': analog(1),
      },
      {
        'name':'A2',
        'type': 'out',
        'pfx': analog(2),
      },
      {
        'name':'A3',
        'type': 'out',
        'pfx': analog(3),
      },
      {
        'name':'A4',
        'type': 'out',
        'pfx': analog(5),
      },
      {
        'name':'A5',
        'type': 'out',
        'pfx': analog(5),
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
    sandbox.loop();
  },
  led: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        var num = -1;
        for(var i in connections){
          if(connections[i][0] === uid+'_PIN'){
            num = i.split('_').pop();
            num = parseInt(num.split("PIN").pop());
          }
        }

        if(num > -1){
          if(typeof data[0] === 'boolean'){
            if(data[0]){
              var j = function(){
                global.board.pinMode(num, five.Pin.OUTPUT);
                global.board.digitalWrite(num,1);
              }
              return j;
            }else{
              var j = function(){
                global.board.pinMode(num, five.Pin.OUTPUT);
                global.board.digitalWrite(num,0);
              }
              return j;
            }
          }else if(typeof data[0] === 'number'){
            var value = data[0] > 255 ? 255 : data[0] < 0 ? 0 : data[0];
            var j = function(){
              global.board.pinMode(num, five.Pin.PWM);
              global.board.analogWrite(num,value);
            }
            return j;
          }else if(typeof data[0] === 'function'){
            return data[0](num);
          }else if(typeof data[0] === 'object' && data[0] !== null){
            if(data[0].type === 'sequence'){
              var j = function(){
                var fxes = data[0].data;
                var trigger = [0];
                for(var i=0;i<fxes.length;i++){
                  trigger.push(parseInt(fxes[i].times) * parseInt(fxes[i].delay) * 2); //times * 2 -_-_
                }

                for(var i=0;i<trigger.length-1;i++){

                  var timeout = setTimeout(sandbox.findFx(fxes[i],num,uid), trigger[i]);

                  timeoutdb[uid+'_s'+i] = timeout;
                }
              };
              return j;
            }else{
              return sandbox.findFx(data[0],num,uid)
            }
            //////
          }
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'DATA',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  piezo: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        var num = -1;
        for(var i in connections){
          if(connections[i][0] === uid+'_PIN'){
            num = i.split('_').pop();
            num = parseInt(num.split("PIN").pop());
          }
        }

        if(num > -1){
          if(typeof data[0] === 'boolean'){
            if(data[0]){
              var j = function(){
                global.board.pinMode(num, five.Pin.OUTPUT);
                global.board.digitalWrite(num,1);
              }
              return j;
            }else{
              var j = function(){
                global.board.pinMode(num, five.Pin.OUTPUT);
                global.board.digitalWrite(num,0);
              }
              return j;
            }
          }else if(typeof data[0] === 'number'){
            var value = data[0] > 255 ? 255 : data[0] < 0 ? 0 : data[0];
            var j = function(){
              global.board.pinMode(num, five.Pin.PWM);
              global.board.analogWrite(num,value);
            }
            return j;
          }else if(typeof data[0] === 'function'){
            return data[0](num);
          }else if(typeof data[0] === 'object' && data[0] !== null){
            if(data[0].type === 'sequence'){
              var j = function(){
                var fxes = data[0].data;
                var trigger = [0];
                for(var i=0;i<fxes.length;i++){
                  trigger.push(parseInt(fxes[i].times) * parseInt(fxes[i].delay) * 2); //times * 2 -_-_
                }

                for(var i=0;i<trigger.length-1;i++){

                  var timeout = setTimeout(sandbox.findFx(fxes[i],num,uid), trigger[i]);

                  timeoutdb[uid+'_s'+i] = timeout;
                }
              };
              return j;
            }else{
              return sandbox.findFx(data[0],num,uid)
            }
            //////
          }
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'DATA',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  solenoid: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 1){
        var num = -1;
        for(var i in connections){
          if(connections[i][0] === uid+'_PIN'){
            num = i.split('_').pop();
            num = parseInt(num.split("PIN").pop());
          }
        }

        if(num > -1){
          if(typeof data[0] === 'boolean'){
            if(data[0]){
              var j = function(){
                global.board.pinMode(num, five.Pin.OUTPUT);
                global.board.digitalWrite(num,1);
              }
              return j;
            }else{
              var j = function(){
                global.board.pinMode(num, five.Pin.OUTPUT);
                global.board.digitalWrite(num,0);
              }
              return j;
            }
          }else if(typeof data[0] === 'number'){
            var value = data[0] > 255 ? 255 : data[0] < 0 ? 0 : data[0];
            var j = function(){
              global.board.pinMode(num, five.Pin.PWM);
              global.board.analogWrite(num,value);
            }
            return j;
          }else if(typeof data[0] === 'function'){
            return data[0](num);
          }else if(typeof data[0] === 'object' && data[0] !== null){
            if(data[0].type === 'sequence'){
              var j = function(){
                var fxes = data[0].data;
                var trigger = [0];
                for(var i=0;i<fxes.length;i++){
                  trigger.push(parseInt(fxes[i].times) * parseInt(fxes[i].delay) * 2); //times * 2 -_-_
                }

                for(var i=0;i<trigger.length-1;i++){

                  var timeout = setTimeout(sandbox.findFx(fxes[i],num,uid), trigger[i]);

                  timeoutdb[uid+'_s'+i] = timeout;
                }
              };
              return j;
            }else{
              return sandbox.findFx(data[0],num,uid)
            }
            //////
          }
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'DATA',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  rgbled: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 3){
        var num = [-1,-1,-1];
        data[0] = data[0] === null? true: data[0];
        if(data[1]!==null && typeof data[1] === 'string'){
          $('#'+uid+' .node_rgbled').css({
            background: '#'+data[1]
          });

          if(data[2]!==null){
            for(var i in connections){
              if(connections[i][0] === uid+'_R'){
                var n = i.split('_').pop();
                num[0] = parseInt(n.split("PIN").pop());
              }else if(connections[i][0] === uid+'_G'){
                var n = i.split('_').pop();
                num[1] = parseInt(n.split("PIN").pop());
              }else if(connections[i][0] === uid+'_B'){
                var n = i.split('_').pop();
                num[2] = parseInt(n.split("PIN").pop());
              }
            }

            if(typeof data[2] === 'boolean'){
              //on or off
              if(data[2]){
                var j = function(){
                  var rgb = new five.Led.RGB({
                    pins: num,
                    isAnode: data[0]
                  });

                  rgb.stop();
                  rgb.stop().off();
                  rgb.color('#'+data[1]);
                  rgb.on();
                }
                return j;
              }else{
                var j = function(){
                  var rgb = new five.Led.RGB({
                    pins: num,
                    isAnode: data[0]
                  });

                  rgb.stop();
                  rgb.stop().off();
                  rgb.color('#'+data[1]);
                  rgb.off();
                }
                return j;
              }
            }else if(typeof data[2] === 'number'){
              //brightness
              var value = data[0] > 255 ? 255 : data[0] < 0 ? 0 : data[0];
              var j = function(){

              }
              return j;
            }


          }//end if

        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'R',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'G',
        'type': 'out',
        'pfx': null,
      },
      {
        'name':'B',
        'type': 'out',
        'pfx': null,
      },
      {
        'name':'ANODE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'COLOR',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'FX',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  blink: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 2){
        if(data[0] !== null && data[1] !== null){
          var j = {
            fx:'blink',
            times: data[0],
            delay: data[1]
          }
          return j;
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'TIMES',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'DELAY',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  findFx: function(item,pin,uid){
      var type = item.fx;
      var times = parseInt(item.times);
      var delay = parseInt(item.delay);
      if(times > 0){
        if(type === 'blink'){
          //led blink
          return function(){
            var byte;
            var counter = 0;
            global.board.pinMode(pin, five.Pin.OUTPUT);
            global.board.digitalWrite(pin, 1);
            if(timerdb[uid]){
              clearInterval(timerdb[uid]);
            }
            timerdb[uid] = setInterval(function(){
                global.board.digitalWrite(pin, (byte ^= 0x01));
                counter++;
                if(counter/2 === times){
                    clearInterval(timerdb[uid]);
                    delete timerdb[uid];
                }
                //console.log(counter+': blink'+id);
            },delay);
          }
        }else if(type === 'fade'){
          //led fade
        }
      }
  },
  phoneblock: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data[0] !== null){
        for(var i=0;i<phones.length;i++){
          if(phones[i].id === uid){
            phones[i].content = [data[0]];
            //console.log("emit from phoneblock");
            io.emit('phone', phones);
          }
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 2,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'UI',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'ACCEL',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'GYRO',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'GRAVITY',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'TEMP',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'GPS',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'BLUETOOTH',
        'type': 'out',
        'pfx': vfx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  phoneslider: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 5){
        data[0] = data[0] === null ? 80:data[0];
        data[1] = data[1] === null ? 80:data[1];
        data[2] = data[2] === null ? 30:data[2];
        data[3] = data[3] === null ? 300:data[3];
        data[4] = data[4] === null ? [0,255]:data[4];
        var j = {
            id: uid,
            fx:'slider',
            x: data[0],
            y: data[1],
            w: data[2],
            h: data[3],
            r: data[4],
            value: sandbox[uid].val
        }
        return j;
      }
    };
    var ofx =function(){
      return sandbox[uid].val;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val:0
    };
    var pins = [
      {
        'name':'UI',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'X',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'Y',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'WIDTH',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'HEIGHT',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'RANGE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'VALUE',
        'type': 'out',
        'pfx': ofx,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  phoneledmatrix: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 4){
        data[0] = data[0] === null ? 50:data[0];
        data[1] = data[1] === null ? 50:data[1];
        data[2] = data[2] === null ? 250:data[2];
        data[3] = data[3] === null ? 1:data[3];
        var j = {
            id: uid,
            fx:'matrix',
            x: data[0],
            y: data[1],
            w: data[2],
            num: data[3],
            value: sandbox[uid].val
        }
        return j;
      }
    };
    var row =function(){
      return sandbox[uid].val[0][0];
    };
    var col =function(){
      return sandbox[uid].val[0][1];
    };
    var onoff =function(){
      return sandbox[uid].val[0][2];
    };
    var draw =function(){
      var shift = [];
      for(var i = 0; i<8; i++){
        shift.push(sandbox[uid].val[1][7-i]);
        shift[i] = shift[i].join('');
      }
      return shift;
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
      val:[[0,0,0],marray(8,8,0)]
    };
    var pins = [
      {
        'name':'UI',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'X',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'Y',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'WIDTH',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'QTY',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'ROW',
        'type': 'out',
        'pfx': row,
      },
      {
        'name':'COL',
        'type': 'out',
        'pfx': col,
      },
      {
        'name':'ONOFF',
        'type': 'out',
        'pfx': onoff,
      },
      {
        'name':'VALUE',
        'type': 'out',
        'pfx': draw,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  servo: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 3){
        //range
        data[0] = data[0] === null ? [0, 180] : data[0];
        //to
        data[1] = data[1] === null ? data[0][0]+1 : data[1];
        //type
        data[2] = data[2] === 1 ? 'continuous':'standard';

        var num = -1;
        for(var i in connections){
          if(connections[i][0] === uid+'_PIN'){
            num = i.split('_').pop();
            num = parseInt(num.split("PIN").pop());
          }
        }

        if(num > -1){
          var j = function(){
            var servo;
            if(outputdb[uid]){
              servo = outputdb[uid];
            }else{
              servo = new five.Servo({
                pin: num,
                range: data[0],
                type: data[2]
              });
              outputdb[uid] = servo;
            }

            servo.to(data[1]);
          }

          return j;
        }
      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx,
    };
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'RANGE',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'TO',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'TYPE',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  ledmatrix: function(uid){
    var vfx = function(data){
      if(typeof data === 'object' && data.length === 8){
        var def = [
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000",
          "00000000"
        ];
        // data[0] = data[0] === null ? 50:data[0];
        // data[1] = data[1] === null ? 50:data[1];
        // data[2] = data[2] === null ? 250:data[2];
        data[3] = data[3] === null ? 100:data[3];
        data[7] = data[7] === null ? def:data[7];

        var dat = -1, clk = -1, cs = -1;
        for(var i in connections){
          if(connections[i][0] === uid+'_DATA'){
            dat = i.split('_').pop();
            dat = parseInt(dat.split("PIN").pop());
          }else if(connections[i][0] === uid+'_CLOCK'){
            clk = i.split('_').pop();
            clk = parseInt(clk.split("PIN").pop());
          }else if(connections[i][0] === uid+'_CS'){
            cs = i.split('_').pop();
            cs = parseInt(cs.split("PIN").pop());
          }
        }

        if(dat > -1 && clk > -1 && cs > -1){
          var j = function(){
            var matrix;
            if(outputdb[uid]){
              matrix = outputdb[uid];
            }else{
              matrix = new five.Led.Matrix({
                pins: {
                  data: dat,
                  clock: clk,
                  cs: cs
                },
                devices: 1
              });
              outputdb[uid] = matrix;
            }

            matrix.brightness(data[3]);
            matrix.draw(data[7]);
          }

          return j;
        }

      }
    };
    sandbox[uid] = {
      index: 0,
      src: 0,
      out:[],
      in:[],
      fx: vfx
    };
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pfx': vfx,
      },
      {
        'name':'CLOCK',
        'type': 'out',
        'pfx': null,
      },
      {
        'name':'CS',
        'type': 'out',
        'pfx': null,
      },
      {
        'name':'NUM',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'INDEX',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'CLEAR',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'BRIGHTNESS',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'ROW',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'COL',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'ONOFF',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'DRAW',
        'type': 'in',
        'pfx': null,
      },
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
  recorder: function(uid){
    var rfx = function(data){
      if(typeof data === 'object' && data !== null){
        return sandbox[uid].val;
      }
    };
    var vfx = function(data){
      if(typeof data === 'object' && data !== null){
        if(bee.bb['wave_'+uid].playing){
          bee.rec('wave_'+uid,data[0]);
        }
        //console.log('uid-'+uid+':'+data[0]);
      }
    }
    sandbox[uid] = {
      index: 0,
      src:0,
      out:[],
      in:[],
      fx: vfx,
      val: 0
    };
    var pins = [
      {
        'name':'IN',
        'type': 'in',
        'pfx': null,
      },
      {
        'name':'OUT',
        'type': 'out',
        'pfx': rfx,
      }
    ];
    for(var i in pins){
      var pin = uid+'_'+pins[i].name;
      var type = pins[i].type;
      if(type === 'in'){
        sandbox[uid].in.push(pin);
      }else if(type === 'out'){
        sandbox[uid].out.push(pin);
      }
      sandbox[pin] = pins[i].pfx;

      //code
      sandbox.def[pin] = [];
      sandbox.def[pin][0] = "var "+pin+";";
      sandbox.def[pin][1] = pin+"= null;";
    }
    //code
    sandbox.def[uid] = [];
    sandbox.def[uid][0] = "var "+uid+";";
    sandbox.def[uid][1] = uid+'={ index: 0,fx:'+vfx+'};';
    sandbox.update();
  },
};


var marray = function(numrows, numcols, initial) {
  var arr = [];
  for (var i = 0; i < numrows; ++i) {
      var columns = [];
      for (var j = 0; j < numcols; ++j) {
          columns[j] = initial;
      }
      arr[i] = columns;
    }
  return arr;
}
