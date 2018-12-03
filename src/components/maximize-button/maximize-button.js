import * as html from '@hyperapp/html'

import styles from './maximize-button.scss'

export default function view(maximize) {
  return html.div(
    {
      class: styles.maximizeButton,
      onclick: () => {
        maximize('ask-editor')
      },
    },
    '⤢'
  )
}
