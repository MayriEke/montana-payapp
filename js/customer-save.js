/* TARGET SAVINGS PLAN */

let targetSavingsPlan = {
  targetAmount: 0,
  frequency: "",
  contributionAmount: 0,
  weekday: "",
  monthlyDay: "",
  preferredTime: "",
  startDate: "",
  endDate: "",
  paymentMethod: "",
  agreementOne: false,
  agreementTwo: false,
};

/* TARGET SAVINGS BALANCE */

let targetSavingsBalance = 0;

const chooseTargetSavings = document.getElementById("chooseTargetSavings");

const targetSavingsBalanceElement = document.getElementById(
  "targetSavingsBalance",
);

// LOCKED FUNDS PLAN
let lockFundsPlan = {
  amount: 0,
  duration: 0,
  startDate: "",
  maturityDate: "",
  agreementOne: false,
  agreementTwo: false,
};

let lockedFundsBalance = 0;

//

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}

function updateTargetSavingsBalance() {
  if (targetSavingsBalanceElement) {
    targetSavingsBalanceElement.textContent = formatNaira(targetSavingsBalance);
  }
}

/* START TARGET SAVINGS functionality*/

if (chooseTargetSavings) {
  chooseTargetSavings.addEventListener("click", openTargetSavings);
}

function openTargetSavings() {
  resetTargetSavingsPlan();

  const modal = document.createElement("div");

  modal.id = "targetSavingsModal";

  modal.innerHTML = `

    <div class="target-modal-overlay">

      <div class="target-modal">

        <!-- HEADER -->

        <div class="target-modal-header">

          <div>
            <h3>Target Savings</h3>
            <p id="targetStepText">
              Set your savings goal
            </p>
          </div>

          <button
            type="button"
            id="closeTargetSavings"
            class="target-modal-close"
          >
            &times;
          </button>

        </div>


        <!-- PROGRESS -->

        <div class="target-progress">

          <div
            id="targetProgressBar"
            class="target-progress-bar"
          ></div>

        </div>


        <!-- =================================================
             STEP 1
        ================================================== -->

        <div
          class="target-step"
          id="targetStep1"
        >

          <h4>Set Your Target</h4>

          <p class="target-help">
            How much do you want to save?
          </p>


          <div class="target-form-group">

            <label for="targetAmount">
              Target Amount
            </label>

            <div class="target-money-input">

              <span>₦</span>

              <input
                type="number"
                id="targetAmount"
                min="500"
                placeholder="500"
              >

            </div>

            <small id="targetAmountError"></small>

          </div>


          <h4 class="target-frequency-heading">
            How will you prefer to save?
          </h4>


          <div class="target-frequency-options">

            <button
              type="button"
              class="target-frequency-option"
              data-frequency="daily"
            >
              <i class="fa-solid fa-calendar-day"></i>

              <strong>Daily</strong>

              <span>
                Save every day
              </span>

            </button>


            <button
              type="button"
              class="target-frequency-option"
              data-frequency="weekly"
            >
              <i class="fa-solid fa-calendar-week"></i>

              <strong>Weekly</strong>

              <span>
                Save every week
              </span>

            </button>


            <button
              type="button"
              class="target-frequency-option"
              data-frequency="monthly"
            >
              <i class="fa-solid fa-calendar-days"></i>

              <strong>Monthly</strong>

              <span>
                Save every month
              </span>

            </button>

          </div>


          <button
            type="button"
            id="targetStep1Continue"
            class="target-primary-btn"
          >
            Continue
          </button>

        </div>


        <!-- =================================================
             STEP 2
        ================================================== -->

        <div
          class="target-step"
          id="targetStep2"
          style="display:none;"
        >

          <h4 id="frequencyTitle">
            Savings Details
          </h4>

          <p
            id="frequencyDescription"
            class="target-help"
          ></p>


          <!-- WEEKLY DAY -->

          <div
            id="weeklyDayGroup"
            class="target-form-group"
            style="display:none;"
          >

            <label for="weeklyDay">
              Day of the Week
            </label>

            <select id="weeklyDay">

              <option value="">
                Select a day
              </option>

              <option value="Monday">
                Monday
              </option>

              <option value="Tuesday">
                Tuesday
              </option>

              <option value="Wednesday">
                Wednesday
              </option>

              <option value="Thursday">
                Thursday
              </option>

              <option value="Friday">
                Friday
              </option>

              <option value="Saturday">
                Saturday
              </option>

              <option value="Sunday">
                Sunday
              </option>

            </select>

          </div>


          <!-- MONTHLY DAY -->

          <div
            id="monthlyDayGroup"
            class="target-form-group"
            style="display:none;"
          >

            <label for="monthlyDay">
              Day of the Month
            </label>

            <select id="monthlyDay">

              <option value="">
                Select a date
              </option>

              ${Array.from(
                { length: 28 },
                (_, i) =>
                  `<option value="${i + 1}">
                    ${i + 1}
                  </option>`,
              ).join("")}

            </select>

          </div>


          <!-- PREFERRED TIME -->

          <div class="target-form-group">

            <label for="preferredTime">
              Preferred Time
            </label>

            <input
              type="time"
              id="preferredTime"
            >

          </div>


          <!-- START DATE -->

          <div class="target-form-group">

            <label for="startDate">
              Start Date
            </label>

            <input
              type="date"
              id="startDate"
            >

          </div>


          <!-- END DATE -->

          <div class="target-form-group">

            <label for="endDate">
              End Date
            </label>

            <input
              type="date"
              id="endDate"
            >

          </div>


          <!-- CONTRIBUTION -->

          <div class="target-form-group">

            <label for="contributionAmount">
              Contribution Amount
            </label>

            <div class="target-money-input">

              <span>₦</span>

              <input
                type="number"
                id="contributionAmount"
                min="1"
                placeholder="Enter amount"
              >

            </div>

            <small id="contributionError"></small>

          </div>


          <div class="target-step-buttons">

            <button
              type="button"
              id="targetStep2Back"
              class="target-secondary-btn"
            >
              Back
            </button>

            <button
              type="button"
              id="targetStep2Continue"
              class="target-primary-btn"
            >
              Continue
            </button>

          </div>

        </div>


        <!-- =================================================
             STEP 3 PAYMENT METHOD
        ================================================== -->

        <div
          class="target-step"
          id="targetStep3"
          style="display:none;"
        >

          <h4>Payment Method</h4>

          <p class="target-help">
            How would you like to fund your Target Savings?
          </p>


          <div class="target-payment-options">

            <button
              type="button"
              class="target-payment-option"
              data-payment="Bank Transfer"
            >

              <i class="fa-solid fa-building-columns"></i>

              <div>

                <strong>Bank Transfer</strong>

                <span>
                  Fund your savings through a bank transfer.
                </span>

              </div>

            </button>


            <button
              type="button"
              class="target-payment-option"
              data-payment="Card Payment"
            >

              <i class="fa-solid fa-credit-card"></i>

              <div>

                <strong>Card Payment</strong>

                <span>
                  Use your bank-issued debit card.
                </span>

              </div>

            </button>

          </div>


          <div class="target-step-buttons">

            <button
              type="button"
              id="targetStep3Back"
              class="target-secondary-btn"
            >
              Back
            </button>

          </div>

        </div>


        <!-- =================================================
             STEP 4 REVIEW
        ================================================== -->

        <div
          class="target-step"
          id="targetStep4"
          style="display:none;"
        >

          <h4>Review Your Plan</h4>

          <p class="target-help">
            Please review your Target Savings details.
          </p>


          <div class="target-review-box">

            <div>
              <span>Target Amount</span>
              <strong id="reviewTargetAmount">
                ₦0.00
              </strong>
            </div>

            <div>
              <span>Frequency</span>
              <strong id="reviewFrequency">
                -
              </strong>
            </div>

            <div>
              <span>Contribution</span>
              <strong id="reviewContribution">
                ₦0.00
              </strong>
            </div>

            <div>
              <span>Preferred Time</span>
              <strong id="reviewTime">
                -
              </strong>
            </div>

            <div>
              <span>Start Date</span>
              <strong id="reviewStartDate">
                -
              </strong>
            </div>

            <div>
              <span>End Date</span>
              <strong id="reviewEndDate">
                -
              </strong>
            </div>

            <div>
              <span>Payment Method</span>
              <strong id="reviewPayment">
                -
              </strong>
            </div>

          </div>


          <!-- CALCULATION -->

          <div
            id="targetCalculation"
            class="target-calculation"
          ></div>


          <button
            type="button"
            id="targetReviewContinue"
            class="target-primary-btn"
          >
            Continue
          </button>


          <button
            type="button"
            id="targetReviewBack"
            class="target-secondary-btn"
          >
            Back
          </button>

        </div>


        <!-- =================================================
             STEP 5 AGREEMENT
        ================================================== -->

        <div
          class="target-step"
          id="targetStep5"
          style="display:none;"
        >

          <h4>Target Savings Agreement</h4>

          <p class="target-help">
            Please read and accept both terms before continuing.
          </p>


          <label class="target-agreement">

            <input
              type="checkbox"
              id="agreementOne"
            >

            <span>
              I hereby agree that I will forfeit the interest
              accrued on this Target Savings if I fail to meet
              the target amount by the end date set.
            </span>

          </label>


          <label class="target-agreement">

            <input
              type="checkbox"
              id="agreementTwo"
            >

            <span>
              I hereby also agree that if I break the target
              before the set end date, I will lose all interest
              accrued and bear the 1% payment break fee.
            </span>

          </label>


          <div
            id="agreementError"
            class="target-agreement-error"
          ></div>


          <button
            type="button"
            id="agreementContinue"
            class="target-primary-btn"
          >
            I Agree & Continue
          </button>


          <button
            type="button"
            id="agreementBack"
            class="target-secondary-btn"
          >
            Back
          </button>

        </div>


      </div>

    </div>
  `;

  document.body.appendChild(modal);

  initializeTargetSavingsModal();
}

