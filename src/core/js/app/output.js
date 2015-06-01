/* ---
  output.js
--- */
//module.exports = {
var output = {
  led : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 25, height = 33;
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 0,
        'y':25
      },
      {
        'name':'DATA',
        'type': 'in',
        'pipein':['var','onoff','fx'],
        'des': 'Data Pin - ON/OFF(0/1) or brightness(0 ~ 255)',
        'x': 0,
        'y':35
      },
    ];
    // public
    var _led = function(id, type, x, y){
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
      _this._component.dataset.name = 'led';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/led.svg" />');

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
    return _led;
  }(),
  rgbled : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 50, height = 109;
    var pins = [
      {
        'name':'R',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 0,
        'y':31
      },
      {
        'name':'G',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 0,
        'y':44
      },
      {
        'name':'B',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 0,
        'y':57
      },
      {
        'name':'ANODE',
        'type': 'in',
        'pipein':['var'],
        'des': 'isAnode Pin',
        'x': 0,
        'y':70
      },
      {
        'name':'COLOR',
        'type': 'in',
        'pipein':['color'],
        'des': 'Color Pin',
        'x': 0,
        'y':83
      },
      {
        'name':'FX',
        'type': 'in',
        'pipein':['var','onoff','fx'],
        'des': 'Data Pin - ON/OFF(0/1) or brightness(0 ~ 255)',
        'x': 0,
        'y':96
      },
    ];
    // public
    var _rgbled = function(id, type, x, y){
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
      _this._component.dataset.name = 'rgbled';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/rgbled.svg" />');

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

      //Add led
      _this._rgbled = document.createElement("div");
      _this._rgbled.className = 'node_rgbled';
      _this._rgbled.dataset.drag = true;
      _this._rgbled.dataset.pid = id;
      _this._node.appendChild(_this._rgbled);

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
    return _rgbled;
  }(),
  piezo : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 60, height = 82;
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 26,
        'y':0
      },
      {
        'name':'DATA',
        'type': 'in',
        'pipein':['var','onoff','fx'],
        'des': 'Data Pin - Input for the piezo speaker.',
        'x': 26,
        'y':74
      }
    ];
    // public
    var _piezo = function(id, type, x, y){
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
      _this._component.dataset.name = 'piezo';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/piezo.svg" />');

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
    return _piezo;
  }(),
  solenoid : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 30, height = 56;
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 0,
        'y':15
      },
      {
        'name':'DATA',
        'type': 'in',
        'pipein':['onoff','fx','var'],
        'des': 'Data Pin',
        'x': 0,
        'y':30
      },
    ];
    // public
    var _solenoid = function(id, type, x, y){
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
      _this._component.dataset.name = 'solenoid';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/solenoid.svg" />');

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
    return _solenoid;
  }(),
  servo : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 100, height = 132;
    var pins = [
      {
        'name':'PIN',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Board Pin - Connect this pin to the control board.',
        'x': 0,
        'y':75
      },
      {
        'name':'RANGE',
        'type': 'in',
        'pipein':['arr'],
        'des': '[ lower, upper ] The range of motion in degrees.',
        'x': 0,
        'y':88
      },
      {
        'name':'TO',
        'type': 'in',
        'pipein':['var'],
        'des': 'Any number between 0-180. Move a servo horn to specified position in degrees.',
        'x': 0,
        'y':101
      },
      {
        'name':'TYPE',
        'type': 'in',
        'pipein':['var'],
        'des': 'The type of servo being created.0/false - standard(default); 1/true - continuous.',
        'x': 0,
        'y':114
      },
    ];
    // public
    var _servo = function(id, type, x, y){
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
      _this._component.dataset.name = 'servo';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/servo.svg" />');

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
    return _servo;
  }(),
  ledmatrix : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 245, height = 173;
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Data Pin - Connect this pin to the control board.',
        'x': 0,
        'y':5
      },
      {
        'name':'CLOCK',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Clock Pin - Connect this pin to the control board.',
        'x': 0,
        'y':18
      },
      {
        'name':'CS',
        'type': 'out',
        'pipeout':['act'],
        'des': 'Cs Pin - Connect this pin to the control board.',
        'x': 0,
        'y':31
      },
      {
        'name':'NUM',
        'type': 'in',
        'pipein':['var'],
        'des': 'Number of devices controlled.',
        'x': 0,
        'y':44
      },
      {
        'name':'INDEX',
        'type': 'in',
        'pipein':['var'],
        'des': 'A device at specified device index.',
        'x': 0,
        'y':57
      },
      {
        'name':'CLEAR',
        'type': 'in',
        'pipein':['var'],
        'des': 'Shut off all LEDs, for a device at specified device index.',
        'x': 0,
        'y':70
      },
      {
        'name':'BRIGHTNESS',
        'type': 'in',
        'pipein':['var'],
        'des': 'Set the brightness from 0-100%',
        'x': 0,
        'y':83
      },
      {
        'name':'ROW',
        'type': 'in',
        'pipein':['var'],
        'des': 'Row position',
        'x': 0,
        'y':96
      },
      {
        'name':'COL',
        'type': 'in',
        'pipein':['var'],
        'des': 'Col position',
        'x': 0,
        'y':109
      },
      {
        'name':'ONOFF',
        'type': 'in',
        'pipein':['var'],
        'des': 'On or OFF',
        'x': 0,
        'y':122
      },
      {
        'name':'DRAW',
        'type': 'in',
        'pipein':['var'],
        'des': 'Matrix Data',
        'x': 0,
        'y':135
      }
    ];
    // public
    var _ledmatrix = function(id, type, x, y){
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
      _this._component.dataset.name = 'ledmatrix';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/ledmatrix.svg" />');

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
    return _ledmatrix;
  }(),
};
//};
