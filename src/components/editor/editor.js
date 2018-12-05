import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './editor.scss'
import MaximizeButton from '../maximize-button/maximize-button'

export default function view(maximized, maximize, actionButton = false) {
  return html.div(
    {
      id: 'ask-editor',
      class: classNames(styles.editor, {[styles.fullscreen]: maximized === 'ask-editor'}),
    },
    [
      Toolbar(actionButton),
      html.div({class: styles.maximizeButton}, MaximizeButton(maximize)),
      html.textarea(),
    ],
  )
}

function Toolbar(actionButton) {
  return html.div(
    {
      class: styles.toolbar,
    },
    [
      html.div(
        {class: styles.toolbarRight},
        [
          toolbarButton('B'),
          toolbarButton('I'),
          toolbarButton('U'),
          toolbarButton('“...„'),
          toolbarButton('</a>'),
          toolbarButton('│☰'),
          toolbarButton('☰'),
          toolbarButton('☰│'),
        ]
      ),
      toolbarButton('Post', styles.postButton),
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
