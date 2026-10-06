import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth, AUTH_DISABLED } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'
export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [token] = useAuth()
  const [ingredients, setIngredients] = useState('')
  const [imageURL, setImageURL] = useState('')
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, { title, contents, ingredients, imageURL }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }
  if (!token && !AUTH_DISABLED)
    return <div>Please log in to post new recipy.</div>
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <br />
        <label htmlFor='create-contens-url'>Recipe: </label>
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <br />
      <div>
        <br />
        <label htmlFor='create-ingredients-url'>Ingredients: </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <br />
      </div>
      <div>
        <br />
        <label htmlFor='create-image-url'>Image URL: </label>
        <input
          type='text'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <br />
      </div>
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Recipy created successfully!
        </>
      ) : null}
    </form>
  )
}
