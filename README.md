# MERN Authentication System

A full-stack MERN (MongoDB, Express.js, React, Node.js) authentication system with JWT authentication, profile management, and role-based access control.

## 🚀 Features

### Authentication & Security
- **User Registration & Login** - Secure user authentication with email/password
- **JWT Token Authentication** - Stateless authentication using JSON Web Tokens
- **Password Hashing** - Secure password storage using bcrypt
- **Protected Routes** - Route protection for authenticated users
- **Guest Routes** - Redirect authenticated users from login/register pages
- **Role-based Access Control** - Support for user and admin roles

### User Management
- **Profile Management** - Users can view and edit their profiles
- **Avatar Upload** - Profile picture support with multiple avatar options
- **Password Update** - Users can change their passwords securely
- **Form Validation** - Client and server-side validation using Zod
- **Error Handling** - Comprehensive error handling and user feedback

### User Experience
- **Responsive Design** - Mobile-first responsive design with Tailwind CSS
- **Toast Notifications** - Real-time feedback using React Toastify
- **Form Management** - Efficient form handling with React Hook Form
- **Modern UI Components** - Clean and intuitive user interface
- **Loading States** - Visual feedback during async operations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation
- **cookie-parser** - Cookie parsing middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Zod** - Schema validation

## 📁 Project Structure

```
mern-auth/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── connectDB.ts          # Database connection
│   │   ├── controllers/
│   │   │   └── authController.ts     # Authentication logic
│   │   ├── middlewares/
│   │   │   └── authMiddleware.ts     # JWT verification
│   │   ├── models/
│   │   │   └── User.ts               # User schema & methods
│   │   ├── routes/
│   │   │   └── authRoutes.ts         # API routes
│   │   ├── schemas/
│   │   │   └── authSchema.ts         # Validation schemas
│   │   ├── types/
│   │   │   └── express/
│   │   │       └── index.d.ts        # Type definitions
│   │   ├── utils/
│   │   │   ├── Env.ts                # Environment variables
│   │   │   ├── Status.ts             # HTTP status codes
│   │   │   ├── jwt.ts                # JWT utilities
│   │   │   └── zodErrors.ts          # Error formatting
│   │   └── index.ts                  # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts              # API configuration
│   │   ├── components/
│   │   │   ├── AuthButtons.tsx       # Login/Register buttons
│   │   │   ├── AvatarInput.tsx       # Avatar selection
│   │   │   ├── Footer.tsx            # Footer component
│   │   │   ├── GuestRoute.tsx        # Guest route protection
│   │   │   ├── InputField.tsx        # Form input component
│   │   │   ├── Navbar.tsx            # Navigation bar
│   │   │   ├── ProtectedRoute.tsx    # Auth route protection
│   │   │   └── RootLayout.tsx        # Layout wrapper
│   │   ├── context/
│   │   │   ├── AuthContext.tsx       # Auth context
│   │   │   └── AuthProvider.tsx      # Auth provider
│   │   ├── hooks/
│   │   │   └── useAuth.ts            # Auth hook
│   │   ├── pages/
│   │   │   ├── EditProfile.tsx       # Profile editing
│   │   │   ├── HomePage.tsx          # Landing page
│   │   │   ├── LoginPage.tsx         # Login page
│   │   │   ├── ProfilePage.tsx       # User profile
│   │   │   └── RegisterPage.tsx      # Registration page
│   │   ├── schemas/
│   │   │   └── authSchema.ts         # Frontend validation
│   │   ├── utils/
│   │   │   ├── auth.ts               # Auth utilities
│   │   │   └── handleFormErrors.ts   # Error handling
│   │   ├── App.tsx                   # Main app component
│   │   └── main.tsx                  # React entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-auth.git
   cd mern-auth
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

1. **Backend Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/mern-auth
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   
   # Server
   PORT=5000
   NODE_ENV=development
   ```

2. **Frontend Environment Variables**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Request/Response Examples

**Register User**
```json
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "avatar": "avatar-male.jpg"
}

// Response
{
  "success": true,
  "message": "Registered successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "avatar-male.jpg",
    "role": "user"
  }
}
```

**Login User**
```json
// POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "avatar-male.jpg"
  }
}
```

**Update Profile**
```json
// PUT /api/auth/profile
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "avatar": "avatar-male-2.jpg",
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}

// Response
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "avatar": "avatar-male-2.jpg",
    "role": "user"
  }
}
```

## 🎨 UI Features

### Pages
- **Home Page** - Landing page with authentication options
- **Login Page** - User login form with validation
- **Register Page** - User registration with avatar selection
- **Profile Page** - Display user information and settings
- **Edit Profile Page** - Update user details and password

### Components
- **Protected Routes** - Restrict access to authenticated users
- **Guest Routes** - Redirect authenticated users
- **Form Validation** - Real-time validation with error messages
- **Toast Notifications** - Success/error feedback
- **Responsive Navigation** - Mobile-friendly navigation bar
- **Avatar Selection** - Multiple avatar options for users

### Authentication Flow
1. **Registration** - Users can create accounts with email, password, name, and avatar
2. **Login** - Secure login with email and password
3. **Profile Management** - View and edit profile information
4. **Password Update** - Change password with current password verification
5. **Logout** - Secure logout that clears authentication tokens

## 🔧 Development

### Available Scripts

**Backend**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production

**Frontend**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript** - Full type safety across the stack
- **ESLint** - Code linting and formatting
- **Zod Validation** - Runtime type checking and validation
- **Error Handling** - Comprehensive error handling
- **Security** - JWT tokens, password hashing, CORS protection

### Security Features
- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure token-based authentication
- **HTTP-only Cookies** - Secure token storage
- **Input Validation** - Server and client-side validation
- **CORS Protection** - Cross-origin request security
- **Role-based Access** - User and admin role management

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the TypeScript code: `npm run build`
3. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Update `VITE_API_URL` to production backend URL
2. Build the application: `npm run build`
3. Deploy the `dist` folder to Netlify, Vercel, or similar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Hussain Ahmed**

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- All open-source contributors who made this project possible

---

**Note**: This is a complete authentication system that can be used as a starting point for larger applications. Feel free to extend and customize it according to your needs!

