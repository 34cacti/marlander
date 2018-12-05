import * as html from '@hyperapp/html'
import classNames from 'classnames'

import styles from './question.scss'
import AnswerPanel from '../answer-panel/answer-panel'
import MaximizeButton from '../maximize-button/maximize-button'
import {searchString} from '../../utils/search-string'

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
    {class: styles.questionPage},
    [
      html.div(
        {class: styles.sidePanel},
        [
          html.div({class: styles.relatedQuestionsLabel}, 'Related Questions'),
          RelatedQuestions(q.title, data.questions),
          Categories(data.tags),
        ]
      ),
      html.div(
        {class: styles.mainContent},
        [
          Question(q, data, toggleAnswerPanel, maximized, maximize),
          Answers(q, data, maximized, maximize),
          answerPanelDataAndActions.data.open
            ? AnswerPanel(answerPanelDataAndActions, toggleAnswerPanel, maximized, maximize)
            : null,
        ],
      ),
    ],
  )
}

function RelatedQuestions(title, questions) {
  let filtered = questions.filter(q =>
    searchString(q.title, title.split(' ')))

  if (filtered.length > 5) {
    filtered = filtered.slice(0, 5)
    filtered.push({title: 'more...'})
  }

  return html.div(
    {class: styles.related},
    filtered.map(q => html.div(q.title)),
  )
}

function Categories(categories) {
  return html.div(
    {class: styles.categories},
    [...categories.slice(0, 15), 'more...'].map(c => html.div(c))
  )
}

function Question(question, data, toggleAnswerPanel, maximized, maximize) {
  return html.div(
    {
      class: styles.question,
    },
    [
      QuestionFirstRow(question, data, maximized, maximize),
      QuestionAnswerContainer(toggleAnswerPanel),
      Comments(question, data),
    ]
  )

}

function QuestionAnswerContainer(toggleAnswerPanel) {
  return html.div(
    {class: styles.questionAnswerContainer},
    html.button(
      {
        class: styles.answerButton,
        onclick: () => toggleAnswerPanel(),
      },
      'Answer'
    ),
  )
}

function QuestionFirstRow(question, data, maximized, maximize) {
  return html.div(
    {class: styles.questionFirstRow},
    [
      html.div(
        {class: styles.questionCardFirstCol},
        [
          html.div(
            //{class: styles.questionScore},
            [
              html.div({class: styles.upvote}, '▲'),
              html.div({class: styles.downvote}, '▼'),
              html.div({ class: styles.questionScore }, question.score),
            ]
          ),
          html.div(
            {class: styles.questionPoster},
            [
              html.div(data.users[question.user].name),
              html.div({class: styles.score}, [data.users[question.user].score, '\u2605']),
            ]
          ),
        ]
      ),
      html.div(
        {class: styles.questionCardSecondCol},
        [
          html.div([
            html.div({class: styles.questionTitle}, question.title),
            ExpandableContent(question.body, maximized, maximize)
          ]),
          html.div(
            {class: styles.tags},
            question.tags.map(t =>
              html.span({ class: styles.tag }, data.tags[t])
            )
          ),
        ]
      ),
    ],
  )
}

function Comments(question, data) {
  const commentIds = question.comments

  return html.div(
    {
      class: styles.comments,
    },
    [
      html.div({class: styles.commentsLabel}, 'Comments'),
      commentIds.map(c => {
        const comment = data.comments[c]
        const commentUser = data.users[comment.user]
        return html.div(
          {
            class: styles.comment,
          },
          [
            html.div({class: styles.commentBody}, comment.body),
            html.div({class: styles.user}, commentUser.name),
          ]
        )
      }),
      html.div(
        {class: classNames(styles.comment, styles.addComment)},
        'Add comment',
      ),
    ]
  )
}

function NoAnswers() {
  return html.div('No answers yet')
}

function Answers(question, data, maximized, maximize) {
  const answerIds = question.answers
  if (answerIds.length === 0) return NoAnswers()

  return html.div(
    {
      class: styles.answers,
    },
    [
      html.div('Answers'),
      answerIds.map(a => Answer(data.answers[a], data, maximized, maximize)),
    ]
  )
}

function Answer(answer, data, maximized, maximize) {
  return html.div(
    {
      class: styles.answer,
    },
    [
      AnswerFirstRow(answer, data, maximized, maximize),
      html.div({class: styles.answerComments}, Comments(answer, data)),
    ]
  )

}

function AnswerFirstRow(answer, data, maximized, maximize) {
  return html.div(
    {class: styles.questionFirstRow},
    [
      html.div(
        {class: styles.questionCardFirstCol},
        [
          html.div(
            //{class: styles.score},
            [
              html.div({class: styles.upvote}, '▲'),
              html.div({class: styles.downvote}, '▼'),
              html.div({ class: styles.answerScore }, answer.score),
            ]
          ),
          html.div(
            {class: styles.answerPoster},
            [
              html.div(data.users[answer.user].name),
              html.div({class: styles.score}, [data.users[answer.user].score, '\u2605']),
            ]
          ),
        ]
      ),
      html.div(
        {class: styles.answerCardSecondCol},
        [
          ExpandableContent(answer.body, maximized, maximize, answer),
        ]
      ),
    ],
  )
}

function ExpandableContent(content, maximized, maximize, expandId) {
  return html.div(
    {
      class: classNames(
        styles.expandableContent, {[styles.fullscreen]: maximized === expandId}),
    },
    [
      html.div({class: styles.maximizeButton}, MaximizeButton(() => maximize(expandId))),
      html.div({class: styles.content}, content),
    ],
  )
}
