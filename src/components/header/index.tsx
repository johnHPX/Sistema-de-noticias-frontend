import { Link } from "react-router-dom"
import NavBar from "../navBar"
import SearchEngine, { State } from "../searchEngine"
import "./style.css"
import { MenuLink } from "../navBar/index"
import { DataNews } from "../../pages/home"
import { CategoryData } from "../../pages/registerCategory"


// Header componente para cabeçario da pagina
function Header(prop: { links: MenuLink[], search: boolean, textSearch?: string, urlAPI?: string, dataAPI?: State }) {
    return (
        <header className="header-container">
            <div className="logo">
                <h1><Link to={"/"}>News System</Link></h1>
            </div>
            <NavBar links={prop.links} />
            {
                (prop.search) ?
                    <SearchEngine textInput={prop.textSearch} urlAPI={prop.urlAPI} dataAPI={prop.dataAPI} />
                    :
                    <></>
            }

        </header>
    )
}

export default Header