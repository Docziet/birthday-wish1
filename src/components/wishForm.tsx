import React, { useState, FormEvent } from 'react';

interface WishFormData {
    guestName: string;
    wishMessage: string;
}

const WishForm: React.FC = () => {
    const [formData, setFormData] = useState<WishFormData>({
        guestName: '',
        wishMessage: '',
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setSubmissionStatus('submitting');

        try {
            const response = await fetch('/', { // We'll configure Netlify later
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'birthdayWishes', // Important for Netlify Forms
                    ...formData,
                }).toString(),
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ guestName: '', wishMessage: '' }); // Clear the form
                // Optionally show a thank you message
            } else {
                setSubmissionStatus('error');
                console.error('Form submission failed:', response.status);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form name="birthdayWishes" onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field">
            {/* The following hidden input is important for Netlify Forms */}
            <input type="hidden" name="form-name" value="birthdayWishes" />
            <p>
                <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
            </p>

            <label htmlFor="guestName">Your Name (Optional):</label>
            <input
                type="text"
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
            />

            <label htmlFor="wishMessage">Your Wish/Advice (Required):</label>
            <textarea
                id="wishMessage"
                name="wishMessage"
                value={formData.wishMessage}
                onChange={handleChange}
                required
            ></textarea>

            <button type="submit" disabled={submissionStatus === 'submitting'}>
                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Your Wish'}
            </button>

            {submissionStatus === 'success' && <p>Thank you for your wish!</p>}
            {submissionStatus === 'error' && <p>Oops! Something went wrong. Please try again.</p>}
        </form>
    );
};

export default WishForm;