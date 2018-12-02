import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './header.scss'

export default function view({user}) {
  return html.div(
    {
      class: styles.header,
    },
    [
      html.div({class: styles.brand},
      html.a({href: '/'}, 'First Come First Serve')),
      Controls(user),
    ],
  )
}

function Controls(user) {
  return html.div(
    {class: styles.controls},
    [
      html.input({class: styles.search, placeholder: 'search'}),
      html.div(
        {class: styles.user},
        [
          html.div(user.name),
          html.div({class: styles.score}, user.score),
        ]
      ),
      html.div([
        html.a({href: '/ask'}, 'Ask'),
      ]),
      html.div([
        html.a({href: '/'}, 'log out'),
      ]),
    ]
  )
}
