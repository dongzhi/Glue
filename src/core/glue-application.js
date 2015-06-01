var GlueApplication,__slice = [].slice;

var app = global.gui.App;
var ApplicationMenu = require('./glue-menu');
var GlueWindow = require('./glue-window');
var GlueCode = require('./glue-codeview');
var GluePhone = require('./glue-phoneview');
var BrowserWindow = global.gui.Window;

var path = require('path');
var fs = require('fs-plus');
var os = require('os');
var _ = require('underscore-plus');


var EventEmitter = require('events').EventEmitter;

module.exports = GlueApplication = (function() {

  _.extend(GlueApplication.prototype, EventEmitter.prototype);

  GlueApplication.open = function(options) {

    var createGlueApplication = function() {
      return new GlueApplication(options);
    };
    if (process.platform !== 'win32') {
      createGlueApplication();
      return;
    }
  };

  function GlueApplication(options) {
    this.version = options.version,

    global.glueApplication = this;
    global.lastopenDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    this.pidsToOpenWindows = {};
    if (this.pathsToOpen == null) {
      this.pathsToOpen = [];
    }
    this.windows = [];
    //this.autoUpdateManager = new AutoUpdateManager(this.version);
    this.applicationMenu = new ApplicationMenu(this.version);
    //this.atomProtocolHandler = new AtomProtocolHandler(this.resourcePath, this.safeMode);
    //this.listenForArgumentsFromNewProcess();
    //this.setupJavaScriptArguments();
    this.setupServer();
    this.handleEvents();
    this.openWithOptions(options); //exit point
  }

  GlueApplication.prototype.openWithOptions = function(_arg) {
    var pathsToOpen = _arg.pathsToOpen;
    var pidToKillWhenClosed = _arg.pidToKillWhenClosed;
    var newWindow = _arg.newWindow;
    var logFile = _arg.logFile;
    var version = _arg.version;

    return this.openPaths({
        pathsToOpen: pathsToOpen,
        pidToKillWhenClosed: pidToKillWhenClosed,
        newWindow: newWindow,
        version: version
    });

  };

  GlueApplication.prototype.windows = null;
  GlueApplication.prototype.applicationMenu = null;
  GlueApplication.prototype.version = null;

  GlueApplication.prototype.handleEvents = function() {

    this.on('application:quit', function() {
      //quit() will not send close event to all windows, use closeAllWindows() instead
      //Use this method to quit an app will give windows a chance to save data.
      //check: https://github.com/nwjs/nw.js/wiki/App
      //return app.quit();
      //return console.log("Quiting...");
      return app.closeAllWindows();
    });

    this.on('application:del-cache', function() {
      return this.deleteTempFile();
    });

    this.on('application:new', function() {
      //return this.openPaths();
      return this.focusedWindow().browserWindow.emit('newfile');
    });

    this.on('application:open', function() {
      return this.promptForPathToOpen();
    });

    this.on('application:open-file', function() {
      return this.promptForPathToOpen();
    });

    this.on('application:save', function() {
      return this.focusedWindow().browserWindow.emit('save');
    });

    this.on('application:saveas', function() {
      return this.focusedWindow().browserWindow.emit('saveas');
    });

    this.on('application:codeview', function() {
      if(this.codeView){
        this.codeView.close();
        this.codeView = null;
      }else{
        var openedCodeView = new GlueCode({
        });
      }
    });


    this.on('application:phoneview', function() {
      if(this.phoneView){
        this.phoneView.close();
        this.phoneView = null;
      }else{
        var openedPhoneView = new GluePhone({
        });
      }
    });

    this.on('application:phoneviewfocus', function() {
      if(this.phoneView){
        this.phoneView.focus();
      }else{
        var openedPhoneView = new GluePhone({
        });
      }
    });




    if (process.platform !== 'darwin') {
      this.on('application:minimize', function() {
        var _ref;
        return (_ref = this.focusedWindow()) != null ? _ref.minimize() : void 0;
      });
      this.on('application:zoom', function() {
        var _ref;
        return (_ref = this.focusedWindow()) != null ? _ref.maximize() : void 0;
      });
    }

  };

  GlueApplication.prototype.focusedWindow = function() {
    return global.glueApplication.lastFocusedWindow
  };

  GlueApplication.prototype.openPaths = function(_arg) {
    var _ref = _arg != null ? _arg : {};
    var pathsToOpen = _ref.pathsToOpen != null?_ref.pathsToOpen:[];
    var pidToKillWhenClosed = _ref.pidToKillWhenClosed;
    var newWindow = _ref.newWindow;
    var window = _ref.window;
    var version = _ref.version
    var openedWindow;

    //throw new Error(JSON.stringify(pathsToOpen.length));
    if(pathsToOpen.length === 0){
      openedWindow = new GlueWindow({
        pathToOpen: pathsToOpen[0],
        version : version
      });
    }else{
      // for (var _i = 0; _i < pathsToOpen.length; _i++) {
      //   //global.appWin.window.alert(pathsToOpen[_i]);
      //   openedWindow = new GlueWindow({
      //     pathToOpen: pathsToOpen[_i],
      //     version : version
      //   });
      // }
      var _i = pathsToOpen.length;
      openedWindow = new GlueWindow({
          pathToOpen: pathsToOpen[_i-1],
          version : version
      });
    }

    if (pidToKillWhenClosed != null) {
      this.pidsToOpenWindows[pidToKillWhenClosed] = openedWindow;
    }

    return openedWindow.browserWindow.once('closed', (function(_this) {
      return function() {
        return _this.killProcessForWindow(openedWindow);
      };
    })(this));

  };

  //windows manage
  GlueApplication.prototype.removeWindow = function(window) {
    // var _ref;

    this.windows.splice(this.windows.indexOf(window), 1);

    if (this.windows.length === 0) {
      //no windows
      //quit the app
      return app.closeAllWindows();
      //return (_ref = this.applicationMenu) != null ? _ref.enableWindowSpecificItems(false) : void 0;
    }
  };

  GlueApplication.prototype.addWindow = function(window) {
    //store window
    this.windows.push(window);

    //update browserWindow
    var _ref;
    if ((_ref = this.applicationMenu) != null) {
      _ref.addWindow(window.browserWindow);
    }

    //focus
    var focusHandler = (function(_this) {
        return function() {
          if(_this.codeView){
            _this.codeView.updateCV();
          }
          if(_this.phoneView){
            _this.phoneView.updatePV();
          }
          return _this.lastFocusedWindow = window;
        };
    })(this);

    window.browserWindow.on('focus', focusHandler);
    return window.browserWindow.once('closed', (function(_this) {
        return function() {
          if (window === _this.lastFocusedWindow) {
            _this.lastFocusedWindow = null;
          }
          return window.browserWindow.removeListener('focus', focusHandler);
        };
    })(this));

  };
  //open functions
  GlueApplication.prototype.promptForPathToOpen = function() {
    global.appWin.title = "Open";
    var dialog = global.appWin.window.document.querySelector('#openDialog');
    var _this = this;
    var f = new global.appWin.window.File(global.lastopenDir, 'cancelfile');
    var fileList = new global.appWin.window.FileList();
    fileList.append(f);

    var openFiles = function(event){

       if(this.value){
         //global.appWin.window.alert("fired");
         //choosed
         var files = dialog.files;
         var projectPaths = [];
         for (var i = 0; i < files.length; ++i){
           projectPaths.push(files[i].path);
         }

         //callback(projectPaths);
         if(projectPaths){

           //set file back
           dialog.removeEventListener("change", openFiles, false);
           dialog.files = fileList;
           global.appWin.hide();

           //update the lastopenDir
           var newopenDir =  projectPaths[projectPaths.length-1].split('/');
           newopenDir.pop();
           global.lastopenDir = path.normalize(newopenDir.join('/'));

           return _this.openPaths({
                pathsToOpen: projectPaths,
           });
         }

      }else{
        //cancel
        //set file back
        dialog.removeEventListener("change", openFiles, false);
        dialog.files = fileList;
        global.appWin.hide();
      }

    };

    dialog.removeEventListener("change", openFiles, false);
    dialog.files = fileList;


    dialog.addEventListener("change", openFiles, false);

    dialog.click();
  };


  //quit functions

  GlueApplication.prototype.deleteTempFile = function() {
    var tempPath = process.env.GLUE_HOME +'/compile-cache';
    try {
      var files = fs.readdirSync(tempPath);
      if(files.length > 0){
        for (var i=0;i<files.length;i++){
          var filePath = tempPath + '/' + files[i];
          if(fs.statSync(filePath).isFile()){
            fs.unlinkSync(filePath);
          }
        }
      }
    }catch(error){
      throw error;
    }
  };

  GlueApplication.prototype.killAllProcesses = function() {
    var pid, _results;
    _results = [];
    for (pid in this.pidsToOpenWindows) {
      _results.push(this.killProcess(pid));
    }
    return _results;
  };

  GlueApplication.prototype.killProcessForWindow = function(openedWindow) {
    var pid, trackedWindow, _ref, _results;
    _ref = this.pidsToOpenWindows;
    _results = [];
    for (pid in _ref) {
      trackedWindow = _ref[pid];
      if (trackedWindow === openedWindow) {
        _results.push(this.killProcess(pid));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  GlueApplication.prototype.killProcess = function(pid) {
    var error, parsedPid, _ref;
    try {
      parsedPid = parseInt(pid);
      if (isFinite(parsedPid)) {
        process.kill(parsedPid);
      }
    } catch (_error) {
      error = _error;
      if (error.code !== 'ESRCH') {
        console.log("Killing process " + pid + " failed: " + ((_ref = error.code) != null ? _ref : error.message));
      }
    }
    return delete this.pidsToOpenWindows[pid];
  };

  GlueApplication.prototype.setupServer = function(){
    var express = require('express');
    var app = express();
    var server = require('http').createServer(app);
    var bodyParser = require('body-parser');
    var qr = require('qr-image');
    app.set('port', process.env.PORT || 8888);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extented: true
    }));

    app.get('/', function (req, res) {
      res.sendfile('./core/phones.html');
    });

    app.get('/phoneview.css',function(req ,res){
      res.sendfile('./core/css/phoneview.css');
    });
    app.get('/jquery.js', function (req, res) {
      res.sendfile('./core/js/lib/jquery.js');
    });
    app.get('/phoneview.js', function (req, res) {
      res.sendfile('./core/js/app/phoneview.js');
    });
    app.get('/jquery.nouislider.min.js', function (req, res) {
      res.sendfile('./core/js/lib/jquery.nouislider.min.js');
    });

    app.get('/jquery.nouislider.min.css', function (req, res) {
      res.sendfile('./core/css/jquery.nouislider.min.css');
    });
    app.get('/glue.svg', function (req, res) {
      res.sendfile('./core/images/glue.svg');
    });

    app.get('/qr/:id', function(req, res) {
      var url = req.params.id;
      if(url !== null){
        //console.log(getLocalIPs());
        url = 'http://'+getLocalIPs()[0]+':8888?id='+url;
        var code = qr.svgObject(url, { type: 'svg' });
        res.send(code);
        //code.pipe(res);
      }else{
        res.send('wrong');
      }
    });


    server.listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
    });

    global.server = server;
  }

  /////////////////////////////////
  /**
   * Collects information about the local IPv4/IPv6 addresses of
   * every network interface on the local computer.
   * Returns an object with the network interface name as the first-level key and
   * "IPv4" or "IPv6" as the second-level key.
   * For example you can use getLocalIPs().eth0.IPv6 to get the IPv6 address
   * (as string) of eth0
   */
  getLocalIPs = function () {
      //Get the network interfaces
      var interfaces = require('os').networkInterfaces();
      var addresses = [];
      for (var k in interfaces) {
          for (var k2 in interfaces[k]) {
              var address = interfaces[k][k2];
              if (address.family === 'IPv4' && !address.internal) {
                  addresses.push(address.address);
              }
          }
      }

      return addresses;
  };

  return GlueApplication;

})();
