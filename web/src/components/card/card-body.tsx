import type { ComponentProps } from "react"

type CardBodyType = ComponentProps<"div"> & {
  children: React.ReactNode,
}

export function CardBody({ children, ...props }: CardBodyType) {
  return (
    <div className="p-6" {...props}>{children}</div>
  )
}