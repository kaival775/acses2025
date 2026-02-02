# ACSES Website - Complete Documentation

## 🦇 Project Overview

**ACSES (Association of Computer Science and Engineering Students)** is a full-stack web application featuring a Batman/Dark Knight themed design. The website serves as a digital hub for the computer science student organization, showcasing team members, events, and competitive programming achievements (CodeX).

### Live Deployment
- **Frontend**: https://acses2k25.vercel.app/
- **Backend**: https://acses2025-backend.vercel.app/

---

## 📋 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Frontend Structure](#frontend-structure)
7. [Backend Structure](#backend-structure)
8. [Admin Panel](#admin-panel)
9. [Image Management](#image-management)
10. [Deployment Guide](#deployment-guide)
11. [Environment Variables](#environment-variables)
12. [Local Development](#local-development)
13. [Troubleshooting](#troubleshooting)

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Fonts**: Custom Batman-themed fonts (Batman Forever, Vengeance, Mythology)
- **Deployment**: Vercel

### Backend
- **Framework**: Flask 3.0 (Python)
- **Database**: MongoDB (Atlas)
- **Authentication**: Session-based (Flask sessions)
- **CORS**: Flask-CORS
- **Image Validation**: Regex-based URL validation
- **Deployment**: Vercel (Serverless)

### Image Hosting
- **Platform**: Vercel (Static hosting)
- **Domains**: 
  - `acsespicscloud.vercel.app` (Members, CodeX, Events)

---

## 🏗 Architecture

### System Design

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Frontend │◄───────►│  Flask Backend   │◄───────►│  MongoDB Atlas  │
│   (Vercel)      │  REST   │    (Vercel)      │         │   (Cloud DB)    │
│                 │   API   │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
         │                           │
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌──────────────────┐
│  Vercel Static  │         │  Admin Panel     │
│  Image Hosting  │         │  (Session Auth)  │
└─────────────────┘         └──────────────────┘
```

### Data Flow

1. **User visits website** → Frontend loads from Vercel CDN
2. **Frontend requests data** → API calls to Flask backend
3. **Backend queries MongoDB** → Fetches data from collections
4. **Backend validates images** → Checks URL patterns
5. **Response sent to frontend** → JSON data rendered in React
6. **Images loaded** → From Vercel static hosting

---

## ✨ Features

### Public Features

#### 1. **Home Page**
- Animated Batman-themed landing with GSAP
- Four value cards (Innovation, Collaboration, Excellence, Legacy)
- Team carousel (3 rotating images, 3-second intervals)
- Scroll-triggered animations
- "Meet the Team" CTA button

#### 2. **Team Page**
- **Faculty Coordinators**: 2-column grid
- **Super Core Team**: 4-column grid, role-based sorting
  - Sorting order: Chairperson → Vice Chairperson → Secretary → Joint Secretary → Finance Head → Tech Head
- **Core Team**: Grouped by 6 departments
  - Tech, Creatives, Events, Operations, Public Relations, Marketing
- Centered card alignment
- Hover effects with border glow
- Profile images with fallback avatars

#### 3. **Events Page**
- Grid display with cover images
- Two event types:
  - **General Events**: Cover image, description, optional winners, event photos
  - **CodeX Events**: 3 categories × 3 winners each (9 total)
- Click to view details
- Winner cards with position badges (1st/2nd/3rd)
- Event photo gallery
- Smooth transitions

#### 4. **Coder of the Month (Home)**
- Displays latest CodeX event
- Scroll-triggered category animations
- Position-based color coding:
  - 🥇 1st: Gold (#FFD700)
  - 🥈 2nd: Silver (#C0C0C0)
  - 🥉 3rd: Bronze (#CD7F32)
- Hover effects on winner cards

#### 5. **Contact Page**
- Contact information display
- Social media links (Instagram, LinkedIn)

### Admin Features

#### 1. **Authentication**
- Session-based login
- Protected routes
- 24-hour session lifetime
- Logout functionality

#### 2. **Member Management**
- Add/Edit/Delete members
- Three member types:
  - **Faculty**: No department
  - **Super Core**: No department, role-based
  - **Core**: Department-based (6 departments)
- Fields: Name, Role, Image URL, LinkedIn, GitHub, Email
- Dynamic form (department field shows/hides based on type)
- Image URL validation

#### 3. **Event Management**
- Add/Edit/Delete events
- Two event types:
  - **General**: Cover image, winners (flexible), event photos
  - **CodeX**: 3 categories, 3 winners per category, event photos
- Dynamic form fields based on event type
- Image URL validation for all images
- Gallery management

#### 4. **Dashboard**
- Quick navigation to all admin sections
- Member count overview
- Event count overview

---

## 🗄 Database Schema

### Collections

#### 1. **members**
```javascript
{
  _id: ObjectId,
  name: String,              // "John Doe"
  imageUrl: String,          // "https://acsespicscloud.vercel.app/members/JohnDoe.png"
  role: String,              // "Chairperson", "Tech Lead", etc.
  memberType: String,        // "faculty" | "super-core" | "core"
  department: String?,       // "Tech", "Creatives", etc. (only for core)
  linkedin: String?,         // LinkedIn profile URL
  github: String?,           // GitHub profile URL
  email: String?,            // Email address
  createdAt: DateTime,
  updatedAt: DateTime
}
```

**Indexes**:
- `memberType` (ascending)
- `department` (ascending)

#### 2. **events**
```javascript
{
  _id: ObjectId,
  title: String,                    // "Tech Fest 2024"
  description: String,              // Event description
  date: DateTime,                   // Event date
  event_type: String,               // "general" | "codex"
  cover_image: String,              // Cover image URL
  gallery: [{                       // Image gallery (optional)
    image_url: String,
    caption: String
  }],
  event_photos: [String],           // Array of photo URLs
  winners: [{                       // For general events (optional)
    name: String,
    photo_url: String,
    position: String                // "1st", "2nd", "Winner", etc.
  }],
  codex_categories: [{              // For CodeX events only
    category_name: String,          // "Category 1"
    winners: [{
      name: String,
      photo_url: String,
      rank: Number                  // 1, 2, 3
    }]
  }],
  created_at: DateTime
}
```

**Indexes**:
- `date` (descending)
- `event_type` (ascending)

---

## 🔌 API Documentation

### Base URL
- **Local**: `http://localhost:5000/api`
- **Production**: `https://acses2025-backend.vercel.app/api`

### Endpoints

#### Members

**GET /api/members**
- Query params: `memberType`, `department`
- Returns: Array of members
- Example: `/api/members?memberType=super-core`

**GET /api/members/by-department**
- Returns: Members grouped by department (core only)
- Response:
```json
[
  {
    "department": "Tech",
    "members": [...]
  }
]
```

#### Events

**GET /api/events**
- Returns: All general events (sorted by date, descending)

**GET /api/events/:id**
- Returns: Single event with full details

#### CodeX

**GET /api/codex/latest**
- Returns: Most recent CodeX event

**GET /api/codex/all**
- Returns: All CodeX events (sorted by date, descending)

**GET /api/codex/:month**
- Param: `month` (YYYY-MM format)
- Returns: CodeX event for specific month

---

## 🎨 Frontend Structure

### Directory Layout
```
Frontend/
├── public/
│   ├── acses.png           # Logo
│   ├── team.jpg            # Team carousel image 1
│   ├── team2.jpg           # Team carousel image 2
│   └── team3.jpg           # Team carousel image 3
├── src/
│   ├── components/
│   │   ├── AnimatedContent.tsx    # GSAP scroll animations
│   │   ├── CoderOfTheMonth.tsx    # CodeX display component
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Loader.tsx             # Loading animation
│   │   ├── Navbar.tsx             # Navigation bar
│   │   └── ScrollFloat.tsx        # Floating text animation
│   ├── pages/
│   │   ├── Home.tsx               # Landing page
│   │   ├── Team.tsx               # Team members page
│   │   ├── Events.tsx             # Events listing & details
│   │   └── Contacts.tsx           # Contact information
│   ├── services/
│   │   └── api.ts                 # API service layer
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite configuration
```

### Key Components

#### AnimatedContent
- Wraps content for scroll-triggered animations
- Props: `distance`, `direction`, `duration`, `ease`, `scale`, `threshold`
- Uses GSAP ScrollTrigger

#### CoderOfTheMonth
- Fetches latest CodeX event
- Displays categories with winners
- Scroll-triggered category reveals
- Position-based color coding

#### Team Page Logic
- Fetches three member types separately
- Sorts super-core by role priority
- Sorts core departments by predefined order
- Centers cards in grid layout

---

## ⚙️ Backend Structure

### Directory Layout
```
backend/
├── models/
│   ├── member.py              # Member model & operations
│   └── event.py               # Event model & operations
├── routes/
│   ├── api.py                 # Public API endpoints
│   └── admin.py               # Admin panel routes
├── services/
│   ├── auth_service.py        # Authentication logic
│   └── image_validator.py    # Image URL validation
├── templates/
│   └── admin/
│       ├── base.html          # Admin base template
│       ├── login.html         # Login page
│       ├── dashboard.html     # Admin dashboard
│       ├── members.html       # Member list
│       ├── member_form.html   # Add/Edit member
│       ├── events.html        # Event list
│       ├── event_form.html    # Add/Edit event
│       └── gallery.html       # Event gallery management
├── app.py                     # Flask application
├── config.py                  # Configuration
├── seed_data.py               # Database seeding script
├── seed_codex.py              # CodeX seeding script
├── requirements.txt           # Python dependencies
└── vercel.json                # Vercel deployment config
```

### Key Files

#### app.py
- Creates Flask app instance
- Configures CORS
- Connects to MongoDB
- Registers blueprints
- Exports app for Vercel

#### config.py
- Environment variables
- Session configuration
- Image URL validation patterns
- Admin credentials

#### models/member.py
- CRUD operations for members
- `get_by_department()` aggregation
- Indexes for performance

#### models/event.py
- CRUD operations for events
- Gallery management
- Supports both general and CodeX events

#### routes/api.py
- Public REST API endpoints
- Super-core role-based sorting
- Department grouping for core members
- CodeX event filtering

#### routes/admin.py
- Session-protected routes
- Member management (Add/Edit/Delete)
- Event management (Add/Edit/Delete)
- Dynamic form handling
- Image URL validation

---

## 🔐 Admin Panel

### Access
- URL: `https://acses2025-backend.vercel.app/admin/login`
- Default credentials (change in production):
  - Username: `admin`
  - Password: `changeme123`

### Features

#### Member Management
1. **Add Member**:
   - Select member type (Faculty/Super Core/Core)
   - Department field appears only for Core members
   - Image URL validation
   - Optional social links

2. **Edit Member**:
   - Pre-filled form
   - Can change member type
   - Image URL re-validation on change

3. **Delete Member**:
   - Confirmation required
   - Permanent deletion

#### Event Management
1. **Add Event**:
   - Select event type (General/CodeX)
   - **General Events**:
     - Cover image (required)
     - Winners section (optional, dynamic add)
     - Event photos (optional, dynamic add)
   - **CodeX Events**:
     - 3 categories (fixed)
     - 3 winners per category (fixed)
     - Event photos (optional, dynamic add)

2. **Edit Event**:
   - Pre-filled form
   - Can change event type
   - Existing winners/photos loaded

3. **Delete Event**:
   - Confirmation required
   - Permanent deletion

---

## 🖼 Image Management

### Image Hosting Strategy
- **Platform**: Vercel static hosting
- **Domain**: `acsespicscloud.vercel.app`
- **Storage**: Backend stores only URLs (never files)
- **Validation**: Regex-based URL pattern matching

### URL Patterns

#### Members
```
https://acsespicscloud.vercel.app/members/FirstnameLastname.png
```
Example: `https://acsespicscloud.vercel.app/members/JohnDoe.png`

#### CodeX Winners
```
https://acsespicscloud.vercel.app/codex/{month}/{filename}.jpg
```
Example: `https://acsespicscloud.vercel.app/codex/nov/c1aNov.jpg`

#### Event Images
```
https://acsespicscloud.vercel.app/events/{event-name}/{filename}.jpg
```
Example: `https://acsespicscloud.vercel.app/events/tech-fest/cover.jpg`

### Folder Structure on Vercel
```
acsespicscloud.vercel.app/
├── members/
│   ├── JohnDoe.png
│   └── JaneSmith.png
├── codex/
│   ├── nov/
│   │   ├── cover.jpg
│   │   ├── c1aNov.jpg
│   │   ├── c2aNov.jpg
│   │   └── c3aNov.jpg
│   └── oct/
│       └── ...
└── events/
    ├── tech-fest/
    │   ├── cover.jpg
    │   └── photo1.jpg
    └── workshop/
        └── ...
```

### Image Upload Process
1. Upload images to Vercel static hosting project
2. Get the public URL
3. Enter URL in admin panel
4. Backend validates URL pattern
5. URL stored in MongoDB
6. Frontend fetches and displays

---

## 🚀 Deployment Guide

### Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas account

### Backend Deployment (Vercel)

1. **Prepare Backend**:
   ```bash
   cd backend
   ```

2. **Create `vercel.json`**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "app.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "app.py"
       }
     ]
   }
   ```

3. **Create `requirements.txt`**:
   ```
   Flask==3.0.0
   flask-cors==4.0.0
   pymongo==4.6.1
   python-dotenv==1.0.0
   ```

4. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Backend deployment config"
   git push
   ```

5. **Deploy on Vercel**:
   - Import GitHub repository
   - Root directory: `backend`
   - Framework: Other
   - Add environment variables:
     - `MONGO_URI`: MongoDB connection string
     - `SECRET_KEY`: Random secret key
     - `ADMIN_USERNAME`: Admin username
     - `ADMIN_PASSWORD`: Admin password
   - Deploy

6. **Get Backend URL**: `https://your-backend.vercel.app`

### Frontend Deployment (Vercel)

1. **Update `.env`**:
   ```env
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

2. **Add to `.gitignore`**:
   ```
   .env
   .env.local
   .env.production
   ```

3. **Remove `.env` from Git** (if already tracked):
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from tracking"
   git push
   ```

4. **Deploy on Vercel**:
   - Import GitHub repository
   - Root directory: `Frontend`
   - Framework: Vite
   - Add environment variable:
     - `VITE_API_URL`: `https://your-backend.vercel.app/api`
   - Deploy

5. **Get Frontend URL**: `https://your-frontend.vercel.app`

6. **Update Backend CORS**:
   - Edit `backend/app.py`
   - Add frontend URL to CORS origins:
   ```python
   "origins": [
       "http://localhost:5173",
       "https://your-frontend.vercel.app"
   ]
   ```
   - Commit and push to redeploy backend

---

## 🔧 Environment Variables

### Backend (.env or Vercel Dashboard)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/acses_db
SECRET_KEY=your-super-secret-key-change-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password-here
```

### Frontend (.env or Vercel Dashboard)
```env
VITE_API_URL=https://acses2025-backend.vercel.app/api
```

---

## 💻 Local Development

### Backend Setup

1. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Create Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env`**:
   ```env
   MONGO_URI=mongodb://localhost:27017/acses_db
   SECRET_KEY=dev-secret-key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

5. **Run MongoDB** (if local):
   ```bash
   mongod
   ```

6. **Seed Database** (optional):
   ```bash
   python seed_data.py
   python seed_codex.py
   ```

7. **Run Backend**:
   ```bash
   python app.py
   ```
   Backend runs on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend**:
   ```bash
   cd Frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env`**:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run Frontend**:
   ```bash
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **CORS Error**
**Problem**: Frontend can't access backend API

**Solution**:
- Check backend CORS configuration includes frontend URL
- Verify environment variable `VITE_API_URL` is set correctly
- Redeploy backend after CORS changes

#### 2. **Failed to Fetch**
**Problem**: API calls return "Failed to fetch"

**Solution**:
- Verify backend is running and accessible
- Check backend URL in browser: `https://backend-url.vercel.app/`
- Ensure MongoDB connection is working
- Check Vercel logs for backend errors

#### 3. **Internal Server Error (500)**
**Problem**: Backend crashes on Vercel

**Solution**:
- Check `vercel.json` exists and is correct
- Verify `requirements.txt` has all dependencies
- Check environment variables are set in Vercel dashboard
- Review Vercel function logs

#### 4. **Images Not Loading**
**Problem**: Member/event images show broken

**Solution**:
- Verify image URLs follow correct pattern
- Check images exist on Vercel static hosting
- Test image URL directly in browser
- Ensure URL validation patterns in `config.py` are correct

#### 5. **Admin Login Not Working**
**Problem**: Can't log into admin panel

**Solution**:
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables
- Verify session configuration in `config.py`
- Clear browser cookies
- Check backend logs for authentication errors

#### 6. **Members Not Sorting Correctly**
**Problem**: Super-core members not in correct order

**Solution**:
- Verify role names match exactly in database
- Check `role_order` dictionary in `backend/routes/api.py`
- Ensure roles are spelled correctly (case-sensitive)

#### 7. **CodeX Events Not Showing**
**Problem**: CodeX section empty or errors

**Solution**:
- Run `python seed_codex.py` to populate data
- Check `event_type` field is set to `"codex"`
- Verify `codex_categories` field exists and has correct structure
- Check API endpoint: `/api/codex/latest`

---

## 📊 Database Seeding

### Seed Members
```bash
cd backend
python seed_data.py
```
Creates:
- 2 Faculty Coordinators
- 7 Super Core members
- 17 Core members (across 6 departments)

### Seed CodeX Events
```bash
cd backend
python seed_codex.py
```
Creates:
- CodeX November (9 winners)
- CodeX October (9 winners)

---

## 🎯 Key Design Decisions

### 1. **Unified Event Model**
- Single `events` collection for both general and CodeX events
- `event_type` field distinguishes between types
- Conditional fields based on type
- Prevents data duplication and simplifies API

### 2. **Image URL Storage**
- Store only URLs, never files
- Regex validation for security
- Separate hosting for scalability
- Easy to update images without code changes

### 3. **Role-Based Sorting**
- Super-core members sorted by predefined role order
- Ensures consistent hierarchy display
- Easy to modify order in code

### 4. **Department Grouping**
- Core members grouped by department
- Aggregation pipeline for efficient querying
- Predefined department order for consistency

### 5. **Session-Based Auth**
- Simple authentication for admin panel
- No JWT complexity needed
- Suitable for single-admin use case
- 24-hour session lifetime

### 6. **Serverless Deployment**
- Vercel for both frontend and backend
- Auto-scaling and CDN benefits
- Zero server maintenance
- Cost-effective for student projects

---

## 📝 Future Enhancements

### Potential Features
1. **Blog Section**: Articles and tutorials
2. **Project Showcase**: Student projects gallery
3. **Resource Library**: Study materials and links
4. **Event Registration**: Online event sign-ups
5. **Member Profiles**: Detailed individual pages
6. **Search Functionality**: Search members and events
7. **Dark/Light Mode Toggle**: Theme switching
8. **Newsletter Subscription**: Email updates
9. **Analytics Dashboard**: Admin insights
10. **Multi-Admin Support**: Role-based access control

### Technical Improvements
1. **Image Upload**: Direct upload to Vercel from admin panel
2. **Caching**: Redis for API response caching
3. **CDN**: CloudFlare for additional performance
4. **Testing**: Unit and integration tests
5. **CI/CD**: Automated testing and deployment
6. **Monitoring**: Error tracking (Sentry)
7. **SEO**: Meta tags and sitemap
8. **PWA**: Progressive Web App features
9. **Accessibility**: WCAG compliance
10. **Performance**: Lazy loading and code splitting

---

## 👥 Team Structure

### Member Hierarchy
```
Faculty Coordinators (2)
    ↓
Super Core Team (7)
├── Chairperson
├── Vice Chairperson
├── Secretary
├── Joint Secretary
├── Finance Head
└── Tech Head
    ↓
Core Team (17)
├── Tech (3)
├── Creatives (3)
├── Events (3)
├── Operations (3)
├── Public Relations (3)
└── Marketing (2)
```

---

## 📞 Support & Contact

For issues or questions:
- **GitHub Issues**: Create an issue in the repository
- **Email**: Contact ACSES team
- **Instagram**: [@acses.spit](https://www.instagram.com/acses.spit/)
- **LinkedIn**: [ITSA SPIT](https://www.linkedin.com/company/itsa-s-p-i-t/)

---

## 📄 License

This project is developed for ACSES (Association of Computer Science and Engineering Students).

---

## 🙏 Acknowledgments

- **Design Inspiration**: Batman/Dark Knight theme
- **Fonts**: Batman Forever, Vengeance, Mythology
- **Animation Library**: GSAP (GreenSock)
- **Hosting**: Vercel
- **Database**: MongoDB Atlas
- **Icons**: Heroicons, Custom SVGs

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintained By**: ACSES Tech Team
