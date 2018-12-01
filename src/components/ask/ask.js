import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './ask.scss'

export default function view() {
  return html.div(
    {
      class: styles.questionPage,
    },
    [
      'Ask',
    ],
  )
}