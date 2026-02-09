  // ---------- MENU HAMBURGUER ----------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle && menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// fecha menu ao clicar em link (útil no mobile)
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("active"));
});

// ---------- CARROSSEL (setas + paginação numerada + autoplay) ----------
const carousel = document.querySelector(".carousel");
const slidesContainer = document.querySelector(".slides");
const slideImgs = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");
const paginationWrap = document.querySelector(".carousel-pagination");

if (slidesContainer && slideImgs.length) {
  let index = 0;
  const total = slideImgs.length;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 4200;

  // cria paginação numerada (01,02...)
  for (let i = 0; i < total; i++) {
    const btn = document.createElement("button");
    btn.innerText = String(i + 1).padStart(2, "0");
    btn.dataset.index = i;
    btn.addEventListener("click", (e) => {
      goToSlide(Number(e.currentTarget.dataset.index));
    });
    paginationWrap.appendChild(btn);
  }

  const dots = paginationWrap.querySelectorAll("button");

  function update() {
    slidesContainer.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function next() {
    index = (index + 1) % total;
    update();
  }
  function prev() {
    index = (index - 1 + total) % total;
    update();
  }
  function goToSlide(i) {
    index = i % total;
    update();
    resetAutoplay();
  }

  // setas
  prevBtn && prevBtn.addEventListener("click", () => { prev(); resetAutoplay(); });
  nextBtn && nextBtn.addEventListener("click", () => { next(); resetAutoplay(); });

  // autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
  }
  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // pause on hover
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);

  // inicia
  update();
  startAutoplay();
}

const socialToggle = document.querySelector('.social-toggle');
const socialItem = document.querySelector('.nav-social-mobile');

if (socialToggle && socialItem) {
  socialToggle.addEventListener('click', () => {
    socialItem.classList.toggle('open');
  });
}

