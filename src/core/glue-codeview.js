var GlueCode,__slice = [].slice;

var app = global.gui.App;

var BrowserWindow = global.gui.Window;

var path = require('path');
var fs = require('fs-plus');
var url = require('url');
var _ = require('underscore-plus');

var EventEmitter = require('events').EventEmitter;

module.exports = GlueCode = (function() {

    _.extend(GlueCode.prototype, EventEmitter.prototype);

    GlueCode.iconPath = path.resolve(__dirname, '..', '..', 'core/images', 'icon.png');
    GlueCode.includeShellLoadTime = true;
    GlueCode.prototype.browserWindow = null;
    GlueCode.prototype.loaded = null;


    function GlueCode(settings) {
      var loadSettings;
      if (settings == null) {
        settings = {};
      }

      var options = {
        "icon": this.iconPath,
        "title": 'CodeView - Glue',
        "width": 400,
  			"height": 600,
  			"min_height": 400,
  			"min_width": 400,
  			"position": "center",
  			"show": false,
  			"toolbar": false,
        "focus": true,
  			"frame": true
      };

      var pathName ="./code.html";

      this.browserWindow = BrowserWindow.open(pathName, options);

      global.glueApplication.codeView = this;

      this.handleEvents();


      loadSettings = _.extend({}, settings);

      if (this.constructor.includeShellLoadTime) {
          this.constructor.includeShellLoadTime = false;
          if (loadSettings.shellLoadTime == null) {
            loadSettings.shellLoadTime = Date.now() - global.shellStartTime;
          }
      }

      this.browserWindow.loadSettings = loadSettings;

    }


    GlueCode.prototype.handleEvents = function() {
      //Closed
      this.browserWindow.on('closed', (function(_this) {
        return function() {
          return global.glueApplication.codeView = null;
        };
      })(this));

    };

    GlueCode.prototype.updateCV = function() {
      return this.browserWindow.emit('refresh');
    };


    GlueCode.prototype.getDimensions = function() {
      return {
        x: this.browserWindow.x,
        y: this.browserWindow.y,
        width: this.browserWindow.width,
        height: this.browserWindow.height
      };
    };

    GlueCode.prototype.close = function() {
      return this.browserWindow.close(true); //force to close
    };

    GlueCode.prototype.focus = function() {
      return this.browserWindow.focus();
    };

    GlueCode.prototype.blur = function() {
      return this.browserWindow.blur();
    };

    GlueCode.prototype.show = function() {
      return this.browserWindow.show();
    };

    GlueCode.prototype.hide = function() {
      return this.browserWindow.hide();
    };

    GlueCode.prototype.minimize = function() {
      return this.browserWindow.minimize();
    };

    GlueCode.prototype.maximize = function() {
      return this.browserWindow.maximize();
    };

    GlueCode.prototype.restore = function() {
      return this.browserWindow.restore();
    };


    GlueCode.prototype.reload = function() {
      return this.browserWindow.reload();
    };

    GlueCode.prototype.showDevTools = function() {
      return this.browserWindow.showDevTools();
    };

    GlueCode.prototype.closeDevTools = function() {
      return this.browserWindow.closeDevTools();
    };

    GlueCode.prototype.isFullScreen = function() {
      return this.browserWindow.isFullScreen();
    };

    GlueCode.prototype.setFullScreen = function() {
      return this.browserWindow.enterFullScreen();
    };

    GlueCode.prototype.exitFullScreen = function() {
      return this.browserWindow.leaveFullScreen();
    };

    GlueCode.prototype.toggleFullScreen = function() {
      return this.browserWindow.toggleFullScreen();
    };


    return GlueCode;

})();
