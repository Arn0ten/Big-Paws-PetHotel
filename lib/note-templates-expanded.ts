/**
 * Expanded Note Templates for Request Processing
 *
 * This file contains a comprehensive collection of message templates for different request types.
 * These templates are used to generate processing notes for pet owners.
 *
 * Each template includes placeholders that will be replaced with actual values:
 * - {{petName}} - The name of the pet
 * - {{ownerName}} - The name of the pet owner
 * - {{mediaCount}} - The number of media files (photos/videos)
 * - {{groomingService}} - The type of grooming service
 * - {{extensionDuration}} - The duration of the boarding extension
 * - {{extensionUnit}} - The unit of the extension (days/hours)
 * - {{newEndDate}} - The new end date after extension
 * - {{mediaDescription}} - Description of the media content
 */

// Photo Request Templates - 25 variations
export const photoRequestTemplates = [
  "I'm delighted to share these photos of {{petName}} with you! {{mediaDescription}} {{petName}} is doing wonderfully in our care and seems to be enjoying {{petName}}'s stay with us. Please let us know if you need anything else!",

  "Here are the latest photos of {{petName}}! {{mediaDescription}} {{petName}} has been a joy to have here, and we wanted to share these special moments with you. Feel free to reach out if you'd like more updates!",

  "We've captured some wonderful moments of {{petName}} for you! {{mediaDescription}} {{petName}} is adapting well to the boarding environment and has been a delightful guest. We hope these photos bring you joy!",

  "Happy to share these snapshots of {{petName}} with you! {{mediaDescription}} {{petName}} is in great spirits and receiving lots of care and attention. We hope these photos help you feel connected while you're away!",

  "We've taken some lovely photos of {{petName}} for you to enjoy! {{mediaDescription}} {{petName}} is doing great and receiving plenty of love and care. We hope these images bring a smile to your face!",

  "Sending you these wonderful photos of {{petName}}! {{mediaDescription}} {{petName}} is settling in nicely and has been a pleasure to care for. We hope these pictures help ease any worries you might have!",

  "We thought you'd appreciate seeing how {{petName}} is doing! {{mediaDescription}} {{petName}} is receiving excellent care and seems to be enjoying {{petName}}'s time with us. Please let us know if you'd like more updates!",

  "Here are some heartwarming photos of {{petName}} for you! {{mediaDescription}} {{petName}} is doing splendidly and has adjusted well to our facility. We hope these images bring you comfort while you're away!",

  "We've captured these special moments of {{petName}} to share with you! {{mediaDescription}} {{petName}} is in great health and spirits. We hope these photos help you feel connected to {{petName}} during your time apart!",

  "Sharing these lovely photos of {{petName}} as requested! {{mediaDescription}} {{petName}} is receiving the best care possible and has been a wonderful guest. We hope these images bring you joy!",

  "Just wanted to send you these adorable photos of {{petName}}! {{mediaDescription}} {{petName}} is thriving in our care and making friends with our staff. We hope these pictures brighten your day!",

  "We're pleased to share these new photos of {{petName}} with you! {{mediaDescription}} {{petName}} is adjusting wonderfully to the boarding routine and seems very content. We hope you enjoy these snapshots!",

  "Here are some precious moments we captured of {{petName}}! {{mediaDescription}} {{petName}} is doing fantastically well and receiving lots of attention from our team. We hope these photos reassure you that {{petName}} is in good hands!",

  "We've snapped these cute photos of {{petName}} for you! {{mediaDescription}} {{petName}} is happy, healthy, and enjoying {{petName}}'s stay with us. We hope these images bring you comfort while you're away!",

  "Sharing these delightful photos of {{petName}} as you requested! {{mediaDescription}} {{petName}} is adapting beautifully to our facility and has been a perfect guest. We hope these pictures make you smile!",

  "We thought you might like to see these photos of {{petName}}! {{mediaDescription}} {{petName}} is doing excellently and receiving plenty of care and attention. We hope these images help you feel connected to {{petName}} during your time apart!",

  "Here are some wonderful snapshots of {{petName}} for you to enjoy! {{mediaDescription}} {{petName}} is in great spirits and has settled in nicely. We hope these photos bring you peace of mind!",

  "We're happy to share these photos of {{petName}} with you! {{mediaDescription}} {{petName}} is thriving in our care and has been a joy to look after. We hope these images help you feel close to {{petName}} while you're away!",

  "Sending along these lovely photos of {{petName}}! {{mediaDescription}} {{petName}} is doing wonderfully and receiving lots of love from our staff. We hope these pictures reassure you that {{petName}} is happy and well cared for!",

  "We've captured these special moments with {{petName}} to share with you! {{mediaDescription}} {{petName}} is adjusting perfectly to the boarding environment and seems very content. We hope these photos bring you joy!",

  "Here are some adorable photos of {{petName}} as requested! {{mediaDescription}} {{petName}} is in excellent health and spirits, and has been a delight to care for. We hope these images make you smile!",

  "We thought you'd love to see these new photos of {{petName}}! {{mediaDescription}} {{petName}} is doing splendidly and receiving the best care possible. We hope these pictures help ease any concerns you might have!",

  "Sharing these heartwarming photos of {{petName}} with you! {{mediaDescription}} {{petName}} is adapting beautifully to our facility and has been a wonderful guest. We hope these images bring you comfort during your time apart!",

  "We've taken these lovely snapshots of {{petName}} for you! {{mediaDescription}} {{petName}} is happy, healthy, and enjoying {{petName}}'s stay with us. We hope these photos help you feel connected to {{petName}} while you're away!",

  "Here are some precious moments we've captured of {{petName}}! {{mediaDescription}} {{petName}} is thriving in our care and has been a joy to look after. We hope these pictures brighten your day!",
]

