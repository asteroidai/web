import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import jsonp from 'jsonp'
import { ArrowRightIcon, CheckCircle } from 'lucide-react'
import { cn } from './utils'
import { useToast } from "@/hooks/use-toast"
import { motion } from 'framer-motion'
import validator from 'validator'

export default function Form() {
  const [userQuery, setUserQuery] = useState('')
  const [email, setEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { toast } = useToast()

  function onFirstSubmit() {
    setShowEmailInput(true)
  }

  const onSecondSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !validator.isEmail(email)) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: 'Please enter a valid email address.',
      })
      return
    }

    if (!userQuery || userQuery.length < 20) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: 'Please enter a valid description of your use case of 20 characters or more.',
      })
      return
    }

    const url = 'https://gmail.us22.list-manage.com/subscribe/post?u=216389800f8594a84e0c2b3b7&amp;id=0d9c8589b6&amp;f_id=0057dbe1f0'
    jsonp(`${url}&EMAIL=${email}&MMERGE6=${userQuery}`, { param: 'c' }, () => {
      setEmail('')
    })

    setShowEmailInput(false)
    setUserQuery('')
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-48">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h3 className="text-3xl font-semibold text-white">Need a custom browser automation?</h3>
        <p className="text-white/60">We can rapidly prototype, build and host custom browser automations for your specific use case.</p>
      </div>
      <div className="flex gap-2 w-full">
        <Input
          placeholder="I need an agent to automate text input in insurance portals"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
        {!showEmailInput && (
          <Button onClick={onFirstSubmit} className={cn(
            "relative group",
            "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500",
            "before:opacity-10",
            "bg-gradient-to-r from-indigo-500 to-purple-500",
            "border border-indigo-500/50",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "shadow-lg shadow-indigo-500/25",
            "overflow-hidden",
          )}
          ><ArrowRightIcon className="w-4 h-4 hover:animate-pulse" /></Button>
        )}
      </div>
      {showEmailInput && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex gap-2 w-full"
        >
          <Input
            type="email"
            placeholder="name@acme.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
          <Button onClick={onSecondSubmit} className={cn(
            "relative group",
            "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500",
            "before:opacity-10",
            "bg-gradient-to-r from-indigo-500 to-purple-500",
            "border border-indigo-500/50",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "shadow-lg shadow-indigo-500/25",
            "overflow-hidden",
          )}
          >Submit <ArrowRightIcon className="w-4 h-4 hover:animate-pulse" /></Button>
        </motion.div>
      )}

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 text-green-400"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Thank you! We'll be in touch soon.</span>
        </motion.div>
      )}
    </div>
  );
}

