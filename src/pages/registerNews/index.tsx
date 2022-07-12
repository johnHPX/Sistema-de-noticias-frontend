import axios from "axios"
import { useEffect, useState } from "react"
import Footer from "../../components/footer"
import FormNews from "../../components/formNews"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import { CategoryData } from "../registerCategory"
import "./style.css"

// RegisterNews 
function RegisterNews() {

    const [categoryData, setCategoryData] = useState<CategoryData>({ count: 0, mid: "", categorias: [] })

    useEffect(() => {
        axios.get("http://localhost:4083/categorias")
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
            <Footer />
        </div>
    )
}

export default RegisterNews