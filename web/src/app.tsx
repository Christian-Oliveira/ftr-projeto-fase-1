import { ListUrls } from "./components/list-urls"
import { RegisterUrlForm } from "./components/register-url-form"

export function App() {
  return (
    <main className="h-dvh flex flex-col gap-4 p-3 items-center md:flex-row md:justify-center md:items-center">
      <span className="justify-items-center md:justify-items-start">
        <img src="/logo.svg" alt="Logo" className="w-[97px] h-[24px]" />
      </span>
      <RegisterUrlForm />
      <ListUrls />
    </main>
  )
}

export default App
