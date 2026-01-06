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

    // --- Shipping Form Enhancements ---
    // 1. Individual vs Company Toggle
    var typeRadios = document.querySelectorAll('input[name="customerType"]');
    var companyInfo = document.getElementById('company-info');
    
    if (typeRadios.length > 0 && companyInfo) {
      typeRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
          if (this.value === 'company') {
            companyInfo.style.display = 'flex';
          } else {
            companyInfo.style.display = 'none';
          }
        });
      });
    }

    // 2. Populate Countries and Phone Codes
    var countrySelect = document.getElementById('countrySelect');
    var phoneCodeSelect = document.getElementById('phoneCode');

    if (countrySelect || phoneCodeSelect) {
      var countries = [
        { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
        { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
        { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
        { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
        { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
        { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
        { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
        { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
        { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
        { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
        { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
        { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
        { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
        { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
        { code: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" }
      ];

      if (countrySelect) {
        countrySelect.innerHTML = ""; // Clear existing
        countries.forEach(function(c) {
          var opt = document.createElement('option');
          opt.value = c.code;
          opt.textContent = c.flag + " " + c.name;
          countrySelect.appendChild(opt);
        });
      }

      if (phoneCodeSelect) {
        phoneCodeSelect.innerHTML = "";
        countries.forEach(function(c) {
          var opt = document.createElement('option');
          opt.value = c.dial;
          opt.textContent = c.flag + " " + c.dial;
          phoneCodeSelect.appendChild(opt);
        });
      }
    }
      
    // --- Order Summary & Payment Logic ---
    // 1. Calculate Cost (500 per km)
    var distanceInput = document.getElementById('distanceKm');
    var totalCostDisplay = document.getElementById('totalCost');

    if (distanceInput && totalCostDisplay) {
      distanceInput.addEventListener('input', function() {
        var km = parseFloat(this.value) || 0;
        var cost = km * 500;
        totalCostDisplay.textContent = '₦' + cost.toLocaleString();
      });
    }

    // 2. Payment Method Toggle
    var payCardRadio = document.getElementById('payCard');
    var payBankRadio = document.getElementById('payBank');
    var cardDetails = document.getElementById('cardDetails');
    var bankDetails = document.getElementById('bankDetails');

    function togglePayment() {
      if (payCardRadio && payCardRadio.checked && cardDetails && bankDetails) {
        cardDetails.style.display = 'block';
        bankDetails.style.display = 'none';
      } else if (payBankRadio && payBankRadio.checked && cardDetails && bankDetails) {
        cardDetails.style.display = 'none';
        bankDetails.style.display = 'block';
      }
    }

    if (payCardRadio && payBankRadio) {
      payCardRadio.addEventListener('change', togglePayment);
      payBankRadio.addEventListener('change', togglePayment);
      // Initialize state
      togglePayment();
    }

  } catch (err) {
    console.error('main.js error:', err);
  }

});
