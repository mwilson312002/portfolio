window.addEventListener('load',()=>setTimeout(()=>{document.getElementById('loader').classList.add('gone');startTypewriter();},2200));
const cdot=document.getElementById('cur-dot'),cring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cdot.style.left=mx+'px';cdot.style.top=my+'px'});
(function aR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cring.style.left=rx+'px';cring.style.top=ry+'px';requestAnimationFrame(aR)})();
document.querySelectorAll('a,button,.pc,.cert-c,.pill,.ach-c,.learn-card').forEach(el=>{
el.addEventListener('mouseenter',()=>{cring.style.width='52px';cring.style.height='52px';cring.style.opacity='.65'});
el.addEventListener('mouseleave',()=>{cring.style.width='36px';cring.style.height='36px';cring.style.opacity='.45'});
});
window.addEventListener('scroll',()=>{
const h=document.documentElement,st=h.scrollTop,sh=h.scrollHeight-h.clientHeight;
document.getElementById('progress-bar').style.width=(st/sh*100)+'%';
document.getElementById('nav').classList.toggle('scrolled',scrollY>40);
document.getElementById('btt').classList.toggle('show',scrollY>400);
});
function toggleTheme(){
const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t);
}
const saved=localStorage.getItem('theme');if(saved)document.documentElement.setAttribute('data-theme',saved);
const roles=['Full Stack Developer','Python Engineer','React Developer'];
let rIdx=0,cIdx=0,deleting=false;
const typeEl=document.getElementById('typeTarget');
function startTypewriter(){
function tick(){const cur=roles[rIdx];if(!deleting){typeEl.textContent=cur.slice(0,cIdx+1);cIdx++;if(cIdx===cur.length){deleting=true;setTimeout(tick,1800);return}}else{typeEl.textContent=cur.slice(0,cIdx-1);cIdx--;if(cIdx===0){deleting=false;rIdx=(rIdx+1)%roles.length;setTimeout(tick,400);return}}setTimeout(tick,deleting?42:72);}
tick();
}
const canvas=document.getElementById('bg-canvas'),ctx=canvas.getContext('2d');
let W,H,pts=[],mouse2={x:-999,y:-999};
function resizeCv(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resizeCv();window.addEventListener('resize',resizeCv);
class Pt{constructor(){this.reset(true)}reset(init){this.x=Math.random()*W;this.y=init?Math.random()*H:Math.random()<.5?-5:H+5;this.vx=(Math.random()-.5)*.14;this.vy=(Math.random()-.5)*.14;this.r=Math.random()*.65+.2;this.a=Math.random()*.4+.07;this.gold=Math.random()>.65;}upd(){this.x+=this.vx;this.y+=this.vy;if(this.x<-10||this.x>W+10||this.y<-10||this.y>H+10)this.reset(false);const dx=this.x-mouse2.x,dy=this.y-mouse2.y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){this.x+=dx/d*1.1;this.y+=dy/d*1.1;}}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);const dk=document.documentElement.getAttribute('data-theme')!=='light';ctx.fillStyle=this.gold?`rgba(212,175,55,${this.a})`:dk?`rgba(240,234,214,${this.a*.3})`:`rgba(140,100,20,${this.a*.4})`;ctx.fill();}}
for(let i=0;i<150;i++)pts.push(new Pt());
document.addEventListener('mousemove',e=>{mouse2.x=e.clientX;mouse2.y=e.clientY});
function drawConst(){ctx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(212,175,55,${(1-d/110)*.09})`;ctx.lineWidth=.5;ctx.stroke();}}pts.forEach(p=>{p.upd();p.draw()});requestAnimationFrame(drawConst);}
drawConst();
function animateCounter(el,target,dec){const start=performance.now(),dur=2000;function update(now){const p=Math.min((now-start)/dur,1),ease=1-Math.pow(1-p,4);el.textContent=(ease*target).toFixed(dec);if(p<1)requestAnimationFrame(update);else el.textContent=target.toFixed(dec);}requestAnimationFrame(update);}
const cObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.counter').forEach(el=>{animateCounter(el,parseFloat(el.dataset.target),parseInt(el.dataset.dec||0));});cObs.unobserve(e.target);}});},{threshold:.3});
document.querySelectorAll('#stats-band').forEach(s=>cObs.observe(s));
const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});},{threshold:.08});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>revObs.observe(el));
document.querySelectorAll('.btn-gold,.btn-outline,.btn-resume').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)*.2,dy=(e.clientY-r.top-r.height/2)*.2;btn.style.transform=`translate(${dx}px,${dy}px)`});btn.addEventListener('mouseleave',()=>{btn.style.transform='';});});
document.querySelectorAll('.pc,.cert-c,.learn-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateZ(4px)`;});card.addEventListener('mouseleave',()=>{card.style.transform='';});});
function downloadResume(e){
  e.preventDefault();
  const resumePath = 'resume/M_WILSON_RESUME -1.pdf';
  const a = document.createElement('a');
  a.href = encodeURI(resumePath);
  a.setAttribute('download', 'MWilson_Resume.pdf');
  document.body.appendChild(a);
  a.click();
  a.remove();
  const btn = document.querySelector('.btn-resume span');
  if(btn){
    const orig = btn.textContent;
    btn.textContent = 'Downloaded! ✦';
    setTimeout(()=>btn.textContent = orig, 2000);
  }
}

