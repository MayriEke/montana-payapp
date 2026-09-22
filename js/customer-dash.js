/* ================================
   BALANCE VISIBILITY
================================ */

const totalBalance = document.getElementById("totalBalance");
const totalSavings = document.getElementById("totalSavings");

const totalBalanceVisibilityButton = document.getElementById(
  "totalBalanceVisibilityButton",
);

const totalSavingsVisibilityButton = document.getElementById(
  "totalSavingsVisibilityButton",
);

const totalBalanceVisibilityIcon = document.getElementById(
  "totalBalanceVisibilityIcon",
);

const totalSavingsVisibilityIcon = document.getElementById(
  "totalSavingsVisibilityIcon",
);

const sidebarToggle = document.getElementById("sidebarToggle");

const sidebar = document.querySelector(".dashboard-sidebar");

/* ================================
   TOTAL BALANCE VISIBILITY
================================ */

let isTotalBalanceVisible = true;

if (
  totalBalance &&
  totalBalanceVisibilityButton &&
  totalBalanceVisibilityIcon
) {
  totalBalanceVisibilityButton.addEventListener("click", function () {
    if (isTotalBalanceVisible) {
      totalBalance.textContent = "₦••••••";

      totalBalanceVisibilityIcon.classList.remove("bi-eye");
      totalBalanceVisibilityIcon.classList.add("bi-eye-slash");

      totalBalanceVisibilityButton.setAttribute(
        "aria-label",
        "Show total balance",
      );
    } else {
      totalBalance.textContent = "₦0.00";

      totalBalanceVisibilityIcon.classList.remove("bi-eye-slash");
      totalBalanceVisibilityIcon.classList.add("bi-eye");

      totalBalanceVisibilityButton.setAttribute(
        "aria-label",
        "Hide total balance",
      );
    }

    isTotalBalanceVisible = !isTotalBalanceVisible;
  });
}

/* TOTAL SAVINGS VISIBILITY*/

let isTotalSavingsVisible = true;

if (
  totalSavings &&
  totalSavingsVisibilityButton &&
  totalSavingsVisibilityIcon
) {
  totalSavingsVisibilityButton.addEventListener("click", function () {
    if (isTotalSavingsVisible) {
      totalSavings.textContent = "₦••••••";

      totalSavingsVisibilityIcon.classList.remove("bi-eye");
      totalSavingsVisibilityIcon.classList.add("bi-eye-slash");

      totalSavingsVisibilityButton.setAttribute(
        "aria-label",
        "Show total savings",
      );
    } else {
      totalSavings.textContent = "₦0.00";

      totalSavingsVisibilityIcon.classList.remove("bi-eye-slash");
      totalSavingsVisibilityIcon.classList.add("bi-eye");

      totalSavingsVisibilityButton.setAttribute(
        "aria-label",
        "Hide total savings",
      );
    }

    isTotalSavingsVisible = !isTotalSavingsVisible;
  });
}

// MOBILE SIDEBAR TOGGLE
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("mobile-open");
  });
}

// TRANSACTION PIN
let transactionPin = localStorage.getItem("montanaTransactionPin") || null;

/* ADD MONEY */

const addMoneyButton = document.getElementById("addMoneyButton");

const quickAddMoney = document.getElementById("quickAddMoney");

const totalBalanceElement = document.getElementById("totalBalance");

/*  TEST BALANCE*/

let currentTotalBalance = 0;

/* ADD MONEY MODAL ELEMENTS*/

const addMoneyModal = document.getElementById("addMoneyModal");

const addMoneyModalTitle = document.getElementById("addMoneyModalTitle");

const addMoneyCloseButton = document.getElementById("addMoneyCloseButton");

const addMoneyBackButton = document.getElementById("addMoneyBackButton");

const addMoneyAmount = document.getElementById("addMoneyAmount");

const addMoneyAmountError = document.getElementById("addMoneyAmountError");

const addMoneyContinueButton = document.getElementById(
  "addMoneyContinueButton",
);

const selectedAddMoneyAmount = document.getElementById(
  "selectedAddMoneyAmount",
);

const bankTransferAmount = document.getElementById("bankTransferAmount");

const bankTransferButton = document.getElementById("bankTransferButton");

const cardTransferButton = document.getElementById("cardTransferButton");

const bankTransferMadeButton = document.getElementById(
  "bankTransferMadeButton",
);

/* STEPS */

const addMoneyAmountStep = document.getElementById("addMoneyAmountStep");

const addMoneyPaymentStep = document.getElementById("addMoneyPaymentStep");

const addMoneyBankStep = document.getElementById("addMoneyBankStep");

const addMoneyCardStep = document.getElementById("addMoneyCardStep");

/* CURRENT AMOUNT */

let addMoneyAmountValue = 0;

/* FORMAT NAIRA*/

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/*SHOW STEP*/

function showAddMoneyStep(step) {
  const steps = [
    addMoneyAmountStep,
    addMoneyPaymentStep,
    addMoneyBankStep,
    addMoneyCardStep,
  ];

  steps.forEach(function (currentStep) {
    currentStep.classList.remove("active");
  });

  step.classList.add("active");

  /* Header */

  if (step === addMoneyAmountStep) {
    addMoneyModalTitle.textContent = "Add Money";

    addMoneyBackButton.style.visibility = "hidden";
  } else {
    addMoneyBackButton.style.visibility = "visible";

    if (step === addMoneyPaymentStep) {
      addMoneyModalTitle.textContent = "Payment Method";
    }

    if (step === addMoneyBankStep) {
      addMoneyModalTitle.textContent = "Bank Transfer";
    }

    if (step === addMoneyCardStep) {
      addMoneyModalTitle.textContent = "Card Transfer";
    }
  }
}

/* OPEN MODAL*/

function openAddMoneyModal() {
  addMoneyAmount.value = "";

  addMoneyAmountError.textContent = "";

  addMoneyAmountValue = 0;

  showAddMoneyStep(addMoneyAmountStep);

  addMoneyModal.classList.add("active");

  addMoneyModal.setAttribute("aria-hidden", "false");

  setTimeout(function () {
    addMoneyAmount.focus();
  }, 100);
}

/* CLOSE MODAL*/

function closeAddMoneyModal() {
  addMoneyModal.classList.remove("active");

  addMoneyModal.setAttribute("aria-hidden", "true");
}

/*CONTINUE — ENTER AMOUNT */

function continueAddMoney() {
  const rawAmount = addMoneyAmount.value.trim();

  const amount = Number(rawAmount.replace(/,/g, ""));

  /* Validate */

  if (!rawAmount || isNaN(amount) || amount <= 0) {
    addMoneyAmountError.textContent = "Please enter a valid amount.";

    return;
  }

  addMoneyAmountError.textContent = "";

  addMoneyAmountValue = amount;

  /* Display amount */

  selectedAddMoneyAmount.textContent = formatNaira(amount);

  bankTransferAmount.textContent = formatNaira(amount);

  /* Move to payment method */

  showAddMoneyStep(addMoneyPaymentStep);
}

/* BANK TRANSFER */

function openBankTransfer() {
  showAddMoneyStep(addMoneyBankStep);
}

/* CARD TRANSFER*/

function openCardTransfer() {
  showAddMoneyStep(addMoneyCardStep);
}

/* BACK BUTTON */

function goBackAddMoney() {
  const paymentVisible = addMoneyPaymentStep.classList.contains("active");

  const bankVisible = addMoneyBankStep.classList.contains("active");

  const cardVisible = addMoneyCardStep.classList.contains("active");

  if (paymentVisible) {
    showAddMoneyStep(addMoneyAmountStep);
  } else if (bankVisible || cardVisible) {
    showAddMoneyStep(addMoneyPaymentStep);
  }
}

/* TEST BANK TRANSFER */

function confirmBankTransferMade() {
  Notiflix.Loading.standard("Confirming your payment...");

  setTimeout(function () {
    Notiflix.Loading.remove();

    /* TEST ONLY */

    currentTotalBalance += addMoneyAmountValue;

    totalBalanceElement.textContent = formatNaira(currentTotalBalance);

    closeAddMoneyModal();

    Notiflix.Notify.success(
      `${formatNaira(addMoneyAmountValue)}
            has been added successfully.`,
    );
  }, 2000);
}

/*BUTTON EVENTS */

if (addMoneyButton) {
  addMoneyButton.addEventListener("click", openAddMoneyModal);
}

if (quickAddMoney) {
  quickAddMoney.addEventListener("click", openAddMoneyModal);
}

if (addMoneyContinueButton) {
  addMoneyContinueButton.addEventListener("click", continueAddMoney);
}

if (bankTransferButton) {
  bankTransferButton.addEventListener("click", openBankTransfer);
}

if (cardTransferButton) {
  cardTransferButton.addEventListener("click", openCardTransfer);
}

if (bankTransferMadeButton) {
  bankTransferMadeButton.addEventListener("click", confirmBankTransferMade);
}

if (addMoneyBackButton) {
  addMoneyBackButton.addEventListener("click", goBackAddMoney);
}

if (addMoneyCloseButton) {
  addMoneyCloseButton.addEventListener("click", closeAddMoneyModal);
}

