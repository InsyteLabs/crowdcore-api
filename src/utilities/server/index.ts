'use strict';

import http             from 'http';
import os               from 'os-utils';
import { SocketServer } from '../../socket-server';

export async function currentStats(httpServer: http.Server, socketServer: SocketServer){
    const cpuUsage = await getCPUUsage(),
          cpuFree  = 100 - cpuUsage;

    const totalConnections  = await getAPIConnections(httpServer),
          socketConnections = socketServer.getClientCount(),
          apiConnections    = totalConnections !== -1 ? totalConnections - socketConnections : 0;

    return {
        cpu: {
            cores: os.cpuCount(),
            usage: cpuUsage,
            free:  cpuFree
        },
        memory: {
            totalMB: parseFloat(os.totalmem().toFixed(2)),
            freeMB:  parseFloat(os.freemem().toFixed(2)),
            usage:   parseFloat((os.freememPercentage() * 100).toFixed(2))
        },
        sys: {
            platform: os.platform(),
            uptime:   os.sysUptime()
        },
        process: {
            uptime: os.processUptime()
        },
        app: {
            httpClients:   apiConnections,
            socketClients: socketConnections
        }
    };
}


function getAPIConnections(server: http.Server): Promise<number>{
    return new Promise((resolve, reject) => {
        server.getConnections((err: Error|null, count: number) => {
            if(err) return resolve(-1);

            resolve(count);
        });
    });
}

function getCPUUsage(): Promise<number>{
    return new Promise((resolve, reject) => {
        os.cpuUsage(percentage => {
            percentage = percentage * 100;

            resolve(parseFloat(percentage.toFixed(2)));
        });
    });
}

function getFreeCPU(): Promise<number>{
    return new Promise((resolve, reject) => {
        os.cpuFree(percentage => {
            percentage = percentage * 100;

            resolve(parseFloat(percentage.toFixed(2)));
        });
    });
}