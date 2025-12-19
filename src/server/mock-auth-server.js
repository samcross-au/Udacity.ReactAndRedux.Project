const users = [
  {
    id: 'sarahedo',
    password:'password123',
    name: 'Sarah Edo',
    avatarURL: 'https://ui.dev/would-you-rather/sarah.jpg',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  {
    id: 'tylermcginnis',
    password:'abc321',
    name: 'Tyler McGinnis',
    avatarURL: 'https://ui.dev/would-you-rather/tyler.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  {
    id: 'mtsamis',
    password:'xyz123',
    name: 'Mike Tsamis',
    avatarURL: 'https://www.miketsamis.com/_next/image?url=%2Fstatic%2Fimages%2Favatar.png&w=256&q=75',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  {
    id: 'zoshikanlu',
    password:'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL: 'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
]

export const mockAuth = {
  login(id) {
    const user = users.find((u) => u.id === id);

    return user;
  },
  getUsers() {
    return users;
  },
  getUser(id) {
    const user = users.find((user) => user.id === id);
    return user;
  },
};