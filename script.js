const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const yay = document.getElementById("yay");
const title = document.getElementById("title");
const card = document.getElementById("card");
 
/* Move NO Button Safely */
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", moveNo); // Prevent accidental click
 
function moveNo() {
 
  // Remove transform so JS positioning works properly
  noBtn.style.transform = "none";
 
  const container = document.querySelector(".btns");
 
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
 
  // Maximum allowed positions inside container
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
 
  // Random position inside container
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
 
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}
 
/* YES Click */
yesBtn.addEventListener("click", () => {
 document.getElementById("myPhoto").style.display = "block";
  // Hide both buttons smoothly
  const btnBox = document.querySelector(".btns");
 
  btnBox.style.transition = "all 0.6s ease";
  btnBox.style.opacity = "0";
  btnBox.style.transform = "scale(0.8)";
 
  // After fade-out, remove them
  setTimeout(() => {
    btnBox.style.display = "none";
  }, 600);
 
  // Show celebration text
  yay.style.display = "block";
  title.innerText = "You Just Made Me the Happiest 😍💖";
 
  // Start fireworks
  startFireworks();
});
 
 
/* Fireworks Setup */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
 
canvas.width = innerWidth;
canvas.height = innerHeight;
 
let particles = [];
 
/* Start Fireworks */
function startFireworks(){
 
  setInterval(() => {
 
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height / 2;
 
    for(let i=0;i<50;i++){
 
      particles.push({
        x: cx,
        y: cy,
        vx: (Math.random()-0.5) * 8,
        vy: (Math.random()-0.5) * 8,
        life: 90,
        color: `hsl(${Math.random()*360},80%,65%)`
      });
 
    }
 
  }, 500);
}
 
 
/* Animation Loop */
function animate(){
 
  ctx.clearRect(0,0,canvas.width,canvas.height);
 
  particles.forEach((p,i) => {
 
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
 
    ctx.fillStyle = p.color;
 
    ctx.beginPath();
    ctx.arc(p.x,p.y,3,0,Math.PI*2);
    ctx.fill();
 
    if(p.life <= 0) particles.splice(i,1);
 
  });
 
  requestAnimationFrame(animate);
}
 
animate();
 
 
/* Resize */
window.addEventListener("resize", ()=>{
 
  canvas.width = innerWidth;
  canvas.height = innerHeight;
 
});
