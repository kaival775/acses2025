# ACSES Backend System - Architecture Summary

## 🎯 Problem Solved

**Challenge**: College club website needs frequent content updates (members, events, photos) but GitLab server has no SSH access and code pushes are difficult.

**Solution**: Admin-driven backend where ALL content is managed via web panel. Zero code changes for routine updates.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│              (React/Next.js/Vanilla JS)                      │
│                  Consumes REST APIs                          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/JSON
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    FLASK BACKEND                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  API Routes  │  │ Admin Routes │  │   Services   │      │
│  │  (Public)    │  │  (Protected) │  │  - Auth      │      │
│  │              │  │              │  │  - Validator │      │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘      │
│         │                  │                                 │
│         └──────────┬───────┘                                 │
│                    ▼                                         │
│         ┌──────────────────────┐                            │
│         │   MongoDB Models     │                            │
│         │  - Member            │                            │
│         │  - Event             │                            │
│         │  - CodeX             │                            │
│         └──────────┬───────────┘                            │
└────────────────────┼────────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │      MongoDB         │
          │  (Single Source of   │
          │       Truth)         │
          └──────────────────────┘

          ┌──────────────────────┐
          │   Vercel Hosting     │
          │  (Image Storage)     │
          │  - /members/         │
          │  - /events/          │
          │  - /codex/           │
          └──────────────────────┘
```

---

## 📊 Data Flow

### Content Update Flow (Admin)
```
1. Admin uploads images to Vercel
   ↓
2. Admin logs into /admin panel
   ↓
3. Admin adds/edits content + pastes image URLs
   ↓
4. Backend validates URLs
   ↓
5. Data saved to MongoDB
   ↓
6. Frontend automatically gets updated data via API
```

### Frontend Data Flow
```
1. User visits website
   ↓
2. Frontend calls API endpoints
   ↓
3. Backend queries MongoDB
   ↓
4. Returns JSON data
   ↓
5. Frontend renders content
```

---

## 🗄️ Database Design

### Collections

**members** (Team members)
- Indexed on: role_priority, is_active
- Sorted by: role_priority (ascending)

**events** (General events)
- Indexed on: date, event_type
- Sorted by: date (descending)
- Embedded: gallery array

**codex_events** (Monthly competitions)
- Indexed on: month (unique)
- Sorted by: month (descending)
- Nested: categories → winners

---

## 🔐 Security Model

### Authentication
- Session-based (Flask sessions)
- Secure cookies (HttpOnly, SameSite)
- 24-hour session lifetime

### Authorization
- Admin-only routes protected by decorator
- Public APIs have no authentication

### Input Validation
- URL validation against allowed domain
- HTTPS enforcement
- Path pattern matching
- Form input sanitization

### Best Practices
- Environment-based secrets
- No hardcoded credentials
- CSRF protection via sessions
- Production-ready configuration

---

## 🚀 Deployment Strategy

### Development
```bash
python app.py
# Runs on http://localhost:5000
```

### Production
```bash
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
# 4 worker processes
# Binds to all interfaces
```

### Background Process
```bash
nohup gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app > app.log 2>&1 &
# Runs in background
# Logs to app.log
```

---

## 📁 File Structure

```
backend/
├── app.py                    # Main Flask app
├── wsgi.py                   # Production entry point
├── config.py                 # Configuration
├── requirements.txt          # Dependencies
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
│
├── models/                   # Database models
│   ├── member.py            # Member CRUD
│   ├── event.py             # Event CRUD
│   └── codex.py             # CodeX CRUD
│
├── routes/                   # Route handlers
│   ├── api.py               # Public APIs
│   └── admin.py             # Admin panel
│
├── services/                 # Business logic
│   ├── auth_service.py      # Authentication
│   └── image_validator.py   # URL validation
│
├── templates/                # HTML templates
│   └── admin/               # Admin panel UI
│       ├── base.html
│       ├── login.html
│       ├── dashboard.html
│       ├── members.html
│       ├── member_form.html
│       ├── events.html
│       ├── event_form.html
│       ├── gallery.html
│       ├── codex.html
│       └── codex_form.html
│
├── static/                   # Static files (if needed)
│
├── README.md                 # Full documentation
├── QUICKSTART.md            # Quick setup guide
├── API_DOCS.md              # API documentation
├── test_setup.py            # Setup verification
└── deploy.sh                # Deployment script
```

---

## 🔄 Update Workflow

### Adding a New Member (No Code Changes)
1. Upload photo to Vercel: `/members/john-doe.jpg`
2. Login to admin panel
3. Navigate to Members → Add Member
4. Fill form with photo URL
5. Save
6. Frontend automatically shows new member

### Adding Event Photos (No Code Changes)
1. Upload photos to Vercel: `/events/tech-fest/photo1.jpg`
2. Login to admin panel
3. Navigate to Events → Select Event → Gallery
4. Add image URLs with captions
5. Save
6. Frontend automatically shows gallery

### Monthly CodeX Results (No Code Changes)
1. Upload winner photos to Vercel: `/codex/2024-01/web/winner.jpg`
2. Login to admin panel
3. Navigate to CodeX → Add CodeX Event
4. Select month, add categories and winners
5. Save
6. Frontend automatically shows results

---

## 🎨 Image Management

### Vercel Structure
```
accesspicturescloud.vercel.app/
├── members/
│   ├── john-doe.jpg
│   ├── jane-smith.jpg
│   └── ...
├── events/
│   ├── tech-fest-2024/
│   │   ├── cover.jpg
│   │   ├── photo1.jpg
│   │   └── photo2.jpg
│   └── workshop-2024/
│       └── ...
└── codex/
    ├── 2024-01/
    │   ├── web-dev/
    │   │   ├── winner1.jpg
    │   │   └── winner2.jpg
    │   └── mobile-dev/
    │       └── ...
    └── 2024-02/
        └── ...
