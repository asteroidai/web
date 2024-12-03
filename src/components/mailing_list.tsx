import * as React from "react"

import jsonp from 'jsonp';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from "react";

export function MailingList() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      setTitle('Something went wrong!');
      setText('Please enter a valid email address.');
      return;
    }

    const url =
      'https://gmail.us22.list-manage.com/subscribe/post-json?u=216389800f8594a84e0c2b3b7&amp;id=0d9c8589b6&amp;f_id=002dc7e1f0';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
    jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (result: any, error: any) => {
      setEmail('');
    });

    setTitle('Thank you for subscribing!');
    setText('We will let you know when we launch.');
  };

  return (
    <div className='grid gap-4 p-16'>
      <p className='text-sm text-gray-500'>Please enter your email if you're into agents and agentic evals. No spam, we promise.</p>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Input
          id='name'
          placeholder='name@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='col-span-3'
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='default' className='text-xs text-gray-200' onClick={onSubmit}>
              Get Notified
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{text}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='default'>
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
