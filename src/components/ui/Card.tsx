import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { wrapperClassName?: string; glowColor?: string; borderGlow?: string }
>(({ className, wrapperClassName, glowColor, borderGlow, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative w-full rounded-2xl z-10 transition-none",
      wrapperClassName
    )}
    {...props}
  >
    {/* Contextual Glowing Border & Outer Drop Shadow */}
    {borderGlow && (
      <div 
        className="absolute inset-0 rounded-2xl z-[-1] opacity-60 blur-[2px]"
        style={{ background: borderGlow }}
      />
    )}

    {/* Specular Highlight & Backdrop */}
    <div className="absolute inset-[1px] rounded-2xl bg-[#020617]/40 backdrop-blur-[24px] z-[-1] overflow-hidden">
      {/* Inner top lighting */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-50" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
    </div>

    {/* Dynamic Background Glow based on card theme */}
    {glowColor && (
      <div
        className="absolute inset-[1px] z-[-1] opacity-0 pointer-events-none rounded-2xl blur-xl"
        style={{ background: glowColor }}
      />
    )}


    <div className={cn("relative z-30 h-full w-full", className)}>
      {children}
    </div>
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
