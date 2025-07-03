
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
  const formspreeEndpoint = "https://formspree.io/f/mgvyzzgk";

  // 1. Prepara los datos que quieres enviar
  // Estos datos simulan lo que vendría de campos de un formulario
  // 1. Leer y parsear los datos del localStorage
  const cartDataString = localStorage.getItem("cart");
  let cartItems = [];
  if (cartDataString) {
    try {
      cartItems = JSON.parse(cartDataString);
    } catch (e) {
      console.error(
        "Error al parsear los datos del carrito del localStorage:",
        e
      );
      // Manejar el error, quizás mostrar un mensaje al usuario
      alert(
        "Hubo un problema con los datos del carrito. Por favor, intenta de nuevo."
      );
      closeModal();
      return; // Salir de la función si los datos son inválidos
    }
  }

  // 2. Formatear los datos del carrito para el cuerpo del mensaje
  let messageBody = "Detalles del Pedido:\n\n";
  let totalPedido = 0;

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity;
      messageBody += `Producto: ${item.name}\n`;
      messageBody += `  Descripción: ${item.description}\n`;
      messageBody += `  Precio Unitario: $${item.price.toFixed(2)}\n`; // Formato a 2 decimales
      messageBody += `  Cantidad: ${item.quantity}\n`;
      messageBody += `  Subtotal: $${subtotal.toFixed(2)}\n`;
      messageBody += `--------------------\n`;
      totalPedido += subtotal;
    });
    messageBody += `\nTotal del Pedido: $${totalPedido.toFixed(2)}\n\n`;
  } else {
    messageBody += "El carrito está vacío.\n\n";
  }
  
  const dataToSend = {
    name: "Usuario de Prueba",
    email: "prueba@example.com", // Es bueno incluir un email para que Formspree lo reconozca
    subject: "Nuevo Pedido desde la Web", // Asunto del correo
    message: messageBody,
    // Puedes agregar más campos según tus necesidades
    // "asunto": "Consulta desde mi web"
  };

  fetch(formspreeEndpoint, {
    method: "POST", // CORRECTO: Usa POST
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // CORRECTO: Especifica que el cuerpo es JSON
    },
    body: JSON.stringify(dataToSend), // CORRECTO: Convierte tu objeto de datos a JSON string
  })
    .then((response) => {
      if (response.ok) {
        // Verifica si la respuesta es exitosa (código 2xx)
        console.log("Correo enviado con éxito!");
        alert("¡Tu mensaje ha sido enviado!"); // O algún otro feedback al usuario
        closeModal(); // Cierra el modal si la operación fue exitosa
        return response.json(); // Parsea la respuesta JSON si hay
      } else {
        console.error(
          "Error al enviar el correo:",
          response.status,
          response.statusText
        );
        alert("Hubo un error al enviar tu mensaje. Inténtalo de nuevo.");
        closeModal(); // Puedes decidir si cierras o no el modal en caso de error
        return response.json().then((err) => Promise.reject(err)); // Propaga el error para el .catch
      }
    })
    .then((data) => {
      // Aquí puedes manejar la respuesta JSON de Formspree si la necesitas
      console.log("Respuesta de Formspree:", data);
    })
    .catch((error) => {
      console.error("Error en la petición fetch:", error);
      alert("Ocurrió un error de red. Por favor, verifica tu conexión.");
      closeModal();
    });
    localStorage.removeItem("cart"); // Limpia el carrito después de enviar el pedido
    //updateCartCount(); // Actualiza el contador del carrito
});

cancelBtn.addEventListener("click", function () {
  closeModal();
});

// Prevenir cierre accidental al hacer clic en el contenido del modal
modalContent.addEventListener("click", function (e) {
  e.stopPropagation();
});
