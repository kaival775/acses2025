# ACSES Backend System

Production-ready Flask backend with MongoDB for club/organization website management.

## Architecture Overview

**Design Philosophy**: Zero-code content updates via admin panel

### Key Features
- ✅ Session-based admin authentication
- ✅ URL-only image storage (no file uploads)
- ✅ Dynamic content management (members, events, CodeX)
- ✅ RESTful API for frontend consumption
- ✅ MongoDB with indexed queries
- ✅ Modular service-based architecture

## Database Schema

### Members Collection
```javascript
{
  "_id": ObjectId,
  "name": "John Doe",
  "position": "President",
  "role_priority": 1,           // Lower = higher priority
  "photo_url": "https://...",
  "is_active": true,
  "updated_at": ISODate
}
```

### Events Collection
```javascript
{
  "_id": ObjectId,
  "title": "Tech Workshop",
  "description": "...",
  "date": ISODate,
  "event_type": "general",      // "general" | "codex"
  "cover_image": "https://...",
  "gallery": [
    {
      "image_url": "https://...",
      "caption": "Optional caption"
    }
  ],
  "created_at": ISODate
}
```

### CodeX Events Collection
```javascript
{
  "_id": ObjectId,
  "month": "2024-01",           // YYYY-MM format
  "categories": [
    {
      "category_name": "Web Development",
      "winners": [
        {
          "name": "Winner Name",
          "rank": 1,
          "photo_url": "https://..."
        }
      ]
    }
  ],
  "created_at": ISODate
}
```

## Image URL Structure

All images must be hosted on Vercel and follow these patterns:

```
Members:  https://accesspicturescloud.vercel.app/members/name.jpg
Events:   https://accesspicturescloud.vercel.app/events/event-name/image.jpg
CodeX:    https://accesspicturescloud.vercel.app/codex/YYYY-MM/category/winner.jpg
```

**Backend validates URLs** - only HTTPS URLs from the configured domain are accepted.

## API Endpoints

### Public APIs (Frontend Consumption)

```
GET  /api/members              → Active members sorted by priority
GET  /api/events               → All general events (sorted by date)
GET  /api/events/<id>          → Single event with gallery
GET  /api/codex/latest         → Most recent CodeX event
GET  /api/codex/<month>        → CodeX event for specific month (YYYY-MM)
GET  /api/codex/all            → All CodeX events
```

### Admin Panel Routes

```
GET  /admin/login              → Admin login page
POST /admin/login              → Authenticate admin
GET  /admin/logout             → Logout admin
GET  /admin/                   → Dashboard

# Members
GET  /admin/members            → List all members
GET  /admin/members/add        → Add member form
POST /admin/members/add        → Create member
GET  /admin/members/edit/<id>  → Edit member form
POST /admin/members/edit/<id>  → Update member
POST /admin/members/delete/<id>→ Delete member

# Events
GET  /admin/events             → List all events
GET  /admin/events/add         → Add event form
POST /admin/events/add         → Create event
GET  /admin/events/edit/<id>   → Edit event form
POST /admin/events/edit/<id>   → Update event
GET  /admin/events/<id>/gallery→ Manage event gallery
POST /admin/events/<id>/gallery→ Add/remove gallery images
POST /admin/events/delete/<id> → Delete event

# CodeX
GET  /admin/codex              → List all CodeX events
GET  /admin/codex/add          → Add CodeX form
POST /admin/codex/add          → Create CodeX event
GET  /admin/codex/edit/<month> → Edit CodeX form
POST /admin/codex/edit/<month> → Update CodeX event
POST /admin/codex/delete/<month>→ Delete CodeX event
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

**Critical Settings:**
- `SECRET_KEY`: Generate strong random key for production
- `MONGO_URI`: Your MongoDB connection string
- `ADMIN_USERNAME` & `ADMIN_PASSWORD`: Admin credentials

### 3. Start MongoDB
```bash
# Local MongoDB
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env
```

### 4. Run Application
```bash
python app.py
```

Access:
- Admin Panel: `http://localhost:5000/admin`
- API: `http://localhost:5000/api/members`

## Deployment (College GitLab Server)

### Strategy: Minimal Code Changes

Since you can't SSH or push frequently, the system is designed for:
- **All content updates via admin panel** (no code changes needed)
- **MongoDB as single source of truth**
- **External image hosting** (Vercel)

### Deployment Steps

