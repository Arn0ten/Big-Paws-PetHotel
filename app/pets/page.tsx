"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Pet {
  id: number
  name: string
  breed: string
  age: number
}

interface Owner {
  name: string
  email: string
}

interface BoardingRequest {
  petId: number
  startDate: Date
  endDate: Date
}

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [showBoardingDialog, setShowBoardingDialog] = useState(false)

  useEffect(() => {
    // Replace with actual API call to fetch pets
    const mockPets: Pet[] = [
      { id: 1, name: "Buddy", breed: "Golden Retriever", age: 3 },
      { id: 2, name: "Lucy", breed: "Labrador", age: 5 },
      { id: 3, name: "Max", breed: "Poodle", age: 2 },
    ]
    setPets(mockPets)
  }, [])

  const handleBoardingRequest = (pet: Pet) => {
    setSelectedPet(pet)
    setShowBoardingDialog(true)
  }

  const handleBoardingSubmit = (boardingRequest: BoardingRequest) => {
    // Replace with actual API call to submit boarding request
    console.log("Boarding Request Submitted:", boardingRequest)
    setShowBoardingDialog(false)
  }

  return (
    <div>
      <h1>Pet List</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} ({pet.breed}, {pet.age} years old)
            <button onClick={() => handleBoardingRequest(pet)}>Request Boarding</button>
          </li>
        ))}
      </ul>
      <BoardingDialog
        open={showBoardingDialog}
        onClose={() => setShowBoardingDialog(false)}
        onSubmit={handleBoardingSubmit}
        pet={selectedPet}
        owner={{
          name: "John Doe", // Replace with actual owner data
          email: "owner@example.com", // Replace with actual owner email
        }}
      />
    </div>
  )
}

interface BoardingDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (boardingRequest: BoardingRequest) => void
  pet: Pet | null
  owner: Owner
}

const BoardingDialog: React.FC<BoardingDialogProps> = ({ open, onClose, onSubmit, pet, owner }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  if (!open || !pet) {
    return null
  }

  const handleSubmit = () => {
    if (startDate && endDate) {
      onSubmit({ petId: pet.id, startDate, endDate })
    } else {
      alert("Please select both start and end dates.")
    }
  }

  return (
    <div
      style={{
        display: open ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h2>Boarding Request for {pet.name}</h2>
        <p>
          Owner: {owner.name} ({owner.email})
        </p>
        <label>
          Start Date:
          <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
        </label>
        <br />
        <label>
          End Date:
          <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default PetList

