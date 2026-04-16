/**
 * Submit URLs to IndexNow (Bing, Yandex, DuckDuckGo, Seznam).
 *
 * IndexNow is an open protocol that lets search engines know
 * instantly when your content changes. Free, no account needed.
 *
 * Steps:
 *  1. Generate a random key
 *  2. Host it at /{key}.txt on your site
 *  3. POST URLs to IndexNow API
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const SITE = 'attorneyaitools.org';
const KEY_FILE = path.join(__dirname, '..', 'public', 'indexnow-key.txt');
const VAULT_PATH = path.join(__dirname, '..', 'vault');

// Generate or load key
function getKey() {
  if (fs.existsSync(KEY_FILE)) {
    const key = fs.readFileSync(KEY_FILE, 'utf8').trim();
    if (key) return key;
  }
  const key = crypto.randomBytes(16).toString('hex');
  fs.mkdirSync(path.dirname(KEY_FILE), { recursive: true });
  fs.writeFileSync(KEY_FILE, key);
  console.log(`🔑 Generated new IndexNow key: ${key}`);
  console.log(`   Saved to: ${KEY_FILE}`);
  console.log(`   Will be served at: https://${SITE}/indexnow-key.txt`);
  return key;
}

// Collect all indexable URLs
function buildUrlList() {
  const urls = [
    `https://${SITE}/`,
    `https://${SITE}/ai-tools`,
    `https://${SITE}/attorneys`,
    `https://${SITE}/blog`,
    `https://${SITE}/compare`,
    `https://${SITE}/faq`,
    `https://${SITE}/about`,
    `https://${SITE}/methodology`,
  ];

  // AI Tools
  const toolsDir = path.join(VAULT_PATH, 'AI Tools');
  if (fs.existsSync(toolsDir)) {
    for (const f of fs.readdirSync(toolsDir)) {
      if (!f.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(toolsDir, f), 'utf8');
      const slug = content.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      if (slug) urls.push(`https://${SITE}/ai-tools/${slug}`);
    }
  }

  // Blog posts
  const blogDir = path.join(VAULT_PATH, 'Blog');
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir)) {
      if (!f.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
      const slug = content.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      if (slug) urls.push(`https://${SITE}/blog/${slug}`);
    }
  }

  // Practice areas
  const paDir = path.join(VAULT_PATH, 'Practice Areas');
  if (fs.existsSync(paDir)) {
    for (const f of fs.readdirSync(paDir)) {
      if (!f.endsWith('.md')) continue;
      const slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      urls.push(`https://${SITE}/practice-areas/${slug}`);
    }
  }

  // States
  const statesDir = path.join(VAULT_PATH, 'States');
  if (fs.existsSync(statesDir)) {
    for (const f of fs.readdirSync(statesDir)) {
      if (!f.endsWith('.md')) continue;
      const slug = f.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      urls.push(`https://${SITE}/attorneys/${slug}`);
    }
  }

  // Programmatic SEO pages (all 550)
  const progDir = path.join(VAULT_PATH, 'Programmatic SEO');
  if (fs.existsSync(progDir)) {
    for (const f of fs.readdirSync(progDir)) {
      if (!f.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(progDir, f), 'utf8');
      const slug = content.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      if (slug) urls.push(`https://${SITE}/${slug}`);
    }
  }

  // Comparison guides
  const compareDir = path.join(VAULT_PATH, 'Compare');
  if (fs.existsSync(compareDir)) {
    for (const f of fs.readdirSync(compareDir)) {
      if (!f.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(compareDir, f), 'utf8');
      const slug = content.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      if (slug) urls.push(`https://${SITE}/compare/${slug}`);
    }
  }

  // FAQs
  const faqDir = path.join(VAULT_PATH, 'FAQ');
  if (fs.existsSync(faqDir)) {
    for (const f of fs.readdirSync(faqDir)) {
      if (!f.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(faqDir, f), 'utf8');
      const slug = content.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      if (slug) urls.push(`https://${SITE}/faq/${slug}`);
    }
  }

  // City pages — from enriched dataset (~19K)
  const citiesPath = path.join(VAULT_PATH, 'Datasets', 'cities-enriched.json');
  if (fs.existsSync(citiesPath)) {
    const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
    for (const c of cities) {
      if (c.state_slug && c.slug) {
        urls.push(`https://${SITE}/attorneys/${c.state_slug}/${c.slug}`);
      }
    }
  }

  return urls;
}

// Submit URLs in batches of 10,000 (IndexNow limit)
function submitBatch(key, urls) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: SITE,
      key,
      keyLocation: `https://${SITE}/indexnow-key.txt`,
      urlList: urls,
    });

    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const key = getKey();
  console.log(`\n📋 Collecting URLs from vault...`);
  const urls = buildUrlList();
  console.log(`   Found ${urls.length} URLs to submit`);

  if (urls.length === 0) {
    console.error('No URLs found.');
    return;
  }

  // IndexNow accepts up to 10,000 URLs per request
  const BATCH = 9000;
  let submitted = 0;

  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    console.log(`\n📤 Submitting batch ${Math.floor(i / BATCH) + 1}: ${batch.length} URLs...`);

    try {
      const result = await submitBatch(key, batch);
      if (result.status === 200 || result.status === 202) {
        console.log(`   ✅ Accepted (HTTP ${result.status})`);
        submitted += batch.length;
      } else {
        console.log(`   ⚠️  HTTP ${result.status}: ${result.body.substring(0, 200)}`);
      }
    } catch (e) {
      console.log(`   ❌ Error: ${e.message}`);
    }

    if (i + BATCH < urls.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Submitted ${submitted} URLs to IndexNow`);
  console.log(`   → Bing, Yandex, DuckDuckGo, Seznam will crawl these`);
  console.log(`\nNext: make sure ${KEY_FILE} is deployed so search engines can verify the key.`);
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
