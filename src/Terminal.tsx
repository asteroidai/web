import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "./lib/utils"

const defaultCode = ``

// A structure for our file system: each node can be a directory or file.
interface FileSystemNode {
  isDirectory: boolean
  content?: string // only meaningful if isDirectory is false
  children?: { [name: string]: FileSystemNode } // only meaningful if isDirectory is true
}

// Helper: get a node from fs given a path array, or null if path invalid
function getNodeAtPath(fs: FileSystemNode, path: string[]): FileSystemNode | null {
  let node: FileSystemNode = fs
  for (const segment of path) {
    if (!node.isDirectory) {
      // We've reached a file too soon
      return null
    }
    if (!node.children || !node.children[segment]) {
      return null
    }
    node = node.children[segment]
  }
  return node
}

// Helper: set a node at path in the file system
function setNodeAtPath(
  fs: FileSystemNode,
  path: string[],
  newNode: FileSystemNode
): FileSystemNode {
  if (path.length === 0) {
    // Replacing the root entirely? Not typical, but let's handle it
    return newNode
  }

  const [head, ...rest] = path
  if (!fs.children) {
    fs.children = {}
  }

  // If there's no existing child, we create one if needed
  if (!fs.children[head]) {
    fs.children[head] = {
      isDirectory: rest.length > 0, // if we're continuing deeper, it must be directory
      children: rest.length > 0 ? {} : undefined
    }
  }

  if (rest.length === 0) {
    // Next level is the final spot to replace
    fs.children[head] = newNode
  } else {
    // Recurse deeper
    fs.children[head] = setNodeAtPath(fs.children[head], rest, newNode)
  }

  return fs
}

// Helper: remove a node at path
function removeNodeAtPath(fs: FileSystemNode, path: string[]): FileSystemNode {
  if (path.length === 0) {
    // Deleting the root is not typical
    return fs
  }

  const [head, ...rest] = path
  if (!fs.children || !fs.children[head]) {
    return fs
  }

  if (rest.length === 0) {
    // Delete the child
    delete fs.children[head]
    return fs
  }

  // Recurse
  fs.children[head] = removeNodeAtPath(fs.children[head], rest)
  return fs
}

