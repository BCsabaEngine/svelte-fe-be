import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../backend/src/router';
export type { User, Users } from '../../../../backend/src/router';

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://127.0.0.1:3000/trpc',
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }),
    ],
});
