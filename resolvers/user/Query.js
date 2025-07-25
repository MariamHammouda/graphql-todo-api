

// to get all user date from data base  ----------------------
import UserModel from "../../models/userModel.js"

export const userQuery = {

    async users(){
        return await UserModel.find() ;
    },

     async user(_,args){
        return await UserModel.findById(args.id)
    },

}