```

### URL Validation Rules
- Must be HTTPS
- Must be from `accesspicturescloud.vercel.app`
- Must match category pattern:
  - Members: `/members/*.{jpg,png,webp}`
  - Events: `/events/*/*.{jpg,png,webp}`
  - CodeX: `/codex/*/*/*.{jpg,png,webp}`

---

## 📡 API Endpoints

### Public APIs (Frontend)
```
GET  /api/members              # Active members
GET  /api/events               # All events
GET  /api/events/<id>          # Single event
GET  /api/codex/latest         # Latest CodeX
GET  /api/codex/<month>        # CodeX by month
GET  /api/codex/all            # All CodeX events
```

### Admin Routes (Protected)
```
GET/POST  /admin/login
GET       /admin/logout
GET       /admin/

# Members
GET       /admin/members
GET/POST  /admin/members/add
GET/POST  /admin/members/edit/<id>
POST      /admin/members/delete/<id>

# Events
GET       /admin/events
GET/POST  /admin/events/add
GET/POST  /admin/events/edit/<id>
GET/POST  /admin/events/<id>/gallery
POST      /admin/events/delete/<id>

# CodeX
GET       /admin/codex
GET/POST  /admin/codex/add
GET/POST  /admin/codex/edit/<month>
POST      /admin/codex/delete/<month>
```

---

## 🛠️ Tech Stack

| Component | Technology | Reason |
|-----------|-----------|--------|
| Backend Framework | Flask 3.0 | Lightweight, flexible, Python |
| Database | MongoDB | Schema flexibility, easy scaling |
| Auth | Flask Sessions | Simple, secure, no JWT overhead |
| Templates | Jinja2 | Built-in, powerful, familiar |
| Image Storage | Vercel | External, fast CDN, no server storage |
| Production Server | Gunicorn | WSGI standard, production-ready |
| Deployment | GitLab | College requirement |

---

## ✅ Key Features

### Admin Panel
- ✅ Secure login/logout
- ✅ Dashboard with quick access
- ✅ Full CRUD for members
- ✅ Full CRUD for events
- ✅ Dynamic gallery management
- ✅ CodeX event management
- ✅ Real-time URL validation
- ✅ User-friendly forms

### Backend
- ✅ RESTful API design
- ✅ MongoDB with indexes
- ✅ Service layer architecture
- ✅ URL-only image handling
- ✅ Input validation
- ✅ Error handling
- ✅ Session management
- ✅ Production-ready config

### Deployment
- ✅ Environment-based config
- ✅ WSGI entry point
- ✅ Setup verification script
- ✅ Deployment automation
- ✅ Background process support
- ✅ Logging support

---

## 🎯 Success Metrics

### Problem Solved ✅
- No code changes for content updates
- No SSH required
- No frequent Git pushes
- Admin-driven content management
- Scalable architecture

### Production Ready ✅
- Clean separation of concerns
- Modular, maintainable code
- Comprehensive documentation
- Security best practices
- Error handling
- Testing utilities

### Developer Friendly ✅
- Clear API documentation
- Frontend integration examples
- Quick start guide
- Setup verification
- Deployment scripts

---

## 📚 Documentation Files

1. **README.md** - Complete system documentation
2. **QUICKSTART.md** - 5-minute setup guide
3. **API_DOCS.md** - Frontend API reference
4. **ARCHITECTURE.md** - This file (system overview)

---

## 🚦 Getting Started

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env

# 3. Test setup
python test_setup.py

# 4. Run application
python app.py

# 5. Access admin panel
# http://localhost:5000/admin
# Username: admin
# Password: changeme123
```

---

## 🎓 For College GitLab Deployment

1. **Initial Setup** (One-time)
   - Clone repo on server
   - Run `deploy.sh`
   - Configure `.env`
   - Start application

2. **Routine Updates** (Zero code changes)
   - Upload images to Vercel
   - Use admin panel
   - Content updates instantly

3. **Code Updates** (Rare)
   - Only for new features
   - Push to GitLab
   - Pull on server
   - Restart application

---

## 💡 Design Decisions

### Why Session-based Auth?
- Simpler than JWT for admin-only system
- Built-in Flask support
- Secure cookies
- No token management overhead

### Why URL-only Images?
- No server storage needed
- CDN performance (Vercel)
- Easy to manage
- Scalable

### Why MongoDB?
- Flexible schema (nested documents)
- Easy to modify structure
- Good for document-based data
- Simple deployment

### Why Service Layer?
- Separation of concerns
- Reusable business logic
- Easier testing
- Cleaner code

---

## 🔮 Future Enhancements (Optional)

- [ ] Bulk image upload via admin panel
- [ ] Image optimization/compression
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Multi-admin support with roles
- [ ] Content versioning
- [ ] Audit logs
- [ ] API rate limiting
- [ ] Caching layer (Redis)
- [ ] Search functionality

---

**Built with production mindset, not tutorial approach.**
