# Task Manager - Next.js Redux CRUD Application

A modern, production-ready task management application built with Next.js and Redux, featuring a clean UI and persistent storage.

## 🚀 Technologies Used

### Core Technologies

- **Next.js 14** - React framework for production

  - Server-side rendering capabilities
  - File-based routing
  - Built-in optimization features
  - TypeScript support out of the box

- **TypeScript** - Adds static typing to JavaScript

  - Enhanced developer experience
  - Better code maintainability
  - Reduced runtime errors
  - Improved IDE support

- **React-Redux** - State management
  - Centralized application state
  - Predictable state updates
  - DevTools for debugging
  - Simplified Redux logic

### UI and Styling

- **Tailwind CSS** - Utility-first CSS framework

  - Rapid UI development
  - Highly customizable
  - Built-in responsive design
  - Zero runtime overhead

- **shadcn/ui** - UI component library

  - Accessible components
  - Customizable design system
  - Built on Radix UI primitives
  - Seamless Tailwind integration

- **Lucide React** - Icon library
  - Modern, clean SVG icons
  - Tree-shakeable
  - Consistent design language

### Features and Utilities

- **Local Storage** - Client-side data persistence

  - Tasks persist between page reloads
  - Offline capability
  - No backend required

- **Sonner** - Toast notifications
  - Clean, minimal design
  - Accessible notifications
  - Customizable positioning

### Developer Tools

- **ESLint** - Code linting

  - Consistent code style
  - Error prevention
  - Best practices enforcement

- **PostCSS** - CSS processing
  - Autoprefixer for cross-browser compatibility
  - Tailwind CSS processing
  - Modern CSS features

## 🌟 Key Features

- Create, Read, Update, and Delete tasks
- Mark tasks as complete/incomplete
- Persistent storage across page reloads
- Confirmation dialogs for destructive actions
- Toast notifications for user feedback
- Responsive design
- Keyboard accessible
- Dark mode support

## 🛠️ Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # Redux & Toast providers
├── components/          # React components
│   ├── TaskForm.tsx     # Task creation form
│   └── TaskList.tsx     # Task list with CRUD
├── lib/                 # Application logic
│   └── store/          # Redux store
│       ├── store.ts    # Store configuration
│       └── tasksSlice.ts # Tasks reducer
└── public/             # Static assets
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 🔒 Security

- Input validation
- Confirmation for destructive actions
- Safe state management
- Type-safe operations

## 🎨 UI/UX Features

- Clean, modern interface
- Intuitive task management
- Immediate feedback via toasts
- Smooth transitions
- Accessible design

## 🔄 State Management

Redux is used for state management with the following features:

- Centralized store
- Action creators
- Reducers
- Local storage persistence
- Type-safe state updates

## 📦 Future Enhancements

Potential areas for expansion:

- Backend integration
- User authentication
- Task categories
- Due dates
- Priority levels
- Search functionality
- Filters and sorting
- Data export/import
