export type resultType = {
    userId: string,
    score?: number,
    verbalScore?: number,
    verbalUpdatedAt?: number,
    numericalScore?: number,
    numericalUpdatedAt?: number,
    abstractScore?: number,
    abstractUpdatedAt?: number,
    generalKnowledge?: number,
    generalUpdatedAt?: number,
    hdi?: number,
    country?: string,
    region?: string
};

export type questionAndAnswerType = {
    question: string,
    answer: string,
    correct: boolean,
    difficulty: number
};

export type dataMineType = {
    userId: string,
    verbalAnswers?: questionAndAnswerType[],
    numericalAnswers?: questionAndAnswerType[],
    abstractAnswers?: questionAndAnswerType[],
    generalAnswers?: questionAndAnswerType[]
};