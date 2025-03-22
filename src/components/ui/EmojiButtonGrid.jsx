import React from 'react';
import EmojiButton from '../form/EmojiButton'

function EmojiButtonGrid(props) {
    const { onEmojiClick } = props;

    const unicodeData = [
        { id: 1, unicode: '🍌', alt: 'Banana' },
        { id: 2, unicode: '🕶️', alt: 'Sunglasses' },
        { id: 3, unicode: '⏰', alt: 'Clock' },
        { id: 4, unicode: '✈️', alt: 'Airplane' },
        { id: 5, unicode: '🪴', alt: 'Plant' },
        { id: 6, unicode: '🍗', alt: 'Chicken' },
        { id: 7, unicode: '👕', alt: 'Shirt' },
        { id: 8, unicode: '⭐', alt: 'Star' },
        { id: 9, unicode: '🥄', alt: 'Spoon' },
        { id: 10, unicode: '📦', alt: 'Box' },
        { id: 11, unicode: '👢', alt: 'Boots' },
        { id: 12, unicode: '🌳', alt: 'Tree' },
        { id: 13, unicode: '🧸', alt: 'Teddy Bear' },
        { id: 14, unicode: '🚗', alt: 'Car' },
        { id: 15, unicode: '🍕', alt: 'Pizza' },
        { id: 16, unicode: '🎺', alt: 'Trumpet' },
    ];

    return (
        <div className="grid grid-cols-8 gap-4 p-4">
            {unicodeData.map((item) => (
                <EmojiButton
                    key={item.id}
                    unicode={item.unicode}
                    alt={item.alt}
                    buttonColor="bg-white hover:bg-green-100"
                    className="transition duration-200"
                    onClick={() => onEmojiClick(item.unicode)}
                />
            ))}
        </div>
    );
}

export default EmojiButtonGrid;