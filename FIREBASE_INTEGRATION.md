# FGCK-44 Firebase Integration Documentation

This document provides instructions for running the FGCK-44 website locally and deploying it to production.

## Overview

The website now includes:
- **Firebase Firestore Integration** for CRUD operations on all content types
- **Analytics Tracking** for home, blog, and sermons pages
- **Admin Dashboard** with real-time data from Firestore
- **Contact Form** that saves messages to Firestore

## Firestore Collections

The following Firestore collections are used:

| Collection | Purpose |
|------------|---------|
| `blogs` | Blog posts (title, subheading, image, date, content) |
| `sermons` | Sermon videos (title, description, youtube, date) |
| `events` | Church events (title, image, date, description) |
| `projects` | Church projects (title, image, deadline, progress, description) |
| `inbox` | Contact form messages (name, email, phone, message) |
| `pageVisits` | Analytics data (visitorId, page, screenWidth, timestamp) |

## Analytics System

### Tracked Pages
- **Home page** → Total Visits
- **Blog page** → Blog Reads  
- **Sermons page** → Sermon Views

### How it Works
1. When a user visits a tracked page, a UUID is generated and stored in `localStorage` as `visitor_id`
2. The following data is captured:
   - `visitorId`: Unique visitor identifier
   - `page`: Which page was visited (home, blog, or sermons)
   - `screenWidth`: Browser window width
   - `timestamp`: Time of visit
3. Data is sent to `/api/track` endpoint
4. Server-side deduplication prevents multiple counts within 5 minutes

### Dashboard Metrics
- **Total Visits**: Count of home page visits this month
- **Blog Reads**: Count of blog page visits this month
- **Sermon Views**: Count of sermons page visits this month
- **Charts**: Bar chart (8 months) and pie chart (current month distribution)

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the project root:

```env
# Firebase Admin SDK (for API routes)
FIREBASE_PROJECT_ID=fgck44-a89a0

# Optional: For production with service account
# FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
# FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Firebase Configuration

The client-side Firebase config is in `src/features/firebase/firebaseConfig.ts`. Update these values if using a different Firebase project:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Running Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Firestore Security Rules

For production, set up proper Firestore security rules. Example:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for content
    match /blogs/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /sermons/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Inbox - public write, authenticated read
    match /inbox/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Page visits - public write, authenticated read
    match /pageVisits/{document} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `FIREBASE_PROJECT_ID`
   - (Optional) `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` for service account

4. Deploy!

### Firebase Hosting Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init hosting

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── track/
│   │       └── route.ts         # Analytics API endpoint
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── page.tsx         # Overview with 3 analytics cards
│   │       ├── overview-charts.tsx
│   │       ├── blog/
│   │       ├── sermons/
│   │       ├── events/
│   │       ├── projects/
│   │       └── inbox/
│   └── (site)/
│       ├── page.tsx             # Home (tracked)
│       ├── blog/
│       │   └── page.tsx         # Blog (tracked)
│       ├── sermons/
│       │   └── page.tsx         # Sermons (tracked)
│       └── contact/
│           └── page.tsx         # Contact form
├── components/
│   └── site/
│       ├── PageTracker.tsx      # Analytics tracking component
│       └── ContactForm.tsx      # Contact form component
├── lib/
│   ├── analytics/
│   │   ├── index.ts
│   │   ├── tracking.ts          # Tracking utilities
│   │   └── useTrackPage.ts      # React hook for tracking
│   └── firestore/
│       ├── index.ts             # Exports all services
│       ├── types.ts             # TypeScript interfaces
│       ├── collections.ts       # Collection names
│       ├── blogService.ts       # Blog CRUD
│       ├── sermonService.ts     # Sermon CRUD
│       ├── eventService.ts      # Event CRUD
│       ├── projectService.ts    # Project CRUD
│       ├── inboxService.ts      # Inbox CRUD
│       └── analyticsService.ts  # Analytics queries
└── features/
    └── firebase/
        └── firebaseConfig.ts    # Firebase client config
```

## Admin Dashboard Features

### Content Management
- **Blog**: Create, edit, delete blog posts with image upload
- **Sermons**: Add YouTube videos, edit metadata
- **Events**: Schedule events with images and descriptions
- **Projects**: Track church projects with progress bars
- **Inbox**: View and manage contact form submissions

### Analytics Dashboard
- 3 metric cards with monthly comparison
- Bar chart showing 8-month trends
- Pie chart for current month distribution
- Real-time data from Firestore

## Troubleshooting

### Firebase Permissions Error
If you see permission errors, ensure:
1. Firestore rules allow read/write access
2. Firebase project ID is correct in environment variables

### Analytics Not Tracking
Check:
1. `PageTracker` component is included on the page
2. Browser console for any errors
3. LocalStorage `visitor_id` is being set

### Dashboard Shows No Data
Ensure:
1. Firestore collections exist
2. Data has been added to collections
3. Firebase client is properly initialized

## Support

For issues or questions, check the GitHub repository or contact the development team.
