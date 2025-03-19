import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
        Contact Us
      </h2>

      {/* Opening Hours Section */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-orange-500 mb-4">Term Time Opening Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold text-green-600 mb-2">Adventure Playground</h4>
            <p className="text-gray-600">
              Monday to Friday: <strong>15.00 – 18.00</strong>
              <br />
              Saturday: <strong>11.00 – 16.00</strong>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-green-600 mb-2">Under 5s Stay & Play</h4>
            <p className="text-gray-600">
              Wednesday to Friday: <strong>10.00 – 13.00</strong>
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-xl font-semibold text-green-600 mb-2">Family Garden Volunteers</h4>
          <p className="text-gray-600">
            Saturday: <strong>11.00 – 14.00</strong>
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-orange-500 mb-4">Where to Find Us</h3>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-gray-600 font-semibold">
            Slade Gardens Adventure Playground
          </p>
          <p className="text-gray-600">
            73 A & B Stockwell Park Road,
            <br />
            London SW9 0DA
          </p>
          <p className="text-gray-600 mt-2">
            Phone: <a href="tel:02077373829" className="text-blue-500 hover:underline">0207 737 3829</a>
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:sladeadventure@btinternet.com" className="text-blue-500 hover:underline">sladeadventure@btinternet.com</a>
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section>
        <h3 className="text-2xl font-semibold text-orange-500 mb-4">Get in Touch</h3>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-600 font-semibold mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;