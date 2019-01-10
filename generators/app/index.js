'use strict'
const Generator = require('yeoman-generator')
const fs = require('fs')
const glob = require('glob')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(`Welcome to Clean React Native project generator.`)
    this.log(`This will scaffold the application at ${this.destinationPath()}`)

    return this.prompt([
      {
        type: 'confirm',
        name: 'confirmNotEmpty',
        message: `Directory ${this.destinationPath()} is not empty. Proceed with scaffolding?`,
        when: (answers) => fs.readdirSync(this.destinationPath()).length > 0
      }
    ]).then(answers => {
      if (answers.confirmNotEmpty === false) {
        process.exit(1)
      }

      const prompts = [
        {
          type: 'input',
          name: 'applicationNameUserFriendly',
          message: 'User friendly application name (e.g.: My Clean Application)',
          validate: (value) => value.length > 0
        },

        {
          type: 'input',
          name: 'packageIdentifier',
          message: 'Package name for Android and bundle identifier for iOS (e.g.: com.example.test)',
          validate: (value) => value.length > 0
        }
      ]

      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props
      })
    })
  }

  writing () {
    const params = Object.assign({}, this.props, {
      applicationName: this.props.applicationNameUserFriendly.replace(/\s+/g, ''),
      jsPackageName: this.props.applicationNameUserFriendly.replace(/\s+/g, '-').toLowerCase()
    })

    // Base
    this.fs.copyTpl(
      glob.sync(this.templatePath('boilerplate-auth-tabs/base/**'), { dot: true }),
      this.destinationPath(),
      params
    )

    // Android
    this.fs.copyTpl(
      glob.sync(this.templatePath('boilerplate-auth-tabs/android/app/src/main/java/**'), { dot: true, nodir: true }),
      this.destinationPath('android/app/src/main/java/' + params.packageIdentifier.split('.').join('/')),
      params
    )

    // iOS
    this.fs.copyTpl(
      glob.sync(this.templatePath('boilerplate-auth-tabs/ios/CleanReactNative/**'), { dot: true }),
      this.destinationPath('ios/' + params.applicationName),
      params
    )

    this.fs.copyTpl(
      glob.sync(this.templatePath('boilerplate-auth-tabs/ios/CleanReactNative.xcodeproj/**'), { dot: true }),
      this.destinationPath('ios/' + params.applicationName + '.xcodeproj'),
      params
    )

    this.fs.copyTpl(
      glob.sync(this.templatePath('boilerplate-auth-tabs/ios/CleanReactNative.xcworkspace/**'), { dot: true }),
      this.destinationPath('ios/' + params.applicationName + '.xcworkspace'),
      params
    )

    // Save config
    this.config.save()
  }
}
