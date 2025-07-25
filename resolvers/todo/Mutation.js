import TodoModel from "../../models/todoModel.js";

export const todoMutation = {
  async createTodo(_, args, context) {
    if (!context.user) throw new Error("Unauthorized");
    const todo = new TodoModel(args.todo);
    await todo.save();
    return todo;
  },

  async updateTodo(_, { id, todo }, context) {
    if (!context.user) throw new Error("Unauthorized");
    const updated = await TodoModel.findByIdAndUpdate(id, todo, { new: true });
    return updated;
  },

  async deleteTodo(_, { id }, context) {
    if (!context.user) throw new Error("Unauthorized");
    await TodoModel.findByIdAndDelete(id);
    return "Todo deleted";
  },
};