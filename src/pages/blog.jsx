import { useEffect, useState } from "react"
import api from "api"
import { Link, Navigate } from "react-router-dom"
import css from './blog.module.css'

const BlogPage = () => {
    const [blogList, setBlogList] = useState([])
    const [page, setPage] = useState(0)
    useEffect(() => {
        const blog = api.getBlog({ page: 0, limit: 10 }).then(res => {
            console.log(res)
            setBlogList(res.data.posts)
        })
    }, [])

    // const handleBlogClick = e => {
    //     const target = e.target
    //     if (target.tagName === 'LI') {
    //         const keyValue = target.getAttribute("data-key")
    //         return
    //     }
    //     return
    // }
    return (<div>
        <div>
            {blogList?.map(blog => {
                // return (<li className={css.li} key={blog.postId} data-key={blog.postId}>{blog.title}</li>)
                return (<div key={blog.postId}><Link to={`${blog.postId}`}>{blog.title}</Link></div>)
            })}
        </div>
    </div>)
}

export default BlogPage