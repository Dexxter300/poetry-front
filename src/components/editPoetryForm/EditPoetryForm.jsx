import { useState, useEffect, use } from "react"
import api from "api"


const EditPoetryForm = () => {
    const [poetryList, setPoetryList] = useState([])
    const [about, setAbout] = useState('')
    const [imgUrl, setImgUrl] = useState(null)
    const [img, setImg] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [pdfUrl, setPdfUrl] = useState(null)
    const [title, setTitle] = useState('')
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [selectedPoetryId, setSelectedPoetryId] = useState('')
 
    useEffect(() => {
        api.getPoetry({ page: 0, limit: 100 }).then(r => {
        setPoetryList(r.data.poetry)
    })
    }, [])
    
    const handlePdfUpload = async () => {

        if (!pdf) {
            console.log(pdfUrl)
            return pdfUrl
        }
        const signResponse = await api.getCloudinaryUploadUrl();
        const signData = await signResponse.data;
        console.log(signData)
        const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;
        const formData = new FormData();
        formData.append("file", pdf);
        formData.append("api_key", signData.apikey);
        formData.append("timestamp", signData.timestamp);
        formData.append("signature", signData.signature);
        formData.append("folder", "poetry");

        const pdfUrlResponse = await api.postPdfToCloudinary(url, formData)
        return pdfUrlResponse.data.url
    }

    const handleCoverUpload = async () => {
        //add cloudinary requests (done)
        if (!img) {
            console.log(imgUrl)
            return imgUrl
        }

        const signResponse = await api.getCloudinaryUploadUrl();
        const signData = await signResponse.data;
        console.log(signData)

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
        return coverUrlResponse.data.url
    }

    const handlePoetryEditBtnClick = id => {
        const found = poetryList.find(({ poetryId }) => poetryId === id)
        if (!found) {
            return
        }
        console.log(id)
        setSelectedPoetryId(id)
        setAbout(found.about)
        setImgUrl(found.coverUrl)
        setPdfUrl(found.body)
        setTitle(found.name)
    }

    const handlePoetryDeleteBtnClick = id => {
        setSelectedPoetryId(id)
        setDeleteConfirmation(true)
    }

    const handleSubmitPoetryDelete = async e => {
        const res = await api.deletePoetry({ poetryId: selectedPoetryId })
        setDeleteConfirmation(false)
        console.log(res)
        return res
    }

    const handleSubmitPoetryEdit = async e => {
        e.preventDefault();
    
        const coverUrlResponse = await handleCoverUpload()
        const pdfUrlResponse = await handlePdfUpload()
        const res = await api.editPoetry({poetryId: selectedPoetryId, poetry: {
            name: title,
            about,
            body: pdfUrlResponse,
            coverUrl: coverUrlResponse
        }})
        setTitle('')
        setAbout('')
        setSelectedPoetryId('')
        setImg(null)
        setImgUrl(null)
    }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const handleAboutChange = e => {
        setAbout(e.target.value);
    }

    const handleFileChange = e => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setImg(file);
            setImgUrl(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    const handlePdfChange = e => {
        const file = e.target.files[0]
        console.log(file)
        if (file) {
            setPdf(file)
        }
    }


    return (
        <div>
            <div>
                <ul>
                    {poetryList && poetryList.map((poetry, i) => {
                        return (<li key={poetry.poetryId}>
                            <div>
                                <span>{poetry.name}</span>
                                <button type="button" onClick={() => handlePoetryEditBtnClick(poetry.poetryId)}>edit</button>
                                <button type="button" onClick={() => handlePoetryDeleteBtnClick(poetry.poetryId)}>delete</button>
                            </div>
                        </li>)
                    })}
                </ul>
            </div>

            <form onSubmit={handleSubmitPoetryEdit}>
                <label>
                    <span>title</span>
                    <input type="text" name="title" value={title} onChange={handleTitleChange}/>
                </label>
                <label>
                    <span>about</span>
                    <textarea value={about} onChange={handleAboutChange}/>
                </label>
                <label>
                    <span>cover</span>
                    <input type="file" onChange={handleFileChange}/>
                    {imgUrl && <img src={imgUrl} alt="Preview" style={{ width: "200px", margin: "10px 0" }} />}
                </label>
                <label>
                    <span>file</span>
                    <input type="file" onChange={handlePdfChange} />
                </label>
                <button type="submit">edit</button>
            </form>
            <div>
                {deleteConfirmation && <div><span>are u sure?</span> <button type="button">delete</button></div>}
            </div>
        </div>
    )
}

export default EditPoetryForm