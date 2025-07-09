import type { ComponentProps } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = tv({
  base: "font-semibold",
  variants: {
    variant: {
      primary: "bg-blue-base text-white hover:bg-blue-dark disabled:bg-blue-base/70",
      secondary: "bg-gray-200 text-gray-500 border-2 border-gray-200 hover:border-blue-base disabled:bg-gray-200/50 disabled:border-gray-200/50 disabled:text-gray-500/50",
      none: "",
    },

    size: {
      default: "h-12 rounded-lg",
      icon: "px-2 py-1 rounded-sm",
      "icon-sm": "p-1 rounded-sm",
      none: "",
    },

  },

  defaultVariants: {
    variant: "secondary",
    size: "default",
  },
})

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  variant,
  size,
  className,
  asChild,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button"

  return <Component className={buttonVariants({ variant, size, className })} {...props} />
}