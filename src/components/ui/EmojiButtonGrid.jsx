import React from 'react';
import EmojiButton from '../form/EmojiButton'
import { useEffect, useState } from 'react';
import emojiData from '../../data/emojis.json';

function EmojiButtonGrid(props) {
    const { onEmojiClick } = props;

    const [unicodeData, setUnicodeData] = useState([]);

    useEffect(() => {
        const data = Object.keys(emojiData).map((key, index) => ({
            id: index + 1,
            unicode: key,
            alt: emojiData[key]
        }));
        setUnicodeData(data);
    }, []);
    
    return (
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
            {unicodeData.map((item) => (
                <EmojiButton
                    key={item.id}
                    unicode={item.unicode}
                    alt={item.alt}
                    buttonColor="bg-gray-200 hover:bg-green-100"
                    onClick={() => onEmojiClick(item.unicode)}
                />
            ))}
        </div>
    );
}

export default EmojiButtonGrid;