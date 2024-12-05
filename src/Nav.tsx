import * as React from "react"
import { motion } from "framer-motion"
import { MenuIcon, Slack, GithubIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const NavLink = motion(Link)

const navItemVariants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const fadeInVariants = {
  initial: { opacity: 0, y: -20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay: index * 0.1
    }
  })
}

const navItems = [
  { name: "Demo", href: "https://calendly.com/founders-asteroid/30min" },
  { name: "Docs", href: "https://docs.asteroid.sh" },
  { name: "Blog", href: "https://blog.asteroid.sh/agents" },
]

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = useLocation().pathname

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-non backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-2xl font-bold text-white font-['Source_Serif_4']">
          Asteroid
        </p>
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item, index) => (
                <NavigationMenuItem key={item.name}>
                  <NavLink
                    to={item.href}
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:text-white/80 hover:bg-transparent")}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    variants={navItemVariants}
                    custom={index}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      {item.name}
                    </motion.div>
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={navItemVariants}
          >
            <Link to="https://github.com/asteroidai/sentinel" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="bg-transparent text-white hover:text-white/80 hover:bg-transparent">
                <GithubIcon className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={navItemVariants}
          >
            <Link to="https://join.slack.com/t/asteroidcommunity/shared_invite/zt-2w0zvuqow-eIzIRLK~3vlEvN83d9qgxw" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="bg-transparent text-white hover:text-white/80 hover:bg-transparent">
                <Slack className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="bg-transparent text-white hover:text-white/80 hover:bg-transparent">
              <MenuIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#0a1527]/90 backdrop-blur-sm border-none">
            <nav className="flex flex-col gap-6 mt-8">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-base font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5",
                    pathname === item.href && "text-white bg-white/10"
                  )}
                  onClick={() => setIsOpen(false)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="flex gap-4 px-4 mt-2">
                <NavLink
                  to="https://github.com/asteroidai/sentinel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={navItems.length}
                >
                  <GithubIcon className="h-5 w-5" />
                </NavLink>
                <NavLink
                  to="https://join.slack.com/t/asteroidcommunity/shared_invite/zt-2w0zvuqow-eIzIRLK~3vlEvN83d9qgxw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={navItems.length + 1}
                >
                  <Slack className="h-5 w-5" />
                </NavLink>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

