const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'historia.html',
    'galeria.html',
    'index-en.html',
    'historia-en.html',
    'galeria-en.html'
];

const newStyleBlock = `<style type="text/tailwindcss">
        :root {
            --primary: #4A5E7E;
            --accent: #32445C;
            --surface: #E8ECF2;
            --bg-airy: #FFFFFF;
            --text-main: #1E2C3D;
            --text-muted: #4A5E7E;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-airy);
            color: var(--text-main);
            line-height: 1.6;
        }
        .heading-relaxed {
            letter-spacing: -0.03em;
            line-height: 1.15;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .hero-desaturated {
            filter: grayscale(35%) contrast(105%) brightness(85%);
        }
        .abstract-pattern {
            background-image: radial-gradient(circle at 2px 2px, rgba(27, 67, 50, 0.05) 1px, transparent 0);
            background-size: 20px 20px;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
    </style>`;

const newLogoPT = `EVOLUTION<span class="font-light opacity-60">HUB</span>`;

filesToUpdate.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace Style block
    content = content.replace(/<style type="text\/tailwindcss">[\s\S]*?<\/style>/, newStyleBlock);

    // 2. Replace Emerald & Green classes
    content = content.replace(/bg-emerald-900\/40/g, 'bg-[#1E2C3D]/40');
    content = content.replace(/bg-emerald-900\/80/g, 'bg-[#1E2C3D]/80');
    content = content.replace(/bg-emerald-800/g, 'bg-[#1E2C3D]');
    content = content.replace(/bg-emerald-700\/30/g, 'bg-[#1E2C3D]/30');
    content = content.replace(/bg-emerald-700/g, 'bg-[#32445C]');
    content = content.replace(/bg-emerald-500\/20/g, 'bg-[#4A5E7E]/10');
    content = content.replace(/bg-emerald-500/g, 'bg-[var(--primary)]');
    content = content.replace(/bg-emerald-400/g, 'bg-[#C4CCDA]');
    content = content.replace(/bg-emerald-100/g, 'bg-[#C4CCDA]');
    content = content.replace(/bg-emerald-50/g, 'bg-[#E8ECF2]');
    
    content = content.replace(/text-emerald-300/g, 'text-[#C4CCDA]');
    content = content.replace(/text-emerald-400/g, 'text-[#C4CCDA]');
    content = content.replace(/text-emerald-500/g, 'text-[var(--primary)]');
    content = content.replace(/text-emerald-600/g, 'text-[#4A5E7E]');
    content = content.replace(/text-emerald-700/g, 'text-[#32445C]');
    
    content = content.replace(/border-emerald-700/g, 'border-[#32445C]');
    content = content.replace(/border-emerald-500\/30/g, 'border-[#4A5E7E]/30');
    content = content.replace(/border-emerald-500/g, 'border-[var(--primary)]');
    content = content.replace(/border-emerald-200/g, 'border-[#C4CCDA]');
    
    content = content.replace(/from-emerald-900/g, 'from-[#1E2C3D]');
    content = content.replace(/from-emerald-700/g, 'from-[#32445C]');
    content = content.replace(/from-emerald-600/g, 'from-[var(--primary)]');
    content = content.replace(/to-emerald-600/g, 'to-[var(--primary)]');
    content = content.replace(/to-emerald-800/g, 'to-[#1E2C3D]');
    
    content = content.replace(/shadow-emerald-900\/20/g, 'shadow-slate-900/5');
    content = content.replace(/shadow-emerald-900\/10/g, 'shadow-slate-900/5');
    
    content = content.replace(/focus:ring-emerald-500/g, 'focus:ring-[#C4CCDA]');
    content = content.replace(/focus:border-emerald-500/g, 'focus:border-[#C4CCDA]');
    content = content.replace(/focus:bg-emerald-700/g, 'focus:bg-[#32445C]');
    
    content = content.replace(/bg-green-100/g, 'bg-[#C4CCDA]');
    content = content.replace(/text-green-800/g, 'text-[#1E2C3D]');

    // 3. Technical Update (1.7 Gbps and ISS)
    content = content.replace(/1 Gbps Download([^<]*)/gi, '1.7 Gbps Download$1');
    content = content.replace(/1 Gbps Simétrico([^<]*)/gi, '1.7 Gbps Download / 956 Mbps Upload$1');
    content = content.replace(/Internet Dedicada 1 Gbps/g, 'Internet Dedicada 1.7 Gbps');
    content = content.replace(/ISS reduzido de 5% para 2%/gi, 'ISS reduzido de 5% para 2%'); // Usually already correct if changed
    content = content.replace(/ISS reduzido a 2%/gi, 'ISS reduzido a 2%');

    // 4. UX updates (scroll-mt-24) Let's replace href="#formulario-contato" globally
    content = content.replace(/href="#formulario-contato"/g, 'href="#contato"');
    content = content.replace(/href="#contact-form"/g, 'href="#contact"');
    
    // Add scroll-mt-24 to sections that have "id=" but do not have scroll-mt
    content = content.replace(/(<section[^>]*class="[^"]*)(".*?id="[^"]*".*?>)/g, (match, prefix, suffix) => {
        if (!prefix.includes('scroll-mt-')) {
            return prefix + ' scroll-mt-24' + suffix;
        }
        return match;
    });

    // Replace <form id="formulario-contato" ... scroll-mt-X> with <form class="..."> 
    content = content.replace(/<form id="formulario-contato" class="(.*?) scroll-mt-\d+">/, '<form class="$1">');
    content = content.replace(/<form id="contact-form" class="(.*?) scroll-mt-\d+">/, '<form class="$1">');

    // Logo replacement Header (from div fallback to EVOLUTION HUB text)
    // We replace the block matching the emerald icon with the text-based one
    content = content.replace(
        /<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-\[var\(--primary\)\] to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:shadow-emerald-900\/20 group-hover:scale-105 transition-all">\s*E<span class="text-emerald-300">v<\/span>\s*<\/div>\s*<span class="font-extrabold text-xl tracking-tight text-\[var\(--text-main\)\] group-hover:text-\[var\(--primary\)\] transition-colors">\s*Evolution<span class="text-\[var\(--primary\)\]">\.<\/span>\s*<\/span>/, 
        newLogoPT
    );

    // In English versions, it's the exact same markup if it had the placeholder
    
    // Footer Background 
    content = content.replace(/<footer class="bg-emerald-900 border-t border-emerald-800/g, '<footer class="bg-[#1E2C3D] border-t border-[#32445C]');
    
    // Footer Logo Replacement
    content = content.replace(/<div class="text-2xl font-extrabold text-emerald-50 mb-8 tracking-tight">EVOLUTION HUB<\/div>/g, '<a href="#" class="inline-block text-2xl font-extrabold text-[#E8ECF2] tracking-tight hover:opacity-80 transition-opacity mb-8">\\n    EVOLUTION<span class="font-light opacity-60">HUB</span>\\n</a>');
    
    // Note: Since we may have already updated bg-emerald-900 globally, it might be <footer class="bg-[#1E2C3D] ... so I'll also do:
    content = content.replace(/<footer class="bg-\[#1E2C3D\] border-t border-emerald-800/g, '<footer class="bg-[#1E2C3D] border-t border-[#32445C]');


    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
});
