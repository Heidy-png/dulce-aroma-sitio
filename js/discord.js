// Envía el formulario de contacto por Discord o por correo, según lo que elija la persona.
// Mantén aquí tus dos datos (webhook y access key). Va JUSTO ANTES de </body> en index.html.
const WEBHOOK = "https://discord.com/api/webhooks/1562845095689060392/cCZx5O1AlSw0DutjcVqdb3noKgWyOxsFoWB9unfA_W8sRoq0EQvnkWx6HJkMPLo6TrQo";
const WEB3FORMS_KEY = "544028df-b045-4c7f-b9ca-bfaed5945a45";
console.log("discord.js cargado");

function enviarDiscord(d) {
  if (WEBHOOK.indexOf("https://discord.com/api/webhooks/") !== 0 && WEBHOOK.indexOf("https://discordapp.com/api/webhooks/") !== 0) {
    return Promise.reject(new Error("Falta la URL del webhook en js/discord.js"));
  }
  return fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Dulce Aroma",
      allowed_mentions: { parse: [] },
      embeds: [{
        title: "Nuevo mensaje desde la página",
        color: 0xC23B61,
        fields: [
          { name: "Nombre", value: d.nombre.slice(0, 200) || "-" },
          { name: "Email", value: d.email.slice(0, 200) || "-" },
          { name: "Mensaje", value: d.mensaje.slice(0, 1000) || "-" }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  }).then(function (r) { if (!r.ok) throw new Error("Discord respondió " + r.status); });
}

function enviarCorreo(d) {
  if (WEB3FORMS_KEY.indexOf("PEGA_AQUI") === 0) {
    return Promise.reject(new Error("Falta la access key en js/discord.js"));
  }
  return fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: "Nuevo mensaje de " + d.nombre + " - Dulce Aroma",
      from_name: "Dulce Aroma",
      name: d.nombre,
      email: d.email,
      message: d.mensaje
    })
  }).then(function (r) { return r.json(); })
    .then(function (j) { if (!j.success) throw new Error(j.message || "No se pudo enviar el correo"); });
}

async function enviarFormulario(form) {
  const estado = document.getElementById("estadoForm");
  const boton = form.querySelector("button[type=submit]");
  const via = (form.querySelector("input[name=via]:checked") || {}).value || "discord";
  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    mensaje: document.getElementById("mensaje").value.trim()
  };
  const rojo = "padding:12px 4px;color:#b3261e;font-weight:700";
  const verde = "padding:12px 4px;color:#1b5e20;font-weight:700";

  boton.disabled = true;
  estado.style.cssText = "";
  estado.textContent = "Enviando...";
  try {
    if (via === "correo") await enviarCorreo(datos); else await enviarDiscord(datos);
    estado.textContent = "✔ ¡Gracias, " + datos.nombre + "! Tu mensaje fue enviado.";
    estado.style.cssText = verde;
    form.reset();
  } catch (error) {
    console.error(error);
    estado.textContent = "✖ Error: " + error.message;
    estado.style.cssText = rojo;
  }
  boton.disabled = false;
}

// Captura el clic en "Enviar mensaje" (y Enter) antes que main.js
document.addEventListener("click", function (e) {
  if (!e.target.closest("#formularioContacto button[type=submit]")) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  const form = document.getElementById("formularioContacto");
  if (form.reportValidity()) enviarFormulario(form);
}, true);

// Respaldo por si el formulario se envía de otra forma
document.addEventListener("submit", function (e) {
  if (e.target.id !== "formularioContacto") return;
  e.preventDefault();
  e.stopImmediatePropagation();
  enviarFormulario(e.target);
}, true);