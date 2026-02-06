# Carrie - Complete Feature Documentation & Production Roadmap

**Last Updated:** February 5, 2026  
**Status:** Development/MVP Phase  
**Architecture:** 3-Tier System (Marketing Site + Main App + Backend API)

---

## 🎯 System Overview

**Carrie** is an AI-powered car recommendation platform connecting car buyers with dealership inventory through natural conversation. The system consists of three interconnected applications:

1. **carrie-marketing** - Marketing site & dealer onboarding (Port 5174)
2. **car-genie** - Main user application with AI chat (Port 5173)
3. **car-genie-backend** - API server with AI/Firebase/Email (Port 4000)

---

## 📦 1. CARRIE MARKETING SITE (`carrie-marketing`)

### Purpose
Public-facing marketing site for buyer discovery and dealer acquisition.

### ✅ Completed Features

#### **1.1 Dual-Audience Landing Page**
- **For Buyers Section**
  - Hero with value proposition
  - Feature showcase (no endless scrolling, clear comparisons, smart recommendations)
  - Direct "Try Carrie" CTA to main app
  - Responsive grid layout with benefit cards

- **For Sellers Section**
  - Dealer-focused value proposition
  - Partnership benefits (higher-intent leads, less follow-up, inventory sync)
  - "Partner with us" CTA to onboarding
  - Trust indicators and ROI highlights

#### **1.2 Theme System**
- ✅ Light/Dark mode with auto-detection
- ✅ LocalStorage persistence
- ✅ Smooth transitions
- ✅ System preference detection

#### **1.3 Navigation**
- ✅ Fixed header with smooth scroll
- ✅ Tab switcher (Buyers/Sellers)
- ✅ Theme toggle
- ✅ Mobile responsive

#### **1.4 Dealer Onboarding Flow (3 Phases)**

**Phase 1: Introduction & Benefits**
- Partnership value proposition
- Requirements overview (database access)
- Security assurances (read-only, encrypted)
- Benefits breakdown

**Phase 2: Business Information**
- Required fields:
  - Dealership name
  - Contact person name
  - Email address
  - Phone number
- Optional fields:
  - Multiple locations
  - Staff capacity range
  - Inventory size range
- Validation with error messages
- Progress indicator

**Phase 3: Database Connection**
- Connection parameters:
  - Host
  - Port
  - Database name
  - Read-only username
  - Password (hidden/show toggle)
- Database setup instructions with SQL examples (MySQL, PostgreSQL, SQL Server)
- Security notices (encryption, read-only access)
- "Test Connection" feature before submission
- Real-time connection validation
- Connection result feedback (success/error with details)

#### **1.5 API Integration**
- ✅ Dealer application submission (`POST /api/dealers/onboard`)
- ✅ Connection testing (`POST /api/dealers/test-connection`)
- ✅ Error handling with user-friendly messages
- ✅ Loading states
- ✅ Rate limiting (3 applications/hour)

### 🚧 In Progress / TODO

- [ ] Contact form functionality (email integration)
- [ ] FAQ section
- [ ] Pricing/plans page
- [ ] Success stories/testimonials
- [ ] Blog/resources section
- [ ] Analytics integration (Google Analytics, Mixpanel)
- [ ] SEO optimization (meta tags, structured data, sitemap)
- [ ] Email capture for marketing
- [ ] Multi-language support

---

## 📦 2. CAR GENIE FRONTEND (`car-genie`)

### Purpose
Main user-facing application where buyers interact with AI to find cars.

### ✅ Completed Features

#### **2.1 Authentication System**
- **Sign Up**
  - Email/password registration
  - Display name collection
  - Firebase Auth integration
  - Auto-profile creation in Firestore
  - Error handling (duplicate email, weak password)

- **Login**
  - Email/password authentication
  - Error messages for invalid credentials
  - Auto-redirect to chat on success
  - Protected route system

- **Logout**
  - Confirmation modal
  - Firebase sign-out
  - Session cleanup
  - Redirect to login

