# Auction System - Setup & Run Guide

This guide will help you set up and run the complete Auction System with Spring Boot backend and React frontend.

## Prerequisites

- **Java**: JDK 17 or higher
- **Maven**: 3.6+ (or use included mvnw)
- **Node.js**: 16+ and npm
- **MySQL**: 8.0+ (or your preferred database)

---

## Backend Setup (Spring Boot)

### 1. Configure Database

Edit `Backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auction_system
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 2. Create Database

```sql
CREATE DATABASE auction_system;
```

Or import the provided SQL file:
```bash
mysql -u your_username -p auction_system < sqlfile.sql
```

### 3. Build and Run Backend

**Option A: Using Maven Wrapper (Recommended)**
```bash
cd Backend
./mvnw clean install
./mvnw spring-boot:run
```

**Option B: Using Maven**
```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

---

## Frontend Setup (React + Vite)

### 1. Install Dependencies

```bash
cd Frontend
npm install
```

### 2. Configure API URLs

The API URLs are already configured in `Frontend/src/constant.js`:
- Local development uses `http://localhost:8080`
- For production, uncomment the production URLs

### 3. Run Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## Testing the Application

### 1. Register a New User
- Navigate to `http://localhost:5173/register`
- Fill in name, email, and password
- Click "Register"

### 2. Login
- Navigate to `http://localhost:5173/login`
- Enter your email and password
- Click "Login"

### 3. Browse Auctions
- After login, you'll see the home page with available auctions
- Click "Register Now" to register for an auction

### 4. View Registered Auctions
- Click "My Auctions" in the navbar
- See your registered auctions categorized as:
  - **Live**: Currently active auctions
  - **Upcoming**: Future auctions
  - **Completed**: Past auctions

### 5. Join Live Auction
- Click "Join Live Auction" on a live auction
- Place bids using quick bid buttons or custom amounts
- View real-time bid history
- Timer counts down for each item

### 6. View Purchases
- After an auction completes, view your won items
- See total spent and item details

### 7. Update Profile
- Click your name in the navbar
- Change your password
- View account information

---

## API Endpoints

All API endpoints are documented in `API_ENDPOINTS.md`

Key endpoints:
- **User**: `/api/users/*`
- **Auction**: `/api/auctions/*`
- **Bid**: `/api/bids/*`
- **Admin**: `/api/admin/*`

---

## Project Structure

```
auction-system/
├── Backend/                    # Spring Boot backend
│   ├── src/main/java/com/AuctionSystem/
│   │   ├── Controllers/       # REST controllers
│   │   ├── Service/           # Business logic
│   │   ├── Model/             # JPA entities
│   │   ├── Repository/        # Data repositories
│   │   └── DTO/               # Data transfer objects
│   └── pom.xml
│
├── Frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── constant.js        # API URLs
│   │   └── App.jsx            # Main app component
│   └── package.json
│
└── API_ENDPOINTS.md           # API documentation
```

---

## Features Implemented

### User Features
- ✅ User registration and login
- ✅ View available auctions
- ✅ Register for auctions
- ✅ View registered auctions with status
- ✅ Browse auction items
- ✅ Participate in live auctions
- ✅ Real-time bidding with timer
- ✅ View bid history
- ✅ View purchased items
- ✅ Change password
- ✅ User profile

### Backend Features
- ✅ RESTful API endpoints
- ✅ JPA/Hibernate for database
- ✅ CORS enabled for frontend
- ✅ Auction status management (Live, Upcoming, Completed)
- ✅ Bid tracking and history
- ✅ Item status management (Available, Sold)
- ✅ User-auction registration

### Frontend Features
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design
- ✅ Real-time updates in live auctions
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Navigation with React Router

---

## Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Find and kill the process
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Database connection error:**
- Verify MySQL is running
- Check credentials in application.properties
- Ensure database exists

### Frontend Issues

**Port 5173 already in use:**
- Vite will automatically try the next available port
- Or specify a different port in `vite.config.js`

**API connection error:**
- Ensure backend is running on port 8080
- Check CORS configuration
- Verify API URLs in `constant.js`

---

## Production Deployment

### Backend
1. Build JAR file: `mvn clean package`
2. Deploy to your server (Railway, Heroku, AWS, etc.)
3. Update database connection for production

### Frontend
1. Update API URLs in `constant.js` (uncomment production URLs)
2. Build: `npm run build`
3. Deploy `dist` folder to hosting (Vercel, Netlify, etc.)

---

## Notes

- **Authentication**: Currently uses localStorage (consider JWT for production)
- **Password Security**: Plain text storage (implement hashing for production)
- **Real-time Updates**: Uses polling (consider WebSockets for production)
- **Error Handling**: Basic implementation (enhance for production)

---

## Support

For issues or questions, refer to:
- API documentation: `API_ENDPOINTS.md`
- Backend code: `Backend/src/main/java/com/AuctionSystem/`
- Frontend code: `Frontend/src/`
