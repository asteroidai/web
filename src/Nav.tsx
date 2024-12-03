import * as React from "react";
import { Card } from "@radix-ui/themes";
import { MailIcon, CalendarIcon, BookIcon, LibraryIcon } from "lucide-react";
import { CardHeader, CardTitle } from "./components/ui/card";

export default function Nav() {
  return (
    <Card className="fixed top-0 left-0 right-0 z-50 outline-none shadow-none border-none bg-[#0A0A1F]/80 backdrop-blur-sm">
      <CardHeader className="px-8 py-4">
        <CardTitle className="">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4 md:gap-0">
            <div className="w-full md:w-auto">
              <div className="flex flex-row items-center justify-end gap-8">
                <a
                  href="mailto:founders@asteroid.sh"
                  className="text-sm text-gray-400 font-mono font-normal tracking-wide hover:text-white transition-colors relative flex items-center gap-2"
                >
                  <MailIcon className="h-4 w-4" />
                  Contact
                </a>
                <a
                  href="https://calendly.com/founders-asteroid/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 font-mono font-normal tracking-wide hover:text-white transition-colors relative flex items-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Demo
                </a>

                <a href="https://docs.asteroid.sh"
                  className="text-sm text-gray-400 font-mono font-normal tracking-wide hover:text-white transition-colors relative flex items-center gap-2">
                  <BookIcon className="h-4 w-4" />
                  Docs
                </a>

                <a href="https://blog.asteroid.sh/agents"
                  className="text-sm text-gray-400 font-mono font-normal tracking-wide hover:text-white transition-colors relative flex items-center gap-2">
                  <LibraryIcon className="h-4 w-4" />
                  Blog
                </a>

                <a href="https://github.com/asteroidai/sentinel" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <img src="https://img.shields.io/github/stars/asteroidai/sentinel?style=social" alt="GitHub stars" />
                </a>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

