

//hamburger

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

//navbarfix
window.onscroll = () => {
    const header = document.querySelector('header');
    const fixNav = header.offsetTop;

    if(window.pageYOffset > fixNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
}

// Web3Forms Contact Form Handler
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('messege');

        // Reset previous error states
        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';
        messageInput.style.borderColor = '';

        // Validation checks
        let isValid = true;
        let errorMessage = '';

        // Name validation (tidak boleh kosong)
        if (!nameInput.value || nameInput.value.trim() === '') {
            nameInput.style.borderColor = 'red';
            errorMessage = 'Name must be filled in!';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value || !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            errorMessage = errorMessage || 'Invalid email format!';
            isValid = false;
        }

        // Message validation (tidak boleh kosong)
        if (!messageInput.value || messageInput.value.trim() === '') {
            messageInput.style.borderColor = 'red';
            errorMessage = errorMessage || 'Messege must be filled in!';
            isValid = false;
        }

        // If validation fails, show error and stop
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: errorMessage,
                confirmButtonColor: '#6366f1'
            });
            return;
        }

        // Proceed with form submission if validation passes
        const formData = new FormData();
        
        // Add the access key and form data
        formData.append('access_key', 'c46aeb10-cac3-4521-9770-26209779818f');
        formData.append('name', nameInput.value);
        formData.append('email', emailInput.value);
        formData.append('message', messageInput.value);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Update button state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const data = await response.json();

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Message sent successfully!',
                    confirmButtonColor: '#6366f1'
                });
                contactForm.reset();
                // Reset any error styling
                nameInput.style.borderColor = '';
                emailInput.style.borderColor = '';
                messageInput.style.borderColor = '';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: data.message || 'Something went wrong!',
                    confirmButtonColor: '#6366f1'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to send message. Please try again.',
                confirmButtonColor: '#6366f1'
            });
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send';
        }
    });

    // Reset error styling when user starts typing
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
}