const WILSON_CHAT_CONTEXT=`You are an AI assistant on M. Wilson's portfolio website.
Answer questions about Wilson only. Be friendly, concise, and accurate.

ABOUT: M. Wilson is a Full Stack Developer from Jayankondam, Tamil Nadu.
Email: mwilson312002@gmail.com
Phone: +91 70920 15592
GitHub: github.com/mwilson312002
LinkedIn: linkedin.com/in/wilson-m-074831385

EDUCATION:
- MCA, M.A.M Business School, Anna University (2024-2026) - CGPA 8.35/10
- BA English, St. Peter Arts & Science College (2021-2024) - CGPA 8.25

SKILLS: Python, JavaScript, PHP, SQL, React.js, HTML5, CSS3, REST APIs, MySQL, Git, Machine Learning

EXPERIENCE: Full Stack Developer Intern at VDart Academy (Jan-Apr 2026)
Built REST APIs, React modules, MySQL databases, and frontend-backend integration.

PROJECTS:
1. Smart Intern Management System - React.js, Python, MySQL
2. Smart Parking Management System - HTML, CSS, JS, Python, MySQL
3. Phishing URL Detection - Python, Machine Learning

ACHIEVEMENTS: 3rd Rank MCA, 2nd Prize Pitch Perfect, 2nd Prize Fanton Quiz (MAM CET 2025)
CERTIFICATIONS: Python Programming, Data Analysis with Python, DevOps Decode

If asked about availability, say Wilson is open to full-time opportunities.`;

const chatHistory=[];

function getLocalChatReply(query){
  const q=query.toLowerCase();
  if(q.includes('project')) return 'Wilson has built a Smart Intern Management System, a Smart Parking Management System, and a Phishing URL Detection project.';
  if(q.includes('skill')||q.includes('stack')||q.includes('tech')) return 'Wilson works with Python, JavaScript, PHP, SQL, React.js, HTML5, CSS3, REST APIs, MySQL, Git, and Machine Learning.';
  if(q.includes('hire')||q.includes('available')||q.includes('job')) return 'Wilson is open to full-time and internship opportunities.';
  if(q.includes('experience')||q.includes('intern')) return 'Wilson completed a Full Stack Developer internship at VDart Academy from Jan to Apr 2026, where he built REST APIs, React modules, and MySQL-backed features.';
  if(q.includes('education')||q.includes('study')||q.includes('college')) return 'Wilson is pursuing an MCA at M.A.M Business School, Anna University, and completed a BA in English at St. Peter Arts & Science College.';
  if(q.includes('contact')||q.includes('email')||q.includes('phone')) return 'You can reach Wilson at mwilson312002@gmail.com or +91 70920 15592.';
  if(q.includes('achievement')||q.includes('award')||q.includes('rank')) return 'Wilson earned 3rd rank in MCA and won 2nd prize in Pitch Perfect and Fanton Quiz at MAM CET 2025.';
  return 'I can answer questions about Wilson’s skills, projects, education, experience, achievements, and contact details.';
}

