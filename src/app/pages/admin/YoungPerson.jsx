import React, { useState } from 'react';
import EmojiButtonGrid from '../../../components/ui/EmojiButtonGrid';
import Button from '../../../components/form/Button';
import BackButton from '../../../components/form/BackButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function YoungPerson() {
    const [inputs, setInputs] = useState(['', '', '']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleEmojiClick = (emoji) => {
        if (currentIndex < 3) {
            const newInputs = [...inputs];
            newInputs[currentIndex] = emoji;
            setInputs(newInputs);
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handleBackOnClick = () => {
        if (currentIndex > 0) {
            const newInputs = [...inputs];
            newInputs[currentIndex - 1] = '';
            setInputs(newInputs);
            setCurrentIndex(currentIndex - 1);
        }

        if (error) {
            setError("")
        }
    }

    const isButtonDisabled = inputs.some(input => input === '');

    const handleGoBack = () => {
        navigate("/admin");
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        const password = inputs.join('');
        const mockDatabase = [
            { firstName: 'Nikhil', lastName: 'Sengupta', password: '⭐⭐⭐' },
        ];

        const user = mockDatabase.find(
            u => u.password === password
        );

        if (user) {
            navigate('/admin/young-person-confirm', { state: { firstName: user.firstName, lastName: user.lastName } });
        } else {
            setError('Oh no! We cannot find you!');
        }
    };


    return (
        <>
        <div className="min-h-[60vh] flex items-center justify-center py-5">
        {/* <div className="min-h-[60vh] flex flex-col bg-white flex-grow text-sladeOrange items-center justify-center"> */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
            <div>
                <h1 className="text-3xl font-galindo font-bold text-sladeOrange text-center mb-1">Adventure Playground</h1>
                <h1 className="text-3xl font-galindo font-bold text-sladeOrange-light text-center">Login / Logout</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <div className="flex space-x-4 justify-center items-center">
                        {inputs.map((input, index) => (
                            <div
                                key={index}
                                className="w-16 h-16 border border-gray-400 flex items-center justify-center bg-white text-2xl rounded-xl"
                            >
                                {input}
                            </div>
                        ))}
                        <BackButton buttonColor="bg-sladeRed" onClick={handleBackOnClick} />
                    </div>
                    {error && <p className="text-red-500 text-center font-semibold font-monserrat mt-4">{error}</p>}
                </div>
                <div className="mt-6">
                    <EmojiButtonGrid onEmojiClick={handleEmojiClick} />
                </div>
                <Button type="submit" buttonColor="bg-sladeGreen" placeholderText="OK" disabled={isButtonDisabled} className={`${isButtonDisabled ? '' : "hover:bg-sladeGreen-dark"} w-full text-white text-xl mt-10`} />
            </form>
            <div className="flex justify-center mt-3">
                <Link to="/privacy-policy" className="text-gray-700 font-monserrat underline underline-offset-1 hover:text-gray-900">
                    Log in with your name instead
                </Link>
            </div>
        </div>
    </div>

        <div className="flex justify-center items-center p-3">
        <button
          onClick={handleGoBack}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
        >
          Go Back
        </button>
      </div>
    </>
    );
}

export default YoungPerson;