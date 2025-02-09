import api from "api";
import { useEffect, useState } from "react";

const PoetryList = () => {

    const [poetryList, setPoetryList] = useState([])
    useEffect(() => {
        api.getPoetry({ page: 0, limit: 100 }).then(res => {
            console.log(res)
            setPoetryList(res.data)
        })
    }, [])

    return (<div>
        <div>
        </div>
        <div><ul>
            {poetryList?.map((poetry, i) => {
                return (<li key={i}>
                    <img src={poetry.coverUrl} alt="cover" width='200px' height='300px' />
                </li>)
            })}
        </ul></div>
    </div>)
}

export default PoetryList