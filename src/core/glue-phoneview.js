var GluePhone,__slice = [].slice;

var app = global.gui.App;

var BrowserWindow = global.gui.Window;

var path = require('path');
var fs = require('fs-plus');
var url = require('url');
var _ = require('underscore-plus');

var EventEmitter = require('events').EventEmitter;

module.exports = GluePhone = (function() {

    _.extend(GluePhone.prototype, EventEmitter.prototype);

    GluePhone.iconPath = path.resolve(__dirname, '..', '..', 'core/images', 'icon.png');
    GluePhone.includeShellLoadTime = true;
    GluePhone.prototype.browserWindow = null;
    GluePhone.prototype.loaded = null;


    function GluePhone(settings) {
      var loadSettings;
      if (settings == null) {
        settings = {};
      }

      var options = {
        "icon": this.iconPath,
        "title": 'PhoneView - Glue',
        "width": 400,
  			"height": 600,
  			"min_height": 400,
  			"min_width": 400,
  			"position": "center",
  			"show": true,
  			"toolbar": false,
        "focus": true,
  			"frame": true
      };

      var pathName ="http://localhost:8888";

      this.browserWindow = BrowserWindow.open(pathName, options);

      global.glueApplication.phoneView = this;

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


    GluePhone.prototype.handleEvents = function() {
      //Closed
      this.browserWindow.on('closed', (function(_this) {
        return function() {
          return global.glueApplication.phoneView = null;
        };
      })(this));

    };

    GluePhone.prototype.updatePV = function() {
      return this.browserWindow.emit('refresh');
    };


    GluePhone.prototype.getDimensions = function() {
      return {
        x: this.browserWindow.x,
        y: this.browserWindow.y,
        width: this.browserWindow.width,
        height: this.browserWindow.height
      };
    };

    GluePhone.prototype.close = function() {
      return this.browserWindow.close(true); //force to close
    };

    GluePhone.prototype.focus = function() {
      return this.browserWindow.focus();
    };

    GluePhone.prototype.blur = function() {
      return this.browserWindow.blur();
    };

    GluePhone.prototype.show = function() {
      return this.browserWindow.show();
    };

    GluePhone.prototype.hide = function() {
      return this.browserWindow.hide();
    };

    GluePhone.prototype.minimize = function() {
      return this.browserWindow.minimize();
    };

    GluePhone.prototype.maximize = function() {
      return this.browserWindow.maximize();
    };

    GluePhone.prototype.restore = function() {
      return this.browserWindow.restore();
    };


    GluePhone.prototype.reload = function() {
      return this.browserWindow.reload();
    };

    GluePhone.prototype.showDevTools = function() {
      return this.browserWindow.showDevTools();
    };

    GluePhone.prototype.closeDevTools = function() {
      return this.browserWindow.closeDevTools();
    };

    GluePhone.prototype.isFullScreen = function() {
      return this.browserWindow.isFullScreen();
    };

    GluePhone.prototype.setFullScreen = function() {
      return this.browserWindow.enterFullScreen();
    };

    GluePhone.prototype.exitFullScreen = function() {
      return this.browserWindow.leaveFullScreen();
    };

    GluePhone.prototype.toggleFullScreen = function() {
      return this.browserWindow.toggleFullScreen();
    };


    return GluePhone;

})();
