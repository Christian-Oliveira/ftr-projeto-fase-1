import { DownloadIcon } from 'lucide-react'
import { LinkIcon } from 'lucide-react'
import { Divider } from './ui/divider'
import { Button } from './ui/button'

export function ListUrls() {
  return (
    <div className="bg-zinc-100 w-full max-w-[580px] h-[234px] rounded-lg p-6">
      <div className="flex flex-row items-center justify-between pb-4">
        <span className="text-lg font-bold">Meus links</span>
        <Button className="flex gap-1">
          <DownloadIcon className="w-4 h-4 my-1" />
          <span>Baixar CSV</span>
        </Button>
      </div>
      <Divider />
      <div className="flex flex-col items-center gap-3 pt-4 pb-6 h-30">
        <LinkIcon className="w-9 h-9 text-gray-400" />
        <div className="text-sm text-gray-500">AINDA NÃO EXISTEM LINKS CADASTRADOS</div>
      </div>
    </div>
  )
}