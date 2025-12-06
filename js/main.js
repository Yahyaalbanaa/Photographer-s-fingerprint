// ===================================
// فوتوهب - Main JavaScript File
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // Verification Code Input Auto-Focus
    // ===================================
    const codeInputs = document.querySelectorAll('.code-input');
    
    if (codeInputs.length > 0) {
        codeInputs.forEach((input, index) => {
            input.addEventListener('input', function(e) {
                const value = e.target.value;
                
                // Only allow numbers
                if (!/^\d$/.test(value)) {
                    e.target.value = '';
                    return;
                }
                
                // Move to next input
                if (value && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', function(e) {
                // Move to previous input on backspace
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    codeInputs[index - 1].focus();
                }
            });
            
            // Paste handler
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
                
                if (pastedData) {
                    const digits = pastedData.split('').slice(0, 6);
                    digits.forEach((digit, i) => {
                        if (codeInputs[i]) {
                            codeInputs[i].value = digit;
                        }
                    });
                    
                    // Focus on the last filled input or next empty one
                    const lastIndex = Math.min(digits.length, codeInputs.length - 1);
                    codeInputs[lastIndex].focus();
                }
            });
        });
        
        // Focus first input on load
        codeInputs[0].focus();
    }
    
    // ===================================
    // File Upload Area
    // ===================================
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
            uploadArea.style.background = 'rgba(220, 38, 38, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.background = 'var(--input-bg)';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.background = 'var(--input-bg)';
            
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
        
        function handleFiles(files) {
            const fileList = Array.from(files);
            const validFiles = fileList.filter(file => {
                const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                const maxSize = 10 * 1024 * 1024; // 10MB
                return validTypes.includes(file.type) && file.size <= maxSize;
            });
            
            if (validFiles.length > 0) {
                const uploadText = uploadArea.querySelector('.upload-text');
                uploadText.innerHTML = `<strong>${validFiles.length} ملف تم اختياره</strong>`;
                console.log('تم اختيار الملفات:', validFiles);
            } else {
                alert('يرجى اختيار صور صالحة (PNG, JPG, GIF) بحجم أقل من 10 ميجابايت');
            }
        }
    }
    
    // ===================================
    // Form Validations
    // ===================================
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                console.log('محاولة تسجيل الدخول:', { email });
                // Simulate successful login
                setTimeout(() => {
                    alert('تم تسجيل الدخول بنجاح!');
                    window.location.href = 'index.html';
                }, 500);
            }
        });
    }
    
    // Register Client Form
    const registerClientForm = document.getElementById('registerClientForm');
    if (registerClientForm) {
        registerClientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;
            
            if (name && email && password && phone) {
                console.log('تسجيل عميل جديد:', { name, email, phone });
                // Redirect to verification
                setTimeout(() => {
                    alert('تم إنشاء الحساب! سيتم إرسال رمز التحقق.');
                    window.location.href = 'verify-code.html';
                }, 500);
            }
        });
    }
    
    // Register Photographer Form
    const registerPhotographerForm = document.getElementById('registerPhotographerForm');
    if (registerPhotographerForm) {
        registerPhotographerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const specialty = document.getElementById('specialty').value;
            const bio = document.getElementById('bio').value;
            
            if (fullname && email && phone && password && specialty && bio) {
                console.log('تسجيل مصور جديد:', { fullname, email, phone, specialty });
                // Redirect to verification
                setTimeout(() => {
                    alert('تم إنشاء الحساب! سيتم إرسال رمز التحقق.');
                    window.location.href = 'verify-code.html';
                }, 500);
            }
        });
    }
    
    // Forgot Password Form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            if (email) {
                console.log('طلب استعادة كلمة المرور:', { email });
                setTimeout(() => {
                    alert('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني!');
                    window.location.href = 'login.html';
                }, 500);
            }
        });
    }
    
    // Verify Code Form
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    if (verifyCodeForm) {
        verifyCodeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const code = Array.from(codeInputs)
                .map(input => input.value)
                .join('');
            
            if (code.length === 6) {
                console.log('رمز التحقق:', code);
                setTimeout(() => {
                    alert('تم التحقق بنجاح!');
                    window.location.href = 'index.html';
                }, 500);
            } else {
                alert('يرجى إدخال رمز التحقق كاملاً');
            }
        });
    }
    
    // Resend Code
    const resendCode = document.getElementById('resendCode');
    if (resendCode) {
        resendCode.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('إعادة إرسال رمز التحقق');
            alert('تم إرسال رمز التحقق مرة أخرى!');
        });
    }
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Password Visibility Toggle (Future Enhancement)
    // ===================================
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        // Could add eye icon to toggle visibility
        // This is a placeholder for future enhancement
    });
    
    // ===================================
    // Form Input Animations
    // ===================================
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🎨 فوتوهب - ربط الإبداع بالفرص', 'color: #dc2626; font-size: 20px; font-weight: bold;');
    console.log('%cمرحباً بك في منصة فوتوهب!', 'color: #9ca3af; font-size: 14px;');
});
