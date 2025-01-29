import api from '../../api'


//for future: add some kind of limit for sending feedbacks so database wont be stuffed with a lot of data + maybe autodelete feedbacks after some period of time
// maybe I can track ip and based on users ip set limit like 1 feedback a hour
const Feedback = () => {
    const handleSubmit = e => {
        const form = e.target
        console.log(form) 
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                <span>email</span>
                <input type="text" name='email'/>
            </label>
            <label>
                <span>mes</span>
                <input type="text" name='mes'/>
            </label>
            <button type='submit'>send</button>
        </form>
    </div>)
}

export default Feedback