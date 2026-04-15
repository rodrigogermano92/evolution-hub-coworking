const fs = require('fs');

function fix(file, from, to) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(from, to);
    fs.writeFileSync(file, content);
}

fix('index.html', /A partir de<\/p><p class="text-3xl font-black text-\[var\(--primary\)\]">R\$ 50<span class="text-base font-normal">\/dia<\/span><\/p>/g, 'Planos<\/p><p class="text-3xl font-black text-[var(--primary)]">Sob consulta<\/p>');

fix('index-en.html', /Starting at<\/p><p class="text-3xl font-black text-\[var\(--primary\)\]">R\$ 50<span class="text-base font-normal">\/day<\/span><\/p>/g, 'Plans<\/p><p class="text-3xl font-black text-[var(--primary)]">On demand<\/p>');

console.log('done');
