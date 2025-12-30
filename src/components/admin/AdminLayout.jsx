import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Image,
  Info,
  Phone,
  LogOut,
  Menu,
  X,
  MapPin,
  Award,
  Heart,
  Newspaper,
  Wrench,
  Building2,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/customers', label: 'Customers', icon: User },
    { path: '/admin/brands', label: 'Brands', icon: Building2 },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/sister-companies', label: 'Sister Companies', icon: Building2 },
    { path: '/admin/product-types', label: 'Product Types', icon: Layers },
    { path: '/admin/hero-images', label: 'Hero Images', icon: Image },
    { path: '/admin/about-us', label: 'About Us', icon: Info },
    { path: '/admin/contact-info', label: 'Contact Info', icon: Phone },
    { path: '/admin/locations', label: 'Locations', icon: MapPin },
    { path: '/admin/testimonials', label: 'Testimonials', icon: User },
    { path: '/admin/csr-initiatives', label: 'CSR Initiatives', icon: Award },
    { path: '/admin/csr-hero', label: 'CSR Hero', icon: Heart },
    { path: '/admin/news-media', label: 'News & Media', icon: Newspaper },
    { path: '/admin/gallery', label: 'Gallery', icon: Image },
    { path: '/admin/spare-parts', label: 'Spare Parts', icon: Wrench },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-56 lg:w-64' : 'w-0'
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden fixed h-full z-20 flex flex-col`}
      >
        <div className="p-4 lg:p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h1 className="text-xl lg:text-2xl font-bold">Admin Panel</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4">
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all mt-8 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-56 lg:ml-64' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-lg font-semibold text-accent">
                Autoways
            </Link>
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
