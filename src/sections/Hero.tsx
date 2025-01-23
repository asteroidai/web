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
import Typewriter from 'typewriter-effect'

function TypingSubtitle() {
  return (
    <div className="h-24 flex items-center justify-center">
      <div className="text-lg sm:text-xl lg:text-2xl text-gray-400 tracking-wide">
        <Typewriter
          options={{
            loop: true,
            delay: 50,
            deleteSpeed: 30,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('Build web automations in plain English')
              .pauseFor(1000)
              .deleteAll(1)
              .typeString('Improve your agent through feedback')
              .pauseFor(1000)
              .deleteAll(1)
              .typeString('Tackle previously impossible web workflows')
              .pauseFor(1000)
              .deleteAll(1)
              .typeString('Scale to millions of tasks with complete control⚡️')
              .pauseFor(1000)
              .deleteAll(1)
              .start();
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const { userType, content } = useContext(UserContext)
  const [isVisible, setIsVisible] = React.useState(true)

  // Add scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition < window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">

        <div className="flex flex-col items-center justify-center gap-6">
          {/* Title */}
          <div className="max-w-3xl mx-auto">
            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-thin text-white tracking-wide">
              {/* {content.title} */}
              {/* Unleash your agentic browser workforce */}
              {/* Browser agents that actually work */}
              Mission critical browser agents at scale
            </h1>
          </div>
          {/* Subheader */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 tracking-wide">
              {/* The fastest way to build browser automations that actually work */}
              Automate previously impossible workflows on the web,
              <br />
              In one line of code.

            </p>
          </div>

          {/* Subtitle */}
          {/* <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12"
          >
            <TypingSubtitle />
          </motion.div> */}
        </div>

        <DemoButton />

      </div >

      {/* Move YC badge outside the main content div and position it fixed */}
      <div className="fixed bottom-8 left-8 z-50">
        <YCBadge isVisible={isVisible} />
      </div>

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

// Update YC badge to accept visibility prop
function YCBadge({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center gap-3 text-gray-400"
      >
        <span className="pb-[4px] mr-[-5px] text-gray-600">backed by</span>
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
