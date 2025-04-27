function mostrarCartas() {
  const cartas = document.getElementById('cartas');
  cartas.style.display = cartas.style.display === 'block' ? 'none' : 'block';
}

// Carrossel
let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function mudarSlide(n) {
  slides[slideIndex].style.display = "none";
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].style.display = "block";
}

// Corações animados
const canvas = document.getElementById('coracoes');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let coracoes = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 10 + 10;
  this.speed = Math.random() * 2 + 1;
  this.opacity = Math.random();

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = rgba(255, 105, 180, ${this.opacity});
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size * 1.5, this.y + this.size / 3,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size * 1.5, this.y + this.size / 3,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
  };

  this.update = function () {
    this.y -= this.speed;
    if (this.y < -10) {
      this.y = canvas.height + Math.random() * 100;
    }
    this.draw();
  };
}

function createHearts() {
  for (let i = 0; i < 50; i++) {
    coracoes.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < coracoes.length; i++) {
    coracoes[i].update();
  }
  requestAnimationFrame(animate);
}

createHearts();
animate();
