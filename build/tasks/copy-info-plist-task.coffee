path = require 'path'

module.exports = (grunt) ->
  {cp} = require('./task-helpers')(grunt)

  grunt.registerTask 'copy-info-plist', 'Copy plist', ->

    plistDir = grunt.config.get('glue.plistDir')
    plistPath = path.join(plistDir, 'Info.plist')
    #helperPlistPath = path.join(contentsDir, 'Frameworks/Glue Helper.app/Contents/Info.plist')

    # Copy custom plist files
    cp 'resources/Info.plist', plistPath
    #cp 'resources/mac/helper-Info.plist',  helperPlistPath
