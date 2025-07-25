import UserModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const userMutation = {
  async createUser(_, args) {
    const user = new UserModel(args.user);
    await user.save();
    return user;
  },

  async login(_, args) {
    const { email, password } = args;
    const user = await UserModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!user || !isMatch) {
      throw new GraphQLError("invalid email or passsword",{
        extensions:{
            code:"unauthorized",
            status:404,
            http:{
                status:404 ,
            }


        }
      });

    }
    console.log("JWT SECRET:", process.env.SECRET);

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      message: "Login Successfully",
      token,
      user,
    };
  },

  updateUser: async (_, { id, user }, context) => {
  if (!context.user || (context.user.role !== "admin" && context.user.id !== id)) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "FORBIDDEN",
        status: 403,
      },
    });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
},


deleteUser: async (_, { id }, context) => {
  if (!context.user || context.user.role !== "admin") {
    throw new GraphQLError("Only admin can delete users", {
      extensions: {
        code: "FORBIDDEN",
        status: 403,
      },
    });
  }

  await UserModel.findByIdAndDelete(id);
  return "User deleted successfully";
}

};
