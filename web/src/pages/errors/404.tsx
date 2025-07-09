import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button"
import { Card } from "../../components/card"
import { CardBody } from "../../components/card/card-body"

export function Page404() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 m-4">
      <Card className="max-w-[580px] p-10">
        <CardBody>
          <div className="flex flex-col items-center justify-center">
            <img src="/icon-404.svg" alt="Logo 404" className="w-[194px] h-[85px]" />
            <span className="text-xl mb-8">Link não encontrado</span>
            <p className="text-center text-md">
              O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
              Saiba mais em{' '}
              <Button
                variant="none"
                size="none"
                className="cursor-pointer text-blue-base underline"
                onClick={() => navigate("/")}
              >
                brev.ly.
              </Button>
            </p>
          </div>
        </CardBody>
      </Card>
    </main>
  )
}