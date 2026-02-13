import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo.png'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white p-1 shadow-sm ring-2 ring-white/10">
              <img src={logo} alt="GTVET Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-xl">GTVET Information Portal</h1>
              <p className="text-xs text-gray-300">Ghana Technical & Vocational Education</p>
            </div>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-secondary transition-colors text-sm font-medium">Home</Link>
            <Link to="/institutions" className="hover:text-secondary transition-colors text-sm font-medium">Institutions</Link>
            <Link to="/programs" className="hover:text-secondary transition-colors text-sm font-medium">Programs</Link>
            <Link to="/announcements" className="hover:text-secondary transition-colors text-sm font-medium">News</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors text-sm font-medium">Contact</Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-primary/80 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3 border-t border-white/20 pt-4">
            <Link to="/" className="hover:text-secondary transition-colors text-sm font-medium">Home</Link>
            <Link to="/institutions" className="hover:text-secondary transition-colors text-sm font-medium">Institutions</Link>
            <Link to="/programs" className="hover:text-secondary transition-colors text-sm font-medium">Programs</Link>
            <Link to="/announcements" className="hover:text-secondary transition-colors text-sm font-medium">News</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors text-sm font-medium">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
