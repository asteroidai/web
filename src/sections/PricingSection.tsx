import * as React from 'react'
import { Check, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import MeetingButton from '@/MeetingButton'
import { cn } from '@/utils'
import Section from '@/sections/Section'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const pricingPlans = [
  {
    name: "Builder",
    description: "Perfect for developers and process owners getting started",
    price: "$0",
    period: "/month",
    features: [
      "100 free agent runs monthly",
      "Python SDK access",
      "Web supervision dashboard",
      "Basic monitoring tools",
      "Community Slack support",
    ],
    buttonText: "Get Started",
    buttonVariant: "default",
    buttonHref: "https://platform.asteroid.ai",
    highlighted: false,
    logoSize: "w-12 h-12",
  },
  {
    name: "Startup",
    description: "For growing teams",
    price: "Custom",
    period: "",
    features: [
      "Unlimited pay-as-you-go agent runs",
      "Expert guidance building your agents",
      "Intelligent Agent Safeguards",
      "Performance optimization",
      "Enterprise-grade support and SLAs",
    ],
    buttonText: "Contact Us",
    buttonVariant: "outline",
    buttonHref: "https://calendly.com/founders-asteroid-hhaf/30min",
    highlighted: false,
    logoSize: "w-14 h-14",
  },
  {
    name: "Enterprise Design Partner",
    description: "We're looking for innovative teams pushing the boundaries of web automation",
    price: "Custom",
    period: "",
    features: [
      "Work directly with us to shape the future of browser automation",
      "Shape the future of browser automation",
      "Get features built for your specific needs",
      "Receive considerable volume discounts",
      "Weekly feedback and collaboration sessions",
      "Enterprise-grade support and SLAs",
    ],
    buttonText: "Partner With Us",
    buttonVariant: "primary",
    buttonHref: "https://calendly.com/founders-asteroid-hhaf/30min",
    highlighted: true,
    logoSize: "w-16 h-16",
  }
]

export default function Pricing() {
  const { content } = useContext(UserContext)

  return (
    <Section
      title={content.pricingTitle}
      subtitle={content.pricingSubtitle}
      id="pricing"
    >
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-8xl mt-16">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col transition-all duration-300 ease-in-out bg-[#0A0A1F] border-none text-white group
                ${plan.highlighted
                ? 'transform scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)] border-primary hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                : 'hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(255,255,255,0.08)]'
              }`}
          >
            <CardHeader>
              <div className="flex justify-center items-center mb-4">
                <img
                  src="/logo-128-nobg.png"
                  alt="Asteroid Logo"
                  className={cn(plan.logoSize, "mb-4 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]")}
                />
              </div>
              <CardTitle className={cn("text-2xl flex items-center justify-start text-white text-indigo-500")}>
                {plan.name}
                {plan.highlighted && <Zap className="ml-2 h-5 w-5 text-primary" />}
              </CardTitle>
              <CardDescription className="text-left text-gray-400">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4 text-white">
                {plan.price}
                <span className="text-xl font-normal text-gray-400">{plan.period}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300 text-left">
                    <Check className="mr-2 h-5 w-5 text-indigo-500 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link to={plan.buttonHref}>
                <MeetingButton
                  size="lg"
                  solid={plan.highlighted}
                  text={plan.buttonText}
                  href={plan.buttonHref}
                />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  )
}

