'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    this.log(`Create a new domain module`)

    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Module name (e.g.: auth)',
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
      moduleName
    } = this.props

    this.fs.copyTpl(
      this.templatePath('domain/module.ts'),
      this.destinationPath(`src/domain/${moduleName}.ts`),
      {
        ...this.props,
        moduleNameCapitalized: moduleName[0].toUpperCase() + moduleName.substr(1)
      }
    )
  }
}
