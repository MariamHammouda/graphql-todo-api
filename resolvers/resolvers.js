import { todoMutation } from "./todo/Mutation.js";
import { todoQuery } from "./todo/Query.js";
import { userMutation } from "./user/Mutation.js";
import { userQuery } from "./user/Query.js";

export const resolvers = {
  Query: {
    ...userQuery,
    ...todoQuery,
  },
  Mutation: {
    ...userMutation,
    ...todoMutation,
  },
};
