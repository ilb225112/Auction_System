# Deployment Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment Checklist

### Backend Security
- [ ] Implement password hashing (bcrypt)
- [ ] Add JWT authentication
- [ ] Configure CORS for specific domains only
- [ ] Add rate limiting middleware
- [ ] Implement input validation
- [ ] Add SQL injection protection (verify JPA queries)
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure secure session management
- [ ] Add API request logging
- [ ] Set up error monitoring (Sentry, etc.)

### Backend Configuration
- [ ] Update application.properties for production
- [ ] Configure production database connection
- [ ] Set up database connection pooling
- [ ] Add database backup strategy
- [ ] Configure logging levels
- [ ] Set up environment variables
- [ ] Remove debug/development endpoints
- [ ] Configure proper error messages (no stack traces)
- [ ] Set up health check endpoint
- [ ] Configure actuator endpoints (if using)

### Frontend Security
- [ ] Update API URLs in constant.js to production
- [ ] Remove console.log statements
- [ ] Implement proper error boundaries
- [ ] Add CSP (Content Security Policy) headers
- [ ] Configure secure cookie settings
- [ ] Add XSS protection
- [ ] Implement CSRF protection
- [ ] Add input sanitization
- [ ] Configure proper CORS headers
- [ ] Remove development tools from build

### Frontend Optimization
- [ ] Run production build: `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Optimize images and assets
- [ ] Enable code splitting
- [ ] Configure caching headers
- [ ] Add service worker (PWA)
- [ ] Minimize bundle size
- [ ] Add lazy loading for routes
- [ ] Configure CDN for static assets
- [ ] Add analytics tracking

### Database
- [ ] Create production database
- [ ] Run migrations/schema updates
- [ ] Set up database backups
- [ ] Configure database indexes
- [ ] Set up database monitoring
- [ ] Configure connection limits
- [ ] Add database replication (if needed)
- [ ] Test database performance
- [ ] Set up database access controls
- [ ] Document database schema

### Testing
- [ ] Run all unit tests
- [ ] Run integration tests
- [ ] Perform load testing
- [ ] Test all user flows
- [ ] Test error scenarios
- [ ] Verify API endpoints
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Verify responsive design
- [ ] Test with production data

### Infrastructure
- [ ] Set up production server
- [ ] Configure firewall rules
- [ ] Set up load balancer (if needed)
- [ ] Configure auto-scaling (if needed)
- [ ] Set up monitoring (CPU, memory, disk)
- [ ] Configure alerts
- [ ] Set up log aggregation
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Document deployment process

### Documentation
- [ ] Update README with production URLs
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document API endpoints
- [ ] Create user guide
- [ ] Document environment variables
- [ ] Create disaster recovery plan
- [ ] Document monitoring setup
- [ ] Create maintenance schedule
- [ ] Document rollback procedure

---

## 🚀 Deployment Steps

### Backend Deployment

#### 1. Build Application
```bash
cd Backend
mvn clean package -DskipTests
```

#### 2. Test JAR Locally
```bash
java -jar target/auction-system-0.0.1-SNAPSHOT.jar
```

#### 3. Deploy to Server
```bash
# Copy JAR to server
scp target/auction-system-0.0.1-SNAPSHOT.jar user@server:/path/to/app/

# SSH to server
ssh user@server

# Run application
java -jar /path/to/app/auction-system-0.0.1-SNAPSHOT.jar
```

#### 4. Set Up as Service (Linux)
Create `/etc/systemd/system/auction-system.service`:
```ini
[Unit]
Description=Auction System Backend
After=syslog.target

