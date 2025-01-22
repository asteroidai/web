import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import jsonp from 'jsonp'


export default function FormPage() {
  // Decode the text from the URL
  const { text } = useParams()

  const decodedText = decodeURIComponent(text)

  const [response, setResponse] = useState('')
  const [email, setEmail] = useState('')


  const [displayTitle, setDisplayTitle] = useState('')
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    setResponse(decodedText)
  }, [decodedText])

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setDisplayTitle('Something went wrong!')
      setDisplayText('Please enter a valid email address.')
      return
    }

    const url = 'https://gmail.us22.list-manage.com/subscribe/post?u=216389800f8594a84e0c2b3b7&amp;id=0d9c8589b6&amp;f_id=0057dbe1f0'
    jsonp(`${url}&EMAIL=${email}&MMERGE6=${response}`, { param: 'c' }, () => {
      setEmail('')
    })

    setDisplayTitle('Thank you getting in touch, we will get back to you soon.')
    setDisplayText('In the meantime, join our Slack community to stay up to date with our progress.')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-3xl font-semibold text-white">Need a custom AI agent for a complex web workflow?</h3>
      <p className="text-sm text-white/60">We can build agents for your specific use case. Tell us what you need and we'll get back to you in a few hours.</p>
      <div className="flex gap-2">
        <Input
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
        <Input
          placeholder="I need an agent to automate text input in insurance portals"
          value={text}
          onChange={(e) => setResponse(e.target.value)}
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
              <DialogTitle>{displayTitle}</DialogTitle>
              <DialogDescription>{displayText}</DialogDescription>
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
  );
}