// Video Request Templates - 25 variations
export const videoRequestTemplates = [
  "I'm excited to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} is doing wonderfully in our care, and we thought you'd enjoy seeing {{petName}} in action. Please let us know if you need anything else!",

  "Here's a special video of {{petName}} that we captured for you! {{mediaDescription}} {{petName}} has been a joy to have here, and we wanted to share this moment with you. Feel free to reach out if you'd like more updates!",

  "We've recorded this wonderful video of {{petName}} for you! {{mediaDescription}} {{petName}} is adapting well to the boarding environment and has been a delightful guest. We hope this video brings you joy!",

  "Happy to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} is in great spirits and receiving lots of care and attention. We hope this video helps you feel connected while you're away!",

  "We've captured some lovely moments of {{petName}} on video for you to enjoy! {{mediaDescription}} {{petName}} is doing great and receiving plenty of love and care. We hope this brings a smile to your face!",

  "Sending you this wonderful video of {{petName}}! {{mediaDescription}} {{petName}} is settling in nicely and has been a pleasure to care for. We hope this footage helps ease any worries you might have!",

  "We thought you'd appreciate seeing how {{petName}} is doing in this video! {{mediaDescription}} {{petName}} is receiving excellent care and seems to be enjoying {{petName}}'s time with us. Please let us know if you'd like more updates!",

  "Here's a heartwarming video of {{petName}} for you! {{mediaDescription}} {{petName}} is doing splendidly and has adjusted well to our facility. We hope this video brings you comfort while you're away!",

  "We've recorded these special moments of {{petName}} to share with you! {{mediaDescription}} {{petName}} is in great health and spirits. We hope this video helps you feel connected to {{petName}} during your time apart!",

  "Sharing this lovely video of {{petName}} as requested! {{mediaDescription}} {{petName}} is receiving the best care possible and has been a wonderful guest. We hope this footage brings you joy!",

  "We're delighted to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} is thriving in our care and making friends with our staff. We hope this footage brightens your day!",

  "Here's a fun video we captured of {{petName}}! {{mediaDescription}} {{petName}} is adjusting wonderfully to the boarding routine and seems very content. We hope you enjoy watching {{petName}} in action!",

  "We've recorded some precious moments with {{petName}} for you! {{mediaDescription}} {{petName}} is doing fantastically well and receiving lots of attention from our team. We hope this video reassures you that {{petName}} is in good hands!",

  "Happy to share this delightful video of {{petName}} with you! {{mediaDescription}} {{petName}} is happy, healthy, and enjoying {{petName}}'s stay with us. We hope this footage brings you comfort while you're away!",

  "Sending along this wonderful video of {{petName}} as you requested! {{mediaDescription}} {{petName}} is adapting beautifully to our facility and has been a perfect guest. We hope this video makes you smile!",

  "We thought you might like to see {{petName}} in action! {{mediaDescription}} {{petName}} is doing excellently and receiving plenty of care and attention. We hope this video helps you feel connected to {{petName}} during your time apart!",

  "Here's a special video of {{petName}} for you to enjoy! {{mediaDescription}} {{petName}} is in great spirits and has settled in nicely. We hope this footage brings you peace of mind!",

  "We're happy to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} is thriving in our care and has been a joy to look after. We hope this footage helps you feel close to {{petName}} while you're away!",

  "We've captured these special video moments with {{petName}} to share with you! {{mediaDescription}} {{petName}} is adjusting perfectly to the boarding environment and seems very content. We hope this brings you joy!",

  "Here's an adorable video of {{petName}} as requested! {{mediaDescription}} {{petName}} is in excellent health and spirits, and has been a delight to care for. We hope this footage makes you smile!",

  "We thought you'd love to see this new video of {{petName}}! {{mediaDescription}} {{petName}} is doing splendidly and receiving the best care possible. We hope this helps ease any concerns you might have!",

  "Sharing this heartwarming video of {{petName}} with you! {{mediaDescription}} {{petName}} is adapting beautifully to our facility and has been a wonderful guest. We hope this brings you comfort during your time apart!",

  "We've recorded this lovely video of {{petName}} for you! {{mediaDescription}} {{petName}} is happy, healthy, and enjoying {{petName}}'s stay with us. We hope this helps you feel connected to {{petName}} while you're away!",

  "Here are some precious moments we've captured on video of {{petName}}! {{mediaDescription}} {{petName}} is thriving in our care and has been a joy to look after. We hope this footage brightens your day!",

  "We're excited to share this video of {{petName}} with you! {{mediaDescription}} {{petName}} has been such a good pet during {{petName}}'s stay, and we wanted to show you how well {{petName}} is doing. We hope you enjoy watching!",
]

