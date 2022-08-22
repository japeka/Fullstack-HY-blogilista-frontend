import "./index.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user)
      setUsername("")
      setPassword("")

    } catch (exception) {
       setNotification(['error', exception.response.data])
        setTimeout(() => {
        setUsername("")
        setPassword("")
        setNotification(null)
      }, 7000) 
    }
  };

  const loginForm = () => (
    <div className="m-5">
      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500">
        login in to application
      </h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div class="flex flex-col items-start mb-9">
          <input
            type="text"
            id="username"
            placeholder="..."
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            class="px-4 py-2 w-96 
            border border-slate-600 placeholder-transparent"
          />
          <label
            for="username"
            class="ml-4 -mt-10 text-xs text-blue-400  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300 uppercase"
          >
            username
          </label>
        </div>

        <div class="flex flex-col items-start mb-9">
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            class="px-4 py-2 w-96 
            border border-slate-600 placeholder-transparent"
          />
          <label
            for="password"
            class="ml-4 -mt-10 text-xs text-blue-400  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300 uppercase"
          >
            password
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase"
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title,
        author,
        url,
      };
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      setTitle("")
      setAuthor("")
      setUrl("")
      setNotification(['success',`A new blog ${savedBlog.title} created by ${savedBlog.author}`])
      setTimeout(() => {
        setNotification(null)
      }, 5000)            
    } catch (exception) {
      setNotification(['error', exception.response.data])
      setTimeout(() => {
        setNotification(null)
        setTitle('')
        setAuthor('')
        setUrl("")
      }, 7000) 
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    blogService.setToken(null)
    setUser(null)
  };

  const noteForm = () => (
    <div className="m-5">
      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500">blogs</h2>
      <Notification notification={notification} />

      {user && `${user.name} logged in`}
      <button
        className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase"
        onClick={handleLogout}
      >
        logout
      </button>

      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 mt-5">
        create new
      </h2>
      <form onSubmit={addBlog}>
        <div class="flex flex-col items-start mb-9">
          <input
            type="text"
            id="username"
            placeholder="..."
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            class="px-4 py-2 w-96 
            border border-slate-600 placeholder-transparent"
          />
          <label
            for="username"
            class="ml-4 -mt-10 text-xs text-blue-400  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300 uppercase"
          >
            title
          </label>
        </div>
        <div class="flex flex-col items-start mb-9">
          <input
            type="text"
            id="username"
            placeholder="..."
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
            class="px-4 py-2 w-96 
            border border-slate-600 placeholder-transparent"
          />
          <label
            for="username"
            class="ml-4 -mt-10 text-xs text-blue-400  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300 uppercase"
          >
            author
          </label>
        </div>

        <div class="flex flex-col items-start mb-9">
          <input
            type="text"
            id="username"
            placeholder="..."
            onChange={({ target }) => setUrl(target.value)}
            value={url}
            class="px-4 py-2 w-96 
            border border-slate-600 placeholder-transparent"
          />
          <label
            for="username"
            class="ml-4 -mt-10 text-xs text-blue-400  
            peer-placeholder-shown:text-gray-400 
            peer-placeholder-shown:-mt-8
            peer-placeholder-shown:text-base 
            duration-300 uppercase"
          >
            url
          </label>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase"
          type="submit"
        >
          create
        </button>
      </form>

      <div class="w-full bg-white rounded-lg shadow mt-3">
        <ul class="bg-orange-50 divide-gray-100">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </ul>
      </div>
    </div>
  );

  return user === null ? loginForm() : noteForm();
};
export default App;
