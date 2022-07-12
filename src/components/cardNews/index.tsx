import Button from "../button"
import "./style.css"

// CardNews componente para exibir Noticias
function CardNews(prop: { title: string, text: string, category: string, newsId: string }) {
    return (
        <article className="card-news">
            <h2>{prop.title}</h2>
            <p>{prop.text}</p>
            <h3>{prop.category}</h3>
            <Button path={`/news/${prop.newsId}`} textButton="Ver Mais" />
        </article>
    )
}

export default CardNews