#### **2.2 AI Chat Interface**
- **Real-time Conversation**
  - Natural language processing via Gemini AI
  - Conversational car recommendations
  - Budget-based filtering
  - Location awareness
  - Fuel preference handling
  - Lifestyle matching
  - Multi-turn conversations with context

- **Message Display**
  - User messages (right-aligned, blue)
  - AI responses (left-aligned, gray)
  - Markdown support in responses
  - Timestamp display
  - Auto-scroll to latest message
  - Loading indicators
  - Error state handling

- **Chat Features**
  - Persistent chat history (Firebase Firestore)
  - Context retention across sessions
  - Send on Enter key
  - Clear history option
  - Character limit handling
  - Empty message prevention

#### **2.3 Chat History Management**
- **History View**
  - All past conversations grouped by date
  - Conversation previews (first message + timestamp)
  - Click to load full conversation
  - Most recent first
  - Empty state messaging

- **Clear History**
  - Confirmation modal
  - One-click delete all
  - Visual feedback
  - Error handling

#### **2.4 Contact Dealer Feature**
- **Contact Form**
  - Car selection context
  - User information (name, email, phone)
  - Custom message
  - Send to dealer email
  - Email template with lead details
  - Success/error feedback

- **Email Service**
  - Integration with Resend API
  - Fallback to console logging (dev mode)
  - HTML email templates
  - Reply-to user email
  - Test recipient support

#### **2.5 User Profile**
- View user information
- Display name
- Email address
- Account creation date
- Firebase Auth integration

#### **2.6 Settings Page**
- **Profile Management**
  - Update display name
  - Change phone number
  - Email display (read-only)
  - Save changes with validation

- **Theme Settings**
  - Dark mode toggle (planned)

- **Account Actions**
  - Logout button
  - Session management

#### **2.7 Admin System**
- **Admin Dashboard** (`/admin`)
  - View pending dealer applications
  - Application details display
  - Approve applications
  - Reject applications with reason
  - Real-time status updates
  - Error handling

- **Admin Management** (`/admin/management`)
  - List all admin users
  - Grant admin role by UID
  - Grant admin role by email
  - Revoke admin privileges
  - Self-revocation prevention
  - Success/error feedback
  - Loading states
  - Confirmation modals

- **Admin Authorization**
  - Firebase custom claims (`admin: true`)
  - Protected routes (ProtectedRoute component)
  - Role-based access control
  - Auto-redirect non-admins

#### **2.8 Dealer Features**
- **Dealer Dashboard** (`/dealer`)
  - Coming soon placeholder
  - Protected route for dealer role
  - Role detection via custom claims

- **Dealer Status Check**
  - Custom claims verification
  - Token-based authentication
  - Role persistence

### 🚧 In Progress / TODO

#### **High Priority**
- [ ] Implement actual car search/filtering from dealer inventories
- [ ] Connect AI recommendations to real dealer databases
- [ ] Vehicle detail pages with specs
- [ ] Saved cars/favorites feature
- [ ] Comparison tool (side-by-side)
- [ ] Filter refinement UI
- [ ] Price alerts
- [ ] Dealer ratings/reviews

#### **Medium Priority**
- [ ] Dealer dashboard full implementation
  - Lead management
  - Conversation history
  - Analytics/metrics
  - Inventory sync status
  - Customer inquiries

- [ ] Notification system
  - New recommendations
  - Price drops
  - Saved search alerts
  - Email notifications

- [ ] Enhanced chat features
  - Voice input
  - Image uploads (car photos)
  - Export conversation
  - Share recommendations

#### **Low Priority**
- [ ] Social features (share finds with friends)
- [ ] Mobile app (React Native)
- [ ] Financing calculator
- [ ] Trade-in estimator
- [ ] Test drive scheduling
- [ ] Insurance quotes integration

---

## 📦 3. CAR GENIE BACKEND (`car-genie-backend`)

### Purpose
Core API server handling AI, authentication, database operations, and integrations.

