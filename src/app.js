import * as html from '@hyperapp/html'

import * as data from './data'

export const actions = {
  noop: () => (state, actions) => ({...state}),
}

export function initialState() {
    return {
      users: data.users,
      comments: data.comments,
      answers: data.answers,
      questions: data.questions,
    }
}

export function view(state, actions) {
  return html.div(
    {
      id: 'app',
    },
    [
      html.div(JSON.stringify(state.users)),
      html.div(JSON.stringify(state.comments)),
      html.div(JSON.stringify(state.answers)),
      html.div(JSON.stringify(state.questions)),
    ],
  )
}
