import mongoose, {model , Schema } from "mongoose";

export const UserSchema = new Schema({
    name:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    orders:[{
        type: Schema.Types.ObjectId,
        ref:'Order'
    }]
});

const User = mongoose.model("User",UserSchema);
export default User;