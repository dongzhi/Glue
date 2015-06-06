var GlueWindow,__slice = [].slice;

var app = global.gui.App;

var BrowserWindow = global.gui.Window;

var path = require('path');
var fs = require('fs-plus');
var url = require('url');
var _ = require('underscore-plus');

var EventEmitter = require('events').EventEmitter;

module.exports = GlueWindow = (function() {

    _.extend(GlueWindow.prototype, EventEmitter.prototype);

    GlueWindow.iconPath = path.resolve(__dirname, '..', '..', 'core/images', 'icon.png');
    GlueWindow.includeShellLoadTime = true;
    GlueWindow.prototype.browserWindow = null;
    GlueWindow.prototype.loaded = null;


    function GlueWindow(settings) {
      var hasPathToOpen;

      var loadSettings = _.extend({}, settings);

      if (settings == null) {
        settings = {};
      }
      var pathToOpen = settings.pathToOpen;
      if(!pathToOpen){
        loadSettings.fileName = "Untitled";
        hasPathToOpen = false;
        var cacheDir = path.join(process.env.GLUE_HOME, 'compile-cache');
        var fileName = 'untitled_'+Date.now();
        var filePath = path.normalize(cacheDir+'/'+fileName+'.glue');
        var db = {};
        //create tempFile in cacheDir
        try{
          if(!fs.existsSync(cacheDir)){
              //create cacheDir
              fs.mkdirSync(cacheDir, 0766);
          }
          //create temp file
          fs.appendFileSync(filePath, JSON.stringify(db));
          pathToOpen = filePath;
        }catch(error){
          console.error("Failed to create temp file: " + error);
          throw error;
        }
      }else{
        hasPathToOpen = true;
        var filePath = path.normalize(pathToOpen);
        loadSettings.fileName = filePath.split('/').pop();
      }

      this.exitWhenDone = settings.exitWhenDone;

      var options = {
        "icon": this.iconPath,
        "title": 'Glue',
        "width": 800,
  			"height": 600,
  			"min_height": 400,
  			"min_width": 400,
  			"position": "center",
  			"show": true,
  			"toolbar": false,
  			"frame": true
        //"new-instance": true
        //then run as another nodejs instance no data share
      };

      var pathName ="./blank.html";
      this.browserWindow = BrowserWindow.open(pathName, options);

      this.handleEvents();

      loadSettings.hasPathToOpen = hasPathToOpen;
      if (this.constructor.includeShellLoadTime) {
        this.constructor.includeShellLoadTime = false;
        if (loadSettings.shellLoadTime == null) {
          loadSettings.shellLoadTime = Date.now() - global.shellStartTime;
        }
      }
      loadSettings.initialPath = pathToOpen;
      loadSettings.saved = false;
      this.browserWindow.loadSettings = loadSettings;

      //code view
      this.browserWindow.cv = null;
      this.browserWindow.pv = null;

        //check file extension
        // if(hasPathToOpen){
        //   var fileExt = path.normalize(pathToOpen).split('.').pop();
        //   if(fileExt !== 'glue'){
        //       throw new Error(fileExt);
        //       var dialog = require('dialog');
        //       var chosen = dialog.showErrorBox('Invalid file format', 'Sorry, this file type is not supported by Glue.');
        //       this.browserWindow.destroy();
        //       return;
        //   }
        // }


        this.browserWindow.once('window:loaded', (function(_this) {
          return function() {
            _this.emit('window:loaded');
            return _this.loaded = true;
          };
        })(this));

        global.glueApplication.addWindow(this);
        //global.glueApplication.applicationMenu.setMenu(this.browserWindow);//init window menu
    }


    GlueWindow.prototype.handleEvents = function() {
      //Closing
      this.browserWindow.on('close', (function(_this) {
        return function() {
          //throw new Error(JSON.stringify(_this.));
          var saved = _this.browserWindow.loadSettings.saved;

          if(!saved){
            return _this.browserWindow.emit('quitsave');
          }

          //clean cache
          global.glueApplication.emit('application:del-cache');

          return _this.browserWindow.close(true);
        };
      })(this));

      //Closed
      this.browserWindow.on('closed', (function(_this) {
        return function() {
          return global.glueApplication.removeWindow(_this);
        };
      })(this));

      //this.setupContextMenu();

    };


    GlueWindow.prototype.getDimensions = function() {
      return {
        x: this.browserWindow.x,
        y: this.browserWindow.y,
        width: this.browserWindow.width,
        height: this.browserWindow.height
      };
    };

    GlueWindow.prototype.close = function() {
      return this.browserWindow.close(true); //force to close
    };

    GlueWindow.prototype.focus = function() {
      return this.browserWindow.focus();
    };

    GlueWindow.prototype.blur = function() {
      return this.browserWindow.blur();
    };

    GlueWindow.prototype.show = function() {
      return this.browserWindow.show();
    };

    GlueWindow.prototype.hide = function() {
      return this.browserWindow.hide();
    };

    GlueWindow.prototype.minimize = function() {
      return this.browserWindow.minimize();
    };

    GlueWindow.prototype.maximize = function() {
      return this.browserWindow.maximize();
    };

    GlueWindow.prototype.restore = function() {
      return this.browserWindow.restore();
    };

    // GlueWindow.prototype.isFocused = function() {
    //   return this.browserWindow.isFocused();
    // };
    //
    // GlueWindow.prototype.isMinimized = function() {
    //   return this.browserWindow.isMinimized();
    // };
    //
    // GlueWindow.prototype.isWebViewFocused = function() {
    //   return this.browserWindow.isWebViewFocused();
    // };

    GlueWindow.prototype.reload = function() {
      return this.browserWindow.reload();
    };

    GlueWindow.prototype.showDevTools = function() {
      return this.browserWindow.showDevTools();
    };

    GlueWindow.prototype.closeDevTools = function() {
      return this.browserWindow.closeDevTools();
    };

    GlueWindow.prototype.isFullScreen = function() {
      return this.browserWindow.isFullScreen();
    };

    GlueWindow.prototype.setFullScreen = function() {
      return this.browserWindow.enterFullScreen();
    };

    GlueWindow.prototype.exitFullScreen = function() {
      return this.browserWindow.leaveFullScreen();
    };

    GlueWindow.prototype.toggleFullScreen = function() {
      return this.browserWindow.toggleFullScreen();
    };


    return GlueWindow;

})();
