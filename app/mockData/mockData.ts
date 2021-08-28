import { QuestionWithAnswers } from "myTypes"

export const mockQuestionWithAnswers: QuestionWithAnswers = {
  question: {
    id: "ckslrwb2i007530to8jp5j930",
    createdAt: new Date("2021-08-21T12:43:53.994Z"),
    updatedAt: new Date("2021-08-21T18:32:10.799Z"),
    text: "q1",
    gameIds: ["ckslsamwm449330tok9aobaa5"],
    correctAnswerIds: ["ckslrvwpz004230toyi47div5"],
    answerIds: [
      "ckslrvwpz004230toyi47div5",
      "ckslrvwpz004230toyi47div5",
      "ckslrvwpz004230toyi47div5",
      "cksm491gw533830touv9wbvpr",
      "cksm4bu8w549630tol8zyj56p",
    ],
    creatorId: "ckslrviil000230toi7jsfdhf",
  },
  answers: [
    {
      id: "ckslrvwpz004230toyi47div5",
      createdAt: new Date("2021-08-21T12:43:35.399Z"),
      updatedAt: new Date("2021-08-21T18:44:48.120Z"),
      text: "a1",
      questionIds: [
        "ckslrwb2i007530to8jp5j930",
        "cksm4oihx586630toxzadj0lg",
        "cksm4oxc9597130toh3eh9pwz",
      ],
      wrongQuestionIds: ["ckslrwb2i007530to8jp5j930"],
      creatorId: "ckslrviil000230toi7jsfdhf",
    },
    {
      id: "cksm4bu8w549630tol8zyj56p",
      createdAt: new Date("2021-08-21T18:31:54.080Z"),
      updatedAt: new Date("2021-08-21T18:44:51.676Z"),
      text: "a2",
      questionIds: [
        "ckslrwb2i007530to8jp5j930",
        "cksm4oihx586630toxzadj0lg",
        "cksm4oxc9597130toh3eh9pwz",
      ],
      wrongQuestionIds: [],
      creatorId: "ckslrviil000230toi7jsfdhf",
    },
  ],
}