1. **Initial Setup on Server**
```bash
# Clone repository
git clone <your-gitlab-repo>
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
nano .env  # Edit with production values
```

2. **MongoDB Setup**
- Use MongoDB Atlas (free tier) for cloud database
- Or install MongoDB on server if allowed
- Update `MONGO_URI` in `.env`

3. **Run with Production Server**
```bash
# Install gunicorn
pip install gunicorn

# Run application
gunicorn -w 4 -b 0.0.0.0:5000 app:create_app()
```

4. **Keep Running (Background Process)**
```bash
# Using nohup
nohup gunicorn -w 4 -b 0.0.0.0:5000 app:create_app() &

# Or use systemd service (if available)
# Or use screen/tmux
```

### Production Checklist

- [ ] Change `SECRET_KEY` to strong random value
- [ ] Update admin credentials
- [ ] Use production MongoDB (Atlas recommended)
- [ ] Set `FLASK_ENV=production`
- [ ] Configure firewall (allow port 5000 or use reverse proxy)
- [ ] Enable HTTPS (use nginx reverse proxy)
- [ ] Set up CORS if frontend is on different domain

## Security Considerations

### Implemented
✅ Session-based authentication with secure cookies
✅ Password-protected admin panel
✅ HTTPS-only image URLs
✅ URL validation against allowed domain
✅ CSRF protection via Flask sessions
✅ Input validation on all forms

### Recommendations
1. **Use strong SECRET_KEY**: Generate with `python -c "import secrets; print(secrets.token_hex(32))"`
2. **Change default admin credentials** immediately
3. **Use HTTPS in production** (nginx reverse proxy)
4. **Restrict MongoDB access** (firewall rules, authentication)
5. **Regular backups** of MongoDB database
6. **Rate limiting** on API endpoints (use Flask-Limiter if needed)

## Image Management Workflow

### For Admin:

1. **Upload images to Vercel**
   - Create folder structure: `/members/`, `/events/event-name/`, `/codex/YYYY-MM/category/`
   - Upload images to Vercel static hosting
   - Get full HTTPS URLs

2. **Add content via admin panel**
   - Login to `/admin`
   - Navigate to Members/Events/CodeX
   - Paste image URLs (backend validates format)
   - Save

3. **Frontend automatically updates**
   - Frontend fetches from API endpoints
   - No code changes needed
   - No Git pushes required

## Maintenance

### Routine Operations (No Code Changes)
- Add/edit/delete members → Admin panel
- Create new events → Admin panel
- Upload event photos → Vercel + Admin panel
- Add monthly CodeX results → Admin panel

### When Code Changes ARE Needed
- API endpoint modifications
- New features/models
- Security updates
- Bug fixes

## Troubleshooting

### MongoDB Connection Issues
```python
# Test connection
from pymongo import MongoClient
client = MongoClient('your-mongo-uri')
print(client.server_info())  # Should print server details
```

### Admin Login Not Working
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
- Verify session configuration in `config.py`
- Clear browser cookies

### Image URLs Not Validating
- Ensure URL starts with `https://`
- Check domain matches `accesspicturescloud.vercel.app`
- Verify path structure matches patterns in `config.py`

### API Returns Empty Data
- Check MongoDB has data: `db.members.find()`
- Verify indexes are created (automatic on first run)
- Check collection names match model definitions

## Project Structure
```
backend/
├── app.py                 # Main Flask application
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── models/
│   ├── member.py         # Member model & DB operations
│   ├── event.py          # Event model & DB operations
│   └── codex.py          # CodeX model & DB operations
├── routes/
│   ├── api.py            # Public API endpoints
│   └── admin.py          # Admin panel routes
├── services/
│   ├── auth_service.py   # Authentication logic
│   └── image_validator.py# URL validation
└── templates/
    └── admin/            # Admin panel HTML templates
        ├── base.html
        ├── login.html
        ├── dashboard.html
        ├── members.html
        ├── member_form.html
        ├── events.html
        ├── event_form.html
        ├── gallery.html
        ├── codex.html
        └── codex_form.html
```

## Tech Stack
- **Backend**: Flask 3.0
- **Database**: MongoDB (PyMongo)
- **Auth**: Session-based (Flask sessions)
- **Templates**: Jinja2
- **Image Storage**: Vercel static hosting
- **Deployment**: Gunicorn + College GitLab server

## Support & Contact
For issues or questions, contact the development team.
