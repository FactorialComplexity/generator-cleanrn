import <%= navigatorBaseName %>NavigatorFactory from './navigation/<%= navigatorBaseName %>NavigatorFactory'

import <%= screenBaseName %>ScreenFactory from './containers/<%= screenBaseName %>ScreenFactory'

// Types imports
<%_ if (needsStoreManager) { _%>import StoreManager from '_app/utils/StoreManager'<%_ } _%>

export default function <%= moduleName %>Module (<%_ if (needsStoreManager) { _%>storeManager: StoreManager<%_ } _%>) {
  const <%= screenBaseName %>Screen = <%= screenBaseName %>ScreenFactory()

  const <%= navigatorBaseName %>Navigator = <%= navigatorBaseName %>NavigatorFactory(<%= screenBaseName %>Screen)

  return {
    navigators: {
      <%= navigatorBaseName %>Navigator
    },
    Navigator: <%= navigatorBaseName %>Navigator
  }
}

export type <%= moduleName[0].toUpperCase() + moduleName.substr(1) %>Module = ReturnType<typeof <%= moduleName %>Module>
