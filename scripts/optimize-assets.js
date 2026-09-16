import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const parallaxDir = path.join(rootDir, 'public', 'parallax');

if (!fs.existsSync(parallaxDir)) {
  fs.mkdirSync(parallaxDir, { recursive: true });
}

const layers = [
  {
    id: 'layer_01_bg',
    url: 'https://cdn.21st.dev/assets/mirror/bf/bfb8ca258f591d2b7388d05d79ac2332b695867281627c1bc8c7165ca6429a6d.png',
    maxWidth: 2560,
    quality: 84
  },
  {
    id: 'layer_02_fog7',
    url: 'https://cdn.21st.dev/assets/mirror/c8/c878e14d1f8e481f6f70b31fb01de352338db5353f5b8852a241062bb251b558.png',
    maxWidth: 1920,
    quality: 82
  },
  {
    id: 'layer_03_mountain10',
    url: 'https://cdn.21st.dev/assets/mirror/e9/e94a2247aa54feee12cd1580a7c3abf97d6f55bbe7e50006d8dda6e4dffbe921.png',
    maxWidth: 1400,
    quality: 85
  },
  {
    id: 'layer_04_fog6',
    url: 'https://cdn.21st.dev/assets/mirror/99/9955626de3f10d97d27b7b89f7be180c02e1700f288db28e0c6824142871523f.png',
    maxWidth: 2048,
    quality: 82
  },
  {
    id: 'layer_05_mountain9',
    url: 'https://cdn.21st.dev/assets/mirror/dd/dd999609be149c46fcb65fce4d267cad8d5651b0c31901b399054da5146cb46e.png',
    maxWidth: 900,
    quality: 85
  },
  {
    id: 'layer_06_fog5',
    url: 'https://cdn.21st.dev/assets/mirror/d5/d579e64ddeb3a32d04dff5391980b827eb4d6d4aafa2cc3231e2cbe02d66a7c7.png',
    maxWidth: 800,
    quality: 82
  },
  {
    id: 'layer_07_mountain7',
    url: 'https://cdn.21st.dev/assets/mirror/b7/b74be54427fd5b9568571ba97684bc8a4334d366a3f3b32c353d31fd1501c09b.png',
    maxWidth: 900,
    quality: 85
  },
  {
    id: 'layer_08_mountain6',
    url: 'https://cdn.21st.dev/assets/mirror/ed/edf306a4225b6188283aa94ecec1553b2e0855038a3acaed402001f38c64af1d.png',
    maxWidth: 600,
    quality: 85
  },
  {
    id: 'layer_09_fog4',
    url: 'https://cdn.21st.dev/assets/mirror/8d/8d12582b7eac71f981eca3a8bb19157fb57fc4b05c14f9ef80fd029e5fecfab5.png',
    maxWidth: 700,
    quality: 82
  },
  {
    id: 'layer_10_mountain5',
    url: 'https://cdn.21st.dev/assets/mirror/9c/9c1a1b7f4b165011788c27d440d920e407d70f148cbc9a01eacfecb49126efcb.png',
    maxWidth: 900,
    quality: 85
  },
  {
    id: 'layer_11_fog3',
    url: 'https://cdn.21st.dev/assets/mirror/0e/0e7888cc6d1732222b5c1f38b925cf1ecdb7fec02fd1193dd1cfef280a453c5a.png',
    maxWidth: 1800,
    quality: 82
  },
  {
    id: 'layer_12_mountain4',
    url: 'https://cdn.21st.dev/assets/mirror/fa/fa0946f924ad025b207616cfe20ce022bcccd22ac9db4038a584ace23b7d9721.png',
    maxWidth: 1300,
    quality: 85
  },
  {
    id: 'layer_13_mountain3',
    url: 'https://cdn.21st.dev/assets/mirror/90/90863919566208c1eb7a78136d1dd493dd402f4d5a5efe2fc890a288a6b07449.png',
    maxWidth: 800,
    quality: 85
  },
  {
    id: 'layer_14_fog2',
    url: 'https://cdn.21st.dev/assets/mirror/b2/b2d0ba5c7f17d038a04475b8f36563aea22cfee00983db3b5477f1ac4c9a5097.png',
    maxWidth: 1300,
    quality: 82
  },
  {
    id: 'layer_15_mountain2',
    url: 'https://cdn.21st.dev/assets/mirror/c4/c4ae700b3a0070eae9f3c005a17572ae68fcb8373d322f279d28c5bf19cd501d.png',
    maxWidth: 1000,
    quality: 85
  },
  {
    id: 'layer_16_mountain1',
    url: 'https://cdn.21st.dev/assets/mirror/41/414097ad4507410ac1dc884afcc92bb3f4f45763fd17b2986bf82dd43c31da97.png',
    maxWidth: 1300,
    quality: 85
  },
  {
    id: 'layer_17_fog1',
    url: 'https://cdn.21st.dev/assets/mirror/aa/aa8ace86d9779fcccce3a1a28b8ac0cb86336b5980706659f2c8889c3daaf5a1.png',
    maxWidth: 1920,
    quality: 82
  }
];

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function processLayers() {
  console.log('Downloading and optimizing 17 parallax layers...');
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (let i = 0; i < layers.length; i++) {
    const item = layers[i];
    const outputPath = path.join(parallaxDir, `${item.id}.webp`);
    console.log(`[${i + 1}/17] Processing ${item.id}...`);

    try {
      const buffer = await downloadBuffer(item.url);
      totalOriginal += buffer.length;

      let pipeline = sharp(buffer);
      const metadata = await pipeline.metadata();

      if (metadata.width && metadata.width > item.maxWidth) {
        pipeline = pipeline.resize({ width: item.maxWidth, withoutEnlargement: true });
      }

      const webpBuffer = await pipeline
        .webp({
          quality: item.quality,
          effort: 6,
          alphaQuality: 90
        })
        .toBuffer();

      fs.writeFileSync(outputPath, webpBuffer);
      totalOptimized += webpBuffer.length;

      console.log(`  -> ${(buffer.length / (1024 * 1024)).toFixed(2)} MB  ==>  ${(webpBuffer.length / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`Error processing ${item.id}:`, err);
    }
  }

  console.log('\n--- PARALLAX SUMMARY ---');
  console.log(`Original total: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Saved: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);

  // Also optimize public/favicon.png
  const faviconPath = path.join(rootDir, 'public', 'favicon.png');
  if (fs.existsSync(faviconPath)) {
    console.log('\nOptimizing favicon.png...');
    const favBuffer = fs.readFileSync(faviconPath);
    const optimizedFavicon = await sharp(favBuffer)
      .resize(48, 48)
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(faviconPath, optimizedFavicon);
    console.log(`Favicon: ${(favBuffer.length / 1024).toFixed(1)} KB ==> ${(optimizedFavicon.length / 1024).toFixed(1)} KB`);
  }
}

processLayers().catch(console.error);
