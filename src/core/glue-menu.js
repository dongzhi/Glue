var ApplicationMenu;
var app = global.gui.App;
var _ = require('underscore-plus');

module.exports = ApplicationMenu = (function() {

    function ApplicationMenu(version) {
      this.version = version;
      this._menu = new global.gui.Menu({ type: "menubar" });
      global.gui.Window.get().menu = this._menu;
      this.createTemplate(this.getDefaultTemplate());
    }


    ApplicationMenu.prototype.createTemplate = function(template) {
      if (!_.isEqual(template, this.activeTemplate)) {
        this.activeTemplate = template;
        var menuContext = this.buildFromTemplate(template);
      }
    };

    ApplicationMenu.prototype.updateMenu = function(browserWindow) {
      //pass in browserWindow for focus

      //get Window section
      var menu_win = this._menu.items[4];

      //keep 4 items
      var l = menu_win.submenu.items.length;
      for(var i=l-1;i>4;i--){
        menu_win.submenu.removeAt(i);
      }

      for(var i=0;i< global.glueApplication.windows.length;i++){
        var checked = global.glueApplication.windows[i].browserWindow == browserWindow ? true : false;
        var label = global.glueApplication.windows[i].browserWindow.loadSettings.fileName;
        var win = global.glueApplication.windows[i].browserWindow;
        var item = new global.gui.MenuItem({
          type: 'checkbox',
          label: label,
          click: (function(_win){
                return function(){
                  return _win.focus();
                }
          })(win),
          checked: checked,
          enabled: !checked
        });
        menu_win.submenu.append(item);
      }
      //
      // console.log("setMenu");
      // return this.windowTemplates.set(window, template);
    };

    ApplicationMenu.prototype.addWindow = function(window) {
      var focusHandler;
      if (this.lastFocusedWindow == null) {
        this.lastFocusedWindow = window;
      }
      focusHandler = (function(_this) {
        return function() {
          var template;
          _this.lastFocusedWindow = window;
          //add & active browserWindow actions
          // if (template = _this.windowTemplates.get(window)) {
          //   return _this.updateTemplate(template);
          // }
          return _this.updateMenu(window);
        };
      })(this);
      window.on('focus', focusHandler);
      window.once('closed', (function(_this) {
        return function() {
          if (window === _this.lastFocusedWindow) {
            _this.lastFocusedWindow = null;
          }
          //delete browserWindow actions
          //_this.windowTemplates["delete"](window);
          _this.updateMenu(_this.lastFocusedWindow);
          return window.removeListener('focus', focusHandler);
        };
      })(this));
      //return this.enableWindowSpecificItems(true);
    };

    ApplicationMenu.prototype.buildFromTemplate = function(template){
      // Create an empty menu
      var items = this._menu;

      for(var i = 0;i<template.length;i++){
          var item = template[i];
          var _item = _.deepClone(template[i]);
          if(_item.submenu){
            delete _item.submenu;
          }
          var _item = new global.gui.MenuItem(_item);
          items.append(_item);
          if (item.submenu) {
            _item.submenu = this.buildSubmenu(item.submenu);
          }
      }
      return items;
    };

    ApplicationMenu.prototype.buildSubmenu = function(template){
      // Create an empty submenu
      var items = new global.gui.Menu();

      for(var i = 0;i<template.length;i++){
          var item = template[i];
          items.append(new global.gui.MenuItem(item));
      }
      return items;
    };

    //key value should be lowcase !!important
    ApplicationMenu.prototype.getDefaultTemplate = function() {
      return [
        {
          label: 'Glue',
          submenu: [
            {
              label: 'About Glue',
              selector: 'orderFrontStandardAboutPanel:',
              click: function(){
                global.glueApplication.emit('application:about');
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Services'
            },
            {
              label: "Check for Update"
            },
            {
              type: 'separator'
            },
            {
              label: 'Quit',
              selector: 'closeAllWindowsQuit:',
              key:'q',
              modifiers: 'cmd',
              click: function(){
                global.glueApplication.emit('application:quit');
              }
            }
          ]
        },
        {
          label: 'File',
          submenu: [
            {
              label: 'New',
              key:'n',
              modifiers: 'cmd',
              click: function(){
                global.glueApplication.emit('application:new');
              }
            },
            {
              label: 'Open...',
              key:'o',
              modifiers: 'cmd',
              click: function(){
                global.glueApplication.emit('application:open-file');
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Save',
              key:'s',
              modifiers: 'cmd',
              click: function(){
                global.glueApplication.emit('application:save');
              }
            },
            {
              label: 'Save As',
              key:'s',
              modifiers: 'shift-cmd',
              click: function(){
                global.glueApplication.emit('application:saveas');
              }
            },
          ]
        },
        {
          label: 'Edit',
          submenu: [
            {
              label: 'Undo',
              key:'z',
              modifiers: 'cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              label: 'Redo',
              key:'z',
              modifiers: 'shift-cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Cut',
              key:'x',
              modifiers: 'cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              label: 'Copy',
              key:'c',
              modifiers: 'cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              label: 'Paste',
              key:'v',
              modifiers: 'cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              label: 'Select All',
              key:'a',
              modifiers: 'cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
          ]
        },
        {
          label: 'Example',
          submenu:[
            {
              label: 'Blink LED',
            },
          ]
        },
        {
          label: 'View',
          submenu: [
            {
              label: 'Reload',
              key:'r',
              modifiers: 'cmd',
              click: (function(_this) {
                return function() {
                  var _ref;
                  return (_ref = _this.focusedWindow()) != null ? _ref.reload() : void 0;
                };
              })(this)
            },
            {
              label: 'Enter Fullscreen',
              click: (function(_this) {
                return function() {
                  var _ref;
                  return (_ref = _this.focusedWindow()) != null ? _ref.setFullScreen() : void 0;
                };
              })(this)
            },
            {
              label: 'Toggle DevTools',
              key:'i',
              modifiers: 'alt-cmd',
              click: (function(_this) {
                return function() {
                  var _ref;
                  return (_ref = _this.focusedWindow()) != null ? _ref.toggleDevTools() : void 0;
                };
              })(this)
            },
            {
              label: 'Toggle CodeView',
              key:'c',
              modifiers: 'alt-cmd',
              click: function() {
                global.glueApplication.emit('application:codeview');
              }
            },
            {
              label: 'Toggle PhoneView',
              key:'m',
              modifiers: 'alt-cmd',
              click: function() {
                global.glueApplication.emit('application:phoneview');
              }
            }
          ]
        },
        {
          label: 'Window',
          submenu: [
            {
              label: 'Minimize',
              key:'m',
              modifiers: 'cmd',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Bring All to Front',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              type: 'separator'
            }
          ]
        },
        {
          label: 'Help',
          submenu: [
            {
              label: 'Terms of Use',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            },
            {
              label: 'Documentation',
              click: function(){
                //this.glueApplication.emit('core:save-as');
              }
            }
          ]
        }
      ];
    };

    ApplicationMenu.prototype.focusedWindow = function() {
      return _.find(global.glueApplication.windows, function(glueWindow) {
        return glueWindow.isFocused();
      });
    };


    return ApplicationMenu;

  })();