function getChatElements(){
  return {
    windowEl:document.getElementById('chat-window'),
    messagesEl:document.getElementById('chat-messages'),
    inputEl:document.getElementById('chat-input')
  };
}

function appendChatMessage(role,text,extraClass=''){
  const {messagesEl}=getChatElements();
  const row=document.createElement('div');
  row.className=`chat-row ${role}`;
  const bubble=document.createElement('div');
  bubble.className=role==='user'?'user-msg':'bot-msg';
  if(extraClass) bubble.classList.add(extraClass);
  bubble.textContent=text;
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  messagesEl.scrollTop=messagesEl.scrollHeight;
  return bubble;
}

function toggleChat(){
  const {windowEl,inputEl}=getChatElements();
  const isOpen=windowEl.classList.toggle('open');
  windowEl.setAttribute('aria-hidden',String(!isOpen));
  if(isOpen) setTimeout(()=>inputEl.focus(),0);
}

function sendQuick(text){
  const {inputEl}=getChatElements();
  inputEl.value=text;
  sendMessage();
}

function getInstantReply(text){
  const lower=text.trim().toLowerCase();
  if(/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(lower)) return 'Hi 👋 I’m Wilson AI. Ask me about Wilson’s projects, skills, or experience!';
  if(lower.includes('how are you')) return 'I’m doing great 😄 Hope you’re having a nice day too! How can I help with Wilson?';
  if(lower==='thanks'||lower==='thank you') return 'You’re welcome! Anything else about Wilson I can help with?';
  if(lower==='go') return 'Where would you like to go? Try: Projects, Skills, Resume, or Hire Wilson.';
  if(lower==='ok'||lower==='okay') return 'Great! Let me know what you’d like to know about Wilson.';
  if(lower==='bye'||lower==='goodbye') return 'Goodbye! Feel free to return anytime to learn more about Wilson.';
  if(lower.includes('what can you do')) return 'I can help with Wilson’s:\n• Projects\n• Skills\n• Resume\n• Experience\n• Certifications\n• Contact information';
  if(lower.includes('go to')||lower.includes('navigate')||lower.includes('show me')) return 'Sure — try Projects, Skills, Resume, or Hire Wilson.';
  return null;
}

async function sendMessage(){
  const {inputEl}=getChatElements();
  const text=inputEl.value.trim();
  if(!text)return;

  appendChatMessage('user',text);
  inputEl.value='';

  const instantReply=getInstantReply(text);
  if(instantReply){
    appendChatMessage('bot',instantReply);
    return;
  }

  const typingBubble=appendChatMessage('bot','Wilson AI is typing...','typing');

  try{
    const response=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:text,history:chatHistory.slice(-10)})
    });

    if(!response.ok){
      const errorData=await response.json().catch(()=>null);
      throw new Error(errorData?.error?.message||`Gemini request failed: ${response.status}`);
    }

    const data=await response.json();
    const reply=data?.reply||'I could not generate a response right now.';
    typingBubble.classList.remove('typing');
    typingBubble.textContent=reply;
    chatHistory.push({role:'user',parts:[{text}]},{role:'model',parts:[{text:reply}]});
  }catch(error){
    typingBubble.classList.remove('typing');
    typingBubble.textContent=getLocalChatReply(text);

    if(error?.message){
      console.warn('Gemini chat fallback:', error.message);
    }
  }

  const {messagesEl}=getChatElements();
  messagesEl.scrollTop=messagesEl.scrollHeight;
}

