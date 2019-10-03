'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
exports.queries = [
    {
        name: 'get-clients',
        path: './account/client/get-clients.sql'
    },
    {
        name: 'get-client',
        path: './account/client/get-client.sql',
        firstRow: true
    },
    {
        name: 'get-client-by-slug',
        path: './account/client/get-client-by-slug.sql',
        firstRow: true
    },
    {
        name: 'create-client',
        path: './account/client/create-client.sql',
        firstRow: true
    },
    {
        name: 'update-client',
        path: './account/client/update-client.sql',
        firstRow: true
    },
    {
        name: 'get-types',
        path: './account/type/get-types.sql'
    },
    {
        name: 'get-type',
        path: './account/type/get-type.sql',
        firstRow: true
    },
    {
        name: 'create-type',
        path: './account/type/create-type.sql',
        firstRow: true
    },
    {
        name: 'update-type',
        path: './account/type/update-type.sql',
        firstRow: true
    },
    {
        name: 'get-client-types',
        path: './account/type/get-client-types.sql'
    },
    {
        name: 'add-client-type',
        path: './account/type/add-client-type.sql',
        firstRow: true
    },
    {
        name: 'remove-client-type',
        path: './account/type/remove-client-type.sql',
        firstRow: true
    },
    {
        name: 'drop-client-types',
        path: './account/type/drop-all-client-types.sql'
    },
    {
        name: 'get-users',
        path: './account/user/get-users.sql'
    },
    {
        name: 'get-user',
        path: './account/user/get-user.sql',
        firstRow: true
    },
    {
        name: 'get-user-by-username',
        path: './account/user/get-user-by-username.sql',
        firstRow: true
    },
    {
        name: 'create-user',
        path: './account/user/create-user.sql',
        firstRow: true
    },
    {
        name: 'update-user',
        path: './account/user/update-user.sql',
        firstRow: true
    },
    {
        name: 'update-user-password',
        path: './account/user/update-password.sql',
        firstRow: true
    },
    {
        name: 'get-roles',
        path: './account/role/get-roles.sql'
    },
    {
        name: 'get-role',
        path: './account/role/get-role.sql',
        firstRow: true
    },
    {
        name: 'create-role',
        path: './account/role/create-role.sql',
        firstRow: true
    },
    {
        name: 'update-role',
        path: './account/role/update-role.sql',
        firstRow: true
    },
    {
        name: 'get-user-roles',
        path: './account/role/get-user-roles.sql'
    },
    {
        name: 'add-user-role',
        path: './account/role/add-user-role.sql',
        firstRow: true
    },
    {
        name: 'remove-user-role',
        path: './account/role/remove-user-role.sql',
        firstRow: true
    },
    {
        name: 'drop-user-roles',
        path: './account/role/drop-all-user-roles.sql'
    },
    {
        name: 'get-events',
        path: './event/event/get-events.sql'
    },
    {
        name: 'get-client-events',
        path: './event/event/get-client-events.sql'
    },
    {
        name: 'get-event',
        path: './event/event/get-event.sql',
        firstRow: true
    },
    {
        name: 'create-event',
        path: './event/event/create-event.sql',
        firstRow: true
    },
    {
        name: 'update-event',
        path: './event/event/update-event.sql',
        firstRow: true
    },
    {
        name: 'get-event-settings',
        path: './setting/event/get-event-settings.sql',
        firstRow: true
    },
    {
        name: 'create-event-settings',
        path: './setting/event/create-event-settings.sql',
        firstRow: true
    },
    {
        name: 'update-event-settings',
        path: './setting/event/update-event-settings.sql',
        firstRow: true
    },
    {
        name: 'get-questions',
        path: './event/question/get-questions.sql'
    },
    {
        name: 'get-question',
        path: './event/question/get-question.sql',
        firstRow: true
    },
    {
        name: 'get-event-questions',
        path: './event/question/get-event-questions.sql'
    },
    {
        name: 'create-question',
        path: './event/question/create-question.sql',
        firstRow: true
    },
    {
        name: 'update-question',
        path: './event/question/update-question.sql',
        firstRow: true
    },
    {
        name: 'get-question-vote-by-user',
        path: './event/vote/get-question-vote-by-user.sql',
        firstRow: true
    },
    {
        name: 'create-question-vote',
        path: './event/vote/create-question-vote.sql',
        firstRow: true
    },
    {
        name: 'get-question-score',
        path: './event/vote/get-question-score.sql',
        firstRow: true
    },
    {
        name: 'delete-vote',
        path: './event/vote/delete-vote.sql',
        firstRow: true
    },
    {
        name: 'get-event-messages',
        path: './event/chat/get-event-messages.sql'
    },
    {
        name: 'create-event-message',
        path: './event/chat/create-event-message.sql',
        firstRow: true
    },
    {
        name: 'update-event-message',
        path: './event/chat/update-event-message.sql',
        firstRow: true
    },
    {
        name: 'delete-event-message',
        path: './event/chat/delete-event-message.sql'
    }
].map(function (q) {
    try {
        q.sql = fs.readFileSync(path.resolve(__dirname, q.path), 'utf8');
    }
    catch (e) {
        console.error("Error loading query file \"" + q.name + "\"");
        console.error(e);
    }
    return q;
});
//# sourceMappingURL=index.js.map