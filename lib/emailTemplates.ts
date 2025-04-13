// export function getEmailTemplate(formType: string, formData: any) {
//   if (formType === "contact") {
//     return getContactEmailTemplate(formData);
//   } else if (formType === "book-service") {
//     return getBookServiceEmailTemplate(formData);
//   }
//   throw new Error("Invalid form type");
// }

// function getContactEmailTemplate(formData: any) {
//   return `
//       <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>New Customer Inquiry</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         color: #333;
//         background-color: #f9f9f9;
//         margin: 0;
//         padding: 20px;
//       }
//       .container {
//         max-width: 600px;
//         margin: auto;
//         padding: 15px;
//         background: #ffffff;
//         border-radius: 8px;
//         box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//         display: flex;
//         align-items: center;
//         background: #2e3357;
//         padding: 10px;
//         border-radius: 8px 8px 0 0;
//         color: #fff;
//         text-align: center;
//       }
//       .logo img {
//         width: 50px;
//         margin-right: 10px;
//       }
//       .content {
//         background: #fff;
//         padding: 15px;
//         border-radius: 5px;
//         margin-top: 10px;
//       }
//       .info-block {
//         display: flex;
//         justify-content: space-between;
//         padding: 5px 0;
//         font-size: 14px;
//       }
//       .info-label {
//         font-weight: bold;
//         width: 40%;
//       }
//       .highlight {
//         background: #eceff5;
//         padding: 5px 10px;
//         border-radius: 5px;
//         font-weight: 600;
//         width: 58%;
//         text-align: left;
//       }
//       .message-box {
//         background: #eceff5;
//         padding: 10px;
//         border-radius: 5px;
//         font-size: 14px;
//         margin-top: 10px;
//         min-height: 80px;
//         font-style: italic;
//       }
//       .footer {
//         text-align: center;
//         font-size: 12px;
//         color: #666;
//         margin-top: 15px;
//       }

//       /* Responsive */
//       @media screen and (max-width: 600px) {
//         .container {
//           padding: 15px;
//         }
//         .info-block {
//           flex-direction: column;
//           align-items: flex-start;
//         }
//         .highlight {
//           width: 100%;
//         }
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <div class="logo">
//           <img
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png"
//             alt="Big Paws Pet Hotel"
//           />
//         </div>
//         <h1>New Customer Inquiry</h1>
//       </div>
//       <div class="content">
//         <h3>Customer Information</h3>
//         <div class="info-block">
//           <span class="info-label">Name:</span>
//           <span class="highlight">${formData.name}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Email:</span>
//           <span class="highlight">${formData.email}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Phone:</span>
//           <span class="highlight">${formData.phone}</span>
//         </div>

//         <h3>Message</h3>
//         <div class="message-box">
//           "${formData.message || "No message provided."}"
//         </div>
//       </div>
//       <div class="footer">
//         &copy; ${new Date().getFullYear()} Big Paws Pet Hotel. All rights
//         reserved.
//       </div>
//     </div>
//   </body>
// </html>

//     `;
// }

// function getBookServiceEmailTemplate(formData: any) {
//   return `
//      <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Home Service Booking</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         color: #333;
//         background-color: #f9f9f9;
//         margin: 0;
//         padding: 20px;
//       }
//       .container {
//         max-width: 600px;
//         margin: auto;
//         padding: 15px;
//         background: #ffffff;
//         border-radius: 8px;
//         box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//       }
//       .header {
//         display: flex;
//         align-items: center;
//         background: #2e3357;
//         padding: 10px;
//         border-radius: 8px 8px 0 0;
//         color: #fff;
//         text-align: center;
//       }
//       .logo img {
//         width: 50px;
//         margin-right: 10px;
//       }

//       .content {
//         background: #fff;
//         padding: 15px;
//         border-radius: 5px;
//         margin-top: 10px;
//       }
//       .info-block {
//         display: flex;
//         justify-content: space-between;
//         padding: 5px 0;
//         font-size: 14px;
//       }
//       .info-label {
//         font-weight: bold;
//         width: 40%;
//       }
//       .highlight {
//         background: #eceff5;
//         padding: 3px 8px;
//         border-radius: 3px;
//         font-weight: 600;
//         width: 58%;
//         text-align: left;
//       }
//       .message-box {
//         background: #eceff5;
//         padding: 8px;
//         border-radius: 3px;
//         font-size: 14px;
//         margin-top: 5px;
//         min-height: 100px;
//         font-style: italic;
//       }
//       .footer {
//         text-align: center;
//         font-size: 12px;
//         color: #666;
//         margin-top: 10px;
//       }