/* =========================================================
   RESET PLAN
========================================================= */

function resetTargetSavingsPlan() {
  targetSavingsPlan = {
    targetAmount: 0,
    frequency: "",
    contributionAmount: 0,
    weekday: "",
    monthlyDay: "",
    preferredTime: "",
    startDate: "",
    endDate: "",
    paymentMethod: "",
    agreementOne: false,
    agreementTwo: false,
  };
}

/* =========================================================
   INITIALIZE MODAL
========================================================= */

function initializeTargetSavingsModal() {
  const modal = document.getElementById("targetSavingsModal");

  const closeButton = document.getElementById("closeTargetSavings");

  closeButton.addEventListener("click", () => modal.remove());

  /* ---------------------------------------------
     FREQUENCY OPTIONS
  --------------------------------------------- */

  document.querySelectorAll(".target-frequency-option").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".target-frequency-option")
        .forEach((btn) => btn.classList.remove("selected"));

      this.classList.add("selected");

      targetSavingsPlan.frequency = this.dataset.frequency;
    });
  });

  /* ---------------------------------------------
     STEP 1 CONTINUE
  --------------------------------------------- */

  document
    .getElementById("targetStep1Continue")
    .addEventListener("click", handleTargetStepOne);

  /* ---------------------------------------------
     STEP 2 BACK
  --------------------------------------------- */

  document
    .getElementById("targetStep2Back")
    .addEventListener("click", () => showTargetStep(1));

  /* ---------------------------------------------
     STEP 2 CONTINUE
  --------------------------------------------- */

  document
    .getElementById("targetStep2Continue")
    .addEventListener("click", handleTargetStepTwo);

  /* ---------------------------------------------
     PAYMENT OPTIONS
  --------------------------------------------- */

  /* ---------------------------------------------
     PAYMENT OPTIONS
  --------------------------------------------- */

  document.querySelectorAll(".target-payment-option").forEach((button) => {
    button.addEventListener("click", function () {
      const selectedPayment = this.dataset.payment;

      if (selectedPayment === "Bank Transfer") {
        targetSavingsPlan.paymentMethod = "bank";
      } else if (selectedPayment === "Card Payment") {
        targetSavingsPlan.paymentMethod = "card";
      }

      console.log(
        "Target Savings: Payment method selected =",
        targetSavingsPlan.paymentMethod,
      );

      showTargetStep(4);

      populateTargetReview();
    });
  });

  /* ---------------------------------------------
     STEP 3 BACK
  --------------------------------------------- */

  document
    .getElementById("targetStep3Back")
    .addEventListener("click", () => showTargetStep(2));

  /* ---------------------------------------------
     REVIEW CONTINUE
  --------------------------------------------- */

  document
    .getElementById("targetReviewContinue")
    .addEventListener("click", function () {
      const planIsValid = calculateTargetPlan();

      if (!planIsValid) {
        Notiflix.Notify.warning(
          "Please adjust your savings plan so it can reach the target.",
        );

        return;
      }

      showTargetStep(5);
    });
  /* ---------------------------------------------
     REVIEW BACK
  --------------------------------------------- */

  document
    .getElementById("targetReviewBack")
    .addEventListener("click", () => showTargetStep(3));

  /* ---------------------------------------------
     AGREEMENT
  --------------------------------------------- */

  document
    .getElementById("agreementContinue")
    .addEventListener("click", handleAgreement);

  document
    .getElementById("agreementBack")
    .addEventListener("click", () => showTargetStep(4));
}

/* =========================================================
   STEP 1 VALIDATION
========================================================= */

