'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting () {
    this.log(`Create a new flow-like module in ./presentation folder`)

    const prompts = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Module name (e.g.: fancyFlow)',
        validate: (value) => value.length > 0
      },
      {
        type: 'confirm',
        name: 'needsStoreManager',
        message: 'Add dependency on StoreManager?',
        default: false
      },
      {
        type: 'list',
        name: 'navigatorType',
        message: 'Navigator for the flow',
        choices: [
          'StackNavigator'
        ]
      },
      {
        type: 'input',
        name: 'navigatorBaseName',
        message: 'Navigator base name',
        default: (answers) => {
          const { moduleName } = answers
          let navigatorBaseName = (moduleName.endsWith('Flow')
            ? moduleName.substr(0, moduleName.length - 4)
            : moduleName
          )
          navigatorBaseName = navigatorBaseName[0].toUpperCase() + navigatorBaseName.substr(1)
          return navigatorBaseName
        },
        validate: (value) => value.length > 0
      },
      {
        type: 'input',
        name: 'screenBaseName',
        message: 'First screen base name (e.g.: FancyList)',
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
      navigatorBaseName,
      screenBaseName
    } = this.props

    this.fs.copyTpl(
      this.templatePath('index.ts'),
      this.destinationPath(`src/presentation/${moduleName}/index.ts`),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('navigation/NavigatorFactory.ts'),
      this.destinationPath(`src/presentation/${moduleName}/navigation/${navigatorBaseName}NavigatorFactory.ts`),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('navigation/screens/ScreenNavigationFactory.tsx'),
      this.destinationPath(`src/presentation/${moduleName}/navigation/screens/${screenBaseName}ScreenNavigationFactory.tsx`),
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
}
