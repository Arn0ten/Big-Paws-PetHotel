import type React from "react"
import { Link } from "react-router-dom"

const PetOwnerHeader: React.FC = () => {
  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pet Owner Dashboard</h1>
          <nav className="flex items-center space-x-4 text-primary">
            <Link to="/pets" className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
              My Pets
            </Link>
            <Link
              to="/profile"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default PetOwnerHeader

