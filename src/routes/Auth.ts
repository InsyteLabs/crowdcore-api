'use strict';

import { Router }                                 from 'express';
import * as jwt                                   from 'jsonwebtoken';
import conf                                       from '../conf';
import { userService, logService, clientService } from '../services';
import { Client }                                 from '../models';
import { SocketServer }                           from '../socket-server';
import { http }                                   from '../utilities';
import { SECONDS_IN_DAY, MessageType }            from '../constants';

const router = Router();

router.post('/authenticate', async (req, res, next) => {
    const { username, password } = req.body;

    if(!(username && password)){
        return http.clientError(res, 'User and password fields required');
    }

    try{
        const user  = await userService.getUserByUsername(username),
              valid = await userService.checkUserPassword(username, password);

        if(!valid){
            http.unauthorized(res, 'Incorrect username/password');
        }
        else{
            const token = await jwt.sign({
                issuer: 'CROWDCORE_API',
                exp: Math.floor(Date.now() / 1000) + (SECONDS_IN_DAY),
                data: user
            }, conf.SECRET);
            
            res.json({ token });
        }

        await logService.createAuthLog({
            clientId: user ? user.clientId : null,
            userId:   user ? user.id       : null,
            ip:       req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            success:  valid
        });
    }
    catch(e){
        return http.serverError(res, e);
    }
});

router.post('/clients/:clientSlug/users/anonymous', async (req, res, next) => {

    let client: Client|undefined = await clientService.getClientBySlug(req.params.clientSlug);

    if(!(client && client.id)){
        return http.notFound(res);
    }

    try{
        const user = await userService.createAnonymousUser(client.id);

        res.json(user);

        const clientSlug:   string       = res.locals.client.slug,
              channel:      string       = `client::${ clientSlug };users`,
              socketServer: SocketServer = res.locals.socketServer;

        socketServer.messageClients(channel, MessageType.USER_CREATED, user);
    }
    catch(e){
        return http.serverError(res, e);
    }
});

router.post('/authenticate/anonymous', async (req, res, next) => {
    const { username } = req.body;

    if(!username){
        return http.clientError(res, 'Username field required');
    }

    try{
        const user = await userService.getUserByUsername(username);

        if(user && user.id){
            const token = await jwt.sign({
                issuer: 'CROWDCORE_API',
                exp: Math.floor(Date.now() / 1000) + (SECONDS_IN_DAY),
                data: user
            }, conf.SECRET);
    
            res.json({ token });

            await logService.createAuthLog({
                clientId: user ? user.clientId : null,
                userId:   user ? user.id       : null,
                ip:       req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                success:  true
            });
        }
        else{
            http.notFound(res, 'user-not-found');
        }
    }
    catch(e){
        return http.serverError(res, e);
    }
});

export default router;