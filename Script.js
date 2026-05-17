
/* PARTICULAS */
const cvs=document.getElementById('cvs'),ctx=cvs.getContext('2d');
let W,H,pts=[];
function resize(){W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
function mkP(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,vx:(Math.random()-.5)*.2,vy:-(Math.random()*.35+.06),a:Math.random()*.5+.1,life:0,max:Math.random()*280+140}}
for(let i=0;i<100;i++)pts.push(mkP());
function animP(){
  ctx.clearRect(0,0,W,H);
  pts.forEach((p,i)=>{
    p.x+=p.vx;p.y+=p.vy;p.life++;
    const pr=p.life/p.max,fd=pr<.2?pr/.2:pr>.8?(1-pr)/.2:1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(220,110,30,${p.a*fd})`;ctx.fill();
    if(p.life>=p.max||p.y<-10)pts[i]=mkP();
  });
  requestAnimationFrame(animP);
}
animP();

/* CURSOR */
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function aR(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(aR)})();

/* NAV */
window.addEventListener('scroll',()=>{document.getElementById('mainNav').style.borderBottomColor=scrollY>40?'rgba(232,98,26,0.26)':'rgba(232,98,26,0.13)'});

/* REVEALAR */
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* PULSO DE ARCO */
const arcPaths=document.querySelectorAll('.arc-svg path');
let t=0;
(function aA(){t+=.014;arcPaths.forEach((p,i)=>{p.style.opacity=.75+Math.sin(t+i*.6)*.25});requestAnimationFrame(aA)})();
