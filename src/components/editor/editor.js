import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './editor.scss'

export default function view() {
  return html.div(
    {
      class: styles.editor,
    },
    [
      Toolbar(),
      html.textarea(),
    ],
  )
}

function Toolbar() {
  return html.div(
    {
      class: styles.toolbar,
    },
    [
      toolbarButton('B'),
      toolbarButton('I'),
      toolbarButton('U'),
      toolbarButton('“...„'),
      toolbarButton('</a>'),
      toolbarButton('│☰'),
      toolbarButton('☰'),
      toolbarButton('☰│'),
      toolbarButton('⤢'),
    ]
  )
}

function toolbarButton(icon, className = '') {
  return html.div(
    {
      class: classNames(styles.toolbarButton, className),
    },
    [
      icon,
    ],
  )
}
