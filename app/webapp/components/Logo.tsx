import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "small" | "medium" | "large"
  showText?: boolean
  href?: string
}

export default function Logo({ size = "medium", showText = true, href = "/webapp" }: LogoProps) {
  const sizes = {
    small: { width: 30, height: 30, textSize: "text-lg" },
    medium: { width: 40, height: 40, textSize: "text-xl" },
    large: { width: 60, height: 60, textSize: "text-2xl" },
  }

  const { width, height, textSize } = sizes[size]

  const logo = (
    <div className="flex items-center space-x-2">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
        alt="Big Paws Pet Hotel Logo"
        width={width}
        height={height}
        className="h-auto w-auto"
      />
      {showText && <span className={`text-[#2e3357] font-bold ${textSize}`}>Big Paws Pet Hotel</span>}
    </div>
  )

  if (href) {
    return <Link href={href}>{logo}</Link>
  }

  return logo
}