// Grooming Service Templates - 25 variations
export const groomingServiceTemplates = [
  "I'm pleased to inform you that {{petName}}'s {{groomingService}} has been completed successfully! {{mediaDescription}} {{petName}} was very well-behaved during the grooming session, and we're delighted with the results. {{petName}} looks absolutely wonderful! Please let us know if you have any questions about the grooming service.",

  "We've completed the {{groomingService}} for {{petName}}! {{mediaDescription}} {{petName}} was a perfect client during the grooming process, and the results are fantastic. {{petName}} looks fresh, clean, and absolutely adorable! Feel free to reach out if you need any grooming tips for home care.",

  "{{petName}}'s {{groomingService}} has been completed with great results! {{mediaDescription}} {{petName}} was cooperative throughout the session, making it a pleasant experience for everyone. {{petName}} looks amazing with {{petName}}'s fresh new look! Please let us know if you have any questions.",

  "Happy to report that {{petName}}'s {{groomingService}} is now complete! {{mediaDescription}} {{petName}} was wonderful during the grooming process, and we're thrilled with how it turned out. {{petName}} looks refreshed and absolutely charming! Feel free to ask if you need any advice on maintaining {{petName}}'s coat between grooming sessions.",

  "We've finished {{petName}}'s {{groomingService}}, and the results are wonderful! {{mediaDescription}} {{petName}} was patient and well-behaved throughout the session. {{petName}} looks clean, refreshed, and absolutely delightful! Please let us know if you have any questions about the grooming service provided.",

  "{{petName}}'s {{groomingService}} has been completed successfully! {{mediaDescription}} {{petName}} was a joy to work with during the grooming session. {{petName}} looks fantastic with {{petName}}'s fresh, clean appearance! Feel free to reach out if you need any tips for maintaining {{petName}}'s coat at home.",

  "We've completed the {{groomingService}} for {{petName}} with excellent results! {{mediaDescription}} {{petName}} was very cooperative during the grooming process, making it a smooth experience. {{petName}} looks absolutely stunning with {{petName}}'s fresh new look! Please let us know if you have any questions.",

  "I'm happy to inform you that {{petName}}'s {{groomingService}} is now complete! {{mediaDescription}} {{petName}} was a perfect client throughout the session. {{petName}} looks refreshed, clean, and absolutely adorable! Feel free to ask if you need any advice on home grooming care.",

  "{{petName}}'s {{groomingService}} has been completed, and the results are fantastic! {{mediaDescription}} {{petName}} was well-behaved and patient during the entire process. {{petName}} looks wonderful with {{petName}}'s fresh, clean appearance! Please let us know if you have any questions about the service.",

  "We've successfully completed the {{groomingService}} for {{petName}}! {{mediaDescription}} {{petName}} was cooperative and calm throughout the session. {{petName}} looks absolutely marvelous with {{petName}}'s fresh new look! Feel free to reach out if you need any grooming tips for home care.",

  "I'm delighted to let you know that we've completed {{petName}}'s {{groomingService}}! {{mediaDescription}} {{petName}} was such a good pet during the grooming session. {{petName}} looks absolutely gorgeous with {{petName}}'s new clean and tidy appearance! Please let us know if you have any questions about the service.",

  "The {{groomingService}} for {{petName}} has been completed successfully! {{mediaDescription}} {{petName}} was very patient throughout the process, and we're very pleased with the results. {{petName}} looks fresh, clean, and absolutely beautiful! Feel free to ask if you need any grooming advice.",

  "We've finished {{petName}}'s {{groomingService}} with great results! {{mediaDescription}} {{petName}} was wonderfully cooperative during the session. {{petName}} looks amazing with {{petName}}'s fresh new appearance! Please let us know if you have any questions about maintaining the look.",

  "Happy to inform you that {{petName}}'s {{groomingService}} is complete! {{mediaDescription}} {{petName}} was a perfect client and made the grooming process very smooth. {{petName}} looks refreshed and absolutely stunning! Feel free to reach out if you need any tips for home care.",

  "{{petName}}'s {{groomingService}} has been completed, and we're thrilled with the results! {{mediaDescription}} {{petName}} was well-behaved throughout the entire session. {{petName}} looks clean, tidy, and absolutely adorable! Please let us know if you have any questions about the service provided.",

  "We've completed the {{groomingService}} for {{petName}} with excellent results! {{mediaDescription}} {{petName}} was very cooperative, making the grooming experience pleasant for everyone. {{petName}} looks fantastic with {{petName}}'s fresh, clean look! Feel free to ask if you need any grooming advice.",

  "I'm pleased to inform you that {{petName}}'s {{groomingService}} has been successfully completed! {{mediaDescription}} {{petName}} was patient and calm throughout the session. {{petName}} looks absolutely wonderful with {{petName}}'s new appearance! Please let us know if you have any questions.",

  "The {{groomingService}} for {{petName}} is now complete! {{mediaDescription}} {{petName}} was a joy to work with during the grooming process. {{petName}} looks refreshed, clean, and absolutely charming! Feel free to reach out if you need any tips for maintaining {{petName}}'s coat.",

  "We've finished {{petName}}'s {{groomingService}}, and the results are beautiful! {{mediaDescription}} {{petName}} was very well-behaved throughout the session. {{petName}} looks clean, fresh, and absolutely delightful! Please let us know if you have any questions about the service.",

  "{{petName}}'s {{groomingService}} has been completed with great success! {{mediaDescription}} {{petName}} was cooperative and made the grooming process smooth. {{petName}} looks absolutely stunning with {{petName}}'s fresh new look! Feel free to ask if you need any grooming advice for home care.",

  "I'm happy to let you know that we've completed {{petName}}'s {{groomingService}}! {{mediaDescription}} {{petName}} was such a good pet during the session. {{petName}} looks refreshed and absolutely beautiful! Please let us know if you have any questions about maintaining the look.",

  "The {{groomingService}} for {{petName}} has been completed, and we're very pleased with the results! {{mediaDescription}} {{petName}} was patient and well-behaved throughout the process. {{petName}} looks clean, tidy, and absolutely gorgeous! Feel free to reach out if you need any grooming tips.",

  "We've successfully completed {{petName}}'s {{groomingService}}! {{mediaDescription}} {{petName}} was wonderfully cooperative during the session. {{petName}} looks amazing with {{petName}}'s fresh, clean appearance! Please let us know if you have any questions about the service.",

  "I'm delighted to inform you that {{petName}}'s {{groomingService}} is now complete! {{mediaDescription}} {{petName}} was a perfect client throughout the grooming process. {{petName}} looks refreshed, clean, and absolutely adorable! Feel free to ask if you need any advice on home care.",

  "{{petName}}'s {{groomingService}} has been completed with excellent results! {{mediaDescription}} {{petName}} was very well-behaved and made the session enjoyable. {{petName}} looks wonderful with {{petName}}'s fresh new look! Please let us know if you have any questions about the service provided.",
]

