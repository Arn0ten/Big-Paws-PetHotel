/**
 * Note templates for different request types
 *
 * These templates are used by the AI-powered note generation feature
 * to create personalized, professional notes for pet owners.
 *
 * The templates include placeholders that will be replaced with
 * actual data:
 * - {{petName}} - The name of the pet
 * - {{petOwnerName}} - The name of the pet owner
 * - {{mediaDescription}} - AI-generated description of the media
 * - {{groomingService}} - The grooming service provided
 * - {{extensionDuration}} - The duration of the boarding extension
 * - {{extensionUnit}} - The unit of the boarding extension (days/hours)
 * - {{newEndDate}} - The new end date for boarding extensions
 *
 * Note: This is a small sample of templates. In production, this file would
 * contain 1000+ templates per request type to ensure variety.
 */

// Photo request templates
export const photoTemplates = [
    "Hello {{petOwnerName}}! I'm happy to share these new photos of {{petName}} with you. {{mediaDescription}} {{petName}} is doing great and seems to be enjoying {{petName}}'s stay with us!",
  
    "Good news, {{petOwnerName}}! Here are the latest photos of {{petName}} as requested. {{mediaDescription}} Rest assured that {{petName}} is receiving excellent care during {{petName}}'s stay with us.",
  
    "We've captured some wonderful moments of {{petName}} today! {{mediaDescription}} {{petName}} continues to be a delightful guest, and we're taking great care of your furry friend.",
  
    "As requested, here are some fresh photos of {{petName}}! {{mediaDescription}} {{petName}} is adapting well to the boarding environment and receiving plenty of attention from our staff.",
  
    "Hello {{petOwnerName}}! We thought you'd enjoy these new photos of {{petName}}. {{mediaDescription}} {{petName}} is in great spirits and getting lots of love and care!",
  
    "We're pleased to share these new photos of {{petName}} with you! {{mediaDescription}} {{petName}} is doing wonderfully and receiving the best care possible during {{petName}}'s stay.",
  
    "Here are the photos you requested of {{petName}}! {{mediaDescription}} {{petName}} is having a great time with us and is being well taken care of by our attentive staff.",
  
    "We've taken some lovely photos of {{petName}} for you today. {{mediaDescription}} {{petName}} is adjusting well and receiving plenty of attention and care during {{petName}}'s stay with us.",
  
    "Hello {{petOwnerName}}! As requested, here are some recent photos of {{petName}}. {{mediaDescription}} {{petName}} is doing great and receiving excellent care from our team.",
  
    "We're happy to share these photos of {{petName}} with you! {{mediaDescription}} {{petName}} is in good spirits and being well cared for during {{petName}}'s boarding stay.",
  ]
  
  // Video request templates
  export const videoTemplates = [
    "Hello {{petOwnerName}}! I'm excited to share this video of {{petName}} with you. {{mediaDescription}} As you can see, {{petName}} is doing wonderfully and enjoying {{petName}}'s time with us!",
  
    "Good news, {{petOwnerName}}! Here's a video of {{petName}} as requested. {{mediaDescription}} {{petName}} is receiving excellent care and attention during {{petName}}'s stay.",
  
    "We've captured some great moments of {{petName}} in this video! {{mediaDescription}} {{petName}} continues to be a joy to have here, and we're taking great care of your furry friend.",
  
    "As requested, here's a video of {{petName}} for you! {{mediaDescription}} {{petName}} is adapting well to the boarding environment and receiving plenty of attention from our staff.",
  
    "Hello {{petOwnerName}}! We thought you'd enjoy seeing {{petName}} in action. {{mediaDescription}} {{petName}} is in great spirits and getting lots of love and care!",
  
    "We're pleased to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} is doing wonderfully and receiving the best care possible during {{petName}}'s stay.",
  
    "Here's the video you requested of {{petName}}! {{mediaDescription}} {{petName}} is having a great time with us and is being well taken care of by our attentive staff.",
  
    "We've recorded a video of {{petName}} for you today. {{mediaDescription}} {{petName}} is adjusting well and receiving plenty of attention and care during {{petName}}'s stay with us.",
  
    "Hello {{petOwnerName}}! As requested, here's a recent video of {{petName}}. {{mediaDescription}} {{petName}} is doing great and receiving excellent care from our team.",
  
    "We're happy to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} is in good spirits and being well cared for during {{petName}}'s boarding stay.",
  ]
  
  // Grooming request templates
  export const groomingTemplates = [
    "Hello {{petOwnerName}}! I'm pleased to inform you that {{petName}}'s {{groomingService}} has been completed. {{mediaDescription}} {{petName}} was very cooperative during the grooming session and looks absolutely wonderful!",
  
    "Good news, {{petOwnerName}}! {{petName}}'s {{groomingService}} is now complete. {{mediaDescription}} {{petName}} behaved very well during the grooming process, and the results are fantastic!",
  
    "We've completed the {{groomingService}} for {{petName}}! {{mediaDescription}} {{petName}} was a great client during the grooming session, and we're very pleased with how it turned out.",
  
    "{{petName}}'s {{groomingService}} has been successfully completed! {{mediaDescription}} {{petName}} was patient throughout the process, and we think you'll be delighted with the results.",
  
    "Hello {{petOwnerName}}! We've finished {{petName}}'s {{groomingService}}. {{mediaDescription}} {{petName}} was wonderful during the grooming session and looks absolutely adorable!",
  
    "We're pleased to inform you that {{petName}}'s {{groomingService}} is now complete. {{mediaDescription}} {{petName}} was very well-behaved, and the grooming turned out beautifully!",
  
    "{{petName}}'s {{groomingService}} has been completed as requested! {{mediaDescription}} {{petName}} was a pleasure to work with, and we're very happy with the results.",
  
    "We've finished the {{groomingService}} for {{petName}}. {{mediaDescription}} {{petName}} was cooperative throughout the process, and the grooming looks fantastic!",
  
    "Hello {{petOwnerName}}! {{petName}}'s {{groomingService}} is now complete. {{mediaDescription}} {{petName}} was a wonderful client, and we think you'll be very pleased with how it turned out.",
  
    "We're happy to inform you that we've completed {{petName}}'s {{groomingService}}. {{mediaDescription}} {{petName}} was very good during the grooming session, and the results are excellent!",
  ]
  
  // Boarding extension templates
  export const boardingExtensionTemplates = [
    "Hello {{petOwnerName}}! I'm pleased to confirm that {{petName}}'s boarding stay has been extended by {{extensionDuration}} {{extensionUnit}} as requested. The new end date is {{newEndDate}}. {{petName}} is doing great, and we're happy to continue providing excellent care for your furry friend!",
  
    "Good news, {{petOwnerName}}! We've approved the extension of {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}}. The updated end date is now {{newEndDate}}. {{petName}} is adjusting well, and we'll continue to ensure {{petName}} receives the best care possible.",
  
    "We've processed your request to extend {{petName}}'s boarding by {{extensionDuration}} {{extensionUnit}}. The new checkout date is {{newEndDate}}. {{petName}} is doing wonderfully, and we're delighted to continue caring for {{petName}} during this extended period.",
  
    "{{petName}}'s boarding extension has been confirmed for {{extensionDuration}} additional {{extensionUnit}}. The new end date is {{newEndDate}}. {{petName}} is in great spirits, and we'll continue to provide the excellent care you expect for your pet.",
  
    "Hello {{petOwnerName}}! We've extended {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}} as requested. The updated end date is {{newEndDate}}. {{petName}} is doing very well, and we're happy to continue caring for your pet during this extended period.",
  
    "We're pleased to confirm that {{petName}}'s boarding has been extended by {{extensionDuration}} {{extensionUnit}}. The new checkout date is {{newEndDate}}. {{petName}} continues to be a wonderful guest, and we'll ensure {{petName}} receives the same great care throughout the extended stay.",
  
    "{{petName}}'s boarding extension for {{extensionDuration}} additional {{extensionUnit}} has been processed. The new end date is {{newEndDate}}. {{petName}} is adapting well to the boarding environment, and we'll continue to take excellent care of your pet.",
  
    "We've approved the extension of {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}}. The updated checkout date is {{newEndDate}}. {{petName}} is doing great, and we're happy to continue providing the best care for your furry friend.",
  
    "Hello {{petOwnerName}}! {{petName}}'s boarding has been extended by {{extensionDuration}} {{extensionUnit}} as requested. The new end date is {{newEndDate}}. {{petName}} is in good health and spirits, and we'll continue to ensure {{petName}} receives excellent care during this extended stay.",
  
    "We're happy to confirm that we've extended {{petName}}'s boarding by {{extensionDuration}} {{extensionUnit}}. The updated checkout date is {{newEndDate}}. {{petName}} is doing wonderfully, and we look forward to continuing to care for your pet!",
  ]
  
  // Custom request templates
  export const customTemplates = [
    "Hello {{petOwnerName}}! I'm pleased to inform you that we've addressed your custom request for {{petName}}. {{petName}} is doing great, and we're happy to accommodate your specific needs to ensure the best care for your furry friend!",
  
    "Good news, {{petOwnerName}}! We've processed your custom request for {{petName}}. {{petName}} is adjusting well, and we're committed to meeting your specific requirements to provide the best possible care.",
  
    "We've completed your custom request for {{petName}}. {{petName}} is doing wonderfully, and we're delighted to accommodate your specific needs during {{petName}}'s stay with us.",
  
    "Your custom request for {{petName}} has been fulfilled. {{petName}} is in great spirits, and we're dedicated to providing the personalized care you've requested for your pet.",
  
    "Hello {{petOwnerName}}! We've addressed your custom request for {{petName}} as specified. {{petName}} is doing very well, and we're happy to accommodate your specific requirements during {{petName}}'s stay.",
  
    "We're pleased to confirm that we've fulfilled your custom request for {{petName}}. {{petName}} continues to be a wonderful guest, and we're committed to providing the specialized care you've requested.",
  
    "Your custom request for {{petName}} has been processed and implemented. {{petName}} is adapting well to the boarding environment, and we're dedicated to meeting your specific needs for your pet's care.",
  
    "We've addressed your custom request for {{petName}} as specified. {{petName}} is doing great, and we're happy to provide the personalized care you've requested for your furry friend.",
  
    "Hello {{petOwnerName}}! Your custom request for {{petName}} has been fulfilled as requested. {{petName}} is in good health and spirits, and we're committed to providing the specialized care you've specified during {{petName}}'s stay.",
  
    "We're happy to confirm that we've addressed your custom request for {{petName}}. {{petName}} is doing wonderfully, and we look forward to continuing to provide the personalized care you've requested for your pet!",
  ]
  
  // Media description templates for AI to use as a starting point
  export const mediaDescriptionTemplates = {
    photo: {
      dog: [
        "In these photos, {{petName}} looks happy and relaxed, enjoying {{petName}}'s time in our play area.",
        "These photos show {{petName}} having a great time during outdoor activities, with a wagging tail and bright eyes.",
        "{{petName}} appears comfortable and content in these photos, resting peacefully in {{petName}}'s designated space.",
        "These snapshots capture {{petName}} socializing with our staff, clearly enjoying the attention and care.",
        "In these images, {{petName}} looks healthy and well-groomed, with a shiny coat and alert expression.",
      ],
      cat: [
        "These photos show {{petName}} looking comfortable and content in {{petName}}'s cozy resting area.",
        "In these images, {{petName}} appears relaxed and at ease, enjoying some quiet time in our cat-friendly spaces.",
        "{{petName}} looks curious and playful in these photos, exploring the enrichment toys we provided.",
        "These snapshots capture {{petName}}'s peaceful moments, comfortably settled in {{petName}}'s favorite spot.",
        "In these photos, {{petName}} appears well-adjusted and calm, with bright eyes and a healthy appearance.",
      ],
      other: [
        "These photos show {{petName}} looking comfortable in {{petName}}'s specialized habitat.",
        "In these images, {{petName}} appears to be adapting well to the boarding environment.",
        "{{petName}} looks healthy and active in these photos, enjoying the appropriate enrichment for {{petName}}'s species.",
        "These snapshots capture {{petName}} during feeding time, showing good appetite and energy.",
        "In these photos, {{petName}} appears well-cared for and content in {{petName}}'s specialized accommodation.",
      ],
    },
    video: {
      dog: [
        "In this video, {{petName}} is happily playing with toys and showing lots of energy and enthusiasm.",
        "The video captures {{petName}} enjoying some outdoor time, exploring and sniffing around with curiosity.",
        "{{petName}} can be seen interacting positively with our staff, showing {{petName}}'s friendly and social nature.",
        "This footage shows {{petName}} during playtime, running and jumping with obvious joy and excitement.",
        "In the video, {{petName}} appears relaxed and content, wagging {{petName}}'s tail and showing signs of being comfortable in our care.",
      ],
      cat: [
        "This video shows {{petName}} playfully engaging with the toys we provided, showing good energy and curiosity.",
        "In the footage, {{petName}} can be seen exploring {{petName}}'s environment with typical feline curiosity and grace.",
        "The video captures {{petName}} during a relaxed moment, purring and showing signs of contentment.",
        "{{petName}} demonstrates {{petName}}'s playful side in this video, batting at toys and showing good activity levels.",
        "This footage shows {{petName}} enjoying some interactive playtime with our staff, responding well to gentle attention.",
      ],
      other: [
        "The video shows {{petName}} active and alert in {{petName}}'s specialized habitat.",
        "In this footage, {{petName}} can be seen engaging with appropriate enrichment activities for {{petName}}'s species.",
        "The video captures {{petName}}'s natural behaviors, indicating good adjustment to the boarding environment.",
        "{{petName}} appears healthy and active in this video, moving around with normal energy for {{petName}}'s species.",
        "This footage demonstrates {{petName}}'s good adaptation to our care, showing normal behavior patterns and comfort.",
      ],
    },
  }
  
  // Closing message templates
  export const closingMessageTemplates = [
    "If you have any questions or need further updates, please don't hesitate to contact us. We're here to ensure {{petName}}'s stay is comfortable and enjoyable!",
  
    "We'll continue to take excellent care of {{petName}} during {{petName}}'s stay with us. Feel free to reach out if you need anything else!",
  
    "Rest assured that {{petName}} is receiving the best care possible. Please let us know if you have any questions or concerns.",
  
    "We're committed to making {{petName}}'s stay with us a positive experience. Don't hesitate to contact us if you need any additional information.",
  
    "{{petName}} is in good hands, and we'll continue to provide updates as requested. Please reach out if there's anything else you need!",
  
    "We're enjoying having {{petName}} with us and will ensure {{petName}} receives the best care throughout {{petName}}'s stay. Feel free to contact us with any questions!",
  
    "It's our pleasure to care for {{petName}} during {{petName}}'s time with us. Please let us know if you need anything else!",
  
    "We'll continue to monitor {{petName}}'s well-being and provide the care {{petName}} needs. Don't hesitate to reach out if you have any concerns.",
  
    "{{petName}}'s comfort and well-being are our top priorities. Please contact us if you need any additional information or have any questions.",
  
    "We're dedicated to making {{petName}}'s stay with us a positive experience. Feel free to reach out if you need anything else!",
  ]
  
  /**
   * Helper function to get a random template from an array
   */
  export function getRandomTemplate(templates: string[]): string {
    const randomIndex = Math.floor(Math.random() * templates.length)
    return templates[randomIndex]
  }
  
  /**
   * Helper function to get a random media description template based on pet type and media type
   */
  export function getRandomMediaDescriptionTemplate(
    mediaType: "photo" | "video",
    petType: "dog" | "cat" | "other",
  ): string {
    const templates = mediaDescriptionTemplates[mediaType][petType]
    return getRandomTemplate(templates)
  }
  
  /**
   * Helper function to get a random closing message template
   */
  export function getRandomClosingMessageTemplate(): string {
    return getRandomTemplate(closingMessageTemplates)
  }
  
  /**
   * Function to generate a complete note based on request type and details
   */
  export function generateNote(request: any, mediaDescription = ""): string {
    let template = ""
    let closingMessage = getRandomClosingMessageTemplate()
  
    // Select template based on request type
    switch (request.type) {
      case "photo":
        template = getRandomTemplate(photoTemplates)
        break
      case "video":
        template = getRandomTemplate(videoTemplates)
        break
      case "grooming":
        template = getRandomTemplate(groomingTemplates)
        break
      case "boarding-extension":
        template = getRandomTemplate(boardingExtensionTemplates)
        break
      default:
        template = getRandomTemplate(customTemplates)
    }
  
    // Replace placeholders with actual values
    let note = template
      .replace(/{{petName}}/g, request.petName || "your pet")
      .replace(/{{petOwnerName}}/g, request.petOwnerName || "valued customer")
      .replace(/{{mediaDescription}}/g, mediaDescription || "")
  
    // Replace additional placeholders based on request type
    if (request.type === "grooming" && request.groomingService) {
      const formattedService = request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  
      note = note.replace(/{{groomingService}}/g, formattedService)
    }
  
    if (request.type === "boarding-extension" && request.extensionDetails) {
      note = note
        .replace(/{{extensionDuration}}/g, request.extensionDetails.duration || "")
        .replace(/{{extensionUnit}}/g, request.extensionDetails.unit || "")
        .replace(/{{newEndDate}}/g, request.newEndDate || "")
    }
  
    // Add closing message
    closingMessage = closingMessage.replace(/{{petName}}/g, request.petName || "your pet")
  
    return `${note}\n\n${closingMessage}`
  }
  
  /**
   * Function to analyze media and generate a description
   * In a real implementation, this would use AI to analyze the media
   * For this demo, we'll use predefined templates based on pet type
   */
  export function analyzeMedia(request: any, files: File[]): string {
    // Determine if this is a photo or video request
    const mediaType = request.type === "photo" ? "photo" : "video"
  
    // Determine pet type (in a real implementation, this would come from the pet's profile)
    // For this demo, we'll assume dogs are the default
    const petType = "dog"
  
    // Get a random media description template
    const descriptionTemplate = getRandomMediaDescriptionTemplate(mediaType, petType)
  
    // Replace pet name in the description
    let description = descriptionTemplate.replace(/{{petName}}/g, request.petName || "your pet")
  
    // Add information about the number of files for photo requests
    if (mediaType === "photo" && files.length > 0) {
      description = `We've taken ${files.length} photo${files.length > 1 ? "s" : ""} of ${request.petName}. ${description}`
    }
  
    return description
  }
  
  