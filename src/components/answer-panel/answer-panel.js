import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './answer-panel.scss'
import Editor from '../editor/editor'

export default function view({data, actions}, toggleAnswerPanel) {
  return html.div(
    {
      class: styles.answerPanel,
      style: {height: `${data.height}px`},
    },
    [
      html.div({
        class: styles.resizeHandle,
        oncreate: () => {
          window.addEventListener('mousemove', actions.onResize)
          window.addEventListener('mouseup', actions.onResizeEnd)
        },
        ondestroy: () => {
          window.removeEventListener('mousemove', actions.onResize)
          window.removeEventListener('mouseup', actions.onResize)
        },
        onmousedown: ev => actions.onResizeStart(ev),
      }),
      html.button({onclick: () => toggleAnswerPanel()}, 'x'),
      Editor(),
    ],
  )
}
