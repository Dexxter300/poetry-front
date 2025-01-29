import axios from "axios";
import { useEffect, useState } from "react";
import { getMonthNumber } from "utils/getMonthNumber";
import api from '../api.js'
//add axios baseURL (done) (in a api.js file)
// add edit/delete poetry 
//add inbox 
//add loginization

const AdminPage = () => {
    const [stats, setStats] = useState({})
    const [inbox, setInbox] = useState(null)
    const [poetryList, setPoetryList] = useState([])

    //////////////// POETRY ADDING FORM ///////////////////
    const [currentPage, setCurrentPage] = useState('')
    const [currentPageNumber, setCurrentPageNumber] = useState(1)

    const [pageList, setPageList] = useState([])

    const [title, setTitle] = useState('')
    const [img, setImg] = useState(null)
    const [preview, setPreview] = useState(null)
    const [about, setAbout] = useState('')
    const [tag, setTag] = useState(null)
    const [pageTitle, setPageTitle] = useState('')
    const [isEditingMod, setIsEditingMod] = useState(false)
    //////////////// POETRY ADDING FORM ///////////////////



    //////////// BLOG FORM /////////////
    const [blogBody, setBlogBody] = useState('')
    const [blogTitle, setBlogTitle] = useState('')
    /////////// BLOG FORM ///////////////


    const date = new Date()
    const currentMonth = date.getMonth() + 1
    // date.setMonth(currentMonth)
    // const testMonth = date.getMonth()
    // console.log(testMonth)

    useEffect(() => {
        api.getVisitData(currentMonth).then(res => {
            setStats(res.data)
        })
        //add inbox new mesgs
        api.getInbox().then(res => {
            setInbox(res.data)
        })
        //add request with the list of poetry for editing and deleting(maybe Its better to do in a different place)
        //
    }, [])

    const handleMonthPick = (e, title, about) => {
        const monthName = e.target.value
        const monthNumber = getMonthNumber(monthName)
        console.log(monthNumber)
        api.getVisitData(monthNumber).then(res => {
            setStats(res.data)
        })
        return
    }

    const handleAddPoetry = async e => {
        e.preventDefault();
        //add cloudinary requests (done)
        const signResponse = await api.getCoverUploadUrl();
        const signData = await signResponse.data;

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

        const coverUrlResponse = await api.postImgToCloudinary(url, formData)
        console.log(coverUrlResponse)
        const res = await api.addPoetry({
            name: title,
            about,
            pages: pageList,
            coverUrl: coverUrlResponse.data.url
        })
        console.log(res)
        setTitle('')
        setAbout('')
        setPageList([])
        setPageTitle("")
        setCurrentPage('')
        setCurrentPageNumber(1)
        setImg(null)
        setPreview(null)
        setIsEditingMod(false)
        //


        //clear form clear localStorage clear pageList clear title clear about clear tag (nahh it will refresh automaticly)
    }

    const handleAddPage = e => {
        setPageList([...pageList, { title: pageTitle, body: currentPage }])
        setCurrentPageNumber(currentPageNumber + 1)
        setCurrentPage('')
        setPageTitle('')
    }

    const handlePickPage = e => {
        const pageNumber = e.target.textContent
        const pageArray = pageNumber.split("-")
        setCurrentPageNumber(pageArray[1])
        const pageIndex = Number(pageArray[1]) - 1
        setCurrentPage(pageList[pageIndex].body)
        setPageTitle(pageList[pageIndex].title)
        setIsEditingMod(true)
    }

    const handleSubmitEditPage = e => {
        const pageIndex = currentPageNumber - 1;
        const newPageList = pageList;
        newPageList[pageIndex] = { title: pageTitle, body: currentPage };
        setPageList(newPageList);
        setCurrentPageNumber(pageList.length + 1);
        setCurrentPage('');
        setPageTitle('');
        setIsEditingMod(false);

    }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const handleAboutChange = e => {
        setAbout(e.target.value);
    }

    const handleTagChange = e => {
        setTag(e.target.value);
    }

    const handleCurrentPageChange = e => {
        setCurrentPage(e.target.value);
    }

    const handlePageTitleChange = e => {
        setPageTitle(e.target.value);
    }
    const handleFileChange = e => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setImg(file);
            setPreview(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    const handleAddBlogPost = e => {
        e.preventDefault();
        api.postBlog({ title: blogTitle, body: blogBody })
        setBlogBody('')
        setBlogTitle('')
    }

    const handleBlogTitleChange = e => {
        setBlogTitle(e.target.value)
    }

    const handleBlogBodyChange = e => {
        setBlogBody(e.target.value)
    }


    const handleBlogListFetch = e => {

    }

    const handlePoetryFetch = e => {
        const poetry = api.getPoetry()
        setPoetryList(poetry)

    }

    const handleBlogPick = e => {

    }

    const handlePoetryPick = e => {
        const poetryId = e.target.key
        console.log(poetryId)
    }

    return (<>
        <div>
            <div>
                <h1>Statistics</h1>
                <form>
                    <label>
                        Month:
                        <select name="month" id="" onChange={handleMonthPick}>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </label>
                </form>
                <div>
                    <div>
                        month visits: {stats?.allVisits}
                    </div>
                    <div>
                        <h2>country visits</h2>
                        <ul></ul>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" onClick={handlePoetryFetch}>fetch</button>
                <ul>
                    {poetryList && poetryList.map(poetry => {
                        return (<li key={poetry.poetryId}>{poetry.name}</li>)
                    })}
                </ul>
            </div>
            {/* //////////////// add poetry form /////////////////////// */}
            <div>
                <h2>add poetry</h2>
                <form action="" onSubmit={handleAddPoetry}>
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
                        <span>Page Title</span>
                        <input type="text" name="pageTitle" value={pageTitle} onChange={handlePageTitleChange} />
                    </label>
                    <label>
                        <span>Page-{currentPageNumber}</span>
                        <input type="text" name="page" value={currentPage} onChange={handleCurrentPageChange} />
                        {isEditingMod ? <button type="button" onClick={handleSubmitEditPage}>edit</button> : <button type="button" onClick={handleAddPage}>add Page</button>}
                        {/* <button type="button" onClick={handleAddPage}>add Page</button>
                        <button type="button" onClick={handleSubmitEditPage}>edit</button> */}
                    </label>

                    <button type="submit">POST</button>
                </form>
                <ul onClick={handlePickPage}>
                    {pageList.map((page, index) => {
                        return (<li key={index}>{page.title} | Page-{index + 1}</li>)
                    })}
                </ul>
            </div>
            {<ul>
                {inbox?.map(message => {
                    return (
                        <li key={message.feedbackId}>{message.body}</li>
                    )
                })}
            </ul>}
            {/*//////////////////////// blog form ///////////////////////*/}
            <h2>blog</h2>
            <form onSubmit={handleAddBlogPost}>
                <label>
                    <span>title</span>
                    <input type="text" value={blogTitle} onChange={handleBlogTitleChange} />
                </label>
                <label>
                    <span>text</span>
                    <input type="text" value={blogBody} onChange={handleBlogBodyChange} />
                </label>
                <button type="submit">post</button>
            </form>
        </div>
    </>)
}
export default AdminPage