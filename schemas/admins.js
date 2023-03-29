import mongoose, {model , Schema } from "mongoose";

export const adminSchema = new Schema({
    rol:{type: String, default:"admin"},
    email:{type: String, require: true},
    password:{type: String, require: true},
});

const Admin = mongoose.model("Admin",adminSchema);
export default Admin;