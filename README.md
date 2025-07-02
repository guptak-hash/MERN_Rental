# Car Rental Application

A full-stack car rental application built with React.js (Frontend) and Node.js/Express (Backend). The application allows users to browse and rent cars, while car owners can manage their fleet and bookings.

## 🚗 Features

### For Users
- **User Authentication**: Register and login functionality
- **Browse Cars**: View available cars for rent
- **Car Details**: Detailed view of individual cars
- **Book Cars**: Reserve cars for specific dates
- **My Bookings**: View and manage personal bookings
- **Date Selection**: Pick-up and return date selection

### For Car Owners
- **Owner Dashboard**: Overview of earnings, cars, and bookings
- **Add Cars**: Add new cars to the fleet with image upload
- **Manage Cars**: Edit, toggle availability, and delete cars
- **Manage Bookings**: View and update booking statuses
- **Profile Management**: Update profile image
- **Role Management**: Convert regular users to car owners

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **ImageKit** - Image storage and optimization
- **CORS** - Cross-origin resource sharing


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- ImageKit account (for image storage)

### Environment Variables

Create a `.env` file in the server directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend server will start on `http://localhost:4000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 📡 API Endpoints

### User Routes (`/api`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /data` - Get user data (protected)
- `GET /cars` - Get all available cars

### Owner Routes (`/api`)
- `POST /change-role` - Change user role to owner
- `POST /add-car` - Add new car (with image upload)
- `GET /owner/cars` - Get owner's cars
- `POST /toggle-car` - Toggle car availability
- `POST /delete-car` - Delete a car
- `GET /dashboard` - Get dashboard data
- `POST /update-image` - Update user profile image

### Booking Routes (`/api`)
- `POST /check-availability` - Check car availability
- `POST /create` - Create new booking
- `GET /user` - Get user bookings
- `GET /owner` - Get owner bookings
- `POST /change-status` - Change booking status

## 🔧 Build and Deployment

### Frontend Build
```bash
cd client
npm run build
```

### Backend Deployment
The backend is configured to run on Vercel with the base URL: `https://mern-rental-backend.vercel.app`

## 🎨 UI Features

- **Responsive Design**: Mobile-friendly interface
- **Modern Styling**: Clean and intuitive user interface with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **Protected Routes**: Authentication-based route protection
- **Role-based Access**: Different interfaces for users and owners

## 📱 Pages

### Public Pages
- **Home** (`/`) - Landing page with featured cars
- **Cars** (`/cars`) - Browse all available cars
- **Car Details** (`/car-details/:id`) - Detailed car information
- **My Bookings** (`/my-bookings`) - User's booking history

### Owner Pages
- **Dashboard** (`/owner`) - Owner analytics and overview
- **Add Car** (`/owner/add-car`) - Add new cars to fleet
- **Manage Cars** (`/owner/manage-cars`) - Edit and manage existing cars
- **Manage Bookings** (`/owner/manage-bookings`) - Handle booking requests

## 🔐 Authentication

The application uses JWT-based authentication with the following features:
- Token-based session management
- Protected routes for authenticated users
- Role-based access control (User vs Owner)
- Automatic token refresh and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Kishan Gupta

---

**Note**: Make sure to configure your MongoDB database and ImageKit credentials before running the application in production.