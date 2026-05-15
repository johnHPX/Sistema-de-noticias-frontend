import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

function RegisterCategory() {


    const menuLinks: MenuLink[] = [
        { url: "/", text: "home" },
        { url: "/news", text: "register news" }
    ]

    const urlAPI = `${APIHost}categorias?mid=ok`

    const [categorysData, setCategorysData] = useState<CategoryData>({
        count: 0,
        categorias: [],
        mid: ""
    })

    function fetchCategories() {
        axios.get(urlAPI).then((response) => {
            setCategorysData(response.data)
        })
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    function deleteCategory(event: React.MouseEvent<HTMLButtonElement>, id: string) {
        const resp = window.prompt("você quer realmente deletar essa categoria? [sim/nao]")
        if (resp == "sim") {
            axios.delete(`${APIHost}categoria/${id}/remove`)
                .then(() => {
                    window.alert("Deletado com sucesso!")
                    fetchCategories()
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="registerCategory">
            <Header links={menuLinks} search={false} />

            <main className="registerCategory-main">

                <div className="formCategory-main">
                    <FormCategory onSuccess={fetchCategories} />
                </div>

                <div className="list-category">
                    <h2>Categorys</h2>
                    <ul>
                        {
                            categorysData.count === 0 ? (
                                <li>Nenhuma Categoria foi Cadastrada!</li>
                            ) : (
                                categorysData.categorias.map(value => (
                                    <li key={value.id}>
                                        <p>{value.kind}</p>

                                        <Link to={`/category/${value.id}/edit`}>
                                            <i className="large material-icons">edit</i>
                                        </Link>

                                        <button onClick={(e) => deleteCategory(e, value.id)}>
                                            <i className="large material-icons">delete</i>
                                        </button>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>

            </main>
        </div>
    )
}

export default RegisterCategory