import * as React from 'react'
import { useContext, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Box, BarChart2, History, ToggleLeft, Swords } from "lucide-react"
import Terminal from './Terminal'
import { UserContext } from './contexts/UserContext'
import { cn } from './lib/utils'
import { motion, AnimatePresence } from "framer-motion"

const tabData = [
  {
    title: "Product OS",
    icon: <Box className="w-4 h-4" />,
    content: "View all your important metrics at a glance on the dashboard.",
    code: "console.log('Hello, world!')",
    image: "https://plus.unsplash.com/premium_photo-1674506654010-22677db35bdf?q=80&w=2660&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "purple"
  },
  {
    title: "Product analytics",
    icon: <BarChart2 className="w-4 h-4" />,
    content: "Dive deep into your data with our powerful analytics tools.",
    code: "console.log('Hello, world!')",
    image: "https://images.unsplash.com/photo-1518791841217-8cc77978b23a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "blue"
  },
  {
    title: "Session replay",
    icon: <History className="w-4 h-4" />,
    content: "Generate and export detailed reports for your business needs.",
    code: "console.log('Hello, world!')",
    image: "https://images.unsplash.com/photo-1518791841217-8cc77978b23a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "sky"
  },
  {
    title: "Feature flags",
    icon: <ToggleLeft className="w-4 h-4" />,
    content: "Customize your experience with our flexible settings options.",
    code: "console.log('Hello, world!')",
    image: "https://images.unsplash.com/photo-1518791841217-8cc77978b23a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "amber"
  },
  {
    title: "Experiments",
    icon: <Swords className="w-4 h-4" />,
    content: "Get assistance and answers to your questions in our help center.",
    code: "console.log('Hello, world!')",
    image: "https://images.unsplash.com/photo-1518791841217-8cc77978b23a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "green"
  },
]

export default function TabsWithContent() {
  const [activeTab, setActiveTab] = useState(0)
  const { content } = useContext(UserContext)

  return (
    <div className="w-full mx-auto py-6">
      <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(Number.parseInt(value))}>
        <TabsList className="flex w-full h-12 bg-transparent gap-4 overflow-x-auto">
          {tabData.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "text-gray-400 bg-transparent border-b-0 relative",
                "hover:bg-[#1a1c2e] hover:text-white",
                "hover:after:content-[''] hover:after:absolute hover:after:left-0",
                "hover:after:bottom-0 hover:after:w-full hover:after:h-[1px]",
                "hover:after:bg-gray-900",
                "transition-all duration-300 ease-in-out",
                "data-[state=active]:bg-white/10 data-[state=active]:text-white",
                "font-bold",
                `text-indigo-100`,
                "shadow-[0_0_0_rgba(0,0,0,0)]",
                `hover:shadow-[5px_5px_0_var(--purple-100)]`,
              )}
            >
              <span className={`text-indigo-500`}>{tab.icon}</span>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-6">
        < ContentSection content={tabData[activeTab].content} image={tabData[activeTab].image} code={tabData[activeTab].code} />
      </div>
    </div >
  )
}

function ContentSection({ content, image, code }: { content: string; image: string; code: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col md:flex-row gap-6"
      >
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Terminal code={code} allowClose={true} width={'full'} />
        </motion.div>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <img
            src={image}
            alt="Screenshot"
            width={400}
            height={400}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

