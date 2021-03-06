'use strict';

import { Router } from 'express';

import logRouter      from './Log';
import authRouter     from './Auth';
import clientRouter   from './Client';
import userRouter     from './User';
import eventRouter    from './Event';
import questionRouter from './Question';
import chatRouter     from './Chat';

import { getCurrentUser, getClient } from '../middleware';

export const router = Router();

router.use(logRouter);
router.use(authRouter);

router.use(getCurrentUser, getClient);

// Log the request method, url, and identified user to the console
router.use((req, res, next) => {
    const fullUrl: string = req.protocol + '://' + req.get('host') + req.originalUrl;

    if(req.method.toLowerCase() !== 'options'){
        console.log(`${ req.method.toUpperCase() } ${ fullUrl }`);
        console.log(`Requested by: ${ res.locals.user.username }`);
        console.log(`Client - ID: ${ res.locals.client.id }; Slug: ${ res.locals.client.slug }\n`);
    }

    next();
});

// Routers that require auth
router.use(clientRouter);
router.use(userRouter);
router.use(eventRouter);
router.use(questionRouter);
router.use(chatRouter);