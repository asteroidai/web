import * as React from "react"

import { Terminal } from "./Terminal"

export function InstallTerminal() {
  return (
    <div className="fixed bottom-8 right-8 z-50 hidden xl:block">
      <div className="w-64 h-24">
        <Terminal code={`pip install asteroid_sdk`} language="python" lineNumbers={false} filename="install.sh" allowClose={false} />
      </div>
    </div>
  )
}

