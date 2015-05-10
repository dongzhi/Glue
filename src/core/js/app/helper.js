var helper = {
  note : function(id, type, x, y, w, h, str){ //IIFE

    //private params & functions

    // public
    var _note = function(id, type, x, y,w, h, str){
      // Re-purposing an existing div element.
      var context = typeof str !== 'undefined'? str : 'Double click to edit';
      var _this = this;
      var width = typeof w !== 'undefined'? w : 150;
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
      _this._component.dataset.name = 'note';

      //Create nodecontainer
      _this._node = document.createElement("div");
      _this._node.className = 'node_container';
      _this._node.style.width = '100%';
      _this._node.style.height = '100%';

      //Create note node
      _this._note = document.createElement("div");
      _this._note.dataset.pid = id;
      _this._note.style.width = '100%';
      _this._note.style.height = '100%';
      _this._note.dataset.drag = "true";
      _this._note.dataset.edit = "true";
      _this._note.textContent = context;
      _this._node.appendChild(_this._note);

      //Add resize
      _this._resize = document.createElement("div");
      _this._resize.className = 'node_resize';
      _this._resize.dataset.resizeid = _this._component.id;
      _this._node.appendChild(_this._resize);

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
    return _note;
  }(),
};
