var operator = {
  addition : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 30, height = 30;
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
        'des': 'Output Data - The addition of the two numbers.',
        'x': 22,
        'y':11
      },
    ];
    // public
    var _addition = function(id, type, x, y){
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
      _this._component.dataset.name = 'addition';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/addition.svg" />');

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
    return _addition;
  }(),
  subtraction : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 30, height = 30;
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
        'des': 'Output Data - The subtraction of the two numbers.',
        'x': 22,
        'y':11
      },
    ];
    // public
    var _subtraction = function(id, type, x, y){
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
      _this._component.dataset.name = 'subtraction';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/subtraction.svg" />');

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
    return _subtraction;
  }(),
  multiplication : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 30, height = 30;
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
        'des': 'Output Data - The multiplication of the two numbers.',
        'x': 22,
        'y':11
      },
    ];
    // public
    var _multiplication = function(id, type, x, y){
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
    _this._component.dataset.name = 'multiplication';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/multiplication.svg" />');

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
  return _multiplication;
  }(),
  division : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 30, height = 30;
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
        'des': 'Output Data - The division of the two numbers.',
        'x': 22,
        'y':11
      },
    ];
    // public
    var _division = function(id, type, x, y){
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
    _this._component.dataset.name = 'division';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/division.svg" />');

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
  return _division;
  }(),
  modulo : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 30, height = 30;
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
        'des': 'Output Data - The modulo of the two numbers.',
        'x': 22,
        'y':11
      },
    ];
    // public
    var _modulo = function(id, type, x, y){
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
    _this._component.dataset.name = 'modulo';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/modulo.svg" />');

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
  return _modulo;
  }(),
  equal : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _equal = function(id, type, x, y){
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
    _this._component.dataset.name = 'equal';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/equal.svg" />');

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
  return _equal;
  }(),
  notequal : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _notequal = function(id, type, x, y){
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
    _this._component.dataset.name = 'notequal';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/notequal.svg" />');

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
  return _notequal;
  }(),
  smaller : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _smaller = function(id, type, x, y){
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
    _this._component.dataset.name = 'smaller';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/smaller.svg" />');

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
  return _smaller;
  }(),
  bigger : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _bigger = function(id, type, x, y){
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
    _this._component.dataset.name = 'bigger';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/bigger.svg" />');

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
  return _bigger;
  }(),
  smallerequal : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _smallerequal = function(id, type, x, y){
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
    _this._component.dataset.name = 'smallerequal';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/smallerequal.svg" />');

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
  return _smallerequal;
  }(),
  biggerequal : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _biggerequal = function(id, type, x, y){
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
    _this._component.dataset.name = 'biggerequal';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/biggerequal.svg" />');

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
  return _biggerequal;
  }(),
  conand : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _conand = function(id, type, x, y){
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
    _this._component.dataset.name = 'conand';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/and.svg" />');

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
  return _conand;
  }(),
  conor : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _conor = function(id, type, x, y){
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
    _this._component.dataset.name = 'conor';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/or.svg" />');

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
  return _conor;
  }(),
  connot : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 40, height = 30;
    var pins = [
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['con'],
        'des': 'Result',
        'x': 32,
        'y':11
      },
    ];
    // public
    var _connot = function(id, type, x, y){
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
    _this._component.dataset.name = 'connot';

    //Create nodecontainer
    _this._node = document.createElement("div");
    _this._node.className = 'node_container';
    _this._node.style.width = width + 'px';
    _this._node.style.height = height + 'px';
    _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/not.svg" />');

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
  return _connot;
  }(),
};
