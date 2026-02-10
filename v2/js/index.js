const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const heroSection = document.getElementById("hero");

function updateNav() {
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  const pastHero = heroBottom <= 80;
  navbar.classList.toggle("hidden", !pastHero);
  navbar.classList.toggle("scrolled", pastHero);
  backToTop.classList.toggle("visible", window.scrollY > 400);
}
window.addEventListener("scroll", updateNav);
updateNav();

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}
function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

let currentSlide = 0;
const track = document.getElementById("momentsTrack");
const totalSlides = track.children.length;
const dotsContainer = document.getElementById("carouselDots");

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("button");
  dot.className = "carousel-dot" + (i === 0 ? " active" : "");
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}

function goToSlide(n) {
  currentSlide = n;
  track.style.transform = `translateX(-${n * 100}%)`;
  document.querySelectorAll(".carousel-dot").forEach((d, i) => {
    d.classList.toggle("active", i === n);
  });
}
function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
}
function prevSlide() {
  goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

let autoplay = setInterval(nextSlide, 2500);
document
  .querySelector(".moments-carousel")
  .addEventListener("mouseenter", () => clearInterval(autoplay));
document
  .querySelector(".moments-carousel")
  .addEventListener("mouseleave", () => {
    autoplay = setInterval(nextSlide, 2500);
  });

const galleryImages = document.querySelectorAll(".trek-gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
let lightboxIndex = 0;

function openLightbox(i) {
  lightboxIndex = i;
  lightboxImg.src = galleryImages[i].src;
  lightboxCaption.textContent = `${i + 1} / ${galleryImages.length}`;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}
function lightboxNav(dir) {
  lightboxIndex =
    (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[lightboxIndex].src;
  lightboxCaption.textContent = `${lightboxIndex + 1} / ${galleryImages.length}`;
}
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") lightboxNav(1);
  if (e.key === "ArrowLeft") lightboxNav(-1);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"));
        const duration = 1500;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent =
            Math.floor(eased * target) + (target >= 100 ? "+" : "");
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target + (target >= 100 ? "+" : "");
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".stat-number[data-target]")
  .forEach((el) => counterObserver.observe(el));

let currentPoem = 0;
const poemTrack = document.getElementById("poemTrack");
const totalPoems = poemTrack.children.length;
const poemCounter = document.getElementById("poemCounter");

function goToPoem(n) {
  currentPoem = n;
  poemTrack.style.transform = `translateX(-${n * 100}%)`;
  poemCounter.textContent = `${n + 1} / ${totalPoems}`;
}
function nextPoem() {
  goToPoem((currentPoem + 1) % totalPoems);
}
function prevPoem() {
  goToPoem((currentPoem - 1 + totalPoems) % totalPoems);
}

let sparkleCount = 0;
document.addEventListener("mousemove", (e) => {
  sparkleCount++;
  if (sparkleCount % 4 !== 0) return;
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = e.clientX + (Math.random() * 10 - 5) + "px";
  s.style.top = e.clientY + (Math.random() * 10 - 5) + "px";
  s.style.width = s.style.height = Math.random() * 4 + 3 + "px";
  s.style.background = ["#c9a0dc", "#f2d1d9", "#d4788c", "#e8d5f5"][
    Math.floor(Math.random() * 4)
  ];
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 600);
});
