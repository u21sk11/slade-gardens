import React from 'react';

function BackButton(props) {
    const { onClick, buttonColor, className } = props;

    return (
        <button
            onClick={onClick}
            type="button"
            className={`${buttonColor} border text-white font-galindo border-red-400 p-4 flex items-center justify-center rounded text-2xl ${className}`}
        >
            ❮
        </button>
    );
}

export default BackButton;