// Personīgais dizains — iestatījumi glabājas katrā bērna pārlūkā.
const palettes={
 marks:{dragon:['#6452eb','#38cab8','#f0eeff'],night:['#344f8a','#67d2e1','#eaf3ff'],forest:['#287b65','#e1a853','#e9f8ee']},
 samanta:{peach:['#e86996','#f8b966','#fff0f4'],ocean:['#229bad','#7f83e8','#e9fbff'],lavender:['#9161c8','#ef9dc0','#f8eeff']}
};
const defaults={marks:'dragon',samanta:'peach'};
const themeNames={dragon:'Pūķu sala',night:'Zvaigžņu nakts',forest:'Meža ekspedīcija',peach:'Saulainais dārzs',ocean:'Okeāns',lavender:'Lavandas sapnis'};
export function applyPersonalTheme(role){
 const key='home-school-theme-'+role;let theme=defaults[role]||'dragon';
 try{const selected=localStorage.getItem(key);if(palettes[role]?.[selected])theme=selected;}catch{}
 const root=document.documentElement;const [primary,accent,tint]=palettes[role]?.[theme]||palettes.marks.dragon;
 root.style.setProperty('--personal-primary',primary);
 root.style.setProperty('--personal-accent',accent);
 root.style.setProperty('--personal-tint',tint);
 root.dataset.schoolTheme=role;root.dataset.themeVariant=theme;
 root.style.setProperty('--theme-glow',accent);
 return theme;
}
export function renderThemePicker(parent,role){
 if(!palettes[role])return;
 const box=document.createElement('section');box.className='theme-picker';box.setAttribute('aria-label','Pielāgot dizainu');
 const heading=document.createElement('strong');heading.textContent='🎨 Mana pasaule';box.append(heading);
 const subtitle=document.createElement('p');subtitle.textContent='Izvēlies savas pasaules krāsas. Mainīsies arī fons un misiju kartītes.';box.append(subtitle);
 const selected=document.createElement('div');selected.className='theme-selected';selected.setAttribute('role','status');box.append(selected);
 const variants=document.createElement('div');variants.className='theme-variants';box.append(variants);
 const labels={dragon:'🐉 Pūķu sala',night:'🌌 Zvaigžņu nakts',forest:'🌲 Meža ekspedīcija',peach:'🌸 Saulainais dārzs',ocean:'🌊 Okeāns',lavender:'🦄 Lavandas sapnis'};
 let active=applyPersonalTheme(role);
 const showSelected=()=>{selected.textContent='✓ Izvēlēta: '+themeNames[active];};showSelected();
 for(const [name,colors] of Object.entries(palettes[role])){
  const b=document.createElement('button');b.type='button';b.className='theme-choice';b.setAttribute('aria-pressed',String(active===name));
  const swatch=document.createElement('span');swatch.className='theme-swatch';swatch.style.background='linear-gradient(135deg,'+colors[0]+','+colors[1]+')';
  b.append(swatch,document.createTextNode(labels[name]));variants.append(b);
  b.onclick=()=>{active=name;try{localStorage.setItem('home-school-theme-'+role,name);}catch{}applyPersonalTheme(role);showSelected();
   for(const child of variants.children)child.setAttribute('aria-pressed',String(child===b));};
 }
 parent.append(box);
}