/* Contact form validation and mail handling */
function isValidEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}
function sendContact(ev){
  ev.preventDefault();
  const name = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const message = document.getElementById('contact-message');
  const status = document.getElementById('contact-status');
  const sendBtn = document.getElementById('sendBtn');
  status.textContent = '';
  if(!name.value.trim()){status.textContent='Please enter your name.';name.focus();return}
  if(!isValidEmail(email.value.trim())){status.textContent='Please enter a valid email.';email.focus();return}
  if(!message.value.trim()){status.textContent='Please add a short message.';message.focus();return}

  // Compose mailto as a fallback (works without server). Replace with a proper endpoint when available.
  const subject = encodeURIComponent('Portfolio message from '+name.value.trim());
  const body = encodeURIComponent('Name: '+name.value.trim()+"\nEmail: "+email.value.trim()+"\n\n"+message.value.trim());
  const mailto = `mailto:mwilson312002@gmail.com?subject=${subject}&body=${body}`;

  // Attempt to open user's mail client
  window.location.href = mailto;
  sendBtn.disabled = true; sendBtn.textContent = 'Opening mail client...';
  // Mark as sent in UI after a short delay
  setTimeout(()=>{sendBtn.textContent='Message Sent';sendBtn.style.opacity='.9';},1200);
  setTimeout(()=>{sendBtn.disabled=false;sendBtn.textContent='Send Message';sendBtn.style.opacity='1';},3200);
  // Analytics event when available
  if(window.gtag){try{gtag('event','contact_send',{method:'mailto'});}catch(e){}
  }
}

/* Cookie / Analytics consent banner + lazy analytics loader */
function loadAnalytics(){
  if(window.__analyticsLoaded) return;
  window.__analyticsLoaded = true;
  // Replace 'G-XXXXXXX' with your real GA4 measurement ID
  const MEASUREMENT_ID = 'G-XXXXXXX';
  if(MEASUREMENT_ID==='G-XXXXXXX') return; // no-op until user provides an ID
  const s = document.createElement('script');
  s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
}

function showCookieBannerIfNeeded(){
  const consent = localStorage.getItem('analytics_consent');
  if(consent===null){
    const existing = document.getElementById('cookie-banner');
    if(existing) return;
    const el = document.createElement('div');
    el.id = 'cookie-banner';
    el.setAttribute('role','dialog');
    el.innerHTML = `<p>We use anonymous analytics to improve this site. Accept to enable analytics.</p><div class="cb-actions"><button class="cb-btn" id="cbDecline">Decline</button><button class="cb-btn primary" id="cbAccept">Accept</button></div>`;
    document.body.appendChild(el);
    document.getElementById('cbAccept').addEventListener('click',()=>{localStorage.setItem('analytics_consent','true');loadAnalytics();el.remove();});
    document.getElementById('cbDecline').addEventListener('click',()=>{localStorage.setItem('analytics_consent','false');el.remove();});
  }else if(consent==='true'){
    loadAnalytics();
  }
}

// Run consent check on load
document.addEventListener('DOMContentLoaded',()=>{
  const toggleButton=document.getElementById('chat-toggle');
  const closeButton=document.getElementById('chat-close');
  const sendButton=document.getElementById('chat-send');
  const input=document.getElementById('chat-input');

  toggleButton?.addEventListener('click',toggleChat);
  closeButton?.addEventListener('click',toggleChat);
  sendButton?.addEventListener('click',sendMessage);
  input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendMessage();}});
  document.querySelectorAll('#chat-quick button').forEach(btn=>btn.addEventListener('click',()=>sendQuick(btn.dataset.prompt||btn.textContent.trim())));

  setChatStatus('Connected through local proxy.', 'live');
  showCookieBannerIfNeeded();
});
