const fs = require('fs');
const path = require('path');

const VAULT_PATH = path.join(__dirname, '..', 'vault', 'Attorneys');

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const cities = [
  { name: "New York City", state: "New York", stateSlug: "new-york" },
  { name: "Los Angeles", state: "California", stateSlug: "california" },
  { name: "Chicago", state: "Illinois", stateSlug: "illinois" },
  { name: "Houston", state: "Texas", stateSlug: "texas" },
  { name: "Phoenix", state: "Arizona", stateSlug: "arizona" },
  { name: "Philadelphia", state: "Pennsylvania", stateSlug: "pennsylvania" },
  { name: "San Antonio", state: "Texas", stateSlug: "texas" },
  { name: "San Diego", state: "California", stateSlug: "california" },
  { name: "Dallas", state: "Texas", stateSlug: "texas" },
  { name: "San Jose", state: "California", stateSlug: "california" },
  { name: "Austin", state: "Texas", stateSlug: "texas" },
  { name: "Jacksonville", state: "Florida", stateSlug: "florida" },
  { name: "San Francisco", state: "California", stateSlug: "california" },
  { name: "Columbus", state: "Ohio", stateSlug: "ohio" },
  { name: "Indianapolis", state: "Indiana", stateSlug: "indiana" },
  { name: "Charlotte", state: "North Carolina", stateSlug: "north-carolina" },
  { name: "Seattle", state: "Washington", stateSlug: "washington" },
  { name: "Denver", state: "Colorado", stateSlug: "colorado" },
  { name: "Nashville", state: "Tennessee", stateSlug: "tennessee" },
  { name: "Boston", state: "Massachusetts", stateSlug: "massachusetts" },
  { name: "Detroit", state: "Michigan", stateSlug: "michigan" },
  { name: "Portland", state: "Oregon", stateSlug: "oregon" },
  { name: "Las Vegas", state: "Nevada", stateSlug: "nevada" },
  { name: "Miami", state: "Florida", stateSlug: "florida" },
  { name: "Atlanta", state: "Georgia", stateSlug: "georgia" },
  { name: "Minneapolis", state: "Minnesota", stateSlug: "minnesota" },
  { name: "Tampa", state: "Florida", stateSlug: "florida" },
  { name: "Orlando", state: "Florida", stateSlug: "florida" },
  { name: "St. Louis", state: "Missouri", stateSlug: "missouri" },
  { name: "Pittsburgh", state: "Pennsylvania", stateSlug: "pennsylvania" },
  { name: "Sacramento", state: "California", stateSlug: "california" },
  { name: "Salt Lake City", state: "Utah", stateSlug: "utah" },
  { name: "Kansas City", state: "Missouri", stateSlug: "missouri" },
  { name: "Cleveland", state: "Ohio", stateSlug: "ohio" },
  { name: "Raleigh", state: "North Carolina", stateSlug: "north-carolina" },
  { name: "Richmond", state: "Virginia", stateSlug: "virginia" },
  { name: "New Orleans", state: "Louisiana", stateSlug: "louisiana" },
  { name: "Birmingham", state: "Alabama", stateSlug: "alabama" },
  { name: "Milwaukee", state: "Wisconsin", stateSlug: "wisconsin" },
  { name: "Oklahoma City", state: "Oklahoma", stateSlug: "oklahoma" },
  { name: "Louisville", state: "Kentucky", stateSlug: "kentucky" },
  { name: "Baltimore", state: "Maryland", stateSlug: "maryland" },
  { name: "Albuquerque", state: "New Mexico", stateSlug: "new-mexico" },
  { name: "Tucson", state: "Arizona", stateSlug: "arizona" },
  { name: "Mesa", state: "Arizona", stateSlug: "arizona" },
  { name: "Omaha", state: "Nebraska", stateSlug: "nebraska" },
  { name: "Honolulu", state: "Hawaii", stateSlug: "hawaii" },
  { name: "Boise", state: "Idaho", stateSlug: "idaho" },
  { name: "Des Moines", state: "Iowa", stateSlug: "iowa" },
  { name: "Little Rock", state: "Arkansas", stateSlug: "arkansas" },
];

const practiceAreas = [
  ["Personal Injury", "Car Accident"],
  ["Criminal Defense", "DUI Defense"],
  ["Divorce Law", "Family Law"],
  ["Immigration Law", "Asylum Law"],
  ["Business Law", "Corporate Law"],
  ["Real Estate Law", "Landlord Tenant"],
  ["Estate Planning", "Probate"],
  ["Employment Law", "Workers Compensation"],
  ["Bankruptcy", "Chapter 7 Bankruptcy"],
  ["Tax Law", "Business Law"],
  ["Medical Malpractice", "Personal Injury"],
  ["Intellectual Property", "Patent Law"],
  ["Environmental Law", "Regulatory Compliance"],
  ["Civil Rights", "Employment Law"],
  ["Social Security Disability", "Disability Law"],
  ["Entertainment Law", "Intellectual Property"],
  ["Elder Law", "Estate Planning"],
  ["Consumer Protection", "Class Action"],
  ["Construction Law", "Real Estate Law"],
  ["Maritime Law", "Personal Injury"],
];

