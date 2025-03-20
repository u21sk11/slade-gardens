import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-14">
      <header className="mb-14 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Contact Slade Gardens
        </h2>
        <div className="h-1 bg-gradient-to-r from-orange-400 to-green-500 w-24 mx-auto rounded-full" />
      </header>

    {/* Opening Hours Section */}
    <section className="mb-14">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-orange-500">Term Time Opening Hours</h3>
      </div>

      <div className="space-y-8">
        {/* Adventure Playground */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-600">Adventure Playground</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center max-w-md">
              <span className="text-gray-600">Monday to Friday</span>
              <span className="font-medium text-green-700">3:00 PM - 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center max-w-md">
              <span className="text-gray-600">Saturday</span>
              <span className="font-medium text-green-700">11:00 AM - 4:00 PM</span>
            </div>
          </div>
        </div>

        {/* Under 5s Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-green-600">Under 5s Stay & Play</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center max-w-md">
              <span className="text-gray-600">Wednesday to Friday</span>
              <span className="font-medium text-green-700">10:00 AM - 1:00 PM</span>
            </div>
          </div>
        </div>

        {/* Volunteers Section */}
        <h4 className="text-lg font-semibold text-green-600 mb-3">Family Garden Volunteers</h4>
          <div className="flex justify-between items-center max-w-md">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium text-green-700">11:00 AM - 2:00 PM</span>
        </div>
      </div>
    </section>

      <div className="my-12 border-2 border-green-200 rounded-full"></div>

      {/* Location Section */}
      <section className="mb-14">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-orange-500">Where to Find Us</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg font-medium text-gray-800 mb-3">Slade Gardens Adventure Playground</p>
            <address className="not-italic text-gray-600 leading-relaxed">
              73 A & B Stockwell Park Road<br />
              London<br />
              SW9 0DA
            </address>
          </div>
          
          <div className="md:text-left flex flex-col">
            <div className="hidden md:block h-[3.25rem]"></div>
            <div className="space-y-2 mt-1">
              <p className="text-gray-600">
                Phone: <a href="tel:02077373829" className="text-green-600 hover:underline">0207 737 3829</a>
              </p>
              <p className="text-gray-600">
                Email: <a href="mailto:sladeadventure@btinternet.com" className="text-green-600 hover:underline">sladeadventure@btinternet.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="my-12 border-2 border-green-200 rounded-full"></div>

      {/* Contact Form Section */}
      <section>
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-orange-500">Get In Touch</h3>
        </div>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-green-600">Your Name</label>
            <input
              type="text"
              className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Full name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-green-600">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="name@domain.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-green-600">Message</label>
            <textarea
              rows="4"
              className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="How can we help?"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-800 font-medium shadow-sm"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;