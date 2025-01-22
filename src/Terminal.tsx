import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "./lib/utils"

const defaultCode = ``

interface TerminalProps {
  code?: string
  filename?: string
  language?: string
  lineNumbers?: boolean
  copyButton?: boolean
  width?: string | number
  allowClose?: boolean
}

export const Terminal: React.FC<TerminalProps> = ({
  code = defaultCode,
  filename = "example.py",
  language = "python",
  lineNumbers = true,
  copyButton = true,
  width = "100%",
  allowClose = true
}) => {
  const [copied, setCopied] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })

  // State to switch between "code view" and "shell view"
  const [shellMode, setShellMode] = React.useState(false)

  // Shell-related states
  const [inputValue, setInputValue] = React.useState("")
  const [shellHistory, setShellHistory] = React.useState<{ command: string; output: string }[]>([])

  // A simple one-level file system: some files, some directories (isDirectory), plus minimal content.
  const [fileSystem, setFileSystem] = React.useState<{
    [name: string]: { isDirectory: boolean; content: string }
  }>({
    "file1.txt": { isDirectory: false, content: "Hello from file1." },
    "file2.py": { isDirectory: false, content: 'print("Hello again!")' },
    directory1: { isDirectory: true, content: "" }
  })

  // Hard-coded usage or fallback responses for commands not handled below
  // (We'll override some of these with custom logic for a few commands: ls, cat, rm, mkdir, rmdir, clear)
  const commandResponses: Record<string, string> = {
    cd: "Usage: cd <directory>",
    cp: "Usage: cp <source> <destination>",
    mv: "Usage: mv <source> <destination>",
    tail: "Usage: tail <file>",
    head: "Usage: head <file>",
    grep: "Usage: grep <pattern> <file>",
    find: "Usage: find <path> [expression]",
    locate: "locate: command not found (database not initialized)",
    man: "What manual page do you want?",
    chmod: "Usage: chmod [permissions] <file>",
    chown: "Usage: chown [owner][:group] <file>",
    chgrp: "Usage: chgrp <group> <file>",
    sudo: "This incident will be reported.",
    "apt-get": "apt-get: command not found (are you on the right distro?)",
    yum: "yum: command not found (are you on the right distro?)",
    pacman: "pacman: command not found (are you on the right distro?)",
    df: "Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1       488384000 123456  488260544  1% /",
    du: "Usage: du [options] <file|directory>",
    free: "              total        used        free      shared  buff/cache   available\nMem:        16308648     4532152     9016676       425604     2769836    10638728",
    top: "top - 00:00:00 up  1:23,  0 users,  load average: 0.00, 0.00, 0.00\nTasks:   1 total,  1 running,  0 sleeping,  0 stopped,  0 zombie\n%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st",
    ps: "  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps",
    kill: "Usage: kill <pid>",
    killall: "Usage: killall <process_name>",
    service: "Usage: service <service_name> <start|stop|restart>",
    systemctl: "Usage: systemctl <start|stop|restart|status> <service>",
    ssh: "Usage: ssh user@host",
    scp: "Usage: scp <source> <destination>",
    rsync: "Usage: rsync <source> <destination>",
    ping: "Usage: ping <host>",
    traceroute: "Usage: traceroute <host>",
    netstat: "Active Internet connections (servers and established)...",
    ifconfig: "Command 'ifconfig' not found, but can be installed with: apt install net-tools",
    ip: "Usage: ip [OPTIONS] OBJECT { COMMAND | help }",
    alias: "Usage: alias <name>=<command>",
    unalias: "Usage: unalias <name>",
    history: "History is disabled in this mock shell.",
    echo: "Usage: echo <text>",
    nano: "GNU nano version 5.8\n(C) 1999-2021 the Free Software Foundation, etc.",
    vi: "vi: command not found",
    vim: "vim: command not found",
    git: "git: command not found",
    docker: "docker: command not found",
    "docker-compose": "docker-compose: command not found",
    pip: "pip: command not found"
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerStyle = {
    width: typeof width === "number" ? `${width}px` : width
  }

  // The "close" button toggles to shell mode
  const handleCloseClick = () => {
    if (allowClose) {
      setShellMode(!shellMode)
    }
  }

  // Handle shell command submission
  const handleShellCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmedCommand = inputValue.trim()
      let output = ""
      let addToHistory = true

      if (!trimmedCommand) {
        // No command typed, just print an empty line
        setShellHistory((history) => [...history, { command: "", output: "" }])
        setInputValue("")
        return
      }

      const parts = trimmedCommand.split(" ")
      const command = parts[0]
      const arg1 = parts[1]

      switch (command) {
        case "clear": {
          // Simulate clearing the screen
          setShellHistory([])
          addToHistory = false
          break
        }
        case "ls": {
          // List all keys in fileSystem – both files and directories
          const items = Object.keys(fileSystem).join("   ")
          output = items || ""
          break
        }
        case "cat": {
          if (!arg1) {
            output = "Usage: cat <file>"
            break
          }
          const fsEntry = fileSystem[arg1]
          if (!fsEntry) {
            output = `cat: ${arg1}: No such file or directory`
          } else if (fsEntry.isDirectory) {
            output = `cat: ${arg1}: Is a directory`
          } else {
            output = fsEntry.content
          }
          break
        }
        case "rm": {
          if (!arg1) {
            output = "Usage: rm <file>"
            break
          }
          const fsEntry = fileSystem[arg1]
          if (!fsEntry) {
            output = `rm: cannot remove '${arg1}': No such file or directory`
          } else if (fsEntry.isDirectory) {
            output = `rm: cannot remove '${arg1}': Is a directory`
          } else {
            // Remove the file
            const updatedFS = { ...fileSystem }
            delete updatedFS[arg1]
            setFileSystem(updatedFS)
          }
          break
        }
        case "mkdir": {
          if (!arg1) {
            output = "Usage: mkdir <directory>"
            break
          }
          if (fileSystem[arg1]) {
            output = `mkdir: cannot create directory '${arg1}': File exists`
          } else {
            setFileSystem((prev) => ({
              ...prev,
              [arg1]: { isDirectory: true, content: "" }
            }))
          }
          break
        }
        case "rmdir": {
          if (!arg1) {
            output = "Usage: rmdir <directory>"
            break
          }
          const fsEntry = fileSystem[arg1]
          if (!fsEntry) {
            output = `rmdir: failed to remove '${arg1}': No such file or directory`
          } else if (!fsEntry.isDirectory) {
            output = `rmdir: failed to remove '${arg1}': Not a directory`
          } else {
            // Remove the directory
            const updatedFS = { ...fileSystem }
            delete updatedFS[arg1]
            setFileSystem(updatedFS)
          }
          break
        }
        default: {
          // If it's in our usage dictionary, show that. Otherwise, "command not found"
          if (commandResponses[command] !== undefined) {
            output = commandResponses[command]
          } else {
            output = `bash: ${command}: command not found`
          }
        }
      }

      // Record in shell history (except for "clear")
      if (addToHistory) {
        setShellHistory((history) => [
          ...history,
          { command: trimmedCommand, output }
        ])
      }
      setInputValue("")
    }
  }

  // Add ref for the shell contents div
  const shellContentsRef = React.useRef<HTMLDivElement>(null)

  // Add useEffect to scroll to bottom when history changes
  React.useEffect(() => {
    if (shellContentsRef.current) {
      shellContentsRef.current.scrollTop = shellContentsRef.current.scrollHeight
    }
  }, [shellHistory])

  if (!isVisible) return null

  // If shellMode is activated, show a mock shell environment
  if (shellMode) {
    return (
      <div
        className="rounded-lg overflow-hidden border border-none bg-[#0E0E0E] shadow-lg relative w-full h-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
          ...containerStyle
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="bg-[#2D2D2D] px-6 py-2 flex items-center justify-between gap-2 rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              {/* "Lights" for window controls, but now only decoration in shell mode */}
              <div className="w-3 h-3 rounded-full bg-red-500 cursor-default" onClick={handleCloseClick} />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-gray-400 text-sm ml-2 font-mono">
              /bin/bash
            </div>
          </div>
        </div>

        {/* Add ref to shell contents div */}
        <div
          ref={shellContentsRef}
          className="text-sm text-gray-200 font-mono px-4 py-4 overflow-auto h-[300px] border-t border-gray-700"
        >
          {shellHistory.map((entry, idx) => (
            <div key={idx}>
              <div>
                <span className="text-green-500">root@asteroid</span>:
                <span className="text-blue-500">~$ </span>
                {entry.command}
              </div>
              {entry.output && <div>{entry.output}</div>}
            </div>
          ))}
        </div>

        {/* Command input */}
        <div className="px-4 py-2 bg-[#2D2D2D] flex items-center font-mono">
          <span className="text-green-500 mr-1">root@asteroid</span>:
          <span className="text-blue-500 mr-2">~$</span>
          <input
            className="bg-transparent border-none outline-none flex-1 text-gray-200"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleShellCommand}
            autoFocus
          />
        </div>
      </div>
    )
  }

  // Otherwise, show the Code Terminal interface
  return (
    <div
      className="rounded-lg overflow-hidden border border-none bg-[#0E0E0E] shadow-lg relative w-full h-full"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        ...containerStyle
      }}
    >
      <div
        className="bg-[#2D2D2D] px-6 py-2 flex items-center justify-between gap-2"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"
              onClick={handleCloseClick}
            ></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-sm ml-2 font-mono">{filename}</div>
        </div>
        {copyButton && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
            onClick={handleCopy}
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cn("px-4 py-4 overflow-auto text-sm h-full", className)} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="flex">
                {lineNumbers && (
                  <span className="text-gray-500 mr-4 select-none w-6 text-right flex-shrink-0">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default Terminal
