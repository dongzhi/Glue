/*---load modules---*/
// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

var fs = require('fs-plus');
var path = require('path');


//this window
var thisWindow = gui.Window.get();
//loading page settings
var loadSettings = thisWindow.loadSettings;

$( document ).ready(function() {
  try {
    startTime = Date.now();

    //show window
    thisWindow.resizeTo(400,600);
    var focusWin = global.glueApplication.lastFocusedWindow.getDimensions();
    thisWindow.moveTo((focusWin.x+focusWin.width - 420), (focusWin.y+20));
    thisWindow.focus();
    thisWindow.show();

    //prepare the stage
    var WIDTH = $(window).width(), HEIGHT = $(window).height();

    $('.target').html(global.glueApplication.lastFocusedWindow.browserWindow.title);
    $('#codewin code').html(global.glueApplication.lastFocusedWindow.browserWindow.cv);

    hljs.configure({
      useBR: true,
    });

    $('#codewin code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    //events
    thisWindow.on('refresh', function(){
      $('.target').html(global.glueApplication.lastFocusedWindow.browserWindow.title);
      $('#codewin code').html(global.glueApplication.lastFocusedWindow.browserWindow.cv);
      $('#codewin code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });

  }catch (error) {
    thisWindow.resizeTo(400, 600);
    thisWindow.setPosition("center");
    thisWindow.show();
    thisWindow.showDevTools();
    throw new Error(error.stack || error);
  }
});
