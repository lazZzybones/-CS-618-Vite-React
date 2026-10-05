import { Like } from '../db/models/like.js'

export async function toLike({ postId, userId, isLiked }) {
  const likeValue = isLiked !== undefined ? Boolean(isLiked) : true
  return await Like.findOneAndUpdate(
    { post: postId, user: userId },
    { isLiked },
    { new: true, upsert: true },
  )
}
export async function getLikeStatus({ postId, userId }) {
  if (!userId) return false
  const like = await Like.findOne({ post: postId, user: userId })
  return like ? like.isLiked : false
}
export async function getPostLikesCount(postId) {
  return await Like.countDocuments({ post: postId, isLiked: true })
}