// Boarding Extension Templates - 25 variations
export const boardingExtensionTemplates = [
  "I'm pleased to confirm that {{petName}}'s boarding stay has been extended by {{extensionDuration}} {{extensionUnit}} as requested. The new end date for {{petName}}'s stay is now {{newEndDate}}. {{petName}} is doing wonderfully in our care, and we're happy to accommodate this extension. Please let us know if you need anything else!",

  "We've processed your request to extend {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}}. {{petName}}'s boarding is now scheduled to end on {{newEndDate}}. {{petName}} is adapting well and receiving excellent care. We're glad to be able to accommodate this change for you!",

  "Your request to extend {{petName}}'s boarding by {{extensionDuration}} {{extensionUnit}} has been approved. The new checkout date is {{newEndDate}}. {{petName}} is doing great with us and continues to receive the best care possible. Please feel free to contact us if you need any further adjustments!",

  "We've confirmed the {{extensionDuration}} {{extensionUnit}} extension for {{petName}}'s stay. {{petName}} will now be with us until {{newEndDate}}. {{petName}} is in excellent spirits and adjusting well to the boarding environment. We're happy to accommodate this change for you!",

  "{{petName}}'s boarding extension has been processed successfully. We've added {{extensionDuration}} {{extensionUnit}} to {{petName}}'s stay, with the new end date set for {{newEndDate}}. {{petName}} is doing wonderfully and receiving plenty of attention and care. Please let us know if you need anything else!",

  "I'm happy to confirm that we've extended {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}} as requested. {{petName}} will now be with us until {{newEndDate}}. {{petName}} is in great health and spirits, and we're pleased to continue providing care for the extended period!",

  "Your request for a {{extensionDuration}} {{extensionUnit}} extension to {{petName}}'s boarding has been approved. The new checkout date is {{newEndDate}}. {{petName}} is doing splendidly with us and continues to receive excellent care. Feel free to reach out if you need anything else!",

  "We've processed the extension for {{petName}}'s stay. The boarding period has been extended by {{extensionDuration}} {{extensionUnit}}, with the new end date set for {{newEndDate}}. {{petName}} is adapting well and receiving the best care possible. Please let us know if you need any further adjustments!",

  "{{petName}}'s boarding extension has been confirmed. We've added {{extensionDuration}} {{extensionUnit}} to {{petName}}'s stay, and the new checkout date is {{newEndDate}}. {{petName}} is doing wonderfully in our care, and we're happy to accommodate this change for you!",

  "I'm pleased to inform you that we've extended {{petName}}'s boarding by {{extensionDuration}} {{extensionUnit}} as requested. {{petName}} will now be with us until {{newEndDate}}. {{petName}} is in excellent health and spirits, and we're delighted to continue providing care during this extended period!",

  "We've successfully processed your request to extend {{petName}}'s boarding stay by {{extensionDuration}} {{extensionUnit}}. The new end date is {{newEndDate}}. {{petName}} is doing wonderfully with us and continues to receive the best care. Please let us know if you need anything else!",

  "Your boarding extension request for {{petName}} has been approved. We've extended {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}}, with checkout now scheduled for {{newEndDate}}. {{petName}} is happy and healthy, and we're pleased to continue caring for {{petName}}!",

  "I'm happy to confirm that {{petName}}'s boarding has been extended as requested. The new end date is {{newEndDate}}, which adds {{extensionDuration}} {{extensionUnit}} to the original stay. {{petName}} is doing great and receiving excellent care. Feel free to contact us if you need anything else!",

  "We've processed and approved the {{extensionDuration}} {{extensionUnit}} extension for {{petName}}'s boarding. {{petName}} will now stay with us until {{newEndDate}}. {{petName}} is adapting wonderfully and receiving the best care possible. Please let us know if you need any further adjustments!",

  "{{petName}}'s boarding extension has been successfully processed. We've extended {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}}, with the new checkout date set for {{newEndDate}}. {{petName}} is doing splendidly in our care, and we're happy to accommodate this change!",

  "I'm pleased to let you know that we've approved the extension of {{petName}}'s boarding by {{extensionDuration}} {{extensionUnit}}. {{petName}} will now be with us until {{newEndDate}}. {{petName}} is in great health and spirits, and we're delighted to continue providing care!",

  "Your request to extend {{petName}}'s stay has been processed. We've added {{extensionDuration}} {{extensionUnit}} to {{petName}}'s boarding, with the new end date being {{newEndDate}}. {{petName}} is doing wonderfully and receiving excellent care. Feel free to reach out if you need anything else!",

  "We've confirmed and processed the boarding extension for {{petName}}. The stay has been extended by {{extensionDuration}} {{extensionUnit}}, and the new checkout date is {{newEndDate}}. {{petName}} is happy, healthy, and well-adjusted to our facility. Please let us know if you need any further adjustments!",

  "{{petName}}'s boarding extension has been approved. We've extended the stay by {{extensionDuration}} {{extensionUnit}}, with the new end date set for {{newEndDate}}. {{petName}} is doing great in our care, and we're pleased to accommodate this change for you!",

  "I'm happy to inform you that we've processed your request to extend {{petName}}'s boarding. The new checkout date is {{newEndDate}}, which adds {{extensionDuration}} {{extensionUnit}} to the original stay. {{petName}} is in excellent health and spirits, and we're delighted to continue caring for {{petName}}!",

  "We've successfully extended {{petName}}'s boarding stay by {{extensionDuration}} {{extensionUnit}} as requested. {{petName}} will now be with us until {{newEndDate}}. {{petName}} is doing wonderfully and receiving the best care possible. We're happy to accommodate this change for you!",

  "Your boarding extension for {{petName}} has been processed successfully. We've added {{extensionDuration}} {{extensionUnit}} to {{petName}}'s stay, with checkout now scheduled for {{newEndDate}}. {{petName}} is adapting well to our facility and continues to receive excellent care. Please let us know if you need anything else!",

  "I'm pleased to confirm that we've extended {{petName}}'s boarding by {{extensionDuration}} {{extensionUnit}} as requested. The new end date is {{newEndDate}}. {{petName}} is in great health and spirits, and we're delighted to continue caring for {{petName}} during this extended period!",

  "We've processed your request and extended {{petName}}'s stay by {{extensionDuration}} {{extensionUnit}}. {{petName}} will now be with us until {{newEndDate}}. {{petName}} is doing splendidly and receiving the best care possible. Feel free to contact us if you need any further adjustments!",

  "{{petName}}'s boarding extension has been approved and processed. The new checkout date is {{newEndDate}}, which adds {{extensionDuration}} {{extensionUnit}} to the original stay. {{petName}} is happy, healthy, and well-adjusted to our facility. We're pleased to accommodate this change for you!",
]

