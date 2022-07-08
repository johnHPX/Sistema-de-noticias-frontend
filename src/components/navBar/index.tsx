import { Link } from "react-router-dom"
import "./style.css"

export interface MenuLink {
    url: string
    text: string
}

// NavBar componente para menu e links daaplicação
function NavBar(prop: { links: MenuLink[] }) {
    return (
        <nav className="navbar">
            <ul>
                {
                    prop.links.map((value, index) => {
                        return (
                            <li key={index}><Link to={value.url}>{value.text}</Link></li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default NavBar