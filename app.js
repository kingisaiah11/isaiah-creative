const data=window.portfolio;
const $=s=>document.querySelector(s);
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
const dialog=$('#project-dialog');
let opener;
function openProject(title,type){opener=document.activeElement;$('#dialog-title').textContent=title;$('#dialog-type').textContent=type;$('#dialog-content').replaceChildren();dialog.showModal();document.body.style.overflow='hidden';}
function closeProject(){dialog.close();}
dialog.querySelector('.close').addEventListener('click',closeProject);
dialog.addEventListener('close',()=>{$('#dialog-content').replaceChildren();document.body.style.overflow='';opener?.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeProject();}});
function metadata(title,type){const m=make('div','card-meta');m.append(make('h3','',title),make('span','',type));return m;}
for(const v of data.videos){const card=make('button','video-card');card.setAttribute('aria-label','Watch '+v.title);const cover=make('div','video-cover '+v.theme);if(v.poster){const poster=make('img','video-poster');poster.src=v.poster;poster.alt='Snapshot from '+v.title;poster.loading='lazy';cover.append(poster);cover.classList.add('has-poster');}cover.append(make('span','',v.label.toUpperCase()),make('strong','',v.title),make('i','play','▷'));card.append(cover,metadata(v.title,v.label));card.addEventListener('click',()=>{openProject(v.title,v.label);const frame=make('iframe','video-frame');frame.src='https://drive.google.com/file/d/'+encodeURIComponent(v.id)+'/preview';frame.title=v.title+' video player';frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;const note=make('p','fallback','If playback is unavailable, Google Drive may still be processing the upload. ');const link=make('a','','Open video in Google Drive');link.href='https://drive.google.com/file/d/'+encodeURIComponent(v.id)+'/view';link.target='_blank';link.rel='noopener noreferrer';note.append(link);$('#dialog-content').append(frame,make('p','','Scripting, video editing, AI visuals & voiceover: King Carlo Isaiah Eugenio.'),note);});$('#video-grid').append(card);}
function renderDesigns(filter='All'){const grid=$('#design-grid');grid.replaceChildren();for(const d of data.designs.filter(x=>filter==='All'||x.category===filter)){const card=make('button','design-card');card.setAttribute('aria-label','View '+d.title);const box=make('div','design-image');const img=make('img');img.src='assets/'+d.image+'.webp';img.alt=d.title+' — '+d.type;img.loading='lazy';box.append(img);card.append(box,metadata(d.title,d.type+' · '+d.gallery.length+' images')); card.addEventListener('click',()=>{openProject(d.title,d.type);const gallery=make('div','gallery');for(const a of d.gallery){const i=make('img');i.src='assets/'+a+'.webp';i.alt=d.title+' — '+a.replaceAll('-',' ');gallery.append(i);}$('#dialog-content').append(make('p','',d.description),make('p','gallery-count',d.gallery.length+' images in this collection'),gallery);});grid.append(card);}}
function selectTab(name){document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===name)));$('#videos-panel').hidden=name!=='videos';$('#designs-panel').hidden=name!=='designs';}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>selectTab(b.dataset.tab)));
function selectFilter(filter){document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));renderDesigns(filter);}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>selectFilter(b.dataset.filter)));
$('#see-ai').addEventListener('click',()=>{selectTab('designs');selectFilter('AI');});
$('#year').textContent=new Date().getFullYear();
document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href='mailto:'+data.email;a.textContent=data.email;});
renderDesigns();

// A mixed showcase; portrait and short-form videos stay in the video gallery.
const reel=$('#reel-track');
if(reel){
  const videos=data.videos.map((v,index)=>({...v,index})).filter(v=>v.label!=='Short-form edit');
  const designs=data.featuredDesigns||[];
  const entries=[];
  for(let n=0;n<Math.max(videos.length,designs.length);n++){
    if(videos[n])entries.push({title:videos[n].title,src:videos[n].poster,video:videos[n].index});
    if(designs[n])entries.push({title:designs[n].title,src:'assets/'+designs[n].image+'.webp',design:true});
  }
  reel.style.setProperty('--reel-count',entries.length);
  for(let copy=0;copy<2;copy++){
    const group=make('div','reel-group');if(copy)group.setAttribute('aria-hidden','true');
    entries.forEach(v=>{
      const card=make('button','reel-card');card.type='button';card.setAttribute('aria-label',(v.design?'View ':'Watch ')+v.title);if(copy)card.tabIndex=-1;
      const img=make('img');img.src=v.src;img.alt=copy?'':v.title;img.draggable=false;card.append(img);
      card.addEventListener('click',()=>{if(v.design){openProject(v.title,'Graphic design');const full=make('img','featured-art');full.src=v.src;full.alt=v.title;$('#dialog-content').append(full);}else{$('#video-grid').children[v.video].click();}});group.append(card);
    });reel.append(group);
  }
  $('#reel-toggle').addEventListener('click',()=>{const paused=reel.classList.toggle('is-paused');$('#reel-toggle').setAttribute('aria-pressed',String(paused));$('#reel-toggle').textContent=paused?'Resume motion':'Pause motion';});
}
for(const [name,url] of Object.entries(data.socials||{})){
  if(!url)continue;
  const link=make('a','',({whatsapp:'WhatsApp',telegram:'Telegram',linkedin:'LinkedIn',onlinejobs:'OnlineJobs.ph'}[name]||name)+' ↗');link.href=url;link.target='_blank';link.rel='noopener noreferrer';$('#social-links').append(link);$('#social-links').hidden=false;
}

document.querySelectorAll('[data-specialty]').forEach(a=>a.addEventListener('click',()=>{selectTab(a.dataset.specialty);if(a.dataset.specialty==='designs')selectFilter('All');}));
