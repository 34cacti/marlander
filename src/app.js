import * as html from '@hyperapp/html'
import {Route, location} from '@hyperapp/router'

import * as data from './data'
import Header from './components/header/header'
import Browse from './components/browse/browse'
import styles from './app.scss'

export const actions = {
  location: location.actions,
}

export function initialState() {
    return {
      location: location.state,
      users: data.users,
      comments: data.comments,
      answers: data.answers,
      questions: data.questions,
      tags: data.tags,
      user: 1,
    }
}

export function view(state, actions) {
  return html.div(
    {
      class: styles.app,
    },
    [
      Header({user: state.users[state.user]}),
      Route({
        path: '/',
        render: () => Browse({data}),
      }),
      Route({
        path: '/question/:id',
        render: ({location}) =>
          html.div(`question page for question ${JSON.stringify(location)}`),
      }),
    ],
  )
}
