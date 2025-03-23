import { useState } from "react";

const Accordian = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="mb-4 border rounded-lg shadow-sm">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex items-center justify-between w-full p-6 transition-colors hover:bg-gray-50"
          >
            <h3 className="text-lg font-medium text-left text-gray-900">
              {item.section}
            </h3>
            <svg
              className={`w-6 h-6 transform transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 pt-0 text-gray-600">
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 pl-5">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordian;
