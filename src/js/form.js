export function initForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const charCountEl = document.getElementById('char-count');
    const reviewTextarea = document.getElementById('form-review');

    if (!contactForm) return;

    if (reviewTextarea && charCountEl) {
        reviewTextarea.addEventListener('input', () => {
            const len = reviewTextarea.value.length;
            charCountEl.textContent = `${len} / 500`;
            charCountEl.classList.toggle('warn', len > 400 && len <= 500);
            charCountEl.classList.toggle('over', len > 500);
        });
    }

    function validateField(input) {
        const group = input.closest('.form-group');
        const errEl = group ? group.querySelector('.form-error') : null;
        let msg = '';

        if (input.required && !input.value.trim()) {
            msg = 'This field is required.';
        } else if (input.type === 'email' && input.value.trim()) {
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(input.value.trim())) {
                msg = 'Please enter a valid email address.';
            }
        } else if (input.id === 'form-review' && input.value.length > 500) {
            msg = 'Message must be under 500 characters.';
        }

        if (group) group.classList.toggle('error', !!msg);
        if (errEl) errEl.textContent = msg;
        return !msg;
    }

    contactForm.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (group && group.classList.contains('error')) validateField(input);
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('.form-input[required]');
        let valid = true;
        inputs.forEach(inp => { if (!validateField(inp)) valid = false; });

        if (!valid) return;

        const submitBtn = document.getElementById('form-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim() || `Review from ${name}`;
        const review = document.getElementById('form-review').value.trim();

        const mailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n--- Review / Message ---\n${review}`
        );
        const mailSubject = encodeURIComponent(subject);
        const mailtoHref = `mailto:raics@gkciet.ac.in?subject=${mailSubject}&body=${mailBody}`;

        setTimeout(() => {
            window.location.href = mailtoHref;

            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            formSuccess.hidden = false;
            contactForm.reset();
            if (charCountEl) charCountEl.textContent = '0 / 500';
        }, 1200);
    });
}