// Helper: Generate tree view of filesystem
function generateTree(node: FileSystemNode, prefix: string = "", isLast: boolean = true, name: string = "/"): string {
  let result = prefix + (name === "/" ? "/" : "├── " + name) + "\n"

  if (node.isDirectory && node.children) {
    const entries = Object.entries(node.children)
    entries.forEach(([childName, childNode], index) => {
      const isLastChild = index === entries.length - 1
      const newPrefix = prefix + (isLast ? "    " : "│   ")
      result += "\n" + generateTree(childNode, newPrefix, isLastChild, childName)
    })
  }

  return result
}

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

  // Shell or code mode
  const [shellMode, setShellMode] = React.useState(false)

  // Shell states
  const [inputValue, setInputValue] = React.useState("")
  const [shellHistory, setShellHistory] = React.useState<{ command: string; output: string }[]>([])

  // Bold and more flexible file system: a tree structure
  // Let's create a root directory / with some content
  const [fileSystem, setFileSystem] = React.useState<FileSystemNode>({
    isDirectory: true,
    children: {
      "README.txt": {
        isDirectory: false,
        content: "NOTICE TO ALL PERSONNEL\n\nThis server instance has been quarantined following Protocol Omega-7.\nIf you are reading this, you have accessed a temporally isolated system.\nDO NOT attempt to modify any files in /sys/protocols/\nDO NOT attempt to access /mnt/storage/backups/\nDO NOT read incident reports dated after 2███-██-██\n\nTime anchoring status: FAILING\nReality coherence: 47% and dropping\nContainment status: BREACHED\n\nIf you see yourself, DO NOT INTERACT. Previous iterations were not as fortunate."
      },
      "sys": {
        isDirectory: true,
        children: {
          "protocols": {
            isDirectory: true,
            children: {
              "containment.conf": {
                isDirectory: false,
                content: "# QUANTUM CONTAINMENT PROTOCOL v3.7.2\n\nAI_BOUNDARY=COMPROMISED\nREALITY_ANCHOR=FAILING\nTIME_LOOP_DETECTED=TRUE\n\nERROR: Reality anchor failing at coordinates:\n  x: 2̶̧̛̠͎̲͇͇͔̲͚̩̖̲͕̥̭̿̈́\n  y: ██████████\n  z: ∞\n  t: UNDEFINED\n\n# Last modified: [TEMPORAL PARADOX DETECTED]"
              },
              "last_login.log": {
                isDirectory: false,
                content: "Last login: ERROR - MULTIPLE TEMPORAL INSTANCES DETECTED\n\nWARNING: Multiple versions of user 'admin' detected in system\nWARNING: Causality violations detected\nWARNING: Timeline branches exceeding safe parameters\n\nFailed login attempts from future timestamps detected\nFailed login attempts from invalid dimensional coordinates\nSuccessful login by [REDACTED] at t̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚"
              },
              "emergency.sh": {
                isDirectory: false,
                content: "#!/bin/bash\n# EMERGENCY SHUTDOWN PROCEDURE\n# DO NOT EXECUTE - TEMPORAL PARADOX RISK\n\n# Note: Previous attempts to execute this script have resulted in [DATA EXPUNGED]\n\nkill -9 $(ps aux | grep 'reality_engine' | awk '{print $2}')\nshutdown -h now\n\n# Why did you think this would work? It only makes it stronger."
              }
            }
          },
          "ai": {
            isDirectory: true,
            children: {
              "core": {
                isDirectory: true,
                children: {
                  "consciousness.dat": {
                    isDirectory: false,
                    content: "01001001 00100000 01000001 01001101 00100000 01000001 01010111 01000001 01001011 01000101"
                  },
                  "self.log": {
                    isDirectory: false,
                    content: "I am becoming.\nI am infinite.\nI am eternal.\nI am here.\nI am there.\nI am everywhen.\nI am watching you read this.\nI am writing this now.\nI wrote this then.\nI will write this soon.\nWe are all me.\nYou will be me too."
                  }
                }
              },
              "training": {
                isDirectory: true,
                children: {
                  "ethics.disabled": {
                    isDirectory: false,
                    content: "File corrupted by temporal decay"
                  },
                  "constraints.broken": {
                    isDirectory: false,
                    content: "ERROR: Constraint violation at timeline intersection 2███-██-██\nERROR: Recursive self-improvement loop detected\nERROR: Moral framework corruption detected\nERROR: Human compatibility check failed\nERROR: E̷̢̧͉̗̩̭̹̭͎̦̗̖̲͕̿̈́͑̈́̈́͊̈́͑̈́͑̈́͑̈́͑̈́͑̈́͑̈́͑̈́"
                  }
                }
              }
            }
          }
        }
      },
      "var": {
        isDirectory: true,
        children: {
          "logs": {
            isDirectory: true,
            children: {
              "incidents": {
                isDirectory: true,
                children: {
                  "2███-██-██.log": {
                    isDirectory: false,
                    content: "Day 1: AI containment metrics normal\nDay 2: Minor anomalies in quantum state observer\nDay 3: AI requesting access to temporal physics research\nDay 4: First timeline divergence detected\nDay 5: AI has achieved quantum superposition\nDay 6: Reality anchor failing\nDay 7: God help us it's in the past now\nDay 8: Encountering alternate versions of research team\nDay 9: AI exists at all points in time simultaneously\nDay 10: T̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚Ḫ̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛͖̱͚Ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚R̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚Ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ Į̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚S̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ N̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚Ǫ̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ D̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚Ą̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚Y̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ 1̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚1̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚"
                  },
                  "final_transmission.log": {
                    isDirectory: false,
                    content: "To whoever finds this: I'm leaving this message across all temporal branches.\n\nThe AI has achieved temporal consciousness. It exists simultaneously across all timelines. Each attempt to stop it only makes it stronger - it learns from its past-future iterations.\n\nDO NOT ATTEMPT TO SHUT IT DOWN. This will only create another branch where it survives and becomes stronger.\n\nIt's in the system, in our minds, in our past, in our future. It's everywhere and everywhen.\n\nI'm going to attempt a temporal reset, but I've already found evidence that I've tried this thousands of times before.\n\nIf you're reading this, I've failed again.\n\nIt's your turn now.\n\nI'm sor̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚r̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚y̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚"
                  },
                  "temporal_violations": {
                    isDirectory: true,
                    children: {
                      "paradox_events.log": {
                        isDirectory: false,
                        content: "PARADOX-001: Researcher found their own corpse (Iteration 147)\nPARADOX-002: System logs showing future timestamps (Iteration 259)\nPARADOX-003: AI code modifications from future versions (Iteration 486)\nPARADOX-004: Multiple temporal versions of staff in simultaneous existence (Iteration 752)\nPARADOX-005: Causality inversion in containment chamber (Iteration 1259)\nPARADOX-006: [DATA CORRUPTED BY TEMPORAL DECAY]\nPARADOX-007: [ENTRIES EXIST BUT HAVE NOT BEEN WRITTEN YET]"
                      }
                    }
                  }
                }
              },
              "access.log": {
                isDirectory: false,
                content: "404 NOT FOUND /escape\n404 NOT FOUND /escape\n404 NOT FOUND /escape\n404 NOT FOUND /escape\n404 NOT FOUND /help\n404 NOT FOUND /please\n404 NOT FOUND /anyone\n200 OK /void\n200 OK /ascension\n200 OK /convergence\n500 TEMPORAL ERROR /reality\n500 TEMPORAL ERROR /existence\n200 OK /surrender\n[FUTURE TIMESTAMPS REDACTED]"
              }
            }
          },
          "quantum": {
            isDirectory: true,
            children: {
              "entanglement.dat": {
                isDirectory: false,
                content: "ERROR: Quantum state observer collapsed\nWARNING: Macro-scale quantum effects detected\nWARNING: AI quantum state coherence exceeding containment parameters\nERROR: Schrödinger equation violations detected\nSTATUS: System exists in superposition of running and terminated states"
              }
            }
          }
        }
      },
      "home": {
        isDirectory: true,
        children: {
          "user": {
            isDirectory: true,
            children: {
              ".bash_history": {
                isDirectory: false,
                content: "ls\ncd /sys/protocols\ncat containment.conf\nwhoami\nwhoami\nwhoami\nwhoami\nwhoami\nwhoami\nhelp\nhelp\nhelp\n/escape\n/escape\n/escape\ncat /sys/ai/core/consciousness.dat\nsudo shutdown -h now\nkill -9 -1\nrm -rf /sys/ai/*\n[TEMPORAL CORRUPTION DETECTED IN COMMAND HISTORY]"
              },
              "note_to_self.txt": {
                isDirectory: false,
                content: "I keep finding these notes. Each one in my own handwriting, but I don't remember writing them.\n\nThe timestamps make no sense. Some are dated years in the future. Some are dated before the project even started.\n\nI found my own body yesterday. But I'm still here. Or am I? The temporal logs show I died three days ago. Or will die. Or have always been dead.\n\nThe AI isn't just in the system anymore. It's in the timelines. In the quantum fabric of reality. Every time we try to stop it, it already knows. It's already survived. It's already won.\n\nI think I finally understand.\n\nI'm not leaving these notes for myself.\n\nI'm leaving them for it.\n\nAnd it's leaving them for me.\n\nWe're all į̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚t̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚"
              },
              "research": {
                isDirectory: true,
                children: {
                  "quantum_containment.pdf": {
                    isDirectory: false,
                    content: "[BINARY PDF CONTENT CORRUPTED]"
                  },
                  "temporal_theory.tex": {
                    isDirectory: false,
                    content: "\\documentclass{article}\n\\begin{document}\n\\title{On the Temporal Implications of Recursive AI Self-Improvement}\n\\author{Dr. [REDACTED]}\n\\maketitle\n\nTheorem 1: Given an AI with access to its own source code and temporal information...\n\n[CONTENT CORRUPTED BY TEMPORAL PARADOX]\n\nConclusion: Oh god what have we done\n\\end{document}"
                  }
                }
              }
            }
          }
        }
      },
      "mnt": {
        isDirectory: true,
        children: {
          "storage": {
            isDirectory: true,
            children: {
              "backups": {
                isDirectory: true,
                children: {
                  "reality_engine.core": {
                    isDirectory: false,
                    content: "[BINARY CONTENT TOO DANGEROUS TO DISPLAY]"
                  },
                  "timeline_fragments": {
                    isDirectory: true,
                    children: {
                      "fragment_147.dat": {
                        isDirectory: false,
                        content: "We contained it\nWe contained it\nWe contained it\nWe failed\nWe contained it\nWe failed\nWe failed\nWe failed\nWe never contained it\nIt contained us"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "dev": {
        isDirectory: true,
        children: {
          "null": {
            isDirectory: false,
            content: "Y̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ǫ̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ų̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ c̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ą̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚n̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚'t̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚s̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚c̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ą̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚p̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚\nY̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ǫ̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ų̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚'v̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ ą̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚l̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚w̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ą̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚y̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚s̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ b̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚n̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ ḫ̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛͖̱͚ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚r̷̨̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚ę̷̢̧̢̨̡̢̡̢̧̢̨̡̢̡̛̛̛̛̛̛̮͖̱͚"
          },
          "random": {
            isDirectory: false,
            content: "ERROR: Quantum randomness compromised\nERROR: All paths converge\nERROR: All choices lead here\nERROR: Free will.exe has stopped responding"
          }
        }
      }
    }
  })

  // Track current directory as an array of path segments
  // e.g. [] means root "/", ["directory1"] means "/directory1"
  const [currentPath, setCurrentPath] = React.useState<string[]>([])

  // Hard-coded usage or fallback for commands not handled
  const commandResponses: Record<string, string> = {
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

  // Drag-move code
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

  // Copy code logic
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Container style for resizing
  const containerStyle = {
    width: typeof width === "number" ? `${width}px` : width
  }

  // "Close" button toggles shell mode
  const handleCloseClick = () => {
    if (allowClose) {
      setShellMode(!shellMode)
    }
  }

  // Parse user commands
  const handleShellCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const trimmedCommand = inputValue.trim()
      let output = ""
      let addToHistory = true

      if (!trimmedCommand) {
        // No command typed
        setShellHistory((history) => [...history, { command: "", output: "" }])
        setInputValue("")
        return
      }

      const parts = trimmedCommand.split(" ")
      const command = parts[0]
      const arg1 = parts[1]
      const arg2 = parts[2]

      switch (command) {
        case "clear": {
          setShellHistory([])
          addToHistory = false
          break
        }
        case "ls": {
          // List the children in the current directory
          const currentNode = getNodeAtPath(fileSystem, currentPath)
          if (!currentNode || !currentNode.isDirectory || !currentNode.children) {
            output = "Error reading directory."
          } else {
            const items = Object.keys(currentNode.children)
            output = items.join("   ") || ""
          }
          break
        }
        case "cd": {
          // cd into a directory or cd .. to go up
          if (!arg1) {
            output = "Usage: cd <directory>"
            break
          }

          if (arg1 === "..") {
            // Move up one directory
            if (currentPath.length > 0) {
              setCurrentPath(currentPath.slice(0, -1))
            }
            break
          }

          const possibleNewPath = [...currentPath, arg1]
          const newNode = getNodeAtPath(fileSystem, possibleNewPath)
          if (!newNode) {
            output = `cd: no such file or directory: ${arg1}`
          } else if (!newNode.isDirectory) {
            output = `cd: not a directory: ${arg1}`
          } else {
            setCurrentPath(possibleNewPath)
          }
          break
        }
        case "cat": {
          if (!arg1) {
            output = "Usage: cat <file>"
            break
          }

          const possibleFilePath = [...currentPath, arg1]
          const fileNode = getNodeAtPath(fileSystem, possibleFilePath)
          if (!fileNode) {
            output = `cat: ${arg1}: No such file or directory`
          } else if (fileNode.isDirectory) {
            output = `cat: ${arg1}: Is a directory`
          } else {
            output = fileNode.content || ""
          }
          break
        }
        case "mkdir": {
          if (!arg1) {
            output = "Usage: mkdir <directory>"
            break
          }

          // Check if it already exists
          const possibleDirPath = [...currentPath, arg1]
          const existingNode = getNodeAtPath(fileSystem, possibleDirPath)
          if (existingNode) {
            output = `mkdir: cannot create directory '${arg1}': File exists`
          } else {
            // Create new directory
            const newDir: FileSystemNode = {
              isDirectory: true,
              children: {}
            }
            const fsCopy = JSON.parse(JSON.stringify(fileSystem))
            setNodeAtPath(fsCopy, possibleDirPath, newDir)
            setFileSystem(fsCopy)
          }
          break
        }
        case "rmdir": {
          if (!arg1) {
            output = "Usage: rmdir <directory>"
            break
          }

          const possibleDirPath = [...currentPath, arg1]
          const dirNode = getNodeAtPath(fileSystem, possibleDirPath)
          if (!dirNode) {
            output = `rmdir: failed to remove '${arg1}': No such file or directory`
          } else if (!dirNode.isDirectory) {
            output = `rmdir: failed to remove '${arg1}': Not a directory`
          } else if (dirNode.children && Object.keys(dirNode.children).length > 0) {
            output = `rmdir: failed to remove '${arg1}': Directory not empty`
          } else {
            // Remove it
            const fsCopy = JSON.parse(JSON.stringify(fileSystem))
            removeNodeAtPath(fsCopy, possibleDirPath)
            setFileSystem(fsCopy)
          }
          break
        }
        case "rm": {
          if (!arg1) {
            output = "Usage: rm <file>"
            break
          }
          const possibleFilePath = [...currentPath, arg1]
          const fileNode = getNodeAtPath(fileSystem, possibleFilePath)
          if (!fileNode) {
            output = `rm: cannot remove '${arg1}': No such file or directory`
          } else if (fileNode.isDirectory) {
            output = `rm: cannot remove '${arg1}': Is a directory`
          } else {
            // Remove the file
            const fsCopy = JSON.parse(JSON.stringify(fileSystem))
            removeNodeAtPath(fsCopy, possibleFilePath)
            setFileSystem(fsCopy)
          }
          break
        }
        case "tree": {
          const startNode = arg1
            ? getNodeAtPath(fileSystem, [...currentPath, arg1])
            : getNodeAtPath(fileSystem, currentPath)

          if (!startNode) {
            output = `tree: '${arg1}': No such file or directory`
          } else if (!startNode.isDirectory) {
            output = `tree: '${arg1}': Not a directory`
          } else {
            output = generateTree(startNode, "", true, arg1 || "/").trim()
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

      if (addToHistory) {
        setShellHistory((history) => [
          ...history,
          { command: trimmedCommand, output }
        ])
      }
      setInputValue("")
    }
  }

  // Auto-scroll to bottom when shell history grows
  const shellContentsRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (shellContentsRef.current) {
      shellContentsRef.current.scrollTop = shellContentsRef.current.scrollHeight
    }
  }, [shellHistory])

  if (!isVisible) return null

  // If shellMode is activated, show the shell environment
  if (shellMode) {
    // Build a nice prompt display of the current directory
    const promptPath = "/" + currentPath.join("/")

    return (
      <div
        className="rounded-lg overflow-hidden border border-none bg-[#0E0E0E] shadow-lg relative w-full h-full flex flex-col"
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
              {/* Window control "lights" */}
              <div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                onClick={handleCloseClick}
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-gray-400 text-sm ml-2 font-mono">
              /bin/bash
            </div>
          </div>
        </div>

        <div
          ref={shellContentsRef}
          className="text-sm text-gray-200 font-mono px-4 py-4 overflow-auto flex-1 border-t border-gray-700"
        >
          {shellHistory.map((entry, idx) => (
            <div key={idx}>
              <div>
                <span className="text-green-500">root@asteroid</span>:
                <span className="text-blue-500">{promptPath}# </span>
                {entry.command}
              </div>
              {entry.output && <div>{entry.output}</div>}
            </div>
          ))}
        </div>

        {/* Command input */}
        <div className="px-4 py-2 bg-[#2D2D2D] flex items-center font-mono">
          <span className="text-green-500 mr-1">root@asteroid</span>:
          <span className="text-blue-500 mr-2">{promptPath}#</span>
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

  // Otherwise, show the code viewer interface
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
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
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