### ✅ Completed Features

#### **3.1 AI Chat System**
- **Gemini Integration**
  - Google Generative AI (Gemini Pro)
  - Conversational context management
  - System prompts for car recommendations
  - Error handling and fallbacks
  - Response streaming support
  - Token limits management

- **Chat Endpoints**
  - `POST /chat` - Send message, get AI response
  - `GET /chat/history` - Retrieve user's chat history
  - `DELETE /chat/history` - Clear user's history

- **Chat Storage**
  - Firebase Firestore collections:
    - `chats` - Individual messages
    - Per-user subcollections organized by conversation
  - Timestamp tracking
  - Conversation context preservation
  - Efficient querying

#### **3.2 Authentication & Authorization**
- **Firebase Admin SDK**
  - User verification middleware
  - Token validation
  - Custom claims management
  - Role-based access control

- **Middleware**
  - `verifyFirebaseToken` - Standard auth
  - `verifyAdminToken` - Admin-only routes
  - Error handling for expired tokens
  - Graceful degradation

#### **3.3 Dealer Management System**

**Application Submission**
- `POST /api/dealers/onboard` - Submit dealer application
  - Validation (email format, phone format, required fields)
  - Duplicate check (prevent same email reapplying)
  - Database credential encryption (AES-256-CBC)
  - Rate limiting (3 requests/hour per IP)
  - Firestore storage in `dealerApplications` collection
  - Confirmation email sent to dealer
  - Returns application ID

**Connection Testing**
- `POST /api/dealers/test-connection` - Test database credentials
  - Dynamic MySQL2 connection
  - 10-second timeout
  - Validates credentials live
  - Checks for vehicles table
  - Detailed error messages
  - No data modification

**Admin Operations**
- `GET /api/dealers/applications` - List all applications (admin)
  - Filter by status (pending/approved/rejected)
  - Sorted by date (newest first)
  - Passwords hidden in response (`[ENCRYPTED]`)

- `POST /api/dealers/applications/:id/approve` - Approve application (admin)
  - Creates Firebase user with dealer role
  - Generates temporary password OR password reset link
  - Moves data to `dealers` collection
  - Updates application status to "approved"
  - Sends approval email with login credentials

- `POST /api/dealers/applications/:id/reject` - Reject application (admin)
  - Updates status to "rejected"
  - Stores rejection reason
  - Sends rejection email with reason

#### **3.4 Admin System**
- **Admin Service** (`admin.service.ts`)
  - `setAdminRole(uid)` - Grant admin custom claim
  - `removeAdminRole(uid)` - Revoke admin custom claim
  - `isUserAdmin(uid)` - Check admin status
  - `getUserClaims(uid)` - Get all custom claims
  - `listAdminUsers()` - Get all users with admin role

- **Dealer Service** (`dealer.service.ts`)
  - `setDealerRole(uid)` - Grant dealer custom claim
  - `generateTemporaryPassword()` - Create secure 16-char password
  - `createDealerUser(email, name)` - Create Firebase user + dealer role
  - `moveToDealersCollection()` - Migrate approved app to dealers collection
  - Handles existing users (update role, send password reset)

- **Admin Routes** (`/admin/*`)
  - `POST /admin/grant` - Grant admin by UID
  - `POST /admin/grant-by-email` - Grant admin by email
  - `POST /admin/revoke` - Revoke admin (prevents self-revocation)
  - `GET /admin/check` - Check if user is admin
  - `GET /admin/me/claims` - Get current user's claims
  - `GET /admin/list` - List all admin users

#### **3.5 Email System**
- **Resend Integration**
  - Professional email templates
  - Fallback to console logging (dev mode)
  - HTML formatting with inline CSS
  - Reply-to support

