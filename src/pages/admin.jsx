import axios from "axios";
import { useEffect, useState } from "react";
import { getMonthNumber } from "utils/getMonthNumber";
import api from '../api.js'
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth.js";
import { refreshUser } from "../redux/auth/operations.js";
import css from './admin.module.css'

import AddPoetryForm from "components/addPoetryForm/AddPoetryForm.jsx";
import EditPoetryForm from "components/editPoetryForm/EditPoetryForm.jsx";
import Inbox from "components/inbox/Inbox.jsx";
import AddBlogForm from "components/addBlogForm/AddBlogForm.jsx";
import EditBlogForm from "components/editBlogForm/EditBlogForm.jsx";
//add axios baseURL (done) (in a api.js file)
// add edit/delete poetry 
//add inbox 
//add loginization

const AdminPage = () => {

    const dispatch = useDispatch();
    const { isRefreshing } = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    const [stats, setStats] = useState(null)

    const [isPoetryAddVisible, setIsPoetryAddVisible] = useState(false)
    const [isPoetryEditVisible, setIsPoetryEditVisible] = useState(false)
    const [isInboxVisible, setIsInboxVisible] = useState(false)
    const [isBlogAddVisible, setIsBlogAddVisible] = useState(false)
    const [isBlogEditVisible, setIsBlogEditVisible] = useState(false)

    const date = new Date()
    const currentMonth = date.getMonth() + 1

    useEffect(() => {
        api.getVisitData(currentMonth).then(res => {
            console.log(res.data)
            setStats(res.data)
        })
        //add request with the list of poetry for editing and deleting(maybe Its better to do in a different place)
    }, [])

    const handleMonthPick = (e, title, about) => {
        const monthName = e.target.value
        const monthNumber = getMonthNumber(monthName)
        console.log(monthNumber)
        api.getVisitData(monthNumber).then(res => {
            console.log(res)

            setStats(res.data)
        })
        return
    }

    const handlePoetryAddToggle = () => {
        console.log(isPoetryAddVisible)
        setIsPoetryAddVisible(!isPoetryAddVisible)
    }

    const handlePoetryEditToggle = () => {
        setIsPoetryEditVisible(!isPoetryEditVisible)
    }

    const handleInboxToggle = () => {
        setIsInboxVisible(!isInboxVisible)
    }

    const handleBlogAddToggle = () => {
        setIsBlogAddVisible(!isBlogAddVisible)
    }

    const handleBlogEditToggle = () => {
        setIsBlogEditVisible(!isBlogEditVisible)
    }

    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (<>
        <div className="bg-black">
            <div>
                <h1 className="">Statistics</h1>
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
                        unique visits: {stats?.uniqueVisits}
                    </div>
                    <div>
                        average visits per day: {stats?.avgVisits}
                    </div>
                    <div>
                        <h2>country visits</h2>
                        <ul>

                            {stats && Object.entries(stats.countryCounter).map(([key, value]) => {
                                return (<li key={key}>
                                    <span>{key}</span>
                                    <span>-</span>
                                    <span>{value}</span>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            
                {/* //////////////// add poetry form /////////////////////// */}
                <div className={css.btnContainer}>
                    <button className={`${css.btn} ${isPoetryAddVisible ? css.btnActive : ''}`} onClick={handlePoetryAddToggle}>Poetry Add</button>
                    {isPoetryAddVisible && <AddPoetryForm/>}
                </div>

                {/* ////////////////////////// edit poetry form ////////////////////// */}
                <div className={css.btnContainer}>
                    <button className={`${css.btn} ${isPoetryEditVisible ? css.btnActive : ''}`} onClick={handlePoetryEditToggle}>Poetry Edit</button>
                    {isPoetryEditVisible && <EditPoetryForm/>}
                </div>
                {/* //////////////////// inbox ///////////////// */}
                <div className={css.btnContainer}>
                    <button className={`${css.btn} ${isInboxVisible ? css.btnActive : ''}`} onClick={handleInboxToggle}>Inbox</button>
                    {isInboxVisible && <Inbox/>}
                </div>
            {/*//////////////////////// blog form ///////////////////////*/}
                <div className={css.btnContainer}>
                    <button className={`${css.btn} ${isBlogAddVisible ? css.btnActive : ''}`} onClick={handleBlogAddToggle}>Add Blog</button>
                    {isBlogAddVisible && <AddBlogForm/>}
                </div>
                {/* ///////////////////// blog edit form ////////////////////// */}
                <div className={css.btnContainer}>
                    <button className={`${css.btn} ${isBlogEditVisible ? css.btnActive : ''}`} onClick={handleBlogEditToggle}>edit blog</button>
                    {isBlogEditVisible && <EditBlogForm/>}
                </div>
        </div>
    </>)
}
export default AdminPage