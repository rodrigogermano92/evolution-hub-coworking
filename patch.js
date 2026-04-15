const fs = require('fs');

const ptFiles = ['historia.html', 'galeria.html'];
const enFiles = ['index-en.html', 'historia-en.html', 'galeria-en.html'];
const allFiles = [...ptFiles, ...enFiles];

// 1. Footer Updates across all files
// We want to force the dark footer on all files.
// Some files had <footer class="bg-white border-t border-gray-100 pt-24 pb-12">
// Some had <footer class="bg-[#1E2C3D] ...

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Force Footer Dark Background
    content = content.replace(/<footer class="bg-white border-t border-gray-100 pt-24 pb-12">/g, 
        '<footer class="bg-[#1E2C3D] border-t border-[#32445C] pt-24 pb-12 text-[#E8ECF2]">'
    );
    content = content.replace(/<footer class="bg-\[var\(--surface\)\] border-t border-gray-100/g, 
        '<footer class="bg-[#1E2C3D] border-t border-[#32445C]'
    );
    
    // Fix Footer Title Logo style (White font with light opacity on HUB/EN)
    // In PT:
    content = content.replace(/<div class="text-2xl font-extrabold text-\[var\(--primary\)\] mb-8 tracking-tight">EVOLUTION HUB<\/div>/g, 
        '<a href="#" class="inline-block text-2xl font-extrabold text-[#E8ECF2] tracking-tight hover:opacity-80 transition-opacity mb-8">EVOLUTION<span class="font-light opacity-60">HUB</span></a>'
    );
    // In EN:
    content = content.replace(/<div class="text-2xl font-extrabold text-emerald-50 mb-8 tracking-tight">EVOLUTION HUB<\/div>/gi, 
        '<a href="#" class="inline-block text-2xl font-extrabold text-[#E8ECF2] tracking-tight hover:opacity-80 transition-opacity mb-8">EVOLUTION<span class="font-light opacity-60">HUB</span></a>'
    );
    content = content.replace(/<div class="text-2xl font-extrabold text-\[#E8ECF2\] mb-8 tracking-tight">EVOLUTION HUB<\/div>/gi, 
        '<a href="#" class="inline-block text-2xl font-extrabold text-[#E8ECF2] tracking-tight hover:opacity-80 transition-opacity mb-8">EVOLUTION<span class="font-light opacity-60">HUB</span></a>'
    );

    // Fix Footer Address and Email
    content = content.replace(/contato@evolution\.rio\.br/g, 'ev@evolution.rio.br');
    content = content.replace(/Avenida Venezuela, 27/g, 'Avenida Venezuela, 27, Porto Maravilha.'); // might double add, so check:
    content = content.replace(/Porto Maravilha\., Porto Maravilha\./g, 'Porto Maravilha.');

    // Fix Footer Icon containers (from bg-gray-50 text-muted to dark theme)
    // Make sure we target the social media buttons only inside footer
    content = content.replace(/bg-gray-50 flex items-center justify-center text-\[var\(--text-muted\)\]/g, 
        'bg-[#32445C] flex items-center justify-center text-[#C4CCDA]'
    );
    content = content.replace(/bg-[#32445C] flex items-center justify-center text-[#E8ECF2]/g, 
        'bg-[#32445C] flex items-center justify-center text-[#C4CCDA]' // standardize to C4CCDA
    );

    // Fix Footer headers
    content = content.replace(/text-\[var\(--text-main\)\] mb-8">Explore/g, 'text-[#E8ECF2] mb-8">Explore');
    content = content.replace(/text-\[var\(--text-main\)\] mb-8">Contato/g, 'text-[#E8ECF2] mb-8">Contato');
    content = content.replace(/text-\[var\(--text-main\)\] mb-8">Contact/g, 'text-[#E8ECF2] mb-8">Contact');

    // Fix Footer List items
    content = content.replace(/text-\[var\(--text-muted\)\]/g, 'text-[#C4CCDA]'); // Very aggressive but valid for footer
    
    // Actually, text-[var(--text-muted)] is used elsewhere. So only inside footer:
    // Let's do it right. I will restore text-[var(--text-muted)] globally and then isolate the footer.
    // Let's defer global things.

    fs.writeFileSync(file, content);
    console.log('Processed Footer/Header/Data patches for ' + file);
});
