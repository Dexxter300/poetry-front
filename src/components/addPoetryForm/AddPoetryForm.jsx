import { useState } from "react"
import api from "api"
import css from './addPoetryForm.module.css'

const AddPoetryForm = () => {
        const [title, setTitle] = useState('')
    const [img, setImg] = useState(null)
    const [preview, setPreview] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [about, setAbout] = useState('')
    const [tag, setTag] = useState(null)


    const handlePdfUpload = async () => {


        const signResponse = await api.getCloudinaryUploadUrl();
        const signData = await signResponse.data;
        console.log(signData)
        if (!pdf) {
            alert("Please select an file to upload.");
            return;
        }
        const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;
        const formData = new FormData();
        formData.append("file", pdf);
        formData.append("api_key", signData.apikey);
        formData.append("timestamp", signData.timestamp);
        formData.append("signature", signData.signature);
        formData.append("folder", "poetry");

        const pdfUrlResponse = await api.postPdfToCloudinary(url, formData)
        return pdfUrlResponse
    }

    const handleAddPoetry = async e => {
        e.preventDefault();
        //add cloudinary requests (done)
        const signResponse = await api.getCloudinaryUploadUrl();
        const signData = await signResponse.data;
        console.log(signData)

        if (!img) {
            alert("Please select an image to upload.");
            return;
        }
        const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;
        const formData = new FormData();
        formData.append("file", img);
        formData.append("api_key", signData.apikey);
        formData.append("timestamp", signData.timestamp);
        formData.append("signature", signData.signature);
        formData.append("folder", "poetry");

        console.log(formData.get('file'))
        console.log(formData.get('api_key'))
        console.log(formData.get('timestamp'))
        console.log(formData.get('signature'))
        console.log(formData.get('folder'))

        const coverUrlResponse = await api.postImgToCloudinary(url, formData)
        const pdfUrlResponse = await handlePdfUpload()
        console.log(pdfUrlResponse)
        const res = await api.addPoetry({
            name: title,
            about,
            // pages: pageList,
            body: pdfUrlResponse.data.url,
            coverUrl: coverUrlResponse.data.url
        })
        console.log(res)
        setTitle('')
        setAbout('')
        setImg(null)
        setPreview(null)
        //


        //clear form clear localStorage clear pageList clear title clear about clear tag (nahh it will refresh automaticly)
    }

        const handleFileChange = e => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setImg(file);
            setPreview(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    const handlePdfChange = e => {
        const file = e.target.files[0]
        console.log(file)
        if (file) {
            setPdf(file)
        }
    }


       const handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const handleAboutChange = e => {
        setAbout(e.target.value);
    }

    return ( 
        <div className={css.container}>
                <form action="" onSubmit={handleAddPoetry} className={css.form}>
                    <label>
                        <span>name</span>
                        <input name="title" value={title} onChange={handleTitleChange} />
                    </label>
                    <label htmlFor="">
                        <span>about</span>
                        <textarea name="about" rows='10' value={about} onChange={handleAboutChange} />
                    </label>
                    <label>
                        <span>cover</span>
                        <input type="file" onChange={handleFileChange} />
                        {preview && <img src={preview} alt="Preview" style={{ width: "200px", margin: "10px 0" }} />}
                    </label>
                    <label>
                        <span>file</span>
                        <input type="file" onChange={handlePdfChange} />
                    </label>
                    {/* <label>
                        <span>Page Title</span>
                        <input type="text" name="pageTitle" value={pageTitle} onChange={handlePageTitleChange} />
                    </label>
                    <label>
                        <span>Page-{currentPageNumber}</span>
                        <input type="text" name="page" value={currentPage} onChange={handleCurrentPageChange} />
                        {isEditingMod ? <button type="button" onClick={handleSubmitEditPage}>edit</button> : <button type="button" onClick={handleAddPage}>add Page</button>}
                    </label> */}

                    <button type="submit">POST</button>
                </form>
                {/* <ul onClick={handlePickPage}>
                    {pageList.map((page, index) => {
                        return (<li key={index}>{page.title} | Page-{index + 1}</li>)
                    })}
                </ul> */}
            </div>
    )
}


export default AddPoetryForm