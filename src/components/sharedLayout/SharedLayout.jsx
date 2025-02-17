import { Outlet, NavLink } from "react-router-dom"
import { Suspense } from "react"
import Fallback from "components/fallback/Fallback"
import css from './sharedLayout.module.css'
import Footer from "components/footer/Footer"

const SharedLayout = () => {
    return (
        <>
            <header className={css.header}>
                <nav className={css.nav}>
                    <NavLink to="/about" className={css.navLink}>About</NavLink>
                    <NavLink to="/poetry" className={css.navLink}>Poetry</NavLink>
                    <NavLink to="/blog" className={css.navLink}>Blog</NavLink>
                </nav>
            </header>
            <main className={css.main}>
            <Suspense fallback={<Fallback/>}>
                <Outlet/>
            </Suspense>
            </main>
            <Footer/>
            
    </>
)
}

export default SharedLayout