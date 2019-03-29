'use strict'
const Generator = require('yeoman-generator')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

module.exports = class extends Generator {
  prompting () {
    this.log(`Add files for a new screen`)

    const { lstatSync, readdirSync } = fs
    const isDirectory = source => lstatSync(source).isDirectory()
    const presentationModules = readdirSync(this.destinationPath('src/presentation'))
      .filter(name => isDirectory(path.join('src/presentation', name)))

    const prompts = [
      {
        type: 'list',
        name: 'moduleName',
        message: 'Module to add screen to',
        choices: presentationModules
      },
      {
        type: 'input',
        name: 'screenBaseName',
        message: 'Screen base name (e.g.: FancyList)',
        validate: (value) => value.length > 0
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    const {
      moduleName,
      screenBaseName
    } = this.props

    this.fs.copyTpl(
      this.templatePath('navigation/ScreenNavigationFactory.tsx'),
      this.destinationPath(`src/presentation/${moduleName}/navigation/${screenBaseName}ScreenNavigationFactory.tsx`),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('views/ScreenView.tsx'),
      this.destinationPath(`src/presentation/${moduleName}/views/${screenBaseName}ScreenView.tsx`),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('containers/ScreenFactory.ts'),
      this.destinationPath(`src/presentation/${moduleName}/containers/${screenBaseName}ScreenFactory.ts`),
      this.props
    )
  }

  printingCodeToInsert () {
    const {
      moduleName,
      screenBaseName
    } = this.props

    this.log(chalk.yellow(`Here is the code to be inserted into src/presentation/${moduleName}/index.ts`))

    this.log(chalk.yellow(`Import section:`))
    this.log(`\n
    import ${screenBaseName}ScreenFactory from './containers/${screenBaseName}ScreenFactory'
    import ${screenBaseName}ScreenNavigationFactory from './navigation/${screenBaseName}ScreenNavigationFactory'
    \n\n`)

    this.log(chalk.yellow(`Navigator routes:`))
    this.log(`\n
    ${screenBaseName}: {
      screen: ${screenBaseName}ScreenNavigationFactory(${screenBaseName}ScreenFactory())
    }
    \n\n`)
  }
}
