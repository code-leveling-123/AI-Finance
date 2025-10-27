import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  Shield,
  Zap,
  Camera,
  BarChart,
  Check,
  Menu,
  X,
  Coins,
} from "lucide-react";

const HomePage = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Responsive Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Changed to Wallet icon */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                FinanceFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it Works
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => onNavigate("login")}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-3">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it Works
              </a>

              <div className="pt-3 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate("login");
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate("signup");
                  }}
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Take control of your finances
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Track expenses, set budgets and achieve your financial goals with
              intelligent insights and simple tools.
            </p>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">
                    Total Balance
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                    12,750
                  </div>
                  <div className="text-xs text-green-600 mt-1">+12.5%</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">
                    Monthly Savings
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                    1,850
                  </div>
                  <div className="text-xs text-green-600 mt-1">+8.2%</div>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                <div className="text-sm font-medium text-gray-900 mb-4">
                  Spending Overview
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Food & Dining</span>
                      <span className="text-gray-900 font-medium">
                        <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                        450
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Shopping</span>
                      <span className="text-gray-900 font-medium">
                        <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                        100
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Transport</span>
                      <span className="text-gray-900 font-medium">
                        <span dangerouslySetInnerHTML={{ __html: "&#8377;" }} />
                        180
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Grid Layout */}
      <section id="features" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to manage your money
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Simple tools. Powerful insights. Complete control.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Receipt Scanner
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Snap a photo of your receipt and automatically extract
                transaction details with AI.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize your spending patterns with clear charts and
                actionable insights.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Budget Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Set spending limits and get real-time alerts when you're
                approaching your budget.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Bank-Level Security
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is encrypted and protected with industry-standard
                security measures.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Assistant
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized financial advice and answers to your money
                questions instantly.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Export Reports
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download detailed financial reports in PDF or Excel format for
                your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Create your account
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sign up in seconds with your email. No credit card required
                  for the free trial.
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Add your transactions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Manually enter transactions or use our AI-powered receipt
                  scanner to capture expenses instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Track and optimize
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get insights, set budgets, and watch your financial health
                  improve month over month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  FinanceFlow
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Simple and powerful financial management for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 FinanceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
