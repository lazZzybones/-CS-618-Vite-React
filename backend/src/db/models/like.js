import mongoose, { Schema } from 'mongoose'
const likesSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    isLiked: { type: Boolean, required: true },
  },
  { timestamps: true },
)
export const Like = mongoose.model('likes', likesSchema)
