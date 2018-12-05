import * as html from '@hyperapp/html'

import styles from './ask.scss'
import Editor from '../editor/editor'
import TagAutocomplete from '../tag-autocomplete/tag-autocomplete'
import {searchString} from '../../utils/search-string'

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
      html.div(
        {class: styles.firstRow},
        [
          html.input({class: styles.titleBar, placeholder: 'Title of Post',
            oninput: ev => actions.askTitle(ev.target.value)
          }),
          html.button({class: styles.postButton,
            onclick: () => {window.location.href = '/'
          }}, 'Post'),
        ]
      ),
      Editor(maximized, maximize),
      TagAutocomplete({
        currentTags: state.widgets.autocomplete.currentTags,
        currentWord: state.widgets.autocomplete.currentWord,
        updateCurrentWord: actions.widgets.autocomplete.updateCurrentWord,
        suggestions: state.widgets.autocomplete.suggestions,
        selectSuggestion: actions.widgets.autocomplete.selectSuggestion,
        allTags: state.data.tags,
        removeTag: actions.widgets.autocomplete.removeTag,
      }),
    ]
  )
}

function SidePanel(state, currentQuestionTitle) {
  let filtered = state.data.questions.filter(q =>
    searchString(q.title, currentQuestionTitle.split(' ')))

  if (filtered.length > 5) {
    filtered = filtered.slice(0, 5)
    filtered.push({title: 'more...'})
  }

  return html.div(
    {
      class: styles.sidePanel,
      style: {opacity: filtered.length === 0 ? '0' : '1'},
    },
    filtered.map(q => html.div(q.title)),
  )
}
