document.addEventListener('DOMContentLoaded', function() {
  try {
    console.log('main.js: DOMContentLoaded');

    // Helper to find a form by id or selector, or a button's closest form
    function getFormByIdOrSelector(id, selector) {
      var el = document.getElementById(id);
      if (el) {
        if (el.tagName === 'FORM') return el;
        if (el.closest) {
          var f = el.closest('form');
          if (f) return f;
        }
      }
      if (selector) {
        var q = document.querySelector(selector);
        if (q) return q;
      }
      return null;
    }

    var loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var userEl = loginForm.querySelector('#login-username');
    var passEl = loginForm.querySelector('#login-password');

    var user = userEl ? userEl.value.trim() : '';
    var pass = passEl ? passEl.value.trim() : '';

    if (!user || !pass) {
      if (!user && userEl) userEl.focus();
      else if (!pass && passEl) passEl.focus();
      return;
    }

    // Redirect
    window.location.href ='https://chiemelasamuel83.systeme.io/255a0e8e';
  });
}

    // --- Sign-up handling: redirect to landing on successful fill ---
    var signForm = getFormByIdOrSelector('signForm', 'form[action="signup.php"]');
    // If the submit button has the id instead of the form, get its closest form
    var signBtn = null;
    if (!signForm) {
      signBtn = document.getElementById('signForm');
      if (signBtn && signBtn.closest) signForm = signBtn.closest('form');
    }
    console.log('main.js: signForm ->', signForm, 'signBtn ->', signBtn);

    if (signForm) {
      signForm.addEventListener('submit', function(e) {
        console.log('main.js: sign submit');
        e.preventDefault();
        var usernameEl = signForm.querySelector('#username');
        var emailEl = signForm.querySelector('#email');
        var passwordEl = signForm.querySelector('#password');
        var username = usernameEl ? usernameEl.value.trim() : '';
        var email = emailEl ? emailEl.value.trim() : '';
        var password = passwordEl ? passwordEl.value.trim() : '';
        console.log('main.js: sign values', {username: !!username, email: !!email, password: !!password});

        if (!username || !email || !password) {
          // focus the first missing field
          if (!username && usernameEl) usernameEl.focus();
          else if (!email && emailEl) emailEl.focus();
          else if (!password && passwordEl) passwordEl.focus();
          return;
        }

        console.log('main.js: redirecting to landing (signup)');
        // All fields present — redirect to landing page
        window.location.href = 'https://chiemelasamuel83.systeme.io/ironknot';
      });
    }

    // Footer year update removed per request

    // Contact form submit handler: validate name, email, and message only; clear other fields
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        function setInvalid(el) {
          if (!el) return;
          el.classList.add('is-invalid');
          el.classList.remove('is-valid');
        }
        function setValid(el) {
          if (!el) return;
          el.classList.remove('is-invalid');
          el.classList.add('is-valid');
        }

        var nameEl = contactForm.querySelector('#name');
        var emailEl = contactForm.querySelector('#email');
        var messageEl = contactForm.querySelector('#message');

        var name = nameEl ? nameEl.value.trim() : '';
        var email = emailEl ? emailEl.value.trim() : '';
        var message = messageEl ? messageEl.value.trim() : '';

        // simple email regex
        var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        var firstInvalid = null;
        if (!name) { setInvalid(nameEl); firstInvalid = firstInvalid || nameEl; } else { setValid(nameEl); }
        if (!email || !emailRe.test(email)) { setInvalid(emailEl); firstInvalid = firstInvalid || emailEl; } else { setValid(emailEl); }
        if (!message) { setInvalid(messageEl); firstInvalid = firstInvalid || messageEl; } else { setValid(messageEl); }

        // Whitelist fields: clear any other inputs/selects/textareas in the form
        Array.from(contactForm.elements).forEach(function(el) {
          var tag = (el.tagName || '').toLowerCase();
          var type = (el.type || '').toLowerCase();
          if (type === 'submit' || type === 'button') return; // leave buttons
          if (tag === 'input' || tag === 'textarea' || tag === 'select') {
            var idOrName = el.id || el.name || '';
            if (idOrName !== 'name' && idOrName !== 'email' && idOrName !== 'message') {
              try { el.value = ''; } catch (err) { /* ignore */ }
            }
          }
        });

        if (firstInvalid) { firstInvalid.focus(); return; }

        // Submit succeeded — prevent double submit and redirect to thank-you
        var submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        window.location.href = 'contact-thanks.html';
      });
    }

  } catch (err) {
    console.error('main.js error:', err);
  }

});
