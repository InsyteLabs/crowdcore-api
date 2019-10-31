'use strict';

import { Request, Response, NextFunction } from 'express';
import { clientService }                   from '../services';
import { http }                            from '../utilities';

export async function getClient(req: Request, res: Response, next: NextFunction){
    const clientId   = req.params.clientId || req.query.clientId,
          clientSlug = req.params.clientSlug || req.query.clientSlug;

    if(clientId){
        try{
            res.locals.client = await clientService.getClient(+clientId);
        }
        catch(e){
            console.error(`Error loading client of ID ${ clientId }`);
            console.error(e);

            return http.serverError(res, e);
        }
    }

    if(clientSlug){
        try{
            res.locals.client = await clientService.getClientBySlug(clientSlug);
        }
        catch(e){
            console.error(`Error loading client of slug ${ clientSlug }`);
            console.error(e);
            
            return http.serverError(res, e);
        }
    }

    if(!res.locals.client) return http.notFound(res, 'Client account not found');

    next();
}