function handleTargetStepOne() {
  const amountInput = document.getElementById("targetAmount");

  const error = document.getElementById("targetAmountError");

  const amount = Number(amountInput.value);

  error.textContent = "";

  if (!amount || amount < 500) {
    error.textContent = "Minimum Target Savings amount is ₦500.";

    return;
  }

  if (!targetSavingsPlan.frequency) {
    Notiflix.Notify.warning("Please select how you prefer to save.");

    return;
  }

  targetSavingsPlan.targetAmount = amount;

  configureFrequencyStep();

  showTargetStep(2);
}

/* =========================================================
   CONFIGURE FREQUENCY STEP
========================================================= */

function configureFrequencyStep() {
  const frequency = targetSavingsPlan.frequency;

  const weeklyGroup = document.getElementById("weeklyDayGroup");

  const monthlyGroup = document.getElementById("monthlyDayGroup");

  const title = document.getElementById("frequencyTitle");

  const description = document.getElementById("frequencyDescription");

  weeklyGroup.style.display = "none";
  monthlyGroup.style.display = "none";

  if (frequency === "daily") {
    title.textContent = "Daily Savings Details";

    description.textContent = "Set how much you want to contribute every day.";
  }

  if (frequency === "weekly") {
    title.textContent = "Weekly Savings Details";

    description.textContent = "Choose your contribution day and amount.";

    weeklyGroup.style.display = "block";
  }

  if (frequency === "monthly") {
    title.textContent = "Monthly Savings Details";

    description.textContent = "Choose your contribution date and amount.";

    monthlyGroup.style.display = "block";
  }
}

/* =========================================================
   STEP 2 VALIDATION
========================================================= */

function handleTargetStepTwo() {
  const frequency = targetSavingsPlan.frequency;

  const preferredTime = document.getElementById("preferredTime").value;

  const startDate = document.getElementById("startDate").value;

  const endDate = document.getElementById("endDate").value;

  const contributionAmount = Number(
    document.getElementById("contributionAmount").value,
  );

  const contributionError = document.getElementById("contributionError");

  contributionError.textContent = "";

  /* ---------------------------------------------
     BASIC VALIDATION
  --------------------------------------------- */

  if (!preferredTime) {
    Notiflix.Notify.warning("Please select your preferred time.");

    return;
  }

  if (!startDate) {
    Notiflix.Notify.warning("Please select a start date.");

    return;
  }

  if (!endDate) {
    Notiflix.Notify.warning("Please select an end date.");

    return;
  }

  if (new Date(endDate) <= new Date(startDate)) {
    Notiflix.Notify.failure("End date must be after the start date.");

    return;
  }

  if (!contributionAmount || contributionAmount <= 0) {
    contributionError.textContent = "Please enter a valid contribution amount.";

    return;
  }

  /* ---------------------------------------------
     WEEKLY VALIDATION
  --------------------------------------------- */

  if (frequency === "weekly") {
    const weekday = document.getElementById("weeklyDay").value;

    if (!weekday) {
      Notiflix.Notify.warning("Please select a day of the week.");

      return;
    }

    targetSavingsPlan.weekday = weekday;
  }

  /* ---------------------------------------------
     MONTHLY VALIDATION
  --------------------------------------------- */

  if (frequency === "monthly") {
    const monthlyDay = document.getElementById("monthlyDay").value;

    if (!monthlyDay) {
      Notiflix.Notify.warning("Please select the day of the month.");

      return;
    }

    targetSavingsPlan.monthlyDay = monthlyDay;
  }

  /* ---------------------------------------------
     SAVE DETAILS
  --------------------------------------------- */

  targetSavingsPlan.preferredTime = preferredTime;

  targetSavingsPlan.startDate = startDate;

  targetSavingsPlan.endDate = endDate;

  targetSavingsPlan.contributionAmount = contributionAmount;

  showTargetStep(3);
}

/* =========================================================
   SHOW TARGET STEP
========================================================= */

function showTargetStep(stepNumber) {
  document.querySelectorAll(".target-step").forEach((step) => {
    step.style.display = "none";
  });

  const step = document.getElementById(`targetStep${stepNumber}`);

  if (step) {
    step.style.display = "block";
  }

  const stepText = document.getElementById("targetStepText");

  const progressBar = document.getElementById("targetProgressBar");

  stepText.textContent = getTargetStepDescription(stepNumber);

  progressBar.style.width = `${(stepNumber / 5) * 100}%`;
}

/* =========================================================
   STEP DESCRIPTION
========================================================= */

function getTargetStepDescription(step) {
  const descriptions = {
    1: "Set your savings goal",

    2: "Set your contribution schedule",

    3: "Choose your payment method",

    4: "Review your savings plan",

    5: "Accept the savings agreement",
  };

  return descriptions[step] || "";
}

/* =========================================================
   POPULATE REVIEW
========================================================= */

function populateTargetReview() {
  document.getElementById("reviewTargetAmount").textContent = formatNaira(
    targetSavingsPlan.targetAmount,
  );

  let frequency = targetSavingsPlan.frequency;

  if (frequency === "daily") {
    frequency = "Daily";
  }

  if (frequency === "weekly") {
    frequency = `Weekly - ${targetSavingsPlan.weekday}`;
  }

  if (frequency === "monthly") {
    frequency = `Monthly - Day ${targetSavingsPlan.monthlyDay}`;
  }

  document.getElementById("reviewFrequency").textContent = frequency;

  document.getElementById("reviewContribution").textContent = formatNaira(
    targetSavingsPlan.contributionAmount,
  );

  document.getElementById("reviewTime").textContent =
    targetSavingsPlan.preferredTime;

  document.getElementById("reviewStartDate").textContent =
    targetSavingsPlan.startDate;

  document.getElementById("reviewEndDate").textContent =
    targetSavingsPlan.endDate;

  document.getElementById("reviewPayment").textContent =
    targetSavingsPlan.paymentMethod;

  calculateTargetPlan();
}

/* =========================================================
   TARGET PLAN CALCULATION
========================================================= */

