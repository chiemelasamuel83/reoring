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

    // External redirect removed — handle locally and close modal
    console.log('Login handled locally; external redirect removed.');
    try { var bsModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal')); if (bsModal) bsModal.hide(); } catch (err) { /* ignore */ }
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
        // Redirect changed to local thank-you page
        window.location.href = 'contact-thanks.html';
      });
    }

    // Contact form: prevent POST to a static HTML file and redirect client-side
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        // Simple client-side validation:
        var name = contactForm.querySelector('#name') ? contactForm.querySelector('#name').value.trim() : '';
        var email = contactForm.querySelector('#email') ? contactForm.querySelector('#email').value.trim() : '';
        var msg = contactForm.querySelector('#message') ? contactForm.querySelector('#message').value.trim() : '';
        if (!name || !email || !msg) {
          // focus first invalid field
          if (!name && contactForm.querySelector('#name')) contactForm.querySelector('#name').focus();
          else if (!email && contactForm.querySelector('#email')) contactForm.querySelector('#email').focus();
          else if (!msg && contactForm.querySelector('#message')) contactForm.querySelector('#message').focus();
          return;
        }
        // Redirect to local thank-you page instead of POSTing
        window.location.href = 'contact-thanks.html';
      });
    }

    // Footer year update removed per request

  

  } catch (err) {
    console.error('main.js error:', err);
  }

});
