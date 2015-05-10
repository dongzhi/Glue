/*---- Start the application ---*/
global.shellStartTime = Date.now();

var gui = require('nw.gui');// Load native UI library
global.gui = gui;
global.appWin = gui.Window.get();
var app = gui.App;

var fs = require('fs-plus');
var path = require('path');
var optimist = require('optimist');

var start = function(){
  setupGlueHome();

  var args = parseCommandLine();

  var addPathToOpen = function(event, pathToOpen) {
    event.preventDefault();
    return args.pathsToOpen.push(pathToOpen);
  };

  app.on('open', addPathToOpen);

  // app.on('will-finish-launching', function() {
  //   return setupCrashReporter();
  // });

  // app.on('ready', function() {
  //   console.log("ready!");
  // });
  var GlueApplication, cwd, _ref;
  cwd = ((_ref = args.executedFrom) != null ? _ref.toString() : void 0) || process.cwd();
  args.pathsToOpen = args.pathsToOpen.map(function(pathToOpen) {
    pathToOpen = fs.normalize(pathToOpen);
    if (cwd) {
      return path.resolve(cwd, pathToOpen);
    } else {
      return path.resolve(pathToOpen);
    }
  });

  GlueApplication = require('./glue-application');
  GlueApplication.open(args); //entry-point

  if (!args.test) {
    return console.log("App load time: " + (Date.now() - global.shellStartTime) + "ms");
  }

};


var setupGlueHome = function() {
  var glueHome;
  if (process.env.GLUE_HOME) {
    return;
  }
  glueHome = path.join(getHomeDir(), '.glue');
  try {
    glueHome = path.normalize(glueHome);
    //glueHome = fs.realpathSync(glueHome);
    if(!fs.existsSync(glueHome)){
        fs.mkdirSync(glueHome, 0766);
    }
  } catch (_error) {
    console.log(_error);
  }
  return process.env.GLUE_HOME = glueHome;
};

var getHomeDir= function(){
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

var parseCommandLine = function() {
  var version = app.manifest.version; //Glue version
  var options = optimist(app.argv); //process.argv/fullArgv what\'s the diff?
  options.usage("Glue v" + version + "\n\nUsage: atom [options] [path ...]\n\nOne or more paths to files or folders to open may be specified.\n\nFile paths will open in the current window.\n\nFolder paths will open in an existing window if that folder has already been\nopened or a new window if it hasn't.\n\nEnvironment Variables:\n\n  ATOM_DEV_RESOURCE_PATH  The path from which Atom loads source code in dev mode.\n                          Defaults to `~/github/atom`.\n\n  ATOM_HOME               The root path for all configuration files and folders.\n                          Defaults to `~/.atom`.");
  options.alias('f', 'foreground').boolean('f').describe('f', 'Keep the browser process in the foreground.');
  options.alias('h', 'help').boolean('h').describe('h', 'Print this usage message.');
  options.alias('l', 'log-file').string('l').describe('l', 'Log all output to file.');
  options.alias('n', 'new-window').boolean('n').describe('n', 'Open a new window.');
  options.alias('v', 'version').boolean('v').describe('v', 'Print the version.');
  options.alias('w', 'wait').boolean('w').describe('w', 'Wait for window to be closed before returning.');
  var args = options.argv;
  if (args.help) {
    process.stdout.write(options.help());
    process.exit(0);
  }
  if (args.version) {
    process.stdout.write("" + version + "\n");
    process.exit(0);
  }
  var executedFrom = args['executed-from'];
  var pathsToOpen = args._;
  if (executedFrom && pathsToOpen.length === 0) {
    pathsToOpen = [executedFrom];
  }
  var newWindow = args['new-window'];
  var pidToKillWhenClosed;
  if (args['wait']) {
    pidToKillWhenClosed = args['pid'];
  }
  var logFile = args['log-file'];

  if (args['path-environment']) {
    process.env.PATH = args['path-environment'];
  }
  return {
    pathsToOpen: pathsToOpen,
    executedFrom: executedFrom,
    version: version,
    pidToKillWhenClosed: pidToKillWhenClosed,
    newWindow: newWindow,
    logFile: logFile
  };
};


try{
  start();
}catch (error) {
  // Get the current window
  //var win = gui.Window.get();
  global.appWin.setPosition("center");
  global.appWin.show();
  global.appWin.showDevTools();
  //console.error(error.stack || error);
  throw new Error(error.stack || error);
}

// process.on('uncaughtException', function(error) {
//   if (error == null) {
//     error = {};
//   }
//   if (error.message != null) {
//     console.log(error.message);
//   }
//   if (error.stack != null) {
//     return console.log(error.stack);
//   }
// });
