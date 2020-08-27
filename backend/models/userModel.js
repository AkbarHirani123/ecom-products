import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require:true, unique: true, dropDubs: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;