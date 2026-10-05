import PropTypes from 'prop-types'
import { User } from './User.jsx'
export function Post({ title, contents, ingredients = [], imageURL, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {ingredients.length > 0 && (
        <div>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {imageURL && (
        <div>
          <img src={imageURL} alt={title} />
        </div>
      )}
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  imageURL: PropTypes.string,
}
