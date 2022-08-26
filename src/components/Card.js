import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ blog, likes,remove }) => {
  const titleStyle = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
  const textStyle = 'mb-3 font-normal text-gray-700 dark:text-gray-400'
  const buttonStyle = 'bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-5 ml-3 rounded p-10 uppercase'

  const addLike = () => {
    let newLikes = blog.likes + 1
    let user = blog.user.id
    const newBlogObject = { ...blog, likes: newLikes, user }
    delete newBlogObject['id']
    likes(blog.id,newBlogObject)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
    }
  }

  return blog.title && (
    <div className="w-full bg-orange-120 p-5">
      <h5 className={titleStyle}>Title: {blog.title}</h5>
      <p className={textStyle}>Url: {' '}{blog.url}</p>
      <p className={textStyle}>Likes: {' '}{blog.likes}
        <button onClick={addLike} className={buttonStyle}>likes</button>
      </p>
      <p className={textStyle}>Author: {' '}{blog.author}</p>
      <button onClick={deleteBlog} className={buttonStyle}>remove</button>
    </div>
  )}

Card.propTypes = {
  blog: PropTypes.object,
  likes: PropTypes.func,
  remove: PropTypes.func
}

export default Card

