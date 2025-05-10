'use client';

import React, {useState} from 'react';
import {usePetOwnerRegistration} from "app/webapp/admin/registration/hook";


export default function PetOwnerRegistrationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        streetAddress: '',
        cityAddress: '',
        stateAddress: '',
        emergencyPhoneNumber: ''
    });


    const {registerPetOwner, isLoading, error} = usePetOwnerRegistration();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await registerPetOwner(formData);
            console.log('Registration successful:', response);
            // Handle success (show success message, redirect, etc.)
        } catch (err) {
            console.error('Registration failed:', err);
            // Handle error (show error message)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Your form fields */}
            <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
            />
            {/* Add other input fields similarly */}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>

            {error && <div className="error">{error}</div>}
        </form>
    );
}
