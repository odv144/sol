// Referencias a elementos del DOM
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Función para abrir el modal
function openModal() {
  modal.classList.add("show");
  modalContent.classList.remove("closing");
  document.body.style.overflow = "hidden"; // Previene scroll del body
}

// Función para cerrar el modal con animación
function closeModal() {
  modalContent.classList.add("closing");

  // Esperar a que termine la animación antes de ocultar
  setTimeout(() => {
    modal.classList.remove("show");
    modalContent.classList.remove("closing");
    document.body.style.overflow = "auto"; // Restaura scroll del body
  }, 300);
}

// Event Listeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// Cerrar al hacer clic fuera del modal
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

// Botones de acción
confirmBtn.addEventListener("click", function () {
  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
  /* customize formbutton below*/     
  formbutton("create", {
    action: "https://formspree.io/f/mgvyzzgk",
    title: "How can we help?",
    fields: [
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Message:",
        name: "message",
        placeholder: "What's on your mind?",
      },
      { type: "submit" }      
    ],
    styles: {
      title: {
        backgroundColor: "gray"
      },
      button: {
        backgroundColor: "gray"
      }
    }
  });
  closeModal();
});

cancelBtn.addEventListener("click", function () {
  closeModal();
});

// Prevenir cierre accidental al hacer clic en el contenido del modal
modalContent.addEventListener("click", function (e) {
  e.stopPropagation();
});
