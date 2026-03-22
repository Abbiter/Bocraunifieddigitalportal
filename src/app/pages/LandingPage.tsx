import { FileText, MessageSquare, Search, Smartphone, CheckCircle, Signal, FileCheck, Clock } from 'lucide-react';
import { QuickAccessCard } from '../components/QuickAccessCard';
import { StatCard } from '../components/StatCard';

export function LandingPage() {
  const quickAccessItems = [
    {
      title: 'Submit Complaint',
      description: 'File a complaint about telecommunications or broadcasting services',
      icon: MessageSquare,
      link: '/complaints',
      color: 'bg-blue-600',
    },
    {
      title: 'Apply for License',
      description: 'Start your licensing application process online',
      icon: FileText,
      link: '/licensing',
      color: 'bg-green-600',
    },
    {
      title: 'Track Application',
      description: 'Check the status of your submissions using tracking ID',
      icon: Search,
      link: '/tracking',
      color: 'bg-purple-600',
    },
    {
      title: 'Check Device Registration',
      description: 'Verify if your device is registered and compliant',
      icon: Smartphone,
      link: '/services',
      color: 'bg-orange-600',
    },
  ];

  const statistics = [
    { label: 'Complaints Resolved', value: '4,523', icon: CheckCircle },
    { label: 'Network Coverage', value: '96.8%', icon: Signal },
    { label: 'Active Licenses', value: '1,247', icon: FileCheck },
    { label: 'Avg Response Time', value: '2.3 days', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#004d99] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unified Digital Platform for Communications Regulation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Streamlining regulatory services for telecommunications, broadcasting, and postal sectors in Botswana
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessItems.map((item) => (
            <QuickAccessCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="font-bold text-xl text-gray-900 mb-3">Licensing Services</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Apply for and manage telecommunications, broadcasting, and spectrum licenses through our streamlined digital platform.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Online application submission</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Real-time status tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Document management</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="font-bold text-xl text-gray-900 mb-3">Complaint Resolution</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Submit and track complaints about service providers, network quality, billing disputes, and other regulatory matters.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>24/7 complaint submission</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Transparent resolution process</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Automated notifications</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="font-bold text-xl text-gray-900 mb-3">Regulatory Monitoring</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Access real-time data on network coverage, service quality metrics, and regulatory compliance information.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Coverage maps and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Quality of service reports</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                <span>Compliance dashboards</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#003366] to-[#004d99] rounded-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Our support team is available to help you navigate regulatory requirements and platform features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#003366] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-[#003366] transition-colors"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
