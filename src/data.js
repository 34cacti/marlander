export const users = [
  createUser('bob', 432),
  createUser('joe', 23789),
  createUser('0xffff', 45447),
  createUser('Metallica1', 2489),
  createUser('Saul', 1619),
  createUser('hankjosephson', 34),
  createUser('nigelk', 8),
  createUser('xxkz', 32),
  createUser('l33tH4k3r', 17473),
  createUser('RoseSmith', 8328),
  createUser('MasterChief', 33),
  createUser('f150', 3470),
  createUser('seanpaul', 823),
  createUser('rogerdodger', 3827),
  createUser('abegjmrkn', 948),
  createUser('l1l1l111lll', 3),
  createUser('notadmin', 328),
]

export const questions = [
  createQuestion({
    user: 2,
    title: 'How do I Java',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'C++ Standard Library Broken',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'Why program broke?',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'Help! My code does not run',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'Insert line endings automatically before return',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'BigO for inserting values to the end of a linked list',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'Download Youtube video using CSIM',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'API calls failing after updating Windows',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'Disable CSS grid on Internet Explorer 9 and below',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
  }),
  createQuestion({
    user: 2,
    title: 'Killing zombies processes on ARM boards',
    body: 'In Java, how do I impoort C codes.',
    tags: [3, 9],
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

export const tags = [
  'C',
  'C++',
  'Java',
  'C#',
  'Python',
  'Go',
  'API',
  'Assembly',
  'jQuery',
  'YouTube',
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
