(function(){
  const API_URL='https://script.google.com/macros/s/AKfycbzmdYf2uhFpMxqxMZw4qx7NIFMoIMYq3oo1AfwCV1NFBA1eRyeGnI1g1F9qHBm-t17D/exec';
  const menu=document.querySelector('.menu');
  const mobile=document.querySelector('.mobile-links');
  if(menu&&mobile){menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');menu.textContent=open?'✕':'☰';});}
  async function loadStats(){
    const ids=['responses','younger','older']; if(!ids.some(id=>document.getElementById(id))) return;
    const status=document.getElementById('status');
    try{const r=await fetch(API_URL,{cache:'no-store'});if(!r.ok)throw new Error('request failed');const d=await r.json();
      document.getElementById('responses').textContent=d.responses??'—';document.getElementById('younger').textContent=d.younger??'—';document.getElementById('older').textContent=d.older??'—';
      if(status)status.textContent='Updated from the aggregated research dataset.';
    }catch(e){if(status)status.textContent='Live data is temporarily unavailable; the rest of the research site remains available.';}
  }
  loadStats();
  setInterval(loadStats,60000);

  const start=new Date('2026-10-19T18:30:00+05:30');
  document.querySelectorAll('[data-event-local]').forEach(el=>{
    try{const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;const local=new Intl.DateTimeFormat(undefined,{dateStyle:'medium',timeStyle:'short',timeZoneName:'short'}).format(start);el.textContent=local+' · '+tz;}catch(e){}
  });
})();
