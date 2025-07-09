import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "../../components/card"
import { CardBody } from "../../components/card/card-body"
import { useEffect, useState } from "react"
import { urlsApi } from "../../commons/resources/urls-resources"

export function RedirectPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
  const [urlOriginal, setUrlOriginal] = useState()

  useEffect(() => {
    setIsRedirecting(true)
    urlsApi.getOriginalUrl(pathname)
      .then(response => {
        setUrlOriginal(response.originalUrl)
        window.location.replace(response.originalUrl)
      })
      .catch(() => {
        navigate("/url/not-found")
      })
      .finally(() => {
        setIsRedirecting(false)
      })
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 m-4">
      <Card className="max-w-[580px] p-10">
        <CardBody>
          <div className="flex flex-col items-center justify-center">
            <img src="/logo-icon.svg" alt="Logo Icon" className="w-[48px] h-[48px]" />
            <span className="text-xl mb-8">Redirecionando...</span>
            <p className="text-center text-md">
              O link será aberto automaticamente em alguns instantes.<br />
              {!isRedirecting && (
                <>
                  Não foi redirecionado? <a className="text-blue-base underline" href={urlOriginal}>Acesse aqui</a>
                </>
              )}
            </p>
          </div>
        </CardBody>
      </Card>
    </main>
  )
}