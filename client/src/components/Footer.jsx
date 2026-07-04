const Footer = () => (
  <footer className="mt-16 text-gray-300 bg-gray-900">
    <div className="grid grid-cols-1 gap-8 px-4 py-10 mx-auto max-w-7xl md:grid-cols-4">
      <div>
        <h3 className="mb-2 text-xl font-bold text-white">ShopVerse</h3>
        <p className="text-sm text-gray-400">Your one-stop shop for everything you love, delivered fast.</p>
      </div>
      <div>
        <h4 className="mb-2 font-semibold text-white">Shop</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>Electronics</li>
          <li>Fashion</li>
          <li>Home & Kitchen</li>
          <li>Furniture</li>
        </ul>
      </div>
      <div>
        <h4 className="mb-2 font-semibold text-white">Support</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>Contact Us</li>
          <li>Shipping Info</li>
          <li>Returns</li>
          <li>FAQs</li>
        </ul>
      </div>
      <div>
        <h4 className="mb-2 font-semibold text-white">Payments</h4>
        <p className="text-sm text-gray-400">Secured by Razorpay. Images hosted on Cloudinary.</p>
      </div>
    </div>

    <div className="border-t border-gray-800">
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-6 mx-auto text-center max-w-7xl">
        <div className="flex items-center gap-5 text-lg">
          <a href="https://github.com/Saksham9934" target="_blank" rel="noreferrer" title="GitHub" className="transition hover:text-white">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/saksham-jha-141623275/" target="_blank" rel="noreferrer" title="LinkedIn" className="transition hover:text-white">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://t.me/Saksham3027" target="_blank" rel="noreferrer" title="Telegram" className="transition hover:text-white">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="mailto:sakshamjha3027@gmail.com" title="Email" className="transition hover:text-white">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <p className="text-xs text-gray-500">&copy; 2026 ShopVerse | Developed by Saksham Jha.</p>
      </div>
    </div>
  </footer>
);

export default Footer;