// Media Description Templates for Photos - 10 variations
export const photoDescriptionTemplates = [
  "In these photos, you can see {{petName}} looking happy and relaxed.",
  "These photos show {{petName}} enjoying playtime in our facility.",
  "We captured {{petName}} during {{petName}}'s daily exercise routine.",
  "These images show {{petName}} resting comfortably in {{petName}}'s boarding space.",
  "In these photos, {{petName}} is socializing with our staff and receiving lots of attention.",
  "These snapshots show {{petName}} enjoying the outdoor play area.",
  "We photographed {{petName}} during mealtime, and as you can see, {{petName}} has a healthy appetite!",
  "These photos capture {{petName}}'s playful personality and good spirits.",
  "In these images, you can see that {{petName}} is comfortable and well-adjusted to the boarding environment.",
  "These photos show {{petName}} receiving some extra cuddles and attention from our staff.",
]

// Media Description Templates for Videos - 10 variations
export const videoDescriptionTemplates = [
  "In this video, you can see {{petName}} playing happily and showing lots of energy.",
  "This footage shows {{petName}} enjoying playtime with our staff.",
  "We captured {{petName}} during {{petName}}'s daily exercise routine, and as you can see, {{petName}} is very active!",
  "This video shows {{petName}} exploring our facility and seeming quite comfortable.",
  "In this footage, {{petName}} is socializing with our staff and receiving lots of attention.",
  "This video shows {{petName}} enjoying the outdoor play area and getting plenty of exercise.",
  "We recorded {{petName}} during mealtime, and as you can see, {{petName}} has a healthy appetite!",
  "This video captures {{petName}}'s playful personality and good spirits.",
  "In this footage, you can see that {{petName}} is comfortable and well-adjusted to the boarding environment.",
  "This video shows {{petName}} receiving some extra cuddles and attention from our staff.",
]

