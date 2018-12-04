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
          html.div({class: styles.score}, ['score:', user.score]),
        ]
      ),
      html.div(
        {class: styles.ask},
        [ html.a({href: '/ask'}, 'Ask')]
      ),
      html.div(
        {class: styles.logout},
        [ html.a({href: '/'}, 'Log out')]
      ),
    ]
  )
}
