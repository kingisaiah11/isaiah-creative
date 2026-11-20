// Bend the moving strip around a shallow cylinder, without altering its speed.
(()=>{
 const windowEl=document.querySelector('.reel-window'),track=document.querySelector('.reel-track');if(!track)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,frame=0,last=0;
 const cards=[...track.querySelectorAll('.reel-card')];
 function tick(time){frame=0;if(!visible||document.hidden||reduced.matches)return;if(time-last>32){last=time;
   const bounds=windowEl.getBoundingClientRect();
   const groups=new Map([...track.children].map(g=>[g,g.getBoundingClientRect()]));
   for(const card of cards){const group=groups.get(card.parentElement);const x=group.left+card.offsetLeft+card.offsetWidth/2;const t=Math.max(-1.3,Math.min(1.3,(x-bounds.left-bounds.width/2)/(bounds.width/2)));
     card.style.setProperty('--bend-y',`${(t*t*54).toFixed(2)}px`);card.style.setProperty('--bend-rotate',`${(-t*42).toFixed(2)}deg`);card.style.setProperty('--bend-tilt',`${(t*5).toFixed(2)}deg`);
     card.style.setProperty('--depth-z',`${(45-Math.min(t*t,1.7)*130).toFixed(2)}px`);
     card.style.setProperty('--depth-light',(1-Math.min(Math.abs(t),1.3)*.16).toFixed(3));
   }
 }frame=requestAnimationFrame(tick);}
 function start(){if(!frame&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);}
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;start();}).observe(windowEl);
 document.addEventListener('visibilitychange',start);reduced.addEventListener('change',()=>{if(reduced.matches)cards.forEach(c=>{c.style.removeProperty('--bend-y');c.style.removeProperty('--bend-rotate');c.style.removeProperty('--bend-tilt');});else start();});
})();
