import axios from "axios"
import { useEffect, useState } from "react"
import FormNews from "../../components/formNews"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import { APIHost } from "../../main"
import { CategoryData } from "../registerCategory"
import "./style.css"

// RegisterNews 
function RegisterNews() {

    const [categoryData, setCategoryData] = useState<CategoryData>({ count: 0, mid: "", categorias: [] })

    useEffect(() => {
        axios.get(`${APIHost}categorias`)
            .then(response => {
                setCategoryData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const menuLinks: MenuLink[] = [{
        url: "/",
        text: "home"
    }, {
        url: "/category",
        text: "register category"
    }]


    return (
        <div className="registerNews">
            <Header links={menuLinks} search={false} />
            <main className="registerNews-main">
                <FormNews categoryData={categoryData} />
            </main>
        </div>
    )
}

export default RegisterNews