import React from 'react';

function EmojiButton(props) {
    const { onClick, unicode, buttonColor, className } = props;

    return (
        <button
            onClick={onClick}
            type="button"
            className={`${buttonColor} border border-gray-400 p-4 flex items-center justify-center rounded-xl text-3xl ${className}`}
        >
            {unicode}
        </button>
    );
}

export default EmojiButton;