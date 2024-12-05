import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import * as React from "react"
import { GithubIcon, CalendarIcon, MailIcon, TerminalIcon, BookIcon, LibraryIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"
import { MailingList } from "./components/mailing_list"
import { Link } from "react-router-dom"
import Stars from "./Stars"
import Hero from "./Hero"
import Nav from "./Nav"
import Terminal from "./Terminal"
import { DeploymentSteps } from "./Process"
import { KeyFeatures } from "./KeyFeatures"
import Challenges from "./Challenges"
import Step123 from "./Step123"
import Footer from "./Footer"
import { InstallTabs } from "./Install"

export default function Component() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("founders@asteroid.sh")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const features = [
    {
      title: "Real-time Monitoring",
      description: "Monitor and log agent execution with real-time, granular model and action traces.",
      tasks: ["Monitor Agent Behavior", "Detect Milestones", "Investigate Real-time Insights"]
    },
    {
      title: "Supervision Policy Enforcement",
      description: "Define agent goals and policies, control access and execution at a granular level.",
      tasks: ["Control Access & Execution", "Define Agent Goals", "Escalate to Humans"]
    },
    {
      title: "Simulation & Testing",
      description: "Test and simulate agent behavior before real-world deployment.",
      tasks: ["Simulate & Evaluate", "Test Agent Deployment", "Detect Failure Modes"]
    },
    {
      title: "Cognitive Architecture Evaluation",
      description: "Evaluate and update cognitive architectures using comprehensive logged data.",
      tasks: ["Improve Agents", "Evaluate Architectures", "Maintain Agent Capabilities"]
    }
  ]

  const tabsContent = [
    {
      title: "Agent Developers",
      value: "developers",
      challenge: "Creating reliable and safe AI agents for complex, critical tasks.",
      benefits: [
        "Enforce precise control over agent capabilities, ensuring safe development and deployment",
        "Uncover failure modes pre-deployment through comprehensive simulations",
        "Auto-generate test cases and conduct regression testing, accelerating development",
        "Rapidly iterate designs with real-time monitoring and granular insights",
        "Optimize agent performance using detailed execution traces"
      ]
    },
    {
      title: "Agent Operators",
      value: "operators",
      challenge: "Safely deploying and maintaining AI agents in production while ensuring consistent performance.",
      benefits: [
        "Implement fine-grained supervision policies for live environments",
        "Monitor agent actions in real-time, detecting anomalies instantly",
        "Escalate critical decisions to human operators seamlessly",
        "Track key milestones and interactions for compliance and auditing",
        "Safely update deployed architectures without disrupting functionality"
      ]
    },
    {
      title: "Evaluation Researchers",
      value: "researchers",
      challenge: "Assessing agent capabilities, benchmarking performance, and identifying improvement areas.",
      benefits: [
        "Unprecedented control and visibility for thorough capability assessments",
        "Tools to simulate and track various agent scenarios and milestones",
        "Automatic generation of domain-specific evaluations from agent traces",
        "Comprehensive logged data for in-depth decision-making analysis",
        "Advanced tools to compare different cognitive architectures and designs"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Stars as background */}
      <div className="fixed inset-0 z-0">
        <Stars />
      </div>
      {/* Install Tabs */}
      <div className="fixed bottom-8 right-8 z-50 hidden xl:block">
        <InstallTabs />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <Nav />
        <Hero />

        <div className="space-y-64">
          <Step123 />

          <DeploymentSteps />

          <KeyFeatures />

          <Challenges />

        </div>

      </div>
    </div>
  )
}

