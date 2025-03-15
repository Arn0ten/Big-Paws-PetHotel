import Link from "next/link"
import { Heart } from "lucide-react"

export function AdminFooter() {
  return (
    <footer className="border-t py-6 w-full">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Big Paws Petsupplies</p>
          <p className="text-center text-xs text-muted-foreground md:text-left">
            2025, made with <Heart className="inline-block h-3 w-3 text-red-500" /> by Arneabell, Canedo and Tan
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/help" className="text-sm text-muted-foreground hover:underline">
            Help
          </Link>
          <Link href="/licenses" className="text-sm text-muted-foreground hover:underline">
            Licenses
          </Link>
          <span className="text-sm text-muted-foreground">Distributed by Big Paws Petsupplies</span>
        </div>
      </div>
    </footer>
  )
}

