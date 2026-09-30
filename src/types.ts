export type resultType = {
    userId: string,
    score: number,
    verbalScore?: number,
    verbalUpdatedAt?: number,
    numericalScore?: number,
    numericalUpdatedAt?: number,
    abstractScore?: number,
    abstractUpdatedAt?: number,
    generalKnowledge?: number,
    generalUpdatedAt?: number,
    hdi?: number,
    hdiUpdatedAt?: number,
    country?: string,
    region?: string
};