import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true,
    minlength:6 
  },  // store hashed password
  gender: {
        type: String,
        required: true,
        enum:["male", "female"]
    },
    status: {
        type: Number,
        enum: [1, 2, 3, 4], // optionally restrict to valid status codes
        default: 1, // 1 = default (socket-based online/offline)
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
