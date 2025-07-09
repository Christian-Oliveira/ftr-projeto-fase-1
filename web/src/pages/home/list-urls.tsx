import { Divider } from '../../components/divider'
import { Button } from '../../components/button'
import { ItemUrl } from './item-url'
import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import type { UrlResonseType } from '../../commons/adapters/url-adapter'
import { CardTitle } from '../../components/card/card-title'
import { Card } from '../../components/card'
import { CardBody } from '../../components/card/card-body'
import { BarLoader, FadeLoader } from 'react-spinners'
import { useUrlsStore } from '../../commons/store/urls-store'
import { useEffect, useState } from 'react'
import { urlsApi } from '../../commons/resources/urls-resources'
import { toast } from 'react-toastify'
import { downloadFile } from '../../commons/utils/download-file'

export function ListUrls() {
  const { urls, isLoading, fetchUrls } = useUrlsStore()
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)

  const handleExportUrls = async () => {
    setIsLoadingBtn(true)
    urlsApi.exportUrls()
      .then(response => {
        downloadFile(response.urlDownload)
      })
      .catch(() => {
        toast.error("Error ao exportar links, tente novamente.")
      })
      .finally(() => {
        setIsLoadingBtn(false)
      })
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <Card>
      <div className="px-0.5">
        <BarLoader loading={isLoading} color="#2C46B1" width="100%" className="rounded-t-xl" />
      </div>
      <CardTitle
        actions={
          <Button
            className="flex gap-1 items-center"
            size="icon"
            onClick={handleExportUrls}
          >
            {isLoadingBtn ? (
              <FadeLoader
                height={4}
                margin={-12}
                width={2}
                speedMultiplier={2}
                cssOverride={{ height: 0, width: 4, marginLeft: 12, marginTop: 8 }}
              />
            ) : (
              <DownloadSimpleIcon size={16} />
            )}
            <span>Baixar CSV</span>
          </Button>
        }
      >
        Meus links
      </CardTitle>
      <CardBody className="m-6 max-h-[70vh] overflow-y-auto scrollbar overflow-x-hidden scrollbar-thumb-blue-dark">
        {urls.length > 0 && (
          urls.map((dataUrl: UrlResonseType, index: number) => (
            <div key={index}>
              <Divider />
              <ItemUrl data={dataUrl} />
            </div>
          ))
        )}
        {isLoading && urls.length === 0 && (
          <>
            <Divider />
            <div className="flex flex-col items-center gap-3 pt-4 pb-6 h-30">
              <FadeLoader width={3} speedMultiplier={2} />
              <div className="text-xs text-gray-500">Carregando links...</div>
            </div>
          </>
        )}
        {!isLoading && urls.length === 0 && (
          <>
            <Divider />
            <div className="flex flex-col items-center gap-3 pt-4 pb-6 h-30">
              <LinkIcon size={32} className="text-gray-400" />
              <div className="text-xs text-gray-500">Ainda não existem links cadastrados</div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  )
}