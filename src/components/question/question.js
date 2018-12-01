import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './question.scss'

export default function view({id, data}) {
  return html.div(
    {
      class: styles.questionPage,
    },
    [
      'Question',
      id,
      html.div(JSON.stringify(data.questions[id])),
    ],
  )
}
