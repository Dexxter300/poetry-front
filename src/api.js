import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001/api'
//handle error in every catch

const signIn = async (userData) => {
    // try {
    const res = await axios.post('auth/signin', userData)
    console.log(res)
    localStorage.setItem('token', res.token) // add res.token (might be called differently)
    return res
    // } catch (error) {
    //     console.log(error)
    //     return
    // }
}

const getVisitData = async (month) => {
    try {
        const res = await axios.get(`/admin/get-visit-stats/${month}`)
        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return
    }
}

const getInbox = async () => {
    try {
        const res = await axios.get(`/feedback/`)
        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return
    }
}

const addPoetry = async (poetry) => {
    try {
        const res = await axios.post(`/poetry`, poetry)
        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return
    }
}

const editPoetry = async ({ poetryId, poetry }) => {
    try {
        const res = await axios.patch(`/poetry/${poetryId}`, poetry)
        // console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return
    }
}

const deletePoetry = async ({ poetryId }) => {
    try {
        const res = await axios.delete(`/poetry/${poetryId}`)
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return
    }
}

const getPoetryById = async ({ poetryId }) => {
    try {
        const res = await axios.get(`/poetry/${poetryId}`)
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return
    }
}

const sendVisit = async () => {
    try {
        const res = await axios.post('admin/send-visit')
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

const sendFeedback = async ({ email, message }) => {
    try {
        const res = await axios.post('/feedback', { email, body: message })
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}
//get-upload-url

const getCloudinaryUploadUrl = async () => {
    try {
        const res = await axios.get("/poetry/get-upload-url")
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

const postImgToCloudinary = async (url, formData) => {
    console.log(url)
    delete axios.defaults.headers.common["Authorization"];
    try {
        const res = await axios.post(url, formData)
        const token = localStorage.getItem('token')
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

// const getPdfUploadUrl = async () => {
//     try {

//     } catch (error) {

//     }
// }

const postPdfToCloudinary = async (url, formData) => {
    delete axios.defaults.headers.common["Authorization"];
    try {
        const res = await axios.post(url, formData)
        const token = localStorage.getItem('token')
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

const postBlog = async (blogPost) => {
    try {
        const res = await axios.post("/blog/post", blogPost)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}



const getPoetry = async ({ page = 0, limit = 100 }) => {
    try {
        const res = await axios.get(`/poetry?page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

const getCurrent = async (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // try {
    const res = await axios.get('/auth/current')
    return res
    // } catch (error) {
    //     console.log(error)
    //     return error
    // }
}

const getBlog = async ({ page = 0, limit = 100 }) => {
    try {
        // const res = await axios.get('/blog', {
        //     headers: {
        //         page,
        //         limit
        //     }
        // })
        const res = await axios.get(`/blog?page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

const getBlogById = async ({ postId }) => {
    try {
        const res = await axios.get(`/blog/post/${postId}`)
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export default { getVisitData, getInbox, sendVisit, sendFeedback, postBlog, getCloudinaryUploadUrl, postImgToCloudinary, addPoetry, getPoetry, signIn, getCurrent, getBlog, getBlogById, postPdfToCloudinary, getPoetryById, editPoetry, deletePoetry }