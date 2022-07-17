import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../../components/footer"
import FormNewsEdit from "../../components/formNews/formNewsEdit"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import { APIHost } from "../../main"
import { CategoryData } from "../registerCategory"
import "./style.css"

// EditNews 
function EditNews() {

    const { id } = useParams()

    const menuLinks: MenuLink[] = [
        {
            url: "/",
            text: "home"
        }, {
            url: `/news/${id}`,
            text: "view news"
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
        mid: string
    }

    const [dataCategory, setDataCategory] = useState<CategoryData>({ categorias: [], count: 0, mid: "" })

    useEffect(() => {
        axios.get(`${APIHost}categorias`)
            .then(response => {
                setDataCategory(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    return (
        <div className="editNews">
            <Header links={menuLinks} search={false} />
            <main className="editNews-main">
                <FormNewsEdit categoryData={dataCategory} id={id as string} />
            </main>
            <Footer />
        </div>
    )
}

export default EditNews