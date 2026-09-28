document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  if (!registerForm) {
    return;
  }

  // PASSWORD VISIBILITY TOGGLE

  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const wrapper = toggle.closest(".password-wrapper");
      const input = wrapper.querySelector("input");
      const icon = toggle.querySelector("i");

      if (input.type === "password") {
        input.type = "text";

        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

        toggle.setAttribute("aria-label", "Hide password");
      } else {
        input.type = "password";

        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

        toggle.setAttribute("aria-label", "Show password");
      }
    });
  });

  // REGISTER FORM
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // GET FORM VALUES
    const firstName = document.getElementById("firstName").value.trim();

    const lastName = document.getElementById("lastName").value.trim();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const phone = document.getElementById("phone").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const terms = document.getElementById("terms").checked;

    // BASIC VALIDATION
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      Notiflix.Notify.failure("Please complete all required fields.");

      return;
    }

    // NAME VALIDATION
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

    if (!nameRegex.test(firstName)) {
      Notiflix.Notify.failure("Please enter a valid first name.");

      return;
    }

    if (!nameRegex.test(lastName)) {
      Notiflix.Notify.failure("Please enter a valid last name.");

      return;
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Notiflix.Notify.failure("Please enter a valid email address.");

      return;
    }

    // PHONE VALIDATION
    const cleanPhone = phone.replace(/\s|-/g, "");

    const phoneRegex = /^(?:\+234|0)(?:70|71|80|81|90|91)[0-9]{8}$/;

    if (!phoneRegex.test(cleanPhone)) {
      Notiflix.Notify.failure("Please enter a valid Nigerian phone number.");

      return;
    }

    // PASSWORD VALIDATION
    if (password.length < 8) {
      Notiflix.Notify.failure("Password must be at least 8 characters.");

      return;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      Notiflix.Notify.failure(
        "Password must contain at least one uppercase letter.",
      );

      return;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
      Notiflix.Notify.failure(
        "Password must contain at least one lowercase letter.",
      );

      return;
    }

    // At least one number
    if (!/[0-9]/.test(password)) {
      Notiflix.Notify.failure("Password must contain at least one number.");

      return;
    }

    if (password !== confirmPassword) {
      Notiflix.Notify.failure("Passwords do not match.");

      return;
    }

    // TERMS
    if (!terms) {
      Notiflix.Notify.failure(
        "Please agree to the Terms of Service and Privacy Policy.",
      );

      return;
    }

    // To get Existing User
    let users = JSON.parse(localStorage.getItem("montanaUsers")) || [];

    // Check Duplicate Email
    const emailExists = users.some(function (user) {
      return user.email === email;
    });

    if (emailExists) {
      Notiflix.Notify.failure("An account with this email already exists.");

      return;
    }

    // Check Duplicate Phone Number
    const phoneExists = users.some(function (user) {
      return user.phone === cleanPhone;
    });

    if (phoneExists) {
      Notiflix.Notify.failure(
        "An account with this phone number already exists.",
      );

      return;
    }

    // Create User
    const newUser = {
      id: "MNT-" + Date.now(),

      firstName: firstName,

      lastName: lastName,

      email: email,

      phone: cleanPhone,

      password: password,

      role: "customer",

      status: "active",

      createdAt: new Date().toISOString(),
    };

    // To SAVE USER
    users.push(newUser);

    localStorage.setItem("montanaUsers", JSON.stringify(users));

    Notiflix.Notify.success("Account created successfully!");

    // Redirect To Login
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1200);
  });
});

// LOGIN PAGE
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  // Stop if this is not the login page
  if (!loginForm) {
    return;
  }

  // Password Visibility Toggle
  const passwordToggle = loginForm.querySelector(".password-toggle");

  if (passwordToggle) {
    passwordToggle.addEventListener("click", function () {
      const passwordInput = document.getElementById("loginPassword");

      const icon = passwordToggle.querySelector("i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";

        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

        passwordToggle.setAttribute("aria-label", "Hide password");
      } else {
        passwordInput.type = "password";

        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

        passwordToggle.setAttribute("aria-label", "Show password");
      }
    });
  }

  // LOGIN SUBMIT
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailPhone = document
      .getElementById("emailPhone")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("loginPassword").value;

    // BASIC VALIDATION
    if (!emailPhone || !password) {
      Notiflix.Notify.failure(
        "Please enter your email/phone number and password.",
      );

      return;
    }

    // TO GET REGISTERED USERS

    const users = JSON.parse(localStorage.getItem("montanaUsers")) || [];

    // TO NORMALIZE PHONE
    const cleanPhone = emailPhone.replace(/\s|-/g, "");

    const user = users.find(function (account) {
      return account.email === emailPhone || account.phone === cleanPhone;
    });

    if (!user) {
      Notiflix.Notify.failure("No account was found with those details.");

      return;
    }

    // Password Check
    if (user.password !== password) {
      Notiflix.Notify.failure("Incorrect password. Please try again.");

      return;
    }

    // LOGIN SESSION
    const loggedInUser = {
      id: user.id,

      firstName: user.firstName,

      lastName: user.lastName,

      email: user.email,

      phone: user.phone,

      role: user.role,

      loginTime: new Date().toISOString(),
    };

    sessionStorage.setItem("montanaLoggedInUser", JSON.stringify(loggedInUser));

    const rememberMe = document.getElementById("remember").checked;

    if (rememberMe) {
      localStorage.setItem(
        "montanaRememberedUser",
        JSON.stringify(loggedInUser),
      );
    } else {
      localStorage.removeItem("montanaRememberedUser");
    }

    Notiflix.Notify.success(`Welcome back, ${user.firstName}!`);

    setTimeout(function () {
      window.location.href = "customer/dashboard.html";
    }, 1200);
  });
});
