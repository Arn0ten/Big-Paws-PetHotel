import { format } from "date-fns"

interface Pet {
  id: string
  name: string
  type: string
  size: string
}

interface BoardingDetails {
  startDate: Date
  endDate: Date
  boardingType: "daycare" | "accommodation" | "cathotel"
  notes?: string
}

interface OwnerDetails {
  name: string
  email: string
}

export function generateBoardingConfirmationEmail(pet: Pet, boarding: BoardingDetails, owner: OwnerDetails) {
  const startDate = format(new Date(boarding.startDate), "PPP")
  const endDate = format(new Date(boarding.endDate), "PPP")

  let serviceName = ""
  let serviceDetails = ""

  switch (boarding.boardingType) {
    case "daycare":
      serviceName = "Day Care"
      serviceDetails = "8:00 AM to 7:00 PM"
      break
    case "accommodation":
      serviceName = "24Hrs Accommodation"
      serviceDetails = "Flexible Booking"
      break
    case "cathotel":
      serviceName = "Cat Hotel"
      serviceDetails = "Standard Room"
      break
  }

  const subject = `Boarding Confirmation for ${pet.name}`

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #4299e1; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
        <h1 style="margin: 0;">Big Paws Pet Hotel</h1>
        <p style="margin: 10px 0 0;">Boarding Confirmation</p>
      </div>
      
      <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 5px 5px;">
        <p>Dear ${owner.name},</p>
        
        <p>Thank you for choosing Big Paws Pet Hotel. We're excited to confirm your booking for ${pet.name}!</p>
        
        <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 15px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #2d3748;">Booking Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; width: 40%;"><strong>Pet Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${pet.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Pet Type:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Pet Size:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${pet.size}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Service:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Service Details:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${serviceDetails}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>Start Date:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${startDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><strong>End Date:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${endDate}</td>
            </tr>
            ${
              boarding.notes
                ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Additional Notes:</strong></td>
              <td style="padding: 8px 0;">${boarding.notes}</td>
            </tr>
            `
                : ""
            }
          </table>
        </div>
        
        <div style="background-color: #fffaf0; border: 1px solid #feebc8; border-radius: 5px; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #c05621;">Important Reminder</h3>
          <p style="margin-bottom: 0;">Please ensure your pet has complete vaccination and anti-rabies shots before arrival.</p>
        </div>
        
        <p>If you need to make any changes to your booking, please contact us at least 24 hours in advance.</p>
        
        <p>We look forward to taking care of ${pet.name}!</p>
        
        <p>Best regards,<br>Big Paws Pet Hotel Team</p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #718096; font-size: 14px;">
        <p>© 2023 Big Paws Pet Hotel. All rights reserved.</p>
        <p>Lapu-Lapu St. Infront of Philhealth Office, Tagum City</p>
      </div>
    </div>
  `

  const text = `
    Big Paws Pet Hotel - Boarding Confirmation
    
    Dear ${owner.name},
    
    Thank you for choosing Big Paws Pet Hotel. We're excited to confirm your booking for ${pet.name}!
    
    Booking Details:
    - Pet Name: ${pet.name}
    - Pet Type: ${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
    - Pet Size: ${pet.size}
    - Service: ${serviceName}
    - Service Details: ${serviceDetails}
    - Start Date: ${startDate}
    - End Date: ${endDate}
    ${boarding.notes ? `- Additional Notes: ${boarding.notes}` : ""}
    
    Important Reminder: Please ensure your pet has complete vaccination and anti-rabies shots before arrival.
    
    If you need to make any changes to your booking, please contact us at least 24 hours in advance.
    
    We look forward to taking care of ${pet.name}!
    
    Best regards,
    Big Paws Pet Hotel Team
    
    © 2023 Big Paws Pet Hotel. All rights reserved.
    Lapu-Lapu St. Infront of Philhealth Office, Tagum City
  `

  return {
    subject,
    html,
    text,
  }
}
