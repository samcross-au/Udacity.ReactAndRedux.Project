import { createContext } from "react";

const initialUserState = {
  user: {
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
};

const AuthContext = createContext({
  authState: initialUserState,
  setAuthState: () => initialUserState,
  isUserAuthenticated: () => false,
});

export { AuthContext };