/* ================================
   CLOSE WHEN CLICKING OUTSIDE
================================ */

if (addMoneyModal) {
  addMoneyModal.addEventListener("click", function (event) {
    if (event.target === addMoneyModal) {
      closeAddMoneyModal();
    }
  });
}

/* ================================
   ESCAPE KEY
================================ */

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    addMoneyModal &&
    addMoneyModal.classList.contains("active")
  ) {
    closeAddMoneyModal();
  }
});

/* =====================================================
   WITHDRAW FUNCTIONALITY
===================================================== */

const withdrawButton = document.getElementById("withdrawButton");

/* =====================================================
   OPEN WITHDRAW FLOW
===================================================== */

function openWithdraw() {
  if (currentTotalBalance <= 0) {
    Notiflix.Notify.warning("You do not have enough balance to withdraw.");

    return;
  }

  Notiflix.Confirm.prompt(
    "Withdraw Money",

    `Enter the amount you would like to withdraw.
Available balance: ${formatNaira(currentTotalBalance)}`,

    "",

    "Continue",

    "Close",

    function (clientAnswer) {
      const amount = Number(clientAnswer.replace(/,/g, ""));

      /* Validate amount */

      if (!clientAnswer || isNaN(amount) || amount <= 0) {
        Notiflix.Notify.failure("Please enter a valid withdrawal amount.");

        return;
      }

      /* Check available balance */

      if (amount > currentTotalBalance) {
        Notiflix.Notify.failure(
          "Withdrawal amount cannot be greater than your available balance.",
        );

        return;
      }

      /*
            Wait for the current Notiflix prompt
            to finish closing before opening the next one
            */

      setTimeout(function () {
        enterWithdrawalBankDetails(amount);
      }, 350);
    },

    function () {
      /* User closed */
    },

    {
      plainText: true,
      messageMaxLength: 500,
      backOverlay: true,
      closeButton: true,
      width: "450px",
    },
  );
}

/* =====================================================
   ENTER BANK DETAILS
===================================================== */

function enterWithdrawalBankDetails(amount) {
  Notiflix.Confirm.prompt(
    "Withdrawal Account",

    `Enter the 10-digit account number where you want to receive ${formatNaira(amount)}.`,

    "",

    "Continue",

    "Back",

    function (accountNumber) {
      accountNumber = accountNumber.trim();

      /* Validate account number */

      if (!/^\d{10}$/.test(accountNumber)) {
        Notiflix.Notify.failure(
          "Please enter a valid 10-digit account number.",
        );

        return;
      }

      /*
            Wait for current prompt to close
            */

      setTimeout(function () {
        selectWithdrawalBank(amount, accountNumber);
      }, 350);
    },

    function () {
      /*
            Go back to withdrawal amount
            */

      setTimeout(function () {
        openWithdraw();
      }, 350);
    },

    {
      plainText: true,
      messageMaxLength: 500,
      backOverlay: true,
      closeButton: true,
      width: "450px",
    },
  );
}

/* =====================================================
   SELECT BANK
===================================================== */

function selectWithdrawalBank(amount, accountNumber) {
  Notiflix.Confirm.prompt(
    "Select Bank",

    `Enter the name of your bank.
Account Number: ${accountNumber}
Amount: ${formatNaira(amount)}`,

    "",

    "Review Withdrawal",

    "Cancel",

    function (bankName) {
      bankName = bankName.trim();

      /* Validate bank name */

      if (!bankName) {
        Notiflix.Notify.failure("Please enter your bank name.");

        return;
      }

      /*
            Wait for current prompt to close
            */

      setTimeout(function () {
        confirmWithdrawal(amount, bankName, accountNumber);
      }, 350);
    },

    function () {
      /* User cancelled */
    },

    {
      plainText: true,
      messageMaxLength: 500,
      backOverlay: true,
      closeButton: true,
      width: "450px",
    },
  );
}

/* CREATE TRANSACTION PIN */
function createTransactionPin(onSuccess) {
  Notiflix.Confirm.prompt(
    "Create Transaction pin",
    "Create a 4 digits PIN",
    "",
    "continue",
    "Cancel",

    function (pin) {
      pin = String(pin || "").trim();

      if (!/^\d{4}$/.test(pin)) {
        Notiflix.Notify.failure("PIN must be 4 digits");
        return;
      }

      setTimeout(function () {
        confirmTransactionPIN(pin, onSuccess);
      }, 350);
    },

    function () {},
    {
      plainText: true,
      messageMaxLength: 700,
      backOverlay: true,
      closeButton: true,
      width: "450px",
    },
  );
}

