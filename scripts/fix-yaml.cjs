const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(__dirname, '..', 'vault', 'Attorneys');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let failed = 0;

for (const f of files) {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');

  // Validate YAML first
  try {
    matter(content);
    continue; // already valid
  } catch (e) {
    // needs fixing
  }

  // Strip null bytes and normalize line endings
  let cleaned = content.replace(/\x00/g, '');

  // Split frontmatter
  const m = cleaned.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) {
    failed++;
    continue;
  }

  let fm = m[1];
  const body = m[2];

  // In YAML frontmatter, remove all backslashes to prevent escape issues.
  // This is aggressive but we're dealing with description text only.
  fm = fm.replace(/\\/g, '');

  // Rebuild
  const rebuilt = '---\n' + fm + '\n---\n' + body;

  try {
    matter(rebuilt);
    fs.writeFileSync(fp, rebuilt);
    fixed++;
  } catch (e) {
    // Last resort: replace description line entirely
    const fm2 = fm.replace(/^description:.*$/m, 'description: "Attorney profile."');
    const rebuilt2 = '---\n' + fm2 + '\n---\n' + body;
    try {
      matter(rebuilt2);
      fs.writeFileSync(fp, rebuilt2);
      fixed++;
    } catch (e2) {
      console.log('FAILED:', f, '->', e2.message.substring(0, 60));
      failed++;
    }
  }
}

console.log(`Fixed: ${fixed}, Failed: ${failed}`);
