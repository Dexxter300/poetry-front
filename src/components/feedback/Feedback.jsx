import { useState } from 'react'
import api from '../../api'


//for future: add some kind of limit for sending feedbacks so database wont be stuffed with a lot of data + maybe autodelete feedbacks after some period of time
// maybe I can track ip and based on users ip set limit like 1 feedback a hour
const Feedback = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (!email) {
            console.log('sosi nigga')
            return
        }
        if (message.length > 500) {
            console.log('sosi negr pidr')
            return
        }
        // console.log(message.length)
        const res = api.sendFeedback({ email, message }).then(r => console.log(r))
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handleMessageChange = e => {
        setMessage(e.target.value)
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                <span>email</span>
                <input type="text" name='email' value={email} onChange={handleEmailChange} />
            </label>
            <label>
                <span>mes</span>
                <textarea name='mes' rows='10' value={message} onChange={handleMessageChange} />
            </label>
            <button type='submit'>send</button>
        </form>
    </div>)
}

export default Feedback