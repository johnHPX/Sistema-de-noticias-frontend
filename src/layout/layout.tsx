import Footer from "../components/footer"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout