# Shu3la

# Shu3la Gas Distribution & Services Platform


#

[Trello](https://trello.com/b/zWMNSbst/sha3la)

#

Documentation= file:///C:/Users/Orange/Desktop/Shu3la.pdf

A comprehensive web application for managing all aspects of residential and commercial gas services—from user registration and order placement to agency management, dispatch, and payment processing. Built with a modern **MERN** stack (MongoDB, Express, React, Node.js), it offers three primary user roles:

- **User**: Browse services, place orders (gas cylinders, centralized-heating installation, gas-tank refills), track & cancel pending orders, manage personal profile.
- **Agency**: Register your gas-distribution agency, upload license for approval, receive and fulfill nearby orders.
- **Super-Admin**: Approve/reject agency registrations, oversee all service requests, manage users & roles, view real-time statistics.

---

## 🌟 Key Features

### 1. User Authentication & Profiles

- **Sign up / Log in** with JWT-based sessions using cookies.
- **Profile page**:
  - View & edit personal info (name, phone, avatar) except email.
  - Change password.
  - Upload avatar via Multer.
  - See all past & active orders, with status badges.
  - Cancel gas-cylinder orders that are still "قيد الانتظار."

### 2. Service Catalog & Ordering

- **طلب أسطوانات الغاز**:
  - Select quantity (1–10).
  - Pay on delivery or online.
  - Automatically detect user geolocation using latitude/longitude for dispatch.

- **أنظمة التدفئة المركزية**:
  - Submit inquiry, inspection, or maintenance requests.

- **تعبئة خزانات الغاز**:
  - Schedule on-site tanker refill.
  - Minimum order amount is 200 liters.
  - Select a preferred date and time slot.

### 3. Agency Registration & Management

- **Register as Agency**:
  - Submit name, address, phone, email, location and scanned license.
  - File uploads are handled using Multer.

- **Admin Approval**:
  - Super-Admin reviews submitted agency registrations.
  - Agencies can be accepted or rejected.
  - Approved agencies become available for order dispatch.

### 4. Automated Dispatch & Geofencing

When a gas-cylinder order is created, the backend dispatch system determines the nearest approved agency.

The process works approximately as follows:

1. The user's latitude and longitude are stored with the order.
2. The backend searches for approved agencies.
3. The distance between the user and agencies is calculated.
4. The **Haversine formula** is used to calculate the geographic distance.
5. The nearest suitable agency is selected.
6. The order is assigned for fulfillment.

This allows agencies to receive geographically relevant orders.

### 5. Super-Admin Dashboard

- **Agency Requests**:
  - View pending agency registrations.
  - Approve or reject agencies.

- **Orders Management**:
  - View gas-cylinder orders.
  - View gas-filling orders.
  - View heating service requests.
  - Filter and manage requests.
  - Update order/service statuses.

- **User Management**:
  - List users.
  - Soft-delete accounts.
  - Change user roles:
    - `user`
    - `agency`
    - `admin`

- **Statistics**:
  - Orders by service.
  - Order status breakdown.
  - Monthly trends.
  - Charts powered by Recharts.

### 6. Secure Online Payments (QLIC Integration)

- **Pay Online** for cylinder orders.
- Payment callbacks/webhooks are handled by the backend.
- The backend verifies payment transactions and updates the related order/payment information.
- Order details can contain payment information such as:
  - Transaction ID.
  - Amount.
  - Payment date.
  - Payment status.

> **Important:** Payment credentials and secrets must be stored in environment variables and must never be committed to GitHub.

### 7. Notifications & UX Enhancements

- **SweetAlert2** for user-friendly confirmation dialogs and alerts.
- **React-Toastify** for in-app notifications.
- **Axios** for communication between the frontend and backend.
- Responsive UI.
- Arabic **RTL-friendly** interface.
- Tailwind CSS for styling.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Recharts
- SweetAlert2
- React-Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Multer

### Development Tools

- Git
- npm
- Nodemon
- Vite

### External Services

- MongoDB / MongoDB Atlas
- QLIC payment integration
- Stripe session/payment tracking where configured

---

## 📁 Project Structure

```text
Shu3la/
│
├── backend/
│   ├── controllers/
│   │   ├── agencyController.js
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   ├── GasFillingOrderController.js
│   │   ├── HeatingServiceRequestController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── StatsController.js
│   │   └── userController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Agency.js
│   │   ├── ContactMessage.js
│   │   ├── GasFillingOrder.js
│   │   ├── HeatingServiceRequest.js
│   │   ├── Order.js
│   │   ├── payment.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── agencyRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── gasFillingOrderRoutes.js
│   │   ├── heatingServiceRequestRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── protectedRoutes.js
│   │   ├── statsRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── dashboard/
│   │   │   ├── footer/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── navbar/
│   │   │   ├── profile/
│   │   │   ├── register/
│   │   │   ├── RegisterAgency/
│   │   │   ├── services/
│   │   │   └── SuperAdminDashboard/
│   │   │
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
├── package.json
├── package-lock.json
└── README.md