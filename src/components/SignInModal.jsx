import React from 'react';
import { Heart, Stethoscope, Shield, X } from 'lucide-react';

export default function SignInModal({
  isArabic = false,
  modalRole = 'user',
  signedEmail = '',
  signedPassword = '',
  onClose,
  onSubmit,
  onForgot,
  onCreateAccount,
}) {
  const roleColorClass = modalRole === 'user' ? 'bg-blue-500' : modalRole === 'doctor' ? 'bg-green-500' : 'bg-purple-500';
  const btnColorClass = modalRole === 'user' ? 'bg-blue-600 hover:bg-blue-700' : modalRole === 'doctor' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label={isArabic ? 'نافذة تسجيل الدخول' : 'Sign in dialog'}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className={`relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl z-10`} dir={isArabic ? 'rtl' : 'ltr'}>
        <button
          type="button"
          aria-label={isArabic ? 'إغلاق' : 'Close'}
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center ${roleColorClass}`}>
            {modalRole === 'user' && <Heart className="w-10 h-10 text-white" />}
            {modalRole === 'doctor' && <Stethoscope className="w-10 h-10 text-white" />}
            {modalRole === 'admin' && <Shield className="w-10 h-10 text-white" />}
          </div>

          <h2 className="mt-4 text-2xl font-bold">MedSync</h2>
          <p className="text-sm text-gray-500 mt-1">{isArabic ? 'سجل دخولك للوصول إلى لوحة التحكم' : 'Sign in to access your dashboard'}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-6">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">{isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
            <input
              name="email"
              type="email"
              autoFocus
              placeholder={isArabic ? 'example@domain.com' : 'name@example.com'}
              defaultValue={signedEmail}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{isArabic ? 'كلمة المرور' : 'Password'}</label>
            <input
              name="password"
              type="password"
              placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
              defaultValue={signedPassword}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
            />
          </div>

          <div className="flex justify-end mb-4">
            <button type="button" onClick={onForgot} className="text-sm text-blue-600 hover:underline">
              {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </button>
          </div>

          <div className="mt-2">
            <button type="submit" className={`block mx-auto w-3/4 px-6 py-3 rounded-md text-white font-semibold ${btnColorClass}`}>
              {isArabic ? 'تسجيل دخول' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isArabic ? 'لا تملك حسابًا؟' : "Don't have an account?"}
          <button type="button" onClick={() => onCreateAccount?.(modalRole)} className={`font-semibold ${isArabic ? 'mr-2' : 'ml-2'} text-blue-600 hover:underline`}>
            {isArabic ? 'إنشاء حساب' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
