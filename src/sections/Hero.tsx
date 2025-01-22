import * as React from 'react'
import { Button } from "@/components/ui/button"
import { BrainIcon, ChevronDown, CircleIcon, EyeIcon, ShieldHalf, SwordsIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'
import MeetingButton from '@/MeetingButton'
import { DemoButton } from '@/DemoButton'

export default function Hero() {
  const { userType, content } = useContext(UserContext)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white/70 py-12">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">

        {/* Title */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-thin text-white tracking-wide">
            {/* {content.title} */}
            Build and <span className="font-semibold">orchestrate</span> your AI browser <span className="font-semibold">workforce</span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-base sm:text-lg lg:text-xl mb-12 text-gray-400 max-w-2xl mx-auto"
        >
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-400 tracking-wide">
            {content.subtitle}
          </p>
        </motion.div>

        <DemoButton />

        {/* Animated YC badge */}
        <YCBadge />

      </div >


      {/* Scroll indicator */}
      < div className="absolute bottom-16 w-full flex justify-center" >
        <ChevronDown
          size={48}
          className="text-white hover:text-white/70 transition-colors cursor-pointer animate-bounce"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        />
      </div >
    </div >
  )
}


// Split the YC badge into 2 parts, and animate them in and out
function YCBadge() {
  return (
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="flex items-center justify-center gap-3 text-gray-400"
      >
        <span className=" pb-[4px] mr-[-5px] text-gray-600">backed by</span>
        <a
          href="https://www.ycombinator.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/yc.png"
            alt="Y Combinator"
            className="h-8"
          />
        </a>
      </motion.div>
    </div>
  )
}
