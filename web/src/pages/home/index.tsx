import { ListUrls } from "./list-urls"
import { RegisterUrlForm } from "./register-url-form"

export function HomePage() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-gray-200">
      <div className="flex flex-col items-center md:items-start w-full max-w-5xl p-4 mt-4 md:mt-20">
        <div className="mb-4">
          <img src="/logo.svg" alt="Logo" className="w-[97px] h-[24px]" />
        </div>
        <div className="flex flex-col gap-6 w-full md:flex-row">
          <RegisterUrlForm />
          <ListUrls />
        </div>
      </div>
    </main>
  )
}