export const typeDefs = `#graphql
  type Query {
    users: [User]
    user(id: ID!): User!
    todos: [Todo]
    todo(id: ID!): Todo
    todosByUser(userId: ID!): [Todo]
  }

  type Mutation {
    
    createUser(user: RegesterInput): User
    login(email: String, password: String): LoginResponse
    updateUser(id: ID!, user: UpdateUserInput): User
    deleteUser(id: ID!): String

   
    createTodo(todo: TodoInput): Todo
    updateTodo(id: ID!, todo: UpdateTodoInput): Todo
     deleteTodo(id: ID!): String
  }

  type Todo {
    _id: ID
    title: String
    status: Status
    userId: ID
  }

  input TodoInput {
    title: String!
    status: Status
    userId: ID!
  }

  input RegesterInput {
    name: String!
    email: String!
    password: String!
    role: Role
  }

 
  input UpdateUserInput {
    name: String
    email: String
    password: String
    role: Role
  }

  input UpdateTodoInput {
  title: String
  status: Status
  userId: ID
}


  type LoginResponse {
    message: String
    token: String
    user: User
  }

  type User implements IUser {
    _id: ID
    name: String
    email: String
    password: String
    role: Role
  }

  enum Role {
    user
    admin
  }

  enum Status {
    pending
    inProgress
    done
  }

  interface IUser {
    name: String
    email: String
  }
`;
