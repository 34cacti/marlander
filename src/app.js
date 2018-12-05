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

  askTitle: title => (state, actions) => ({
    ...state,
    askTitle: title,
  }),

  widgets: {
    autocomplete: {
      updateCurrentWord: ({word, allTags}) => (state, actions) => ({
          ...state,
          currentWord: word,
          suggestions: createSuggestions(allTags, word),
      }),
      selectSuggestion: tag => (state, actions) => {
        if (state.currentTags.includes(tag)) return

        return {
          ...state,
          currentWord: '',
          suggestions: [],
          currentTags: [...state.currentTags, tag],
        }
      },
      removeTag: tag => (state, actions) => ({
        ...state,
        currentTags: state.currentTags.filter(t => t !== tag),
      }),
    },
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
      askTitle: '',
      widgets: {
        maximizedWidget: null,
        autocomplete: {
          currentTags: [],
          currentWord: '',
          suggestions: [],
        },
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
            },
            toggleAnswerPanel: actions.toggleAnswerPanel,
            maximized: state.widgets.maximizedWidget,
            maximize: actions.widgets.maximizeWidget,
          }),
      }),
      Route({
        path: '/ask',
        render: () =>
          Ask(
            state.widgets.maximizedWidget,
            actions.widgets.maximizeWidget,
            state,
            actions
          ),
      }),
    ],
  )
}


function parseQuestionIdFromPath(path) {
  const parts = path.split('/')
  return Number(parts[parts.length - 1])
}

function createSuggestions(allTags, currentWord) {
  if (currentWord.length === 0) return []

  return allTags
    .filter(t => t.toLowerCase().includes(currentWord.toLowerCase()))
    .slice(0, 5)
}
