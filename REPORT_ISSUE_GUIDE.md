# Report an Issue Modal - Implementation Guide

## Overview

This document explains the Report an Issue modal functionality, including two design variants, and how to use them in your application.

---

## Components Created

### 1. **ReportIssueModal** (Primary Design)

**File:** `src/components/report-issue-modal.tsx`

**Design Features:**

- Centered modal with dark theme
- Vertical form layout
- Green accent color (#4ade80)
- Image preview with remove option
- Real-time form validation
- Success/error status messages
- Responsive design

**Form Fields:**

- Explain the issue (textarea)
- Add Photo (file upload with preview)
- Email (email input)
- Send button

---

### 2. **AlternativeReportModal** (Alternative Design)

**File:** `src/components/alternative-report-modal.tsx`

**Design Features:**

- Side-by-side layout (illustration + form)
- Red accent color (from-red-600)
- Compact form fields
- Priority selector dropdown
- Subject field
- More professional/enterprise look
- Mobile responsive (collapses illustration on small screens)

**Form Fields:**

- Subject (text input)
- Priority (dropdown: low, medium, high)
- Email (email input)
- Description (textarea)
- Attachment (file upload, optional)
- Send Report button

---

## Updated Files

### Footer Component

**File:** `src/components/footer.tsx`

**Changes Made:**

- Added state management for modal visibility
- Converted "Report an Issue" link to a button
- Added ReportIssueModal component to footer
- Button click opens the modal

**Usage in Footer:**

```tsx
const [isReportModalOpen, setIsReportModalOpen] = useState(false);

// ... in JSX
<button
  onClick={() => setIsReportModalOpen(true)}
  className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm text-left w-full"
>
  Report an Issue
</button>

<ReportIssueModal
  isOpen={isReportModalOpen}
  onClose={() => setIsReportModalOpen(false)}
/>
```

---

## API Endpoint

### Route

**File:** `src/app/api/report-issue/route.ts`

**Method:** POST

**Request Format:**

- Content-Type: multipart/form-data
- Fields:
  - `issue` (string, required)
  - `email` (string, required)
  - `photo` (file, optional)
  - Additional fields for alternative design:
    - `subject` (string, optional)
    - `priority` (string: 'low'|'medium'|'high', optional)

**Response (Success - 200):**

```json
{
  "message": "Report submitted successfully",
  "data": {
    "email": "user@example.com",
    "timestamp": "2024-04-20T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**

```json
{
  "message": "Issue and email are required"
}
```

**Validation:**

- Issue description is required and non-empty
- Email is required and valid format
- Email regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

## How to Use

### Option 1: Use Primary Design (Green Theme)

```tsx
import ReportIssueModal from "@/components/report-issue-modal";
import { useState } from "react";

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Report Issue</button>
      <ReportIssueModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

### Option 2: Use Alternative Design (Red Theme)

```tsx
import AlternativeReportModal from "@/components/alternative-report-modal";
import { useState } from "react";

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Report Issue</button>
      <AlternativeReportModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
```

---

## Features

### Primary Modal (ReportIssueModal)

✅ Photo upload with preview
✅ Remove photo option
✅ Form validation
✅ Success/error messages
✅ Loading state during submission
✅ Auto-close on successful submission
✅ Form reset after submission
✅ Responsive design

### Alternative Modal (AlternativeReportModal)

✅ Side-by-side layout with illustration
✅ Priority selection
✅ Subject field
✅ Compact form layout
✅ Attachment preview
✅ Loading state during submission
✅ Mobile responsive
✅ Professional appearance

---

## Styling Details

### Primary Design Colors:

- Background: `#1B1B1B` (dark)
- Borders: `#2A2A2A`, `#3A3A3A`
- Text: white, gray-300, gray-500
- Accent: `#4ade80` (green)
- Success: green-900, green-200
- Error: red-900, red-200

### Alternative Design Colors:

- Background: `#1B1B1B` (dark)
- Illustration: gradient from red-900 to red-800
- Accent: red-600, red-700
- Borders: gray-600, red-500 (on focus)

---

## Backend Implementation TODO

In `src/app/api/report-issue/route.ts`, you need to implement:

1. **Database Storage:**

```tsx
// Example using Prisma
await db.reportedIssues.create({
  issue,
  email,
  photoUrl: photo ? uploadedPhotoUrl : null,
  createdAt: new Date(),
});
```

2. **File Upload to Cloud Storage:**

```tsx
// Example using AWS S3 or Cloudinary
const uploadedPhotoUrl = await uploadToCloudStorage(photo);
```

3. **Send Notification Email:**

```tsx
// Example using Nodemailer or SendGrid
await sendEmail({
  to: process.env.ADMIN_EMAIL,
  subject: "New Issue Report",
  body: `New issue report from ${email}: ${issue}`,
});
```

---

## Mobile Responsiveness

### Primary Modal:

- Full width on mobile with padding
- Stacked form fields
- Touch-friendly buttons and inputs
- Image preview scales with screen

### Alternative Modal:

- Illustration hidden on screens smaller than md
- Full width form on mobile
- Maintains all functionality
- Responsive grid layout

---

## Accessibility Features

✅ Semantic HTML structure
✅ Proper label associations
✅ Focus states on inputs
✅ Disabled state management
✅ Form validation with user feedback
✅ Close button for keyboard navigation
✅ Backdrop for modal focus

---

## Error Handling

The modals handle:

- ✅ Empty form fields
- ✅ Invalid email format
- ✅ File upload errors
- ✅ Network errors
- ✅ Server errors (500)
- ✅ Validation errors (400)

---

## Future Enhancements

1. Add category/type selector for issues
2. Implement auto-save draft functionality
3. Add screenshot capture tool
4. Email confirmation after submission
5. Ticket tracking number
6. Multilingual support
7. Rate limiting per email
8. Admin dashboard for reviewing reports

---

## File Structure

```
src/
├── components/
│   ├── footer.tsx (UPDATED)
│   ├── report-issue-modal.tsx (NEW)
│   └── alternative-report-modal.tsx (NEW)
└── app/
    └── api/
        └── report-issue/
            └── route.ts (NEW)
```

---

## Dependencies

- React (hooks: useState, useRef)
- Next.js (Image, NextRequest, NextResponse)
- lucide-react (icons: X, Upload, AlertCircle, Send)
- Tailwind CSS (styling)

All dependencies are already in your project!

---

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

---

For more information or customization needs, refer to the component source files.
