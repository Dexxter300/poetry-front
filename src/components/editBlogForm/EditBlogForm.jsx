import { useEffect, useState } from "react";
import api from "api";

const EditBlogForm = () => {
    const [blogList, setBlogList] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [selectedBlogId, setSelectedBlogId] = useState('')
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)

    useEffect(() => {
        api.getBlog({ page: 0, limit: 100 }).then(r => {
        setBlogList(r.data.posts)
    })
    }, [])

    const handleBlogEditBtnClick = id => {
        const found = blogList.find(({ postId }) => postId === id)
        if (!found) {
            return
        }
        // console.log(id)
        setSelectedBlogId(id)
        setBody(found.body)
        setTitle(found.title)
    }

    const handleSubmitBlogEdit = async e => {
        e.preventDefault();
    
        return 
        const res = await api.editBlog({postId: selectedBlogId, blog: {
            title,
            body,
        }})
        setTitle('')
        setBody('')
        setSelectedBlogId('')
    }


    const handleBlogDeleteBtnClick = id => {
        setSelectedBlogId(id)
        setDeleteConfirmation(true)
    }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const handleBodyChange = e => {
        setBody(e.target.value);
    }

    return (
        <div>
            <div>
                <ul>
                    {blogList && blogList.map((blog, i) => {
                        return (<li key={blog.postId}>
                            <div>
                                <span>{blog.title}</span>
                                <button type="button" onClick={() => handleBlogEditBtnClick(blog.postId)}>edit</button>
                                <button type="button" onClick={() => handleBlogDeleteBtnClick(blog.postId)}>delete</button>
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
           <form onSubmit={handleSubmitBlogEdit}>
                <label>
                    <span>title</span>
                    <input type="text" name="title" value={title} onChange={handleTitleChange}/>
                </label>
                <label>
                    <span>Body</span>
                    <textarea value={body} onChange={handleBodyChange}/>
                </label>
            </form>
            <div>
                {deleteConfirmation && <div><span>are u sure?</span> <button type="button">delete</button></div>}
            </div>
        </div>
    )
}

export default EditBlogForm