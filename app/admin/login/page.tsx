'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pocketbase'; // pastikan sesuai

export default function UserLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.push('/'); // redirect ke homepage atau dashboard user
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await pb.collection('users').authWithPassword(username, password);

      localStorage.setItem('pb_user_token', pb.authStore.token);
      localStorage.setItem('pb_user_data', JSON.stringify(pb.authStore.model));

      router.push('/admin/berita'); // redirect ke beranda atau dashboard
    } catch (err: any) {
      console.error(err);
      setError('Username atau password salah');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-serif font-bold text-emerald-700 text-center mb-6">
          Login Pengguna Desa Corawali
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn bg-emerald-700 hover:bg-emerald-800 text-white w-full mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
