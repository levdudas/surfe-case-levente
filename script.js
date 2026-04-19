// =========================================================
// Slide deck engine
// =========================================================

const canvas = document.querySelector('.canvas');
const slides = Array.from(document.querySelectorAll('.slide'));
const indicator = document.querySelector('[data-indicator]');
const btnPrev = document.querySelector('[data-prev]');
const btnNext = document.querySelector('[data-next]');
const nav = document.querySelector('.nav');

let currentIndex = 0;

// ---- Scale canvas to fit viewport while preserving aspect ratio ----
function fitCanvas() {
  if (!canvas) return;
  const slideW = 1920;
  const slideH = 1080;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.min(vw / slideW, vh / slideH);
  canvas.style.transform = `scale(${scale})`;
}

// ---- Slide rendering ----
function goTo(index) {
  if (index < 0) index = 0;
  if (index > slides.length - 1) index = slides.length - 1;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');

    // Reset interactive slides to step 1 when navigating away
    if (i !== index && isInteractive(slide)) {
      setStep(slide, 1);
    }
  });

  currentIndex = index;

  // Initialize stepper UI on the newly active slide
  const active = slides[index];
  if (isInteractive(active)) {
    updateStepperUI(active);
  }

  updateUI();
  updateHash();
}

function currentSlide() { return slides[currentIndex]; }

function isInteractive(slide) {
  return slide && slide.dataset.interactive === 'true';
}

function getStep(slide) {
  return parseInt(slide.dataset.step || '1', 10);
}

function getMaxSteps(slide) {
  return parseInt(slide.dataset.maxSteps || '1', 10);
}

function setStep(slide, step) {
  slide.dataset.step = String(step);
  updateStepperUI(slide);
}

function updateStepperUI(slide) {
  const step = getStep(slide);
  const pills = slide.querySelectorAll('[data-step-pill]');
  pills.forEach(pill => {
    const pillStep = parseInt(pill.dataset.stepPill, 10);
    pill.classList.toggle('is-active', pillStep === step);
    pill.classList.toggle('is-done', pillStep < step);
  });
}

function next() {
  const slide = currentSlide();
  if (isInteractive(slide)) {
    const step = getStep(slide);
    if (step < getMaxSteps(slide)) {
      setStep(slide, step + 1);
      return;
    }
  }
  goTo(currentIndex + 1);
}

function prev() {
  const slide = currentSlide();
  if (isInteractive(slide)) {
    const step = getStep(slide);
    if (step > 1) {
      setStep(slide, step - 1);
      return;
    }
  }
  goTo(currentIndex - 1);
}

function updateUI() {
  if (indicator) indicator.textContent = `${currentIndex + 1} / ${slides.length}`;
  if (btnPrev) btnPrev.disabled = currentIndex === 0;
  if (btnNext) btnNext.disabled = currentIndex === slides.length - 1;
}

function updateHash() {
  const target = `#/${currentIndex + 1}`;
  if (location.hash !== target) {
    history.replaceState(null, '', target);
  }
}

function readHash() {
  const match = /^#\/(\d+)/.exec(location.hash || '');
  if (match) {
    const idx = parseInt(match[1], 10) - 1;
    if (!Number.isNaN(idx)) goTo(idx);
  } else {
    goTo(0);
  }
}

// ---- Keyboard navigation ----
function onKey(e) {
  const keys = {
    ArrowRight: next,
    ArrowLeft: prev,
    ArrowDown: next,
    ArrowUp: prev,
    PageDown: next,
    PageUp: prev,
    ' ': next,            // spacebar
    Home: () => goTo(0),
    End: () => goTo(slides.length - 1),
  };
  const handler = keys[e.key];
  if (handler) {
    e.preventDefault();
    handler();
  }
}

// ---- Auto-hide nav when idle ----
let idleTimer;
function activateNav() {
  if (!nav) return;
  nav.classList.remove('faded');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => nav.classList.add('faded'), 2200);
}

// ---- Wire up ----
window.addEventListener('resize', fitCanvas);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', fitCanvas);
  window.visualViewport.addEventListener('scroll', fitCanvas);
}
document.addEventListener('DOMContentLoaded', () => {
  fitCanvas();
  readHash();
  activateNav();
});
window.addEventListener('load', fitCanvas);           // re-fit after fonts
window.addEventListener('hashchange', readHash);
document.addEventListener('keydown', onKey);
document.addEventListener('mousemove', activateNav);
document.addEventListener('click', activateNav);

btnPrev?.addEventListener('click', prev);
btnNext?.addEventListener('click', next);

// Run immediately (script is loaded deferred, so DOM is parsed)
fitCanvas();
readHash();
activateNav();