[Service]
User=appuser
ExecStart=/usr/bin/java -jar /path/to/app/auction-system.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable auction-system
sudo systemctl start auction-system
sudo systemctl status auction-system
```

### Frontend Deployment

#### 1. Update Configuration
Edit `Frontend/src/constant.js`:
```javascript
// Uncomment production URLs
export const BACKEND_PATH = "https://your-api-domain.com/"
export const USER_PATH = "https://your-api-domain.com/api/users"
export const AUCTION_PATH = "https://your-api-domain.com/api/auctions"
export const BID_PATH = "https://your-api-domain.com/api/bids"
export const ADMIN_PATH = "https://your-api-domain.com/api/admin"
```

#### 2. Build Application
```bash
cd Frontend
npm install
npm run build
```

#### 3. Test Build Locally
```bash
npm run preview
```

#### 4. Deploy to Hosting

**Option A: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option B: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Option C: Traditional Server**
```bash
# Copy dist folder to server
scp -r dist/* user@server:/var/www/html/

# Configure nginx
sudo nano /etc/nginx/sites-available/auction-system
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🔍 Post-Deployment Verification

### Backend Checks
- [ ] Backend is accessible at production URL
- [ ] Health check endpoint responds
- [ ] Database connection works
- [ ] All API endpoints respond correctly
- [ ] CORS is configured properly
- [ ] Logs are being written
- [ ] Monitoring is active
- [ ] SSL certificate is valid
- [ ] Performance is acceptable
- [ ] Error handling works

### Frontend Checks
- [ ] Frontend loads at production URL
- [ ] All pages are accessible
- [ ] API calls work correctly
- [ ] Authentication works
- [ ] Navigation works
- [ ] Images and assets load
- [ ] Responsive design works
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] SSL certificate is valid

### User Flow Testing
- [ ] User registration works
- [ ] User login works
- [ ] Browse auctions works
- [ ] Register for auction works
- [ ] Live bidding works
- [ ] View purchases works
- [ ] Profile update works
- [ ] Password change works
- [ ] Logout works
- [ ] Error handling works

---

## 📊 Monitoring Setup

### Application Monitoring
- Set up APM (Application Performance Monitoring)
- Configure error tracking (Sentry, Rollbar)
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure log aggregation (ELK, Splunk)
- Set up metrics collection (Prometheus, Grafana)

### Alerts to Configure
- Server down
- High CPU usage (>80%)
- High memory usage (>80%)
- High error rate (>5%)
- Slow response times (>2s)
- Database connection failures
- Disk space low (<20%)
- SSL certificate expiring (<30 days)

---

## 🔄 Rollback Plan

### If Deployment Fails

#### Backend Rollback
```bash
# Stop current version
sudo systemctl stop auction-system

# Restore previous version
cp /path/to/backup/auction-system-previous.jar /path/to/app/auction-system.jar

# Start service
sudo systemctl start auction-system
```

#### Frontend Rollback
```bash
# Restore previous build
cp -r /path/to/backup/dist-previous/* /var/www/html/

# Or use hosting platform rollback
vercel rollback
# or
netlify rollback
```

#### Database Rollback
```bash
# Restore from backup
mysql -u root -p auction_system < backup-YYYY-MM-DD.sql
```

---

## 📝 Post-Deployment Tasks

- [ ] Announce deployment to team
- [ ] Update documentation
- [ ] Monitor for 24 hours
- [ ] Review logs for errors
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Create deployment report
- [ ] Schedule post-mortem (if issues)
- [ ] Update runbook with learnings
- [ ] Plan next deployment

---

## 🆘 Emergency Contacts

- **DevOps Lead**: [contact]
- **Backend Lead**: [contact]
- **Frontend Lead**: [contact]
- **Database Admin**: [contact]
- **Hosting Support**: [contact]

---

## 📚 Additional Resources

- [AWS Deployment Guide](https://aws.amazon.com/getting-started/)
- [Heroku Spring Boot](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [Docker Deployment](https://docs.docker.com/get-started/)

---

## ✅ Deployment Complete!

Once all items are checked:
1. Mark deployment as complete
2. Update status page
3. Notify stakeholders
4. Monitor for 24-48 hours
5. Celebrate! 🎉
