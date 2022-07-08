import Button from "../button"
import "./style.css"

// CardNews componente para exibir Noticias
function CardNews() {
    return (
        <article className="card-news">
            <h2>Titulo da Notícia</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda architecto animi voluptatibus facilis repellendus sapiente et voluptas autem, voluptatum nemo aliquam, voluptates placeat minima dolorum est quis aut ad hic.</p>
            <h3>Categoria da Notícia</h3>
            <Button path="/" textButton="Ver Mais" />
        </article>
    )
}

export default CardNews