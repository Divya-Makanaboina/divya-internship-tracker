import confetti from "canvas-confetti";

export const triggerSuccessConfetti = () => {
  // First burst from the left
  confetti({
    particleCount: 60,
    spread: 55,
    origin: { x: 0.25, y: 0.6 },
    colors: ["#e91e63", "#f06292", "#f48fb1", "#fce4ec", "#ff4081"],
  });

  // Second burst from the right
  confetti({
    particleCount: 60,
    spread: 55,
    origin: { x: 0.75, y: 0.6 },
    colors: ["#e91e63", "#f06292", "#f48fb1", "#fce4ec", "#ff4081"],
  });

  // Center burst after a slight delay
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#e91e63", "#f06292", "#f48fb1", "#fce4ec", "#ff4081"],
    });
  }, 150);
};
