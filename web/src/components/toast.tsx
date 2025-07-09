import type { ToastContentProps } from "react-toastify"

type CustomToastifyProps = ToastContentProps<{
  title: string,
  content: string,
}>

export function CustomToastify({
  data,
}: CustomToastifyProps) {
  return (
    <div className="flex flex-col w-full">
      <h3
        className='text-sm font-semibold'
      >
        {data.title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm">{data.content}</p>
      </div>
    </div>
  )
}