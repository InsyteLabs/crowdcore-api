'use strict';

import { IQuestionScore } from "../interfaces";

export class Question{
    id?:      number;
    eventId:  number;
    text:     string;
    hidden:   boolean;
    stats?:   IQuestionScore;

    userId:   number;
    user: {
        id:          number,
        firstName:   string;
        lastName:    string;
        username:    string;
        isAnonymous: boolean;
    }

    constructor(q: any){
        this.id      = q.id;
        this.eventId = q.eventId;
        this.userId  = q.userId;
        this.user    = q.user || {};
        this.text    = q.text;
        this.hidden  = q.hidden;
        this.stats   = q.stats;
    }

    static from(q: any){
        return new Question({
            id:      q.id,
            eventId: q.event_id,
            text:    q.text,
            hidden:  q.hidden,
            stats:   q.stats || {},

            userId:  q.user_id,
            user: {
                id:            q.user_id,
                firstName:     q.user_first_name,
                lastName:      q.user_last_name,
                username:      q.user_username,
                isAnonymous: !!q.user_is_anonymous
            }
        });
    }
}