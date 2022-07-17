import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/button"
import Footer from "../../components/footer"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import { APIHost } from "../../main"
import "./style.css"

// ViewNews 
function ViewNews() {

    const menuLinks: MenuLink[] = [{
        url: "/",
        text: "home"
    }]

    interface Content {
        cid: string
        subTitulo: string
        texto: string
    }

    interface News {
        id: string
        titulo: string
        conteudos: Content[]
        categoria: string
    }


    const [newsData, setNewsData] = useState<News>({ id: "", titulo: "", categoria: "", conteudos: [] })
    const { id } = useParams()

    useEffect(() => {
        axios.get(`${APIHost}noticia/${id}/find?mid=ok`)
            .then(response => {
                setNewsData(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const deleteNews = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        const resp = window.prompt("você que realmente deletar essa categoria? [sim/nao]")
        if (resp == "sim") {
            axios.delete(`${APIHost}noticia/${id}/remove`)
                .then(response => {
                    console.log(response)
                    window.alert("Deletado com sucesso!")
                    window.location.href = "/"
                })
                .catch(error => console.log(error))
        }
    }


    return (
        <div className="viewNews">
            <Header links={menuLinks} search={false} />
            <main className="viewNews-main">
                <h1>{newsData.titulo}</h1>
                <h3>{newsData.categoria}</h3>
                {
                    newsData.conteudos.map(value => {
                        return (
                            <>
                                <h2>{value.subTitulo}</h2>
                                <p>{value.texto}</p>
                            </>
                        )
                    })
                }
            </main>

            <div className="actions">
                <Button path={`/news/${newsData.id}/edit`} textButton="Edit News" />
                <button className="delete" onClick={(e) => deleteNews(e, newsData.id)}>Deletar</button>
            </div>
            <Footer />
        </div>
    )
}

export default ViewNews