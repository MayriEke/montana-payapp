// document.addEventListener("DOMContentLoaded", function () {
//   const steps = document.querySelectorAll(".application-step");

//   const progressSteps = document.querySelectorAll(".progress-step");

//   const step1Continue = document.getElementById("step1Continue");

//   const step2Back = document.getElementById("step2Back");

//   const step2Continue = document.getElementById("step2Continue");

//   function showStep(stepNumber) {
//     steps.forEach(function (step, index) {
//       if (index + 1 === stepNumber) {
//         step.classList.add("active");
//       } else {
//         step.classList.remove("active");
//       }
//     });

//     updateProgress(stepNumber);
//   }

//   // UPDATING THE PROGRESS BAR
//   function updateProgress(currentStep) {
//     progressSteps.forEach(function (step, index) {
//       const stepNumber = index + 1;

//       if (stepNumber <= currentStep) {
//         step.classList.add("active");
//       } else {
//         step.classList.remove("active");
//       }
//     });
//   }

function showStep(stepNumber) {
  const steps = document.querySelectorAll(".application-step");

  steps.forEach(function (step, index) {
    if (index + 1 === stepNumber) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  updateProgress(stepNumber);
}

// To Update Progress Bar
function updateProgress(currentStep) {
  const progressSteps = document.querySelectorAll(".progress-step");

  progressSteps.forEach(function (step, index) {
    const stepNumber = index + 1;

    if (stepNumber <= currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const step1Continue = document.getElementById("step1Continue");

  const step2Back = document.getElementById("step2Back");

  const step2Continue = document.getElementById("step2Continue");

  // STEP 1 TO STEP 2
  if (step1Continue) {
    step1Continue.addEventListener("click", function () {
      const firstName = document.getElementById("agentFirstName").value.trim();

      const lastName = document.getElementById("agentLastName").value.trim();

      const email = document.getElementById("agentEmail").value.trim();

      const phone = document.getElementById("agentPhone").value.trim();

      const dateOfBirth = document.getElementById("agentDateOfBirth").value;

      const gender = document.getElementById("agentGender").value;

      //   VALIDATIONS
      if (!firstName) {
        Notiflix.Notify.failure("Please enter your first name.");

        return;
      }

      if (!lastName) {
        Notiflix.Notify.failure("Please enter your last name.");

        return;
      }

      if (!email) {
        Notiflix.Notify.failure("Please enter your email address.");

        return;
      }

      if (!phone) {
        Notiflix.Notify.failure("Please enter your phone number.");

        return;
      }

      if (!dateOfBirth) {
        Notiflix.Notify.failure("Please select your date of birth.");

        return;
      }

      if (!gender) {
        Notiflix.Notify.failure("Please select your gender.");

        return;
      }

      // Save Step 1

      saveApplicationData({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dateOfBirth: dateOfBirth,
        gender: gender,
      });

      showStep(2);
    });
  }

  // STEP 2 BACK ARROW
  if (step2Back) {
    step2Back.addEventListener("click", function () {
      showStep(1);
    });
  }

  // STEP 2 TO STEP 3
  if (step2Continue) {
    step2Continue.addEventListener("click", function () {
      const residentialAddress = document
        .getElementById("agentResidentialAddress")
        .value.trim();

      const state = document.getElementById("agentState").value;

      const lga = document.getElementById("agentLga").value.trim();

      const city = document.getElementById("agentCity").value.trim();

      const operatingLocation = document
        .getElementById("agentOperatingLocation")
        .value.trim();

      const occupation = document
        .getElementById("agentOccupation")
        .value.trim();

      // VALIDATIONS
      if (!residentialAddress) {
        Notiflix.Notify.failure("Please enter your residential address.");

        return;
      }

      if (!state) {
        Notiflix.Notify.failure("Please select your state.");

        return;
      }

      if (!lga) {
        Notiflix.Notify.failure("Please enter your Local Government Area.");

        return;
      }

      if (!city) {
        Notiflix.Notify.failure("Please enter your city or town.");

        return;
      }

      if (!operatingLocation) {
        Notiflix.Notify.failure(
          "Please enter your proposed operating location.",
        );

        return;
      }

      if (!occupation) {
        Notiflix.Notify.failure("Please enter your current occupation.");

        return;
      }

      // SAVE STEP 2
      saveApplicationData({
        residentialAddress: residentialAddress,

        state: state,

        lga: lga,

        city: city,

        operatingLocation: operatingLocation,

        occupation: occupation,
      });

      // ==========================================
      // MOVE TO STEP 3
      // ==========================================

      showStep(3);
    });
  }
});

// ==========================================
// SAVE APPLICATION DATA
// ==========================================

function saveApplicationData(data) {
  const existingData =
    JSON.parse(localStorage.getItem("montanaAgentApplication")) || {};

  const updatedData = {
    ...existingData,

    ...data,

    status: "draft",

    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem("montanaAgentApplication", JSON.stringify(updatedData));
}

// ======================================
// STEP 3 — IDENTITY VERIFICATION
// ======================================

const step3Back = document.getElementById("step3Back");
const step3Continue = document.getElementById("step3Continue");

const agentIdType = document.getElementById("agentIdType");
const agentIdNumber = document.getElementById("agentIdNumber");
const agentIdDocument = document.getElementById("agentIdDocument");

const agentIdDocumentInfo = document.getElementById("agentIdDocumentInfo");

const startSelfieVerification = document.getElementById(
  "startSelfieVerification",
);

const selfieVerificationStatus = document.getElementById(
  "selfieVerificationStatus",
);

const agentFullBodyPhoto = document.getElementById("agentFullBodyPhoto");

const fullBodyPhotoPreview = document.getElementById("fullBodyPhotoPreview");

const fullBodyPhotoInfo = document.getElementById("fullBodyPhotoInfo");

// ======================================
// ID DOCUMENT UPLOAD
// ======================================

agentIdDocument.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) {
    agentIdDocumentInfo.innerHTML = "";
    return;
  }

  const maxFileSize = 5 * 1024 * 1024; // 5MB

  if (file.size > maxFileSize) {
    Notiflix.Notify.failure("ID document must not exceed 5MB.");

    this.value = "";
    agentIdDocumentInfo.innerHTML = "";

    return;
  }

  agentIdDocumentInfo.innerHTML = `
    <i class="bi bi-check-circle-fill"></i>
    ${file.name}
  `;

  agentIdDocumentInfo.classList.add("success");
});

// ======================================
// LIVE SELFIE VERIFICATION
// ======================================

startSelfieVerification.addEventListener("click", function () {
  Notiflix.Loading.standard("Starting live selfie verification...");

  startSelfieVerification.disabled = true;

  setTimeout(function () {
    Notiflix.Loading.remove();

    selfieVerificationStatus.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        Verified
      `;

    selfieVerificationStatus.classList.add("verified");

    startSelfieVerification.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        Selfie Verified
      `;

    Notiflix.Notify.success("Live selfie verification completed successfully.");
  }, 2000);
});

// ======================================
// FULL-BODY PHOTO
// ======================================

agentFullBodyPhoto.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) {
    fullBodyPhotoPreview.innerHTML = "";
    fullBodyPhotoPreview.style.display = "none";
    fullBodyPhotoInfo.innerHTML = "";
    return;
  }

  const maxFileSize = 5 * 1024 * 1024; // 5MB

  if (file.size > maxFileSize) {
    Notiflix.Notify.failure("Full-body photo must not exceed 5MB.");

    this.value = "";
    fullBodyPhotoPreview.innerHTML = "";
    fullBodyPhotoPreview.style.display = "none";
    fullBodyPhotoInfo.innerHTML = "";

    return;
  }

  // Show image preview
  const reader = new FileReader();

  reader.onload = function (event) {
    fullBodyPhotoPreview.innerHTML = `
        <img
          src="${event.target.result}"
          alt="Full-body photo preview"
        />
      `;

    fullBodyPhotoPreview.style.display = "block";
  };

  reader.readAsDataURL(file);

  fullBodyPhotoInfo.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      ${file.name}
    `;

  fullBodyPhotoInfo.classList.add("success");
});

// ======================================
// STEP 3 BACK
// ======================================

step3Back.addEventListener("click", function () {
  showStep(2);
});

// ======================================
// STEP 3 CONTINUE
// ======================================

step3Continue.addEventListener("click", function () {
  const idType = agentIdType.value.trim();
  const idNumber = agentIdNumber.value.trim();

  const idFile = agentIdDocument.files[0];
  const fullBodyFile = agentFullBodyPhoto.files[0];

  const selfieVerified =
    selfieVerificationStatus.classList.contains("verified");

  // ======================================
  // VALIDATION
  // ======================================

  if (!idType) {
    Notiflix.Notify.failure("Please select your ID type.");

    return;
  }

  if (!idNumber) {
    Notiflix.Notify.failure("Please enter your ID number.");

    return;
  }

  if (!idFile) {
    Notiflix.Notify.failure("Please upload your identification document.");

    return;
  }

  if (!selfieVerified) {
    Notiflix.Notify.failure("Please complete the live selfie verification.");

    return;
  }

  if (!fullBodyFile) {
    Notiflix.Notify.failure("Please upload your full-body photograph.");

    return;
  }

  // ======================================
  // SAVE IDENTITY INFORMATION
  // ======================================

  saveApplicationData({
    idType: idType,

    idNumber: idNumber,

    idDocumentName: idFile.name,

    idDocumentType: idFile.type,

    idDocumentSize: idFile.size,

    selfieVerificationStatus: "verified",

    fullBodyPhotoName: fullBodyFile.name,

    fullBodyPhotoType: fullBodyFile.type,

    fullBodyPhotoSize: fullBodyFile.size,

    identityVerificationStatus: "completed",
  });

  // ======================================
  // MOVE TO STEP 4
  // ======================================

  showStep(4);
});

// ======================================
// STEP 4 — SETTLEMENT INFORMATION
// ======================================

const step4Back = document.getElementById("step4Back");
const step4Continue = document.getElementById("step4Continue");

const agentBankName = document.getElementById("agentBankName");

const agentAccountNumber = document.getElementById("agentAccountNumber");

const agentAccountName = document.getElementById("agentAccountName");

const agentSettlementFrequency = document.getElementById(
  "agentSettlementFrequency",
);

const agentSettlementConfirmation = document.getElementById(
  "agentSettlementConfirmation",
);

// ======================================
// STEP 4 BACK
// ======================================

step4Back.addEventListener("click", function () {
  showStep(3);
});

// ======================================
// STEP 4 CONTINUE
// ======================================

step4Continue.addEventListener("click", function () {
  const bankName = agentBankName.value.trim();

  const accountNumber = agentAccountNumber.value.trim();

  const accountName = agentAccountName.value.trim();

  const settlementFrequency = agentSettlementFrequency.value.trim();

  // ======================================
  // VALIDATION
  // ======================================

  if (!bankName) {
    Notiflix.Notify.failure("Please select your bank.");

    return;
  }

  if (!/^\d{10}$/.test(accountNumber)) {
    Notiflix.Notify.failure("Please enter a valid 10-digit account number.");

    return;
  }

  if (!accountName) {
    Notiflix.Notify.failure("Please enter your account name.");

    return;
  }

  if (!settlementFrequency) {
    Notiflix.Notify.failure(
      "Please select your preferred settlement frequency.",
    );

    return;
  }

  if (!agentSettlementConfirmation.checked) {
    Notiflix.Notify.failure(
      "Please confirm that the bank account belongs to you.",
    );

    return;
  }

  // ======================================
  // SAVE SETTLEMENT INFORMATION
  // ======================================

  saveApplicationData({
    bankName: bankName,

    accountNumber: accountNumber,

    accountName: accountName,

    settlementFrequency: settlementFrequency,

    settlementAccountConfirmed: true,
  });

  prepareStep5Review();

  showStep(5);
});

// ======================================
// STEP 5 — REVIEW & SUBMIT
// ======================================

const step5Back = document.getElementById("step5Back");

const editStep1 = document.getElementById("editStep1");
const editStep2 = document.getElementById("editStep2");
const editStep3 = document.getElementById("editStep3");
const editStep4 = document.getElementById("editStep4");

const submitAgentApplication = document.getElementById(
  "submitAgentApplication",
);

const agentApplicationDeclaration = document.getElementById(
  "agentApplicationDeclaration",
);

const agentApplicationDeclarationError = document.getElementById(
  "agentApplicationDeclarationError",
);

// ======================================
// LOAD REVIEW INFORMATION
// ======================================

function loadApplicationReview() {
  const application =
    JSON.parse(localStorage.getItem("montanaAgentApplication")) || {};

  // ======================================
  // PERSONAL INFORMATION
  // ======================================

  document.getElementById("reviewFirstName").textContent =
    application.firstName || "—";

  document.getElementById("reviewLastName").textContent =
    application.lastName || "—";

  document.getElementById("reviewEmail").textContent = application.email || "—";

  document.getElementById("reviewPhone").textContent = application.phone || "—";

  // ======================================
  // ADDRESS & AGENT INFORMATION
  // ======================================

  document.getElementById("reviewResidentialAddress").textContent =
    application.residentialAddress || "—";

  document.getElementById("reviewState").textContent = application.state || "—";

  document.getElementById("reviewLga").textContent = application.lga || "—";

  document.getElementById("reviewCity").textContent = application.city || "—";

  document.getElementById("reviewOperatingLocation").textContent =
    application.operatingLocation || "—";

  document.getElementById("reviewOccupation").textContent =
    application.occupation || "—";

  // ======================================
  // IDENTITY VERIFICATION
  // ======================================

  document.getElementById("reviewIdType").textContent =
    application.idType || "—";

  document.getElementById("reviewIdNumber").textContent =
    application.idNumber || "—";

  document.getElementById("reviewIdDocument").textContent =
    application.idDocumentName || "—";

  // SELFIE STATUS

  const reviewSelfieStatus = document.getElementById("reviewSelfieStatus");

  if (application.selfieVerificationStatus === "verified") {
    reviewSelfieStatus.innerHTML =
      '<i class="bi bi-check-circle-fill"></i> Verified';
  } else {
    reviewSelfieStatus.textContent = "Not verified";
  }

  // FULL-BODY PHOTO

  document.getElementById("reviewFullBodyPhoto").textContent =
    application.fullBodyPhotoName || "—";

  // IDENTITY STATUS

  const reviewIdentityStatus = document.getElementById("reviewIdentityStatus");

  if (application.identityVerificationStatus === "completed") {
    reviewIdentityStatus.innerHTML =
      '<i class="bi bi-check-circle-fill"></i> Completed';
  } else {
    reviewIdentityStatus.textContent = "Incomplete";
  }

  // ======================================
  // SETTLEMENT INFORMATION
  // ======================================

  document.getElementById("reviewBankName").textContent =
    application.bankName || "—";

  document.getElementById("reviewAccountName").textContent =
    application.accountName || "—";

  // MASK ACCOUNT NUMBER

  const accountNumber = application.accountNumber || "";

  if (accountNumber.length === 10) {
    document.getElementById("reviewAccountNumber").textContent =
      "******" + accountNumber.slice(-4);
  } else {
    document.getElementById("reviewAccountNumber").textContent = "—";
  }

  document.getElementById("reviewSettlementFrequency").textContent =
    application.settlementFrequency || "—";
}

// ======================================
// PREPARE STEP 5
// ======================================

function prepareStep5Review() {
  loadApplicationReview();
}

// ======================================
// STEP 5 BACK
// ======================================

if (step5Back) {
  step5Back.addEventListener("click", function () {
    showStep(4);
  });
}

// ======================================
// EDIT STEP 1
// ======================================

if (editStep1) {
  editStep1.addEventListener("click", function () {
    showStep(1);
  });
}

// ======================================
// EDIT STEP 2
// ======================================

if (editStep2) {
  editStep2.addEventListener("click", function () {
    showStep(2);
  });
}

// ======================================
// EDIT STEP 3
// ======================================

if (editStep3) {
  editStep3.addEventListener("click", function () {
    showStep(3);
  });
}

// ======================================
// EDIT STEP 4
// ======================================

if (editStep4) {
  editStep4.addEventListener("click", function () {
    showStep(4);
  });
}

// ======================================
// SUBMIT APPLICATION
// ======================================

if (submitAgentApplication) {
  submitAgentApplication.addEventListener("click", function () {
    // ======================================
    // CHECK DECLARATION
    // ======================================

    if (!agentApplicationDeclaration.checked) {
      agentApplicationDeclarationError.textContent =
        "Please confirm the declaration before submitting your application.";

      Notiflix.Notify.failure(
        "Please confirm the declaration before submitting.",
      );

      return;
    }

    agentApplicationDeclarationError.textContent = "";

    // ======================================
    // GET APPLICATION DATA
    // ======================================

    const application =
      JSON.parse(localStorage.getItem("montanaAgentApplication")) || {};

    // ======================================
    // GENERATE APPLICATION REFERENCE
    // ======================================

    const applicationReference = "MPA-AG-" + Date.now().toString().slice(-8);

    // ======================================
    // CREATE SUBMITTED APPLICATION
    // ======================================

    const submittedApplication = {
      ...application,

      status: "pending",

      applicationReference: applicationReference,

      submittedAt: new Date().toISOString(),

      declarationAccepted: true,
    };

    // ======================================
    // SAVE APPLICATION
    // ======================================

    localStorage.setItem(
      "montanaAgentApplication",
      JSON.stringify(submittedApplication),
    );

    // ======================================
    // SHOW SUCCESS MESSAGE
    // ======================================

    Notiflix.Notify.success(
      "Your agent application has been submitted successfully.",
    );

    // ======================================
    // DISPLAY APPLICATION REFERENCE
    // ======================================

    const submittedApplicationReference = document.getElementById(
      "submittedApplicationReference",
    );

    if (submittedApplicationReference) {
      submittedApplicationReference.textContent = applicationReference;
    }

    // ======================================
    // SHOW SUBMITTED SCREEN
    // ======================================

    showStep(6);

    // ======================================
    // PREVENT DUPLICATE SUBMISSION
    // ======================================

    submitAgentApplication.disabled = true;

    console.log(
      "Montana PayApp Agent Application Submitted:",
      submittedApplication,
    );
  });
}

const returnToDashboard = document.getElementById("returnToDashboard");

if (returnToDashboard) {
  returnToDashboard.addEventListener("click", function () {
    window.location.href = "dashboard.html";
  });
}
