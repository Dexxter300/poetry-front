import { useEffect, useState } from "react";
import api from "api";
import css from './editBlogForm.module.css'

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
        <div className={`${css.fadeIn} ${css.container}`}>
            <div className={css.formCover}>
           <form className={css.form} onSubmit={handleSubmitBlogEdit}>
                <label className={css.label}>
                    <span>title</span>
                    <input className={css.titleInput} type="text" name="title" value={title} onChange={handleTitleChange}/>
                </label>
                <label className={css.label}>
                    <span>Body</span>
                    <textarea className={css.textarea} value={body} onChange={handleBodyChange}/>
                    </label>
                    <button type="submit">edit</button>
                </form>
            </div>
            <div>
                <ul className={css.ul}>
                    {blogList && blogList.map((blog, i) => {
                        return (<li className={css.li} key={blog.postId}>
                            <div className={css.liCard}>
                                <span>{blog.title}</span>
                                <div className={css.controls}>
                                    <button className={css.editBtn} type="button" onClick={() => handleBlogEditBtnClick(blog.postId)}>edit</button>
                                    <button className={css.deleteBtn} type="button" onClick={() => handleBlogDeleteBtnClick(blog.postId)}>delete</button>
                                </div>

                            </div>
                        </li>)
                    })}
                </ul>
            </div>
            <div>
                {deleteConfirmation && <div><span>are u sure?</span> <button type="button">delete</button></div>}
            </div>
        </div>
    )
}

export default EditBlogForm