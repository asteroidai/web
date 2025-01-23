import * as React from 'react'
import { useContext, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Box, BarChart2, History, ToggleLeft, Swords } from "lucide-react"
import Terminal from './Terminal'
import { UserContext } from './contexts/UserContext'
import { cn } from './lib/utils'
import { motion, AnimatePresence } from "framer-motion"

export default function TabsWithContent() {
  const [activeTab, setActiveTab] = useState("os")
  const { content } = useContext(UserContext)

  return (
    <div className="w-full mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex w-full h-12 bg-transparent gap-4 overflow-x-auto">
          <TabTrigger value="os" icon={<Box className="w-4 h-4" />}>
            Product OS
          </TabTrigger>
          <TabTrigger value="analytics" icon={<BarChart2 className="w-4 h-4" />}>
            Product analytics
          </TabTrigger>
          <TabTrigger value="replay" icon={<History className="w-4 h-4" />}>
            Session replay
          </TabTrigger>
          <TabTrigger value="flags" icon={<ToggleLeft className="w-4 h-4" />}>
            Feature flags
          </TabTrigger>
          <TabTrigger value="experiments" icon={<Swords className="w-4 h-4" />}>
            Experiments
          </TabTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === "os" && <ProductOSContent />}
          {activeTab === "analytics" && <AnalyticsContent />}
          {activeTab === "replay" && <ReplayContent />}
          {activeTab === "flags" && <FlagsContent />}
          {activeTab === "experiments" && <ExperimentsContent />}
        </AnimatePresence>
      </div>
    </div>
  )
}

function TabTrigger({ value, icon, children }: { value: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg",
        "text-gray-400 bg-transparent border-b-0 relative",
        "hover:bg-[#1a1c2e] hover:text-white",
        "hover:after:content-[''] hover:after:absolute hover:after:left-0",
        "hover:after:bottom-0 hover:after:w-full hover:after:h-[1px]",
        "hover:after:bg-gray-900",
        "transition-all duration-300 ease-in-out",
        "data-[state=active]:bg-white/30 data-[state=active]:text-white",
        "font-bold",
        "text-indigo-100",
        "shadow-[0_0_0_rgba(0,0,0,0)]",
        "hover:shadow-[5px_5px_0_var(--purple-100)]",
      )}
    >
      <span className="text-indigo-500">{icon}</span>
      {children}
    </TabsTrigger>
  )
}

// Base content wrapper with animations
function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col md:flex-row gap-6"
    >
      {children}
    </motion.div>
  )
}

function ProductOSContent() {
  return (
    <ContentWrapper>
      <Terminal code={`console.log('Product OS specific code')
        console.log('Product OS specific code')
        console.log('Product OS specific code')
        console.log('Product OS specific code')
        console.log('Product OS specific code')
        `} allowClose={true} width={'full'} />
      <img
        src="/features/linkedin.png"
        alt="Screenshot"
        width={400}
        height={400}
        className="w-full h-auto rounded-lg shadow-md"
      />
      <img
        src="/features/inlinereview.png"
        alt="Screenshot"
        width={400}
        height={400}
        className="w-full h-auto rounded-lg shadow-md"
      />
    </ContentWrapper>
  )
}




function AnalyticsContent() {
  return (
    <div className="flex flex-col gap-6">
      <ContentWrapper>
        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </div>
      </ContentWrapper>

      <ContentWrapper>
        {/* Custom Analytics content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <img
            src="/features/inlinereview.png"
            alt="Screenshot"
            width={400}
            height={400}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <img
            src="/features/inlinereview.png"
            alt="Screenshot"
            width={400}
            height={400}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
      </ContentWrapper>
    </div>
  )
}

function ReplayContent() {
  return (
    <ContentWrapper>
      {/* Custom Analytics content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <img
          src="/features/inlinereview.png"
          alt="Screenshot"
          width={400}
          height={400}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </motion.div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Terminal code="console.log('Product OS specific code')" allowClose={true} width={'full'} />
      </motion.div>
    </ContentWrapper>
  )
}

function FlagsContent() {
  return (
    <ContentWrapper>
      {/* Custom Flags content */}
      ff
    </ContentWrapper>
  )
}

function ExperimentsContent() {
  return (
    <ContentWrapper>
      {/* Custom Experiments content */}

      iffff
    </ContentWrapper>
  )
}

