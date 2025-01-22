import * as React from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  id?: string
}

export default function Section({ title, subtitle, children, id }: SectionProps) {
  return (
    <div id={id} className="container max-w-6xl mx-auto">
      <div className="w-full space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-center text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
