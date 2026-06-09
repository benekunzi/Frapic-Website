'use client';

import { useState } from 'react';
import { submitContactForm } from '@/app/actions';
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ weight: ["400"], subsets: ["latin"] });

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
      <h3 className="text-3xl sm:text-4xl text-white mb-6 tracking-tight">Contact Us</h3>
      
      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className={`block text-sm text-gray-400 mb-1 ${openSans.className}`}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-colors ${openSans.className}`}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="message" className={`block text-sm text-gray-400 mb-1 ${openSans.className}`}>Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={`w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-colors resize-none ${openSans.className}`}
            placeholder="How can we help?"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
