document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const dashboardSidebar = document.getElementById("dashboardSidebar");

  if (sidebarToggle && dashboardSidebar) {
    sidebarToggle.addEventListener("click", function () {
      dashboardSidebar.classList.toggle("show");
    });
  }

  //   TO SHOW OR HIDE BALANCE
  const balanceVisibilityButton = document.getElementById(
    "balanceVisibilityButton",
  );
  const balanceVisibilityIcon = document.getElementById(
    "balanceVisibilityIcon",
  );

  const balanceAmount = [
    document.getElementById("totalBalance"),
    document.getElementById("availableBalance"),
    document.getElementById("totalSavings"),
    document.getElementById("mainSavingsBalance"),
  ];

  let balancesVisible = true;

  const originalBalances = balanceAmount.map(function(amount) {
    return amount ? amount.textContent : '';
  });

  if (balanceVisibilityButton) {

        balanceVisibilityButton.addEventListener("click", function () {

            balancesVisible = !balancesVisible;


            balanceElements.forEach(function (element, index) {

                if (!element) return;


                if (balancesVisible) {

                    element.textContent = originalBalances[index];

                } else {

                    element.textContent = "₦••••••";

                }

            });


            if (balancesVisible) {

                balanceVisibilityIcon.classList.remove("bi-eye-slash");
                balanceVisibilityIcon.classList.add("bi-eye");

                balanceVisibilityButton.setAttribute(
                    "aria-label",
                    "Hide balance"
                );

            } else {

                balanceVisibilityIcon.classList.remove("bi-eye");
                balanceVisibilityIcon.classList.add("bi-eye-slash");

                balanceVisibilityButton.setAttribute(
                    "aria-label",
                    "Show balance"
                );

            }

        });

    }


    /*NOTIFICATION BUTTON*/

    const notificationButton = document.getElementById("notificationButton");


    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            Notiflix.Notify.info(
                "You have no new notifications."
            );

        });

    }


    /*LOGOUT*/

    const logoutButton = document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener("click", function (event) {

            event.preventDefault();


            Notiflix.Confirm.show(

                "Log out",

                "Are you sure you want to log out of your MontanaPay account?",

                "Yes, Log out",

                "Cancel",

                function okCb() {

                    Notiflix.Notify.success(
                        "You have been logged out successfully."
                    );


                    setTimeout(function () {

                        window.location.href = "../login.html";

                    }, 1000);

                },

                function cancelCb() {

                    Notiflix.Notify.info(
                        "Logout cancelled."
                    );

                }

            );

        });

    }

});
    