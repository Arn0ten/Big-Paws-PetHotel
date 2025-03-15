export function AdminFooter() {
  return (
    <footer className="mt-auto border-t py-6 px-4 md:px-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          <span className="font-semibold text-foreground">Big Paws Pet Supplies</span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Help
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Licenses
          </a>
        </div>
        <p className="text-center text-xs text-muted-foreground md:text-right">
          2025, made with ❤️ by Arneabell, Canedo and Tan
          <br />
          Distributed by Big Paws Pet Supplies.
        </p>
      </div>
    </footer>
  )
}

