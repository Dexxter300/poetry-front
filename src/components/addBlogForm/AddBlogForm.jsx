import { useEffect, useState } from "react";
import api from "api";

const AddBlogForm = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleAddBlogPost = e => {
        e.preventDefault();
        api.postBlog({ title, body })
        setBody('')
        setTitle('')
    }

    const handleBlogTitleChange = e => {
        setTitle(e.target.value)
    }

    const handleBlogBodyChange = e => {
        setBody(e.target.value)
    }

    return (
        <div>
            <h2>blog</h2>
            <form onSubmit={handleAddBlogPost}>
                <label>
                    <span>title</span>
                    <input type="text" value={title} onChange={handleBlogTitleChange} />
                </label>
                <label>
                    <span>text</span>
                    <input type="text" value={body} onChange={handleBlogBodyChange} />
                </label>
                <button type="submit">post</button>
            </form>
        </div>
    )
}

export default AddBlogForm