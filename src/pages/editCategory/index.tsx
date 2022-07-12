import { useParams } from "react-router-dom"
import Footer from "../../components/footer"
import FormCategory from "../../components/formCategory"
import Header from "../../components/header"
import { MenuLink } from "../../components/navBar"
import "./style.css"

// EditNews 
function EditCategory() {

    const { id } = useParams()

    const menuLinks: MenuLink[] = [
        {
            url: "/",
            text: "home"
        }, {
            url: "/category",
            text: "register category"
        }]

    return (
        <div className="editCategory">
            <Header links={menuLinks} search={false} />
            <main className="editCategory-main">
                <FormCategory id={id} />
            </main>
            <Footer />
        </div>
    )
}

export default EditCategory