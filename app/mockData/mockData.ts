import { GameInfo, QuestionWithAnswers } from "myTypes"

export const mockQuestionWithAnswers1: QuestionWithAnswers = {
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
  endTimeMillis: 1630760178958,
}

export const mockQuestionWithAnswers2: QuestionWithAnswers = {
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
      creatorId: "ckslrviil000230toi7jsfdhf",
    },
  ],
  endTimeMillis: 1630760178958,
}

export const mockQuestionWithMultipleCorrectAnswers: QuestionWithAnswers = {
  question: {
    id: "ckslrwb2i007530to8jp5j930",
    createdAt: new Date("2021-08-21T12:43:53.994Z"),
    updatedAt: new Date("2021-08-21T18:32:10.799Z"),
    text: "q1",
    gameIds: ["ckslsamwm449330tok9aobaa5"],
    correctAnswerIds: ["ckslrvwpz004230toyi47div5", "cksm491gw533830touv9wbvpr"],
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
      creatorId: "ckslrviil000230toi7jsfdhf",
    },
  ],
  endTimeMillis: 1630760178958,
}

export const mockCorrectAnswerIds: string[] = ["ckslrvwpz004230toyi47div5"]
export const mockIncorrectAnswerIds: string[] = ["cksm4bu8w549630tol8zyj56p"]
export const mockCorrectAndIncorrectAnswerIds: string[] = [
  "cksm4bu8w549630tol8zyj56p",
  "ckslrvwpz004230toyi47div5",
]
export const mockMultipleCorrectAnswerIds: string[] = [
  "ckslrvwpz004230toyi47div5",
  "cksm491gw533830touv9wbvpr",
]

export const mockInitialGamesInfo: Record<string, GameInfo> = {
  "mobile-maroon-limpet-911": {
    gameInstanceId: "mobile-maroon-limpet-911",
    startedById: "ckslrviil000230toi7jsfdhf",
    gameId: "ckslsamwm449330tok9aobaa5",
    joinUrl: "http://localhost:3000/play-game/mobile-maroon-limpet-911",
    startTimeMillis: 1630764149704,
    questionsWithAnswers: [],
    scoreMultiplier: 1,
    gamePlayers: {
      "82IwGnEWFMz9HdovAAAH": {
        playerName: "ch1",
        playerId: "82IwGnEWFMz9HdovAAAH",
        playerColor: "rgb(186, 252, 177)",
        roundResults: [],
      },
    },
  },
}
export const mockGamesInfo: Record<string, GameInfo> = {
  "mobile-maroon-limpet-911": {
    startedAt: 0,
    isGameComplete: false,
    isRoundComplete: false,
    currentRound: 0,
    gameInstanceId: "mobile-maroon-limpet-911",
    startedById: "ckslrviil000230toi7jsfdhf",
    gameId: "ckslsamwm449330tok9aobaa5",
    joinUrl: "http://localhost:3000/play-game/mobile-maroon-limpet-911",
    startTimeMillis: 1630764149704,
    questionsWithAnswers: [
      {
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
            creatorId: "ckslrviil000230toi7jsfdhf",
          },
        ],
        endTimeMillis: 1630764154724,
      },
    ],
    scoreMultiplier: 1,
    gamePlayers: {
      "82IwGnEWFMz9HdovAAAH": {
        playerName: "ch1",
        playerId: "82IwGnEWFMz9HdovAAAH",
        playerColor: "rgb(186, 252, 177)",
        roundResults: [{ score: 1, cumulativeScore: 1 }],
      },
    },
  },
}
