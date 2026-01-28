# Auction System - Full Stack Application

A complete auction management system built with Spring Boot backend and React frontend, featuring real-time bidding, user management, and auction lifecycle management.

## 🚀 Quick Start

Get started in 5 minutes! See [QUICK_START.md](QUICK_START.md)

```bash
# 1. Setup database
mysql -u root -p -e "CREATE DATABASE auction_system"

# 2. Start backend (Terminal 1)
cd Backend
./mvnw spring-boot:run

# 3. Start frontend (Terminal 2)
cd Frontend
npm install && npm run dev

# 4. Open browser
# http://localhost:5173
```

---

## 📋 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[API_ENDPOINTS.md](API_ENDPOINTS.md)** - Complete API documentation
- **[INTEGRATION_CHECKLIST.md](INTEGRATION_CHECKLIST.md)** - Testing checklist
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details

---

## ✨ Features

### User Features
- 🔐 User registration and authentication
- 🏠 Browse available auctions
- 📝 Register for auctions
- 👀 View registered auctions (Live, Upcoming, Completed)
- 🔨 Real-time bidding in live auctions
- 📊 View bid history
- 🏆 View purchased items
- 👤 Profile management and password change

### Technical Features
- ⚡ Real-time bid updates
- 🎯 Automatic item progression
- ⏱️ Countdown timer for each item
- 🔔 Toast notifications
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 RESTful API architecture

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Database**: MySQL 8.0+ with JPA/Hibernate
- **Build Tool**: Maven
- **Java Version**: 17+

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v4
- **Notifications**: React Toastify

---

## 📁 Project Structure

```
auction-system/
├── Backend/                    # Spring Boot backend
│   ├── src/main/java/com/AuctionSystem/
│   │   ├── Controllers/       # REST API controllers
│   │   ├── Service/           # Business logic
│   │   ├── Model/             # JPA entities
│   │   ├── Repository/        # Data access layer
│   │   └── DTO/               # Data transfer objects
│   └── pom.xml
│
├── Frontend/                   # React frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── constant.js        # API configuration
│   │   └── App.jsx            # Main app
│   └── package.json
│
├── Admin/                      # Admin panel (separate)
├── sqlfile.sql                # Database schema
└── Documentation files
```

---

## 🔌 API Endpoints

### User APIs
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/unregistered/{userId}` - Get available auctions
- `POST /api/users/registerAuction` - Register for auction
- `GET /api/users/registered/{userId}` - Get registered auctions
- `GET /api/users/purchases/{userId}/{auctionId}` - Get purchases
- `POST /api/users/changePassword/{userId}` - Change password

### Auction APIs
- `GET /api/auctions/upcoming` - Get upcoming auctions
- `GET /api/auctions/live` - Get live auctions
- `GET /api/auctions/completed` - Get completed auctions
- `POST /api/auctions/createAuction` - Create auction
- `POST /api/auctions/addItem/{auctionId}` - Add item
- `GET /api/auctions/auctionItems/{auctionId}` - Get items

### Bid APIs
- `GET /api/bids/latestBid/{auctionId}/{itemId}` - Get latest bid
- `GET /api/bids/bidHistory/{auctionId}/{itemId}` - Get bid history
- `POST /api/bids/placeBid` - Place a bid
- `POST /api/bids/sellItem/{itemId}` - Mark item as sold

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for complete documentation.

---

## 🎯 User Flows

### 1. Registration & Login
Register → Login → Redirect to Home

### 2. Browse & Register for Auctions
Home → View Auctions → Register → My Auctions

### 3. Live Bidding
My Auctions → Join Live → Place Bids → Win Items

### 4. View Purchases
My Auctions → Completed → View Purchases

### 5. Profile Management
Navbar → Profile → Change Password

---

## 🧪 Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. Browse and register for auctions
4. Join live auction and place bids
5. View purchased items
6. Update profile

### API Testing
```bash
# Test registration
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Test login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

See [INTEGRATION_CHECKLIST.md](INTEGRATION_CHECKLIST.md) for complete testing guide.

---

## 🚀 Deployment

### Backend
```bash
cd Backend
mvn clean package
java -jar target/auction-system.jar
```

### Frontend
```bash
cd Frontend
npm run build
# Deploy dist/ folder to hosting
```

Update `Frontend/src/constant.js` with production URLs before building.

---

## 🔒 Security Notes

**Current Implementation** (Development):
- Plain text passwords
- localStorage authentication
- CORS allows all origins

**Production Recommendations**:
- ✅ Implement bcrypt password hashing
- ✅ Use JWT tokens for authentication
- ✅ Restrict CORS to specific domains
- ✅ Add rate limiting
- ✅ Implement input validation
- ✅ Add HTTPS/SSL

---

## 📊 Database Schema

Key tables:
- `users` - User accounts
- `auctions` - Auction events
- `items` - Auction items
- `bids` - Bid records
- `bidder_auction` - User-auction registrations

Import schema: `mysql -u root -p auction_system < sqlfile.sql`

---

## 🆘 Troubleshooting

### Backend Issues
- **Port 8080 in use**: Kill process or change port
- **Database error**: Check MySQL running and credentials
- **Build fails**: Verify Java 17+ installed

### Frontend Issues
- **Port 5173 in use**: Vite will use next available port
- **API errors**: Verify backend is running
- **Build fails**: Run `npm install` first

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.

---

## 🎉 Success Criteria

✅ Users can register and login  
✅ Users can browse auctions  
✅ Users can register for auctions  
✅ Real-time bidding works  
✅ Bid history displays correctly  
✅ Purchases are tracked  
✅ Profile management works  
✅ Navigation is smooth  
✅ Error handling is graceful  
✅ UI is responsive  

---

## 🔄 Recent Updates

- ✅ Added bid history endpoint
- ✅ Fixed login error handling
- ✅ Integrated navigation component
- ✅ Added comprehensive documentation
- ✅ Verified all API endpoints
- ✅ Tested all user flows

---

**Built with ❤️ using Spring Boot and React**
