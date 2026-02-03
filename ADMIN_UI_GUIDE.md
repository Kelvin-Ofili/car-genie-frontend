# Admin UI - Dealer Application Management

A complete admin dashboard for reviewing and managing dealer partnership applications.

## ✅ What's Included

### Backend (Already Complete)
- ✅ Admin authentication with Firebase Custom Claims
- ✅ Protected API routes requiring admin privileges
- ✅ Dealer application approval/rejection endpoints

### Frontend (NEW)
- ✅ Admin Dashboard at `/admin`
- ✅ View all dealer applications (pending, approved, rejected)
- ✅ Approve applications with one click
- ✅ Reject applications with optional reason
- ✅ Filter applications by status
- ✅ Admin link in user menu (only visible to admins)
- ✅ Auto-redirect if non-admin tries to access

## 🚀 How to Use

### 1. Set Up Your First Admin

```bash
# Backend directory
cd car-genie-backend
npm run setup-admin your-email@example.com
```

### 2. Sign Out & Back In
The admin role is stored in the JWT token, so you must:
1. Sign out of the app
2. Sign back in with the same account
3. Your token will now include `admin: true`

### 3. Access Admin Dashboard

Once signed in as admin:
- Click your profile icon (top right)
- See **"Admin Dashboard"** in the menu (blue text with shield icon)
- Click to access `/admin`

## 📱 Features

### Application Cards
Each card shows:
- ✅ Dealership name and contact person
- ✅ Email and phone
- ✅ Locations, staff capacity, inventory range
- ✅ Database connection details (host, port, database, username)
- ✅ Submission timestamp
- ✅ Current status badge (pending/approved/rejected)
- ✅ Rejection reason (if rejected)

### Actions
- **Approve** - Instantly approve application
- **Reject** - Open modal to add rejection reason
- **Filter** - View All, Pending, Approved, or Rejected

### Status Filters
- **All** - Show all applications
- **Pending** - Only pending applications (default)
- **Approved** - Successfully approved dealerships
- **Rejected** - Rejected applications with reasons

## 🎨 UI Components

### Admin Dashboard (`/admin`)
```
src/pages/adminPage/index.tsx
```
- Full-screen dashboard with responsive design
- Real-time filtering
- Confirmation dialogs for actions
- Error handling with user-friendly messages

### Admin Service
```
src/services/admin.service.ts
```
- API integration for all admin operations
- Firebase token authentication
- TypeScript interfaces for type safety

### User Menu Update
```
src/components/userMenu.tsx
```
- Admin link only shown to users with admin role
- Shield icon for visual distinction
- Blue highlight to stand out

## 🔒 Security

### Backend Protection
- All admin routes require valid Firebase token
- Token must have `admin: true` in custom claims
- 403 Forbidden if not admin

### Frontend Protection
- Admin page checks admin status on load
- Non-admins see "Access Denied" message
- Admin menu link only visible to admins

## 📊 Workflow

1. **Dealer Applies** (via carrie-marketing onboarding)
   - Submits business info + DB credentials
   - Status: `pending`

2. **Admin Reviews** (in car-genie admin dashboard)
   - Views application details
   - Tests can be run manually
   
3. **Admin Decides**
   - **Approve** → Status becomes `approved`
   - **Reject** → Status becomes `rejected` with reason

4. **Next Steps** (To be implemented)
   - Send approval email with login credentials
   - Create dealer user account
   - Move to active dealers collection
   - Send rejection email with reason

## 🔗 API Endpoints Used

The Admin UI calls these backend endpoints:

```
GET  /api/dealers/applications           # List all applications
GET  /api/dealers/applications?status=X  # Filter by status
POST /api/dealers/applications/:id/approve
POST /api/dealers/applications/:id/reject
GET  /api/admin/me/claims                # Get current user role
```

## 🎯 Testing

### Test the Full Flow

1. **Create test dealer application:**
   ```bash
   # Start mock database
   cd car-genie-backend/mock-database
   docker-compose up -d
   
   # Go to onboarding
   http://localhost:5174/onboarding
   
   # Fill out form with mock DB credentials:
   Host: localhost
   Port: 3306
   Database: dealership_inventory
   User: carrie_readonly
   Password: Test123!@#
   ```

2. **Review as admin:**
   ```bash
   # Make sure you're admin (see step 1 above)
   # Go to car-genie app
   http://localhost:5173
   
   # Click profile → Admin Dashboard
   # See your test application
   # Try approving/rejecting it
   ```

## 🐛 Troubleshooting

### "Access denied" even after running setup-admin
- **Solution:** Sign out and back in to refresh token

### Admin link not showing in menu
- **Solution:** Check token has admin claim:
  ```typescript
  // In browser console
  const token = await firebase.auth().currentUser.getIdTokenResult();
  console.log(token.claims);
  // Should show { admin: true }
  ```

### Applications not loading
- **Solution:** Check backend is running on port 4000
- **Solution:** Open browser dev tools → Network tab → Check API calls

### Can't approve/reject
- **Solution:** Backend might not be running
- **Solution:** Check console for error messages

## 📝 Code Structure

```
car-genie/src/
├── pages/adminPage/
│   └── index.tsx              # Main admin dashboard
├── services/
│   └── admin.service.ts       # Admin API calls
├── components/
│   └── userMenu.tsx           # Updated with admin link
└── router/
    ├── routes.ts              # Added /admin route
    └── routeBuilder.tsx       # Registered admin page
```

## 🎨 Styling

- TailwindCSS utility classes
- Responsive design (mobile-friendly)
- Color scheme:
  - Pending: Yellow badges
  - Approved: Green badges  
  - Rejected: Red badges
  - Admin link: Indigo/blue

## 🚧 What's Next

After this admin UI, the remaining tasks are:
1. ✅ Admin authentication ← DONE
2. ✅ Admin UI for applications ← DONE
3. ⬜ Email notifications (approval/rejection)
4. ⬜ Create dealer user accounts on approval
5. ⬜ Dealer dashboard for approved dealers
6. ⬜ Real inventory integration

---

**Status:** ✅ Complete and ready to use!
