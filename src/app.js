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

  toggleAnswerPanel: () => (state, actions) => ({
    ...state,
    widgets: {
      ...state.widgets,
      answerPanel: {
        ...state.widgets.answerPanel,
        open: !state.widgets.answerPanel.open,
      },
    },
  }),

  widgets: {
    maximizeWidget: id => (state, actions) => ({
      ...state,
      maximizedWidget: state.maximizedWidget === id ? null : id,
    }),
    answerPanel: {
      onResizeStart: ev => (state, actions) => ({
        ...state,
        startingHeight: state.height,
        mouseDown: true,
        mouseDownY: ev.clientY,
      }),
      onResize: ev => (state, actions) => {
        ev.stopPropagation()

        if (!state.mouseDown) return

        // const height = ev.target.parentElement.offsetHeight
        const yChange = state.mouseDownY - ev.clientY
        return {
          ...state,
          height: state.startingHeight + yChange,
        }
      },
      onResizeEnd: ev => (state, actions) => ({
        ...state,
        startingHeight: state.height,
        mouseDown: false,
        mouseDownY: ev.clientY,
      }),
    },
  },
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
      widgets: {
        maximizedWidget: null,
        answerPanel: {
          open: false,
          height: 200,
          startingHeight: 200,
          mouseDown: false,
          mouseDownY: null,
        },
      },
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
        render: () => Browse({
          data: state.data,
          maximizeWidget: actions.widgets.maximizeWidget,
          maximizedWidget: state.widgets.maximizedWidget,
        }),
      }),
      Route({
        path: '/question/:id',
        render: ({location}) =>
          Question({
            id: parseQuestionIdFromPath(location.pathname),
            data: state.data,
            answerPanelDataAndActions: {
              data: state.widgets.answerPanel,
              actions: actions.widgets.answerPanel,
              maximized: state.widgets.maximizedWidget,
              maximize: actions.widgets.maximizeWidget,
            },
            toggleAnswerPanel: actions.toggleAnswerPanel,
          }),
      }),
      Route({
        path: '/ask',
        render: () => Ask(state.widgets.maximizedWidget, actions.widgets.maximizeWidget),
      }),
    ],
  )
}


function parseQuestionIdFromPath(path) {
  const parts = path.split('/')
  return Number(parts[parts.length - 1])
}
