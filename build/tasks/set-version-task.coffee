fs = require 'fs'
path = require 'path'

module.exports = (grunt) ->
  {spawn} = require('./task-helpers')(grunt)

  getVersion = (callback) ->
    onBuildMachine = process.env.JANKY_SHA1 and process.env.JANKY_BRANCH is 'master'
    inRepository = fs.existsSync(path.resolve(__dirname, '..', '..', '.git'))
    {version} = require(path.join(grunt.config.get('glue.srcDir'), 'package.json'))
    if onBuildMachine or not inRepository
      callback(null, version)
    else
      cmd = 'git'
      args = ['rev-parse', '--short', 'HEAD']
      spawn {cmd, args}, (error, {stdout}={}, code) ->
        commitHash = stdout?.trim?()
        combinedVersion = "#{version}-#{commitHash}"
        callback(error, combinedVersion)

  grunt.registerTask 'set-version', 'Set the version in the plist and package.json', ->
    done = @async()

    getVersion (error, version) ->
      if error?
        done(error)
        return

      srcDir = grunt.config.get('glue.srcDir')
      buildDir = grunt.config.get('glue.buildDir')
      plistDir = path.join(buildDir, 'resources')

      # Replace version field of package.json.
      packageJsonPath1 = path.join(srcDir, 'package.json')
      packageJsonPath2 = path.join(buildDir, 'package.json')
      packageJson1 = require(packageJsonPath1)
      packageJson2 = require(packageJsonPath2)
      version = version.split('-')
      version = version[0]
      version = version.split(".")
      version[2] = 0
      version[1] = parseInt(version[1])+1
      if version[1] >= 1000
        version[1] = 0
        version[0] = parseInt(version[0])+1
      packageJson1.version = version.join('.')
      packageJson2.version = version.join('.')
      #./package.json
      packageJsonString1 = JSON.stringify(packageJson1)
      fs.writeFileSync(packageJsonPath1, packageJsonString1)
      #./src/package.json
      packageJsonString2 = JSON.stringify(packageJson2)
      fs.writeFileSync(packageJsonPath2, packageJsonString2)

      if process.platform is 'darwin'
        cmd = 'script/setversion'
        args = [plistDir, packageJson1.version]
        spawn {cmd, args}, (error, result, code) -> done(error)
      else
        done()
