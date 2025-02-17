import css from './footer.module.css'

const Footer = () => {
    return (<footer className={css.footer}>
        <div className={css.container}>
            <div>
                <span>LOGO</span>
                <p>text</p>
            </div>
            <div>
                <h3>Social</h3>
                <ul>
                    <li>inst</li>
                    <li>tg</li>
                    <li>facebook</li>
                </ul>
            </div>
            <div>
                <h3>Text</h3>
                <btn>leave a feedback</btn>
            </div>
        </div>
    </footer>)
}

export default Footer