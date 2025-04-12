// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Eye, EyeOff } from "lucide-react"

// interface PasswordInputProps {
//   id: string
//   name: string
//   value: string
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//   placeholder?: string
//   required?: boolean
//   className?: string
// }

// export default function PasswordInput({
//   id,
//   name,
//   value,
//   onChange,
//   placeholder = "Enter your password",
//   required = false,
//   className = "",
// }: PasswordInputProps) {
//   const [showPassword, setShowPassword] = useState(false)

//   return (
//     <div className="relative">
//       <Input
//         id={id}
//         name={name}
//         type={showPassword ? "text" : "password"}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className={`pr-10 ${className}`}
//       />
//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//       >
//         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   )
// }
