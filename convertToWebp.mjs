import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destFileName = path.join(__dirname, `./images/*.png`);
const destPath = path.join(__dirname, `./webp`);

(async () => {
    await imagemin([destFileName], {
        destination: destPath,
        plugins: [
            imageminWebp({ quality: 40 })
        ]
    });

    console.log('Converted images to webp format');
})();