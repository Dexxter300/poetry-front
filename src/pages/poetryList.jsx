import api from "api";
import PoetryCard from "components/poetryCard/PoetryCard";
import { useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";

const PoetryList = () => {
    const [poetryList, setPoetryList] = useState([])
    useEffect(() => {
        api.getPoetry({ page: 0, limit: 100 }).then(res => {
            console.log(res)
            setPoetryList(res.data.poetry)
        })
    }, [])

    return (<div>
        <div>
        </div>
        <div><div>
            {poetryList?.map((poetry, i) => {
                return <PoetryCard key={i} poetryId={poetry.poetryId} coverUrl={poetry.coverUrl} name={poetry.name} about={poetry.about}/>

            })}
        </div></div>
    </div>)
}

export default PoetryList