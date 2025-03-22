import React from 'react';

function Input(props) {
    const { id, label, value, onChange, required, className } = props

    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-gray-700">
                {label}
            </label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                className={`p-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
                required={required}
            />
        </div>
    );
};

export default Input;