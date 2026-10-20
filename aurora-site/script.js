(() => {
  const modal = document.getElementById("modal");
  const form = document.getElementById("booking-form");
  const success = document.getElementById("success");
  const submitBtn = document.getElementById("submit-btn");
  const backBtn = document.getElementById("back-btn");
  const select = document.getElementById("f-device");
  const openers = document.querySelectorAll("[data-open-modal]");
  const inputs = form.querySelectorAll("input[required]");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  let lastFocused = null;

  function isValid() {
    return [...inputs].every((el) => {
      const v = el.value.trim();
      return el.type === "email" ? EMAIL_RE.test(v) : v.length > 0;
    });
  }

  function updateSubmit() {
    submitBtn.disabled = !isValid();
  }

  function openModal() {
    lastFocused = document.activeElement;
    form.hidden = false;
    success.hidden = true;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    form.querySelector("input").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    form.reset();
    select.classList.remove("has-value");
    inputs.forEach((el) => el.classList.remove("is-invalid"));
    updateSubmit();
    if (lastFocused) lastFocused.focus();
  }

  openers.forEach((btn) => btn.addEventListener("click", openModal));
  backBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  inputs.forEach((el) => {
    el.addEventListener("input", () => {
      updateSubmit();
      if (el.classList.contains("is-invalid")) validateField(el);
    });
    el.addEventListener("blur", () => validateField(el));
  });

  function validateField(el) {
    const v = el.value.trim();
    const ok = el.type === "email" ? EMAIL_RE.test(v) : v.length > 0;
    el.classList.toggle("is-invalid", !ok && v.length > 0);
  }

  select.addEventListener("change", () => {
    select.classList.toggle("has-value", select.value !== "");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const data = Object.fromEntries(new FormData(form));
    submitBtn.disabled = true;

    try {
      // TODO: подставьте адрес вашего бэкенда
      // await fetch("/api/booking", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      console.info("Заявка:", data);
    } finally {
      form.hidden = true;
      success.hidden = false;
      backBtn.focus();
    }
  });

  updateSubmit();
})();
