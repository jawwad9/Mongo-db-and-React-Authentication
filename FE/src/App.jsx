import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true while awaiting response

    try {
      const res = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        // Optionally reset form fields if login is successful
        setEmail('');
        setPassword('');
        setIsLoading(false); // Reset loading state

        // Navigate to the homepage after login
        navigate('/home');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Something went wrong');
        setIsLoading(false); // Reset loading state on error
      }

    } catch (error) {
      alert(error.message);
      console.log(error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-full py-2 rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-600'} text-white`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
