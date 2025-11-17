# Marketly - Premium Digital Marketplace

A full-stack marketplace platform for buying and selling digital businesses, built with Next.js 14, Prisma, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Email/password and Google OAuth
- **Listings System**: Create, browse, and manage digital business listings
- **Offers System**: Make offers, accept/reject, and track status
- **Real-time Chat**: Communicate with buyers/sellers
- **Role-based Access**: Buyer, Seller, and Admin roles
- **Dashboards**: Separate dashboards for buyers and sellers
- **Premium UI**: Modern, responsive design with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS with custom color palette
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth v5
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: SWR
- **File Uploads**: UploadThing
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- npm or yarn

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Marketly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:5432/marketly?sslmode=require"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # OAuth (Optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""

   # UploadThing
   UPLOADTHING_SECRET=""
   UPLOADTHING_APP_ID=""

   # Pusher (for real-time chat)
   PUSHER_APP_ID=""
   PUSHER_KEY=""
   PUSHER_SECRET=""
   PUSHER_CLUSTER=""
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- Primary: `#85B8A0`
- Secondary: `#CFE8DD`
- Accent: `#E7C8C7`
- Background: `#F5F3F0`
- Text: `#111111`

### Fonts
- Poppins (headings)
- Inter (body)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (site)/            # Public site routes
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── buyer/             # Buyer dashboard
│   ├── seller/            # Seller dashboard
│   ├── admin/             # Admin dashboard
│   ├── listings/          # Listings pages
│   └── chat/              # Chat pages
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Layout components
│   ├── listings/         # Listing components
│   ├── offers/           # Offer components
│   └── chat/             # Chat components
├── lib/                  # Utility functions
├── prisma/               # Prisma schema
└── public/               # Static assets
```

## 🔐 Authentication

The app uses NextAuth v5 with:
- Email/password authentication
- Google OAuth (optional)
- JWT sessions
- Role-based access control

## 📝 Database Schema

Key models:
- **User**: Users with roles (BUYER, SELLER, ADMIN)
- **Listing**: Digital business listings
- **Offer**: Offers made on listings
- **Conversation**: Chat conversations
- **Message**: Chat messages
- **Notification**: User notifications
- **SavedListing**: Saved listings by users

## 🚧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio

### Creating a Seller Account

1. Register a new account (defaults to BUYER role)
2. Navigate to your profile
3. Click "Become a Seller"
4. Fill out the seller application form
5. Your role will be updated to SELLER

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the project owner for contribution guidelines.


