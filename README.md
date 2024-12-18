# Freshket Food Store Order Calculator

This project is a web application that made for freshket Homework Test.It allows users to order menu items, view detailed order breakdowns, and apply dynamic discounts. It consists of a **React-based frontend** and a **Node.js/Express backend**.

---

## Features

### Frontend
- **Homepage**:
  - Displays menu items with images, descriptions, and prices.
  - Users can:
    - Increase or decrease order quantities.
    - Mark membership status for discounts using a checkbox.
- **Order Page**:
  - Shows a detailed breakdown of the order, including:
    - Prices before discounts.
    - Bundle discounts for eligible items (5% off for pairs).
    - Membership discounts (10% off subtotal).
    - Final total price after all discounts.

### Backend
- **Discount Logic**:
  - **Bundle Discounts**: 5% off for pairs of eligible items (Orange, Pink, Green).
  - **Membership Discounts**: 10% off the subtotal for members.
- **Validation**:
  - Rejects invalid menu items with meaningful error messages.
  - Handles zero and negative quantities gracefully.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For navigation between pages.
- **TailwindCSS**: For responsive styling.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For API routing.
- **Jest**: For unit testing backend logic.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system.

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone https://github.com/chayanonr/freshket.git
   cd freshket
2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```
3. Start the server
```bash
# Start the frontend server
cd frontend
npm start

# Start the backend server
cd ../backend
npm run dev
```
4. Test
```bash
# Install Jest
npm install --save-dev jest

# Run Jest
npm test
