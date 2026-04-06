const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const buildDir = path.join(__dirname, 'Build');
const files = ['WebGL.data.br', 'WebGL.framework.js.br', 'WebGL.wasm.br'];

for (const file of files) {
    const inputPath = path.join(buildDir, file);
    const outputPath = path.join(buildDir, file.replace('.br', ''));
    
    if (fs.existsSync(inputPath)) {
        const compressed = fs.readFileSync(inputPath);
        const uncompressed = zlib.brotliDecompressSync(compressed);
        fs.writeFileSync(outputPath, uncompressed);
        fs.unlinkSync(inputPath); // Sil orijinal compressed dosyayı
        console.log(`Decompressed ${file} to ${path.basename(outputPath)}`);
    } else {
        console.log(`File not found: ${inputPath}`);
    }
}
