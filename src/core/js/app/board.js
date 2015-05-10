/* ---
  board.js
  - define all boards
--- */
//module.exports = {
var board = {
  uno: function(id, type, x, y){ //IIFE
    //private params & functions
    var width = 150, height = 200;
    var pins = [
      {
        'name':'A0',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A0 Pin',
        'x': 0,
        'y':116
      },
      {
        'name':'A1',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A1 Pin',
        'x': 0,
        'y':129
      },
      {
        'name':'A2',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A2 Pin',
        'x': 0,
        'y':142
      },
      {
        'name':'A3',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A3 Pin',
        'x': 0,
        'y':155
      },
      {
        'name':'A4',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A4 Pin',
        'x': 0,
        'y':168
      },
      {
        'name':'A5',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A5 Pin',
        'x': 0,
        'y':181
      },
      {
        'name':'PIN13',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN13',
        'x': 142,
        'y':14
      },
      {
        'name':'PIN12',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN12',
        'x': 142,
        'y':27
      },
      {
        'name':'PIN11',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN11',
        'x': 142,
        'y':40
      },
      {
        'name':'PIN10',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN10',
        'x': 142,
        'y':53
      },
      {
        'name':'PIN9',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN9',
        'x': 142,
        'y':66
      },
      {
        'name':'PIN8',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN8',
        'x': 142,
        'y':79
      },
      {
        'name':'PIN7',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN7',
        'x': 142,
        'y':92
      },
      {
        'name':'PIN6',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN6',
        'x': 142,
        'y':105
      },
      {
        'name':'PIN5',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN5',
        'x': 142,
        'y':118
      },
      {
        'name':'PIN4',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN4',
        'x': 142,
        'y':131
      },
      {
        'name':'PIN3',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN3',
        'x': 142,
        'y':144
      },
      {
        'name':'PIN2',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN2',
        'x': 142,
        'y':157
      },
      {
        'name':'PIN1',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN1',
        'x': 142,
        'y':170
      },
      {
        'name':'PIN0',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN0',
        'x': 142,
        'y':183
      }
    ];

    // public
    var _uno = function(id, type, x, y){
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
      _this._component.dataset.name = 'uno';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img data-drag="true" data-pid="'+ id +'" src="./images/uno.svg" />');

      //Add pins
      for(var i in pins){
        //console.log(pins[i].name);
        var pin = document.createElement("div");
        pin.id = id+'_'+pins[i].name;
        pin.className = 'pin';
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

      //Add start
      _this._start = document.createElement("div");
      _this._start.className = 'board_start';
      _this._start.dataset.pid = _this._component.id;
      _this._node.appendChild(_this._start);

      _this._component.appendChild(_this._node);

      return _this._component;
    };

    //return
    return _uno;
  }(),
  leno: function(id, type, x, y){ //IIFE
    //private params & functions
    var width = 150, height = 200;
    var pins = [
      {
        'name':'START',
        'type': 'in',
        'pipein':['onoff'],
        'des': 'Start Pin',
        'x': 0,
        'y':14
      },
      {
        'name':'A0',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A0 Pin',
        'x': 0,
        'y':116
      },
      {
        'name':'A1',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A1 Pin',
        'x': 0,
        'y':129
      },
      {
        'name':'A2',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A2 Pin',
        'x': 0,
        'y':142
      },
      {
        'name':'A3',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A3 Pin',
        'x': 0,
        'y':155
      },
      {
        'name':'A4',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A4 Pin',
        'x': 0,
        'y':168
      },
      {
        'name':'A5',
        'type': 'out',
        'pipeout':['var'],
        'des': 'A5 Pin',
        'x': 0,
        'y':181
      },
      {
        'name':'PIN13',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN13',
        'x': 142,
        'y':14
      },
      {
        'name':'PIN12',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN12',
        'x': 142,
        'y':27
      },
      {
        'name':'PIN11',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN11',
        'x': 142,
        'y':40
      },
      {
        'name':'PIN10',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN10',
        'x': 142,
        'y':53
      },
      {
        'name':'PIN9',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN9',
        'x': 142,
        'y':66
      },
      {
        'name':'PIN8',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN8',
        'x': 142,
        'y':79
      },
      {
        'name':'PIN7',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN7',
        'x': 142,
        'y':92
      },
      {
        'name':'PIN6',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN6',
        'x': 142,
        'y':105
      },
      {
        'name':'PIN5',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN5',
        'x': 142,
        'y':118
      },
      {
        'name':'PIN4',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN4',
        'x': 142,
        'y':131
      },
      {
        'name':'PIN3',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN3',
        'x': 142,
        'y':144
      },
      {
        'name':'PIN2',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN2',
        'x': 142,
        'y':157
      },
      {
        'name':'PIN1',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN1',
        'x': 142,
        'y':170
      },
      {
        'name':'PIN0',
        'type': 'in',
        'pipein':['act'],
        'pipeout':['var'],
        'des': 'PIN0',
        'x': 142,
        'y':183
      }
    ];

    // public
    var _leno = function(id, type, x, y){
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
      _this._component.dataset.name = 'leno';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = width + 'px';
      _this._node.style.height = height + 'px';
      _this._node.insertAdjacentHTML('afterbegin', '<img data-drag="true" data-pid="'+ id +'" src="./images/leno.svg" />');

      //Add pins
      for(var i in pins){
        //console.log(pins[i].name);
        var pin = document.createElement("div");
        pin.id = id+'_'+pins[i].name;
        pin.className = 'pin';
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
    return _leno;
  }(),
};
//};
