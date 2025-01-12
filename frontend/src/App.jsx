// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import './App.css'; // Import the CSS file

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         <header className="title">
//           <h1>Chat-Famaly</h1>
//         </header>
//         <nav className="navbar">
//           <Link to="/register">Register</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/dashboard">Dashboard</Link>
//         </nav>
//         <div className="content">
//           <Routes>
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;













// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const MenuIcon = () => (
//   <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// );

// function AnimatedRoutes() {
//   const location = useLocation();
  
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.3 }}
//         className="w-full h-full"
//       >
//         <Routes location={location}>
//           <Route path="/" element={<Navigate to="/register" replace />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         {/* Header */}
//         <header className="bg-pink shadow-md">
//           <div className="container flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link to="/" className="text-2xl font-bold text-blue-600">
//                 Chat-Famaly
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <div className="flex space-x-8">
//                 <Link 
//                   to="/register" 
//                   className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
//                 >
//                   Register
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/dashboard" 
//                   className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
//                 >
//                   Dashboard
//                 </Link>
//               </div>
//             </nav>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
//             >
//               <MenuIcon />
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//             <div className="container px-2 pt-2 pb-3 space-y-1">
//               <Link 
//                 to="/register" 
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Register
//               </Link>
//               <Link 
//                 to="/login" 
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link 
//                 to="/dashboard" 
//                 className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1">
//           <div className="container mx-auto px-4 py-8">
//             <AnimatedRoutes />
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="bg-white shadow-md mt-auto">
//           <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">About Us</h3>
//                 <p className="text-gray-600">Connect with family and friends through our secure chat platform.</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
//                 <ul className="space-y-2">
//                   <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
//                   <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
//                   <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</Link></li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
//                 <div className="flex space-x-4">
//                   <a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a>
//                   <a href="#" className="text-gray-600 hover:text-blue-600">Facebook</a>
//                   <a href="#" className="text-gray-600 hover:text-blue-600">Instagram</a>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600">
//               <p>© 2023 Chat-Famaly. All rights reserved.</p>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;















import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTitleClick = () => {
    setShowEmail(!showEmail);
  };

  return (
    <Router>
      <div className="app min-h-screen flex flex-col overflow-hidden">
        <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo/Title */}
              <h1 
                onClick={handleTitleClick} 
                className="text-2xl md:text-3xl font-bold cursor-pointer bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent"
              >
                Chat_Famaly
              </h1>
  
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link 
                  to="/register" 
                  className="text-white hover:text-pink-400 transition-colors duration-200 font-medium"
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="text-white hover:text-violet-400 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
              </nav>
  
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>
            </div>
  
            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <nav className="md:hidden mt-4 pb-4">
                <Link 
                  to="/register" 
                  className="block py-2 text-white hover:bg-gray-700 px-4 rounded"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="block py-2 text-white hover:bg-gray-700 px-4 rounded"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </nav>
            )}
          </div>
        </header>
  
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
  
}

export default App;