//       /* Responsive */
//       @media screen and (max-width: 600px) {
//         .container {
//           padding: 15px;
//         }
//         .info-block {
//           flex-direction: column;
//           align-items: flex-start;
//         }
//         .highlight {
//           width: 100%;
//         }
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <div class="logo">
//           <img
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png"
//             alt="Big Paws Pet Hotel"
//           />
//         </div>
//         <h1>Home Service Booking</h1>
//       </div>
//       <div class="content">
//         <h3>Customer Information</h3>
//         <div class="info-block">
//           <span class="info-label">Name:</span
//           ><span class="highlight">${formData.name}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Email:</span
//           ><span class="highlight">${formData.email}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Phone:</span
//           ><span class="highlight">${formData.phone}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Address:</span
//           ><span class="highlight">${formData.address}</span>
//         </div>

//         <h3>Pet Information</h3>
//         <div class="message-box">"${formData.petInfo}"</div>

//         <h3>Service Details</h3>
//         <div class="info-block">
//           <span class="info-label">Service Type:</span
//           ><span class="highlight">${formData.serviceType}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Preferred Date:</span
//           ><span class="highlight">${formData.preferredDate}</span>
//         </div>
//         <div class="info-block">
//           <span class="info-label">Preferred Time:</span
//           ><span class="highlight"
//             >${(() => {
//               const time = formData.preferredTime;
//               const [hours, minutes] = time.split(":");
//               const ampm = hours >= 12 ? "PM" : "AM";
//               const hours12 = hours % 12 || 12;
//               return `${hours12}:${minutes}
//             ${ampm}`;
//             })()}</span
//           >
//         </div>

//         <h3>Additional Notes</h3>
//         <div class="message-box">
//           "${formData.additionalNotes || "No additional notes provided."}"
//         </div>
//       </div>
//       <div class="footer">
//         &copy; ${new Date().getFullYear()} Big Paws Pet Hotel. All rights
//         reserved.
//       </div>
//     </div>
//   </body>
// </html>
//     `;
// }

//Postmark Email Template 1

export function getEmailTemplate(formType: string, formData: any) {
  if (formType === "contact") {
    return getContactEmailTemplate(formData)
  } else if (formType === "book-service") {
    return getBookServiceEmailTemplate(formData)
  }
  throw new Error("Invalid form type")
}

