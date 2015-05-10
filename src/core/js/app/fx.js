/* ---
  fx.js
--- */
//module.exports = {
var fx = {
  log : function(id, type, x, y, w, h){ //IIFE

    //private params & functions
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pipein':['var','arr','color','con','fx','act','ui'],
        'des': 'Log Input Pin',
        'x': 0,
        'y':10
      },
    ];

    // public
    var _log = function(id, type, x, y,w, h){
      // Re-purposing an existing div element.
      var _this = this;
      var width = typeof w !== 'undefined'? w : 100;
      var height = typeof h !== 'undefined'? h : 40;

      if (!_this._component) {
        _this._component = document.createElement('div');
      }

      //Set properties
      _this._component.width = width;
      _this._component.height = height;
      _this._component.x = x;
      _this._component.y = y;

      _this._component.id = id;
      _this._component.className = type;
      _this._component.style.width = width + 'px';
      _this._component.style.height = height + 'px';
      _this._component.style.left = x+ 'px';
      _this._component.style.top = y+ 'px';
      _this._component.dataset.name = 'log';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = '100%';
      _this._node.style.height = '100%';

      //Create log node
      _this._log = document.createElement("div");
      _this._log.className = 'log';
      _this._log.id = 'log_'+id;
      _this._log.dataset.pid = id;
      _this._log.style.width = '100%';
      _this._log.style.height = '100%';
      _this._log.dataset.drag = "true";
      _this._node.appendChild(_this._log);

      //Add resize
      _this._resize = document.createElement("div");
      _this._resize.className = 'node_resize';
      _this._resize.dataset.resizeid = _this._component.id;
      _this._node.appendChild(_this._resize);

      //Add pins
      for(var i in pins){
        //console.log(pins[i].name);
        var pin = document.createElement("div");
        pin.id = id+'_'+pins[i].name;
        pin.dataset.t = id;
        pin.dataset.type = pins[i].type;
        if(pins[i].type === 'in'){
          pin.dataset.pipein = pins[i].pipein.join('_');
        }else if(pins[i].type === 'out'){
          pin.dataset.pipeout = pins[i].pipeout.join('_');
        }else{
          pin.dataset.pipein = pins[i].pipein.join('_');
          pin.dataset.pipeout = pins[i].pipeout.join('_');
        }
        pin.className = 'pin';
        pin.title = pins[i].des;
        pin.x = pins[i].x;
        pin.y = pins[i].y;
        pin.width = 8;
        pin.height = 8;
        pin.style.left = pins[i].x + 'px';
        pin.style.top = pins[i].y + 'px';
        _this._node.appendChild(pin);
      }

      //Add control
      _this._control = document.createElement("div");
      _this._control.className = 'node_control';
      _this._control.innerHTML = '<div class="node_del" data-del="'+_this._component.id+'"><img src="./images/node_close.svg"/></div>';
      _this._node.appendChild(_this._control);

      //Add text
      _this._text = document.createElement("span");
      _this._text.className = 'node_title';
      _this._text.innerHTML = _this._component.x+';'+_this._component.y;

      _this._node.appendChild(_this._text);
      _this._component.appendChild(_this._node);

      return _this._component;
    };

    //return
    return _log;
  }(),
  blink : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 100, height = 67;
    var pins = [
      {
        'name':'TIMES',
        'type': 'in',
        'pipein':['var'],
        'des': 'Blink Counter',
        'x': 0,
        'y':30
      },
      {
        'name':'DELAY',
        'type': 'in',
        'pipein':['var'],
        'des': 'Delay Pin',
        'x': 0,
        'y':45
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Function Output Pin',
        'x': 92,
        'y':30
      },
    ];
    // public
    var _blink = function(id, type, x, y){
      // Re-purposing an existing div element.
      var _this = this;

      if (!_this._component) {
        _this._component = document.createElement('div');
      }

      //Set properties
      _this._component.width = width;
      _this._component.height = height;
      _this._component.x = x;
      _this._component.y = y;

      _this._component.id = id;
      _this._component.className = type;
      _this._component.style.width = width + 'px';
      _this._component.style.height = height + 'px';
      _this._component.style.left = x+ 'px';
      _this._component.style.top = y+ 'px';
      _this._component.dataset.name = 'blink';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/blink.svg" />');

      //Add pins
      for(var i in pins){
        //console.log(pins[i].name);
        var pin = document.createElement("div");
        pin.id = id+'_'+pins[i].name;
        pin.dataset.t = id;
        pin.dataset.type = pins[i].type;
        if(pins[i].type === 'in'){
          pin.dataset.pipein = pins[i].pipein.join('_');
        }else if(pins[i].type === 'out'){
          pin.dataset.pipeout = pins[i].pipeout.join('_');
        }else{
          pin.dataset.pipein = pins[i].pipein.join('_');
          pin.dataset.pipeout = pins[i].pipeout.join('_');
        }
        pin.className = 'pin';
        pin.title = pins[i].des;
        pin.x = pins[i].x;
        pin.y = pins[i].y;
        pin.width = 8;
        pin.height = 8;
        pin.style.left = pins[i].x + 'px';
        pin.style.top = pins[i].y + 'px';
        _this._node.appendChild(pin);
      }

      //Add control
      _this._control = document.createElement("div");
      _this._control.className = 'node_control';
      _this._control.innerHTML = '<div class="node_del" data-del="'+_this._component.id+'"><img src="./images/node_close.svg"/></div>';
      _this._node.appendChild(_this._control);

      //Add text
      _this._text = document.createElement("span");
      _this._text.className = 'node_title';
      _this._text.innerHTML = _this._component.x+';'+_this._component.y;

      _this._node.appendChild(_this._text);
      _this._component.appendChild(_this._node);

      return _this._component;
    };

    //return
    return _blink;
  }(),
  colorpicker : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 220, height = 100;
    var pins = [
      {
        'name':'R',
        'type': 'in',
        'pipein':['var'],
        'des': 'R value',
        'x': 0,
        'y':33
      },
      {
        'name':'G',
        'type': 'in',
        'pipein':['var'],
        'des': 'G value',
        'x': 0,
        'y':51
      },
      {
        'name':'B',
        'type': 'in',
        'pipein':['var'],
        'des': 'B value',
        'x': 0,
        'y':69
      },
      {
        'name':'H',
        'type': 'in',
        'pipein':['var'],
        'des': 'H value',
        'x': 0,
        'y':87
      },
      {
        'name':'S',
        'type': 'in',
        'pipein':['var'],
        'des': 'S value',
        'x': 0,
        'y':105
      },
      {
        'name':'B',
        'type': 'in',
        'pipein':['var'],
        'des': 'B value',
        'x': 0,
        'y':123
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['color'],
        'des': 'Output color value',
        'x': 212,
        'y':33
      },
    ];
    // public
    var _colorpicker = function(id, type, x, y){
      // Re-purposing an existing div element.
      var _this = this;

      if (!_this._component) {
        _this._component = document.createElement('div');
      }

      //Set properties
      _this._component.width = width;
      _this._component.height = height;
      _this._component.x = x;
      _this._component.y = y;

      _this._component.id = id;
      _this._component.className = type;
      _this._component.style.width = width + 'px';
      _this._component.style.height = height + 'px';
      _this._component.style.left = x+ 'px';
      _this._component.style.top = y+ 'px';
      _this._component.dataset.name = 'colorpicker';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/colorpicker.svg" />');

      //Create color panel
      _this._panel = document.createElement("div");
      _this._panel.className = 'colorpicker';
      _this._panel.id = 'cp_'+id;
      //$('#'+_this._panel.id).colpick({flat:true,});
      _this._node.appendChild(_this._panel);

      //Add pins
      for(var i in pins){
        //console.log(pins[i].name);
        var pin = document.createElement("div");
        pin.id = id+'_'+pins[i].name;
        pin.dataset.t = id;
        pin.dataset.type = pins[i].type;
        if(pins[i].type === 'in'){
          pin.dataset.pipein = pins[i].pipein.join('_');
        }else if(pins[i].type === 'out'){
          pin.dataset.pipeout = pins[i].pipeout.join('_');
        }else{
          pin.dataset.pipein = pins[i].pipein.join('_');
          pin.dataset.pipeout = pins[i].pipeout.join('_');
        }
        pin.className = 'pin';
        pin.title = pins[i].des;
        pin.x = pins[i].x;
        pin.y = pins[i].y;
        pin.width = 8;
        pin.height = 8;
        pin.style.left = pins[i].x + 'px';
        pin.style.top = pins[i].y + 'px';
        _this._node.appendChild(pin);
      }

      //Add control
      _this._control = document.createElement("div");
      _this._control.className = 'node_control';
      _this._control.innerHTML = '<div class="node_del" data-del="'+_this._component.id+'"><img src="./images/node_close.svg"/></div>';
      _this._node.appendChild(_this._control);

      //Add text
      _this._text = document.createElement("span");
      _this._text.className = 'node_title';
      _this._text.innerHTML = _this._component.x+';'+_this._component.y;

      _this._node.appendChild(_this._text);
      _this._component.appendChild(_this._node);

      return _this._component;
    };

    //return
    return _colorpicker;
  }(),

    //RECORDER
  recorder : function(id, type, x, y){ //IIFE

      var width = 250, height = 100;

      //private params & functions
      var pins = [
        {
          'name':'IN',
          'type': 'in',
          'pipein':['var'],
          'des': 'Input value',
          'x': 0,
          'y':30
        },
        {
          'name':'OUT',
          'type': 'out',
          'pipeout':['var'],
          'des': 'Output value',
          'x': 242,
          'y':30
        },
      ];

      // public
      var _recorder = function(id, type, x, y){
        // Re-purposing an existing div element.
        var _this = this;

        if (!_this._component) {
          _this._component = document.createElement('div');
        }

        //Set properties
        _this._component.width = width;
        _this._component.height = height;
        _this._component.x = x;
        _this._component.y = y;

        _this._component.id = id;
        _this._component.className = type;
        _this._component.style.width = width + 'px';
        _this._component.style.height = height + 'px';
        _this._component.style.left = x+ 'px';
        _this._component.style.top = y+ 'px';
        _this._component.dataset.name = 'recorder';

        //Create nodecontainer
        _this._node = document.createElement("div");
        _this._node.className = 'node_container';
        _this._node.style.width = width + 'px';
        _this._node.style.height = height + 'px';

        //Background
        _this._bg = document.createElement("div");
        _this._bg.className = "recorder";
        _this._bg.dataset.pid = id;
        _this._bg.dataset.drag = "true";
        _this._bg.style.width = width + 'px';
        _this._bg.style.height = height + 'px';
        _this._bg.style.left = 0+ 'px';
        _this._bg.style.top = 0+ 'px';
        _this._node.appendChild(_this._bg);

        //Add title
        _this._title = document.createElement("div");
        _this._title.className = 'recorder_title';
        _this._title.innerHTML = 'Recorder';
        _this._title.dataset.pid = id;
        _this._title.dataset.drag = "true";
        _this._node.appendChild(_this._title);

        //Record Button
        _this._rec = document.createElement("div");
        _this._rec.className = 'record_btn';
        _this._rec.style.width = 12 + 'px';
        _this._rec.style.height = 12 + 'px';
        _this._rec.dataset.pid = id;
        _this._rec.dataset.uid = "wave_"+id;
        _this._rec.innerHTML = '<img src="./images/rec.svg" />';
        _this._node.appendChild(_this._rec);

        _this._play = document.createElement("div");
        _this._play.className = 'play_btn';
        _this._play.style.width = 12 + 'px';
        _this._play.style.height = 12 + 'px';
        _this._play.dataset.pid = id;
        _this._play.dataset.uid = "wave_"+id;
        _this._play.innerHTML = '<img src="./images/play.svg" />';
        _this._node.appendChild(_this._play);

        _this._stop = document.createElement("div");
        _this._stop.className = 'stop_btn';
        _this._stop.style.width = 12 + 'px';
        _this._stop.style.height = 12 + 'px';
        _this._stop.dataset.pid = id;
        _this._stop.dataset.uid = "wave_"+id;
        _this._stop.innerHTML = '<img src="./images/stop.svg" />';
        _this._node.appendChild(_this._stop);

        //Wave Panel
        _this._wave = document.createElement("div");
        _this._wave.id = "wave_"+id;
        _this._wave.className = "wave";
        _this._wave.style.width = width  + 'px';
        _this._wave.style.height = height - 22 + 'px';
        _this._wave.style.left = 0+ 'px';
        _this._wave.style.top = 22+ 'px';
        _this._node.appendChild(_this._wave);

        //Add pins
        //Add pins
        for(var i in pins){
          //console.log(pins[i].name);
          var pin = document.createElement("div");
          pin.id = id+'_'+pins[i].name;
          pin.dataset.t = id;
          pin.dataset.type = pins[i].type;
          if(pins[i].type === 'in'){
            pin.dataset.pipein = pins[i].pipein.join('_');
          }else if(pins[i].type === 'out'){
            pin.dataset.pipeout = pins[i].pipeout.join('_');
          }else{
            pin.dataset.pipein = pins[i].pipein.join('_');
            pin.dataset.pipeout = pins[i].pipeout.join('_');
          }
          pin.className = 'pin';
          pin.title = pins[i].des;
          pin.x = pins[i].x;
          pin.y = pins[i].y;
          pin.width = 8;
          pin.height = 8;
          pin.style.left = pins[i].x + 'px';
          pin.style.top = pins[i].y + 'px';
          _this._node.appendChild(pin);
        }

        //Add control
        _this._control = document.createElement("div");
        _this._control.className = 'node_control';
        _this._control.innerHTML = '<div class="node_del" data-del="'+_this._component.id+'"><img src="./images/node_close.svg"/></div>';
        _this._node.appendChild(_this._control);

        //Add text
        _this._text = document.createElement("span");
        _this._text.className = 'node_title';
        _this._text.innerHTML = _this._component.x+';'+_this._component.y;

        _this._node.appendChild(_this._text);
        _this._component.appendChild(_this._node);

        return _this._component;
      }

      //return
      return _recorder;
  }(),
};
//};
