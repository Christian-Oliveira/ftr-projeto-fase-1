import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import { CustomToastify } from '../../components/toast'
import { Button } from '../../components/button'
import type { UrlResonseType } from '../../commons/adapters/url-adapter'
import { urlsApi } from '../../commons/resources/urls-resources'
import { useUrlsStore } from '../../commons/store/urls-store'

type ItemUrlType = {
  data: UrlResonseType,
}

export function ItemUrl(props: ItemUrlType) {
  const { data } = props
  const fetchUrls = useUrlsStore((state) => state.fetchUrls)
  const completedUrlShortened = `${window.location.origin}/${data.shortenedUrl}`

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(completedUrlShortened)
      toast.info(CustomToastify, {
        data: {
          title: "Link copiado com sucesso",
          content: `O link ${data.shortenedUrl} foi copiado para a área de transferência.`
        }
      })
    } catch (err) {
      toast.error("Não foi possível copiar o link para a área de transferência. Tente novamente")
    }
  };

  const handleDeleteUrl = async () => {
    alert(`Você realmente quer apagar o link ${data.shortenedUrl}?`)
    await urlsApi.deleteUrl(data.id)
    fetchUrls()
    toast.success("Link deletado com sucesso.")
  }

  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <div className="flex flex-col items-start">
        <Button
          className="cursor-pointer text-md text-blue-base truncate"
          variant="none"
          size="none"
          onClick={() => {
            window.open(completedUrlShortened, "_blank")
          }}
        >
          <a>{completedUrlShortened}</a>
        </Button>
        <div className="text-sm text-gray-500 truncate">{data.originalUrl}</div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <div className="text-sm text-gray-500 pr-2">{data.accessCount + ' acessos'}</div>
        <Button size="icon-sm" onClick={handleCopyUrl}>
          <CopyIcon size={16} />
        </Button>
        <Button size="icon-sm" onClick={handleDeleteUrl}>
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  )
}