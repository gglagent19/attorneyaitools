/**
 * Shared content helpers for claim programmatic pages. Maximizes per-page
 * uniqueness by (a) weaving the location + claim type into every section and
 * (b) deterministically selecting phrasing variants from a hash, so no two
 * pages share byte-identical boilerplate.
 */

function seedFrom(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h;
}

function pick(pool, seed, salt) {
  return pool[(seed + (salt || 0) * 2654435761) % pool.length];
}

const NAIC = "https://content.naic.org/state-insurance-departments";

// Dispute steps — phrasing varies by seed and interpolates location + claim.
function disputeSteps(loc, state, claim, seed) {
  const openers = [
    `How to dispute a ${claim} in ${loc}`,
    `Fighting a ${claim} in ${loc}, step by step`,
    `Your ${loc} ${claim} dispute checklist`,
    `Turning a ${loc} denial around: the steps that work`,
  ];
  const step1 = [
    `**Read the denial or estimate closely.** Pin down the exact policy provision your insurer leaned on for this ${claim}.`,
    `**Start with the paperwork.** Identify the precise clause or scope line behind the ${claim} decision in ${loc}.`,
    `**Decode the denial.** Find the specific exclusion or scope item the adjuster cited on your ${loc} claim.`,
  ];
  const step3 = [
    `**Get an independent estimate** from a licensed ${state} contractor — the gap between their scope and the adjuster's is your leverage.`,
    `**Commission your own ${state} contractor estimate.** Where it exceeds the insurer's figure is exactly what you negotiate back.`,
    `**Bring in a licensed ${state} pro.** Their full scope routinely beats the adjuster's, and that difference is real money on a ${claim}.`,
  ];
  const step5 = [
    `**Escalate** to the ${state} Department of Insurance ([NAIC directory](${NAIC})); many policies also include an appraisal clause for valuation fights.`,
    `**Take it higher** — file with the ${state} Department of Insurance ([find it here](${NAIC})), or invoke your policy's appraisal provision for amount disputes.`,
    `**Use the formal channels:** a complaint to the ${state} Department of Insurance ([NAIC](${NAIC})) and, for valuation-only disputes, the appraisal clause.`,
  ];
  return `## ${pick(openers, seed, 1)}

1. ${pick(step1, seed, 2)}
2. **Document everything** in ${loc} — dated photos, video, receipts, and a written timeline of the loss.
3. ${pick(step3, seed, 3)}
4. **Request a re-inspection in writing** and submit an itemized rebuttal that ties each disputed item to your policy and your evidence.
5. ${pick(step5, seed, 4)}`;
}

function deadlineNote(loc, state, seed) {
  const notes = [
    `> **Deadlines are unforgiving in ${loc}.** Most policies set a contractual time limit to file suit (often one to two years) and require prompt notice of loss. Confirm the specifics for your policy with the ${state} Department of Insurance — don't rely on a general figure.`,
    `> **Watch the clock.** Your ${loc} policy almost certainly has a "suit limitation" clause and a prompt-notice requirement. Verify both against your own contract and the ${state} Department of Insurance before they cost you the claim.`,
    `> **Time limits matter here.** ${state} policies typically cap how long you have to act. Check your policy's deadline clause and the ${state} Department of Insurance so a technicality never closes your file.`,
  ];
  return pick(notes, seed, 7);
}

function faqBlock(loc, state, claim, seed) {
  const qaPool = [
    {
      q: `Can I dispute a ${claim} in ${loc}?`,
      a: `Yes. A denial or low offer on a ${claim} in ${loc} is the start of a negotiation, not the end. You can request a re-inspection, submit an itemized rebuttal, invoke your policy's appraisal clause, and escalate to the ${state} Department of Insurance.`,
    },
    {
      q: `How long do I have to appeal in ${state}?`,
      a: `${state} policies usually set a contractual deadline to file suit — commonly one to two years from the loss — plus a prompt-notice requirement. Check your policy's "suit limitation" clause and confirm with the ${state} Department of Insurance.`,
    },
    {
      q: `Do I need a lawyer to fight a ${claim} in ${loc}?`,
      a: `Not always. Many ${loc} valuation disputes are resolved with a documented rebuttal or the appraisal process. A lawyer makes sense for outright coverage denials or bad-faith conduct. You can also run a free analysis first to see how large your gap is.`,
    },
    {
      q: `What if the adjuster's estimate is too low in ${loc}?`,
      a: `Get an independent ${state} contractor estimate for the full scope and compare it line-by-line. The difference — missed square footage, code upgrades, matching, recoverable depreciation — is what you document and dispute.`,
    },
    {
      q: `Is the insurer's first offer final?`,
      a: `No. First offers on a ${claim} are frequently low and built on an incomplete scope. In ${loc}, a specific, evidenced counter often recovers a meaningful amount above that opening number.`,
    },
  ];
  const a = pick(qaPool, seed, 11);
  const b = pick(qaPool, seed, 23);
  const c = pick(qaPool, seed, 37);
  const chosen = [a, b, c].filter((x, i, arr) => arr.findIndex((y) => y.q === x.q) === i);
  return `## Frequently Asked Questions\n\n` +
    chosen.map((qa) => `**${qa.q}**\n\n${qa.a}`).join("\n\n");
}

module.exports = { seedFrom, pick, disputeSteps, deadlineNote, faqBlock, NAIC };
