
import { render } from '@testing-library/react';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('Save Question', () => {
  it('will deploy a new question to the store', async () => {
    const question = {
      optionOneText: 'Test Option 1',
      optionTwoText: 'Test Option 2',
      author: 'sarahedo',
    };

    await _saveQuestion(question).then(data => {
      expect(data.author).toBe(question.author);
      
      expect(data.optionOne.text).toBe(question.optionOneText);
      expect(data.optionOne.votes.length).toBe(0);

      expect(data.optionTwo.text).toBe(question.optionTwoText);
      expect(data.optionTwo.votes.length).toBe(0);
    });
  })

  it('will return an error if called incorrectly', async () => {
    const question = {
      optionTwoText: 'Test Option 2',
      author: 'samcross',
    };

    expect(_saveQuestion(question)).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
  })
})

describe('Save Question Answer', () => {
  it('will add the user\'s vote to the state', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    expect(_saveQuestionAnswer(answer)).resolves.toBe(true);
  });

  it('will return an error if called incorrectly', async () => {
    const answer = {
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    expect(_saveQuestionAnswer(answer)).rejects.toBe('Please provide authedUser, qid, and answer');
  })
})