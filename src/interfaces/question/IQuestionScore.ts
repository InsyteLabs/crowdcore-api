'use strict';

export interface IQuestionScore{
    upvotes?:       number,
    downvotes?:     number,
    votes?:         number,
    score?:         number,
    userVote?:      number
    voteRequester?: number;
}