import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditCategory from "../pages/editCategory"
import EditNews from "../pages/editNews"
import Home from "../pages/home"
import RegisterCategory from "../pages/registerCategory"
import RegisterNews from "../pages/registerNews"
import ViewNews from "../pages/viewNews"


// AppRouter configura as rotas da aplicação
function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/category" element={<RegisterCategory />}></Route>
        <Route path="/news" element={<RegisterNews />}></Route>
        <Route path="/news/:id" element={<ViewNews />}></Route>
        <Route path="/category/:id/edit" element={<EditCategory />}></Route>
        <Route path="/news/:id/edit" element={<EditNews />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
