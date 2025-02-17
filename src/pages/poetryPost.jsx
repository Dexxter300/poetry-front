import { useEffect, useState } from "react"
import Pdf from '../components/pdf/Pdf'
import api from "api"
import { useParams } from "react-router-dom"

const PoetryPostPage = () => {
    const { poetryId } = useParams()
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [fileUrl, setFileUrl] = useState(null)

    console.log(poetryId)
    useEffect(() => {
        api.getPoetryById({ poetryId }).then(r => {
            console.log(r)
            setTitle(r.data.title)
            setFileUrl(r.data.body)
        })
    }, [])

    const goNextPage = () => {

    }

    const goPrevPage = () => {

    }
    return (<div>
        <Pdf fileUrl={fileUrl} />
    </div>)

}

export default PoetryPostPage