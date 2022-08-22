const Blog = ({blog}) => (
  <li className="p-3 bg-orange-200 mb-2">
      {blog.title}  <span className="text-blue-500 text-xs">by {blog.author}</span>
 </li>
)

export default Blog