import * as html from '@hyperapp/html'

import styles from './browse.scss'

export default function view({data}) {
  return html.div(
    {
      class: styles.browse,
    },
    [
      SidePanel(data.tags),
      MainContent(data),
    ],
  )
}

function Questions(data) {
  return html.div(
    {class: styles.questions},
    data.questions.map((q, i) => QuestionCard(i, q, data)),
  )
}

function QuestionCard(id, question, data) {
  return html.div(
    {
      class: styles.questionCard,
    },
    [
      html.a({href: `/question/${id}`}, question.title),
      html.p(question.body),
      html.div(
        {class: styles.tags},
        question.tags.map(t =>
          html.span({class: styles.tag}, data.tags[t])
        )
      ),
    ]
  )
}

function MainContent(data) {
  return html.div(
    {
      class: styles.mainSection,
    },
    [
      Sort(),
      Questions(data),
    ]
  )
}

function Sort() {
  return html.div(
    {
      class: styles.sort,
    },
    [
      html.div({class: styles.sortButton}, 'New'),
      html.div({class: styles.sortButton}, 'Top'),
      html.div({class: styles.sortButton}, 'Unanswered'),
    ]
  )
}

function SidePanel(categories) {
  return html.div(
    {
      class: styles.sidePanel,
    },
    [
      Promo(),
      Categories(categories),
      MiscItems(),
    ]
  )
}

function Categories(categories) {
  return html.div(
    {class: styles.categories},
    [...categories, 'more...'].map(c => html.div(c))
  )
}

function Promo() {
  return html.div(
    {},
    [

    ]
  )
}

function MiscItems() {
  return html.div(
    {
      class: styles.miscItems,
    },
    [
      html.div('© 2018 FCFS, Inc.'),
      html.div([
        html.div({class: styles.miscItem}, 'Terms'),
        html.div({class: styles.miscItem}, 'Privacy'),
        html.div({class: styles.miscItem}, 'Security'),
      ]),
      html.div([
        html.div({class: styles.miscItem}, 'Contact'),
        html.div({class: styles.miscItem}, 'Careers'),
        html.div({class: styles.miscItem}, 'Advertise'),
      ]),
    ]
  )
}
