'use strict';

export class Client{
    [key: string]:    any;

    id?:              number;
    name:             string;
    slug?:            string;
    ownerId:          number;
    isDisabled?:      boolean;
    disabledComment?: string|null;

    constructor(c: any) {
        this.id              = c.id;
        this.name            = c.name;
        this.slug            = c.slug;
        this.ownerId         = c.owner_id;
        this.isDisabled      = c.is_disabled;
        this.disabledComment = c.disabled_comment;
    }
}