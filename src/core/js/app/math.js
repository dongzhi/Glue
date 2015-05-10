var math ={
  mathMin : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pipein':['var'],
        'des': 'Data Pin - the first number',
        'x': 0,
        'y':3
      },
      {
        'name':'IN2',
        'type': 'in',
        'pipein':['var'],
        'des': 'Data Pin - the second number',
        'x': 0,
        'y':18
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - The smaller of the two numbers.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathMin = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathMin';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/min.svg" />');

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
    return _mathMin;
  }(),
  mathMax : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'IN1',
        'type': 'in',
        'pipein':['var'],
        'des': 'Data Pin - the first number',
        'x': 0,
        'y':3
      },
      {
        'name':'IN2',
        'type': 'in',
        'pipein':['var'],
        'des': 'Data Pin - the second number',
        'x': 0,
        'y':18
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - The larger of the two parameter values.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathMax = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathMax';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/max.svg" />');

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
    return _mathMax;
  }(),
  mathAbs : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pipein':['var'],
        'des': 'Data Pin ',
        'x': 0,
        'y':11
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - the absolute value of a number.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathAbs = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathAbs';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/abs.svg" />');

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
    return _mathAbs;
  }(),
  mathPow : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'BASE',
        'type': 'in',
        'pipein':['var'],
        'des': 'Base Pin - the number',
        'x': 0,
        'y':3
      },
      {
        'name':'EXPONENT',
        'type': 'in',
        'pipein':['var'],
        'des': 'Exponent Pin - the power to which the base is raised',
        'x': 0,
        'y':18
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - The result of the exponentiation.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathPow = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathPow';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/pow.svg" />');

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
    return _mathPow;
  }(),
  mathSqrt : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Data - the number',
        'x': 0,
        'y':11
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - The number\'s square root.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathSqrt = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathSqrt';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/sqrt.svg" />');

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
    return _mathSqrt;
  }(),
  mathSin : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'RAD',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Data - the angle in radians',
        'x': 0,
        'y':11
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - the sine of the angle.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathSin = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathSin';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/sin.svg" />');

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
    return _mathSin;
  }(),
  mathCos : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'RAD',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Data - the angle in radians',
        'x': 0,
        'y':11
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - the cos of the angle.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathCos = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathCos';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/cos.svg" />');

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
    return _mathCos;
  }(),
  mathTan : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 29;
    var pins = [
      {
        'name':'RAD',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Data - the angle in radians',
        'x': 0,
        'y':11
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - the sine of the angle.',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _mathTan = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathTan';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/tan.svg" />');

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
    return _mathTan;
  }(),
  mathConstrain : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 64;
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Data - the number to constrain',
        'x': 0,
        'y':30
      },
      {
        'name':'RANGE',
        'type': 'in',
        'pipein':['array'],
        'des': 'Range[min,max]',
        'x': 0,
        'y':45
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - constrained number',
        'x': 142,
        'y':30
      },
    ];
    // public
    var _mathConstrain = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathConstrain';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/constrain.svg" />');

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
    return _mathConstrain;
  }(),
  mathMap : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 79;
    var pins = [
      {
        'name':'INPUT',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Data - the number to map',
        'x': 0,
        'y':30
      },
      {
        'name':'FROMRANGE',
        'type': 'in',
        'pipein':['array'],
        'des': 'fromRange[min,max]',
        'x': 0,
        'y':45
      },
      {
        'name':'TORANGE',
        'type': 'in',
        'pipein':['array'],
        'des': 'toRange[min,max]',
        'x': 0,
        'y':60
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - mapped number',
        'x': 142,
        'y':30
      },
    ];
    // public
    var _mathMap = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathMap';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/map.svg" />');

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
    return _mathMap;
  }(),
  mathRandom : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 44;
    var pins = [
      {
        'name':'RANGE',
        'type': 'in',
        'pipein':['array'],
        'des': 'Range[min,max]',
        'x': 0,
        'y':25
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data - random number within the range',
        'x': 142,
        'y':25
      },
    ];
    // public
    var _mathRandom = function(id, type, x, y){
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
      _this._component.dataset.name = 'mathRandom';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/random.svg" />');

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
    return _mathRandom;
  }(),
};
