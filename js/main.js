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

    console.log('main.js: redirecting to landing (login)');
        // Redirect to landing page
        window.location.href = 'login-signup.html';
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
        window.location.href = 'login-signup.html';
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

    // Initialize international telephone input and country select
    (function(){
      var phoneInput = document.querySelector('#phoneInput');
      var countrySelect = document.querySelector('#countrySelect');
      var companySection = document.getElementById('companySection');

      if (phoneInput && window.intlTelInput) {
        var iti = window.intlTelInput(phoneInput, {
          separateDialCode: true,
          preferredCountries: ['ng','us','gb'],
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
        });

        if (countrySelect) {
          // populate country select from plugin data (sorted alphabetically)
          var data = iti.getCountryData().slice().sort(function(a,b){ return a.name.localeCompare(b.name); });
          countrySelect.innerHTML = data.map(function(c){
            return '<option value="'+c.iso2+'">'+c.flag+' '+c.name+' (+'+c.dialCode+')</option>';
          }).join('');
          var selected = iti.getSelectedCountryData();
          if (selected && selected.iso2) countrySelect.value = selected.iso2;

          countrySelect.addEventListener('change', function(){
            if (this.value) iti.setCountry(this.value);
          });

          phoneInput.addEventListener('countrychange', function(){
            var d = iti.getSelectedCountryData();
            if (d && d.iso2) countrySelect.value = d.iso2;
          });
        }
      } else {
        // Plugin missing — populate countrySelect with a basic fallback
        if (countrySelect) {
          var fallback = [
            {iso2:'ng', name:'Nigeria', dialCode:'234', flag:'🇳🇬'},
            {iso2:'us', name:'United States', dialCode:'1', flag:'🇺🇸'},
            {iso2:'gb', name:'United Kingdom', dialCode:'44', flag:'🇬🇧'},
            {iso2:'ca', name:'Canada', dialCode:'1', flag:'🇨🇦'},
            {iso2:'au', name:'Australia', dialCode:'61', flag:'🇦🇺'}
          ];
          countrySelect.innerHTML = fallback.map(function(c){ return '<option value="'+c.iso2+'">'+c.flag+' '+c.name+' (+'+c.dialCode+')</option>'; }).join('');
        }
      }

      var individualRadio = document.getElementById('individualRadio');
      var companyRadio = document.getElementById('companyRadio');
      if (individualRadio && companyRadio && companySection) {
        function updateCompanySection(){
          var show = companyRadio.checked;
          companySection.style.display = show ? '' : 'none';
          var nameEl = document.getElementById('companyName');
          var addrEl = document.getElementById('companyAddress');
          if (nameEl) nameEl.required = show;
          if (addrEl) addrEl.required = show;
        }
        individualRadio.addEventListener('change', updateCompanySection);
        companyRadio.addEventListener('change', updateCompanySection);
        updateCompanySection();
      }

    })();

  

  } catch (err) {
    console.error('main.js error:', err);
  }

});
