import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/home"


// AppRouter configura as rotas da aplicação
function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
