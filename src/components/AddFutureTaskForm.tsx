'use client';

import { useState } from 'react';
import { submitFutureTask } from '@/app/actions';
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ weight: ["400"], subsets: ["latin"] });

export function AddFutureTaskForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await submitFutureTask(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border border-dashed border-white/30 text-gray-300 rounded-xl hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-xl">+</span> Add a Feature Request
      </button>
    );
  }

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl text-white">New Feature Request</h4>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-white"
        >
          ✕
        </button>
      </div>

      {success ? (
        <div className="p-4 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 text-center">
          Feature request added successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <div className="text-red-400 text-sm">{error}</div>}
          
          <div>
            <label htmlFor="title" className={`block text-sm text-gray-400 mb-1 ${openSans.className}`}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className={`w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-colors ${openSans.className}`}
              placeholder="E.g., Dark Mode"
            />
          </div>
          <div>
            <label htmlFor="description" className={`block text-sm text-gray-400 mb-1 ${openSans.className}`}>Description</label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              className={`w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white outline-none focus:border-white/30 transition-colors resize-none ${openSans.className}`}
              placeholder="Why would this be useful?"
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-xl text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Wish'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
