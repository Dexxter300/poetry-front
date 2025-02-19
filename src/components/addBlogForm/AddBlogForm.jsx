import { useEffect, useState } from "react";
import api from "api";
import css from './addBlogForm.module.css'

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
        <div className={`${css.container} ${css.fadeIn}`}>
            <div className={css.formCover}>
            <form className={css.form} onSubmit={handleAddBlogPost}>
                <label className={css.label}>
                    <span>title</span>
                    <input className={css.titleInput} type="text" value={title} onChange={handleBlogTitleChange} />
                </label>
                <label className={css.label}>
                    <span>text</span>
                    <input className={css.textarea} type="text" value={body} onChange={handleBlogBodyChange} />
                </label>
                <button type="submit">post</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlogForm