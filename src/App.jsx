import React, { useState } from 'react';
import { Heart, Stethoscope, Shield, ArrowLeft, ArrowRight, BarChart2, Calendar, Settings } from 'lucide-react';
import SignInModal from './components/SignInModal'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome'); // welcome, userSignup, doctorSignup, adminSignup
  const [isArabic, setIsArabic] = useState(false);

  // User signup form state
  const [userForm, setUserForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', errors: {} });
  // Doctor signup form state
  const [doctorForm, setDoctorForm] = useState({ fullName: '', email: '', phone: '', specialization: '', licenseNumber: '', password: '', confirmPassword: '', errors: {} });
  // Admin signup form state
  const [adminForm, setAdminForm] = useState({ fullName: '', email: '', phone: '', organization: '', adminCode: '', password: '', confirmPassword: '', errors: {} });

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  // Helper to get back button icon based on language
  const getBackButtonIcon = () => {
    return isArabic ? <ArrowRight /> : <ArrowLeft />;
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
    // now receives an object from SignInModal: { email, password, role }
    if (!e) return;
    const data = e && e.email ? e : {};
    const email = data.email || '';
    const password = data.password || '';
    const role = data.role || modalRole || 'user';
    setSignedEmail(email);
    setSignedPassword(password);
    // for demo: sign the user in and navigate to dashboard
    setCurrentUser({ role, name: email.split('@')[0], email });
    setCurrentPage('dashboard');
    closeSignInModal();
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

  // Validation helper for user/doctor/admin
  const validateForm = (form, isArabic, role = null) => {
    const errors = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[0-9]{10,}$/; // at least 10 digits

    if (!form.fullName || !form.fullName.trim()) {
      errors.fullName = isArabic ? 'الاسم الكامل مطلوب' : 'Full name is required';
    }
    if (!form.email || !form.email.trim()) {
      errors.email = isArabic ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!emailRe.test(form.email)) {
      errors.email = isArabic ? 'البريد الإلكتروني غير صالح' : 'Invalid email address';
    }
    if (!form.phone || !form.phone.trim()) {
      errors.phone = isArabic ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!phoneRe.test(form.phone.replace(/\D/g, ''))) {
      errors.phone = isArabic ? 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل' : 'Phone must be at least 10 digits';
    }

    // Doctor-specific validation
    if (role === 'doctor') {
      if (!form.specialization || !form.specialization.trim()) {
        errors.specialization = isArabic ? 'التخصص مطلوب' : 'Specialization is required';
      }
      if (!form.licenseNumber || !form.licenseNumber.trim()) {
        errors.licenseNumber = isArabic ? 'رقم الترخيص الطبي مطلوب' : 'Medical License Number is required';
      }
    }

    // Admin-specific validation
    if (role === 'admin') {
      if (!form.organization || !form.organization.trim()) {
        errors.organization = isArabic ? 'المؤسسة مطلوبة' : 'Organization is required';
      }
      if (!form.adminCode || !form.adminCode.trim()) {
        errors.adminCode = isArabic ? 'كود المدير مطلوب' : 'Administrator Code is required';
      }
    }

    if (!form.password) {
      errors.password = isArabic ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = isArabic ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters';
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = isArabic ? 'تأكيد كلمة المرور مطلوب' : 'Confirm password is required';
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = isArabic ? 'تأكيد كلمة المرور لا يطابق' : 'Confirm password does not match';
    }

    return errors;
  };

  // Form field change handler
  const handleUserFormChange = (field, value) => {
    const newForm = { ...userForm, [field]: value };
    const errors = validateForm(newForm, isArabic, 'user');
    setUserForm({ ...newForm, errors });
  };

  const handleDoctorFormChange = (field, value) => {
    const newForm = { ...doctorForm, [field]: value };
    const errors = validateForm(newForm, isArabic, 'doctor');
    setDoctorForm({ ...newForm, errors });
  };

  const handleAdminFormChange = (field, value) => {
    const newForm = { ...adminForm, [field]: value };
    const errors = validateForm(newForm, isArabic, 'admin');
    setAdminForm({ ...newForm, errors });
  };

  // Submit handler for signup forms
  const handleUserSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(userForm, isArabic, 'user');
    if (Object.keys(errors).length > 0) {
      setUserForm({ ...userForm, errors });
      return;
    }
    setCurrentUser({ role: 'user', name: userForm.fullName, email: userForm.email });
    setCurrentPage('dashboard');
  };

  const handleDoctorSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(doctorForm, isArabic, 'doctor');
    if (Object.keys(errors).length > 0) {
      setDoctorForm({ ...doctorForm, errors });
      return;
    }
    setCurrentUser({ role: 'doctor', name: doctorForm.fullName, email: doctorForm.email });
    setCurrentPage('dashboard');
  };

  const handleAdminSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(adminForm, isArabic, 'admin');
    if (Object.keys(errors).length > 0) {
      setAdminForm({ ...adminForm, errors });
      return;
    }
    setCurrentUser({ role: 'admin', name: adminForm.fullName, email: adminForm.email });
    setCurrentPage('dashboard');
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
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          {getBackButtonIcon()}
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

            <form onSubmit={handleUserSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input 
                  type="text" 
                  value={userForm.fullName}
                  onChange={(e) => handleUserFormChange('fullName', e.target.value)}
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${userForm.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {userForm.errors.fullName && <p className="text-sm text-red-600 mt-1">{userForm.errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input 
                  type="email" 
                  value={userForm.email}
                  onChange={(e) => handleUserFormChange('email', e.target.value)}
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${userForm.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {userForm.errors.email && <p className="text-sm text-red-600 mt-1">{userForm.errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  value={userForm.phone}
                  onChange={(e) => handleUserFormChange('phone', e.target.value)}
                  placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${userForm.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {userForm.errors.phone && <p className="text-sm text-red-600 mt-1">{userForm.errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  type="password" 
                  value={userForm.password}
                  onChange={(e) => handleUserFormChange('password', e.target.value)}
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${userForm.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {userForm.errors.password && <p className="text-sm text-red-600 mt-1">{userForm.errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input 
                  type="password" 
                  value={userForm.confirmPassword}
                  onChange={(e) => handleUserFormChange('confirmPassword', e.target.value)}
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${userForm.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {userForm.errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{userForm.errors.confirmPassword}</p>}
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

  // Doctor Signup Page
  if (currentPage === 'doctorSignup') {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir={isArabic ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleBackToWelcome}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          {getBackButtonIcon()}
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

            <form onSubmit={handleDoctorSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input 
                  type="text" 
                  value={doctorForm.fullName}
                  onChange={(e) => handleDoctorFormChange('fullName', e.target.value)}
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.fullName && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input 
                  type="email" 
                  value={doctorForm.email}
                  onChange={(e) => handleDoctorFormChange('email', e.target.value)}
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.email && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  value={doctorForm.phone}
                  onChange={(e) => handleDoctorFormChange('phone', e.target.value)}
                  placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.phone && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'التخصص' : 'Specialization'}
                </label>
                <input 
                  type="text" 
                  value={doctorForm.specialization}
                  onChange={(e) => handleDoctorFormChange('specialization', e.target.value)}
                  placeholder={isArabic ? 'التخصص' : 'Specialization'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.specialization && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.specialization}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الترخيص الطبي' : 'Medical License Number'}
                </label>
                <input 
                  type="text" 
                  value={doctorForm.licenseNumber}
                  onChange={(e) => handleDoctorFormChange('licenseNumber', e.target.value)}
                  placeholder={isArabic ? 'رقم الترخيص الطبي' : 'Medical License Number'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.licenseNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.licenseNumber && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.licenseNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  type="password" 
                  value={doctorForm.password}
                  onChange={(e) => handleDoctorFormChange('password', e.target.value)}
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.password && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input 
                  type="password" 
                  value={doctorForm.confirmPassword}
                  onChange={(e) => handleDoctorFormChange('confirmPassword', e.target.value)}
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${doctorForm.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {doctorForm.errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{doctorForm.errors.confirmPassword}</p>}
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
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          {getBackButtonIcon()}
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

            <form onSubmit={handleAdminSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input 
                  type="text" 
                  value={adminForm.fullName}
                  onChange={(e) => handleAdminFormChange('fullName', e.target.value)}
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.fullName && <p className="text-sm text-red-600 mt-1">{adminForm.errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input 
                  type="email" 
                  value={adminForm.email}
                  onChange={(e) => handleAdminFormChange('email', e.target.value)}
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.email && <p className="text-sm text-red-600 mt-1">{adminForm.errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input 
                  type="tel" 
                  value={adminForm.phone}
                  onChange={(e) => handleAdminFormChange('phone', e.target.value)}
                  placeholder={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.phone && <p className="text-sm text-red-600 mt-1">{adminForm.errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'المؤسسة' : 'Organization'}
                </label>
                <input 
                  type="text" 
                  value={adminForm.organization}
                  onChange={(e) => handleAdminFormChange('organization', e.target.value)}
                  placeholder={isArabic ? 'المؤسسة' : 'Organization'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.organization ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.organization && <p className="text-sm text-red-600 mt-1">{adminForm.errors.organization}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كود المدير' : 'Administrator Code'}
                </label>
                <input 
                  type="text" 
                  value={adminForm.adminCode}
                  onChange={(e) => handleAdminFormChange('adminCode', e.target.value)}
                  placeholder={isArabic ? 'كود المدير' : 'Administrator Code'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.adminCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.adminCode && <p className="text-sm text-red-600 mt-1">{adminForm.errors.adminCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <input 
                  type="password" 
                  value={adminForm.password}
                  onChange={(e) => handleAdminFormChange('password', e.target.value)}
                  placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.password && <p className="text-sm text-red-600 mt-1">{adminForm.errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input 
                  type="password" 
                  value={adminForm.confirmPassword}
                  onChange={(e) => handleAdminFormChange('confirmPassword', e.target.value)}
                  placeholder={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${adminForm.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {adminForm.errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{adminForm.errors.confirmPassword}</p>}
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
