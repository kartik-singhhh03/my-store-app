# 🛒 Kartik Digital Store - React TypeScript Version

A modern digital product store built with React, TypeScript, and Vite. This is the frontend application that connects to a separate backend API.

---

## 🚀 Features

- **Modern React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API calls
- **Stripe** integration for payments
- **Responsive Design** with mobile-first approach

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kartik-digital-store-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utility functions and API
├── pages/              # Page components
├── store/              # Zustand store
└── types/              # TypeScript type definitions
```

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

---

## 🔧 Backend Requirements

This frontend requires a separate backend API. The backend should provide:

- Authentication endpoints (`/auth/login`, `/auth/register`, `/auth/me`)
- Product management (`/products`, `/products/:id`)
- Order management (`/orders`, `/checkout`)
- Blog management (`/blog`, `/blog/:slug`)
- Admin endpoints for management

---

## 🎨 Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **CSS Custom Properties** for theming
- **Dark mode** by default
- **Responsive design** with mobile-first approach

---

## 🔐 Authentication

The app includes:
- JWT-based authentication
- Protected routes
- Role-based access (admin/customer)
- Persistent login state

---

## 💳 Payment Integration

- **Stripe** integration for secure payments
- Shopping cart functionality
- Order management
- Download links for digital products

---

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

---

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

Popular deployment options:
- **Vercel** (recommended for React apps)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Kartik Singh**
- GitHub: [@kartik-singhhh03](https://github.com/kartik-singhhh03)
- LinkedIn: [Kartik Singh](https://www.linkedin.com/in/kartik-singh-879b6b288/)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors