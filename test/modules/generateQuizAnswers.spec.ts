import { assert } from "chai";

import { generateQuizAnswers } from "../../src/modules/generateQuizAnswers";

suite("generateQuizAnswers module", () => {
  test("It generates answers correctly", () => {
    const question = {
      Question: "What forum tool does freeCodeCamp use for its forum?",
      Answer: "Discourse",
      Distractor1: "NodeBB",
      Distractor2: "phpBB",
      Distractor3: "vBulletin",
      Explanation:
        "The freeCodeCamp community was an early adopter of Discourse, a powerful forum tool designed by Stack Overflow founder Jeff Atwood. Quincy Larson first met Jeff at an event in San Francisco in 2014, and the two talked about online communities. Jeff convinced Quincy to create a forum so that learners could easily help one another. One benefit of a forum is that other people can then discover past conversations, and use them to help get unstuck. If you ask a question on the freeCodeCamp forum, you will generally get an answer in just a few hours.",
      Link: "https://www.freecodecamp.org/news/the-future-of-the-freecodecamp-forum/",
    };

    const answers = generateQuizAnswers(question);
    assert.lengthOf(answers, 4);
    const a = answers.find((answer) => answer.name === "A");
    const b = answers.find((answer) => answer.name === "B");
    const c = answers.find((answer) => answer.name === "C");
    const d = answers.find((answer) => answer.name === "D");
    assert.exists(a);
    assert.exists(b);
    assert.exists(c);
    assert.exists(d);
    const aIndex = answers.findIndex((answer) => answer.name === "A");
    const bIndex = answers.findIndex((answer) => answer.name === "B");
    const cIndex = answers.findIndex((answer) => answer.name === "C");
    const dIndex = answers.findIndex((answer) => answer.name === "D");
    assert.equal(aIndex, 0);
    assert.equal(bIndex, 1);
    assert.equal(cIndex, 2);
    assert.equal(dIndex, 3);
    const answer = answers.find((answer) => answer.value === question.Answer);
    assert.exists(answer);
    const dis1 = answers.find(
      (answer) => answer.value === question.Distractor1
    );
    assert.exists(dis1);
    const dis2 = answers.find(
      (answer) => answer.value === question.Distractor2
    );
    assert.exists(dis2);
    const dis3 = answers.find(
      (answer) => answer.value === question.Distractor3
    );
    assert.exists(dis3);
  });
});