// Media Description Templates for Grooming - 10 variations
export const groomingDescriptionTemplates = [
  "As you can see in these photos, {{petName}} looks fresh and clean after the grooming session.",
  "These photos showcase {{petName}}'s beautiful new look after the grooming service.",
  "In these images, you can see how neat and tidy {{petName}} looks after the grooming.",
  "These photos show the before and after of {{petName}}'s grooming session - what a transformation!",
  "As you can see, {{petName}}'s coat looks shiny and healthy after the grooming service.",
  "These photos highlight how well-groomed and handsome/beautiful {{petName}} looks now.",
  "In these images, you can see that {{petName}}'s fur is now clean, detangled, and properly trimmed.",
  "These photos show how comfortable and happy {{petName}} looks after the grooming session.",
  "As you can see, {{petName}} looks absolutely adorable with {{petName}}'s fresh new haircut.",
  "These photos showcase the professional grooming results, and {{petName}} looks fantastic!",
]

/**
 * Get a random template based on request type
 * @param type The type of request
 * @returns A random template string
 */
export function getRandomTemplate(type: string): string {
  switch (type) {
    case "photo":
      return photoRequestTemplates[Math.floor(Math.random() * photoRequestTemplates.length)]
    case "video":
      return videoRequestTemplates[Math.floor(Math.random() * videoRequestTemplates.length)]
    case "grooming":
      return groomingServiceTemplates[Math.floor(Math.random() * groomingServiceTemplates.length)]
    case "boarding-extension":
      return boardingExtensionTemplates[Math.floor(Math.random() * boardingExtensionTemplates.length)]
    default:
      return photoRequestTemplates[Math.floor(Math.random() * photoRequestTemplates.length)]
  }
}

