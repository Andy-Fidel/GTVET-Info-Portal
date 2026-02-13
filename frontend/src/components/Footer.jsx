export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">About GTVET</h3>
            <p className="text-sm">Gateway to Technical and Vocational Education and Training in Ghana</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/institutions" className="hover:text-white">Institutions</a></li>
              <li><a href="/programs" className="hover:text-white">Programs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <p className="text-sm">Email: infoportal@gtvets.gov.gh</p>
            <p className="text-sm">Phone: +233 53 110 0571</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2026 Ghana TVET Service Information Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