- **Email Types**
  - **Dealer Lead Emails** (`sendDealerEmail`)
    - Sent when user contacts dealer about car
    - Includes: car details, user info, custom message
    - Reply-to user's email

  - **Dealer Application Confirmation** (`sendDealerApplicationConfirmation`)
    - Sent immediately after application submission
    - Confirms receipt
    - Sets expectations (2-3 business days review)

  - **Dealer Approval Email** (`sendDealerApprovalEmail`)
    - Sent when admin approves application
    - Includes login credentials (email + password/reset link)
    - Links to login page
    - Setup instructions

  - **Dealer Rejection Email** (`sendDealerRejectionEmail`)
    - Sent when admin rejects application
    - Includes optional rejection reason
    - Guidance on reapplying

#### **3.6 Security**
- **Data Encryption**
  - AES-256-CBC for database passwords
  - 32-character encryption key (env variable)
  - Initialization vectors per encryption
  - Secure random generation

- **Rate Limiting**
  - Dealer onboarding: 3 requests/hour per IP
  - Connection testing: 10 requests/minute
  - Configurable limits

- **Input Validation**
  - Email regex validation
  - Phone regex validation
  - Required field checks
  - SQL injection prevention
  - XSS protection

- **CORS Configuration**
  - Whitelist specific origins
  - Credentials support
  - Development + production URLs

#### **3.7 Error Handling**
- Centralized error logging
- User-friendly error messages
- Status code standardization
- Stack trace logging (dev only)
- Graceful degradation

### 🚧 In Progress / TODO

#### **Critical (Production Blockers)**
- [ ] **Real Dealer Database Integration**
  - Connect to actual dealership inventory systems
  - Parse different DMS (Dealer Management System) schemas
  - Handle multiple database types (MySQL, PostgreSQL, SQL Server)
  - Data normalization layer
  - Query optimization
  - Caching strategy

- [ ] **Car Search Algorithm**
  - Multi-dealer inventory aggregation
  - Fuzzy search (make/model variations)
  - Budget filtering with pricing tiers
  - Location-based results (ZIP code, radius)
  - Availability status
  - Feature matching
  - Mileage filtering
  - Year range

- [ ] **AI Recommendation Engine**
  - Semantic search in inventory
  - User preference learning
  - Context-aware suggestions
  - Budget optimization
  - Trade-off explanations
  - Alternative suggestions

#### **High Priority**
- [ ] **Logging & Monitoring**
  - Structured logging (Winston, Pino)
  - Error tracking (Sentry, Rollbar)
  - Performance monitoring (New Relic, DataDog)
  - Request tracing
  - Database query monitoring
  - API usage analytics

- [ ] **Testing Infrastructure**
  - Unit tests (Jest)
  - Integration tests (Supertest)
  - End-to-end tests (Playwright)
  - Mock database setup
  - CI/CD pipeline
  - Code coverage >80%

- [ ] **Database Optimization**
  - Firestore indexing strategy
  - Query optimization
  - Pagination for large datasets
  - Caching layer (Redis)
  - Connection pooling
  - Read replicas

#### **Medium Priority**
- [ ] **Notification System**
  - Push notifications (FCM)
  - Email notifications
  - SMS notifications (Twilio)
  - Notification preferences
  - Unsubscribe management

- [ ] **Analytics**
  - Usage metrics
  - Conversion tracking
  - A/B testing framework
  - User behavior analytics
  - Business intelligence

- [ ] **Admin Tools**
  - Admin dashboard API
  - User management endpoints
  - Content moderation
  - Ban/suspend users
  - Audit logs

#### **Low Priority**
- [ ] Scheduling system (test drives, appointments)
- [ ] Payment processing (deposits, fees)
- [ ] Document management (contracts, paperwork)
- [ ] Video chat integration
- [ ] CRM integration
- [ ] Third-party APIs (KBB, Carfax, Edmunds)

---

## 🏗️ PRODUCTION ROADMAP

### Phase 1: MVP Completion (1-2 months)
**Goal:** Launch with core functionality working end-to-end

1. **Real Inventory Integration** (2 weeks)
   - Connect to 3-5 pilot dealerships
   - Implement database connectors
   - Data normalization
   - Caching strategy

