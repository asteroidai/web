import * as React from 'react'
import { useContext, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Box, BarChart2, History, ToggleLeft, Swords, Code, FileX, Wrench, Bell, CheckCircle, Video, Brain, RefreshCw, UserPlus, Shield, BookOpen, Boxes, Server } from "lucide-react"
import Terminal from './Terminal'
import { UserContext } from './contexts/UserContext'
import { cn } from './lib/utils'
import { motion, AnimatePresence } from "framer-motion"
import { Image } from './Image'

export default function TabsWithContent() {
  const [activeTab, setActiveTab] = useState("one")
  const [autoRotate, setAutoRotate] = useState(true)
  const { content } = useContext(UserContext)

  const tabs = ["one", "two", "three", "four", "five"]

  // Auto rotate tabs
  React.useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveTab(current => {
        const currentIndex = tabs.indexOf(current)
        return tabs[(currentIndex + 1) % tabs.length]
      })
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [autoRotate])

  // Handle manual tab changes
  const handleTabChange = (value: string) => {
    setAutoRotate(false) // Stop auto-rotation when user clicks
    setActiveTab(value)
  }

  return (
    <div className="w-full mx-auto py-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="flex flex-col md:flex-row w-full min-h-12 bg-transparent gap-2 md:gap-4 overflow-y-auto md:overflow-x-auto">
          <TabTrigger value="one" icon={<Box className="w-4 h-4" />}>
            Two line integration
          </TabTrigger>
          <TabTrigger value="two" icon={<BarChart2 className="w-4 h-4" />}>
            Human in the loop
          </TabTrigger>
          <TabTrigger value="three" icon={<History className="w-4 h-4" />}>
            Autonomous Learning
          </TabTrigger>
          <TabTrigger value="four" icon={<ToggleLeft className="w-4 h-4" />}>
            Intelligent Guardrails
          </TabTrigger>
          <TabTrigger value="five" icon={<Swords className="w-4 h-4" />}>
            Massively scalable
          </TabTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-6">
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === "one" && <OneLineIntegrationContent />}
            {activeTab === "two" && <HumanInTheLoopContent />}
            {activeTab === "three" && <AutonomousLearningContent />}
            {activeTab === "four" && <IntelligenceGuardrailsContent />}
            {activeTab === "five" && <MassivelyScalableContent />}
          </AnimatePresence>
        </div>
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
function ContentWrapper({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex flex-col w-full pt-8 gap-8"
    >
      {title && (
        <div className="text-center">
          <h1 className="text-xl text-indigo-400">{title}</h1>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        {children}
      </div>
    </motion.div>
  )
}

function OneLineIntegrationContent() {
  return (
    <ContentWrapper title="Deploy automation in minutes, not weeks">
      <div className="flex flex-col gap-4 h-96 w-128">
        <Terminal code={`
from asteroid_sdk import web_task

result = web_task.run(
  f"Update details for our 50 real estate listings ...", 
  workflow_id="real_estate_listings"
U)
        `} allowClose={true} />
      </div>
      <div className="text-gray-400">
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-500" />
            <span className="text-lg">Launch powerful browser automations with a single line of code</span>
          </li>
          <li className="flex items-center gap-2">
            <FileX className="w-5 h-5 text-indigo-500" />
            <span className="text-lg" >No complex configuration or trawling through API docs</span>
          </li>
          <li className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-500" />
            <span className="text-lg">No manual maintenance of automation scripts</span>
          </li>
        </ul>
      </div>
    </ContentWrapper>
  )
}

function HumanInTheLoopContent() {
  return (
    <div className="flex flex-col gap-6 text-gray-400">
      <ContentWrapper title="Maintain high accuracy, and still scale">
      </ContentWrapper>

      <ContentWrapper>
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <img
            src="/features/linkedin.png"
            alt="Screenshot"
            className="w-auto h-auto rounded-lg shadow-md"
          />
        </motion.div>
        <motion.div
          className="flex-1 flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <BulletPointGradient l2r={true}>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                <span className="text-lg">Get instant alerts for uncertain situations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-500" />
                <span className="text-lg">Review and approve agent actions in real-time</span>
              </li>
              <li className="flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-500" />
                <span className="text-lg">Access full session recordings for oversight</span>
              </li>
            </ul>
          </BulletPointGradient>
          <img
            src="/features/inlinereview.png"
            alt="Screenshot"
            className="w-auto mt-4 h-auto rounded-lg shadow-md"
          />
        </motion.div>
      </ContentWrapper>
    </div>
  )
}

function AutonomousLearningContent() {
  return (
    <ContentWrapper title="Complex workflows, automated without programming">
      <div className="text-gray-400 flex flex-col gap-8">
        <BulletPointGradient l2r={true}>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              <span className="text-lg">Self-learns and replicates complex workflows</span>
            </li>
            <li className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-indigo-500" />
              <span className="text-lg">Adapts automatically to website changes</span>
            </li>
            <li className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-500" />
              <span className="text-lg">Improves from every human interaction</span>
            </li>
          </ul>
        </BulletPointGradient>
      </div>
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Image
          src="/features/rundetails.png"
          alt="Run Details Screenshot"
          className="w-auto h-auto rounded-lg shadow-md"
        />
      </motion.div>
    </ContentWrapper>
  )
}

function IntelligenceGuardrailsContent() {
  return (
    <ContentWrapper title="Prevent costly mistakes on mission critical workflows">
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Image
          src="/features/supervisors.png"
          alt="Supervisors Interface"
          className="w-auto h-auto rounded-lg shadow-xl border border-indigo-500/20"
        />
      </motion.div>
      <div className="text-gray-400 flex flex-col gap-8">
        <BulletPointGradient l2r={true}>
          <ul className="space-y-6">
            <li className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-indigo-400" />
              <span className="text-lg">Set and enforce safety boundaries in real-time</span>
            </li>
            <li className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span className="text-lg">Use pre-built rules for popular websites</span>
            </li>
          </ul>
        </BulletPointGradient>
      </div>
    </ContentWrapper>
  )
}

function MassivelyScalableContent() {
  return (
    <ContentWrapper title="Scale massively, outsource the headache">
      <div className="text-gray-400 flex flex-col gap-8">
        <div className="bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent p-6 rounded-lg backdrop-blur-sm">
          <ul className="space-y-6">
            <li className="flex items-center gap-3">
              <Boxes className="w-5 h-5 text-indigo-400" />
              <span className="text-lg">Run 1000+ concurrent sessions on demand</span>
            </li>
            <li className="flex items-center gap-3">
              <Server className="w-5 h-5 text-indigo-400" />
              <span className="text-lg">No browser or server management needed</span>
            </li>
          </ul>
        </div>

        <div className="bg-transparent transparent rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-indigo-400">Built to scale</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechItem icon={<img src="/tech/icons8-golang-96.svg" alt="Go" className="w-8 h-8" />} name="Go" />
            <TechItem icon={<img src="/tech/icons8-kubernetes-96.svg" alt="Kubernetes" className="w-8 h-8" />} name="Kubernetes" />
            <TechItem icon={<img src="/tech/OpenTelemetry.svg" alt="OpenTelemetry" className="w-8 h-8" />} name="OpenTelemetry" />
          </div>
        </div>
      </div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <img
          src="/features/runs.png"
          alt="Concurrent Runs"
          className="w-auto h-auto rounded-lg shadow-xl border border-indigo-500/20"
        />
      </motion.div>
    </ContentWrapper>
  )
}

interface BulletPointGradientProps {
  children: React.ReactNode
  l2r?: boolean
}

function BulletPointGradient({ children, l2r = false }: BulletPointGradientProps) {
  return (
    <div className={cn(l2r ? "bg-gradient-to-r from-indigo-500/10 to-transparent p-6 rounded-lg backdrop-blur-sm" : "bg-gradient-to-l from-indigo-500/10 to-transparent p-6 rounded-lg backdrop-blur-sm")}>
      {children}
    </div>
  )
}

interface TechItemProps {
  icon: React.ReactNode;
  name: string;
}

function TechItem({ icon, name }: TechItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-transparent hover:bg-white/10 transition-colors">
      {icon}
    </div>
  )
}
