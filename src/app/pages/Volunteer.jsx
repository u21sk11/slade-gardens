import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input.jsx';
import { useNavigate } from 'react-router-dom';

function VolunteerPage() {
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const navigate = useNavigate();

    const isButtonDisabled = email === '' || organization === '';

    const handleSubmit = (e) => {
        e.preventDefault();
        const mockDatabase = [
            { email: 'nikhil.sengupta@gmail.com', organization: 'lbg' },
        ];

        const user = mockDatabase.find(
            u => u.email === email && u.organization === organization
        );

        if (user) {
            navigate('/admin/login-success');
        }
    };

    return (
        <div className="flex h-full w-full flex-col bg-white text-sladeOrange items-center justify-center max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-5">
            <div>
                <h1 className="text-3xl font-galindo font-bold text-center mb-10">
                    Volunteer check-in
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-lg bg-white"
            >
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-4 w-full"
                />
                <Input
                    id="organization"
                    label="Organisation"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    required
                    className="mb-4 w-full"
                />
                <Button
                    type="submit"
                    buttonColor="bg-sladeGreen"
                    onClick={handleSubmit}
                    placeholderText="OK"
                    disabled={isButtonDisabled}
                    className={`w-full ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sladeGreen-dark'} text-white text-xl mt-6`}
                />
            </form>
        </div>
    );
}

export default VolunteerPage;