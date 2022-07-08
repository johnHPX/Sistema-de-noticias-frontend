import { Link } from "react-router-dom"
import "./style.css"

// Button componente para navegar pela aplicação
function Button(prop: { path: string, textButton: string, color?: string }) {
    return (
        <>
            <button className="botao"><Link to={prop.path}>{prop.textButton}</Link></button>
        </>
    )
}

export default Button