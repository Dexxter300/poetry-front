import { useEffect, useState } from "react"
import api from "api"

const Inbox = () => {
    const [inbox, setInbox] = useState(null)

    useEffect(() => {
        api.getInbox().then(res => {
            setInbox(res.data)
        })
    }, [])
    return (<div>
    {<ul>
        {inbox?.map(message => {
            return (
                <li key={message.feedbackId}>{message.body}</li>
                )
            })}
    </ul>}
</div>)
}

export default Inbox