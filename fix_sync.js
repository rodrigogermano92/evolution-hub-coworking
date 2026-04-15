const fs = require('fs');

function fixImages() {
    let galHtml = fs.readFileSync('galeria.html', 'utf8');
    let i = 4;
    galHtml = galHtml.replace(/src="assets\/\.JPG"/g, () => 'src="assets/foto0' + (i++) + '.JPG"');
    fs.writeFileSync('galeria.html', galHtml);
    
    let idxHtml = fs.readFileSync('index.html', 'utf8');
    let j = 7;
    idxHtml = idxHtml.replace(/src="assets\/\.JPG"/g, () => 'src="assets/foto0' + (j++) + '.JPG"');
    fs.writeFileSync('index.html', idxHtml);
    console.log('Fixed missing image filenames in root files.');
}

function syncEnglish() {
    // 1. Sync footer structure for index-en.html, galeria-en.html, historia-en.html
    const enFiles = ['index-en.html', 'galeria-en.html', 'historia-en.html'];
    enFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        
        // Mirror footer changes
        content = content.replace(/<footer class="bg-white border-t border-gray-100 pt-24 pb-12">/g, 
            '<footer class="bg-[#1E2C3D] border-t border-[#32445C] pt-24 pb-12 text-[#E8ECF2]">'
        );
        content = content.replace(/<div class="text-2xl font-extrabold text-\[var\(--primary\)\] mb-8 tracking-tight">EVOLUTION HUB<\/div>/gi, 
            '<a href="#" class="inline-block text-2xl font-extrabold text-[#E8ECF2] tracking-tight hover:opacity-80 transition-opacity mb-8">EVOLUTION<span class="font-light opacity-60">HUB</span></a>'
        );
        content = content.replace(/<div class="text-2xl font-extrabold text-emerald-50 mb-8 tracking-tight">EVOLUTION HUB<\/div>/gi, 
            '<a href="#" class="inline-block text-2xl font-extrabold text-[#E8ECF2] tracking-tight hover:opacity-80 transition-opacity mb-8">EVOLUTION<span class="font-light opacity-60">HUB</span></a>'
        );
        content = content.replace(/<p class="text-\[var\(--text-muted\)\] text-sm font-light mb-8">/g, '<p class="text-[#C4CCDA] text-sm font-light mb-8">');
        content = content.replace(/bg-gray-50 flex items-center justify-center text-\[var\(--text-muted\)\]/g, 'bg-[#32445C] flex items-center justify-center text-[#E8ECF2]');
        
        // Ensure social link for instagram has the target link
        content = content.replace(/href="#"([^>]*)(aria-label="Instagram")/g, 'href="https://www.instagram.com/evolution.rio/" target="_blank" rel="noopener noreferrer" $1 $2');
        
        content = content.replace(/text-\[var\(--text-main\)\] mb-8">Explore/g, 'text-[#E8ECF2] mb-8">Explore');
        content = content.replace(/text-\[var\(--text-main\)\] mb-8">Contact/g, 'text-[#E8ECF2] mb-8">Contact');
        
        content = content.replace(/text-\[var\(--text-muted\)\]/g, 'text-[#C4CCDA]'); 

        // Fix contact elements 
        content = content.replace(/contato@evolution\.rio\.br/g, 'ev@evolution.rio.br');
        content = content.replace(/Mon-Fri, 08am to 08pm/g, 'Monday to Friday, 9am to 6pm'); // translated from Segunda a Sexta, das 09h às 18h
        content = content.replace(/© 2024 Evolution Hub Coworking/g, '© 2025 Evolution Hub Coworking');
        content = content.replace(/hover:text-\[var\(--primary\)\]/g, 'hover:text-white'); // for footer links

        fs.writeFileSync(file, content);
    });

    // 2. Sync "Escritórios Privativos" to index-en.html
    let idxEn = fs.readFileSync('index-en.html', 'utf8');
    
    // Check if Escritorios Privativos is missing. In PT they added a new block after the plan cards.
    // PT code has:
    // </div>
    // </div>
    // 
    // <!-- Escritórios Privativos -->
    // <div class="bg-white rounded-[3rem] overflow-hidden p-8 lg:p-12 border border-gray-100 shadow-sm">
    // ...
    // ... "Sob consulta"
    //
    // <div class="flex items-center justify-between pt-8 border-t border-gray-200">
    // <div><p class="text-sm text-gray-500 font-medium">Planos Mensais</p><p class="text-3xl font-black text-[var(--primary)]">Sob consulta</p></div>
    // <a class="bg-[var(--primary)] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[var(--accent)] transition-all shadow-lg" href="#contato">Solicitar Orçamento</a>
    // </div>
    // </div>
    // </div>
    // </div>
    // </section>

    if (!idxEn.includes('Private Offices')) {
        const privateOfficesHtml = `
<!-- Private Offices -->
<div class="bg-white rounded-[3rem] overflow-hidden p-8 lg:p-12 border border-gray-100 shadow-sm mt-8">
<div class="mb-10">
<span class="inline-block text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--surface)] border border-gray-200 px-3 py-1 rounded-full mb-4">Private Offices</span>
<h3 class="text-3xl font-bold mb-4 text-[var(--primary)]">Team Rooms</h3>
<p class="text-[#C4CCDA] text-lg font-light max-w-2xl">Environments ready for teams that need focus, security and total privacy. 874 Mbps Wi-Fi and CAT6 cabling in all rooms.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
<div class="bg-[var(--surface)] rounded-[2rem] p-8 border border-gray-100">
<h4 class="text-xl font-bold text-[var(--text-main)] mb-3">Pedra do Sal</h4>
<div class="flex flex-wrap gap-2 mb-4">
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">42 m²</span>
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">Guanabara Bay View</span>
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">Glass Door</span>
</div>
<p class="text-sm text-[#C4CCDA] font-light leading-relaxed">Wi-Fi 874/556 Mbps · CAT6 Cabling · 110v Outlets · Air-conditioned · Divided by glass door. Ideal for teams.</p>
</div>
<div class="bg-[var(--surface)] rounded-[2rem] p-8 border border-gray-100">
<h4 class="text-xl font-bold text-[var(--text-main)] mb-3">Beco da Sardinha</h4>
<div class="flex flex-wrap gap-2 mb-4">
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">21 m²</span>
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">Guanabara Bay View</span>
</div>
<p class="text-sm text-[#C4CCDA] font-light leading-relaxed">Wi-Fi 874/556 Mbps · CAT6 Cabling · 110v Outlets · Air-conditioned. Ideal for small teams.</p>
</div>
<div class="bg-[var(--surface)] rounded-[2rem] p-8 border border-gray-100">
<h4 class="text-xl font-bold text-[var(--text-main)] mb-3">AquaRio</h4>
<div class="flex flex-wrap gap-2 mb-4">
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">8.5 m²</span>
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">Up to 6 people</span>
</div>
<p class="text-sm text-[#C4CCDA] font-light leading-relaxed">Wi-Fi 874/556 Mbps · CAT6 Cabling · 110v Outlets · Air-conditioned.</p>
</div>
<div class="bg-[var(--surface)] rounded-[2rem] p-8 border border-gray-100">
<h4 class="text-xl font-bold text-[var(--text-main)] mb-3">Room 06</h4>
<div class="flex flex-wrap gap-2 mb-4">
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">13 m²</span>
<span class="text-xs font-semibold bg-white text-[var(--primary)] px-3 py-1 rounded-full border border-gray-200">Up to 4 people</span>
</div>
<p class="text-sm text-[#C4CCDA] font-light leading-relaxed">Wi-Fi 874/556 Mbps · CAT6 Cabling · 110v Outlets · Air-conditioned.</p>
</div>
</div>
<div class="flex items-center justify-between pt-8 border-t border-gray-200">
<div><p class="text-sm text-gray-500 font-medium">Monthly Plans</p><p class="text-3xl font-black text-[var(--primary)]">On demand</p></div>
<a class="bg-[var(--primary)] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[var(--accent)] transition-all shadow-lg" href="#contact">Request Quote</a>
</div>
</div>`;
        idxEn = idxEn.replace(/<a class="bg-\[var\(--primary\)\].*?>Schedule an event<\/a>\s*<\/div>\s*<\/div>/, '$&\n' + privateOfficesHtml);
    }

    // Update Estrutura Gallery section similarly.
    const estPT = `
<section class="py-32 bg-[var(--surface)] overflow-hidden scroll-mt-24" id="estrutura">
<div class="max-w-7xl mx-auto px-8">
<div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
<div>
<h2 class="text-4xl font-extrabold mb-4">Inspiring Environments</h2>
<p class="text-[var(--text-muted)] font-light text-lg">Spaces designed for those who take work seriously.</p>
</div>
<a class="text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] pb-1 flex items-center gap-1 hover:opacity-70 transition-opacity" href="galeria-en.html">
View full gallery
<span class="material-symbols-outlined text-lg">arrow_forward</span>
</a>
</div>
<div class="grid grid-cols-12 gap-6">
<div class="col-span-12 md:col-span-7 h-[440px] rounded-[2.5rem] overflow-hidden group shadow-lg">
<img alt="Evolution Hub Space" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" src="assets/foto07.JPG"/>
</div>
<div class="col-span-12 md:col-span-5 flex flex-col gap-6">
<div class="flex-1 min-h-[200px] rounded-[2.5rem] overflow-hidden group shadow-lg">
<img alt="Evolution Hub Room" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" src="assets/foto08.JPG"/>
</div>
<div class="flex-1 min-h-[200px] rounded-[2.5rem] overflow-hidden group shadow-lg">
<img alt="Evolution Hub Coworking" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" src="assets/foto09.JPG"/>
</div>
</div>
</div>
<div class="mt-12 text-center">
<a href="galeria-en.html" class="inline-flex items-center gap-3 border-2 border-[var(--primary)] text-[var(--primary)] px-10 py-4 rounded-full font-bold hover:bg-[var(--primary)] hover:text-white transition-all">
<span class="material-symbols-outlined">photo_library</span>
Explore all environments
</a>
</div>
</div>
</section>`;
    
    idxEn = idxEn.replace(/<section class="py-32 bg-white overflow-hidden scroll-mt-24"[^>]*id="estrutura">[\s\S]*?<\/section>/, estPT);

    fs.writeFileSync('index-en.html', idxEn);
    console.log('Synced English index structure.');
}

fixImages();
syncEnglish();
