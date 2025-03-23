import React from "react";

const Contact = () => {
  return (
    <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(./src/assets/user-login-bg.webp)] bg-cover bg-center bg-blend-luminosity">
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-5 mb-5">
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-green-600 mb-4">
            Contact Us
          </h2>
        </header>

        {/* Location Section */}
        <section className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-orange-500">
              Where to Find Us
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg font-medium text-gray-800 mb-3">
                Slade Gardens Adventure Playground
              </p>
              <address className="not-italic text-gray-600 leading-relaxed">
                73 A & B Stockwell Park Road
                <br />
                London
                <br />
                SW9 0DA
              </address>
            </div>
            <div className="md:text-left flex flex-col">
              <div className="hidden md:block"></div>
              <div className="space-y-2 mt-1">
                <p className="text-gray-600 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <a
                    href="tel:02077373829"
                    className="text-green-600 hover:underline"
                  >
                    0207 737 3829
                  </a>
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  <a
                    href="mailto:sladeadventure@btinternet.com"
                    className="text-green-600 hover:underline"
                  >
                    sladeadventure@btinternet.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="my-8 border-2 border-green-200 rounded-full"></div>

        {/* Opening Hours Section */}
        <section className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-orange-500">
              Term Time Opening Hours
            </h3>
          </div>

          <div className="space-y-6">
            {/* Adventure Playground */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-green-600">
                Adventure Playground
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center max-w-md">
                  <span className="text-gray-600">Monday to Friday</span>
                  <span className="font-bold text-gray-800">15:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center max-w-md">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-bold text-gray-800">11:00- 16:00</span>
                </div>
              </div>
            </div>

            {/* Under 5s Section */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-green-600">
                Under 5s Stay & Play
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center max-w-md">
                  <span className="text-gray-600">Wednesday to Friday</span>
                  <span className="font-bold text-gray-800">10:00 - 13:00</span>
                </div>
              </div>
            </div>

            {/* Volunteers Section */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-green-600 mb-3">
                Family Garden Volunteers
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center max-w-md">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-bold text-gray-800">11:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="my-8 border-2 border-green-200 rounded-full"></div>

        {/* Contact Form Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-orange-500">
              Get In Touch
            </h3>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-green-600">
                Your Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Full name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-green-600">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="name@domain.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-green-600">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
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
    </div>
  );
};

export default Contact;
