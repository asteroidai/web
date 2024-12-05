import * as React from "react"

import { Terminal } from "./Terminal"

export function InstallTabs() {
  return (
    <div className="mt-48">
      <Terminal code={`pip install asteroid_sdk`} language="python" lineNumbers={false} filename="install.py" />
    </div>
  )
}

