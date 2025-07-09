import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home"
import { RedirectPage } from "./pages/redirect"
import { Page404 } from "./pages/errors/404"

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<RedirectPage />} />
      <Route path="/url/not-found" element={<Page404 />} />
    </Routes>
  )
}