import * as React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  GithubIcon,
  LinkedinIcon,
  BookIcon,
  LibraryIcon,
  MailIcon,
  CalendarIcon,
  DollarSignIcon,
  HomeIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { useState } from "react"
import jsonp from 'jsonp'

const FooterLink = motion(Link)

const iconVariants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}


// Helper function for smooth scrolling
const scrollToPricing = (e: React.MouseEvent) => {
  e.preventDefault()
  const pricingSection = document.getElementById('pricing')
  pricingSection?.scrollIntoView({ behavior: 'smooth' })
}

// Helper function for smooth scrolling
const scrollToTop = (e: React.MouseEvent) => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/asteroid_inc",
    icon: () => <img src="/twitter.png" alt="X/Twitter" className="h-3 w-3 brightness-0 invert" />
  },
  { name: "GitHub", href: "https://github.com/asteroidai", icon: GithubIcon },
  { name: "LinkedIn", href: "https://linkedin.com/company/asteroid-ai", icon: LinkedinIcon },
]

const resourceLinks = [
  { name: "Home", href: "/", icon: HomeIcon, onClick: scrollToTop },
  { name: "Documentation", href: "https://docs.asteroid.ai", icon: BookIcon },
  { name: "Blog", href: "https://blog.asteroid.ai", icon: LibraryIcon },
  { name: "Contact", href: "mailto:founders@asteroid.ai", icon: MailIcon },
  {
    name: "Pricing", href: "#pricing", icon: DollarSignIcon, onClick: scrollToPricing
  },
  { name: "Demo", href: "https://calendly.com/founders-asteroid-hhaf/30min", icon: CalendarIcon },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setTitle('Something went wrong!')
      setText('Please enter a valid email address.')
      return
    }

    const url = 'https://gmail.us22.list-manage.com/subscribe/post-json?u=216389800f8594a84e0c2b3b7&amp;id=0d9c8589b6&amp;f_id=002dc7e1f0'
    jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, () => {
      setEmail('')
    })

    setTitle('Thank you for subscribing!')
    setText('We will let you know when we launch.')
  }

  return (
    <footer className="bg-none backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/">
              <p className="text-2xl font-['Source_Serif_4'] font-bold text-white">
                Asteroid
              </p>
            </Link>
            <p className="text-sm text-white/60">
              Building infrastructure for AI agents
            </p>
          </div>

          {/* Resource Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <div className="flex flex-col space-y-2">
              {resourceLinks.map((link) => (
                <FooterLink
                  key={link.name}
                  to={link.href}
                  className="flex items-center text-white/60 hover:text-white transition-colors"
                  initial="initial"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="ml-2">{link.name}</span>
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <FooterLink
                  key={link.name}
                  to={link.href}
                  className="flex items-center text-white/60 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="initial"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  <link.icon className="h-4 w-4" />
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Mailing List */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Stay Updated</h3>
            <p className="text-sm text-white/60">Stay at the forefront of agents and supervision. No spam, ever.</p>
            <div className="flex gap-2">
              <Input
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" onClick={onSubmit}>
                    Join
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{text}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="default">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Entropy Systems, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
