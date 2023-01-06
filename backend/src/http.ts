import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { fastifyCors } from '@fastify/cors';

import { createContext } from './context';
import { appRouter } from './router';

const server = fastify({
    maxParamLength: 5000,
});
server.register(fastifyCors, {
    origin: [
        new RegExp('http://localhost'),
        new RegExp('http://192.168.10.94'),
    ],
    credentials: true,
    optionsSuccessStatus: 200
})
server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
        router: appRouter,
        createContext: createContext,
    },
});

export const start = () => {
    return server.listen({ port: 3000, host: '0.0.0.0' });
}
