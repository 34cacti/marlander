import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './ask.scss'
import Editor from '../editor/editor'

export default function view(maximized, maximize) {
  return html.div(
    {class: styles.ask},
    [
    html.button('Post'),
    html.input(),
    Editor(maximized, maximize),
    html.input(),
  ])
}
