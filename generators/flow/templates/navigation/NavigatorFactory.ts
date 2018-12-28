import { createStackNavigator } from 'react-navigation'

import <%= screenBaseName %>ScreenNavigationFactory from './screens/<%= screenBaseName %>ScreenNavigationFactory'

// Types imports
import { <%= screenBaseName %>Screen } from '../containers/<%= screenBaseName %>ScreenFactory'

export default function <%= navigatorBaseName %>NavigatorFactory (
  <%= screenBaseName %>Screen: <%= screenBaseName %>Screen
) {
  const <%= navigatorBaseName %>Navigator = createStackNavigator({
    <%= screenBaseName %>: {
      screen: <%= screenBaseName %>ScreenNavigationFactory(<%= screenBaseName %>Screen)
    }
  }, {
    initialRouteName: '<%= screenBaseName %>'
  })

  return <%= navigatorBaseName %>Navigator
}
