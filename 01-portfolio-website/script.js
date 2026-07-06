const toggle = document.getElementById('navToggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

links.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});
