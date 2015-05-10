var control = {
  ifelse : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 110, height = 110;
    var pins = [
      {
        'name':'INPUT1',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Pin 1',
        'x': 0,
        'y':30
      },
      {
        'name':'INPUT2',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Pin 2',
        'x': 0,
        'y':45
      },
      {
        'name':'CONDITION',
        'type': 'in',
        'pipein':['con'],
        'des': 'Condition Pin',
        'x': 0,
        'y':60
      },
      {
        'name':'TRUEFX',
        'type': 'in',
        'pipein':['fx','var','onoff'],
        'des': 'Function will be triggered when result is true',
        'x': 0,
        'y':75
      },
      {
        'name':'FALSEFX',
        'type': 'in',
        'pipein':['fx','var','onoff'],
        'des': 'Function will be triggered when result is false',
        'x': 0,
        'y':90
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Result Fx Pin',
        'x': 102,
        'y':30
      },
    ];
    // public
    var _ifelse = function(id, type, x, y){
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
      _this._component.dataset.name = 'ifelse';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/if.svg" />');

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
    return _ifelse;
  }(),
  forloop : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 125, height = 75;
    var pins = [
      {
        'name':'FIRSTINDEX',
        'type': 'in',
        'pipein':['var'],
        'des': 'First Index Pin',
        'x': 0,
        'y':30
      },
      {
        'name':'LASTINDEX',
        'type': 'in',
        'pipein':['var'],
        'des': 'Last Index Pin',
        'x': 0,
        'y':45
      },
      {
        'name':'FX',
        'type': 'in',
        'pipein':['fx'],
        'des': 'Function pin',
        'x': 0,
        'y':60
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Exit pin',
        'x': 117,
        'y':30
      },
    ];
    // public
    var _forloop = function(id, type, x, y){
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
      _this._component.dataset.name = 'forloop';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/forloop.svg" />');

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
    return _forloop;
  }(),
  whileloop : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 96;
    var pins = [
      {
        'name':'INPUT1',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Pin 1',
        'x': 0,
        'y':30
      },
      {
        'name':'INPUT2',
        'type': 'in',
        'pipein':['var'],
        'des': 'Input Pin 2',
        'x': 0,
        'y':45
      },
      {
        'name':'CONDITION',
        'type': 'in',
        'pipein':['con'],
        'des': 'Condition Pin',
        'x': 0,
        'y':60
      },
      {
        'name':'FX',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Function Pin',
        'x': 142,
        'y':30
      },
      {
        'name':'EXIT',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Exit Pin',
        'x': 142,
        'y':45
      },
    ];
    // public
    var _whileloop = function(id, type, x, y){
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
      _this._component.dataset.name = 'whileloop';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/whileloop.svg" />');

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
    return _whileloop;
  }(),
  dodo : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 150, height = 74;
    var pins = [
      {
        'name':'ENTER',
        'type': 'in',
        'pipein':['fx'],
        'des': 'Function Enter Pin',
        'x': 0,
        'y':30
      },
      {
        'name':'N',
        'type': 'in',
        'pipein':['var'],
        'des': 'Times',
        'x': 0,
        'y':45
      },
      {
        'name':'RESET',
        'type': 'in',
        'pipein':['var'],
        'des': 'RESET Pin',
        'x': 0,
        'y':60
      },
      {
        'name':'FX',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Function',
        'x': 142,
        'y':30
      },
      {
        'name':'COUNTER',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Counter Pin',
        'x': 142,
        'y':45
      },
      {
        'name':'EXIT',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Exit Pin',
        'x': 142,
        'y':60
      },
    ];
    // public
    var _dodo = function(id, type, x, y){
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
      _this._component.dataset.name = 'dodo';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/do.svg" />');

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
    return _dodo;
  }(),
  sequence : function(id, type, x, y){ //IIFE

    //private params & functions
    var width = 90, height = 74;
    var pins = [
      {
        'name':'FX1',
        'type': 'in',
        'pipein':['fx','var'],
        'des': 'Function Enter Pin',
        'x': 0,
        'y':30
      },
      {
        'name':'FX2',
        'type': 'in',
        'pipein':['fx','var'],
        'des': 'Function Enter Pin',
        'x': 0,
        'y':45
      },
      {
        'name':'FX3',
        'type': 'in',
        'pipein':['fx'],
        'des': 'Function Enter Pin',
        'x': 0,
        'y':60
      },
      {
        'name':'FX4',
        'type': 'in',
        'pipein':['fx'],
        'des': 'Function Enter Pin',
        'x': 0,
        'y':75
      },
      {
        'name':'FX5',
        'type': 'in',
        'pipein':['fx'],
        'des': 'Function Enter Pin',
        'x': 0,
        'y':90
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['fx'],
        'des': 'Output Pin',
        'x': 82,
        'y':30
      },
    ];
    // public
    var _sequence = function(id, type, x, y){
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
      _this._component.dataset.name = 'sequence';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/sequence.svg" />');

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
    return _sequence;
  }(),
  slider : function(id, type, x, y,min,max){ //IIFE

    //private params & functions
    var width = 250, height = 26;
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output Data',
        'x': 240,
        'y':10
      },
    ];
    // public
    var _slider = function(id, type, x, y,min,max){
      // Re-purposing an existing div element.
      var _this = this;
      var _min = typeof min !== 'undefined'? parseInt(min) : 0;
      var _max = typeof max !== 'undefined'? parseInt(max) : 100;

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
      _this._component.dataset.name = 'slider';
      _this._component.dataset.value = _min+'|'+_max;

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/slider.svg" />');

      //Create range node
      _this._range = document.createElement("div");
      _this._range.className = 'range';
      _this._range.dataset.pid = id;
      _this._range.dataset.drag = "true";
      _this._range.dataset.range = "true";
      _this._range.dataset.value = _min+'|'+_max;
      _this._range.innerHTML = '<div class="min_val">'+_min+'</div><div class="max_val">'+_max+'</div>';
      _this._node.appendChild(_this._range);

      //creat drag point
      _this._point = document.createElement("div");
      _this._point.className = 'pointer';
      _this._point.id = 'pointer_'+id;
      _this._point.dataset.pid = id;
      _this._point.dataset.value = 0;
      _this._point.x = 66;
      _this._point.style.left = 66+'px';
      _this._node.appendChild(_this._point);

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
    return _slider;
  }(),
  toggle : function(id, type, x, y,min,max){ //IIFE

    //private params & functions
    var width = 120, height = 26;
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output',
        'x': 112,
        'y':10
      },
    ];
    // public
    var _toggle = function(id, type, x, y,val){
      // Re-purposing an existing div element.
      var _this = this;
      var _val = typeof val !== 'undefined'? parseInt(val) : 0;

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
      _this._component.dataset.name = 'toggle';
      _this._component.dataset.value = _val;

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/toggle.svg" />');

      //creat drag point
      _this._square = document.createElement("div");
      _this._square.className = 'square';
      _this._square.id = 'square_'+id;
      _this._square.dataset.pid = id;
      _this._square.dataset.onoff = 'true';
      _this._square.dataset.value = _val;
      _this._square.style.left = 75+'px';
      _this._node.appendChild(_this._square);

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
    return _toggle;
  }(),
  timer : function(id, type, x, y,val){ //IIFE

    //private params & functions
    var width = 150, height = 77;
    var pins = [
      {
        'name':'IN',
        'type': 'in',
        'pipein':['var'],
        'des': 'Interval',
        'x': 0,
        'y':35
      },
      {
        'name':'OUT',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Output',
        'x': 142,
        'y':35
      },
    ];
    // public
    var _timer = function(id, type, x, y,val){
      // Re-purposing an existing div element.
      var _this = this;
      var _val = typeof val !== 'undefined'? parseInt(val) : 0;

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
      _this._component.dataset.name = 'timer';
      _this._component.dataset.value = _val;

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img  data-drag="true" data-pid="'+ id +'" src="./images/timer.svg" />');

      //creat drag point
      _this._optionpoint = document.createElement("div");
      _this._optionpoint.className = 'optionpoint';
      _this._optionpoint.id = 'optionpoint_'+id;
      _this._optionpoint.dataset.pid = id;
      _this._optionpoint.dataset.option = 'true';
      _this._optionpoint.dataset.value = _val;
      _this._optionpoint.style.left = 10+'px';
      _this._node.appendChild(_this._optionpoint);

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
    return _timer;
  }(),
};
