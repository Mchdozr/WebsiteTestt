// Blazor ile uyumlu çalışacak global bir fonksiyon tanımlıyoruz
window.initializeJS = {
    init: function() {
        console.log('Blazor component initialized');
        this.initFormValidation();
        this.initFadeIn();
    },

    initFormValidation: function() {
        const form = document.querySelector('form');
        if (!form) return;

        // Önceki event listener'ları temizle
        form.removeEventListener('submit', this.handleSubmit);
        // Yeni event listener ekle
        form.addEventListener('submit', this.handleSubmit);
    },

    initFadeIn: function() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    },

    handleSubmit: function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Form elemanlarını güvenli bir şekilde al
        const form = e.target;
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        
        // Önceki hataları temizle
        window.initializeJS.clearErrors();
        
        // Validasyonları yap
        if (nameInput?.value?.trim() === '') {
            window.initializeJS.showError(nameInput, 'İsim alanı zorunludur');
            isValid = false;
        }
        
        if (emailInput) {
            const emailValue = emailInput.value?.trim();
            if (emailValue === '') {
                window.initializeJS.showError(emailInput, 'E-posta alanı zorunludur');
                isValid = false;
            } else if (!window.initializeJS.isValidEmail(emailValue)) {
                window.initializeJS.showError(emailInput, 'Geçerli bir e-posta adresi giriniz');
                isValid = false;
            }
        }
        
        if (phoneInput?.value?.trim() === '') {
            window.initializeJS.showError(phoneInput, 'Telefon alanı zorunludur');
            isValid = false;
        }
        
        if (messageInput?.value?.trim() === '') {
            window.initializeJS.showError(messageInput, 'Mesaj alanı zorunludur');
            isValid = false;
        }
        
        if (isValid) {
            alert('Form başarıyla gönderildi!');
            form.reset();
        }
    },

    clearErrors: function() {
        try {
            const errorMessages = document.querySelectorAll('.error-message');
            const errorInputs = document.querySelectorAll('.error');
            
            errorMessages.forEach(error => {
                if (error?.parentNode) {
                    error.parentNode.removeChild(error);
                }
            });
            
            errorInputs.forEach(input => {
                input?.classList?.remove('error');
            });
        } catch (error) {
            console.error('Error clearing form errors:', error);
        }
    },

    showError: function(input, message) {
        try {
            if (!input?.parentElement) return;
            
            const formGroup = input.parentElement;
            let errorDiv = formGroup.querySelector('.error-message');
            
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                formGroup.appendChild(errorDiv);
            }
            
            errorDiv.textContent = message;
            input.classList.add('error');
        } catch (error) {
            console.error('Error showing form error:', error);
        }
    },

    isValidEmail: function(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
};

// Blazor'un fade-in fonksiyonunu global scope'a ekle
window.initializeFadeIn = function() {
    window.initializeJS.initFadeIn();
};

// Blazor yüklendiğinde initialize et
document.addEventListener('DOMContentLoaded', function() {
    // Blazor'un yüklenmesini bekle
    setTimeout(() => {
        try {
            window.initializeJS.init();
        } catch (error) {
            console.error('Error initializing JS:', error);
        }
    }, 1000);
}); 