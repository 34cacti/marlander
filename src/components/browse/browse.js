import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './browse.scss'

export default function view({data}) {
  return html.div(
    {
      class: styles.browse,
    },
    [
      Categories(data.tags),
      Questions(data.questions),
    ],
  )
}

function Categories(categories) {
  return html.div(
    {class: styles.categories},
    categories.map(c => html.div(c))
  )
}

function Questions(questions) {
  return html.div(
    {class: styles.questions},
    questions.map((q, i) => QuestionCard(i, q)),
  )
}

function QuestionCard(id, question) {
  return html.div(
    {
      class: styles.questionCard,
    },
    [
      html.a({href: `/question/${id}`}, question.title),
      html.p(question.body),
      html.div(question.tags.map(t => html.span(t))),
    ]
  )
}
