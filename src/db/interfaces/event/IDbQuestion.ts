'use strict';

export interface IDbQuestion{
    id:       number;
    event_id: number;
    
    text:   string;
    hidden: boolean;

    stats?: any;

    user_id:           number;
    user_first_name:   string;
    user_last_name:    string;
    user_username:     string;
    user_is_anonymous: string;

    user_vote:      number;
    vote_requester: number;
    upvotes:        number;
    downvotes:      number;
    votes:          number;
    score:          number;

    moderator_response:     string;
    moderator_id:           number;
    moderator_first_name:   string;
    moderator_last_name:    string;
    moderator_username:     string;
    moderator_is_anonymous: boolean;
}