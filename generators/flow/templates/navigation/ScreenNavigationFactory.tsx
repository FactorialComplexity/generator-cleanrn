import React from 'react'
import { View, StatusBar } from 'react-native'

// Types imports
import { <%= screenBaseName %>Screen } from '../containers/<%= screenBaseName %>ScreenFactory'
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

export default function <%= screenBaseName %>ScreenNavigationFactory (<%= screenBaseName %>Screen: <%= screenBaseName %>Screen) {
  class <%= screenBaseName %>ScreenNavigation extends React.Component<{
    navigation: NavigationScreenProp<{}>
  }> {
    static navigationOptions: NavigationScreenOptions = {}

    render () {
      const { navigation } = this.props
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='dark-content' />
          <<%= screenBaseName %>Screen />
        </View>
      )
    }
  }

  return <%= screenBaseName %>ScreenNavigation
}
