import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          WebinarPro
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>

          <Link href="/#webinars" className="hover:text-primary transition">
            Webinars
          </Link>

          <Link href="/#about" className="hover:text-primary transition">
            About
          </Link>

          <Link href="/admin/dashboard" className="hover:text-primary transition">
            Admin
          </Link>

           <Link href="/login" className="hover:text-primary transition">
            Login
          </Link>
        </div>

        
      </div>
    </nav>
  )
}
