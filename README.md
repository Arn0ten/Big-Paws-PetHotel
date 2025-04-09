# Big Paws Petsupplies Landing & Webapp

![Big Paws Logo](https://github.com/user-attachments/assets/ba6ae16f-8fb9-42d9-be80-71b02d2a98f4)

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)  
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  
![Mailgun](https://img.shields.io/badge/Mailgun-D14836?style=for-the-badge&logo=mailgun&logoColor=white)  
![Resend](https://img.shields.io/badge/Resend-FFCC00?style=for-the-badge&logo=resend&logoColor=black)  
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)  
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white)

## Description

Big Paws Petsupplies Landing Page is a modern and interactive landing page built using **React**, **Next.js**, and **TypeScript**. It showcases the products and services offered by **Big Paws**, a pet supplies company, with a responsive and user-friendly interface.

## Web Application

The web application uses pure **HTML**, **CSS**, and **JavaScript** to create a seamless and engaging user experience.

## Backend

The backend is built with **Node.js** and **NoSQL MongoDB** to ensure scalability and flexibility.

## API

We utilize **Mailgun** and optionally **Resend** for email services, and **Leaflet** and **OpenStreetMap** for map integration.

## Features

✅ Built with **Next.js 13+** for optimized performance  
✅ **TypeScript** for type safety and maintainability  
✅ **React components** for a modular structure  
✅ **Server-side rendering (SSR) and static generation (SSG)** for fast loading  
✅ Fully **responsive** design for all devices  
✅ **Node.js** and **NoSQL MongoDB** for the backend  
✅ **APIs** integrated with **Resen**.
✅ **Maps** integration with **Leaflet** and **OpenStreetMap**

