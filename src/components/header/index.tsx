import { Link } from "react-router-dom"
import NavBar from "../navBar"
import SearchEngine from "../searchEngine"
import "./style.css"
import { MenuLink } from "../navBar/index"
import { DataNews } from "../../pages/home"


// Header componente para cabeçario da pagina
function Header(prop: { links: MenuLink[], textSearch: string, urlAPI: string, dataAPI: React.Dispatch<React.SetStateAction<DataNews>>, entityAPI: string }) {
    return (
        <header className="header-container">
            <div className="logo">
                <h1><Link to={"/"}>News System</Link></h1>
            </div>
            <NavBar links={prop.links} />
            <SearchEngine textInput={prop.textSearch} urlAPI={prop.urlAPI} dataAPI={prop.dataAPI} entityAPI={prop.entityAPI} />
        </header>
    )
}

export default Header