2. **Search & Filtering** (1 week)
   - Basic search by make/model
   - Budget filtering
   - Location-based results
   - Availability checking

3. **AI Recommendations** (1 week)
   - Match user preferences to inventory
   - Context-aware suggestions
   - Budget optimization

4. **Testing & Bug Fixes** (1 week)
   - End-to-end testing
   - Bug fixes
   - Performance optimization
   - Security audit

5. **Documentation** (3 days)
   - API documentation
   - Dealer onboarding guides
   - User guides
   - Admin documentation

### Phase 2: Beta Launch (1 month)
**Goal:** Limited release with monitoring and feedback

1. **Monitoring Setup** (3 days)
   - Sentry for error tracking
   - Performance monitoring
   - Usage analytics
   - Alert system

2. **Beta Testing** (2 weeks)
   - 10-20 beta users
   - Gather feedback
   - Iterate on UX
   - Fix critical bugs

3. **Dealer Support** (Ongoing)
   - Help 3-5 dealers onboard
   - Technical support
   - Database connection assistance
   - Training materials

4. **Marketing Materials** (1 week)
   - Landing page optimization
   - Demo videos
   - Screenshots
   - Case studies

### Phase 3: Scale & Optimize (2-3 months)
**Goal:** Handle increased traffic and expand features

1. **Infrastructure Scaling**
   - Database optimization
   - Caching layer
   - CDN setup
   - Load balancing

2. **Feature Expansion**
   - Saved searches
   - Price alerts
   - Comparison tool
   - Reviews system

3. **Dealer Growth**
   - Onboard 20+ dealerships
   - Geographic expansion
   - Inventory diversity

4. **Business Features**
   - Pricing tiers
   - Subscription model
   - Payment processing
   - Invoicing

### Phase 4: Advanced Features (3-6 months)
**Goal:** Differentiate from competitors

1. **AI Enhancements**
   - Voice input
   - Image recognition
   - Predictive recommendations
   - Personalization engine

2. **Marketplace Features**
   - Test drive scheduling
   - Financing integration
   - Trade-in valuation
   - Insurance quotes

3. **Mobile Apps**
   - iOS app (React Native)
   - Android app
   - Push notifications
   - Offline mode

4. **Enterprise Features**
   - Multi-location management
   - Franchise support
   - White-label options
   - API access for partners

---

## 🔒 SECURITY AUDIT CHECKLIST

### Authentication
- [x] Firebase Auth integration
- [x] Token validation middleware
- [x] Custom claims for roles
- [ ] Multi-factor authentication
- [ ] Session timeout handling
- [ ] Suspicious activity detection
- [ ] Password strength requirements

### Data Protection
- [x] Database credential encryption (AES-256)
- [x] HTTPS enforcement
- [ ] Data encryption at rest
- [ ] PII data anonymization
- [ ] GDPR compliance
- [ ] Data retention policies
- [ ] Secure file uploads

### API Security
- [x] CORS configuration
- [x] Rate limiting (dealer onboarding)
- [ ] Rate limiting (all endpoints)
- [ ] Request size limits
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] API key rotation
- [ ] Webhook verification

### Infrastructure
- [ ] DDoS protection (Cloudflare)
- [ ] Web Application Firewall
- [ ] Database backups (automated)
- [ ] Disaster recovery plan
- [ ] Penetration testing
- [ ] Security headers
- [ ] Dependency scanning
- [ ] Container security

---

## 📊 TECHNICAL DEBT

### Code Quality
1. **Debug Logging Cleanup**
   - Remove console.log statements from production code
   - Replace with structured logging
   - Locations: adminManagementPage, admin.routes.ts, index.ts, llm.service.ts

2. **Error Handling Standardization**
   - Create error classes
   - Consistent error format
   - Better user-facing messages
   - Stack trace sanitization

3. **TypeScript Strictness**
   - Enable strict mode
   - Fix `any` types
   - Add missing type definitions
   - Improve type safety

