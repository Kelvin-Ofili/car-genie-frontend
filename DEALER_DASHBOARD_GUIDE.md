# Dealer Dashboard Guide

## Overview
The Dealer Dashboard provides approved dealers with a portal to manage their inventory integration, view leads, and track performance within the Carrie platform.

## Access Control
- **Route**: `/dealer`
- **Authentication**: Requires Firebase authentication
- **Authorization**: Only users with `dealer: true` custom claim can access
- **Redirect**: Non-dealers are shown an access denied page with option to apply

## Features

### 1. Dashboard Overview
The main dashboard displays:
- **Stats Cards**: Total leads, active listings, monthly views (currently showing 0 - placeholder)
- **Recent Leads**: List of customer inquiries (coming soon)
- **Quick Actions**: Buttons for adding listings, syncing inventory, and viewing analytics

### 2. Integration Status
- Real-time database connection status indicator
- Dealership ID display for reference
- Connected/disconnected state with visual feedback

### 3. Access Requirements
To become a dealer:
1. Apply through the marketing site onboarding flow (`http://localhost:5174/onboarding`)
2. Complete Phase 1: Dealership information
3. Complete Phase 2: Contact details
4. Complete Phase 3: Database connection setup
5. Wait for admin approval
6. Admin grants dealer role via custom claims

### 4. Role Assignment (Backend)
When an admin approves a dealer application, the backend should:
1. Create Firebase user account for the dealer
2. Set custom claims:
   ```typescript
   {
     dealer: true,
     role: "dealer",
     dealershipName: "Name of Dealership",
     dealershipId: "unique-id"
   }
   ```
3. Move application from `dealerApplications` to `dealers` collection
4. Send credentials via email

**Note**: The full approval workflow is partially implemented. Current gaps:
- Email notifications (TODOs in `dealer.controller.ts` lines 118-119, 184, 220)
- Automatic user creation on approval
- Credential generation and delivery

## User Menu Integration
Dealers will see a "Dealer Dashboard" link in the user menu:
- **Icon**: Building/dealership icon
- **Color**: Green
- **Visibility**: Only shown when user has dealer custom claim
- **Location**: Below Settings, above Logout (or below Admin Dashboard if user is also admin)

## Check Dealer Status (Frontend)
```typescript
import { checkDealerStatus } from "services/admin.service";

const isDealer = await checkDealerStatus();
if (isDealer) {
  // Show dealer features
}
```

## Testing
1. **Create a dealer account** (requires admin access):
   ```bash
   # In car-genie-backend
   npm run setup-admin your-test-dealer@example.com
   ```

2. **Set dealer claim manually** (Firebase Console or CLI):
   ```javascript
   admin.auth().setCustomUserClaims(uid, { 
     dealer: true, 
     role: "dealer",
     dealershipId: "test-dealer-123"
   });
   ```

3. **Sign out and back in** to refresh token with new claims

4. **Navigate to** `/dealer` to see the dashboard

## Planned Features
- **Lead Management**: View and respond to customer inquiries
- **Inventory Sync**: Automatic synchronization with dealer database
- **Analytics**: Track views, clicks, and conversion rates
- **Listing Management**: Add/edit/remove individual vehicle listings
- **Profile Settings**: Update dealership information and contact details

## Technical Implementation

### Frontend Component
- **File**: `src/pages/dealerDashboardPage/index.tsx`
- **Dependencies**: 
  - `useAuth` hook for authentication state
  - Firebase `auth.currentUser.getIdTokenResult()` for custom claims
  - React Router for navigation

### Backend Integration
- **Routes**: Dealer-specific API endpoints (to be created)
- **Database**: `dealers` collection in Firestore
- **Custom Claims**: `dealer: true`, `role: "dealer"`, `dealershipId`, `dealershipName`

### Security
- Route is protected with `isProtected: true` in route configuration
- Client-side role check prevents unauthorized access
- Backend endpoints should verify dealer claim on all requests

## Development Status
✅ Dashboard UI created  
✅ Role checking implemented  
✅ User menu integration  
⚠️ Stats are placeholder (showing 0)  
⚠️ Lead management not yet implemented  
⚠️ Inventory sync not yet implemented  
❌ Analytics not yet implemented  
❌ Listing management not yet implemented  

## Next Steps
1. Implement full dealer approval workflow in backend
2. Create dealer-specific API endpoints
3. Build lead management interface
4. Implement inventory synchronization
5. Add analytics and reporting
