import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../../components/footer"
import FormCategory from "../../components/formCategory"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import { APIHost } from "../../main"
import "./style.css"

interface category {
    id: string,
    kind: string
}

export interface CategoryData {
    count: number,
    categorias: category[],
    mid: string
}

// RegisterCategory 
function RegisterCategory() {

    const menuLinks: MenuLink[] = [{
        url: "/",
        text: "home"
    }, {
        url: "/news",
        text: "register news"
    }]

    const urlAPI = `${APIHost}categorias?mid=ok`
    const [categorysData, setCategorysData] = useState<CategoryData>({ count: 0, categorias: [], mid: "" })

    useEffect(() => {
        axios.get(urlAPI).then((response) => {
            setCategorysData(response.data)
        })
    }, [])

    function deleteCategory(event: React.MouseEvent<HTMLButtonElement>, id: string) {
        const resp = window.prompt("você que realmente deletar essa categoria? [sim/nao]")
        if (resp == "sim") {
            axios.delete(`${APIHost}categoria/${id}/remove`)
                .then(response => {
                    console.log(response)
                    window.alert("Deletado com sucesso!")
                    window.location.href = "/category"
                })
                .catch(error => console.log(error))
        }
    }


    return (
        <div className="registerCategory">
            <Header links={menuLinks} search={false} />
            <main className="registerCategory-main">
                <div className="formCategory-main">
                    <FormCategory />
                </div>

                <div className="list-category">
                    <h2>Categorys</h2>
                    <ul>
                        {
                            (categorysData.count == 0) ?
                                <li>Nenhuma Categoria foi Cadastrada!</li>
                                :
                                categorysData.categorias.map(value => {
                                    return (
                                        <li key={value.id}>
                                            <p>{value.kind}</p>
                                            <Link to={`/category/${value.id}/edit`}><i className="large material-icons">edit</i></Link>
                                            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => deleteCategory(e, value.id)}><i className="large material-icons">delete</i></button>
                                        </li>
                                    )
                                })
                        }

                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default RegisterCategory