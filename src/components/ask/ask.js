import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './ask.scss'
import Editor from '../editor/editor'
import TagAutocomplete from '../tag-autocomplete/tag-autocomplete'

export default function view(maximized, maximize, state, actions) {
  return html.div(
    {class: styles.askPage},
    [
      Form(maximized, maximize, state, actions),
      SidePanel(state, state.askTitle),
    ]
  )
}

function Form(maximized, maximize, state, actions) {
  return html.div(
    {class: styles.ask},
    [
      html.button('Post'),
      html.input({oninput: ev => actions.askTitle(ev.target.value)}),
      Editor(maximized, maximize),
      TagAutocomplete({
        currentTags: state.widgets.autocomplete.currentTags,
        currentWord: state.widgets.autocomplete.currentWord,
        updateCurrentWord: actions.widgets.autocomplete.updateCurrentWord,
        selectSuggestion: actions.widgets.autocomplete.selectSuggestion,
      }),
    ]
  )
}

function SidePanel(state, currentQuestionTitle) {
  const filtered = state.data.questions.filter(q =>
    searchString(q.title, currentQuestionTitle.split(' ')))

  filtered.length > 7 ? filtered.push('more...') : null
  return html.div(
    {class: styles.sidePanel},
    filtered.map(q => html.div(q.title)),
  )
}

function searchString(str, tokens) {
  if (tokens.length === 0 || tokens[0] === '') return false

  const strLower = str.toLowerCase()
  for (const token of tokens)
    if (strLower.includes(token.toLowerCase())) return true
  return false
}
