import * as html from '@hyperapp/html'

import styles from './tag-autocomplete.scss'

export default function view({
  currentTags,
  currentWord,
  updateCurrentWord,
  suggestions,
  selectSuggestion,
  removeTag,
}) {
  return html.div(
    {},
    [
      AutoCompleteInput(currentWord, updateCurrentWord, suggestions, selectSuggestion),
      CurrentTags(currentTags, removeTag),
    ]
  )
}

function AutoCompleteInput(
  currentWord, updateCurrentWorld, suggestions, selectSuggestion
) {
  return html.div(
    {},
    [
      html.input({
        value: currentWord,
        oninput: ev => updateCurrentWorld(ev.target.value),
      }),
      // suggestions.map(s =>
      //   html.div({onclick: () => selectSuggestion(s.id)})
      // ),
    ]
  )
}

function CurrentTags(current, remove) {
  return html.div(
    {},
    [
      current.map((c, i) => CompletedTag(c, () => remove(i))),
    ]
  )
}

function CompletedTag(tag, remove) {
  return html.div(
    {},
    [
      html.div(tag),
      html.div({onclick: () => remove()}, 'x'),
    ]
  )
}
