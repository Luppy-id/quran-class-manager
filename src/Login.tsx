import React, { useState } from 'react';
import { BookOpen, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('Email atau password salah');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center mx-auto shadow-xl">
              <BookOpen size={40} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">
                Quran Class Manager
              </h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                Admin Login
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Admin
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Masuk...
                </>
              ) : (
                'Masuk Sebagai Admin'
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-gray-100 text-center">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">
              Developed By
            </p>
            <a
              href="https://wa.me/62895612466176"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black text-emerald-600 hover:text-emerald-700 transition"
            >
              Achmad Luthfi C, M.Pd.
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-emerald-100 font-medium">
            Hanya admin yang terdaftar dapat mengakses aplikasi
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
