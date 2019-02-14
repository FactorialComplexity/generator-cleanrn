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
          'StackNavigator',
          'DrawerNavigator',
          'BottomTabNavigator',
          'MaterialBottomTabNavigator',
          'MaterialTopTabNavigator'
        ]
      },
      {
        type: 'input',
        name: 'screenBaseName',
        message: `First screen base name (e.g.: FancyList). Keep empty if you don't need base screen`
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
      this.templatePath('index.ts'),
      this.destinationPath(`src/presentation/${moduleName}/index.ts`),
      this.props
    )

    if (screenBaseName.length) {
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
  }
}
