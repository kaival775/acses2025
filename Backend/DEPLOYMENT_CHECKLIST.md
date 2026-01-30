# Production Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Python 3.8+ installed on server
- [ ] MongoDB installed or Atlas account created
- [ ] Vercel account for image hosting
- [ ] GitLab repository access

### Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Generate strong `SECRET_KEY`
  ```bash
  python -c "import secrets; print(secrets.token_hex(32))"
  ```
- [ ] Set production `MONGO_URI`
- [ ] Change `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- [ ] Set `FLASK_ENV=production`

### Dependencies
- [ ] Install all requirements
  ```bash
  pip install -r requirements.txt
  ```
- [ ] Install gunicorn for production
  ```bash
  pip install gunicorn
  ```

### Testing
- [ ] Run setup verification
  ```bash
  python test_setup.py
  ```
- [ ] Test MongoDB connection
- [ ] Test admin login locally
- [ ] Test API endpoints locally

---

## Deployment

### Server Setup
- [ ] Clone repository to server
  ```bash
  git clone <your-gitlab-repo>
  cd backend
  ```
- [ ] Create virtual environment
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```
- [ ] Install dependencies
  ```bash
  pip install -r requirements.txt
  pip install gunicorn
  ```
- [ ] Configure `.env` file
- [ ] Test setup
  ```bash
  python test_setup.py
  ```

### Running Application
- [ ] Test with Flask dev server first
  ```bash
  python app.py
  ```
- [ ] Stop dev server (Ctrl+C)
- [ ] Start with Gunicorn
  ```bash
  gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
  ```
- [ ] Test admin panel access
- [ ] Test API endpoints

### Background Process
- [ ] Run in background with nohup
  ```bash
  nohup gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app > app.log 2>&1 &
  ```
- [ ] Note the process ID
  ```bash
  echo $! > app.pid
  ```
- [ ] Verify process is running
  ```bash
  ps aux | grep gunicorn
  ```

---

## Security Hardening

### Application Security
- [ ] Strong `SECRET_KEY` (32+ characters)
- [ ] Unique admin credentials
- [ ] `FLASK_ENV=production` (disables debug mode)
- [ ] Session cookie security enabled (already in config)

### Server Security
- [ ] Firewall configured (allow port 5000 or proxy port)
- [ ] MongoDB authentication enabled
- [ ] MongoDB firewall rules (only allow app server)
- [ ] HTTPS enabled (use nginx reverse proxy)
- [ ] Regular security updates

### MongoDB Security
- [ ] Enable authentication
  ```javascript
  use admin
  db.createUser({
    user: "acses_admin",
    pwd: "strong_password",
    roles: ["readWrite", "dbAdmin"]
  })
  ```
- [ ] Update `MONGO_URI` with credentials
  ```
  mongodb://acses_admin:password@localhost:27017/acses_db
  ```
- [ ] Bind to localhost only (if on same server)
- [ ] Regular backups

---

## Nginx Reverse Proxy (Recommended)

### Install Nginx
```bash
sudo apt install nginx  # Ubuntu/Debian
```

### Configure Nginx
Create `/etc/nginx/sites-available/acses`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/acses /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Enable HTTPS (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Systemd Service (Optional but Recommended)

Create `/etc/systemd/system/acses.service`:
```ini
[Unit]
Description=ACSES Backend Service
After=network.target

[Service]
User=your-username
WorkingDirectory=/path/to/backend
Environment="PATH=/path/to/backend/venv/bin"
ExecStart=/path/to/backend/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 wsgi:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable acses
sudo systemctl start acses
sudo systemctl status acses
```

---

## Post-Deployment

### Verification
- [ ] Admin panel accessible
- [ ] Can login with credentials
- [ ] Can add/edit/delete members
- [ ] Can add/edit/delete events
- [ ] Can manage event galleries
- [ ] Can add/edit/delete CodeX events
- [ ] API endpoints return data
- [ ] Image URLs validate correctly

### Frontend Integration
- [ ] Update frontend API base URL
- [ ] Test all API endpoints from frontend
- [ ] Verify CORS if needed
- [ ] Test image loading
- [ ] Test on different devices

### Monitoring
- [ ] Check application logs
  ```bash
  tail -f app.log
  ```
- [ ] Monitor server resources
  ```bash
  htop
  ```
- [ ] Check MongoDB status
  ```bash
  mongo --eval "db.serverStatus()"
  ```

---

## Backup Strategy

### MongoDB Backup
```bash
# Create backup
mongodump --db acses_db --out /path/to/backup

# Restore backup
mongorestore --db acses_db /path/to/backup/acses_db
```

### Automated Backups (Cron)
Add to crontab:
```bash
# Daily backup at 2 AM
0 2 * * * mongodump --db acses_db --out /backups/$(date +\%Y\%m\%d)
```

### Code Backup
- [ ] Repository on GitLab (already done)
- [ ] `.env` file backed up securely (NOT in Git)

---

## Maintenance

### Regular Tasks
- [ ] Monitor application logs weekly
- [ ] Check MongoDB disk usage monthly
- [ ] Update dependencies quarterly
  ```bash
  pip list --outdated
  pip install --upgrade <package>
  ```
- [ ] Review admin access logs
- [ ] Clean old backups

### Restart Application
```bash
# If using nohup
kill $(cat app.pid)
nohup gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app > app.log 2>&1 &
echo $! > app.pid

# If using systemd
sudo systemctl restart acses
```

### Update Code
```bash
cd /path/to/backend
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
# Restart application (see above)
```

---

## Troubleshooting

### Application Won't Start
- [ ] Check `.env` file exists and is configured
- [ ] Verify MongoDB is running
- [ ] Check port 5000 is not in use
- [ ] Review error logs

### Can't Login to Admin
- [ ] Verify credentials in `.env`
- [ ] Check session configuration
- [ ] Clear browser cookies
- [ ] Check application logs

### API Returns Empty Data
- [ ] Verify MongoDB connection
- [ ] Check collections exist
- [ ] Add test data via admin panel
- [ ] Check MongoDB indexes

### Images Not Loading
- [ ] Verify Vercel hosting is working
- [ ] Check image URLs are correct
- [ ] Test URL validation
- [ ] Check CORS if frontend on different domain

---

## Emergency Procedures

### Application Crash
1. Check logs: `tail -100 app.log`
2. Check MongoDB: `mongo --eval "db.serverStatus()"`
3. Restart application
4. If persists, restore from backup

### Database Corruption
1. Stop application
2. Restore from latest backup
3. Verify data integrity
4. Restart application

### Security Breach
1. Immediately change all credentials
2. Review access logs
3. Check for unauthorized changes
4. Restore from clean backup if needed
5. Update security measures

---

## Contact Information

**Admin Contact**: [Your Email]
**Server Admin**: [Server Admin Email]
**Emergency**: [Emergency Contact]

---

## Deployment Date

- **Deployed By**: _______________
- **Date**: _______________
- **Server**: _______________
- **MongoDB**: _______________
- **Domain**: _______________

---

## Sign-off

- [ ] All checklist items completed
- [ ] Application tested and verified
- [ ] Documentation reviewed
- [ ] Team trained on admin panel
- [ ] Backup strategy in place
- [ ] Monitoring configured

**Deployed By**: _______________
**Date**: _______________
**Signature**: _______________
