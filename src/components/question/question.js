import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './question.scss'
import AnswerPanel from '../answer-panel/answer-panel'

export default function view({
    id,
    data,
    answerPanelDataAndActions,
    toggleAnswerPanel,
    maximize,
    maximized,
}) {
  const q = data.questions[id]
  return html.div(
    {
      class: styles.questionPage,
    },
    [
      Question(q, data, toggleAnswerPanel, maximized, maximize),
      Answers(q, data, maximized, maximize),
      answerPanelDataAndActions.data.open
        ? AnswerPanel(answerPanelDataAndActions, toggleAnswerPanel, maximized, maximize)
        : null,
    ],
  )
}

function Question(question, data, toggleAnswerPanel, maximized, maximize) {
  return html.div(
    {
      class: styles.question,
    },
    [
      html.h2(question.title),
      html.p(
        {class: styles.contentBody},
        [
          question.body,
        ],
      ),
      html.div(data.users[question.user].name),
      html.h2({class: styles.score}, question.score),
      html.button({onclick: () => toggleAnswerPanel()}, 'Answer'),
      Comments(question, data),
    ]
  )
}

function Comments(question, data) {
  const commentIds = question.comments
  if (commentIds.length === 0) return

  return html.div(
    {
      class: styles.comments,
    },
    [
      html.h5('Comments'),
      commentIds.map(c => {
        const comment = data.comments[c]
        const commentUser = data.users[comment.user]
        return html.div(
          {
            class: styles.comment,
          },
          [
            html.div({class: styles.commentBody}, comment.body),
            html.div({class: styles.commentUser}, commentUser.name),
          ]
        )
      }),
    ]
  )
}

function Answers(question, data, maximized, maximize) {
  const answerIds = question.answers
  if (answerIds.length === 0) return

  return html.div(
    {
      class: styles.answers,
    },
    [
      html.h3('Answers'),
      answerIds.map(a => {
        const answer = data.answers[a]
        const answerUser = data.users[answer.user]
        return html.div(
          {
            class: classNames(styles.answer, {[styles.fullscreen]: maximized}),
          },
          [
            html.div(answer.body),
            html.div(answerUser.name),
            html.h3(answer.score),
          ]
        )
      }),
    ]
  )
}
