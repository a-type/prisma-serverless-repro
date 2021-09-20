import { Foo } from '@prisma/client';

import { Context } from './context';

export const resolvers = {
  Query: {
    foo: async (
      root: any,
      { id }: { id: string },
      ctx: Context
    ): Promise<Foo | null> => {
      return ctx.prisma.foo.findUnique({
        where: {
          id,
        },
      });
    },
    foos: async (root: any, args: any, ctx: Context): Promise<Foo[]> => {
      return ctx.prisma.foo.findMany();
    },
  },

  Mutation: {
    createFoo: async (
      root: any,
      args: { input: { name: string } },
      ctx: Context
    ): Promise<{ foo: Foo }> => {
      const result = await ctx.prisma.foo.create({
        data: {
          name: args.input.name,
        },
      });

      // notify other participants
      ctx.pubSub.publish(`fooCreated`, {
        foo: result,
      });

      console.debug("Foo created", result);

      return {
        foo: result,
      };
    },
  },

  Subscription: {
    subscribeFoo: {
      subscribe: (
        root: any,
        args: { input: { workshopId: string } },
        ctx: Context,
        info: any
      ) => {
        return ctx.pubSub.subscribe(`foo:${args.input.workshopId}`)(
          root,
          args,
          ctx,
          info
        );
      },
    },
  },
};
