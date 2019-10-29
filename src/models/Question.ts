'use strict';

import { IQuestionScore } from "../interfaces";

export class Question{
    id?:      number;
    eventId:  number;
    userId:   number;
    text:     string;
    hidden:   boolean;
    stats?:   IQuestionScore;

    constructor(q: any){
        this.id      = q.id;
        this.eventId = q.eventId;
        this.userId  = q.userId;
        this.text    = q.text;
        this.hidden  = q.hidden;
        this.stats   = q.stats;
    }

    static from(q: any){
        return new Question({
            id:      q.id,
            eventId: q.event_id,
            userId:  q.user_id,
            text:    q.text,
            hidden:  q.hidden,
            stats:   q.stats || {}
        });
    }
}