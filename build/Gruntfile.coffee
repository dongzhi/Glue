fs = require 'fs'
path = require 'path'
os = require 'os'

# Add support for obselete APIs of vm module so we can make some third-party
# modules work under node v0.11.x.
require 'vm-compatibility-layer'

_ = require 'underscore-plus'

# Shim harmony collections in case grunt was invoked without harmony collections enabled
_.extend(global, require('harmony-collections')) unless global.WeakMap?

# Grunt Automation
module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-coffeelint')
  grunt.loadNpmTasks('grunt-lesslint')
  #grunt.loadNpmTasks('grunt-cson')
  #grunt.loadNpmTasks('grunt-contrib-csslint')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  #grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-node-webkit-builder')
  #grunt.loadNpmTasks('grunt-asar')
  #grunt.loadNpmTasks('grunt-peg')
  grunt.loadTasks('tasks')

  # This allows all subsequent paths to the relative to the root of the repo
  grunt.file.setBase(path.resolve('..'))

  if not grunt.option('verbose')
    grunt.log.writeln = (args...) -> grunt.log
    grunt.log.write = (args...) -> grunt.log

  #[major, minor, patch] = packageJson.version.split('.')
  #tmpDir = os.tmpdir()
  appName = if process.platform is 'darwin' then 'Glue.app' else 'Glue'
  #buildDir = grunt.option('build-dir') ? path.join('tmpDir', 'glue')
  buildDir = path.resolve('./')

  installDir = grunt.option('install-dir')

  home = if process.platform is 'win32' then process.env.USERPROFILE else process.env.HOME

  plistDir = path.join(buildDir, 'node-webkit/Glue/osx64/Glue.app','Contents')
  shellAppDir = path.join(buildDir, appName)

  #kill running instance
  if process.platform is 'win32'
    contentsDir = shellAppDir
    appDir = path.join(shellAppDir, 'resources', 'app')
    installDir ?= path.join(process.env.ProgramFiles, appName)
    killCommand = 'taskkill /F /IM glue.exe'
  else if process.platform is 'darwin'
    #contentsDir = path.join(shellAppDir, 'Contents')
    #appDir = path.join(contentsDir, 'Resources', 'app.nw')
    srcDir = path.join(buildDir,'src')
    installDir ?= path.join('/Applications', appName)
    killCommand = 'pkill -9 Glue'
  else
    contentsDir = shellAppDir
    appDir = path.join(shellAppDir, 'resources', 'app')
    installDir ?= process.env.INSTALL_PREFIX ? '/usr/local'
    killCommand ='pkill -9 glue'

  installDir = path.resolve(installDir)

  coffeeConfig =
    glob_to_multiple:
      expand: true
      src: [
        'src/**/*.coffee'
        'exports/**/*.coffee'
        'static/**/*.coffee'
      ]
      dest: appDir
      ext: '.js'

  # lessConfig =
  #   options:
  #     paths: [
  #       'static/variables'
  #       'static'
  #     ]
  #   glob_to_multiple:
  #     expand: true
  #     src: [
  #       'static/**/*.less'
  #     ]
  #     dest: appDir
  #     ext: '.css'

  # prebuildLessConfig =
  #   src: [
  #     'static/**/*.less'
  #     'node_modules/bootstrap/less/bootstrap.less'
  #   ]

  # csonConfig =
  #   options:
  #     rootObject: true
  #     cachePath: path.join(home, '.glue', 'compile-cache', 'grunt-cson')
  #
  #   glob_to_multiple:
  #     expand: true
  #     src: [
  #       'menus/*.cson'
  #       'keymaps/*.cson'
  #       'static/**/*.cson'
  #     ]
  #     dest: appDir
  #     ext: '.json'
  #
  # pegConfig =
  #   glob_to_multiple:
  #     expand: true
  #     src: ['src/**/*.pegjs']
  #     dest: appDir
  #     ext: '.js'


  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    glue: {appDir, appName, plistDir, buildDir, contentsDir, installDir, shellAppDir, srcDir}

    docsOutputDir: 'docs/output'

    coffee: coffeeConfig

    #less: lessConfig

    # 'prebuild-less': prebuildLessConfig

    #cson: csonConfig

    #peg: pegConfig

    coffeelint:
      options:
        configFile: 'coffeelint.json'
      src: [
        'dot-atom/**/*.coffee'
        'exports/**/*.coffee'
        'src/**/*.coffee'
      ]
      build: [
        'build/tasks/**/*.coffee'
        'build/Gruntfile.coffee'
      ]
      test: [
        'spec/*.coffee'
      ]

    nodewebkit:
      options:
        version: '0.12.0'
        buildDir: './node-webkit'  #Where the build version of my node-webkit app is saved
        credits: './docs/credits.html' #license file?
        macIcns: './src/icon.icns' #Path to the Mac icon file
        platforms: ['osx64'] #hese are the platforms that we want to build
      src: [
        './src/**/*' #Your node-webkit app src file
      ]

    shell:
      'kill-glue':
        command: killCommand
        options:
          stdout: false
          stderr: false
          failOnError: false

  grunt.registerTask('build-node-webkit', ['set-version','nodewebkit','copy-info-plist'])
  defaultTasks = ['build-node-webkit']
  grunt.registerTask('default', defaultTasks)
