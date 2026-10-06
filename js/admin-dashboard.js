document.addEventListener("DOMContentLoaded", function () {
  /* ELEMENTS */

  const sidebar = document.getElementById("adminSidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  const navLinks = document.querySelectorAll(".admin-nav-link");

  const topbarIconButton = document.querySelector(".topbar-icon-btn");
  const adminProfile = document.querySelector(".admin-profile");

  /* MOBILE SIDEBAR TOGGLE */

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("sidebar-open");
    });
  }

  /*  CLOSE SIDEBAR WHEN NAVIGATION ITEM IS CLICKED MOBILE ONLY */

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 767) {
        sidebar.classList.remove("sidebar-open");
      }
    });
  });

  /* ACTIVE SIDEBAR NAVIGATION */

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      /*
        Do not remove the active state from the
        logout button.
      */

      if (link.classList.contains("logout-link")) {
        return;
      }

      /*
        Remove active state from all navigation links.
      */

      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });

      /*
        Add active state to clicked navigation link.
      */

      link.classList.add("active");
    });
  });

  /*  NOTIFICATION BUTTON */

  if (topbarIconButton) {
    topbarIconButton.addEventListener("click", function () {
      /*
        Notification functionality will be connected
        when the Admin notification system is built.

        For now, this prevents the button from
        performing any unwanted action.
      */

      console.log("Admin notifications clicked.");
    });
  }

  /* ADMIN PROFILE */

  if (adminProfile) {
    adminProfile.addEventListener("click", function () {
      /*
        Admin profile dropdown will be added later.

        This gives us a clean foundation for:
        - My Profile
        - Account Settings
        - Change Password
        - Logout
      */

      console.log("Admin profile clicked.");
    });
  }

  /*  WINDOW RESIZE */

  window.addEventListener("resize", function () {
    /*
      If the screen becomes desktop-sized,
      remove the mobile sidebar state.
    */

    if (window.innerWidth > 767 && sidebar) {
      sidebar.classList.remove("sidebar-open");
    }
  });
});
