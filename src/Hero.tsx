import * as React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  const listItems = [
    "Developers and process owners set safeguards for LLM outputs and tool calls",
    "Asteroid enforces safeguards, detects failures, and enables real-time human intervention",
    "Feedback improves agent safety and alignment"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white/70 py-12">
      {/* <Nav /> */}
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <div className="space-y-24">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight font-bold font-['Source_Serif_4'] text-white">
            Make your AI agent production ready.
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-400">
            Deploy <span className="font-semibold italic">safe</span> and <span className="font-semibold italic">reliable</span> AI agents with real-time monitoring and intervention
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-base sm:text-lg lg:text-xl mb-12 text-gray-400 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-start w-full max-w-3xl mx-auto pl-16">
            {listItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="inline-flex items-center gap-4 flex-row items-center backdrop-blur-sm bg-none rounded-md p-2 hover:text-white transition-colors max-w-fit"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full min-w-10 min-h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  {index + 1}
                </div>

                <p className="text-left font-semibold">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div>
          <Link to="https://calendly.com/founders-asteroid/30min">
            <Button
              size="lg"
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
              <span className="relative z-10 flex items-center font-bold tracking-wide">
                Get Access
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 w-full flex justify-center">
        <ChevronDown
          size={48}
          className="text-white/50 hover:text-white/70 transition-colors cursor-pointer animate-bounce"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        />
      </div>
    </div>
  )
}

