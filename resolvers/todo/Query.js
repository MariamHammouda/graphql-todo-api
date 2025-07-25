import TodoModel from "../../models/todoModel.js";
import { GraphQLError } from "graphql";

export const todoQuery = {
  async todos(_, __, context) {
    if (!context.user || context.user.role !== "admin") {
      throw new GraphQLError("You are not Authenticated", {
        extensions: { code: "AUTH", status: 401 },
      });
    }
    return await TodoModel.find();
  },

  async todo(_, { id }, context) {
    if (!context.user) throw new Error("Not authenticated");
    return await TodoModel.findById(id);
  },

  async todosByUser(_, { userId }, context) {
    if (!context.user) throw new Error("Not authenticated");
    return await TodoModel.find({ userId });
  },
};