// To verify the transaction PIN
function verifyTransactionPin(onSuccess) {
  const saveTransactionPin = localStorage.getItem("montanaTransactionPin");

  if (!saveTransactionPin) {
    Notiflix.Notify.warning(
      "Please create a transaction PIN before continuing.",
    );

    return;
  }

  Notiflix.Confirm.prompt(
    "Verify Transaction pin",
    "Enter your 4 digits PIN",
    "",
    "Verify",
    "Cancel",

    function (pin) {
      pin = String(pin || "").trim();

      if (!/^\d{4}$/.test(pin)) {
        Notiflix.Notify.failure("Invalid PIN. Please enter a 4-digit PIN.");
        return;
      }

      if (pin !== saveTransactionPin) {
        Notiflix.Notify.failure("Incorrect Pin. Please try again.");
        return;
      }

      setTimeout(function () {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      }, 350);
    },

    function () {},
    {
      plainText: true,
      messageMaxLength: 500,
      backOverlay: true,
      closeButton: true,
      width: "450px",
    },
  );
}
// CONFIRM TRANSACTION PIN
function confirmTransactionPIN(pin, onSuccess) {
  Notiflix.Confirm.prompt(
    "Confirm Transaction pin",
    "Re-enter 4 digits pin",
    "",
    "Set Pin",
    "Back",

    function (confirmPIN) {
      confirmPIN = String(confirmPIN || "").trim();

      if (!/^\d{4}$/.test(confirmPIN)) {
        Notiflix.Notify.failure("Pin must be 4 digits");
        return;
      }

      if (confirmPIN !== pin) {
        Notiflix.Notify.failure("Pin does not match. Please try again.");
        return;
      }

      localStorage.setItem("montanaTransactionPin", pin);

      transactionPin = pin;

      setTimeout(function () {
        Notiflix.Notify.success("Transaction pin created successfully");

        if (typeof onSuccess === "function") {
          onSuccess();
        }
      }, 350);
    },

    function () {
      setTimeout(function () {
        createTransactionPin(onSuccess);
      }, 350);
    },
    {
      plainText: true,
      messageMaxLength: 500,
      backOverlay: true,
      closeButton: true,
      width: "450px",
    },
  );
}

/* =====================================================
   CONFIRM WITHDRAWAL
===================================================== */

function confirmWithdrawal(amount, bankName, accountNumber) {
  Notiflix.Confirm.show(
    "Confirm Withdrawal",

    `You are about to withdraw ${formatNaira(amount)}.

Bank: ${bankName}
Account Number: ${accountNumber}

This is currently a test withdrawal.
No real bank transfer will be made.`,

    "Confirm Withdrawal",

    "Cancel",

    function () {
      /* -----------------------------------------
               Wait for confirmation modal to close
            ----------------------------------------- */

      setTimeout(function () {
        /* -------------------------------------
                   CHECK IF USER HAS A TRANSACTION PIN
                ------------------------------------- */

        if (transactionPin === null) {
          createTransactionPin(function () {
            setTimeout(function () {
              processWithdrawal(amount, bankName, accountNumber);
            }, 350);
          });
        } else {
          verifyTransactionPin(function () {
            setTimeout(function () {
              processWithdrawal(amount, bankName, accountNumber);
            }, 350);
          });
        }
      }, 350);
    },

    function () {
      /* User cancelled */
    },

    {
      plainText: true,
      messageMaxLength: 1000,
      backOverlay: true,
      closeButton: true,
      width: "500px",
    },
  );
}

/* =====================================================
   PROCESS TEST WITHDRAWAL
===================================================== */

function processWithdrawal(amount, bankName, accountNumber) {
  Notiflix.Loading.standard("Processing your withdrawal...");

  setTimeout(function () {
    /* Remove amount from balance */

    currentTotalBalance -= amount;

    /* Update dashboard balance */

    if (totalBalanceElement) {
      totalBalanceElement.textContent = formatNaira(currentTotalBalance);
    }

    /* Remove loading */

    Notiflix.Loading.remove();

    /* Success message */

    Notiflix.Notify.success(
      `${formatNaira(amount)} withdrawal request submitted successfully.`,
    );
  }, 2000);
}

/* =====================================================
   WITHDRAW BUTTON EVENT
===================================================== */

if (withdrawButton) {
  withdrawButton.addEventListener(
    "click",

    openWithdraw,
  );
}

/* SAVE BUTTON EVENT */
const saveMoneyButton = document.getElementById("saveMoneyButton");

if (saveMoneyButton) {
  saveMoneyButton.addEventListener("click", function () {
    console.log("Save button clicked");

    window.location.href = "savings.html";
  });
}
