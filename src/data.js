export const users = [
  createUser('bob', 432),
  createUser('joe', 23789),
  createUser('0xffff', 45447),
]

export const questions = [
  createQuestion({
    user: 2,
    title: 'How do I Java',
    body: 'In Java, how do I impoort C codes.',
    tags: ['java', 'c'],
  }),
]

export const comments = [
  createComment({user: 1, body: 'First.'}),
  createComment({user: 1, body: 'This a great question.'}),
  createComment({user: 2, body: 'Anyone else reading this in 2018?'}),
]

export const answers = [
  createAnswer({user: 0, body: 'Idk. ask stackoverflow'}),
]

function createUser(name, score) {
  return {name, score}
}

function createQuestion({
  user,
  title,
  body,
  tags,
  score = 0,
  answers = [],
  comments = [],
}) {
  return {user, title, body, tags, score, answers, comments}
}

function createAnswer({user, body, score = 0, comments = []}) {
  return {user, body, score, comments}
}

function createComment({user, body}) {
  return {user, body}
}
