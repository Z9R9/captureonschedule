import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destFileName = path.join(__dirname, `./raw/*.png`);
const destPath = path.join(__dirname, `./images`);

(async () => {
    await imagemin([destFileName], {
        destination: destPath,
        plugins: [
            imageminPngquant({
                quality: [0.2, 0.3]
            })
        ]
    });

    console.log('Optimized png images');
})();

