import * as React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserTypeSwitch } from './UserTypeSwitch'
import { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext'

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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-24">
        {/* Animated YC badge */}
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
        <div className="space-y-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-thin text-white tracking-wide">
            {content.title}
          </h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-base sm:text-lg lg:text-xl mb-12 text-gray-400 max-w-6xl mx-auto"
        >
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-400 tracking-wide">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <UserTypeSwitch />
        </div>
      </div >


      {/* Scroll indicator */}
      < div className="absolute bottom-16 w-full flex justify-center" >
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
      </div >
    </div >
  )
}

