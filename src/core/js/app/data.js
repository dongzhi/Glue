var data = {
  boolea : function(id, type, x, y,val){ //IIFE

    //private params & functions
    var width = 150, height = 23;
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Data Output Pin',
        'x': 142,
        'y':7
      },
    ];
    // public
    var _boolea = function(id, type, x, y,val){
      // Re-purposing an existing div element.
      var _this = this;

      var _val = typeof val !== 'undefined' ? parseInt(val) : 1;

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
      _this._component.dataset.name = 'boolea';
      _this._component.dataset.value = _val;

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      //_this._node.insertAdjacentHTML('afterbegin', '<div class="data_boolen" data-drag="true" data-val="1" data-pid="'+ id +'">TRUE</div>');
      _this._node.insertAdjacentHTML('afterbegin', '<img data-drag="true" data-pid="'+ id +'" src="./images/boolean.svg" />');

      //val
      _this._val = document.createElement("div");
      _this._val.className = 'node_value';
      _this._val.textContent = _val === 1 ? 'TRUE' : 'FALSE';
      _this._val.dataset.value = _val;
      _this._val.dataset.pid = id;
      _this._val.dataset.drag = "true";
      _this._val.dataset.toggle = "true";
      _this._node.appendChild(_this._val);

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
    return _boolea;
  }(),
  integer : function(id, type, x, y,val){ //IIFE

    //private params & functions
    var width = 120, height = 23;
    var pins = [
      {
        'name':'DATA',
        'type': 'out',
        'pipeout':['var'],
        'des': 'Data Output Pin',
        'x': 112,
        'y':7
      },
    ];
    // public
    var _integer = function(id, type, x, y,val){
      // Re-purposing an existing div element.
      var _this = this;

      var _val = typeof val !== 'undefined' ? parseInt(val) : 0;

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
      _this._component.dataset.name = 'integer';
      _this._component.dataset.value = _val;

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img data-drag="true" data-pid="'+ id +'" src="./images/integer.svg" />');

      //val
      _this._val = document.createElement("div");
      _this._val.className = 'node_value';
      _this._val.textContent = _val;
      _this._val.dataset.value = _val;
      _this._val.dataset.pid = id;
      _this._val.dataset.drag = "true";
      _this._val.dataset.int = "true";
      _this._node.appendChild(_this._val);

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
    return _integer;
  }(),
  array : function(id, type, x, y,val){ //IIFE

    //private params & functions
    var width = 150, height = 78;
    var pins = [
      {
        'name':'FX',
        'type': 'in',
        'pipein':['fx'],
        'des': 'Function Pin',
        'x': 0,
        'y':30
      },
      {
        'name':'DATA',
        'type': 'out',
        'pipeout':['arr'],
        'des': 'Array Data Output Pin',
        'x': 142,
        'y':30
      },
    ];
    // public
    var _array = function(id, type, x, y,val){
      // Re-purposing an existing div element.
      var _this = this;

      var _val = typeof val !== 'undefined' ? val : null;

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
      _this._component.dataset.name = 'array';
      _this._component.dataset.value = _val;

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img data-drag="true" data-pid="'+ id +'" src="./images/array.svg" />');

      //val
      _this._val = document.createElement("div");
      _this._val.className = 'node_array';
      _this._val.dataset.value = _val;
      _this._val.textContent = _this._val.dataset.value !== "null"? '['+_this._val.dataset.value.split('|').join() +']': '[]';
      _this._val.dataset.pid = id;
      _this._val.dataset.drag = "true";
      _this._val.dataset.array = "true";
      _this._node.appendChild(_this._val);

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
    return _array;
  }(),
};
