import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    permission: [String],
    updatedAt: {
        type: Number,
        default: Date.now
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
});

export default mongoose.model("Role", RoleSchema);