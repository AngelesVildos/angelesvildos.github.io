document.addEventListener("DOMContentLoaded", () => {
  // Elementos principales
  const navbar = document.getElementById("navbar");
  const splash = document.getElementById("splash-screen");
  const btnVisitar = document.getElementById("boton-visit");

  // Splash Screen al recargar la página o entrar por primera vez
  const navigationType = performance.getEntriesByType("navigation")[0]?.type;
  if (navigationType === "reload" && splash && btnVisitar) {
    splash.style.display = "flex";
    btnVisitar.addEventListener("click", () => {
      splash.style.opacity = "0";
      setTimeout(() => (splash.style.display = "none"), 500);
    });
  } else if (splash) {
    splash.style.display = "none";
  }

  // Scroll del navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Botones para alternar entre grids (anuncios o reels)
  const botonesOpera = document.querySelectorAll(".boton-videos");
  const gridsOpera = document.querySelectorAll(".grid-anuncios, .grid-reels");

  botonesOpera.forEach((boton) => {
    boton.addEventListener("click", () => {
      const targetId = boton.getAttribute("data-target");

      botonesOpera.forEach((b) => b.classList.remove("active"));
      boton.classList.add("active");

      gridsOpera.forEach((grid) => {
        if (grid.id === targetId) {
          grid.classList.add("visible");
        } else {
          grid.classList.remove("visible");
        }
      });
    });
  });

  // Variables de visor de videos
  const videosAnuncios = [...document.querySelectorAll(".grid-anuncios video")];
  const videosReels = [...document.querySelectorAll(".grid-reels video")];

  const modalAnuncios = document.getElementById("modal-anuncios");
  const modalReels = document.getElementById("modal-reels");

  const videoAnuncio = document.getElementById("video-anuncio-expandido");
  const videoReel = document.getElementById("video-reel-expandido");

  const cerrarAnuncios = document.getElementById("cerrar-anuncios");
  const cerrarReels = document.getElementById("cerrar-reels");

  const prevAnuncio = document.getElementById("prev-anuncio");
  const nextAnuncio = document.getElementById("next-anuncio");
  const prevReel = document.getElementById("prev-reel");
  const nextReel = document.getElementById("next-reel");

  const tituloAnuncio = document.getElementById("titulo-anuncio");
  const tituloReel = document.getElementById("titulo-reel");

  let currentIndexAnuncio = 0;
  let currentIndexReel = 0;

  // Mostrar un anuncio expandido en el visor (con título)
  function mostrarAnuncio(index) {
    currentIndexAnuncio = (index + videosAnuncios.length) % videosAnuncios.length;
    const video = videosAnuncios[currentIndexAnuncio];
    videoAnuncio.src = video.src;

    // Mostrar título del video (si tiene)
    const titulo = video.dataset.title || "";
    tituloAnuncio.textContent = titulo;
  }

  // Mostrar un reel expandido en el visor (con título)
  function mostrarReel(index) {
    currentIndexReel = (index + videosReels.length) % videosReels.length;
    const video = videosReels[currentIndexReel];
    videoReel.src = video.src;

    // Mostrar título del video (si tiene)
    const titulo = video.dataset.title || "";
    tituloReel.textContent = titulo;
  }

  // Abrir visor al hacer click en un anuncio
  videosAnuncios.forEach((video, index) => {
    video.addEventListener("click", () => {
      mostrarAnuncio(index);
      modalAnuncios.classList.add("visible");
      document.body.style.overflow = "hidden";
    });
  });

  // Abrir visor al hacer click en un reel
  videosReels.forEach((video, index) => {
    video.addEventListener("click", () => {
      mostrarReel(index);
      modalReels.classList.add("visible");
      document.body.style.overflow = "hidden";
    });
  });

  // Cerrar visor con la X
  cerrarAnuncios.addEventListener("click", () => cerrarVisor(modalAnuncios, videoAnuncio));
  cerrarReels.addEventListener("click", () => cerrarVisor(modalReels, videoReel));

  // Cerrar visor haciendo click afuera del video
  modalAnuncios.addEventListener("click", (e) => {
    if (e.target === modalAnuncios) cerrarVisor(modalAnuncios, videoAnuncio);
  });
  modalReels.addEventListener("click", (e) => {
    if (e.target === modalReels) cerrarVisor(modalReels, videoReel);
  });

  // Cerrar con ESC y navegar con las flechitas
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarVisor(modalAnuncios, videoAnuncio);
      cerrarVisor(modalReels, videoReel);
    }
    if (modalAnuncios.classList.contains("visible")) {
      if (e.key === "ArrowLeft") mostrarAnuncio(currentIndexAnuncio - 1);
      if (e.key === "ArrowRight") mostrarAnuncio(currentIndexAnuncio + 1);
    }
    if (modalReels.classList.contains("visible")) {
      if (e.key === "ArrowLeft") mostrarReel(currentIndexReel - 1);
      if (e.key === "ArrowRight") mostrarReel(currentIndexReel + 1);
    }
  });

  // Botones de flechas en el visor
  prevAnuncio?.addEventListener("click", () => mostrarAnuncio(currentIndexAnuncio - 1));
  nextAnuncio?.addEventListener("click", () => mostrarAnuncio(currentIndexAnuncio + 1));
  prevReel?.addEventListener("click", () => mostrarReel(currentIndexReel - 1));
  nextReel?.addEventListener("click", () => mostrarReel(currentIndexReel + 1));

  // Función para cerrar visor y resetear video
  function cerrarVisor(modal, videoEl) {
    modal.classList.remove("visible");
    videoEl.pause();
    videoEl.src = "";
    document.body.style.overflow = "";
  }
});

// Hace clickeables todos los .div-project
document.querySelectorAll(".div-project").forEach((div) => {
  const link = div.querySelector("a");
  if (link) {
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      window.location.href = link.href;
    });
  }
});