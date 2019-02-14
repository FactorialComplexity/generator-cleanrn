import { call, put, select, takeLatest, all } from 'redux-saga/effects'
import actionCreatorFactory, { isType } from 'typescript-fsa'

// Types imports
import { SagaIterator } from 'redux-saga'
import { Action } from 'redux'
import StoreManager from '_app/utils/StoreManager'

// Interfaces

// Payloads

// State types
interface State<%= moduleNameCapitalized %> {}

interface State {
  <%= moduleName %>: State<%= moduleNameCapitalized %>
}

// Module
export default function <%= moduleName %>Module (storeManager: StoreManager) {
  // Actions
  const actionCreator = actionCreatorFactory('<%= moduleName %>')

  // const myAction = actionCreator<MyActionPayload>('MY_ACTION')

  // Sagas
  // function * myActionSaga (params: MyActionPayload): SagaIterator {
  // }

  storeManager.addSaga(function * () {
    yield all([
      // takeLatest(myAction, action => myActionSaga(action.payload)),
    ])
  })

  // Reducer
  const initialState: State<%= moduleNameCapitalized %> = {}

  storeManager.addReducer('<%= moduleName %>', (state: State<%= moduleNameCapitalized %> = initialState, action: Action): State<%= moduleNameCapitalized %> => {
    // if (isType(action, myAction)) {
    //   return {
    //     ...state,
    //     // ...
    //   }
    // }

    return state
  })

  return {
    actions: {
      // myAction
    },

    selectors: {
      // mySelector: (state: State) => state.<%= moduleName %>
    }
  }
}

export type <%= moduleNameCapitalized %>Module = ReturnType<typeof <%= moduleName %>Module>
