import { useEffect, useState } from "react"
import api from "api"
import css from './inbox.module.css'

const Inbox = () => {
    const [inbox, setInbox] = useState(null)
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false)

    useEffect(() => {
        api.getInbox().then(res => {
            console.log(res)
            setInbox(res.data)
        })
    }, [])

    const handleFeedbackBtnClick = async id => {
        // const found = inbox.find(({ feedbackId }) => feedbackId === id)

        const found = await api.getFeedbackById({ feedbackId: id })

        if (!found) {
            return
        }
        // console.log(found)
        setBody(found.data.body)
        setEmail(found.data.email)
        setIsFeedbackVisible(!isFeedbackVisible)
    }

    return (<div className={`${css.fadeIn} ${css.container}`}>
    {<div className={css.ul}>
            {inbox?.map(message => {
            console.log(message)
            return (
                <button className={`${message.opened ? css.openedFeedback : css.unopenedFeedback} ${css.feedbackBtn}`} key={message.feedbackId} onClick={() => handleFeedbackBtnClick(message.feedbackId)}>
                    <p><strong>{message.email}</strong></p>
                    <p><strong>Message:</strong> {message.body.slice(0, 50)}{message.body.length > 50 ? "..." : ""}</p>
                </button>
                )
            })}
        </div>}
        <div> 
            {isFeedbackVisible && <div className={css.feedbackViewer}>
                <p className={css.email}><strong>From: {email}</strong></p>
                <p>{body }</p>
            </div>}
        </div>
</div>)
}

export default Inbox