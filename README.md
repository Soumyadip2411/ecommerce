
# 🛒 Full Stack E-commerce Platform named 'Ghar Bazaar'

A modern, full-stack e-commerce application inspired by BlinkIt, built with React, Node.js, and MongoDB. This project features a complete online shopping experience with user authentication, product management, cart functionality, and secure payment processing.

## ✨ Features

### 🛍️ User Features
- **User Authentication & Authorization**
  - User registration and login
  - Password reset with OTP verification
  - JWT-based authentication
  - Role-based access control (User/Admin)

- **Product Browsing & Search**
  - Category and subcategory navigation
  - Advanced product search functionality
  - Product filtering and sorting
  - Infinite scroll for product listings
  - Detailed product pages with images

- **Shopping Cart & Checkout**
  - Add/remove items from cart
  - Cart persistence across sessions
  - Real-time cart updates
  - Secure checkout process
  - Multiple address management

- **Order Management**
  - Order history and tracking
  - Order status updates
  - Payment confirmation

- **User Profile**
  - Profile management
  - Address book management
  - Order history

### 🔧 Admin Features
- **Product Management**
  - Add, edit, and delete products
  - Bulk product operations
  - Product image upload with Cloudinary
  - Category and subcategory management

- **Inventory Management**
  - Stock tracking
  - Product availability management

- **Order Management**
  - View and manage all orders
  - Order status updates
  - Customer order tracking
## Screen Shots 

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Stripe** - Payment processing
- **SweetAlert2** - Enhanced alerts

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Stripe** - Payment gateway
- **Nodemailer** - Email services
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlinkIt-Clone-Full-Stack-Ecommerce-main
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```env
   PORT=8080
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   FRONTEND_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
BlinkIt-Clone-Full-Stack-Ecommerce-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   ├── route/         # React Router configuration
│   │   ├── utils/         # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components
│   │   └── provider/      # Context providers
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── route/           # API routes
│   └── utils/           # Utility functions
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 8080)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `FRONTEND_URL` - Frontend URL for CORS
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `STRIPE_SECRET_KEY` - Stripe secret key
- `RESEND_API_KEY` - Resend email API key

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

## 🔧 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Inspired by BlinkIt's e-commerce platform
- Built with modern web technologies
- Special thanks to the open-source community

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Happy Shopping! 🛒✨**
