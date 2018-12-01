import {app as hyperapp} from 'hyperapp'
import devtools from 'hyperapp-redux-devtools'

import * as app from './app'

window.app = devtools(hyperapp)(
  app.initialState(), app.actions, app.view, document.getElementById('app'))
