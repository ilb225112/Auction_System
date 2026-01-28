# Quick Start Guide - Auction System

Get the Auction System up and running in 5 minutes!

## Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+

---

## Step 1: Database Setup (2 minutes)

```sql
CREATE DATABASE auction_system;
```

Or import the SQL file:
```bash
mysql -u root -p auction_system < sqlfile.sql
```

---

## Step 2: Configure Backend (1 minute)

Edit `Backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auction_system
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## Step 3: Start Backend (1 minute)

```bash
cd Backend
./mvnw spring-boot:run
```

Wait for: `Started AuctionSystemApplication in X seconds`

Backend running at: **http://localhost:8080**

---

## Step 4: Start Frontend (1 minute)

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend running at: **http://localhost:5173**

---

## Step 5: Test the Application

1. **Open browser**: http://localhost:5173
2. **Register**: Click "Sign up" → Fill form → Register
3. **Login**: Enter credentials → Login
4. **Browse**: View available auctions
5. **Register for auction**: Click "Register Now"
6. **View auctions**: Click "My Auctions"
7. **Join live auction**: Click "Join Live Auction" (if any live)
8. **Place bids**: Use quick bid buttons or custom amount

---

## Quick Test Commands

### Test Backend API
```bash
# Register user
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## Troubleshooting

### Backend won't start
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check port 8080 is free

### Frontend won't start
- Run `npm install` first
- Check Node.js version: `node --version` (should be 16+)
- Clear cache: `npm cache clean --force`

### Can't connect to backend
- Verify backend is running on port 8080
- Check `Frontend/src/constant.js` has correct URL
- Check browser console for CORS errors

---

## Default Credentials

If you imported the SQL file, you may have default users:
- Check the database for existing users
- Or register a new user through the UI

---

## Next Steps

- Read **SETUP_GUIDE.md** for detailed setup
- Check **API_ENDPOINTS.md** for API documentation
- Use **INTEGRATION_CHECKLIST.md** for testing
- Review **IMPLEMENTATION_SUMMARY.md** for technical details

---

## Key URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
- **API Base**: http://localhost:8080/api

---

## Common Routes

- `/` - Home (Available Auctions)
- `/login` - Login Page
- `/register` - Register Page
- `/bidderAuctions` - My Auctions
- `/profile/:userId` - User Profile

---

## Need Help?

1. Check browser console (F12)
2. Check backend logs in terminal
3. Verify database connection
4. Read SETUP_GUIDE.md
5. Check INTEGRATION_CHECKLIST.md

---

## Success!

If you can:
- ✅ Register a user
- ✅ Login successfully
- ✅ View auctions
- ✅ Navigate between pages

**You're all set!** 🎉

The system is working correctly. Explore the features and refer to the documentation for more details.
