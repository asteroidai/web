import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

type MeetingButtonProps = {
  size?: "sm" | "lg"
  text?: string
  href?: string
}

export default function MeetingButton({ size = "sm", text = "Book a demo", href = "https://calendly.com/founders-asteroid-hhaf/30min" }: MeetingButtonProps) {
  return (
    <Link to={href}>
      <Button
        size={size}
        className={cn(
          "relative group",
          "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500",
          "before:opacity-100",
          "text-white",
          "transition-all duration-300",
          "hover:scale-105 active:scale-95",
          "shadow-lg shadow-indigo-500/25",
          "overflow-hidden"
        )}
      >
        <span className="relative z-10 flex items-center font-semibold tracking-wide">
          {text}
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
        </span>
      </Button>
    </Link>
  )
}
