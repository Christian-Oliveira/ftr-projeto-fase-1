
type CardTitleProps = {
  children: React.ReactNode,
  actions?: React.ReactNode,
}

export function CardTitle({ children, actions }: CardTitleProps) {
  return (
    <div className="flex flex-row items-center justify-between mx-6 mt-6">
      <span className="text-lg">{children}</span>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}