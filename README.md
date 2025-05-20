# Sha3la

# Sha3la Gas Distribution & Services Platform

[Figma](https://www.figma.com/design/bI8y3O2nNcBxWX8kZolYFU/Sha3la?t=1MWBvyr9ZbV9LVTc-0)
" "
[Trello](https://trello.com/b/zWMNSbst/sha3la)
" "
[Documentation]("C:\Users\Orange\Desktop\Shu3la.pdf")


A comprehensive web application for managing all aspects of residential and commercial gas services—from user registration and order placement to agency management, dispatch, and payment processing. Built with a modern **MERN** stack (MongoDB, Express, React, Node.js), it offers three primary user roles:

- **User**: Browse services, place orders (gas cylinders, centralized‑heating installation, gas‑tank refills), track & cancel pending orders, manage personal profile.
- **Agency**: Register your gas‑distribution agency, upload license for approval, receive and fulfill nearby orders.
- **Super‑Admin**: Approve/reject agency registrations, oversee all service requests, manage users & roles, view real‑time statistics.

---

## 🌟 Key Features

### 1. User Authentication & Profiles  
- **Sign up / Log in** with JWT-based sessions (cookies).  
- **Profile page**:  
  - View & edit personal info (name, phone, avatar) except email.  
  - Change password.  
  - Upload avatar via Multer.  
  - See all past & active orders, with status badges.  
  - Cancel gas‑cylinder orders that are still “قيد الانتظار.”

### 2. Service Catalog & Ordering  
- **طلب أسطوانات الغاز**:  
  - Select quantity (1–10), pay‑on‑delivery or online.  
  - Auto‑detect geolocation (latitude/longitude) for dispatch.  
- **أنظمة التدفئة المركزية**:  
  - Submit inquiry, inspection, or maintenance requests.  
- **تعبئة خزانات الغاز**:  
  - Schedule on‑site tanker refill (min. 200 liters) with date/time slot.

### 3. Agency Registration & Management  
- **Register as Agency**:  
  - Submit name, address, phone, email, location and scanned license.  
  - File upload handled via Multer.  
- **Admin Approval**:  
  - Super‑Admin reviews submissions, accepts or rejects.  
  - Approved agencies appear in dispatch pool.

### 4. Automated Dispatch & Geofencing  
- When a cylinder order comes in, the backend’s **dispatch service** locates the nearest approved agency (using Haversine formula on stored lat/long) and assigns the order.  
- Agencies receive only geographically relevant orders.

### 5. Super‑Admin Dashboard  
- **Agency Requests**: Approve/Reject new registrations.  
- **Orders Management**:  
  - View & filter all gas, heating, and refill requests.  
  - Update statuses (Approved / In‑Progress / Completed).  
- **User Management**:  
  - List all users, soft‑delete accounts, change roles (`user` / `agency` / `admin`).  
- **Statistics**:  
  - Charts summarizing orders by service, status breakdown, monthly trends (powered by Recharts).

### 6. Secure Online Payments (QLIC Integration)  
- **Pay Online** for cylinder orders.  
- **Webhook Listener**:  
  - QLIC posts transaction callbacks → backend verifies signature, updates `Order.payment` and order status.  
- **User Receipt**:  
  - Order details page shows payment proof (transaction ID, amount, date).

### 7. Notifications & UX Enhancements  
- **SweetAlert2** for user-friendly modals (location success/fail, order confirmation).  
- **React‑Toastify** for in‑app toasts (profile updates, auth errors).  
- **Responsive & RTL‑friendly UI** with Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router v6, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication, Multer (file uploads)  
- **Dev Tools**: Nodemon, Axios

---

## 🚀 Getting Started

1. **Clone repo** & install dependencies  
   ```bash
   git clone https://github.com/your‑username/sha3la‑gas.git  
   cd sha3la‑gas  
   npm install  
   cd client && npm install  
