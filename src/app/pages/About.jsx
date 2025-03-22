import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5">
      {/* Updated h4 with smaller text size */}
      <h4 className="text-2xl font-bold text-center text-green-600 mb-8">
        Our Adventure Playground offers over an acre of safe, staffed space where children & young people can come to play, make new friends, develop skills & try new things.
      </h4>

      {/* Hero Image Section */}
      <div className="w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden flex items-center justify-center mb-8">
        <img
          className="w-full h-full object-cover"
          src="./src/assets/slade-about-1.webp"
          alt="Slade Gardens Adventure Playground"
        />
      </div>

      {/* Beliefs Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">We Believe</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Children thrive with positive social interactions.</li>
          <li>Play helps children develop responsibility through risk.</li>
          <li>Children who can play freely develop strong social skills and positive connections with others in their community.</li>
          <li>Children need space to take responsibility, explore, and challenge themselves.</li>
        </ul>
      </section>

      {/* Programs Section with Image */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">Our Programs</h2>
            <p className="text-gray-600 mb-4">
              We also have a <strong>Under 5s Stay and Play</strong> program, community volunteer days in our edible garden, corporate volunteer opportunities, 17-21 employment and training programs, and rent our premises for parties.
            </p>
          </div>
          <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="./src/assets/slade-about-3.webp"
              alt="Slade Gardens Adventure Playground"
            />
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="./src/assets/slade-about-4.webp"
              alt="Slade Gardens Adventure Playground"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We believe that children in the borough of Lambeth between the ages of one and twenty-one have the right to play freely and safely in a healthy outdoor environment. We believe such activity is important to their social, mental, and physical well-being and as such contributes to their present and future lives.
            </p>
          </div>
        </div>
      </section>

      {/* Child-Led Play Section with Image */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">We Believe in Child-Led Play</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">
              At Slade Gardens, we prioritize child-led play, allowing children to explore, create, and learn at their own pace. This approach fosters independence, creativity, and a love for learning.
            </p>
          </div>
          <div className="w-full h-48 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="./src/assets/slade-about-2.webp"
              alt="Slade Gardens Adventure Playground"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;