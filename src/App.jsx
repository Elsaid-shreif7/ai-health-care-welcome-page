import React, { useState } from 'react';
import { Heart, Stethoscope, Shield, ArrowLeft, BarChart2, Calendar, Settings } from 'lucide-react';
import SignInModal from './components/SignInModal'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome'); // welcome, userSignup, doctorSignup, adminSignup
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const handleRoleSelect = (page) => {
    setCurrentPage(page);
  };

  const handleBackToWelcome = () => {
    setCurrentPage('welcome');
  };

  const roles = [
    {
      id: 'user',
      title: 'Regular User',
      titleAr: 'مستخدم عادي',
      description: 'Access your medical records, appointments, and healthcare services',
      descriptionAr: 'الوصول إلى سجلاتك الطبية، المواعيد، والخدمات الصحية',
      icon: Heart,
      color: 'bg-blue-500',
      buttonText: 'Continue as Regular User',
      buttonTextAr: 'متابعة كمستخدم عادي',
      page: 'userSignup'
    },
    {
      id: 'doctor',
      title: 'Doctor',
      titleAr: 'طبيب',
      description: 'Manage your patients, appointments, and medical records',
      descriptionAr: 'إدارة مرضاك، المواعيد، والسجلات الطبية',
      icon: Stethoscope,
      color: 'bg-green-500',
      buttonText: 'Continue as Doctor',
      buttonTextAr: 'متابعة كطبيب',
      page: 'doctorSignup'
    },
    {
      id: 'admin',
      title: 'Administrator',
      titleAr: 'مدير النظام',
      description: 'Manage the system, users, and healthcare providers',
      descriptionAr: 'إدارة النظام، المستخدمين، ومقدمي الرعاية الصحية',
      icon: Shield,
      color: 'bg-purple-500',
      buttonText: 'Continue as Administrator',
      buttonTextAr: 'متابعة كمدير',
      page: 'adminSignup'
    }
  ];
  // Sign-in modal state and shared credentials
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [modalRole, setModalRole] = useState('user'); // which role invoked the modal
  const [signedEmail, setSignedEmail] = useState('');
  const [signedPassword, setSignedPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const openSignInModal = (role = 'user') => {
    setModalRole(role);
    setShowSignInModal(true);
  };
  const closeSignInModal = () => setShowSignInModal(false);

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email?.value || '';
    const password = form.password?.value || '';
    setSignedEmail(email);
    setSignedPassword(password);
    closeSignInModal();
    // keep the user where they are; the signup forms use defaultValue so they'll receive the values
  };

  const handleRegisterSubmit = (role, e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName?.value || '';
    const email = form.email?.value || signedEmail || '';
    // for demo we won't validate password here
    setCurrentUser({ role, name, email });
    setCurrentPage('dashboard');
  };

  const handleForgotPassword = () => {
    // placeholder: in a real app you'd trigger password reset flow
    alert(isArabic ? 'ميزة استعادة كلمة المرور غير مفعلة في النسخة التجريبية.' : 'Forgot password flow is not enabled in the demo.');
  };

  const handleCreateAccountFromModal = (role) => {
    const map = { user: 'userSignup', doctor: 'doctorSignup', admin: 'adminSignup' };
    setShowSignInModal(false);
    setCurrentPage(map[role] || 'userSignup');
  };

  // Welcome Page
  if (currentPage === 'welcome') {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={isArabic ? 'rtl' : 'ltr'}>
  <div className="absolute top-6 z-10 right-6">
          <button 
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-gray-900 font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {isArabic ? 'English' : 'بالعربية'}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-12 h-12 text-white" fill="white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {isArabic ? 'مرحباً بك في MedSync' : 'Welcome to MedSync'}
          </h1>
          <p className="text-gray-600 text-lg mb-12">
            {isArabic ? 'اختر نوع لوحة التحكم للمتابعة' : 'Choose your dashboard type to continue'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col"
                >
                  <div className={`w-16 h-16 ${role.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-9 h-9 text-white" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {isArabic ? role.titleAr : role.title}
                  </h2>

                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                    {isArabic ? role.descriptionAr : role.description}
                  </p>

                  <button
                    onClick={() => handleRoleSelect(role.page)}
                    className={`w-full ${role.color} text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200`}
                  >
                    {isArabic ? role.buttonTextAr : role.buttonText}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>© 2025 MedSync. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // User Signup Page
  if (currentPage === 'userSignup') {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={isArabic ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleBackToWelcome}
          className={`absolute top-6 z-10 ${isArabic ? 'right-6' : 'left-6'} flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium`}
        >
          <ArrowLeft className={isArabic ? 'rotate-180' : ''} />
          {isArabic ? 'العودة لاختيار الدور' : 'Back to Role Selection'}
        </button>

  <div className="absolute top-6 z-10 right-6">
          <button 
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-gray-900 font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {isArabic ? 'English' : 'بالعربية'}
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-12 h-12 text-white" fill="white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              {isArabic ? 'إنشاء حساب' : 'Create Account'}
            </h1>
            <p className="text-gray-600 text-center mb-8">
              {isArabic ? 'انضم إلى MedSync لإدارة رعايتك الصحية' : 'Join MedSync to manage your healthcare'}
            </p>

            <form onSubmit={(e) => handleRegisterSubmit('user', e)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input 
                  name="fullName"
                  type="text" 
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input 
                  name="email"
                  type="email" 
                    defaultValue={signedEmail}
                    placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  name="password"
                  type="password" 
                  defaultValue={signedPassword}
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input 
                  type="password" 
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors mt-6"
              >
                {isArabic ? 'إنشاء حساب' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              {isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                  <button 
                type="button"
                onClick={() => openSignInModal('user')}
                className="text-blue-500 font-semibold hover:text-blue-600"
              >
                {isArabic ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </p>

            {showSignInModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-auto shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${modalRole === 'user' ? 'bg-blue-500' : modalRole === 'doctor' ? 'bg-green-500' : 'bg-purple-500'}`}>
                      {modalRole === 'user' && <Heart className="w-8 h-8 text-white" />}
                      {modalRole === 'doctor' && <Stethoscope className="w-8 h-8 text-white" />}
                      {modalRole === 'admin' && <Shield className="w-8 h-8 text-white" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">MedSync</h2>
                      <p className="text-sm text-gray-600">{isArabic ? 'سجل دخولك للوصول إلى لوحة التحكم' : 'Sign in to access your dashboard'}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSignInSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
                      <input name="email" type="email" placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'} defaultValue={signedEmail} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{isArabic ? 'كلمة المرور' : 'Password'}</label>
                      <input name="password" type="password" placeholder={isArabic ? 'كلمة المرور' : 'Password'} defaultValue={signedPassword} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    </div>

                    <div className="flex items-center justify-between">
                      <button type="button" onClick={handleForgotPassword} className="text-sm text-gray-600 hover:underline">{isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}</button>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={closeSignInModal} className="px-4 py-2 bg-gray-200 rounded">{isArabic ? 'إلغاء' : 'Cancel'}</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{isArabic ? 'تسجيل دخول' : 'Sign In'}</button>
                      </div>
                    </div>
                  </form>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    {isArabic ? 'لا تملك حسابًا؟' : "Don't have an account?"}
                    <button
                      type="button"
                      onClick={() => {
                        // navigate to the appropriate create-account page for the role
                        const map = { user: 'userSignup', doctor: 'doctorSignup', admin: 'adminSignup' };
                        setShowSignInModal(false);
                        setCurrentPage(map[modalRole] || 'userSignup');
                      }}
                      className={`font-semibold ${isArabic ? 'mr-2' : 'ml-2'} text-blue-600 hover:underline`}
                    >
                      {isArabic ? 'إنشاء حساب' : 'Create Account'}
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Doctor Signup Page
  if (currentPage === 'doctorSignup') {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={isArabic ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleBackToWelcome}
          className={`absolute top-6 z-10 ${isArabic ? 'right-6' : 'left-6'} flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium`}
        >
          <ArrowLeft className={isArabic ? 'rotate-180' : ''} />
          {isArabic ? 'العودة لاختيار الدور' : 'Back to Role Selection'}
        </button>

  <div className="absolute top-6 z-10 right-6">
          <button 
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-gray-900 font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {isArabic ? 'English' : 'بالعربية'}
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              {isArabic ? 'تسجيل طبيب' : 'Doctor Registration'}
            </h1>
            <p className="text-gray-600 text-center mb-8">
              {isArabic ? 'سجل كطبيب على MedSync' : 'Register as a doctor on MedSync'}
            </p>

            <form onSubmit={(e) => handleRegisterSubmit('doctor', e)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input 
                  name="fullName"
                  type="text" 
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input 
                  name="email"
                  type="email" 
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'التخصص' : 'Specialization'}
                </label>
                <input 
                  type="text" 
                  placeholder={isArabic ? 'التخصص' : 'Specialization'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الترخيص الطبي' : 'Medical License Number'}
                </label>
                <input 
                  type="text" 
                  placeholder={isArabic ? 'رقم الترخيص الطبي' : 'Medical License Number'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  name="password"
                  type="password" 
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input 
                  type="password" 
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors mt-6"
              >
                {isArabic ? 'إنشاء حساب طبيب' : 'Create Doctor Account'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              {isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <button type="button" onClick={() => openSignInModal('doctor')} className="text-green-500 font-semibold hover:text-green-600">
                {isArabic ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </p>
            {showSignInModal && (
              <SignInModal
                isArabic={isArabic}
                modalRole={modalRole}
                signedEmail={signedEmail}
                signedPassword={signedPassword}
                onClose={closeSignInModal}
                onSubmit={handleSignInSubmit}
                onForgot={handleForgotPassword}
                onCreateAccount={handleCreateAccountFromModal}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin Signup Page
  if (currentPage === 'adminSignup') {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={isArabic ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleBackToWelcome}
          className={`absolute top-6 z-10 ${isArabic ? 'right-6' : 'left-6'} flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium`}
        >
          <ArrowLeft className={isArabic ? 'rotate-180' : ''} />
          {isArabic ? 'العودة لاختيار الدور' : 'Back to Role Selection'}
        </button>

  <div className="absolute top-6 z-10 right-6">
          <button 
            onClick={toggleLanguage}
            className="text-gray-600 hover:text-gray-900 font-medium bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {isArabic ? 'English' : 'بالعربية'}
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              {isArabic ? 'تسجيل مدير النظام' : 'Administrator Registration'}
            </h1>
            <p className="text-gray-600 text-center mb-8">
              {isArabic ? 'سجل كمدير نظام على MedSync' : 'Register as a system administrator on MedSync'}
            </p>

            <form onSubmit={(e) => handleRegisterSubmit('admin', e)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input 
                  name="fullName"
                  type="text" 
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input 
                  name="email"
                  type="email" 
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isArabic ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'المؤسسة' : 'Organization'}
                </label>
                <input 
                  type="text" 
                  placeholder={isArabic ? 'المؤسسة' : 'Organization'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كود المدير' : 'Administrator Code'}
                </label>
                <input 
                  type="text" 
                  placeholder={isArabic ? 'كود المدير' : 'Administrator Code'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  name="password"
                  type="password" 
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input 
                  type="password" 
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-purple-500 text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors mt-6"
              >
                {isArabic ? 'إنشاء حساب مدير' : 'Create Admin Account'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              {isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <button type="button" onClick={() => openSignInModal('admin')} className="text-purple-500 font-semibold hover:text-purple-600">
                {isArabic ? 'تسجيل الدخول' : 'Sign In'}
              </button>
            </p>
            {showSignInModal && (
              <SignInModal
                isArabic={isArabic}
                modalRole={modalRole}
                signedEmail={signedEmail}
                signedPassword={signedPassword}
                onClose={closeSignInModal}
                onSubmit={handleSignInSubmit}
                onForgot={handleForgotPassword}
                onCreateAccount={handleCreateAccountFromModal}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard / Hello page after signup/signin
  if (currentPage === 'dashboard') {
    const name = currentUser?.name || (isArabic ? 'المستخدم' : 'User');
    const role = currentUser?.role || 'user';
    const roleColor = role === 'doctor' ? 'green' : role === 'admin' ? 'purple' : 'blue';

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{isArabic ? `مرحباً، ${name}` : `Hello, ${name}`}</h1>
              <p className="text-gray-600">{isArabic ? 'هذا هو لوحة التحكم البسيطة الخاصة بك' : 'This is your simple dashboard'} </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-${roleColor}-600 bg-${roleColor}-100 px-3 py-1 rounded-full text-sm font-semibold`}>{role.toUpperCase()}</div>
              <button onClick={() => { setCurrentUser(null); setCurrentPage('welcome'); }} className="text-sm text-gray-600 hover:underline">{isArabic ? 'تسجيل الخروج' : 'Sign out'}</button>
            </div>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm text-gray-500">{isArabic ? 'سجلات طبية' : 'Medical Records'}</h3>
                      <p className="text-2xl font-bold mt-2">12</p>
                    </div>
                    <div className="text-blue-500 bg-blue-50 p-3 rounded-lg">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm text-gray-500">{isArabic ? 'مواعيد قادمة' : 'Upcoming'}</h3>
                      <p className="text-2xl font-bold mt-2">3</p>
                    </div>
                    <div className="text-green-500 bg-green-50 p-3 rounded-lg">
                      <Calendar className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm text-gray-500">{isArabic ? 'الإعدادات' : 'Settings'}</h3>
                      <p className="text-2xl font-bold mt-2">1</p>
                    </div>
                    <div className="text-purple-500 bg-purple-50 p-3 rounded-lg">
                      <Settings className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4">{isArabic ? 'نظرة سريعة' : 'Quick Overview'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">{isArabic ? 'آخر التحديثات' : 'Recent updates'}<div className="mt-2 text-sm text-gray-600">{isArabic ? 'لا توجد تحديثات جديدة' : 'No recent updates'}</div></div>
                  <div className="p-4 bg-gray-50 rounded-lg">{isArabic ? 'اشعارات' : 'Notifications'}<div className="mt-2 text-sm text-gray-600">2 {isArabic ? 'اشعار' : 'notifications'}</div></div>
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-3">{isArabic ? 'اختصارات' : 'Quick Actions'}</h3>
                <div className="flex flex-col gap-3">
                  <button className="w-full text-left px-4 py-3 bg-blue-50 rounded-lg">{isArabic ? 'إنشاء موعد جديد' : 'Create Appointment'}</button>
                  <button className="w-full text-left px-4 py-3 bg-green-50 rounded-lg">{isArabic ? 'إضافة سجل طبي' : 'Add Medical Record'}</button>
                  <button className="w-full text-left px-4 py-3 bg-purple-50 rounded-lg">{isArabic ? 'إعدادات الحساب' : 'Account Settings'}</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-3">{isArabic ? 'آخر الأنشطة' : 'Recent Activity'}</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>{isArabic ? 'تم تسجيل دخولك اليوم' : 'You signed in today'}</li>
                  <li>{isArabic ? 'تم تحديث الملف الشخصي' : 'Profile updated'}</li>
                </ul>
              </div>
            </aside>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
