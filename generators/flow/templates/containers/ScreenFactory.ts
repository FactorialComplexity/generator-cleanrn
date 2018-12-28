import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import <%= screenBaseName %>ScreenView from '../views/<%= screenBaseName %>ScreenView'

// Types imports

export default function <%= screenBaseName %>ScreenFactory () {
  function mapStateToProps (state: any) {
    return {
    }
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return bindActionCreators({
    }, dispatch)
  }

  return connect(mapStateToProps, mapDispatchToProps)(<%= screenBaseName %>ScreenView)
}

export type <%= screenBaseName %>Screen = ReturnType<typeof <%= screenBaseName %>ScreenFactory>
