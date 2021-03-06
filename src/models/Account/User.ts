'use strict';

import { IDbUser }  from '../../db/interfaces';
import { IUser }    from '../../interfaces';
import { RoleType } from '../../constants';

export class User{
    id?:              number;
    clientId?:        number|null;
    firstName:        string;
    lastName:         string;
    email:            string;
    username:         string;
    password:         string;
    lastLogin:        Date|null;
    isAnonymous?:     boolean;
    isDisabled?:      boolean;
    disabledComment?: string|null;

    roles:            string[];

    static fromDb(u: IDbUser): User{
        return new User({
            id:               u.id,
            clientId:         u.client_id,
            firstName:        u.first_name,
            lastName:         u.last_name,
            email:            u.email,
            username:         u.username,
            password:         u.password,
            lastLogin:        u.last_login ? new Date(u.last_login) : null,
            isAnonymous:      u.is_anonymous,
            isDisabled:       u.is_disabled,
            disabledComment:  u.disabled_comment,

            roles: u.roles || []
        });
    }

    constructor(user: IUser){
        this.id              = user.id;
        this.clientId        = user.clientId;
        this.firstName       = user.firstName;
        this.lastName        = user.lastName;
        this.email           = user.email;
        this.username        = user.username;
        this.password        = user.password;
        this.lastLogin       = user.lastLogin;
        this.isAnonymous     = user.isAnonymous;
        this.isDisabled      = user.isDisabled;
        this.disabledComment = user.disabledComment;

        this.roles = user.roles || [];
    }

    isAdmin(): boolean{
        return this.roles.includes(RoleType.ADMIN);
    }

    isSubAdmin(): boolean{
        return this.roles.includes(RoleType.SUB_ADMIN);
    }

    isModerator(): boolean{
        return this.roles.includes(RoleType.MODERATOR);
    }
}