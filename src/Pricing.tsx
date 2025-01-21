import * as React from 'react'
import { Check, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Page from './components/Page'
import { Link } from 'react-router-dom'
import MeetingButton from './MeetingButton'
const pricingPlans = [
  {
    name: "Developer",
    description: "Perfect for individual developers and testing",
    price: "$0",
    period: "/month",
    features: [
      "1,000 free agent runs per month",
      "Python SDK",
      "Web Supervision Control Center",
      "Default & custom Python supervisors",
      "Local supervision execution (BYO keys)",
      "Community Slack support",
    ],
    buttonText: "Get Started",
    buttonVariant: "default",
    buttonHref: "https://platform.asteroid.ai",
    highlighted: false,
  },
  {
    name: "Consultation",
    description: "For teams looking for expert guidance",
    price: "Custom",
    period: "",
    features: [
      "Consultation with an expert",
      "Managed monitoring of your agent by us",
      "Report the failure modes of your agent",
      "Suggested fixes for the failure modes",
    ],
    buttonText: "Contact Us",
    buttonVariant: "outline",
    buttonHref: "https://calendly.com/founders-asteroid-hhaf/30min",
    highlighted: false,
  },
  {
    name: "Premium",
    description: "For growing teams and startups",
    price: "Custom",
    period: "",
    features: [
      "All Developer features",
      "Unlimited pay-as-you-go agent runs",
      "Slack-based human supervision",
      "Expert supervisor deployment help",
      "Automated prompt optimization",
      "Dedicated Slack support channel",
    ],
    buttonText: "Contact Us",
    buttonVariant: "primary",
    buttonHref: "https://calendly.com/founders-asteroid-hhaf/30min",
    highlighted: false,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "",
    features: [
      "All Premium features",
      "Volume discounts on agent runs",
      "Custom API-based supervision",
      "Advanced edge case detection",
      "Self-hosted deployment options",
      "Dedicated support engineer with SLA",
    ],
    buttonText: "Contact Us",
    buttonVariant: "outline",
    buttonHref: "https://calendly.com/founders-asteroid-hhaf/30min",
    highlighted: false,
  }
]

export default function PricingPage() {
  return (
    <Page className="relative">
      <div className="relative z-10">
        <div className="flex justify-center items-center mb-4">
          <img
            src="/logo-128-nobg.png"
            alt="Asteroid Logo"
            className="w-16 h-16 mb-4 transition-transform duration-700 ease-in-out hover:rotate-[360deg]"
          />
        </div>
        <h1 className="text-4xl font-semibold mb-4 text-white">Pricing Plans</h1>
        <p className="text-xl text-muted-foreground mb-12">Choose the perfect plan for your needs</p>

        <div className="grid md:grid-cols-4 gap-8 w-full max-w-8xl mt-16">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col transition-all duration-300 ease-in-out bg-[#0A0A1F] border-none text-white
                ${plan.highlighted
                  ? 'transform scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)] border-primary hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]'
                  : 'hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-center text-white">
                  {plan.name}
                  {plan.highlighted && <Zap className="ml-2 h-5 w-5 text-primary" />}
                </CardTitle>
                <CardDescription className="text-center text-gray-400">{plan.description}</CardDescription>
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
                    text={plan.buttonText}
                    href={plan.buttonHref}
                  />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  )
}

