(()=>{
 const root=document.documentElement,button=document.querySelector('#theme-toggle'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 button.innerHTML='<span class="theme-sun" aria-hidden="true">☀</span><span class="theme-moon" aria-hidden="true">☾</span><span class="theme-thumb" aria-hidden="true"></span>';
 button.setAttribute('role','switch');button.removeAttribute('aria-pressed');
 function label(){const light=root.dataset.theme==='light';button.setAttribute('aria-label','Light mode');button.title=light?'Switch to dark mode':'Switch to light mode';button.setAttribute('aria-checked',String(light));document.querySelector('meta[name="theme-color"]').content=light?'#f6f4ed':'#151515';}
 let switching=false;
 label();button.addEventListener('click',async()=>{
   if(switching)return;switching=true;
   const change=()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';label();};
   try{if(document.startViewTransition&&!reduced.matches){await document.startViewTransition(change).finished;}else{change();}}finally{switching=false;}
 });
 // Re-arm only after a card fully exits, so either scroll direction gets a reveal.
 const seen=new WeakSet(),entered=new WeakSet(),reveals=new WeakMap();const observer=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting){entered.delete(e.target);continue;}if(e.intersectionRatio>=.1&&!entered.has(e.target)){entered.add(e.target);if(!reduced.matches){reveals.get(e.target)?.cancel();const from=e.boundingClientRect.top<0?'-18px':'18px';reveals.set(e.target,e.target.animate([{opacity:.35,scale:.94,translate:`0 ${from}`},{opacity:1,scale:1,translate:'0 0'}],{duration:750,easing:'cubic-bezier(.16,1,.3,1)'}));}}}},{threshold:[0,.1]});
 function observe(){document.querySelectorAll('.video-card,.design-card,.skills article,#contact h2,.contact-hello').forEach(el=>{if(!seen.has(el)){seen.add(el);observer.observe(el);}});}observe();
 new MutationObserver(observe).observe(document.querySelector('#design-grid'),{childList:true});
 const dot=document.querySelector('.entrance-dot');
 const toolkit=document.querySelector('.toolkit'),toolsButton=document.querySelector('.tools-motion');
 toolsButton?.addEventListener('click',()=>{const paused=toolkit.classList.toggle('is-paused');toolsButton.setAttribute('aria-pressed',String(paused));toolsButton.setAttribute('aria-label',paused?'Play tools animation':'Pause tools animation');toolsButton.textContent=paused?'▷':'Ⅱ';});
 document.fonts.ready.then(()=>{
   if(reduced.matches||scrollY>100||!dot)return;
   // A quiet, paced reading rhythm accompanies the 4.8-second liquid entrance.
   const wordCues=[
     ['ideas',0,{opacity:.25,transform:'translateY(9px)',filter:'blur(3px)'}],
     ['into',420,{opacity:.25,transform:'translateX(-6px)',filter:'blur(2px)'}],
     ['something',1100,{opacity:.2,transform:'translateY(7px) rotate(-1.5deg)',filter:'blur(3px)'}],
     ['worth',2100,{opacity:.2,transform:'scale(.96)',filter:'blur(2px)'}],
     ['watching',3000,{opacity:.2,transform:'translateY(8px)',filter:'blur(3px)'}]
   ];
   const words=wordCues.map(([name,delay,start])=>document.querySelector(`[data-word="${name}"]`).animate([start,{opacity:1,transform:'none',filter:'blur(0)'}],{duration:900,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
   const d=dot.getBoundingClientRect(),h=document.querySelector('#hero-title').getBoundingClientRect();
   const w=Math.min(h.width,innerWidth-h.left-22),height=h.height;
   // A continuous spline coils around the headline and eases into the final dot.
   const points=[[.08,.42],[.03,.08],[.38,-.04],[.81,.12],[.89,.55],[.55,.69],[.18,.47],[.3,.18],[.68,.3],[.71,.76],[(d.left-h.left)/w+.04,(d.top-h.top)/height-.13],[(d.left-h.left)/w,(d.top-h.top)/height]];
   const xy=points.map(([x,y])=>[h.left+x*w-d.left,h.top+y*height-d.top]);
   function spline(t){const f=t*(xy.length-1),i=Math.min(xy.length-2,Math.floor(f)),u=f-i;const a=xy[Math.max(0,i-1)],b=xy[i],c=xy[i+1],e=xy[Math.min(xy.length-1,i+2)];return [0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*u+(2*a[k]-5*b[k]+4*c[k]-e[k])*u*u+(-a[k]+3*b[k]-3*c[k]+e[k])*u*u*u));}
   const frames=[];
   for(let i=0;i<=180;i++){const time=i/180,t=(1-Math.cos(Math.PI*time))/2,[x,y]=spline(t),next=spline(Math.min(1,t+.002));const angle=Math.atan2(next[1]-y,next[0]-x)*180/Math.PI;
     const envelope=Math.sin(Math.PI*time),stretch=1+envelope*(.65+.25*Math.sin(time*22)),size=1+envelope*.55;
     frames.push({offset:time,transform:`translate(${x}px,${y}px) rotate(${angle}deg) scale(${size*stretch},${size/stretch})`,borderRadius:`${50+envelope*18*Math.sin(time*30)}% ${50-envelope*14}% ${50+envelope*14}% ${50-envelope*18*Math.sin(time*30)}%`,opacity:Math.min(1,time*12),boxShadow:`0 0 ${envelope*24}px rgba(255,191,0,${envelope*.5})`});
   }
   frames[180]={offset:1,transform:'translate(0,0) scale(1)',borderRadius:'50%',opacity:1,boxShadow:'0 0 0 transparent'};
   const trails=[1,2,3].map(n=>{const el=document.createElement('span');el.className='liquid-trail';el.setAttribute('aria-hidden','true');dot.parentElement.append(el);el.style.left=(dot.offsetLeft)+'px';el.style.top=(dot.offsetTop)+'px';el.style.width=d.width+'px';el.style.height=d.height+'px';return {el,animation:el.animate(frames.map(f=>({...f,opacity:(f.opacity||0)*(.22/n),filter:`blur(${n*1.2}px)`})),{duration:4800,delay:n*35,easing:'linear'})};});
   const animation=dot.animate(frames,{duration:4800,easing:'linear'});
   const stop=()=>{animation.cancel();words.forEach(a=>a.cancel());trails.forEach(({el,animation:a})=>{a.cancel();el.remove();});};
   animation.finished.then(()=>trails.forEach(({el,animation:a})=>{a.cancel();el.remove();})).catch(()=>{});
   addEventListener('scroll',stop,{once:true,passive:true});addEventListener('resize',stop,{once:true});reduced.addEventListener('change',stop,{once:true});
 });
})();
