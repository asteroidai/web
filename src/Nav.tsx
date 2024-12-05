import * as React from "react"
import { motion } from "framer-motion"
import { MailIcon, CalendarIcon, BookIcon, LibraryIcon, GithubIcon, MenuIcon } from 'lucide-react'
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

const textRevealVariants = {
  hidden: { width: 0, opacity: 0, marginLeft: 0, overflow: 'hidden' },
  visible: {
    width: 'auto',
    opacity: 1,
    marginLeft: 8,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

const navItems = [
  { name: "Contact", href: "mailto:founders@asteroid.sh", icon: MailIcon },
  { name: "Demo", href: "https://calendly.com/founders-asteroid/30min", icon: CalendarIcon },
  { name: "Docs", href: "https://docs.asteroid.sh", icon: BookIcon },
  { name: "Blog", href: "https://blog.asteroid.sh/agents", icon: LibraryIcon },
]

export default function Nav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = useLocation().pathname

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-non backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-white font-['Source_Serif_4']" variants={fadeInVariants} initial="initial" animate="animate" custom={0}>
          Asteroid
        </NavLink>
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
                      <item.icon className="h-4 w-4" />
                      <motion.span
                        initial="hidden"
                        whileHover="visible"
                        variants={textRevealVariants}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
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
                <GithubIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
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
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    pathname === item.href && "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  custom={index}
                >
                  <item.icon className="h-4 w-4" />
                  <motion.span
                    initial="hidden"
                    whileHover="visible"
                    variants={textRevealVariants}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                </NavLink>
              ))}
              <NavLink
                to="https://github.com/asteroidai/sentinel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-muted-foreground"
                onClick={() => setIsOpen(false)}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                custom={navItems.length}
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

