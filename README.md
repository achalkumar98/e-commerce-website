🚀 E-Commerce Website – MERN Full Stack Application  

🔥 Overview  
A user-friendly e-commerce platform that delivers a smooth shopping experience.  
Customers can explore products, view detailed information, add items to their cart, and complete purchases securely through **Stripe** integration.  

🚀 Live Demo: *Add your live demo link here*  
📌 GitHub Repository: [E-Commerce Repo](#https://github.com/achalkumar98/e-commerce-website)

✨ Features
✅ JWT & Cookie-based Authentication – Secure login and signup for users and admins.  
✅ Admin Panel – Only admins can add, update, or delete products.  
✅ Product Management – View product details with image zoom functionality.  
✅ Cart & Checkout – Add products to cart, update quantities, and remove items.  
✅ Stripe Payment Integration – Secure payments with webhook support.  
✅ Responsive Design – Mobile-first UI built with Tailwind CSS.  
✅ State Management – Smooth frontend state handling with Redux.

🛠 Tech Stack
**Frontend:** React.js, Redux, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** JWT & Cookies  
**Payments:** Stripe  

📂 Project Structure
e-commerce-website/
│── frontend/ # Frontend (React, Redux, Tailwind CSS, DaisyUi)
│── backend/ # Backend (Node.js, Express, MongoDB)
│── README.md # Documentation

🏗️ Setup & Installation

1️⃣ Clone the repository
git clone https://github.com/achalkumar98/e-commerce-website.git
cd e-commerce-website

2️⃣ Install dependencies
cd frontend
npm install
npm start

Backend
cd backend
npm install
npm run dev

3️⃣ Setup environment variables
Create a .env file in both frontend and backend folders.
Add necessary environment variables as per .env.example.

Backend .env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
FRONTEND_URL=your_frontend_url
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY=your_stripe_webhook_secret

Frontend .env
VITE_CLOUD_NAME_CLOUDINARY=tour_cloudinary_name
VITE_STRIPE_PUBLIC_KEY=you_stripe_public_key

🚀 Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.

🧠 Upcoming Features (Planned)
🚧 User Reviews & Ratings – Allow users to review and rate products.
💬 Wishlist – Save favorite products for future purchases.
📦 Order History – Track past orders and statuses.
🎨 UI/UX Improvements – Sleeker interface and animations.
🔔 Push Notifications – Alerts for order updates or new products.
📱 PWA Support – Installable on mobile devices for seamless shopping.
💥 Unit & Integration Tests – Enhance stability and reliability.

📫 Contact
👨‍💻 Author: Achal Kumar
📧 Email: hackerachal1620@gmail.com