function calculateTargetPlan() {
  const start = new Date(targetSavingsPlan.startDate);

  const end = new Date(targetSavingsPlan.endDate);

  let occurrences = 0;

  /* =====================================================
     DAILY
  ===================================================== */

  if (targetSavingsPlan.frequency === "daily") {
    occurrences = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  }

  /* =====================================================
     WEEKLY
  ===================================================== */

  if (targetSavingsPlan.frequency === "weekly") {
    const selectedDay = targetSavingsPlan.weekday;

    const dayNumbers = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const targetDay = dayNumbers[selectedDay];

    let currentDate = new Date(start);

    while (currentDate <= end) {
      if (currentDate.getDay() === targetDay) {
        occurrences++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  /* =====================================================
     MONTHLY
  ===================================================== */

  if (targetSavingsPlan.frequency === "monthly") {
    const selectedDate = Number(targetSavingsPlan.monthlyDay);

    let currentDate = new Date(start.getFullYear(), start.getMonth(), 1);

    while (currentDate <= end) {
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      ).getDate();

      const actualDay = Math.min(selectedDate, daysInMonth);

      const contributionDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        actualDay,
      );

      if (contributionDate >= start && contributionDate <= end) {
        occurrences++;
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  /* =====================================================
     PROJECTED TOTAL
  ===================================================== */

  const projectedAmount = occurrences * targetSavingsPlan.contributionAmount;

  const targetAmount = targetSavingsPlan.targetAmount;

  const shortfall = Math.max(targetAmount - projectedAmount, 0);

  const calculation = document.getElementById("targetCalculation");

  const continueButton = document.getElementById("targetReviewContinue");

  /* =====================================================
     TARGET REACHED
  ===================================================== */

  if (projectedAmount >= targetAmount) {
    calculation.innerHTML = `

      <strong>
        ✓ You're on track to reach your target.
      </strong>

      <span>
        Estimated contributions:
        ${formatNaira(projectedAmount)}
      </span>

    `;

    continueButton.disabled = false;

    continueButton.style.opacity = "1";

    continueButton.style.cursor = "pointer";

    return true;
  }

  /* =====================================================
     TARGET NOT REACHED
  ===================================================== */

  calculation.innerHTML = `

    <strong>
      ⚠️ This plan may not reach your target.
    </strong>

    <span>
      Estimated contributions:
      ${formatNaira(projectedAmount)}
    </span>

    <span>
      Target:
      ${formatNaira(targetAmount)}
    </span>

    <span>
      Amount still required:
      ${formatNaira(shortfall)}
    </span>

    <small>
      Adjust your contribution amount or extend
      your end date to continue.
    </small>

  `;

  /* Disable Continue */

  continueButton.disabled = true;

  continueButton.style.opacity = "0.5";

  continueButton.style.cursor = "not-allowed";

  return false;
}

/* =========================================================
   AGREEMENT
========================================================= */

function handleAgreement() {
  const agreementOne = document.getElementById("agreementOne");
  const agreementTwo = document.getElementById("agreementTwo");
  const agreementError = document.getElementById("agreementError");

  if (!agreementOne.checked || !agreementTwo.checked) {
    agreementError.textContent =
      "Please accept both agreements before continuing.";

    agreementError.style.display = "block";

    return;
  }

  agreementError.style.display = "none";

  targetSavingsPlan.agreementOne = true;
  targetSavingsPlan.agreementTwo = true;

  console.log("Final Target Savings Plan:", targetSavingsPlan);

  // =========================================
  // VERIFY TRANSACTION PIN
  // =========================================

  verifyTargetSavingsPin(function () {
    console.log("Target Savings: PIN verified. Opening payment method...");

    console.log(
      "Target Savings: Selected payment method =",
      targetSavingsPlan.paymentMethod,
    );

    // =========================================
    // OPEN SELECTED PAYMENT METHOD
    // =========================================

    if (targetSavingsPlan.paymentMethod === "bank") {
      showTargetBankTransfer();
    } else if (targetSavingsPlan.paymentMethod === "card") {
      showTargetCardPayment();
    } else {
      Notiflix.Notify.failure("Please select a payment method.");
    }
  });
}

/* Payment Method functionality */
function showTargetBankTransfer() {
  const amount = formatNaira(targetSavingsPlan.contributionAmount);

  Notiflix.Confirm.show(
    "Target Savings - Bank Transfer",

    `
      <div style="text-align:left; line-height:1.7;">

        <p>
          Transfer your contribution to the Montana PayApp
          account below.
        </p>

        <hr>

        <p><strong>TEST ACCOUNT</strong></p>

        <p>
          <strong>Bank:</strong> Providus Bank
          <br>
          <strong>Account Name:</strong> Montana PayApp TEST
          <br>
          <strong>Account Number:</strong> 0000000000
        </p>

        <p>
          <strong>Amount:</strong> ${amount}
        </p>

        <hr>

        <small>
          This is a test. No real transfer should
          be made to these details.
        </small>

      </div>
    `,

    "I have made the transfer",
    "Cancel",

    function () {
      console.log("Target Savings: Test bank transfer confirmed.");

      processTargetSavingsPayment();
    },

    function () {
      console.log("Target Savings: Bank transfer cancelled.");
    },

    {
      plainText: false,
      messageMaxLength: 2000,
      backOverlay: true,
      closeButton: true,
      width: "500px",
    },
  );
}

function showTargetCardPayment() {
  const amount = formatNaira(targetSavingsPlan.contributionAmount);

  Notiflix.Confirm.show(
    "Target Savings - Card Payment",

    `
      <div style="text-align:left;">

        <p>
          Enter your bank-issued card details to fund
          this Target Savings contribution.
        </p>

        <div style="margin-bottom:12px;">
          <label>Card Number</label>
          <input
            type="text"
            id="targetCardNumber"
            class="form-control"
            maxlength="19"
            placeholder="1234 5678 9012 3456"
          >
        </div>

        <div style="margin-bottom:12px;">
          <label>Cardholder Name</label>
          <input
            type="text"
            id="targetCardName"
            class="form-control"
            placeholder="Cardholder name"
          >
        </div>

        <div style="display:flex; gap:10px;">

          <div style="flex:1;">
            <label>Expiry</label>
            <input
              type="text"
              id="targetCardExpiry"
              class="form-control"
              maxlength="5"
              placeholder="MM/YY"
            >
          </div>

          <div style="flex:1;">
            <label>CVV</label>
            <input
              type="password"
              id="targetCardCvv"
              class="form-control"
              maxlength="4"
              placeholder="CVV"
            >
          </div>

        </div>

        <p style="margin-top:15px;">
          <strong>Amount:</strong> ${amount}
        </p>

        <small>
          Test environment only. No real card transaction
          will be processed.
        </small>

      </div>
    `,

    "Continue",
    "Cancel",

    function () {
      const cardNumber = document
        .getElementById("targetCardNumber")
        ?.value.trim();

      const cardName = document.getElementById("targetCardName")?.value.trim();

      const cardExpiry = document
        .getElementById("targetCardExpiry")
        ?.value.trim();

      const cardCvv = document.getElementById("targetCardCvv")?.value.trim();

      if (!cardNumber) {
        Notiflix.Notify.failure("Please enter your card number.");

        return;
      }

      if (!cardName) {
        Notiflix.Notify.failure("Please enter the cardholder name.");

        return;
      }

      if (!cardExpiry) {
        Notiflix.Notify.failure("Please enter the card expiry date.");

        return;
      }

      if (!cardCvv) {
        Notiflix.Notify.failure("Please enter the CVV.");

        return;
      }

      console.log("Target Savings: Test card details accepted.");

      processTargetSavingsPayment();
    },

    function () {
      console.log("Target Savings: Card payment cancelled.");
    },

    {
      plainText: false,
      messageMaxLength: 2500,
      backOverlay: true,
      closeButton: true,
      width: "550px",
    },
  );
}

//  Processing payments
function processTargetSavingsPayment() {
  console.log("Target Savings: Starting payment processing...");

  Notiflix.Loading.standard("Processing Target Savings...");

  setTimeout(function () {
    Notiflix.Loading.remove();

    completeTargetSavings();
  }, 2000);
}

function completeTargetSavings() {
  const contribution = Number(targetSavingsPlan.contributionAmount) || 0;

  // Update Target Savings balance
  targetSavingsBalance += contribution;

  // Update displayed Target Savings balance
  const targetBalanceElement = document.getElementById("targetSavingsBalance");

  if (targetBalanceElement) {
    targetBalanceElement.textContent = formatNaira(targetSavingsBalance);
  }

  // Save Target Savings balance for testing
  localStorage.setItem("montanaTargetSavingsBalance", targetSavingsBalance);

  // Save the Target Savings plan
  localStorage.setItem(
    "montanaTargetSavingsPlan",
    JSON.stringify(targetSavingsPlan),
  );

  console.log("Target Savings: Savings balance updated.");

  console.log("Target Savings: Plan saved.");

  Notiflix.Notify.success("Target Savings created successfully!");
}

function verifyTargetSavingsPin(onSuccess) {
  const savedTransactionPin = localStorage.getItem("montanaTransactionPin");

  if (!savedTransactionPin) {
    Notiflix.Notify.warning(
      "Please create a transaction PIN before continuing.",
    );

    return;
  }

  // Temporarily hide Target Savings modal
  const targetModal = document.getElementById("targetSavingsModal");

  if (targetModal) {
    targetModal.style.visibility = "hidden";
  }

  // Show PIN verification
  Notiflix.Confirm.prompt(
    "Verify Transaction pin",

    "Enter your 4 digits PIN",

    "",

    "Verify",

    "Cancel",

    function (pin) {
      pin = String(pin || "").trim();

      console.log("Target Savings: PIN entered");

      if (!/^\d{4}$/.test(pin)) {
        Notiflix.Notify.failure("Invalid PIN. Please enter a 4-digit PIN.");

        // Show Target Savings modal again
        if (targetModal) {
          targetModal.style.visibility = "visible";
        }

        return;
      }

      if (pin !== savedTransactionPin) {
        Notiflix.Notify.failure("Incorrect PIN. Please try again.");

        // Show Target Savings modal again
        if (targetModal) {
          targetModal.style.visibility = "visible";
        }

        return;
      }

      console.log("Target Savings: PIN verified successfully.");

      setTimeout(function () {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      }, 350);
    },

    function () {
      console.log("Target Savings: PIN verification cancelled.");

      // Show Target Savings modal again
      if (targetModal) {
        targetModal.style.visibility = "visible";
      }
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

/* LOCK FUNDS EVENT */
const chooseLockFunds = document.getElementById("chooseLockFunds");

if (chooseLockFunds) {
  chooseLockFunds.addEventListener("click", function () {
    showLockFundsForm();
  });
}

function showLockFundsForm() {
  const existingModal = document.getElementById("lockFundsModal");

  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div
      id="lockFundsModal"
      class="target-custom-modal"
    >

      <div class="target-modal-content">

        <div class="target-modal-header">

          <div>
            <h3>Lock Funds</h3>
            <p>Lock your money securely until your selected maturity date.</p>
          </div>

          <button
            type="button"
            id="closeLockFundsModal"
            class="target-modal-close"
          >
            &times;
          </button>

        </div>


        <!-- =========================================
             STEP 1
        ========================================== -->

        <div
          class="lock-step"
          id="lockStep1"
        >

          <h4>Lock Amount</h4>

          <p class="target-help">
            How much would you like to lock?
          </p>

          <div class="mb-3">

            <label for="lockAmount">
              Amount
            </label>

            <input
              type="number"
              id="lockAmount"
              class="form-control"
              min="500"
              placeholder="Enter amount"
            >

            <small>
              Minimum lock amount: ₦500
            </small>

          </div>


          <div class="target-step-buttons">

            <button
              type="button"
              id="lockStep1Continue"
              class="target-primary-btn"
            >
              Continue
            </button>

          </div>

        </div>

      </div>

    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Close button
  document
    .getElementById("closeLockFundsModal")
    .addEventListener("click", function () {
      document.getElementById("lockFundsModal")?.remove();
    });

  // Continue button
  document
    .getElementById("lockStep1Continue")
    .addEventListener("click", function () {
      const amountInput = document.getElementById("lockAmount");

      const amount = Number(amountInput.value);

      if (!amount || amount < 500) {
        Notiflix.Notify.failure("Minimum Lock Funds amount is ₦500.");

        return;
      }

      lockFundsPlan.amount = amount;

      console.log("Lock Funds: Amount entered =", lockFundsPlan.amount);

      showLockFundsStep2();
    });
}

// =================================================
// LOCK FUNDS
// STEP 2 - LOCK PERIOD
// =================================================

// Lock funds period: Shows the second step of the lock funds process
function showLockFundsStep2() {
  const modalContent = document.querySelector(
    "#lockFundsModal .target-modal-content",
  );

  if (!modalContent) {
    console.error("Lock Funds modal content not found.");
    return;
  }

  modalContent.innerHTML = `

    <div class="target-modal-header">

      <div>

        <h3>Lock Funds</h3>

        <p>
          Choose how long you want to keep your money locked.
        </p>

      </div>

      <button
        type="button"
        id="closeLockFundsModal"
        class="target-modal-close"
      >
        &times;
      </button>

    </div>


    <div
      class="lock-step"
      id="lockStep2"
    >

      <h4>Choose Lock Period</h4>

      <p class="target-help">
        Your funds will remain locked until the maturity date.
      </p>


      <div class="lock-period-options">

        <button
          type="button"
          class="lock-period-option"
          data-period="7"
        >
          <strong>7 Days</strong>
          <span>Short-term lock</span>
        </button>


        <button
          type="button"
          class="lock-period-option"
          data-period="14"
        >
          <strong>14 Days</strong>
          <span>Two-week lock</span>
        </button>


        <button
          type="button"
          class="lock-period-option"
          data-period="30"
        >
          <strong>30 Days</strong>
          <span>One-month lock</span>
        </button>


        <button
          type="button"
          class="lock-period-option"
          data-period="60"
        >
          <strong>60 Days</strong>
          <span>Two-month lock</span>
        </button>


        <button
          type="button"
          class="lock-period-option"
          data-period="90"
        >
          <strong>90 Days</strong>
          <span>Three-month lock</span>
        </button>

      </div>


      <div class="lock-maturity-preview">

        <span>Selected maturity date</span>

        <strong id="lockMaturityDate">
          Select a lock period
        </strong>

      </div>


      <div class="target-step-buttons">

        <button
          type="button"
          id="lockStep2Back"
          class="target-secondary-btn"
        >
          Back
        </button>

        <button
          type="button"
          id="lockStep2Continue"
          class="target-primary-btn"
          disabled
        >
          Continue
        </button>

      </div>

    </div>

  `;

  // Close modal

  document
    .getElementById("closeLockFundsModal")
    .addEventListener("click", function () {
      document.getElementById("lockFundsModal")?.remove();
    });

  // Back

  document
    .getElementById("lockStep2Back")
    .addEventListener("click", function () {
      showLockFundsForm();

      const amountInput = document.getElementById("lockAmount");

      if (amountInput) {
        amountInput.value = lockFundsPlan.amount;
      }
    });

  const periodButtons = document.querySelectorAll(
    "#lockStep2 .lock-period-option",
  );

  const continueButton = document.getElementById("lockStep2Continue");

  const maturityDate = document.getElementById("lockMaturityDate");

  periodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      periodButtons.forEach(function (item) {
        item.classList.remove("selected");
      });

      this.classList.add("selected");

      const period = Number(this.dataset.period);

      lockFundsPlan.lockPeriod = period;

      const startDate = new Date();

      const maturity = new Date(startDate);

      maturity.setDate(maturity.getDate() + period);

      lockFundsPlan.startDate = formatLockDate(startDate);

      lockFundsPlan.maturityDate = formatLockDate(maturity);

      maturityDate.textContent = lockFundsPlan.maturityDate;

      continueButton.disabled = false;

      console.log("Lock Funds: Period selected =", lockFundsPlan.lockPeriod);

      console.log("Lock Funds: Maturity date =", lockFundsPlan.maturityDate);
    });
  });

  continueButton.addEventListener("click", function () {
    if (!lockFundsPlan.lockPeriod) {
      Notiflix.Notify.failure("Please select a lock period.");

      return;
    }

    console.log("Lock Funds Step 2 completed:", lockFundsPlan);

    showLockFundsReview();
  });
}

// =================================================
// LOCK FUNDS
// STEP 3 - REVIEW
// =================================================

function showLockFundsReview() {
  const modalContent = document.querySelector(
    "#lockFundsModal .target-modal-content",
  );

  if (!modalContent) {
    console.error("Lock Funds modal content not found.");
    return;
  }

  modalContent.innerHTML = `

    <div class="target-modal-header">

      <div>

        <h3>Review Lock Funds</h3>

        <p>
          Please review your lock details before continuing.
        </p>

      </div>

      <button
        type="button"
        id="closeLockFundsModal"
        class="target-modal-close"
      >
        &times;
      </button>

    </div>


    <div
      class="lock-step"
      id="lockStep3"
    >

      <h4>Lock Summary</h4>

      <p class="target-help">
        Confirm that the information below is correct.
      </p>


      <div class="lock-review-card">

        <div class="lock-review-row">
          <span>Amount to Lock</span>

          <strong>
            ${formatNaira(lockFundsPlan.amount)}
          </strong>
        </div>


        <div class="lock-review-row">
          <span>Lock Period</span>

          <strong>
            ${lockFundsPlan.lockPeriod} Days
          </strong>
        </div>


        <div class="lock-review-row">
          <span>Start Date</span>

          <strong>
            ${lockFundsPlan.startDate}
          </strong>
        </div>


        <div class="lock-review-row">
          <span>Maturity Date</span>

          <strong>
            ${lockFundsPlan.maturityDate}
          </strong>
        </div>

      </div>


      <div class="lock-review-notice">

        <i class="fa-solid fa-lock"></i>

        <div>

          <strong>
            Your funds will be locked
          </strong>

          <p>
            The amount above will remain locked until
            the maturity date you selected.
          </p>

        </div>

      </div>


      <div class="target-step-buttons">

        <button
          type="button"
          id="lockStep3Back"
          class="target-secondary-btn"
        >
          Back
        </button>


        <button
          type="button"
          id="lockStep3Continue"
          class="target-primary-btn"
        >
          Continue
        </button>

      </div>

    </div>

  `;

  // =============================================
  // CLOSE
  // =============================================

  document
    .getElementById("closeLockFundsModal")
    .addEventListener("click", function () {
      document.getElementById("lockFundsModal")?.remove();
    });

  document
    .getElementById("lockStep3Back")
    .addEventListener("click", function () {
      showLockFundsStep2();
    });

  document
    .getElementById("lockStep3Continue")
    .addEventListener("click", function () {
      console.log("Lock Funds: Review confirmed.");

      showLockFundsAgreement();
    });
}

// Date formatter for lock funds
function formatLockDate(date) {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "";
  }

  return d.toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function showLockFundsAgreement() {
  const modalContent = document.querySelector(
    "#lockFundsModal .target-modal-content",
  );

  if (!modalContent) {
    console.error("Lock Funds modal content not found.");
    return;
  }

  modalContent.innerHTML = `
    <div class="target-modal-header">
      <div>
        <h3>Lock Funds Agreement</h3>
        <p>Please read and accept the terms before continuing.</p>
      </div>

      <button
        type="button"
        id="closeLockFundsModal"
        class="target-modal-close"
      >
        &times;
      </button>
    </div>

    <div class="lock-step" id="lockStep4">

      <h4>Before You Continue</h4>

      <p class="target-help">
        Please confirm that you understand how Lock Funds works.
      </p>

      <div class="lock-agreement-box">

        <label class="lock-agreement-item">
          <input type="checkbox" id="lockAgreementOne">

          <span>
            I understand that the amount I lock will remain unavailable
            for withdrawal until the selected maturity date.
          </span>
        </label>

        <label class="lock-agreement-item">
          <input type="checkbox" id="lockAgreementTwo">

          <span>
            I understand that any request to break or withdraw the locked
            funds before maturity may be subject to the applicable
            Lock Funds terms and charges.
          </span>
        </label>

      </div>

      <div
        id="lockAgreementError"
        class="lock-agreement-error"
        style="display: none;"
      >
        Please accept both agreements before continuing.
      </div>

      <div class="target-step-buttons">

        <button
          type="button"
          id="lockStep4Back"
          class="target-secondary-btn"
        >
          Back
        </button>

        <button
          type="button"
          id="lockStep4Continue"
          class="target-primary-btn"
        >
          Continue
        </button>

      </div>

    </div>
  `;

  // Close modal
  document
    .getElementById("closeLockFundsModal")
    .addEventListener("click", function () {
      document.getElementById("lockFundsModal")?.remove();
    });

  // Back to review
  document
    .getElementById("lockStep4Back")
    .addEventListener("click", function () {
      showLockFundsReview();
    });

  // Continue
  document
    .getElementById("lockStep4Continue")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const agreementOne = document.getElementById("lockAgreementOne");

      const agreementTwo = document.getElementById("lockAgreementTwo");

      const agreementError = document.getElementById("lockAgreementError");

      if (!agreementOne.checked || !agreementTwo.checked) {
        agreementError.textContent =
          "Please accept both agreements before continuing.";

        agreementError.style.display = "block";

        return;
      }

      agreementError.style.display = "none";

      lockFundsPlan.agreementOne = true;
      lockFundsPlan.agreementTwo = true;

      console.log("Lock Funds: Agreement accepted.", lockFundsPlan);

      //To verify the transaction PIN before proceeding to payment
      const lockFundsModal = document.getElementById("lockFundsModal");

      if (lockFundsModal) {
        lockFundsModal.style.display = "none";
      }

      setTimeout(() => {
        verifyLockFundsPin(function () {
          console.log("Lock Funds: PIN verified. Proceeding to payment...");

          setTimeout(function () {
            showLockFundsPaymentMethod();
          }, 600);

          // showLockFundsPayment(); // Implement this function to handle payment processing
        });
      }, 100);
    });
}

// Payment method selector

function showLockFundsPaymentMethod() {
  const amount = formatNaira(lockFundsPlan.amount);

  Notiflix.Confirm.show(
    "Lock Funds - Payment Method",

    `
      <div style="text-align:left; line-height:1.7;">

        <p>
          Choose how you would like to fund your
          Lock Funds plan.
        </p>

        <hr>

        <p>
          <strong>Amount to lock:</strong> ${amount}
        </p>

        <div style="margin-top:15px;">

          <label
            style="
              display:flex;
              align-items:flex-start;
              gap:10px;
              padding:14px;
              border:1px solid #e5e7eb;
              border-radius:10px;
              margin-bottom:12px;
              cursor:pointer;
            "
          >

            <input
              type="radio"
              name="lockPaymentMethod"
              value="bank"
              checked
              style="margin-top:5px;"
            >

            <span>
              <strong>🏦 Bank Transfer</strong>
              <br>
              <small>
                Transfer the amount from your bank account.
              </small>
            </span>

          </label>


          <label
            style="
              display:flex;
              align-items:flex-start;
              gap:10px;
              padding:14px;
              border:1px solid #e5e7eb;
              border-radius:10px;
              cursor:pointer;
            "
          >

            <input
              type="radio"
              name="lockPaymentMethod"
              value="card"
              style="margin-top:5px;"
            >

            <span>
              <strong>💳 Card Payment</strong>
              <br>
              <small>
                Pay using your bank-issued debit card.
              </small>
            </span>

          </label>

        </div>

        <p style="margin-top:15px;">
          <small>
            Select your preferred payment method and continue.
          </small>
        </p>

      </div>
    `,

    "Continue",
    "Cancel",

    function () {
      const selectedMethod = document.querySelector(
        'input[name="lockPaymentMethod"]:checked',
      );

      if (!selectedMethod) {
        Notiflix.Notify.failure("Please select a payment method.");

        return;
      }

      lockFundsPlan.paymentMethod = selectedMethod.value;

      console.log(
        "Lock Funds: Payment method selected =",
        lockFundsPlan.paymentMethod,
      );

      // Wait for the payment-method dialog to completely close
      setTimeout(function () {
        if (lockFundsPlan.paymentMethod === "bank") {
          showLockBankTransfer();
        } else if (lockFundsPlan.paymentMethod === "card") {
          showLockCardPayment();
        }
      }, 500);
    },

    function () {
      console.log("Lock Funds: Payment method selection cancelled.");
    },

    {
      plainText: false,
      messageMaxLength: 2500,
      backOverlay: true,
      closeButton: true,
      width: "500px",
    },
  );
}

// ==========================================
// LOCK FUNDS - BANK TRANSFER
// ==========================================

function showLockBankTransfer() {
  const amount = formatNaira(lockFundsPlan.amount);

  Notiflix.Confirm.show(
    "Lock Funds - Bank Transfer",

    `
      <div style="text-align:left; line-height:1.7;">

        <p>
          Transfer the amount below to the Montana PayApp
          account.
        </p>

        <hr>

        <p>
          <strong>TEST ACCOUNT</strong>
        </p>

        <p>
          <strong>Bank:</strong> Providus Bank
          <br>

          <strong>Account Name:</strong>
          Montana PayApp TEST

          <br>

          <strong>Account Number:</strong>
          0000000000
        </p>

        <p>
          <strong>Amount:</strong> ${amount}
        </p>

        <hr>

        <small>
          This is a test environment.
          No real transfer should be made to these details.
        </small>

      </div>
    `,

    "I have made the transfer",

    "Cancel",

    function () {
      console.log("Lock Funds: Test bank transfer confirmed.");

      processLockFundsPayment();
    },

    function () {
      console.log("Lock Funds: Bank transfer cancelled.");
    },

    {
      plainText: false,
      messageMaxLength: 2500,
      backOverlay: true,
      closeButton: true,
      width: "500px",
    },
  );
}

// card payment for lock funds
function showLockCardPayment() {
  const amount = formatNaira(lockFundsPlan.amount);

  Notiflix.Confirm.show(
    "Lock Funds - Card Payment",

    `
      <div style="text-align:left;">

        <p>
          Enter your bank-issued debit card details
          to fund your Lock Funds plan.
        </p>

        <div style="margin-bottom:12px;">

          <label>
            Card Number
          </label>

          <input
            type="text"
            id="lockCardNumber"
            class="form-control"
            maxlength="19"
            placeholder="1234 5678 9012 3456"
          >

        </div>


        <div style="margin-bottom:12px;">

          <label>
            Cardholder Name
          </label>

          <input
            type="text"
            id="lockCardName"
            class="form-control"
            placeholder="Cardholder name"
          >

        </div>


        <div
          style="
            display:flex;
            gap:10px;
          "
        >

          <div style="flex:1;">

            <label>
              Expiry
            </label>

            <input
              type="text"
              id="lockCardExpiry"
              class="form-control"
              maxlength="5"
              placeholder="MM/YY"
            >

          </div>


          <div style="flex:1;">

            <label>
              CVV
            </label>

            <input
              type="password"
              id="lockCardCvv"
              class="form-control"
              maxlength="4"
              placeholder="CVV"
            >

          </div>

        </div>


        <p style="margin-top:15px;">

          <strong>
            Amount:
          </strong>

          ${amount}

        </p>


        <small>
          Test environment only.
          No real card transaction will be processed.
        </small>

      </div>
    `,

    "Continue",

    "Cancel",

    function () {
      const cardNumber = document
        .getElementById("lockCardNumber")
        ?.value.trim();

      const cardName = document.getElementById("lockCardName")?.value.trim();

      const cardExpiry = document
        .getElementById("lockCardExpiry")
        ?.value.trim();

      const cardCvv = document.getElementById("lockCardCvv")?.value.trim();

      if (!cardNumber) {
        Notiflix.Notify.failure("Please enter your card number.");

        return;
      }

      if (!cardName) {
        Notiflix.Notify.failure("Please enter the cardholder name.");

        return;
      }

      if (!cardExpiry) {
        Notiflix.Notify.failure("Please enter the card expiry date.");

        return;
      }

      if (!cardCvv) {
        Notiflix.Notify.failure("Please enter the CVV.");

        return;
      }

      console.log("Lock Funds: Test card details accepted.");

      processLockFundsPayment();
    },

    function () {
      console.log("Lock Funds: Card payment cancelled.");
    },

    {
      plainText: false,
      messageMaxLength: 2500,
      backOverlay: true,
      closeButton: true,
      width: "550px",
    },
  );
}

// payment processing for lock funds
function processLockFundsPayment() {
  console.log("Lock Funds: Starting payment processing...");

  Notiflix.Loading.standard("Processing Lock Funds...");

  setTimeout(function () {
    Notiflix.Loading.remove();

    completeLockFunds();
  }, 2000);
}

// complete lock funds process
// ==========================================
// LOCK FUNDS - COMPLETE PLAN
// ==========================================

function completeLockFunds() {
  const amount = Number(lockFundsPlan.amount);

  if (!amount || amount <= 0) {
    Notiflix.Notify.failure("Invalid Lock Funds amount.");
    return;
  }

  console.log("Lock Funds: Completing plan...");

  // ==========================================
  // 1. UPDATE LOCKED FUNDS BALANCE
  // ==========================================

  lockedFundsBalance = Number(lockedFundsBalance || 0) + amount;

  localStorage.setItem("montanaLockedFundsBalance", lockedFundsBalance);

  const lockedFundsBalanceElement =
    document.getElementById("lockedFundsBalance");

  if (lockedFundsBalanceElement) {
    lockedFundsBalanceElement.textContent = formatNaira(lockedFundsBalance);
  }

  // ==========================================
  // 2. UPDATE TOTAL SAVINGS
  // ==========================================

  const flexible =
    Number(localStorage.getItem("montanaFlexibleSavingsBalance")) || 0;

  const target =
    Number(localStorage.getItem("montanaTargetSavingsBalance")) || 0;

  const locked = Number(localStorage.getItem("montanaLockedFundsBalance")) || 0;

  totalSavings = flexible + target + locked;

  localStorage.setItem("montanaTotalSavings", totalSavings);

  console.log("Lock Funds: Flexible Savings =", flexible);
  console.log("Lock Funds: Target Savings =", target);
  console.log("Lock Funds: Locked Funds =", locked);
  console.log("Lock Funds: Total Savings =", totalSavings);

  // ==========================================
  // 3. UPDATE LOCK FUNDS PLAN
  // ==========================================

  lockFundsPlan.status = "active";

  lockFundsPlan.paymentCompleted = true;

  lockFundsPlan.createdAt = new Date().toISOString();

  // ==========================================
  // 4. SAVE LOCK FUNDS PLAN
  // ==========================================

  let lockFundsPlans = [];

  try {
    lockFundsPlans =
      JSON.parse(localStorage.getItem("montanaLockFundsPlans")) || [];
  } catch (error) {
    lockFundsPlans = [];
  }

  lockFundsPlans.push({
    ...lockFundsPlan,
  });

  localStorage.setItem("montanaLockFundsPlans", JSON.stringify(lockFundsPlans));

  // ==========================================
  // 5. REFRESH SAVINGS DISPLAY
  // ==========================================

  if (typeof updateSavingsBalances === "function") {
    updateSavingsBalances();
  }

  console.log("Lock Funds: Balance updated successfully.");

  console.log("Lock Funds Balance:", lockedFundsBalance);

  console.log("Total Savings:", totalSavings);

  // ==========================================
  // 6. SUCCESS
  // ==========================================

  setTimeout(function () {
    showLockFundsSuccess();
  }, 500);
}

// Lock Funds Success Screen
function showLockFundsSuccess() {
  const amount = formatNaira(lockFundsPlan.amount);

  const maturityDate = formatLockDate(lockFundsPlan.maturityDate);

  Notiflix.Confirm.show(
    "Lock Funds Successful",

    `
      <div style="text-align:center; line-height:1.7;">

        <div
          style="
            font-size:48px;
            margin-bottom:10px;
          "
        >
          ✓
        </div>

        <h4>
          Funds Locked Successfully
        </h4>

        <p>
          Your Lock Funds plan has been created
          successfully.
        </p>

        <hr>

        <div style="text-align:left;">

          <p>
            <strong>
              Amount Locked:
            </strong>

            ${amount}
          </p>

          <p>
            <strong>
              Lock Period:
            </strong>

            ${lockFundsPlan.duration} days
          </p>

          <p>
            <strong>
              Maturity Date:
            </strong>

            ${maturityDate}
          </p>

        </div>

        <hr>

        <small>
          Your funds will remain locked until the
          maturity date.
        </small>

      </div>
    `,

    "Done",

    function () {
      console.log("Lock Funds: Success screen closed.");

      resetLockFundsForm();
    },

    function () {},

    {
      plainText: false,
      messageMaxLength: 2500,
      backOverlay: true,
      closeButton: false,
      width: "500px",
    },
  );
}

// Reset the lock funds form and plan

function resetLockFundsForm() {
  // Reset plan object

  lockFundsPlan = {
    amount: 0,
    duration: 0,
    startDate: "",
    maturityDate: "",
    agreementOne: false,
    agreementTwo: false,
    paymentMethod: "",
    status: "",
    paymentCompleted: false,
    createdAt: "",
  };

  // Reset amount

  const amountInput = document.getElementById("lockAmount");

  if (amountInput) {
    amountInput.value = "";
  }

  // Reset agreements

  const agreementOne = document.getElementById("lockAgreementOne");

  const agreementTwo = document.getElementById("lockAgreementTwo");

  if (agreementOne) {
    agreementOne.checked = false;
  }

  if (agreementTwo) {
    agreementTwo.checked = false;
  }

  // Hide error

  const agreementError = document.getElementById("lockAgreementError");

  if (agreementError) {
    agreementError.style.display = "none";
  }

  console.log("Lock Funds: Form reset.");
}

function verifyLockFundsPin(onSuccess) {
  const savedPin = localStorage.getItem("montanaTransactionPin");

  if (!savedPin) {
    Notiflix.Notify.failure(
      "Transaction PIN not found. Please create your transaction PIN first.",
    );

    return;
  }

  console.log("Lock Funds: Existing PIN found.");

  Notiflix.Confirm.prompt(
    "Verify Transaction PIN",

    "Enter your 4-digit transaction PIN",

    "",

    "Verify",

    "Cancel",

    function (pin) {
      pin = String(pin || "").trim();

      // validating the PIN format

      if (!/^\d{4}$/.test(pin)) {
        Notiflix.Notify.failure("Please enter your 4-digit transaction PIN.");

        return;
      }

      // Pin verification

      if (pin !== savedPin) {
        Notiflix.Notify.failure("Incorrect transaction PIN.");

        return;
      }

      console.log("Lock Funds: PIN verified successfully.");

      if (typeof onSuccess === "function") {
        onSuccess();
      }
    },

    function () {
      console.log("Lock Funds: PIN verification cancelled.");
    },

    {
      plainText: false,
      backOverlay: true,
      closeButton: true,
      width: "420px",
    },
  );
}
