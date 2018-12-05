import * as html from '@hyperapp/html'

import styles from './tag-autocomplete.scss'

export default function view({
  currentTags,
  currentWord,
  updateCurrentWord,
  suggestions,
  selectSuggestion,
  removeTag,
  allTags,
}) {
  return html.div(
    {},
    [
      CurrentTags(currentTags, removeTag),
      AutoCompleteInput(
        currentWord, updateCurrentWord, suggestions, selectSuggestion, allTags),
    ]
  )
}

function AutoCompleteInput(
  currentWord, updateCurrentWord, suggestions, selectSuggestion, allTags
) {
  return html.div(
    {class: styles.autoCompleteInputContainer},
    [
      html.input({
        class: styles.tagBar, placeholder: 'Tags',
        value: currentWord,
        oninput: ev => {
          updateCurrentWord({word: ev.target.value, allTags})
        },
        onkeydown: ev => {
          if (ev.key !== 'Enter') return
          selectSuggestion(ev.target.value)
        },
      }),
      html.div(
        {class: styles.suggestions},
        suggestions.map(s =>
          html.div(
            {
              onclick: () => {
                selectSuggestion(s)
              },
            },
            s
          )
        ),
      ),
    ]
  )
}

function CurrentTags(current, remove) {
  return html.div(
    {class: styles.currentTags},
    [
      current.map(c => CompletedTag(c, remove)),
    ]
  )
}

function CompletedTag(tag, remove) {
  return html.div(
    {class: styles.completedTag},
    [
      html.div({class: styles.completedTagLabel}, tag),
      html.div({class: styles.completedTagRemove, onclick: () => remove(tag)}, 'x'),
    ]
  )
}
