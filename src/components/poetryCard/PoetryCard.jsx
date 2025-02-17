import { Link } from "react-router-dom"
import css from './poetryCard.module.css'


const PoetryCard = ({ i, poetryId, coverUrl, name, about }) => {
    return (
        <Link to={poetryId} className={css.link}>
            <div className={css.card}>
                <div className={css.cardContent}>
                    <h3 className={css.bookTitle}>{name}</h3>
                    <img src={coverUrl} alt="cover" className={css.bookCover} />
                    <span className={css.lineDecoration}></span>       
                    <p>{about}...</p>
                </div>
            </div>
                    
        </Link>
    )
}

export default PoetryCard