/**
 * Get a random media description based on media type
 * @param type The type of media (photo, video, grooming)
 * @returns A random description string
 */
export function getRandomMediaDescription(type: string): string {
  switch (type) {
    case "photo":
      return photoDescriptionTemplates[Math.floor(Math.random() * photoDescriptionTemplates.length)]
    case "video":
      return videoDescriptionTemplates[Math.floor(Math.random() * videoDescriptionTemplates.length)]
    case "grooming":
      return groomingDescriptionTemplates[Math.floor(Math.random() * groomingDescriptionTemplates.length)]
    default:
      return photoDescriptionTemplates[Math.floor(Math.random() * photoDescriptionTemplates.length)]
  }
}

/**
 * Generate a processing note based on request type and details
 * @param request The request object
 * @param mediaCount The number of media files
 * @returns A generated note
 */
export function generateProcessingNote(request: any, mediaCount = 0): string {
  if (!request) return ""

  // Get a random template based on request type
  const template = getRandomTemplate(request.type)

  // Get a random media description if applicable
  let mediaDescription = ""
  if (request.type === "photo" || request.type === "video") {
    mediaDescription = getRandomMediaDescription(request.type)
  } else if (request.type === "grooming" && mediaCount > 0) {
    mediaDescription = getRandomMediaDescription("grooming")
  }

  // Replace placeholders with actual values
  // First, replace all instances of the pet name in the media description
  if (mediaDescription && request.petName) {
    mediaDescription = mediaDescription.replace(/{{petName}}/g, request.petName)
  }

  // Then replace all placeholders in the main template
  let note = template
    .replace(/{{petName}}/g, request.petName || "your pet")
    .replace(/{{ownerName}}/g, request.petOwnerName || "valued customer")
    .replace(/{{mediaCount}}/g, mediaCount.toString())
    .replace(/{{mediaDescription}}/g, mediaDescription)

  // Replace request-specific placeholders
  if (request.type === "grooming" && request.groomingService) {
    const formattedService = request.groomingService.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())

    note = note.replace(/{{groomingService}}/g, formattedService)
  }

  if (request.type === "boarding-extension" && request.extensionDetails) {
    note = note
      .replace(/{{extensionDuration}}/g, request.extensionDetails.duration || "")
      .replace(/{{extensionUnit}}/g, request.extensionDetails.unit || "")
      .replace(/{{newEndDate}}/g, request.newEndDate ? formatDate(request.newEndDate) : "the updated date")
  }

  return note
}

/**
 * Format a date string for display
 * @param dateString The date string to format
 * @returns Formatted date string
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  } catch (error) {
    return dateString
  }
}
