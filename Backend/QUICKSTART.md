# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy template
cp .env.example .env

# Edit .env (use any text editor)
# Minimum required: Set MONGO_URI if not using local MongoDB
```

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod

# OR use MongoDB Atlas (cloud) - update MONGO_URI in .env
```

### 4. Run Application
```bash
python app.py
```

### 5. Access Admin Panel
```
URL: http://localhost:5000/admin
Username: admin
Password: changeme123
```

## First Steps After Login

1. **Add Members**
   - Go to Members → Add Member
   - Upload member photo to Vercel first
   - Paste URL: `https://accesspicturescloud.vercel.app/members/name.jpg`
   - Set priority (lower number = higher priority)

2. **Create Event**
   - Go to Events → Add Event
   - Upload cover image to Vercel
   - Add event details
   - Use Gallery button to add more photos

3. **Add CodeX Results**
   - Go to CodeX → Add CodeX Event
   - Select month (YYYY-MM format)
   - Add categories and winners
   - Paste winner photo URLs

## Frontend Integration

Your frontend should call these APIs:

```javascript
// Get members
fetch('http://localhost:5000/api/members')
  .then(res => res.json())
  .then(members => console.log(members));

// Get events
fetch('http://localhost:5000/api/events')
  .then(res => res.json())
  .then(events => console.log(events));

// Get latest CodeX
fetch('http://localhost:5000/api/codex/latest')
  .then(res => res.json())
  .then(codex => console.log(codex));
```

## Image Upload Workflow

1. **Organize images on Vercel**:
   ```
   /members/john-doe.jpg
   /events/tech-fest-2024/cover.jpg
   /events/tech-fest-2024/photo1.jpg
   /codex/2024-01/web-dev/winner1.jpg
   ```

2. **Get full URLs**:
   ```
   https://accesspicturescloud.vercel.app/members/john-doe.jpg
   ```

3. **Paste in admin panel** - backend validates automatically

## Common Issues

**MongoDB Connection Error**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas and update MONGO_URI

**Admin Login Fails**
- Check credentials in .env file
- Default: admin / changeme123

**Image URL Rejected**
- Must use HTTPS
- Must be from accesspicturescloud.vercel.app
- Must match path pattern (see README.md)

## Production Deployment

```bash
# Install gunicorn
pip install gunicorn

# Run with 4 workers
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app

# Run in background
nohup gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app &
```

## Need Help?

See full documentation in README.md
