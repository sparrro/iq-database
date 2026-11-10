export const averagesPipeline = [
    {
        $group: {
            _id: null,
            verbalScore: { $avg: "$verbalScore" },
            numericalScore: { $avg: "$numericalScore" },
            abstractScore: { $avg: "$abstractScore" },
            generalKnowledge: { $avg: "$generalKnowledge" }
        }
    },
    {
        $project: {
            _id: 0,
            verbalScore: 1,
            numericalScore: 1,
            abstractScore: 1,
            generalKnowledge: 1
        }
    }
];