### Performance
1. **Firestore Optimization**
   - Add composite indexes
   - Implement pagination
   - Optimize query patterns
   - Reduce read operations

2. **Frontend Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Bundle size reduction
   - Memoization

3. **API Performance**
   - Response caching
   - Database connection pooling
   - Query optimization
   - Compression

### Documentation
1. **Missing Documentation**
   - API endpoint documentation (OpenAPI/Swagger)
   - Component documentation (Storybook)
   - Database schema documentation
   - Architecture decision records (ADRs)

2. **README Updates**
   - Car-genie README is still Vite template boilerplate
   - Add proper project documentation
   - Setup guides
   - Contributing guidelines

### Testing
1. **Test Coverage**
   - Backend unit tests (0% currently)
   - Frontend component tests (0% currently)
   - Integration tests (0% currently)
   - E2E tests (0% currently)
   - Target: >80% coverage

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Remove all console.log debug statements
- [ ] Environment variables documented
- [ ] Secrets in secure vault
- [ ] Database migrations tested
- [ ] Backup strategy in place
- [ ] Rollback plan documented
- [ ] Load testing completed
- [ ] Security scan passed

### Production Environment
- [ ] Frontend hosted (Vercel/Netlify)
- [ ] Backend hosted (Render/Railway/AWS)
- [ ] Database secured (Firebase)
- [ ] CDN configured
- [ ] SSL certificates
- [ ] DNS configured
- [ ] Monitoring setup
- [ ] Error tracking active
- [ ] Backup automation

### Post-Deployment
- [ ] Health check passing
- [ ] Smoke tests passed
- [ ] Performance monitoring
- [ ] Error rate monitoring
- [ ] User feedback collection
- [ ] Rollback procedure tested

---

## 💡 RECOMMENDED NEXT STEPS (Priority Order)

### Immediate (This Week)
1. **Clean up debug logs** - Production readiness
2. **Fix car-genie README** - Professional documentation
3. **Add error tracking** (Sentry) - Visibility into issues
4. **Implement logging** (Winston/Pino) - Better debugging

### Short-Term (Next 2 Weeks)
5. **Real inventory integration** - Core functionality
6. **Basic search implementation** - MVP requirement
7. **Testing infrastructure** - Quality assurance
8. **Performance monitoring** - Identify bottlenecks

### Medium-Term (Next Month)
9. **AI recommendation engine** - Core differentiation
10. **Dealer dashboard MVP** - Complete the loop
11. **Mobile responsiveness audit** - Better UX
12. **SEO optimization** - Discoverability

### Long-Term (Next Quarter)
13. **Scaling infrastructure** - Growth preparation
14. **Advanced AI features** - Competitive advantage
15. **Mobile app** - Platform expansion
16. **Enterprise features** - Monetization

---

## 📈 SUCCESS METRICS

### User Metrics
- Active users (DAU/MAU)
- Session duration
- Messages per session
- Chat completion rate
- Dealer contact rate
- User retention (D1, D7, D30)

### Business Metrics
- Dealer signups
- Applications approved
- Active dealer count
- Leads generated
- Conversion rate (chat → contact)
- Revenue per dealer

### Technical Metrics
- API response time (p50, p95, p99)
- Error rate
- Uptime (target: 99.9%)
- Database query performance
- Cache hit rate
- Page load time

---

## 🤝 CONCLUSION

Carrie has a solid foundation with core features implemented across all three applications. The immediate focus should be:

1. **Clean up for production** - Remove debug code, add monitoring
2. **Connect real inventory** - Make AI recommendations actually work
3. **Complete dealer flow** - Full dashboard and lead management
4. **Add testing** - Ensure reliability at scale

With these priorities addressed, Carrie will be ready for beta launch with pilot dealerships. The architecture is sound, the features are well-designed, and the codebase is maintainable. Focus on execution and iteration based on real user feedback.

**Estimated Timeline to Production-Ready MVP:** 6-8 weeks with dedicated development effort.
