import api from "api"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { logIn, refreshUser } from '../redux/auth/operations';
import { useAuth } from "hooks";
import { useEffect } from "react";

const Signin = () => {
    const dispatch = useDispatch()
    const { isRefreshing } = useAuth();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSigninSubmit = async e => {
        e.preventDefault();
        dispatch(
            logIn({
                email,
                password
            })
        );
        // const res = await api.signIn({ email, password })
        // console.log(res)
        // if (res.status === 200) {
        //     localStorage.setItem('token', `${res.data.token}`)

        // }
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }
    return isRefreshing ? (
        <b>Refreshing user...</b>
    ) : (
        <>
            <div>
                <form onSubmit={handleSigninSubmit}>
                    <label>
                        <span>email</span>
                        <input type="text" value={email} onChange={handleEmailChange} />
                    </label>
                    <label>
                        <span>password</span>
                        <input type="text" value={password} onChange={handlePasswordChange} />
                    </label>
                    <button type="submit">login</button>
                </form>
            </div>
        </>
    )
}

export default Signin