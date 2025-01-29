import { Outlet, NavLink } from "react-router-dom"
import { Suspense } from "react"
import Fallback from "components/fallback/Fallback"

const SharedLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </header>
            <Suspense fallback={<Fallback/>}>
                <Outlet/>
            </Suspense>
            
    </div>
)
}

export default SharedLayout