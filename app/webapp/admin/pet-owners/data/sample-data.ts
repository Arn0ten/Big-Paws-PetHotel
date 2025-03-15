// This file contains sample data for development and testing
// BACKEND INTEGRATION: Replace this with actual API calls

import type { PetOwner } from "../utils/types"

export const generateSamplePetOwners = (): PetOwner[] => {
  const owners: PetOwner[] = [
    {
      id: "PO-001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, USA",
      joinDate: "2024-01-15",
      status: "Active",
      pets: [
        {
          id: "P-001",
          name: "Max",
          type: "Dog",
          breed: "Golden Retriever",
          age: 3,
          size: "Large",
          isBoarding: true,
          notes: "Friendly with other dogs",
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: "P-002",
          name: "Luna",
          type: "Cat",
          breed: "Siamese",
          age: 2,
          size: "Small",
          isBoarding: false,
          notes: "Needs special diet",
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    // Add more sample data here...
    {
      id: "PO-002",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Somewhere, USA",
      joinDate: "2024-02-01",
      status: "Active",
      pets: [
        {
          id: "P-003",
          name: "Charlie",
          type: "Dog",
          breed: "Poodle",
          age: 4,
          size: "Medium",
          isBoarding: false,
          notes: "Regular grooming needed",
          image: "/placeholder.svg?height=200&width=200",
        },
      ],
    },
    // Add at least 20 more sample entries...
  ]

  return owners
}

// BACKEND INTEGRATION POINT:
// Replace these functions with actual API calls

export async function fetchPetOwners() {
  // TODO: Replace with actual API call
  // Example API integration:
  // const response = await fetch('/api/pet-owners')
  // return response.json()

  return generateSamplePetOwners()
}

export async function createPetOwner(data: Omit<PetOwner, "id">) {
  // TODO: Replace with actual API call
  // Example API integration:
  // const response = await fetch('/api/pet-owners', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // })
  // return response.json()

  console.log("Creating pet owner:", data)
  return { id: `PO-${Math.random().toString(36).substr(2, 9)}`, ...data }
}

export async function updatePetOwner(id: string, data: Partial<PetOwner>) {
  // TODO: Replace with actual API call
  // Example API integration:
  // const response = await fetch(`/api/pet-owners/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // })
  // return response.json()

  console.log("Updating pet owner:", id, data)
  return { id, ...data }
}

export async function deletePetOwner(id: string) {
  // TODO: Replace with actual API call
  // Example API integration:
  // await fetch(`/api/pet-owners/${id}`, { method: 'DELETE' })

  console.log("Deleting pet owner:", id)
  return true
}

