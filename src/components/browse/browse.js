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

function Sort() {
  return html.div(
    {
      class: styles.sort,
    },
    [
      html.div({class: styles.sortItem}, 'Featured'),
      html.div({class: styles.sortItem}, 'New'),
      html.div({class: styles.sortItem}, 'Top'),
      html.div({class: styles.sortItem}, 'Unanswered'),
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

function SidePanel(categories) {
  return html.div(
    {
      //class: styles.miscItems,
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
    categories.map(c => html.div(c))
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
      //class: styles.miscItems,
    },
    [
      html.div({class: styles.trademark}, '© 2018 FCFS, Inc.'),
      html.div({class: styles.miscItems} , 'Terms'),
      html.div({class: styles.miscItems}, 'Privacy'),
      html.div({class: styles.miscItems}, 'Security'),
      html.div({class: styles.lineBreak}, ''),
      html.div({class: styles.miscItems}, 'Contact'),
      html.div({class: styles.miscItems}, 'Careers'),
      html.div({class: styles.miscItems}, 'Advertise'),
    ]
  )
}