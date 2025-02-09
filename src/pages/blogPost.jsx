import { useEffect, useState } from "react"
import api from "api"
import { useParams } from "react-router-dom"

const BlogPostPage = () => {
    const { postId } = useParams()
    const [blogTitle, setBlogTitle] = useState('')
    const [blogBody, setBlogBody] = useState('')
    const [blogDate, setBlogDate] = useState('')
    useEffect(() => {
        api.getBlogById({ postId }).then(r => {
            setBlogTitle(r.data[0].title)
            setBlogBody(r.data[0].body)
            const date = new Date(r.data[0].date)
            let month = date.getMonth() + 1
            if (month.toString().length === 1) {
                month = `0${month}`
            }
            const day = date.getDate()
            const year = date.getFullYear()
            setBlogDate(`${day}.${month}.${year}`)
        })
    }, [])
    return (<div>
        <h1>{blogTitle}</h1>
        <p>
            {blogBody}
        </p>
        <span>{blogDate}</span>
    </div>)
}

export default BlogPostPage