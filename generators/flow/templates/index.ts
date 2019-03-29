import { create<%= navigatorType %> } from 'react-navigation'

<%_ if (screenBaseName.length) { _%>import <%= screenBaseName %>ScreenFactory from './containers/<%= screenBaseName %>ScreenFactory'
import <%= screenBaseName %>ScreenNavigationFactory from './navigation/<%= screenBaseName %>ScreenNavigationFactory'

<%_ } _%>
// Types imports
<%_ if (needsStoreManager) { _%>import StoreManager from '_app/utils/StoreManager'<%_ } _%>

export default function <%= moduleName %>Module (<%_ if (needsStoreManager) { _%>storeManager: StoreManager<%_ } _%>) {
<%_ if (screenBaseName.length) { _%>
  const createNavigator = () =>
    create<%= navigatorType %>(
      {
        <%= screenBaseName %>: {
          screen: <%= screenBaseName %>ScreenNavigationFactory(<%= screenBaseName %>ScreenFactory())
        }
      },
      {
        initialRouteName: '<%= screenBaseName %>'
      }
    )
<%_ } else { _%>
  const createNavigator = () => create<%= navigatorType %>({})
<%_ } _%>

  return {
    createNavigator
  }
}

export type <%= moduleName[0].toUpperCase() + moduleName.substr(1) %>Module = ReturnType<typeof <%= moduleName %>Module>
