const { generateQuestion, checkAnswer } = require('./app');

test('Question is generated properly', () => {
    const question = generateQuestion();
    expect(question.text).toMatch(/What is \d+ \+ \d+\?/);
    expect(question.options).toHaveLength(4);
});

test('Correct answer is detected', () => {
    const question = generateQuestion();
    expect(checkAnswer(question.answer, question.answer)).toBe(true);
});

test('Incorrect answer is detected', () => {
    const question = generateQuestion();
    expect(checkAnswer(question.answer, question.answer + 1)).toBe(false);
});
