import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/button'
import { urlInputs, type UrlRequestType } from '../../commons/adapters/url-adapter'
import { urlsApi } from '../../commons/resources/urls-resources'
import { Card } from '../../components/card'
import { CardTitle } from '../../components/card/card-title'
import { CardBody } from '../../components/card/card-body'
import { WarningIcon } from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import { CustomToastify } from '../../components/toast'
import { useUrlsStore } from '../../commons/store/urls-store'

export function RegisterUrlForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrlRequestType>({
    resolver: zodResolver(urlInputs),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchUrls = useUrlsStore((state) => state.fetchUrls)

  const handleRegisterUrl: SubmitHandler<UrlRequestType> = async (data) => {
    setIsLoading(true)
    await urlsApi.createUrl(data)
      .then(() => {
        fetchUrls()
        reset()
        toast.success("URL cadastrada com sucesso.")
      })
      .catch((error) => {
        toast.error(CustomToastify, {
          data: {
            title: "Erro no cadastro",
            content: error?.response?.data?.message,
          }
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Card size="sm">
      <CardTitle>Novo link</CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit(handleRegisterUrl)}>
          <div className="flex flex-col gap-4">
            <div
              data-error={errors.originalUrl?.message && "error"}
              className="group flex flex-col gap-2 has-[input:focus]:[&>label]:text-blue-base has-[input:focus]:[&>label]:font-bold"
            >
              <label htmlFor="originalUrl" className="text-xs text-gray-500 transition-colors group-data-[error=error]:text-danger group-data-[error=error]:font-bold">Link original</label>
              <div className="flex items-center rounded-lg bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-blue-base group-data-[error=error]:outline-danger">
                <input
                  type="text"
                  id="originalUrl"
                  className="block min-w-0 grow py-3.5 pr-3 pl-1 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none"
                  placeholder="www.exemplo.com.br"
                  {...register("originalUrl")}
                />
              </div>
              {errors.originalUrl?.message && (
                <div className="flex flex-row gap-2 items-center">
                  <WarningIcon size={16} className="text-danger" />
                  <p className="text-sm font-extralight leading-4">{errors.originalUrl?.message}</p>
                </div>
              )}
            </div>

            <div
              data-error={errors.shortenedUrl?.message && "error"}
              className="group flex flex-col gap-2 has-[input:focus]:[&>label]:text-blue-base has-[input:focus]:[&>label]:font-bold"
            >
              <label htmlFor="shortenedUrl" className="text-xs text-gray-500 transition-colors group-data-[error=error]:text-danger group-data-[error=error]:font-bold">Link encurtado</label>
              <div className="flex items-center rounded-lg bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-blue-base group-data-[error=error]:outline-danger">
                <div className="shrink-0 text-sm text-gray-400 select-none">brev.ly/</div>
                <input
                  type="text"
                  id="shortenedUrl"
                  className="block min-w-0 grow py-3.5 pr-3 pl-0.5 text-sm text-gray-900 focus:outline-none"
                  {...register("shortenedUrl")}
                />
              </div>
              {errors.shortenedUrl?.message && (
                <div className="flex flex-row gap-2 items-center">
                  <WarningIcon size={16} className="text-danger" />
                  <p className="text-sm font-extralight leading-4">{errors.shortenedUrl?.message}</p>
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? (
                "Salvando..."
              ) : (
                "Salvar link"
              )}

            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}