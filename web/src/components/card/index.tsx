import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const cardVariants = tv({
  base: "bg-zinc-100 rounded-lg w-full h-full",
  variants: {
    size: {
      sm: "md:max-w-sm",
      md: "md:flex-1",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants> & {
  children: React.ReactNode,
}
export function Card({ children, size, className, ...props }: CardProps) {
  return (
    <div className={cardVariants({ size, className })} {...props}>
      {children}
    </div>
  )
}