import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">Get in touch with BOCRA for support and inquiries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Physical Address</h3>
                    <p className="text-gray-600">Plot 50654, Fairgrounds Office Park</p>
                    <p className="text-gray-600">Gaborone, Botswana</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Phone Numbers</h3>
                    <p className="text-gray-600">Main: +267 395 7755</p>
                    <p className="text-gray-600">Complaints Hotline: +267 395 7789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email Addresses</h3>
                    <p className="text-gray-600">General: info@bocra.org.bw</p>
                    <p className="text-gray-600">Licensing: licensing@bocra.org.bw</p>
                    <p className="text-gray-600">Complaints: complaints@bocra.org.bw</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-[#003366]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 7:30 AM - 4:30 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-2">Quick Support</h3>
              <p className="text-sm text-gray-700 mb-4">
                For immediate assistance with urgent matters, please use our digital services:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Track your submission status online</li>
                <li>• Submit complaints 24/7 through the portal</li>
                <li>• Access your dashboard for updates</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="+267 7XXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent resize-none"
                  placeholder="Provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#003366] text-white px-6 py-3 rounded-md font-medium hover:bg-[#004d99] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
