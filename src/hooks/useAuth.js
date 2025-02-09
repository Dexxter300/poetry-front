// import axios from "axios";
// import api from "api";

// export const useAuth = async () => {
//     const token = localStorage.getItem("token")

//     if (!token) {
//         return
//     }

//     return true

//     // api.getCurrent(token).then(res => {
//     //     if (res.status === 200) {
//     //         return true
//     //     }
//     //     return false
//     // })



// }

import { useSelector } from 'react-redux';
import {
    selectUser,
    selectIsLoggedIn,
    selectIsRefreshing,
} from '../redux/auth/selectors'

export const useAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectIsRefreshing);
    const user = useSelector(selectUser);

    return {
        isLoggedIn,
        isRefreshing,
        user,
    };
};