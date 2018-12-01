import * as html from '@hyperapp/html'
import {Route, location} from '@hyperapp/router'

import * as data from './data'
import Header from './components/header/header'
import Browse from './components/browse/browse'
import Ask from './components/ask/ask'
import Question from './components/question/question'
import styles from './app.scss'

export const actions = {
  location: location.actions,
}

export function initialState() {
    return {
      location: location.state,
      data: {
        users: data.users,
        comments: data.comments,
        answers: data.answers,
        questions: data.questions,
        tags: data.tags,
      },
      user: 1,
    }
}

export function view(state, actions) {
  return html.div(
    {
      class: styles.app,
    },
    [
      Header({user: state.data.users[state.user]}),
      Route({
        path: '/',
        render: () => Browse({data: state.data}),
      }),
      Route({
        path: '/question/:id',
        render: ({location}) =>
          Question({id: parseQuestionIdFromPath(location.pathname), data: state.data}),
      }),
      Route({
        path: '/ask',
        render: () => Ask(),
      }),
    ],
  )
}


function parseQuestionIdFromPath(path) {
  const parts = path.split('/')
  return Number(parts[parts.length - 1])
}