Folder structure dria ra mag trace if naay pangitaon na directory
 ### Big Paws Pet Hotel - Backend Integration Guide

 ## Table of Contents

 1. [Introduction](#introduction)
 2. [System Architecture](#system-architecture)
 3. [Authentication](#authentication)
 4. [Admin Modules](#admin-modules)
     - [Dashboard](#admin-dashboard)
     - [Pet Management](#pet-management)
     - [Pet Owner Management](#pet-owner-management)
     - [Boarding Management](#boarding-management)
     - [Pet Owner Registration](#pet-owner-registration)
     - [Request Management](#request-management)
     - [Requests Module](#requests-module)
     - [History Module](#history-module)
 5. [Pet Owner Modules](#pet-owner-modules)
     - [Home](#pet-owner-home)
     - [Requests](#pet-owner-requests)
     - [Media Archive](#media-archive)
     - [Notifications](#notifications)
     - [Profile](#profile)
 6. [Database Schema](#database-schema)
 7. [Email Templates](#email-templates)
 8. [File Storage](#file-storage)
 9. [Security Considerations](#security-considerations)
 10. [Deployment Guidelines](#deployment-guidelines)

 ## Introduction

 This document serves as a comprehensive guide for backend developers to integrate real data into the Big Paws Pet Hotel application. The frontend is built with Next.js, TypeScript, and React, and currently uses mock data. This guide outlines the necessary API endpoints, data structures, and integration points required to replace the mock data with real data from a backend system.

 ## System Architecture

 ### Technology Stack

 - **Frontend**: Next.js, TypeScript, React, Tailwind CSS
 - **Backend**: Node.js with Express.js (recommended)
 - **Database**:
     - Primary: MongoDB (for document storage)
     - Cache: Redis (for session management and caching)
     - Media Storage: Cloud storage solution (AWS S3 or similar)
 - **Authentication**: JWT-based authentication
 - **Email Service**: SMTP service with HTML templates

 ### Architecture Pattern

 The application follows an MVC (Model-View-Controller) architecture:

 - **Models**: Database schemas and data access layer
 - **Views**: Next.js frontend components (already implemented)
 - **Controllers**: API endpoints that handle business logic

 ### API Structure

 All API endpoints should be prefixed with `/api` and follow RESTful conventions:

 - GET: Retrieve resources
 - POST: Create resources
 - PUT: Update resources
 - DELETE: Remove resources

 ## Authentication

 ### Data Models

 \`\`\`typescript
 interface User {
   id: string;
   email: string;
   passwordHash: string;
   role: 'admin' | 'pet-owner';
   name: string;
   phone?: string;
   lastLogin?: Date;
   createdAt: Date;
   updatedAt: Date;
   resetPasswordToken?: string;
   resetPasswordExpires?: Date;
 }
 \`\`\`

 ### API Endpoints

 #### Login

 \`\`\`
 POST /api/auth/login
 \`\`\`

 Request:
 \`\`\`json
 {
   "username": "user@example.com",
   "password": "password123",
   "rememberMe": true
 }
 \`\`\`

 Response:
 \`\`\`json
 {
   "success": true,
   "token": "jwt-token-here",
   "user": {
     "id": "user-id",
     "name": "User Name",
     "email": "user@example.com",
     "role": "pet-owner"
   }
 }
 \`\`\`

 #### Forgot Password

 \`\`\`
 POST /api/auth/forgot-password
 \`\`\`

 Request:
 \`\`\`json
 {
   "contact": "user@example.com"
 }
 \`\`\`

 Response:
 \`\`\`json
 {
   "success": true,
   "message": "Password reset instructions sent successfully"
 }
 \`\`\`

 #### Reset Password

 \`\`\`
 POST /api/auth/reset-password
 \`\`\`

 Request:
 \`\`\`json
 {
   "token": "reset-token-from-email",
   "password": "newPassword123",
   "confirmPassword": "newPassword123"
 }
 \`\`\`

 Response:
 \`\`\`json
 {
   "success": true,
   "message": "Password reset successful"
 }
 \`\`\`

 #### Change Password

 \`\`\`
 POST /api/auth/change-password
 \`\`\`

 Request:
 \`\`\`json
 {
   "currentPassword": "oldPassword123",
   "newPassword": "newPassword123",
   "confirmPassword": "newPassword123"
 }
 \`\`\`

 Response:
 \`\`\`json
 {
   "success": true,
   "message": "Password changed successfully"
 }
 \`\`\`

 ### Integration Points

 - `app/webapp/auth/login/page.tsx`: Login form
 - `app/webapp/auth/forgot-password/page.tsx`: Forgot password form
 - `app/webapp/auth/reset-password/page.tsx`: Reset password form
 - `app/webapp/auth/change-password/page.tsx`: Change password form
 - `app/webapp/auth/services/authService.ts`: Authentication service functions

 ### Implementation Notes

 1. Use JWT for authentication with appropriate expiration times
 2. Store tokens in HTTP-only cookies for security
 3. Implement rate limiting for login and password reset attempts
 4. Send password reset emails with secure, time-limited tokens
 5. Implement IP-based access control for admin routes (see `app/webapp/middleware.ts`)

 ## Admin Modules

 ### Admin Dashboard

 #### Data Models

 \`\`\`typescript
 interface DashboardStats {
   totalPets: number;
   totalOwners: number;
   activeBoardings: number;
   pendingRequests: number;
   completedRequests: number;
   revenue: {
     daily: number;
     weekly: number;
     monthly: number;
   };
   recentActivities: Activity[];
 }

 interface Activity {
   id: string;
   module: 'pet-owner' | 'pet' | 'boarding' | 'request' | 'request-management';
   action: string;
   description: string;
   timestamp: Date;
   performedBy: string;
   petId?: string;
   petName?: string;
   ownerId?: string;
   ownerName?: string;
   amount?: number;
   mediaUrls?: string[];
   mediaTypes?: string[];
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/admin/dashboard/stats
 \`\`\`

 Response:
 \`\`\`json
 {
   "totalPets": 120,
   "totalOwners": 85,
   "activeBoardings": 42,
   "pendingRequests": 15,
   "completedRequests": 230,
   "revenue": {
     "daily": 15000,
     "weekly": 85000,
     "monthly": 350000
   },
   "recentActivities": [
     {
       "id": "act-1",
       "type": "boarding",
       "description": "New boarding created for Max",
       "timestamp": "2023-06-15T10:30:00Z",
       "performedBy": "Admin User",
       "module": "boarding"
     }
   ]
 }
 \`\`\`

 ### Pet Management

 #### Data Models

 \`\`\`typescript
 interface Pet {
   id: string;
   name: string;
   type: 'Dog' | 'Cat';
   breed: string;
   age: number;
   size: 'Small' | 'Medium' | 'Large' | 'XL';
   ownerId: string;
   ownerName: string;
   isBoarding: boolean;
   boardingId?: string;
   notes?: string;
   image?: string;
   createdAt: Date;
   updatedAt: Date;
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/pets
 GET /api/pets/:id
 POST /api/pets
 PUT /api/pets/:id
 DELETE /api/pets/:id
 \`\`\`

 Query parameters for GET /api/pets:
 - `search`: Search term for filtering
 - `type`: Filter by pet type (Dog/Cat)
 - `status`: Filter by boarding status
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 Request body for POST/PUT:
 \`\`\`json
 {
   "name": "Max",
   "type": "Dog",
   "breed": "Golden Retriever",
   "age": 3,
   "size": "Large",
   "ownerId": "owner-123",
   "notes": "Friendly dog, no health issues",
   "image": "base64-encoded-image-or-url"
 }
 \`\`\`

 ### Pet Owner Management

 #### Data Models

 \`\`\`typescript
 interface PetOwner {
   id: string;
   name: string;
   email: string;
   phone: string;
   address: {
     streetAddress: string;
     city: string;
     province: string;
     cityCode: string;
     provinceCode: string;
   };
   pets: Pet[];
   createdAt: Date;
   updatedAt: Date;
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/pet-owners
 GET /api/pet-owners/:id
 POST /api/pet-owners
 PUT /api/pet-owners/:id
 DELETE /api/pet-owners/:id
 GET /api/pet-owners/:id/pets
 \`\`\`

 Query parameters for GET /api/pet-owners:
 - `search`: Search term for filtering
 - `hasPets`: Filter by whether owner has pets
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 Request body for POST/PUT:
 \`\`\`json
 {
   "name": "John Doe",
   "email": "john.doe@example.com",
   "phone": "09123456789",
   "address": {
     "streetAddress": "123 Main St",
     "city": "Makati",
     "province": "Metro Manila",
     "cityCode": "MKT",
     "provinceCode": "MM"
   }
 }
 \`\`\`

 ### Boarding Management

 #### Data Models

 \`\`\`typescript
 interface BoardingOrder {
   id: string;
   petId: string;
   petName: string;
   petType: 'Dog' | 'Cat';
   petSize: 'Small' | 'Medium' | 'Large' | 'XL';
   ownerId: string;
   ownerName: string;
   ownerContact: string;
   boardingStatus: 'Boarding' | 'Done Boarding' | 'Released';
   paymentStatus: 'Paid' | 'Not Paid' | 'Pending';
   startDate: Date;
   endDate: Date;
   actualEndDate?: Date;
   boardingType: 'Standard' | 'Premium' | 'Day Care';
   totalPrice: number;
   baseAmount: number;
   additionalServices?: {
     name: string;
     price: number;
     requestId?: string;
     timestamp?: string;
   }[];
   discounts?: {
     name: string;
     amount: number;
   }[];
   notes?: string;
   createdAt: Date;
   updatedAt: Date;
   releaseTimestamp?: Date;
   paymentDate?: Date;
   receiptGenerated?: boolean;
   notificationSent?: boolean;
   isOverdue?: boolean;
   lastModifiedBy?: string;
   lastModificationReason?: string;
   paymentHistory?: {
     status: PaymentStatus;
     timestamp: Date;
     modifiedBy: string;
     reason?: string;
   }[];
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/boarding
 GET /api/boarding/:id
 POST /api/boarding
 PUT /api/boarding/:id
 DELETE /api/boarding/:id
 POST /api/boarding/:id/release
 POST /api/boarding/:id/force-release
 GET /api/boarding/stats
 \`\`\`

 Query parameters for GET /api/boarding:
 - `status`: Filter by boarding status
 - `payment`: Filter by payment status
 - `search`: Search term for filtering
 - `overdue`: Filter for overdue pickups
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 Request body for POST:
 \`\`\`json
 {
   "petId": "pet-123",
   "ownerId": "owner-123",
   "startDate": "2023-06-15T10:00:00Z",
   "endDate": "2023-06-20T10:00:00Z",
   "boardingType": "Standard",
   "totalPrice": 2500,
   "paidAmount": 1000,
   "notes": "Special diet requirements"
 }
 \`\`\`

 ### Pet Owner Registration

 #### API Endpoints

 \`\`\`
 POST /api/admin/registration
 \`\`\`

 Request body:
 \`\`\`json
 {
   "fullName": "John Doe",
   "email": "john.doe@example.com",
   "contactNumber": "09123456789",
   "streetAddress": "123 Main St",
   "province": "Metro Manila",
   "provinceCode": "MM",
   "city": "Makati",
   "cityCode": "MKT"
 }
 \`\`\`

 Response:
 \`\`\`json
 {
   "success": true,
   "petOwnerId": "owner-123",
   "message": "Pet owner registered successfully"
 }
 \`\`\`

 Additional endpoint for sending credentials:
 \`\`\`
 POST /api/admin/registration/send-credentials
 \`\`\`

 Request body:
 \`\`\`json
 {
   "petOwnerId": "owner-123",
   "method": "email",
   "contactValue": "john.doe@example.com"
 }
 \`\`\`

 ### Request Management

 #### Data Models

 \`\`\`typescript
 interface Request {
   id: string;
   type: 'photo' | 'video' | 'grooming' | 'boarding-extension' | 'custom';
   status: 'new' | 'in-progress' | 'completed' | 'rejected';
   petId: string;
   petName: string;
   petSize?: 'Small' | 'Medium' | 'Large' | 'XL';
   ownerId: string;
   petOwnerName: string;
   description: string;
   createdAt: Date;
   updatedAt: Date;
   approvedAt?: Date;
   approvedBy?: string;
   completedAt?: Date;
   completedBy?: string;
   rejectedAt?: Date;
   rejectedBy?: string;
   rejectionReason?: string;
   processingNotes?: string;
   mediaFiles?: {
     type: string;
     urls: string[];
     count: number;
     audioUrl?: string;
     audioName?: string;
     audioMerged?: boolean;
     mergedVideoUrl?: string;
   };
   extensionDetails?: {
     duration: string;
     unit: 'hours' | 'days';
   };
   currentEndDate?: Date;
   newEndDate?: Date;
   extensionApproved?: boolean;
   groomingService?: string;
   price?: number;
   boardingId?: string;
   isNewlyCompleted?: boolean;
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/admin/requests
 GET /api/admin/requests/:id
 PUT /api/admin/requests/:id
 POST /api/admin/requests/:id/complete
 POST /api/admin/requests/:id/reject
 POST /api/admin/requests/:id/undo-accept
 \`\`\`

 Query parameters for GET /api/admin/requests:
 - `status`: Filter by request status
 - `type`: Filter by request type
 - `search`: Search term for filtering
 - `sort`: Sort order (asc/desc)
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 Request body for completing a request:
 \`\`\`json
 {
   "processingNotes": "Completed as requested",
   "mediaFiles": {
     "urls": ["url1", "url2"],
     "count": 2
   },
   "extensionDate": "2023-06-25T10:00:00Z",
   "groomingService": "premium-wash-and-cut",
   "price": 500
 }
 \`\`\`

 ### Requests Module

 #### API Endpoints

 \`\`\`
 GET /api/admin/requests
 GET /api/admin/requests/:id
 PUT /api/admin/requests/:id/approve
 PUT /api/admin/requests/:id/reject
 \`\`\`

 Request body for rejecting a request:
 \`\`\`json
 {
   "rejectionReason": "Service not available at this time"
 }
 \`\`\`

 ### History Module

 #### Data Models

 \`\`\`typescript
 interface HistoryEntry {
   id: string;
   module: 'pet-owner' | 'pet' | 'boarding' | 'request' | 'request-management';
   action: string;
   description: string;
   timestamp: Date;
   performedBy: string;
   petId?: string;
   petName?: string;
   ownerId?: string;
   ownerName?: string;
   status?: string;
   amount?: number;
   mediaUrls?: string[];
   mediaTypes?: string[];
 }

 interface MediaEntry {
   id: string;
   requestId: string;
   requestType: 'photo' | 'video';
   petId: string;
   petName: string;
   ownerId: string;
   ownerName: string;
   description: string;
   mediaUrls: string[];
   timestamp: Date;
   completedAt: Date;
   completedBy: string;
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/admin/history
 GET /api/admin/history/:id
 DELETE /api/admin/history/:id
 GET /api/admin/media
 GET /api/admin/media/:id
 DELETE /api/admin/media/:id
 GET /api/admin/media/download/:id
 GET /api/admin/media/download-zip/:id
 \`\`\`

 Query parameters for GET /api/admin/history:
 - `module`: Filter by module
 - `status`: Filter by status
 - `search`: Search term for filtering
 - `date`: Filter by date
 - `sort`: Sort order (asc/desc)
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 Query parameters for GET /api/admin/media:
 - `type`: Filter by media type
 - `petOwner`: Filter by pet owner
 - `search`: Search term for filtering
 - `date`: Filter by date
 - `sort`: Sort order (asc/desc)
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 ## Pet Owner Modules

 ### Pet Owner Home

 #### API Endpoints

 \`\`\`
 GET /api/pet-owner/dashboard
 \`\`\`

 Response:
 \`\`\`json
 {
   "pets": [
     {
       "id": "pet-123",
       "name": "Max",
       "breed": "Golden Retriever",
       "age": "3 years",
       "size": "Large",
       "avatar": "/images/pets/max.jpg",
       "boarding": {
         "status": "Boarding",
         "startDate": "2023-06-15T10:00:00Z",
         "endDate": "2023-06-20T10:00:00Z",
         "boardingType": "Standard",
         "totalPrice": 2500,
         "paidAmount": 1000,
         "remainingAmount": 1500
       }
     }
   ],
   "requests": [
     {
       "id": "req-123",
       "type": "photo",
       "status": "in-progress",
       "petName": "Max",
       "description": "Daily photo update",
       "createdAt": "2023-06-16T08:00:00Z"
     }
   ],
   "notifications": [
     {
       "id": "notif-123",
       "title": "Request Approved",
       "message": "Your photo request for Max has been approved",
       "timestamp": "2023-06-16T09:00:00Z",
       "isRead": false,
       "type": "request-approved",
       "requestId": "req-123"
     }
   ]
 }
 \`\`\`

 ### Pet Owner Requests

 #### API Endpoints

 \`\`\`
 GET /api/pet-owner/requests
 GET /api/pet-owner/requests/:id
 POST /api/pet-owner/requests
 DELETE /api/pet-owner/requests/:id
 \`\`\`

 Query parameters for GET /api/pet-owner/requests:
 - `status`: Filter by request status
 - `type`: Filter by request type
 - `search`: Search term for filtering
 - `sort`: Sort order (asc/desc)
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 Request body for POST:
 \`\`\`json
 {
   "type": "photo",
   "petId": "pet-123",
   "description": "Please send a photo of Max today"
 }
 \`\`\`

 ### Media Archive

 #### API Endpoints

 \`\`\`
 GET /api/pet-owner/media
 GET /api/pet-owner/media/:id
 GET /api/pet-owner/media/download/:id
 \`\`\`

 Query parameters for GET /api/pet-owner/media:
 - `type`: Filter by media type
 - `petId`: Filter by pet
 - `search`: Search term for filtering
 - `date`: Filter by date
 - `sort`: Sort order (asc/desc)
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 ### Notifications

 #### Data Models

 \`\`\`typescript
 interface Notification {
   id: string;
   userId: string;
   title: string;
   message: string;
   timestamp: Date;
   isRead: boolean;
   type: string;
   requestId?: string;
   petId?: string;
   boardingId?: string;
   link?: string;
 }
 \`\`\`

 #### API Endpoints

 \`\`\`
 GET /api/pet-owner/notifications
 GET /api/pet-owner/notifications/:id
 PUT /api/pet-owner/notifications/:id/read
 PUT /api/pet-owner/notifications/read-all
 \`\`\`

 Query parameters for GET /api/pet-owner/notifications:
 - `read`: Filter by read status
 - `type`: Filter by notification type
 - `page`: Page number for pagination
 - `limit`: Number of items per page

 ### Profile

 #### API Endpoints

 \`\`\`
 GET /api/pet-owner/profile
 PUT /api/pet-owner/profile
 POST /api/pet-owner/profile/avatar
 \`\`\`

 Request body for PUT:
 \`\`\`json
 {
   "name": "John Doe",
   "email": "john.doe@example.com",
   "phone": "09123456789",
   "address": {
     "streetAddress": "123 Main St",
     "city": "Makati",
     "province": "Metro Manila"
   }
 }
 \`\`\`

 ## Database Schema

 ### MongoDB Collections

 1. **Users**
    - Stores user authentication data
    - Indexes: email, role

 2. **PetOwners**
    - Stores pet owner information
    - References: userId
    - Indexes: email, phone, name

 3. **Pets**
    - Stores pet information
    - References: ownerId
    - Indexes: name, ownerId, isBoarding

 4. **BoardingOrders**
    - Stores boarding information
    - References: petId, ownerId
    - Indexes: petId, ownerId, boardingStatus, paymentStatus, startDate, endDate

 5. **Requests**
    - Stores service requests
    - References: petId, ownerId
    - Indexes: type, status, petId, ownerId, createdAt

 6. **Media**
    - Stores media metadata
    - References: requestId, petId, ownerId
    - Indexes: requestId, petId, ownerId, type

 7. **Notifications**
    - Stores user notifications
    - References: userId, requestId, petId, boardingId
    - Indexes: userId, isRead, timestamp

 8. **Activities**
    - Stores system activities for audit trail
    - References: userId, petId, ownerId, requestId, boardingId
    - Indexes: module, timestamp

 ### Redis Usage

 1. **Session Storage**
    - Store JWT tokens and session data
    - Key pattern: `session:{userId}`

 2. **Cache**
    - Cache frequently accessed data
    - Key patterns:
      - `dashboard:stats` (expires after 5 minutes)
      - `pet:{petId}` (expires after 10 minutes)
      - `owner:{ownerId}` (expires after 10 minutes)

 3. **Rate Limiting**
    - Limit API requests
    - Key pattern: `ratelimit:{ip}:{endpoint}`

 ## Email Templates

 ### Directory Structure

 \`\`\`
 /emails
   /auth
     forgot-password.html
     welcome.html
     credentials.html
   /boarding
     boarding-confirmation.html
     boarding-reminder.html
     boarding-completed.html
   /requests
     request-approved.html
     request-completed.html
     request-rejected.html
 \`\`\`

 ### HTML/CSS Guidelines

 1. Use inline CSS for email compatibility
 2. Test with email testing tools (Litmus, Email on Acid)
 3. Keep design responsive but simple
 4. Include both HTML and plain text versions

 ### Sample Email Template

 &lt;!DOCTYPE html>
 <html>
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Big Paws Pet Hotel - {{subject}}</title>
   <style>
     /* Base styles */
     body {
       font-family: Arial, sans-serif;
       line-height: 1.6;
       color: #333333;
       margin: 0;
       padding: 0;
     }
     .container {
       max-width: 600px;
       margin: 0 auto;
       padding: 20px;
     }
     .header {
       background-color: #2e3357;
       padding: 20px;
       text-align: center;
     }
     .logo {
       max-width: 150px;
     }
     .content {
       padding: 20px;
       background-color: #ffffff;
     }
     .footer {
       background-color: #f5f5f5;
       padding: 20px;
       text-align: center;
       font-size: 12px;
       color: #666666;
     }
     .button {
       display: inline-block;
       background-color: #2e3357;
       color: #ffffff !important;
       text-decoration: none;
       padding: 12px 24px;
       border-radius: 4px;
       margin: 20px 0;
     }
   </style>
 </head>
 <body>
   <div class="container">
     <div class="header">
       <img src="{{logoUrl}}" alt="Big Paws Pet Hotel" class="logo">
     </div>
     <div class="content">
       <h1>{{heading}}</h1>
       <p>{{greeting}},</p>
       <p>{{message}}</p>
      
       {{#if actionUrl}}
       <div style="text-align: center;">
         <a href="{{actionUrl}}" class="button">{{actionText}}</a>
       </div>
       {{/if}}
      
       <p>If you have any questions, please contact us at support@bigpawspethotel.com or call us at +63 950 189 0933.</p>
      
       <p>Best regards,<br>
       The Big Paws Pet Hotel Team</p>
     </div>
     <div class="footer">
       <p>© 2023 Big Paws Pet Hotel. All rights reserved.</p>
       <p>Bonifacio St., Tagum City, Davao del Norte, Philippines 8100</p>
     </div>
   </div>
 </body>
 </html>


 ## File Storage

 ### Media Files

 1. **Storage Solution**
    - Use AWS S3 or similar cloud storage
    - Create separate buckets for different media types:
      - `bigpaws-pet-photos`
      - `bigpaws-pet-videos`
      - `bigpaws-user-avatars`

 2. **File Organization**
    - Use structured paths:
      - Photos: `pets/{petId}/photos/{requestId}/{filename}`
      - Videos: `pets/{petId}/videos/{requestId}/{filename}`
      - Avatars: `users/{userId}/avatar/{filename}`

 3. **File Processing**
    - Resize images to standard dimensions
    - Compress videos for efficient streaming
    - Generate thumbnails for quick loading

 ### API Endpoints

 \`\`\`
 POST /api/upload/photo
 POST /api/upload/video
 POST /api/upload/avatar
 GET /api/media/{mediaId}
 GET /api/media/download/{mediaId}
 \`\`\`

 ## Security Considerations

 1. **Authentication**
    - Use JWT with appropriate expiration
    - Implement refresh token mechanism
    - Store tokens in HTTP-only cookies

 2. **Authorization**
    - Implement role-based access control
    - Validate user permissions for each request
    - Implement IP-based restrictions for admin routes

 3. **Data Validation**
    - Validate all input data
    - Sanitize user inputs to prevent XSS
    - Use parameterized queries to prevent SQL injection

 4. **API Security**
    - Implement rate limiting
    - Use HTTPS for all communications
    - Add CSRF protection for form submissions

 5. **File Upload Security**
    - Validate file types and sizes
    - Scan uploads for malware
    - Generate random filenames to prevent path traversal

 ## Deployment Guidelines

 1. **Environment Setup**
    - Development, staging, and production environments
    - Environment-specific configuration files
    - Use environment variables for sensitive information

 2. **Continuous Integration/Deployment**
    - Automated testing before deployment
    - Staged rollout process
    - Rollback capability

 3. **Monitoring and Logging**
    - Implement centralized logging
    - Set up performance monitoring
    - Configure error alerting

 4. **Backup Strategy**
    - Regular database backups
    - File storage backups
    - Disaster recovery plan

 5. **Scaling Considerations**
    - Horizontal scaling for API servers
    - Database sharding for large datasets
    - CDN for media delivery

 ---

 This guide provides a comprehensive overview of the backend requirements for the Big Paws Pet Hotel application. By following these guidelines, you can implement a robust backend system that integrates seamlessly with the existing frontend components.

 For any questions or clarifications, please contact the development team.

 Please make sure to add the following environment variables to your project:

 

