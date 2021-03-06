'use strict';

import { clientService, userService } from './services';
import { Client }                     from './models';
import { IUserPost, IClientPost }                  from './interfaces';
import { RoleType }                   from './constants';

(async () => {
    /*
        ============
        CREATE ROLES
        ============
    */
    const roles = await userService.getRoles();

    if(!roles.length){
        console.log('DB has no roles, creating...');



        const rolesToCreate = Object.values(RoleType).map(t => {
            return { name: t }
        });

        for(let i = 0, len = rolesToCreate.length; i < len; i++){
            const role = rolesToCreate[i];

            console.log(`Creating role ${ role.name }`);

            await userService.createRole(role);
        }

        console.log('Done creating roles');
        console.log(new Array(25).fill('-').join(''));
    }



    /*
        ============
        CREATE USERS
        ============
    */
    const users = await userService.getUsers();

    if(!users.length){
        console.log('DB has no users, creating...');

        const usersToCreate: IUserPost[] = [
            {
                clientId:  null,
                firstName: 'Bryce',
                lastName:  'Jech',
                email:     'bryce@brycejech.com',
                username:  'PyGuy',
                password:  'myFakePa$$wor^d',
                roles:     ['admin']
            },
            {
                clientId:  null,
                firstName: 'Laryn',
                lastName:  'Jech',
                email:     'laryn_burns@yahoo.com',
                username:  'Laryolyn',
                password:  'aSuperF4k$pass',
                roles:     ['sub-admin', 'moderator']
            },
            {
                clientId:  null,
                firstName: 'Tracey',
                lastName:  'Jech',
                email:     'traceyjech@gmail.com',
                username:  'Gammy',
                password:  'theM0$stSecur%epass4Eva',
                roles:     ['sub-admin', 'moderator']
            }
        ];

        
        for(let i = 0, len = usersToCreate.length; i < len; i++){
            const user = usersToCreate[i];

            console.log(`Creating user ${ user.username }`);

            await userService.createUser(user);
        }

        console.log('Done creating users');
        console.log(new Array(25).fill('-').join(''));
    }


    /*
        ============
        CREATE TYPES
        ============
    */
    const types = await clientService.getClientTypes();

    if(!types.length){
        console.log('DB has no account types, creating...');

        const typesToCreate = [
            {
                id: 0,
                name: 'Demo',
                maxEvents: 1,
                maxEventViewers: 10,
                maxRegisteredUsers: 1
            },
            {
                id: 0,
                name: 'Standard',
                maxEvents: 10,
                maxEventViewers: 100,
                maxRegisteredUsers: 25
            },
            {
                id: 0,
                name: 'Pro',
                maxEvents: 25,
                maxEventViewers: 250,
                maxRegisteredUsers: 100
            },
            {
                id: 0,
                name: 'Elite',
                maxEvents: 50,
                maxEventViewers: 500,
                maxRegisteredUsers: 500
            },
            {
                id: 0,
                name: 'Ultimate',
                maxEvents: 100,
                maxEventViewers: 1000,
                maxRegisteredUsers: 1000
            }
        ];

        for(let i = 0, len = typesToCreate.length; i < len; i++){
            const type = typesToCreate[i];

            console.log(`Creating type "${ type.name }"`);
            
            await clientService.createClientType(type);
        }

        console.log('Done creating types');
        console.log(new Array(25).fill('-').join(''));
    }



    /*
        ==============
        CREATE CLIENTS
        ==============
    */
    const clients = await clientService.getClients();

    if(!clients.length){

        console.log('DB has no clients, creating...');

        const users = await userService.getUsers(),
              types = await clientService.getClientTypes();

        if(!users.length){
            throw new Error('No users to assign clients to');
        }
        if(!types.length){
            throw new Error('No client types to assign clients to');
        }

        const owner = users[0],
              type  = types[1];

        const clientsToCreate: IClientPost[] = [
            {
                name:    'InsyteLabs',
                slug:    'insyte-labs',
                ownerId: <number>owner.id,
                typeId:  <number>type.id
            }
        ];

        for(let i = 0, len = clientsToCreate.length; i < len; i++){
            const client = clientsToCreate[i];

            console.log(`Creating client ${ client.name }`);

            await clientService.createClient(client);
        }

        console.log('Done creating clients');
        console.log(new Array(25).fill('-').join(''));
    }

})();