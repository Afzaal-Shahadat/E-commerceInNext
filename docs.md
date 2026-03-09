fist step is to install the next js and dependencies 
second step is the prject setcture 
my-shop/
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/route.js
│   ├── admin/
│   │   └── products/
│   │       └── page.js
│   ├── products/
│   │   ├── [id]/
│   │   │   └── page.js
│   │   └── page.js
│   ├── cart/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── layout.js
│   ├── page.js           ← Home
│   └── globals.css
├── components/
│   ├── ui/               ← shadcn components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   └── Footer.jsx        (optional)
├── lib/
│   ├── auth.js
│   ├── db.js
│   └── store.js
├── models/
│   ├── Product.js
│   └── User.js
├── middleware.js         (optional – better for /admin)
├── .env.local
└── next.config.mjs



point no 3 

store secret keys in the .env file


forth step is 
Database connection in the lib/db.js

