import React from 'react';

function Button(props) {
    const { onClick, buttonColor, placeholderText, disabled, className } = props

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${disabled ? 'bg-gray-400 curson-not-allowed' : buttonColor} font-galindo font-bold py-3 rounded-md focus:outline-none ${className}`}
        >
            {placeholderText}
        </button>
    );
}
export default Button;