import { FileCheck, MessageSquare, BarChart3, Shield, Radio, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function ServicesPage() {
  const services = [
    {
      title: 'Licensing Services',
      icon: FileCheck,
      description: 'Apply for and manage telecommunications, broadcasting, and spectrum licenses.',
      features: [
        'Online application submission',
        'Real-time status tracking',
        'Digital document management',
        'Automated renewal reminders',
      ],
      link: '/licensing',
      color: 'bg-blue-600',
    },
    {
      title: 'Complaint Resolution',
      icon: MessageSquare,
      description: 'Submit complaints about service providers and track resolution progress.',
      features: [
        '24/7 complaint submission',
        'Transparent resolution timeline',
        'Automated status updates',
        'Direct communication with staff',
      ],
      link: '/complaints',
      color: 'bg-green-600',
    },
    {
      title: 'Quality of Service Monitoring',
      icon: BarChart3,
      description: 'Access real-time data on network performance and service quality metrics.',
      features: [
        'Coverage maps and analytics',
        'Network performance reports',
        'Service quality benchmarks',
        'Comparative provider analysis',
      ],
      link: '/dashboard',
      color: 'bg-purple-600',
    },
    {
      title: 'Regulatory Compliance',
      icon: Shield,
      description: 'Stay informed about regulatory requirements and compliance standards.',
      features: [
        'Regulatory guidelines',
        'Compliance checklists',
        'Industry standards',
        'Legal framework documents',
      ],
      link: '/services',
      color: 'bg-orange-600',
    },
    {
      title: 'Spectrum Management',
      icon: Radio,
      description: 'Apply for spectrum licenses and access frequency allocation information.',
      features: [
        'Spectrum availability checker',
        'Frequency allocation database',
        'Interference reporting',
        'Technical coordination',
      ],
      link: '/licensing',
      color: 'bg-indigo-600',
    },
    {
      title: 'Device Registration',
      icon: Smartphone,
      description: 'Register and verify telecommunications devices for compliance.',
      features: [
        'Device type approval',
        'IMEI registration',
        'Compliance verification',
        'Stolen device reporting',
      ],
      link: '/services',
      color: 'bg-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#004d99] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Regulatory Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Comprehensive digital services for telecommunications and broadcasting regulation in Botswana
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`${service.color} p-6`}>
                <service.icon size={40} className="text-white" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <ArrowRight size={16} className="text-[#003366] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[#003366] font-medium hover:underline"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Assistance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is ready to help you navigate our services and answer your questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#0095DA] text-white rounded-md font-medium hover:bg-[#0077B3] transition-colors"
            >
              Contact Support
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-[#0095DA] text-[#0095DA] rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}