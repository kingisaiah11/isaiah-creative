// Decorative background only: no pointer capture, no image transforms.
(()=>{
  const canvas=document.getElementById('pixel-dust');if(!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer: fine)');
  let dots=[],width=0,height=0,frame=0,last=0,px=-9999,py=-9999,active=false;
  const enabled=()=>!reduced.matches&&fine.matches&&!document.hidden;
  function resize(){
    width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    dots=[];for(let y=10;y<height;y+=20)for(let x=10;x<width;x+=20)dots.push({x,y,dx:0,dy:0});
    request();
  }
  function request(){if(!frame&&enabled())frame=requestAnimationFrame(draw);}
  function draw(time){
    frame=0;if(!enabled()){ctx.clearRect(0,0,width,height);return;}
    if(time-last<32){request();return;}last=time;ctx.clearRect(0,0,width,height);let moving=false;
    for(const d of dots){const x=d.x-px,y=d.y-py,dist=Math.hypot(x,y);const strength=active?Math.max(0,1-dist/90):0;
      const tx=dist?x/dist*strength*22:0,ty=dist?y/dist*strength*22:0;
      d.dx+=(tx-d.dx)*.13;d.dy+=(ty-d.dy)*.13;
      if(Math.abs(tx-d.dx)+Math.abs(ty-d.dy)>.08)moving=true;
      const energy=Math.min(1,(Math.abs(d.dx)+Math.abs(d.dy))/20);
      ctx.fillStyle=`rgba(255,191,0,${.035+energy*.22})`;const size=energy>.5?3:2;ctx.fillRect(d.x+d.dx,d.y+d.dy,size,size);
    }
    if(moving)request();
  }
  document.addEventListener('pointermove',e=>{
    active=!e.target.closest('img,button,a,.reel-window,.video-card,.design-card,.gallery,.portrait,dialog');
    px=e.clientX;py=e.clientY;request();
  },{passive:true});
  const clear=()=>{active=false;request();};
  document.documentElement.addEventListener('pointerleave',clear);addEventListener('scroll',clear,{passive:true});
  addEventListener('resize',resize,{passive:true});
  const reset=()=>{cancelAnimationFrame(frame);frame=0;active=false;ctx.clearRect(0,0,width,height);if(enabled())resize();};
  reduced.addEventListener('change',reset);fine.addEventListener('change',reset);document.addEventListener('visibilitychange',reset);
  resize();
})();
