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

  } catch (err) {
    console.error('main.js error:', err);
  }

});
 var contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl =contactForm.querySelector('#name');
    var emailEl = contactForm.querySelector('#email');
    var messageEl = contactForm.querySelector('#message');

    var  name = nameEl ? userEl.value.trim() : '';
    var email = emailEl ? passEl.value.trim() : '';
    var message = messageEl ? passEl.value.trim() : '';

    if (!name || !email || !message) {
      if (!email && emailEl) emailEl.focus();
      if (!name && nameEl) nameEl.focus();
      else if (!message && messageEl) messageEl.focus();
      return;
    }

    // Redirect
    window.location.href ='https://chiemelasamuel83.systeme.io/b1577e76';
  });
}