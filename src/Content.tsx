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
import { DeploymentSteps } from "./Steps"
import { KeyFeatures } from "./KeyFeatures"

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
    <div className="relative min-h-screen px-8">
      {/* Stars as background */}
      <div className="fixed inset-0 z-0">
        <Stars />
      </div>

      <Nav />


      {/* Main content */}
      <div className="relative z-10 container mx-auto space-y-16 text-gray-100">

        <Hero />

        <div className="flex items-center justify-center gap-2 py-4">
          <img src="src/y.png" alt="Y Combinator Logo" className="h-4" />
          <span className="text-sm text-muted-foreground">Backed by Y Combinator</span>
        </div>

        <Terminal />

        <DeploymentSteps />

        <KeyFeatures />

        <ChallengeSection />
      </div>
    </div>
  )
}

const ChallengeSection = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold">The Challenge</h2>
    <h3 className="text-xl">How do we ensure reliable and effective AI agent deployment at scale?</h3>
    <p>
      We are rapidly approaching a future where AI agents will be integrated into every service and company, with billions of agents operating autonomously. This paradigm shift presents unprecedented challenges that current supervision techniques are ill-equipped to handle.
    </p>

    <div>
      <h4 className="text-xl font-semibold mb-2">The Emerging Landscape</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li>Agents operating at millions of requests per second will make critical decisions on our behalf</li>
        <li>AI systems will engage in complex interactions with humans and other agents</li>
        <li>Highly capable agents will execute arbitrary code and utilise human tools autonomously</li>
        <li>Self-evolving agents will adapt and improve during runtime</li>
      </ul>
    </div>

    <div>
      <h4 className="text-xl font-semibold mb-2">The Need for Advanced Supervision</h4>
      <p>
        As we transition towards clusters of millions of agents performing critical tasks across the internet, traditional methods become unsustainable. It is imperative that those deploying agents in real-world scenarios have robust systems to supervise, evaluate, and ensure the reliability of their AI systems.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-semibold mb-2">Key Challenges We Address</h4>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Comprehensive Supervision:</strong> Lack of effective solutions for real-time monitoring and control of AI agent actions at scale</li>
        <li><strong>Advanced Simulation:</strong> Insufficient tools for simulating complex scenarios to test agent behavior before deployment</li>
        <li><strong>Continuous Evaluation:</strong> Difficulty in implementing ongoing, automated evaluation of deployed agents to maintain performance and safety</li>
        <li><strong>Regression Testing:</strong> Lack of robust systems for ensuring that agent improvements don't introduce new failure modes</li>
      </ul>
    </div>

    <p>
      Asteroid is building the foundation for a future where billions of AI agents can be deployed reliably, scalably, and safely in any context. Our goal is to ensure that as AI agents become integral to our digital infrastructure, we maintain control, understanding, and trust in their operations through rigorous supervision and evaluation.
    </p>

    <p className="pt-16">
      We're currently working with early adopters to build out this technology. If you're an AI lab or an agent company and would like to test it out, please
      {" "}
      <a href="https://calendly.com/founders-asteroid/30min" target="_blank" rel="noopener noreferrer" className="text-blue-500">
        schedule a meeting
      </a>!
    </p>

    <div className="pt-16">
      <MailingList />
    </div>

    <div className="calendly-inline-widget" data-url="https://calendly.com/founders-asteroid/30min" style={{ minWidth: '320px', height: '700px' }}></div>
    <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>

    <footer className="pt-16 py-8 text-center text-sm flex flex-row justify-between">
      <p>&copy; 2024 Entropy Systems, Inc. All rights reserved.</p>
      <a href="https://github.com/asteroidai/sentinel" target="_blank" rel="noopener noreferrer" className="">
        <GithubIcon className="h-4 w-4 inline" />
      </a>
      <p className="text-center text-xl">
        <a href="mail:founders@asteroid.sh" className="text-blue-500 text-lg">founders@asteroid.sh</a>
      </p>
    </footer>
  </div>
)
