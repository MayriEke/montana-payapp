// MONTANA PAYAPP - AGENT ONBOARDING

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startAgentApplication");

  if (!startButton) {
    return;
  }

  startButton.addEventListener("click", function () {
    // For now, we will take the user to the
    // first stage of the agent application.

    window.location.href = "agent-application.html";
  });
});
