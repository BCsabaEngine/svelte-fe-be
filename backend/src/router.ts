import { initTRPC } from '@trpc/server';
import { Infer, object, array, string, optional } from 'superstruct';

const User = object({
    id: string(),
    name: string(),
    bio: string(),
})
export type User = Infer<typeof User>

const Users = array(User);
export type Users = Infer<typeof Users>

const users: Users = [
    {
        id: 'A',
        name: 'Csaba',
        bio: 'Cs'
    },
    {
        id: 'E',
        name: 'Emese',
        bio: 'E'
    },
];

export const t = initTRPC.create();

export const appRouter = t.router({
    createUser: t.procedure
        .input(User)
        .output(User)
        .mutation(({ input }) => {
            users.push(input);
            return input;
        }),
    getUserById: t.procedure
        .input(string())
        .output(optional(User))
        .query(({ input }) => {
            return users.find(u => u.id == input);
        }),
    getUsers: t.procedure
        .output(Users)
        .query(() => {
            return users;
        }),
});

export type AppRouter = typeof appRouter;