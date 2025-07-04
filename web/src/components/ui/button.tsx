import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: "rounded-lg px-[20px] font-semibold",
  variants: {
    variant: {
      primary: "bg-indigo-700 text-white hover:bg-indigo-600",
      secondary: "bg-zinc-200 text-gray-500 hover:text-gray-700",
    },
    size: {
      sm: "text-sm py-2.5",
      md: "text-md py-3",
      lg: "text-lg py-4",
    },
  },

  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
})

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />
}