function getContactEmailTemplate(formData: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Customer Inquiry</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            padding: 15px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            display: flex;
            align-items: center;
            background: #2e3357;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            color: #fff;
            text-align: center;
          }
          .logo img {
            width: 50px;
            margin-right: 10px;
          }
          .content {
            background: #fff;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
          }
          .info-block {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 14px;
          }
          .info-label {
            font-weight: bold;
            width: 40%;
          }
          .highlight {
            background: #eceff5;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: 600;
            width: 58%;
            text-align: left;
          }
          .message-box {
            background: #eceff5;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            margin-top: 10px;
            min-height: 80px;
            font-style: italic;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 15px;
          }

          /* Responsive */
          @media screen and (max-width: 600px) {
            .container {
              padding: 15px;
            }
            .info-block {
              flex-direction: column;
              align-items: flex-start;
            }
            .highlight {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png"
                alt="Big Paws Pet Hotel"
              />
            </div>
            <h1>New Customer Inquiry</h1>
          </div>
          <div class="content">
            <h3>Customer Information</h3>
            <div class="info-block">
              <span class="info-label">Name:</span>
              <span class="highlight">${formData.name}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Email:</span>
              <span class="highlight">${formData.email}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Phone:</span>
              <span class="highlight">${formData.phone}</span>
            </div>

            <h3>Message</h3>
            <div class="message-box">
              "${formData.message || "No message provided."}"
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Big Paws Pet Hotel. All rights
            reserved.
          </div>
        </div>
      </body>
    </html>
  `
}

function getBookServiceEmailTemplate(formData: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home Service Booking</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            padding: 15px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            display: flex;
            align-items: center;
            background: #2e3357;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            color: #fff;
            text-align: center;
          }
          .logo img {
            width: 50px;
            margin-right: 10px;
          }

          .content {
            background: #fff;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
          }
          .info-block {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 14px;
          }
          .info-label {
            font-weight: bold;
            width: 40%;
          }
          .highlight {
            background: #eceff5;
            padding: 3px 8px;
            border-radius: 3px;
            font-weight: 600;
            width: 58%;
            text-align: left;
          }
          .message-box {
            background: #eceff5;
            padding: 8px;
            border-radius: 3px;
            font-size: 14px;
            margin-top: 5px;
            min-height: 100px;
            font-style: italic;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 10px;
          }

          /* Responsive */
          @media screen and (max-width: 600px) {
            .container {
              padding: 15px;
            }
            .info-block {
              flex-direction: column;
              align-items: flex-start;
            }
            .highlight {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png"
                alt="Big Paws Pet Hotel"
              />
            </div>
            <h1>Home Service Booking</h1>
          </div>
          <div class="content">
            <h3>Customer Information</h3>
            <div class="info-block">
              <span class="info-label">Name:</span
              ><span class="highlight">${formData.name}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Email:</span
              ><span class="highlight">${formData.email}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Phone:</span
              ><span class="highlight">${formData.phone}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Address:</span
              ><span class="highlight">${formData.address}</span>
            </div>

            <h3>Pet Information</h3>
            <div class="message-box">"${formData.petInfo}"</div>

            <h3>Service Details</h3>
            <div class="info-block">
              <span class="info-label">Service Type:</span
              ><span class="highlight">${formData.serviceType}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Preferred Date:</span
              ><span class="highlight">${formData.preferredDate}</span>
            </div>
            <div class="info-block">
              <span class="info-label">Preferred Time:</span
              ><span class="highlight"
                >${(() => {
                  const time = formData.preferredTime
                  const [hours, minutes] = time.split(":")
                  const ampm = hours >= 12 ? "PM" : "AM"
                  const hours12 = hours % 12 || 12
                  return `${hours12}:${minutes} ${ampm}`
                })()}</span
              >
            </div>

            <h3>Additional Notes</h3>
            <div class="message-box">
              "${formData.additionalNotes || "No additional notes provided."}"
            </div>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Big Paws Pet Hotel. All rights
            reserved.
          </div>
        </div>
      </body>
    </html>
  `
}

//Postmark Email Template 2
// export function getEmailTemplate(formType: string, formData: any) {
//   if (formType === "contact") {
//     return getContactEmailTemplate(formData)
//   } else if (formType === "book-service") {
//     return getBookServiceEmailTemplate(formData)
//   }
//   throw new Error("Invalid form type")
// }

// function getContactEmailTemplate(formData: any) {
//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>New Customer Inquiry</title>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

//           body {
//             font-family: 'Roboto', Arial, sans-serif;
//             line-height: 1.6;
//             color: #333333;
//             margin: 0;
//             padding: 0;
//             -webkit-font-smoothing: antialiased;
//             -moz-osx-font-smoothing: grayscale;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//             background-color: #ffffff;
//           }
//           .header {
//             background-color: #2e3357;
//             color: #ffffff;
//             padding: 20px;
//             text-align: center;
//           }
//           .logo {
//             max-width: 150px;
//             height: auto;
//           }
//           .content {
//             padding: 20px;
//           }
//           .info-block {
//             margin-bottom: 20px;
//           }
//           .info-label {
//             font-weight: bold;
//             margin-bottom: 5px;
//           }
//           .info-value {
//             background-color: #f4f4f4;
//             padding: 10px;
//             border-radius: 4px;
//           }
//           .message-box {
//             background-color: #f4f4f4;
//             padding: 15px;
//             border-radius: 4px;
//             margin-top: 20px;
//           }
//           .footer {
//             text-align: center;
//             padding: 20px;
//             font-size: 12px;
//             color: #666666;
//           }
//           @media only screen and (max-width: 600px) {
//             .container {
//               width: 100% !important;
//             }
//             .content {
//               padding: 10px !important;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png" alt="Big Paws Pet Hotel" class="logo">
//             <h1>New Customer Inquiry</h1>
//           </div>
//           <div class="content">
//             <div class="info-block">
//               <p class="info-label">Name:</p>
//               <p class="info-value">${formData.name}</p>
//             </div>
//             <div class="info-block">
//               <p class="info-label">Email:</p>
//               <p class="info-value">${formData.email}</p>
//             </div>
//             <div class="info-block">
//               <p class="info-label">Phone:</p>
//               <p class="info-value">${formData.phone}</p>
//             </div>
//             <div class="info-block">
//               <p class="info-label">Message:</p>
//               <div class="message-box">
//                 ${formData.message || "No message provided."}
//               </div>
//             </div>
//           </div>
//           <div class="footer">
//             &copy; ${new Date().getFullYear()} Big Paws Pet Hotel. All rights reserved.
//           </div>
//         </div>
//       </body>
//     </html>
//   `
// }

// function getBookServiceEmailTemplate(formData: any) {
//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Home Service Booking</title>
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

//           body {
//             font-family: 'Roboto', Arial, sans-serif;
//             line-height: 1.6;
//             color: #333333;
//             margin: 0;
//             padding: 0;
//             -webkit-font-smoothing: antialiased;
//             -moz-osx-font-smoothing: grayscale;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//             background-color: #ffffff;
//           }
//           .header {
//             background-color: #2e3357;
//             color: #ffffff;
//             padding: 20px;
//             text-align: center;
//           }
//           .logo {
//             max-width: 150px;
//             height: auto;
//           }
//           .content {
//             padding: 20px;
//           }
//           .section {
//             margin-bottom: 30px;
//           }
//           .section-title {
//             font-size: 18px;
//             font-weight: bold;
//             margin-bottom: 10px;
//             color: #2e3357;
//           }
//           .info-block {
//             margin-bottom: 15px;
//           }
//           .info-label {
//             font-weight: bold;
//             margin-bottom: 5px;
//           }
//           .info-value {
//             background-color: #f4f4f4;
//             padding: 10px;
//             border-radius: 4px;
//           }
//           .message-box {
//             background-color: #f4f4f4;
//             padding: 15px;
//             border-radius: 4px;
//           }
//           .footer {
//             text-align: center;
//             padding: 20px;
//             font-size: 12px;
//             color: #666666;
//           }
//           @media only screen and (max-width: 600px) {
//             .container {
//               width: 100% !important;
//             }
//             .content {
//               padding: 10px !important;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png" alt="Big Paws Pet Hotel" class="logo">
//             <h1>Home Service Booking</h1>
//           </div>
//           <div class="content">
//             <div class="section">
//               <h2 class="section-title">Customer Information</h2>
//               <div class="info-block">
//                 <p class="info-label">Name:</p>
//                 <p class="info-value">${formData.name}</p>
//               </div>
//               <div class="info-block">
//                 <p class="info-label">Email:</p>
//                 <p class="info-value">${formData.email}</p>
//               </div>
//               <div class="info-block">
//                 <p class="info-label">Phone:</p>
//                 <p class="info-value">${formData.phone}</p>
//               </div>
//               <div class="info-block">
//                 <p class="info-label">Address:</p>
//                 <p class="info-value">${formData.address}</p>
//               </div>
//             </div>

//             <div class="section">
//               <h2 class="section-title">Pet Information</h2>
//               <div class="message-box">
//                 ${formData.petInfo}
//               </div>
//             </div>

//             <div class="section">
//               <h2 class="section-title">Service Details</h2>
//               <div class="info-block">
//                 <p class="info-label">Service Type:</p>
//                 <p class="info-value">${formData.serviceType}</p>
//               </div>
//               <div class="info-block">
//                 <p class="info-label">Preferred Date:</p>
//                 <p class="info-value">${formData.preferredDate}</p>
//               </div>
//               <div class="info-block">
//                 <p class="info-label">Preferred Time:</p>
//                 <p class="info-value">
//                   ${(() => {
//                     const time = formData.preferredTime
//                     const [hours, minutes] = time.split(":")
//                     const ampm = hours >= 12 ? "PM" : "AM"
//                     const hours12 = hours % 12 || 12
//                     return `${hours12}:${minutes} ${ampm}`
//                   })()}
//                 </p>
//               </div>
//             </div>

//             <div class="section">
//               <h2 class="section-title">Additional Notes</h2>
//               <div class="message-box">
//                 ${formData.additionalNotes || "No additional notes provided."}
//               </div>
//             </div>
//           </div>
//           <div class="footer">
//             &copy; ${new Date().getFullYear()} Big Paws Pet Hotel. All rights reserved.
//           </div>
//         </div>
//       </body>
//     </html>
//   `
// }
