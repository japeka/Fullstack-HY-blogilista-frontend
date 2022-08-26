import Card from './Card'
import React, { useState } from "react"

const Blog = ({blog,likes,remove}) =>  {
  const [visible, setVisible] = useState(false)
  const buttonStyle = 'bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-5 ml-3 rounded p-10 uppercase' 
  return (
  <>
    <li className="p-3 bg-orange-200 mb-2">
      {blog.title}
      <button 
        className={buttonStyle}
        onClick={()=>setVisible(!visible)}
        >{visible ? 'hide': 'view'}</button>
    </li>
    {visible && <Card 
      blog={blog} 
      likes={likes}
      remove={remove}/>}
 </>
  )
}

export default Blog