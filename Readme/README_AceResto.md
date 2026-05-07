# 🎉 Ace Resto Event & Reservation System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PHP](https://img.shields.io/badge/PHP-7.1+-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5.2-7952B3?logo=bootstrap&logoColor=white)

> **A complete event booking and restaurant management system for function halls, catering services, and event planning businesses**

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Screenshots](#-screenshots)
- [Installation Guide](#-installation-guide)
- [Usage Instructions](#-usage-instructions)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributors](#-contributors)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Project Overview

**Ace Resto Event & Reservation System** is a comprehensive web-based management solution designed specifically for event venues, function halls, and catering businesses. The system streamlines the entire event booking process from initial reservation to payment confirmation, providing both customers and administrators with an intuitive, efficient platform.

### Purpose

The system addresses the complex needs of event management businesses by:
- Automating booking workflows and reducing manual paperwork
- Providing real-time availability checking
- Managing multiple service packages and pricing tiers
- Tracking payments and generating invoices
- Offering role-based access control for staff management

### Who Is It For?

- **Event Venue Owners**: Function halls, restaurants, and event spaces
- **Catering Businesses**: Companies offering catering and decoration services
- **Event Planners**: Professionals managing multiple events and bookings
- **Customers**: Individuals and organizations booking venues and services

### Core Goals

✅ Simplify event booking and management  
✅ Reduce operational overhead through automation  
✅ Enhance customer experience with self-service booking  
✅ Provide comprehensive reporting and analytics  
✅ Enable secure online payment processing  

---

## ✨ Features

### 🎫 Booking Management
- **Online Booking System**: Customers can book events directly through the website
- **Real-time Availability Checking**: Prevent double-bookings with live date availability
- **Multi-Service Selection**: Choose from venue packages, catering, decorations, and add-ons
- **Booking Status Tracking**: Monitor bookings through stages (New, Approved, Cancelled)
- **Notification System**: Automated alerts for new bookings and status updates

### 💳 Payment Processing
- **Multiple Payment Methods**: Support for GCash, bank transfer, and other payment gateways
- **Payment Proof Upload**: Customers can upload payment screenshots
- **Payment Status Tracking**: Monitor pending, confirmed, and completed payments
- **Invoice Generation**: Automatically generate professional invoices for bookings

### 👥 User & Permission Management
- **Role-Based Access Control (RBAC)**: Superuser, Admin, and User roles
- **Custom Permissions**: Fine-grained control over create, update, delete operations
- **User Account Management**: Add, edit, and deactivate user accounts
- **Staff Management**: Manage internal staff with different access levels

### 📊 Advanced Reporting
- **Booking Reports**: Filter by date range, event type, and status
- **Revenue Analytics**: Track income from different service packages
- **Event Type Statistics**: Analyze popular event categories
- **Date-Based Reports**: Review bookings by specific dates or periods

### 🏢 Company Profile Management
- **Venue Information**: Manage venue details, address, and contact information
- **Service Package Configuration**: Create and modify service offerings and pricing
- **Logo & Image Upload**: Customize branding and gallery images
- **Event Type Management**: Define and manage event categories

### 🎨 Customer-Facing Features
- **Modern Landing Page**: Beautiful, responsive design with hero images
- **Venue Gallery**: Showcase venue photos with elegant image galleries
- **Service Pricing Display**: Transparent pricing for all packages
- **Mobile-Responsive**: Fully optimized for mobile and tablet devices
- **Interactive Booking Modal**: Step-by-step booking process with validation

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **PHP** | 7.1+ | Server-side programming language |
| **MySQL** | 5.7+ | Relational database management |
| **PDO** | Latest | Database abstraction layer |
| **MySQLi** | Latest | Alternative database interface |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | Latest | Markup language |
| **CSS3** | Latest | Styling and animations |
| **JavaScript** | ES6+ | Client-side interactivity |
| **jQuery** | 3.x | DOM manipulation and AJAX |
| **Bootstrap** | 4.5.2 | Responsive UI framework |
| **Font Awesome** | 6.0.0 | Icon library |
| **Lottie** | 5.7.8 | Animation library |

### Server Environment
| Component | Requirement |
|-----------|-------------|
| **Web Server** | Apache (XAMPP, WAMP, or LAMP) |
| **PHP Extensions** | PDO, MySQLi, GD, JSON |
| **Database** | MySQL/MariaDB |
| **Storage** | File system for uploads (images, payment proofs) |

### Development Tools
- **Git** - Version control
- **Composer** - Dependency management (optional)
- **phpMyAdmin** - Database administration

---

## 🏗️ System Architecture

The system follows a traditional **MVC-inspired architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACE                      │
│  (Landing Page, Booking Forms, Admin Dashboard)         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                      │
│         (PHP Pages, Modals, Forms, Reports)              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   BUSINESS LOGIC                         │
│    (Action Scripts, Validation, Authentication)          │
│  • book_now_action.php                                   │
│  • payment_action.php                                    │
│  • newuser.php                                           │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                     │
│              (dbconnection.php, PDO/MySQLi)              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE (MySQL)                       │
│  Tables: tblbooking, tbladmin, tblservice, etc.          │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Components

1. **Entry Points**
   - `index.php` - Public landing page
   - `admin.php` - Admin login portal
   - `dashboard.php` - Admin dashboard

2. **Request Flow**
   - User submits form → Action script validates → Database update → Response/Redirect

3. **Authentication**
   - Session-based authentication
   - Password hashing (MD5 - *recommended to upgrade*)
   - Role-based authorization checks

4. **File Organization**
   - Root: Public pages and entry points
   - `/admin/`: Admin-specific functionality
   - `/includes/`: Shared components (header, sidebar, database)
   - `/assets/`: Static resources (CSS, JS, images)

---

## 📸 Screenshots / UI Previews

> **Note**: Replace the placeholder paths below with actual screenshot files from your project.

### Landing Page
![Landing Page](./screenshots/landing-page.png)
*Modern, responsive landing page with hero section and service showcase*

### Booking Modal
![Booking Form](./screenshots/booking-modal.png)
*Multi-step booking form with service selection and date picker*

### Admin Dashboard
![Dashboard](./screenshots/admin-dashboard.png)
*Comprehensive admin dashboard with booking statistics and quick actions*

### Booking Management
![Booking List](./screenshots/booking-management.png)
*View and manage all bookings with filtering and status updates*

### Service Management
![Services](./screenshots/service-management.png)
*Manage venue packages, catering services, and pricing*

### Payment Processing
![Payment](./screenshots/payment-processing.png)
*Track payments and verify payment proofs*

---

## 📥 Installation Guide

Follow these steps to set up the system on your local machine:

### Prerequisites

- ✅ **XAMPP** (or WAMP/LAMP/MAMP) installed
- ✅ **PHP 7.1** or higher
- ✅ **MySQL 5.7** or higher
- ✅ **Modern web browser** (Chrome, Firefox, Edge, Safari)
- ✅ **Git** (optional, for cloning)

### Step-by-Step Installation

#### 1️⃣ Clone or Download the Repository

**Option A: Using Git**
```bash
cd C:\xampp\htdocs
git clone <your-repository-url> royal_event
```

**Option B: Manual Download**
- Download the project ZIP file
- Extract to `C:\xampp\htdocs\royal_event`

#### 2️⃣ Start XAMPP Services

- Open **XAMPP Control Panel**
- Start **Apache** and **MySQL** modules
- Verify they're running (green indicators)

#### 3️⃣ Create Database

**Option A: Using phpMyAdmin**
1. Navigate to `http://localhost/phpmyadmin`
2. Click **New** to create a database
3. Name it: `royal_event`
4. Click **Create**

**Option B: Using SQL Command**
```sql
CREATE DATABASE royal_event CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 4️⃣ Import Database Schema

1. In phpMyAdmin, select the `royal_event` database
2. Click the **Import** tab
3. Click **Choose File** and select `royal_event.sql` from the project root
4. Click **Go** to import
5. Verify all tables are created successfully

#### 5️⃣ Configure Database Connection

Edit `dbconnection.php` in the project root:

```php
<?php
// Local development configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'royal_event');

// Establish database connection
try {
    $dbh = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS, 
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
} catch (PDOException $e) {
    exit("Error: " . $e->getMessage());
}
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
?>
```

#### 6️⃣ Set Up File Permissions

Ensure the following directories are writable:

```bash
# On Windows (via Command Prompt as Administrator)
icacls "C:\xampp\htdocs\royal_event\assets\img" /grant Everyone:F
icacls "C:\xampp\htdocs\royal_event\admin\uploads" /grant Everyone:F

# On Linux/Mac
chmod -R 755 assets/img
chmod -R 755 admin/uploads
```

#### 7️⃣ Access the Application

Open your browser and navigate to:

- **Public Site**: `http://localhost/royal_event/`
- **Admin Panel**: `http://localhost/royal_event/admin.php`

#### 8️⃣ Default Login Credentials

**Admin Account:**
- **Email**: `kentharold@gmail.com`
- **Password**: `admin`

> ⚠️ **Security Warning**: Change the default password immediately after first login!

---

## 🚀 Usage Instructions

### For Customers

#### Making a Booking

1. **Visit the Website**
   - Navigate to `http://localhost/royal_event/`

2. **Browse Services**
   - Review venue packages, catering options, and decorations
   - Check pricing and inclusions

3. **Book an Event**
   - Click **"Book Your Event"** button
   - Fill in the booking form:
     - Full Name
     - Contact Number
     - Email Address
     - Event Date
     - Event Type (Birthday, Wedding, Seminar)
     - Number of Guests
     - Selected Services
     - Additional Requirements

4. **Submit Booking**
   - Review your details
   - Click **"Submit Booking Request"**
   - You'll be redirected to the payment page

5. **Complete Payment**
   - Choose payment method (GCash, Bank Transfer)
   - Upload payment proof
   - Enter payment reference number
   - Submit payment confirmation

6. **Track Your Booking**
   - You'll receive a booking ID
   - Check booking status via email notifications

---

### For Administrators

#### Accessing Admin Dashboard

1. Navigate to `http://localhost/royal_event/admin.php`
2. Enter admin credentials
3. Click **Login**

#### Managing Bookings

**View All Bookings**
- Dashboard → **New Bookings** / **Approved Bookings** / **Cancelled Bookings**

**Approve a Booking**
1. Click on a booking from **New Bookings**
2. Review booking details
3. Click **"Approve"**
4. Add remarks (optional)
5. Confirm approval

**Reject/Cancel a Booking**
1. Open the booking details
2. Click **"Reject"** or **"Cancel"**
3. Provide reason for cancellation
4. Submit

#### Managing Services

**Add New Service**
1. Dashboard → **Manage Services**
2. Click **"Add New Service"**
3. Fill in:
   - Service Name
   - Description
   - Price
4. Click **"Submit"**

**Edit Existing Service**
1. Navigate to **Manage Services**
2. Click **Edit** icon next to the service
3. Update details
4. Click **"Update"**

**Delete Service**
1. Navigate to **Manage Services**
2. Click **Delete** icon
3. Confirm deletion

#### Managing Users

**Add New Admin/User**
1. Dashboard → **User Management**
2. Click **"Add New User"**
3. Fill in user details:
   - Staff ID
   - Name
   - Email
   - Phone Number
   - Permission Level
4. Set password
5. Submit

**Edit User Permissions**
1. Go to **User Permissions**
2. Select user
3. Modify permissions (Create User, Delete User, Create Bid, Update Bid)
4. Save changes

#### Generating Reports

**Booking Report**
1. Dashboard → **Reports** → **Booking Report**
2. Select date range
3. Filter by event type (optional)
4. Click **"Generate Report"**
5. Export to PDF or print

**Revenue Report**
1. Navigate to **Event Report**
2. Select period (Daily, Weekly, Monthly)
3. View revenue breakdown by service type
4. Export report

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file (optional, for enhanced security):

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=royal_event
DB_USER=root
DB_PASS=

# Application Settings
APP_URL=http://localhost/royal_event
APP_ENV=development
APP_DEBUG=true

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@aceresto.com

# Payment Gateway Keys
GCASH_API_KEY=your_gcash_api_key
GCASH_SECRET=your_gcash_secret

# File Upload Settings
MAX_UPLOAD_SIZE=5242880  # 5MB in bytes
ALLOWED_UPLOAD_TYPES=jpg,jpeg,png,pdf
```

### Important Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `dbconnection.php` | Database connection | DB credentials, PDO/MySQLi setup |
| `includes/checklogin.php` | Session management | Authentication checks |
| `companyprofile.php` | Company details | Venue info, contact details |

### Email Notification Setup

To enable email notifications:

1. Install PHPMailer (optional):
   ```bash
   composer require phpmailer/phpmailer
   ```

2. Configure in your action scripts:
   ```php
   // Add to booking confirmation scripts
   require 'vendor/autoload.php';
   use PHPMailer\PHPMailer\PHPMailer;
   
   $mail = new PHPMailer();
   $mail->isSMTP();
   $mail->Host = 'smtp.gmail.com';
   $mail->SMTPAuth = true;
   $mail->Username = 'your-email@gmail.com';
   $mail->Password = 'app-password';
   $mail->SMTPSecure = 'tls';
   $mail->Port = 587;
   ```

### Payment Gateway Integration

**GCash Integration Example:**

```php
// In gcash_payment.php or payment action scripts
$gcashConfig = [
    'merchant_id' => 'YOUR_MERCHANT_ID',
    'api_key' => 'YOUR_API_KEY',
    'secret_key' => 'YOUR_SECRET_KEY',
    'callback_url' => 'http://localhost/royal_event/payment_confirmation_action.php'
];
```

### Security Configurations

⚠️ **Recommended Security Enhancements:**

1. **Upgrade Password Hashing:**
   Replace MD5 with bcrypt/Argon2:
   ```php
   // Current (INSECURE):
   $password = md5($password);
   
   // Recommended:
   $password = password_hash($password, PASSWORD_BCRYPT);
   ```

2. **Enable HTTPS:**
   - Get SSL certificate
   - Update `.htaccess` to force HTTPS

3. **SQL Injection Prevention:**
   - Use prepared statements (already implemented)
   - Validate all user inputs

4. **XSS Protection:**
   ```php
   htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8')
   ```

---

## 📁 Project Structure

```
royal_event/
│
├── 📄 index.php                    # Public landing page
├── 📄 admin.php                    # Admin login portal
├── 📄 dashboard.php                # Admin dashboard
├── 📄 dbconnection.php             # Database configuration
├── 📄 royal_event.sql              # Database schema & seed data
│
├── 📂 admin/                       # Admin-specific modules
│   └── 📂 uploads/                 # Admin uploaded files
│
├── 📂 assets/                      # Static resources
│   ├── 📂 css/                     # Stylesheets
│   ├── 📂 js/                      # JavaScript files
│   │   └── booking-animation.js   # Booking form animations
│   ├── 📂 img/                     # Images & media
│   │   └── 📂 companyimages/      # Venue gallery images
│   └── 📂 vendor/                  # Third-party libraries
│       ├── 📂 bootstrap/
│       ├── 📂 jquery/
│       └── 📂 fontawesome/
│
├── 📂 includes/                    # Shared components
│   ├── 📄 checklogin.php          # Authentication middleware
│   ├── 📄 dbconnection.php        # Alternative DB connection
│   ├── 📄 head.php                # Common <head> elements
│   ├── 📄 header.php              # Admin header navigation
│   ├── 📄 sidebar.php             # Admin sidebar menu
│   └── 📄 foot.php                # Footer scripts
│
├── 📂 screenshots/                 # UI screenshots (for README)
│
├── 📄 booking_modal.php            # Booking form modal component
├── 📄 book_now_action.php          # Booking form submission handler
├── 📄 check_availability.php       # Date availability checker
│
├── 📄 new_bookings.php             # New bookings management
├── 📄 approved_bookings.php        # Approved bookings list
├── 📄 cancelled_bookings.php       # Cancelled bookings list
├── 📄 view_newbookings.php         # Booking details view
│
├── 📄 gcash_payment.php            # GCash payment page
├── 📄 payment_action.php           # Payment processing
├── 📄 payment_confirmation_action.php  # Payment verification
├── 📄 invoice_generating.php       # Invoice generator
│
├── 📄 manage_service.php           # Service management
├── 📄 newservice.php               # Add new service
├── 📄 update_service.php           # Update service action
│
├── 📄 manage_event.php             # Event type management
├── 📄 newevent.php                 # Add new event type
│
├── 📄 newuser.php                  # Add user action
├── 📄 newuser_form.php             # User creation form
├── 📄 update_user.php              # User update action
├── 📄 deleted_users.php            # Deactivated users list
├── 📄 user_permission.php          # Permission management
├── 📄 change_permissions.php       # Update permissions
│
├── 📄 companyprofile.php           # Company profile page
├── 📄 update_logo.php              # Logo upload handler
├── 📄 update_image.php             # Image upload handler
│
├── 📄 booking_report.php           # Booking analytics
├── 📄 event_report.php             # Event statistics
├── 📄 btndates_report.php          # Date-based reports
│
├── 📄 profile.php                  # User profile page
├── 📄 change_password.php          # Password change
├── 📄 forgot_password.php          # Password recovery
│
├── 📄 userregister.php             # Public user registration
├── 📄 logout.php                   # Session termination
├── 📄 mark_notification_read.php   # Notification handler
├── 📄 timeline.php                 # Activity timeline
│
├── 📄 thank_you.html               # Booking confirmation page
│
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # This file
└── 📄 LICENSE                      # License information
```

---

## 🔌 API Endpoints

While this is primarily a traditional server-side application, here are the key action endpoints:

### Booking Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `book_now_action.php` | Create new booking | `name`, `email`, `phone`, `eventdate`, `eventtype`, `services[]`, `guests`, `venueaddress` |
| GET | `check_availability.php` | Check date availability | `date` |
| POST | `newbooking_action.php` | Admin creates booking | Admin credentials + booking data |

### Payment Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `payment_action.php` | Process payment | `booking_id`, `payment_method`, `amount` |
| POST | `payment_confirmation_action.php` | Confirm payment | `booking_id`, `payment_proof`, `reference_number` |
| GET | `invoice_generating.php` | Generate invoice | `booking_id` |

### Service Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `newservice.php` | Add new service | `servicename`, `description`, `price` |
| POST | `update_service.php` | Update service | `service_id`, `servicename`, `description`, `price` |

### User Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `newuser.php` | Create user | `staffid`, `firstname`, `lastname`, `email`, `phone`, `permission`, `password` |
| POST | `update_user.php` | Update user | `user_id`, updated fields |
| POST | `change_permissions.php` | Modify permissions | `user_id`, `permission_id` |

### Authentication

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | `admin.php` | Admin login | `username`, `password` |
| GET | `logout.php` | Logout | Session-based |
| POST | `change_password.php` | Update password | `current_password`, `new_password`, `confirm_password` |
| POST | `forgot_password.php` | Password reset | `email` |

### Response Format

Most endpoints redirect on success or return JSON for AJAX requests:

**Success Response:**
```json
{
    "success": true,
    "message": "Booking created successfully",
    "booking_id": "954554731",
    "redirectUrl": "gcash_payment.php?booking_id=954554731"
}
```

**Error Response:**
```json
{
    "success": false,
    "message": "Date is not available",
    "errors": ["Selected date already booked"]
}
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌──────────────┐       ┌─────────────┐       ┌────────────────────┐
│   tbladmin   │       │ tblbooking  │       │ tblbooking_services│
├──────────────┤       ├─────────────┤       ├────────────────────┤
│ ID (PK)      │       │ ID (PK)     │◄──────│ booking_id (FK)    │
│ Staffid      │       │ BookingID   │       │ service_id (FK)    │
│ AdminName    │       │ ServiceID   │───┐   │ service_name       │
│ UserName     │       │ Name        │   │   │ service_price      │
│ Email        │       │ Email       │   │   └────────────────────┘
│ Password     │       │ EventDate   │   │
│ MobileNumber │       │ EventType   │───┤   ┌─────────────┐
│ Status       │       │ Status      │   │   │ tblservice  │
│ Photo        │       │ TotalAmount │   └──►├─────────────┤
└──────────────┘       │ PaymentStatus│       │ ID (PK)     │
                       └─────────────┘       │ ServiceName │
┌───────────────┐                            │ SerDes      │
│ permissions   │                            │ ServicePrice│
├───────────────┤                            └─────────────┘
│ id (PK)       │
│ permission    │      ┌──────────────┐
│ createuser    │      │ tblcompany   │
│ deleteuser    │      ├──────────────┤      ┌────────────────┐
│ createbid     │      │ id (PK)      │      │ tbleventtype   │
│ updatebid     │      │ regno        │      ├────────────────┤
└───────────────┘      │ companyname  │      │ ID (PK)        │
                       │ companyemail │      │ EventType      │
                       │ companyphone │      │ CreationDate   │
                       │ companylogo  │      └────────────────┘
                       └──────────────┘
```

### Table Details

#### `tbladmin` - User Accounts

| Column | Type | Description |
|--------|------|-------------|
| ID | INT (PK) | Auto-increment primary key |
| Staffid | VARCHAR(255) | Unique staff identifier |
| AdminName | VARCHAR(120) | Display name |
| UserName | VARCHAR(120) | Username for login |
| FirstName | VARCHAR(255) | First name |
| LastName | VARCHAR(255) | Last name |
| Email | VARCHAR(200) | Email address (unique) |
| MobileNumber | BIGINT(10) | Contact number |
| Password | VARCHAR(120) | Hashed password (MD5) |
| Status | INT | Active (1) / Inactive (0) |
| Photo | VARCHAR(255) | Profile picture filename |
| AdminRegdate | TIMESTAMP | Registration date |

#### `tblbooking` - Bookings

| Column | Type | Description |
|--------|------|-------------|
| ID | INT (PK) | Auto-increment primary key |
| BookingID | INT | Unique booking number |
| ServiceID | INT (FK) | Reference to tblservice |
| Name | VARCHAR(200) | Customer name |
| Email | VARCHAR(200) | Customer email |
| MobileNumber | BIGINT(10) | Customer phone |
| EventDate | VARCHAR(200) | Event date |
| EventStartingtime | VARCHAR(200) | Start time |
| EventEndingtime | VARCHAR(200) | End time |
| VenueAddress | MEDIUMTEXT | Venue location |
| EventType | VARCHAR(200) | Event category |
| AdditionalInformation | MEDIUMTEXT | Special requests |
| TotalAmount | DECIMAL(10,2) | Total booking cost |
| BookingDate | TIMESTAMP | Booking creation date |
| Status | VARCHAR(200) | Approved/Pending/Cancelled |
| Remark | VARCHAR(200) | Admin notes |
| PaymentMethod | VARCHAR(255) | GCash/Bank/Cash |
| PaymentStatus | VARCHAR(255) | Pending/Confirmed |
| PaymentReference | VARCHAR(255) | Payment ref number |
| PaymentProof | VARCHAR(255) | Uploaded proof filename |
| PaymentTimestamp | DATETIME | Payment date/time |
| IsRead | TINYINT(1) | Notification read status |
| UpdationDate | TIMESTAMP | Last update timestamp |

#### `tblservice` - Service Packages

| Column | Type | Description |
|--------|------|-------------|
| ID | INT (PK) | Auto-increment primary key |
| ServiceName | VARCHAR(200) | Service title |
| SerDes | VARCHAR(250) | Service description |
| ServicePrice | VARCHAR(200) | Price (in currency) |
| CreationDate | TIMESTAMP | Date added |

#### `tblbooking_services` - Booking-Service Mapping

| Column | Type | Description |
|--------|------|-------------|
| booking_id | VARCHAR(20) (PK) | Booking reference |
| service_id | INT (PK) | Service ID |
| service_name | VARCHAR(255) | Service name snapshot |
| service_price | DECIMAL(10,2) | Price snapshot |

#### `tbleventtype` - Event Categories

| Column | Type | Description |
|--------|------|-------------|
| ID | INT (PK) | Auto-increment primary key |
| EventType | VARCHAR(200) | Event name (Wedding, Birthday, etc.) |
| CreationDate | TIMESTAMP | Date added |

#### `permissions` - Role Permissions

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Permission ID |
| permission | VARCHAR(255) | Role name |
| createuser | VARCHAR(255) | Can create users (1/NULL) |
| deleteuser | VARCHAR(255) | Can delete users (1/NULL) |
| createbid | VARCHAR(255) | Can create bookings (1/NULL) |
| updatebid | VARCHAR(255) | Can update bookings (1/NULL) |

#### `tblcompany` - Company Profile

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment primary key |
| regno | VARCHAR(255) | Registration number |
| companyname | VARCHAR(255) | Business name |
| companyemail | VARCHAR(255) | Contact email |
| companyphone | TEXT | Contact phone |
| companyaddress | VARCHAR(255) | Business address |
| companylogo | VARCHAR(255) | Logo filename |
| country | VARCHAR(255) | Country |
| status | VARCHAR(255) | Active status |
| creationdate | TIMESTAMP | Profile creation date |

---

## 🚢 Deployment

### Deployment to Shared Hosting (cPanel)

#### 1. Prepare Files

```bash
# Create deployment package
zip -r royal_event_deploy.zip * -x "*.git*" "node_modules/*" "*.env"
```

#### 2. Upload via cPanel

1. Log in to your cPanel
2. Navigate to **File Manager**
3. Go to `public_html` directory
4. Upload `royal_event_deploy.zip`
5. Extract the archive
6. Set file permissions (755 for folders, 644 for files)

#### 3. Create Database

1. cPanel → **MySQL Databases**
2. Create new database: `username_royalevent`
3. Create MySQL user with password
4. Add user to database with **ALL PRIVILEGES**
5. Note: database name, username, password

#### 4. Import Database

1. cPanel → **phpMyAdmin**
2. Select your database
3. Click **Import**
4. Upload `royal_event.sql`
5. Execute

#### 5. Update Configuration

Edit `dbconnection.php`:

```php
define('DB_HOST', 'localhost');  // Usually localhost
define('DB_USER', 'username_dbuser');
define('DB_PASS', 'your_secure_password');
define('DB_NAME', 'username_royalevent');
```

#### 6. Configure Domain

- Point domain to `public_html/royal_event`
- Or set up subdomain: `bookings.yourdomain.com`

#### 7. Enable HTTPS

1. cPanel → **SSL/TLS**
2. Install Let's Encrypt SSL (free)
3. Add to `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

### Deployment to Cloud Platforms

#### **Deploying to Heroku**

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create royal-event-system

# Add ClearDB MySQL addon
heroku addons:create cleardb:ignite

# Get database credentials
heroku config | grep CLEARDB_DATABASE_URL

# Push code
git push heroku main

# Import database
heroku config
# Use credentials to import via MySQL Workbench
```

#### **Deploying to AWS EC2**

1. Launch Ubuntu EC2 instance
2. Install LAMP stack:

```bash
sudo apt update
sudo apt install apache2 mysql-server php libapache2-mod-php php-mysql
```

3. Clone repository:

```bash
cd /var/www/html
sudo git clone <repo-url> royal_event
sudo chown -R www-data:www-data royal_event
```

4. Import database:

```bash
mysql -u root -p
CREATE DATABASE royal_event;
exit
mysql -u root -p royal_event < royal_event.sql
```

5. Configure Apache virtual host
6. Enable SSL with Certbot

---

### Deployment to InfinityFree (Current Hosting)

Based on your current `dbconnection.php` configuration:

**Database Details:**
- **Host**: `sql108.infinityfree.com`
- **Username**: `if0_39414566`
- **Database**: `if0_39414566_bmsdb`

**Steps:**
1. Upload files via FTP (FileZilla)
2. Database already configured
3. Access via: `http://yourusername.infinityfreeapp.com/royal_event/`

---

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### ❌ **Database Connection Error**

**Problem:** "Error: SQLSTATE[HY000] [1045] Access denied"

**Solution:**
```php
// Verify credentials in dbconnection.php
define('DB_HOST', 'localhost');      // Check host
define('DB_USER', 'root');           // Check username
define('DB_PASS', '');               // Check password
define('DB_NAME', 'royal_event');    // Check database name

// Test connection
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
```

---

#### ❌ **Blank Page / White Screen**

**Problem:** Page loads but shows nothing

**Solution:**
```php
// Enable error reporting (add to top of index.php)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check PHP error logs in XAMPP
// Location: C:\xampp\apache\logs\error.log
```

---

#### ❌ **Images Not Displaying**

**Problem:** Venue gallery or uploads not showing

**Solution:**
```bash
# Check file paths in HTML
# Ensure assets folder structure:
assets/
  └── img/
      └── companyimages/
          ├── 1 (2).jpg
          ├── 2 (2).jpg
          └── 3.jpg

# Verify file permissions
# Windows: Right-click folder → Properties → Security → Full Control
# Linux: chmod -R 755 assets/
```

---

#### ❌ **Booking Form Not Submitting**

**Problem:** Click submit, nothing happens

**Solution:**
```javascript
// Check browser console (F12) for errors
// Verify jQuery is loaded
<script src="assets/vendor/jquery/jquery.min.js"></script>

// Check AJAX endpoint in index.php
$.ajax({
    type: 'POST',
    url: 'book_now_action.php',  // Verify file exists
    data: form.serialize(),
    dataType: 'json',
    success: function(response) { 
        console.log(response);  // Debug response
    }
});
```

---

#### ❌ **Payment Upload Fails**

**Problem:** "Failed to upload payment proof"

**Solution:**
```php
// Check upload directory permissions
// PHP.ini settings:
upload_max_filesize = 10M
post_max_size = 10M

// Verify upload folder exists and is writable
mkdir('admin/uploads', 0755, true);
chmod('admin/uploads', 0755);

// Check file upload errors
if ($_FILES['payment_proof']['error'] !== UPLOAD_ERR_OK) {
    echo "Upload error code: " . $_FILES['payment_proof']['error'];
}
```

---

#### ❌ **Session Issues / Auto Logout**

**Problem:** Gets logged out frequently

**Solution:**
```php
// Increase session lifetime in php.ini
session.gc_maxlifetime = 3600  // 1 hour

// Or set in PHP:
ini_set('session.gc_maxlifetime', 3600);
session_start();

// Check includes/checklogin.php for session validation
```

---

#### ❌ **Reports Not Generating**

**Problem:** Blank report or PDF generation fails

**Solution:**
```bash
# Install required PHP extensions
# XAMPP → PHP (Config) → php.ini
# Uncomment:
extension=gd
extension=mbstring

# Restart Apache
```

---

#### ❌ **Styles Not Loading / Looks Broken**

**Problem:** No CSS formatting, plain HTML

**Solution:**
```html
<!-- Verify Bootstrap links -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<!-- Check relative paths -->
<link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<!-- Clear browser cache (Ctrl + Shift + Del) -->
```

---

#### ❌ **Admin Login Fails with Correct Password**

**Problem:** Password correct but can't login

**Solution:**
```sql
-- Reset admin password directly in database
UPDATE tbladmin 
SET Password = MD5('admin') 
WHERE Email = 'kentharold@gmail.com';

-- Or use better hashing (recommended):
-- Generate hash: echo password_hash('admin', PASSWORD_BCRYPT);
UPDATE tbladmin 
SET Password = '$2y$10$...' 
WHERE Email = 'kentharold@gmail.com';
```

---

### Debugging Checklist

- [ ] Check Apache and MySQL are running in XAMPP
- [ ] Verify database exists and has data
- [ ] Confirm `dbconnection.php` credentials are correct
- [ ] Enable PHP error reporting
- [ ] Check browser console for JavaScript errors (F12)
- [ ] Verify file/folder permissions
- [ ] Clear browser cache and cookies
- [ ] Check PHP error logs
- [ ] Test database connection with simple script
- [ ] Ensure all required PHP extensions are enabled

---

## 🚀 Future Enhancements / Roadmap

### Phase 1: Security & Performance (Q1 2025)

- [ ] **Upgrade Password Hashing**
  - Replace MD5 with bcrypt/Argon2
  - Implement password strength requirements

- [ ] **Input Validation Enhancement**
  - Server-side validation for all forms
  - CSRF token implementation
  - XSS protection filters

- [ ] **Database Optimization**
  - Add indexes to frequently queried columns
  - Implement query caching
  - Optimize joins in reports

- [ ] **Performance Improvements**
  - Image optimization and lazy loading
  - Minify CSS and JavaScript
  - Implement CDN for static assets

---

### Phase 2: Feature Expansion (Q2 2025)

- [ ] **Calendar View**
  - Visual calendar showing booked/available dates
  - Drag-and-drop booking interface for admin

- [ ] **Email Notifications**
  - Automated booking confirmations
  - Payment reminders
  - Event reminder emails (24hrs before)

- [ ] **SMS Integration**
  - Booking confirmation via SMS
  - Status update notifications

- [ ] **Advanced Reporting**
  - Revenue trends and forecasting
  - Customer analytics dashboard
  - Export to Excel/CSV

- [ ] **Multi-Currency Support**
  - Support for USD, EUR, PHP
  - Automatic currency conversion

---

### Phase 3: Modern Tech Stack (Q3 2025)

- [ ] **API Development**
  - RESTful API for mobile app integration
  - JSON Web Token (JWT) authentication
  - API documentation with Swagger

- [ ] **Mobile Application**
  - Native Android/iOS apps
  - Push notifications
  - Mobile payment integration

- [ ] **Progressive Web App (PWA)**
  - Offline booking capability
  - Add to home screen feature
  - Service workers for caching

- [ ] **Real-time Features**
  - WebSocket for live booking updates
  - Real-time availability checker
  - Live chat support

---

### Phase 4: Business Intelligence (Q4 2025)

- [ ] **Customer Relationship Management (CRM)**
  - Customer profiles and history
  - Loyalty points program
  - Repeat customer discounts

- [ ] **Marketing Automation**
  - Email marketing campaigns
  - Birthday/anniversary reminders
  - Promotional offers management

- [ ] **AI/ML Integration**
  - Intelligent pricing recommendations
  - Demand forecasting
  - Chatbot for customer inquiries

- [ ] **Multi-Venue Support**
  - Manage multiple venues from single dashboard
  - Cross-venue booking transfers
  - Consolidated reporting

---

### Phase 5: User Experience (Ongoing)

- [ ] **Enhanced UI/UX**
  - Dark mode toggle
  - Accessibility improvements (WCAG 2.1)
  - Multi-language support (i18n)

- [ ] **Customer Portal**
  - Self-service booking management
  - Digital contract signing
  - Invoice history and downloads

- [ ] **Review & Rating System**
  - Post-event customer reviews
  - Star ratings for services
  - Testimonials showcase

- [ ] **Social Media Integration**
  - Share events on Facebook/Instagram
  - Social login (Google, Facebook)
  - Instagram feed integration for gallery

---

### Wish List (Long-term)

- Virtual venue tours (360° images/VR)
- Blockchain-based payment options
- Integration with accounting software (QuickBooks, Xero)
- Vendor management system (caterers, decorators, DJs)
- Event timeline builder
- Seating chart designer
- Menu customization tool
- Live streaming integration for hybrid events

---

## 👥 Contributors

### Core Team

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/150" width="100px;" alt=""/>
      <br />
      <sub><b>Your Name</b></sub>
      <br />
      <a href="mailto:your.email@example.com">📧</a>
      <a href="https://github.com/yourusername">💻</a>
      <br />
      <em>Lead Developer</em>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/150" width="100px;" alt=""/>
      <br />
      <sub><b>Team Member 2</b></sub>
      <br />
      <a href="mailto:member2@example.com">📧</a>
      <a href="https://github.com/member2">💻</a>
      <br />
      <em>Backend Developer</em>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/150" width="100px;" alt=""/>
      <br />
      <sub><b>Team Member 3</b></sub>
      <br />
      <a href="mailto:member3@example.com">📧</a>
      <a href="https://github.com/member3">💻</a>
      <br />
      <em>UI/UX Designer</em>
    </td>
  </tr>
</table>

### How to Contribute

We welcome contributions! Here's how you can help:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/royal_event.git
   cd royal_event
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

3. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add: Your feature description"
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Open PR against `main` branch
   - Describe changes and why they're needed
   - Reference any related issues

### Contribution Guidelines

- 📝 Follow PSR-12 coding standards for PHP
- ✅ Test all changes locally before submitting
- 📚 Update documentation if adding features
- 🐛 Create issues for bugs before fixing
- 💬 Be respectful and constructive in discussions

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Ace Resto Event & Reservation System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party Licenses

| Library | License | Used For |
|---------|---------|----------|
| Bootstrap | MIT | UI Framework |
| jQuery | MIT | JavaScript Library |
| Font Awesome | Font Awesome Free License | Icons |
| Lottie | MIT | Animations |
| PHPMailer | LGPL | Email Sending (if added) |

---

## 🙏 Acknowledgments

### Special Thanks

- **Bootstrap Team** - For the excellent responsive framework
- **Font Awesome** - For comprehensive icon library
- **jQuery Foundation** - For simplifying JavaScript development
- **Stack Overflow Community** - For countless solutions and guidance
- **GitHub** - For code hosting and collaboration tools

### Inspirations

- Modern SaaS booking platforms (Calendly, Booksy)
- Restaurant management systems
- Event planning tools (Eventbrite, Ticketmaster)

### Resources Used

- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [PHP Manual](https://www.php.net/manual/) - PHP documentation
- [MySQL Documentation](https://dev.mysql.com/doc/) - Database reference
- [W3Schools](https://www.w3schools.com/) - Web tutorials
- [CSS Tricks](https://css-tricks.com/) - CSS techniques and best practices

### Design Assets

- Hero Images - [Unsplash](https://unsplash.com/)
- Icons - [Font Awesome](https://fontawesome.com/)
- Color Palette - Inspired by modern web design trends
- Typography - Google Fonts (Inter font family)

---

## 📞 Support & Contact

### Getting Help

- 📧 **Email**: support@aceresto.com
- 💬 **Issues**: [GitHub Issues](https://github.com/yourusername/royal_event/issues)
- 📱 **Phone**: +1 (234) 567-8900
- 🌐 **Website**: https://aceresto.com

### Reporting Bugs

When reporting bugs, please include:
1. **Description** - What happened vs. what you expected
2. **Steps to Reproduce** - Detailed steps to recreate the issue
3. **Screenshots** - Visual proof of the problem
4. **Environment** - Browser, PHP version, OS
5. **Error Messages** - Copy from console/logs

**Bug Report Template:**
```markdown
**Bug Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: Windows 10
- Browser: Chrome 120
- PHP: 7.4
- MySQL: 5.7

**Screenshots:**
[Attach images]
```

---

## 📊 Project Statistics

![GitHub Stars](https://img.shields.io/github/stars/yourusername/royal_event?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/royal_event?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/royal_event)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/royal_event)
![Code Size](https://img.shields.io/github/languages/code-size/yourusername/royal_event)
![Last Commit](https://img.shields.io/github/last-commit/yourusername/royal_event)

---

## 🎓 Learning Resources

Want to understand how this system works? Here are some helpful resources:

### PHP & MySQL
- [PHP: The Right Way](https://phptherightway.com/)
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [PDO vs MySQLi](https://websitebeaver.com/php-pdo-vs-mysqli)

### Frontend Development
- [Bootstrap 4 Documentation](https://getbootstrap.com/docs/4.5/)
- [jQuery Learning Center](https://learn.jquery.com/)
- [JavaScript.info](https://javascript.info/)

### Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PHP Security Best Practices](https://www.php.net/manual/en/security.php)
- [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star!

**Made with ❤️ by the Ace Resto Team**

[⬆ Back to Top](#-ace-resto-event--reservation-system)

</div>