const firstNames = [
  "James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda","David","Elizabeth",
  "William","Barbara","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Christopher","Karen",
  "Charles","Lisa","Daniel","Nancy","Matthew","Betty","Anthony","Margaret","Mark","Sandra",
  "Donald","Ashley","Steven","Dorothy","Andrew","Kimberly","Paul","Emily","Joshua","Donna",
  "Kenneth","Michelle","Kevin","Carol","Brian","Amanda","George","Melissa","Timothy","Deborah",
  "Ronald","Stephanie","Jason","Rebecca","Jeffrey","Sharon","Ryan","Laura","Jacob","Cynthia",
  "Gary","Kathleen","Nicholas","Amy","Eric","Angela","Jonathan","Shirley","Stephen","Brenda",
  "Larry","Emma","Justin","Anna","Scott","Pamela","Brandon","Nicole","Benjamin","Samantha",
  "Samuel","Katherine","Raymond","Christine","Gregory","Debra","Frank","Rachel","Alexander","Carolyn",
  "Patrick","Janet","Jack","Catherine","Dennis","Maria","Jerry","Heather","Tyler","Diane",
  "Aaron","Ruth","Jose","Julie","Adam","Olivia","Nathan","Joyce","Henry","Virginia",
  "Zachary","Victoria","Douglas","Kelly","Peter","Lauren","Kyle","Christina","Noah","Joan",
  "Ethan","Evelyn","Jeremy","Judith","Walter","Megan","Christian","Andrea","Keith","Cheryl",
  "Roger","Hannah","Terry","Jacqueline","Austin","Martha","Sean","Gloria","Gerald","Teresa",
  "Carl","Ann","Dylan","Sara","Harold","Madison","Jordan","Frances","Jesse","Kathryn",
  "Bryan","Janice","Lawrence","Jean","Arthur","Abigail","Gabriel","Alice","Bruce","Judy",
  "Albert","Sophia","Willie","Grace","Alan","Denise","Wayne","Amber","Eugene","Doris",
  "Ralph","Marilyn","Roy","Danielle","Louis","Beverly","Russell","Isabella","Philip","Theresa",
  "Vincent","Diana","Bobby","Natalie","Johnny","Brittany","Bradley","Charlotte","Clarence","Marie"
];

const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  "Gomez","Phillips","Evans","Turner","Diaz","Parker","Cruz","Edwards","Collins","Reyes",
  "Stewart","Morris","Morales","Murphy","Cook","Rogers","Gutierrez","Ortiz","Morgan","Cooper",
  "Peterson","Bailey","Reed","Kelly","Howard","Ramos","Kim","Cox","Ward","Richardson",
  "Watson","Brooks","Chavez","Wood","James","Bennett","Gray","Mendoza","Ruiz","Hughes",
  "Price","Alvarez","Castillo","Sanders","Patel","Myers","Long","Ross","Foster","Jimenez"
];

const firmSuffixes = [
  "Law Firm", "& Associates", "Legal Group", "Law Office", "Law Group",
  "Legal Services", "& Partners", "Law Practice", "Law Offices", "Legal"
];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const usedNames = new Set();
// Check existing files
if (fs.existsSync(VAULT_PATH)) {
  fs.readdirSync(VAULT_PATH).forEach(f => {
    usedNames.add(f.replace('.md', ''));
  });
}

let created = 0;
const target = 460;

for (let i = 0; i < target * 2 && created < target; i++) {
  const first = rand(firstNames);
  const last = rand(lastNames);
  const name = first + " " + last;

  if (usedNames.has(name)) continue;
  usedNames.add(name);

  const city = cities[created % cities.length];
  const paIndex = created % practiceAreas.length;
  const pa = practiceAreas[paIndex];
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  const years = randInt(3, 35);
  const featured = created % 25 === 0;
  const slug = slugify(name);
  const firmName = last + " " + rand(firmSuffixes);
  const phone = "(555) " + String(randInt(100, 999)) + "-" + String(randInt(1000, 9999));

  const md = '---\ntype: attorney\nname: "' + name + '"\nslug: "' + slug + '"\nlaw_firm: "' + firmName + '"\ncity: "' + city.name + '"\ncity_slug: "' + slugify(city.name) + '"\nstate: "' + city.state + '"\nstate_slug: "' + city.stateSlug + '"\npractice_areas:\n  - "' + pa[0] + '"\n  - "' + pa[1] + '"\nphone: "' + phone + '"\nemail: "' + slug + '@example.com"\nwebsite: "https://www.' + slug + 'law.com"\nexperience_years: ' + years + '\nfeatured: ' + featured + '\nrating: ' + rating + '\ndescription: "' + name + ' is an experienced ' + pa[0] + ' attorney in ' + city.name + ', ' + city.state + ' with ' + years + ' years of practice."\n---\n\n# ' + name + '\n\n' + name + ' is a ' + pa[0].toLowerCase() + ' attorney based in ' + city.name + ', ' + city.state + '. With ' + years + ' years of experience at ' + firmName + ', ' + (first === first ? 'they specialize' : 'they specialize') + ' in ' + pa[0].toLowerCase() + ' and ' + pa[1].toLowerCase() + ' matters.\n\n## Practice Areas\n- [[' + pa[0] + ']]\n- [[' + pa[1] + ']]\n\n## Education\n- J.D., ' + rand(["Harvard Law School", "Yale Law School", "Stanford Law School", "Columbia Law School", "University of Chicago Law School", "NYU School of Law", "Georgetown Law", "University of Michigan Law School", "Duke University School of Law", "Northwestern Pritzker School of Law", "University of Virginia School of Law", "Cornell Law School", "UCLA School of Law", "University of Texas School of Law", "Vanderbilt University Law School", "Washington University School of Law", "Emory University School of Law", "University of Minnesota Law School", "Boston University School of Law", "Fordham University School of Law"]) + '\n\n## Bar Admissions\n- ' + city.state + ' State Bar\n';

  const filePath = path.join(VAULT_PATH, name + '.md');
  fs.writeFileSync(filePath, md);
  created++;
}

console.log('Created ' + created + ' new attorney files.');
console.log('Total attorneys: ' + fs.readdirSync(VAULT_PATH).filter(function(f) { return f.endsWith('.md'); }).length);
