var phone = {
  phoneblock : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 128;
    var pins = [
      {
        'name':'UI',
        'type': 'in',
        'pipein':['ui'],
        'des': 'UI Pin - Connect this pin to phone ui blocks.',
        'x': 142,
        'y':20
      },
      {
        'name':'ACCEL',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Accel Data Pin',
        'x': 142,
        'y':33
      },
      {
        'name':'GYRO',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Gyro Data Pin',
        'x': 142,
        'y':46
      },
      {
        'name':'GRAVITY',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Gravity Data Pin',
        'x': 142,
        'y':59
      },
      {
        'name':'TEMP',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Tempertture Data Pin',
        'x': 142,
        'y':72
      },
      {
        'name':'GPS',
        'type': 'out',
        'pipeout':['var'],
        'des': 'GPS Data Pin',
        'x': 142,
        'y':85
      },
      {
        'name':'BLUETOOTH',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Bluetooth Data Pin',
        'x': 142,
        'y':98
      },
    ];
    // public
    var _phoneblock = function(id, type, x, y){
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
      _this._component.dataset.name = 'phoneblock';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/phone.svg" />');

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
    return _phoneblock;
  }(),
  phoneslider : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 123;
    var pins = [
      {
        'name':'UI',
        'type': 'out',
        'pipeout':['ui'],
        'des': 'UI Pin',
        'x': 0,
        'y':35
      },
      {
        'name':'X',
        'type': 'in',
        'pipein':['var'],
        'des': 'Position X Pin',
        'x': 0,
        'y':48
      },
      {
        'name':'Y',
        'type': 'in',
        'pipein':['var'],
        'des': 'Position Y Pin',
        'x': 0,
        'y':61
      },
      {
        'name':'WIDTH',
        'type': 'in',
        'pipein':['var'],
        'des': 'Width Data Pin',
        'x': 0,
        'y':74
      },
      {
        'name':'HEIGHT',
        'type': 'in',
        'pipein':['var'],
        'des': 'Height Data Pin',
        'x': 0,
        'y':87
      },
      {
        'name':'RANGE',
        'type': 'in',
        'pipein':['arr'],
        'des': 'Range Data Pin',
        'x': 0,
        'y':100
      },
      {
        'name':'VALUE',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Slide VALUE Output Pin',
        'x': 142,
        'y':35
      },
    ];
    // public
    var _phoneslider = function(id, type, x, y){
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
      _this._component.dataset.name = 'phoneslider';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/phoneslider.svg" />');

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
    return _phoneslider;
  }(),
  phoneledmatrix : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 107;
    var pins = [
      {
        'name':'UI',
        'type': 'out',
        'pipeout':['ui'],
        'des': 'UI Pin',
        'x': 0,
        'y':35
      },
      {
        'name':'X',
        'type': 'in',
        'pipein':['var'],
        'des': 'Position X Pin',
        'x': 0,
        'y':48
      },
      {
        'name':'Y',
        'type': 'in',
        'pipein':['var'],
        'des': 'Position Y Pin',
        'x': 0,
        'y':61
      },
      {
        'name':'WIDTH',
        'type': 'in',
        'pipein':['var'],
        'des': 'Width Data Pin',
        'x': 0,
        'y':74
      },
      {
        'name':'QTY',
        'type': 'in',
        'pipein':['var'],
        'des': 'Qty(*8x8)',
        'x': 0,
        'y':87
      },
      {
        'name':'ROW',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Row Data Output Pin',
        'x': 142,
        'y':35
      },
      {
        'name':'COL',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Col Data Output Pin',
        'x': 142,
        'y':48
      },
      {
        'name':'ONOFF',
        'type': 'out',
        'pipeout':['var'],
        'des': 'On/Off Data Output Pin',
        'x': 142,
        'y':61
      },
      {
        'name':'VALUE',
        'type': 'out',
        'pipeout':['var'],
        'des': 'LED Matrix Data Output Pin',
        'x': 142,
        'y':74
      },
    ];
    // public
    var _phoneledmatrix = function(id, type, x, y){
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
      _this._component.dataset.name = 'phoneledmatrix';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/phonematrix.svg" />');

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
    return _phoneledmatrix;
  }(),
};
