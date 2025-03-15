import Link from "next/link"

export function AdminFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Big Paws Pet Hotel. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/terms-privacy" className="text-sm text-muted-foreground hover:underline">
            Terms & Privacy
          </Link>
          <Link href="/support" className="text-sm text-muted-foreground hover:underline">
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}

