"use client"

import type { ReactNode } from "react"
import BackButton from "./BackButton"

interface PageLayoutProps {
  title: string
  children: ReactNode
  onBack?: () => void
  backHref?: string
  backLabel?: string
  actions?: ReactNode
}

export default function PageLayout({
  title,
  children,
  onBack,
  backHref,
  backLabel = "Back",
  actions,
}: PageLayoutProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton onClick={onBack} href={backHref} label={backLabel} />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="bg-card rounded-lg border shadow-sm p-6">{children}</div>
    </div>
  )
}

