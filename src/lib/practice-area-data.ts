// Editorial data for legal practice areas. Hand-written copy for the 30 most
// common; the rest fall back to a templated description. Keeps every practice
// area page substantively different.

export interface PracticeAreaData {
  shortDef: string;
  whatTheyHandle: string[];
  whenToHire: string;
  typicalFees: string;
  faqs: { q: string; a: string }[];
}

export const PRACTICE_AREA_DATA: Record<string, PracticeAreaData> = {
  "personal-injury": {
    shortDef:
      "Personal injury lawyers represent people who have been physically or psychologically harmed by another party's negligence — most often in car accidents, slip-and-falls, medical malpractice, and workplace incidents.",
    whatTheyHandle: [
      "Auto, motorcycle, and trucking accidents",
      "Slip-and-fall and premises liability",
      "Medical malpractice and birth injuries",
      "Wrongful death claims",
      "Product liability and defective consumer goods",
      "Workplace and construction injuries",
    ],
    whenToHire:
      "Hire a personal injury attorney as soon as possible after the incident — most states impose a 1–6 year statute of limitations, and physical evidence and witness memories degrade quickly.",
    typicalFees:
      "Personal injury cases are almost always handled on contingency — typically 33% of recovery if settled before suit, 40% after suit is filed. You pay nothing if you don't win.",
    faqs: [
      {
        q: "How much is my personal injury case worth?",
        a: "Case value depends on medical bills, lost wages, future treatment costs, and the severity and permanence of the injury. Most lawyers offer free case evaluations to give you a realistic range.",
      },
      {
        q: "Do I have to go to court?",
        a: "Most personal injury cases (80–95%) settle out of court. Litigation is only necessary when the insurance carrier refuses a fair offer or liability is disputed.",
      },
    ],
  },
  "criminal-defense": {
    shortDef:
      "Criminal defense lawyers represent people accused of breaking the law, from minor misdemeanors and DUI to serious felonies. Their job is to protect your constitutional rights and the best possible outcome — dismissal, reduced charges, acquittal, or favorable sentencing.",
    whatTheyHandle: [
      "DUI / DWI defense",
      "Drug possession and trafficking",
      "Assault, battery, and domestic violence",
      "Theft, robbery, and white-collar crimes",
      "Sex crimes and weapons charges",
      "Federal criminal cases",
    ],
    whenToHire:
      "Immediately — ideally before any police interview. Statements made in custody can rarely be undone. Many criminal defense lawyers offer free initial consultations.",
    typicalFees:
      "Misdemeanors: $1,500–$5,000 flat fee. Felonies: $5,000–$25,000+. Federal cases: $25,000–$100,000+. Public defenders handle cases when the defendant cannot afford private counsel.",
    faqs: [
      {
        q: "Should I talk to the police without a lawyer?",
        a: "No. Politely invoke your Fifth Amendment right to remain silent and your Sixth Amendment right to an attorney. Anything you say can — and routinely is — used against you.",
      },
      {
        q: "Can I get my charges expunged later?",
        a: "Many states allow expungement or sealing of records for certain offenses after a waiting period. A criminal defense attorney can advise on eligibility in your jurisdiction.",
      },
    ],
  },
  "family-law": {
    shortDef:
      "Family law attorneys handle the legal matters that arise from marriage, divorce, parenting, and domestic relationships — including divorce, custody, adoption, prenuptial agreements, and protective orders.",
    whatTheyHandle: [
      "Contested and uncontested divorce",
      "Child custody and visitation",
      "Child and spousal support",
      "Property division",
      "Prenuptial and postnuptial agreements",
      "Adoption and guardianship",
      "Protective orders",
    ],
    whenToHire:
      "Hire as soon as you're considering separation. Decisions made before consulting counsel — moving out, transferring assets, agreeing to temporary custody — can have lasting legal consequences.",
    typicalFees:
      "Hourly rates of $200–$500. Uncontested divorces with full agreement can cost $1,500–$3,500 flat. Contested cases routinely run $10,000–$50,000+.",
    faqs: [
      {
        q: "How long does a divorce take?",
        a: "Uncontested divorces can finalize in 3–6 months. Contested divorces, especially with custody disputes, often take 12–18 months and sometimes longer.",
      },
      {
        q: "How is custody decided?",
        a: "Courts apply the 'best interests of the child' standard, weighing the child's relationship with each parent, stability, schooling, and any history of violence or substance abuse.",
      },
    ],
  },
  divorce: {
    shortDef:
      "Divorce lawyers handle the legal dissolution of a marriage, including property division, spousal support, child custody, and parenting plans. They represent one spouse and protect that client's financial and parental interests.",
    whatTheyHandle: [
      "Contested and uncontested divorce filings",
      "Property and debt division",
      "Spousal support / alimony",
      "Child custody and visitation schedules",
      "Child support calculations",
      "Modification of existing orders",
    ],
    whenToHire:
      "As soon as separation is on the table. Early legal advice often saves years and thousands of dollars in mistakes.",
    typicalFees:
      "Uncontested: $1,500–$3,500 flat. Contested: $10,000–$50,000+. Hourly rates run $200–$500.",
    faqs: [
      {
        q: "Do I need a lawyer for an uncontested divorce?",
        a: "Strictly no, but a 1–2 hour attorney review of your settlement before signing protects against costly mistakes that are hard to undo later.",
      },
      {
        q: "Is my spouse entitled to half of everything?",
        a: "It depends. Community-property states (CA, TX, AZ, etc.) presume 50/50 division of marital assets. Equitable-distribution states divide assets fairly, which is not always equally.",
      },
    ],
  },
  bankruptcy: {
    shortDef:
      "Bankruptcy attorneys help individuals and businesses obtain legal relief from unmanageable debt, primarily through Chapter 7 (liquidation) or Chapter 13 (repayment plan) filings under federal bankruptcy law.",
    whatTheyHandle: [
      "Chapter 7 personal bankruptcy",
      "Chapter 13 reorganization",
      "Chapter 11 business reorganization",
      "Foreclosure defense",
      "Creditor harassment",
      "Debt negotiation",
    ],
    whenToHire:
      "When monthly debt payments exceed what you can sustain, when wages are about to be garnished, or when foreclosure is filed against your home.",
    typicalFees:
      "Chapter 7: $1,000–$3,500. Chapter 13: $3,000–$5,000 (often paid through the plan). Chapter 11: $20,000+. Free consultations are standard.",
    faqs: [
      {
        q: "Will I lose my house in bankruptcy?",
        a: "Often no. State and federal exemptions protect a portion of home equity. Chapter 13 can stop foreclosure and let you catch up on missed payments over 3–5 years.",
      },
      {
        q: "How long does bankruptcy stay on my credit?",
        a: "Chapter 7: 10 years. Chapter 13: 7 years. Many filers see credit scores recover within 18–24 months as old delinquent accounts age off.",
      },
    ],
  },
  "estate-planning": {
    shortDef:
      "Estate planning lawyers draft the legal documents that direct how your assets are managed and transferred during incapacity and after death — wills, trusts, powers of attorney, and healthcare directives.",
    whatTheyHandle: [
      "Wills and revocable living trusts",
      "Durable powers of attorney",
      "Healthcare directives and living wills",
      "Probate avoidance",
      "Special-needs trusts",
      "Estate-tax planning",
      "Business succession",
    ],
    whenToHire:
      "Anyone over 18 with assets, dependents, or strong opinions about end-of-life care should have basic estate documents. Major life events — marriage, divorce, children, real estate, business ownership — should trigger an update.",
    typicalFees:
      "Basic will package: $300–$1,500. Revocable trust packages: $1,500–$5,000. Complex high-net-worth plans: $5,000–$25,000+.",
    faqs: [
      {
        q: "Do I need a will or a trust?",
        a: "A will is sufficient for most simple estates. A revocable living trust avoids probate, keeps your affairs private, and is worth the extra cost for owners of real estate or assets above ~$200k.",
      },
      {
        q: "What happens if I die without a will?",
        a: "Your state's intestacy laws decide who inherits. Outcomes are often surprising — unmarried partners, stepchildren, and friends typically receive nothing.",
      },
    ],
  },
  "real-estate": {
    shortDef:
      "Real estate attorneys handle the legal aspects of buying, selling, leasing, and developing property — including title review, contract drafting, closing representation, and dispute resolution.",
    whatTheyHandle: [
      "Residential and commercial closings",
      "Title review and clearance",
      "Purchase and sale agreements",
      "Lease drafting and review",
      "Boundary and easement disputes",
      "Construction and development",
      "Quiet-title actions",
    ],
    whenToHire:
      "Some states require attorney representation at closing. In other states, hire one any time the transaction is complex, the title is unclear, or there's a dispute with a buyer, seller, neighbor, or contractor.",
    typicalFees:
      "Residential closing: $500–$1,500 flat. Commercial: $2,500–$15,000+. Hourly rates $200–$450.",
    faqs: [
      {
        q: "Do I need a lawyer to buy a house?",
        a: "Required in some states (NY, NJ, MA, GA, others). Optional but strongly recommended in others, especially for FSBO sales, complex titles, or new construction.",
      },
      {
        q: "What does title insurance actually cover?",
        a: "Title insurance protects against losses from defects in the title that existed before you purchased — undisclosed liens, forged deeds, missing heirs. It does not cover issues that arise after purchase.",
      },
    ],
  },
  immigration: {
    shortDef:
      "Immigration lawyers help individuals, families, and employers navigate U.S. immigration law — including visas, green cards, naturalization, asylum, and removal defense.",
    whatTheyHandle: [
      "Family-based green cards",
      "Employment-based visas (H-1B, L-1, O-1, EB-2/3/5)",
      "Naturalization and citizenship",
      "Asylum and refugee claims",
      "Removal / deportation defense",
      "DACA renewals",
      "Marriage-based immigration",
    ],
    whenToHire:
      "Before filing any USCIS paperwork — denied applications are difficult and expensive to fix. Definitely before any immigration-court appearance.",
    typicalFees:
      "Family green card: $2,500–$5,000 plus USCIS fees. Employment visas: $3,000–$10,000. Removal defense: $5,000–$20,000+. Asylum cases vary widely.",
    faqs: [
      {
        q: "How long does a green card take?",
        a: "Marriage-based cases for spouses of U.S. citizens take 12–18 months. Employment-based cases vary by category and country of birth — Indian and Chinese nationals face the longest backlogs.",
      },
      {
        q: "Can I represent myself in immigration court?",
        a: "Legally yes, but the consequences of losing — deportation and a re-entry bar — make self-representation extremely risky. Even one procedural mistake can be fatal.",
      },
    ],
  },
  "employment-law": {
    shortDef:
      "Employment lawyers represent workers and employers in disputes over wages, discrimination, harassment, wrongful termination, and contracts. Many specialize in either plaintiff (worker) or defense (employer) side.",
    whatTheyHandle: [
      "Wrongful termination",
      "Discrimination (race, sex, age, disability, religion)",
      "Sexual harassment",
      "Wage-and-hour and overtime claims",
      "Non-compete and severance agreements",
      "Whistleblower retaliation",
      "FMLA and ADA accommodations",
    ],
    whenToHire:
      "When you experience discrimination, harassment, or retaliation; before signing a severance or non-compete; or after termination if you suspect it was illegal. Many strict deadlines (180–300 days for EEOC charges) make speed critical.",
    typicalFees:
      "Most plaintiff cases run on contingency (33–40%). Hourly counsel: $250–$600. Defense work is hourly or flat-fee.",
    faqs: [
      {
        q: "Is my termination 'wrongful'?",
        a: "Most U.S. employment is at-will, so being fired for no reason is legal. It becomes wrongful only when it's based on a protected characteristic, retaliation for legally protected activity, or violates a written contract.",
      },
      {
        q: "How long do I have to file a discrimination claim?",
        a: "Typically 180 or 300 days from the last discriminatory act, depending on whether your state has its own civil-rights agency. Wait too long and the claim is barred.",
      },
    ],
  },
  "business-law": {
    shortDef:
      "Business law attorneys advise companies on the legal issues that arise from forming, operating, and growing a business — entity formation, contracts, governance, financing, and disputes.",
    whatTheyHandle: [
      "Entity formation (LLC, S-Corp, C-Corp)",
      "Operating and shareholder agreements",
      "Commercial contracts",
      "Mergers and acquisitions",
      "Employment agreements",
      "Intellectual property licensing",
      "Business disputes and litigation",
    ],
    whenToHire:
      "Before forming the entity. Cleaning up a poorly-formed company costs 10x what doing it right the first time would have.",
    typicalFees:
      "Entity formation: $500–$2,500. Hourly rates: $250–$650. Many business attorneys offer monthly retainers for ongoing counsel.",
    faqs: [
      {
        q: "LLC or S-Corp — which is better?",
        a: "LLCs are simpler and more flexible. S-Corp tax election can save self-employment tax once profits exceed roughly $40k–$60k. Talk to an attorney and a CPA together.",
      },
      {
        q: "Do I need a written contract for every transaction?",
        a: "Not legally for most matters under $500. Practically yes — verbal agreements are evidentiary nightmares when disputes arise.",
      },
    ],
  },
  "intellectual-property": {
    shortDef:
      "Intellectual property lawyers protect creators and businesses through patents, trademarks, copyrights, and trade secrets. They draft applications, litigate infringement, and license IP rights.",
    whatTheyHandle: [
      "Trademark searches and registration",
      "Copyright registration and DMCA",
      "Patent prosecution (utility and design)",
      "Trade secret protection",
      "Licensing and assignment agreements",
      "Infringement litigation",
    ],
    whenToHire:
      "Before publicly disclosing an invention (patent), before launching a brand (trademark), and immediately upon discovering infringement.",
    typicalFees:
      "Trademark filing: $500–$2,000 plus USPTO fees. Patent application: $5,000–$15,000+. Litigation: highly variable, often $50k–$500k+.",
    faqs: [
      {
        q: "Trademark vs copyright vs patent — what's the difference?",
        a: "Trademark protects brand identifiers (names, logos). Copyright protects creative works (writing, music, software). Patent protects inventions (devices, processes).",
      },
      {
        q: "How long does a trademark last?",
        a: "Indefinitely, as long as you keep using it in commerce and file the required maintenance documents at years 5–6, 9–10, and every 10 years after.",
      },
    ],
  },
  "tax-law": {
    shortDef:
      "Tax attorneys advise individuals and businesses on federal, state, and international tax matters — including planning, IRS controversy, audits, and tax-court litigation.",
    whatTheyHandle: [
      "IRS audits and appeals",
      "Tax-court litigation",
      "Offers in compromise",
      "Innocent spouse relief",
      "International tax (FBAR, FATCA)",
      "Estate and gift tax",
      "Business tax structuring",
    ],
    whenToHire:
      "When you receive an IRS notice you don't fully understand, before structuring a complex transaction, or any time the amount in dispute exceeds $10,000.",
    typicalFees:
      "Hourly: $300–$700. Flat-fee audit representation: $2,500–$15,000. Tax court: $10,000+.",
    faqs: [
      {
        q: "CPA, EA, or tax attorney — who do I need?",
        a: "CPAs and EAs are great for return preparation and routine IRS issues. A tax attorney is essential for tax court, criminal exposure, or matters where attorney-client privilege matters.",
      },
      {
        q: "What is an offer in compromise?",
        a: "An OIC is an IRS settlement that lets you resolve tax debt for less than the full amount owed if you can prove you cannot pay it in full. About 30–40% of submitted OICs are accepted.",
      },
    ],
  },
  "medical-malpractice": {
    shortDef:
      "Medical malpractice attorneys represent patients harmed by negligent care from doctors, hospitals, nurses, and other healthcare providers. These cases require expert medical witnesses and rigorous evidence development.",
    whatTheyHandle: [
      "Surgical errors",
      "Misdiagnosis and delayed diagnosis",
      "Birth injuries",
      "Medication errors",
      "Hospital-acquired infections",
      "Anesthesia errors",
      "Nursing-home neglect",
    ],
    whenToHire:
      "As soon as you suspect malpractice. Most states impose 2–3 year deadlines and require expert affidavits filed early in the case.",
    typicalFees:
      "Always contingency, typically 33–40%. Many states cap attorney fees in med-mal cases. Free consultations are standard.",
    faqs: [
      {
        q: "What counts as medical malpractice?",
        a: "Four elements: a doctor-patient relationship, a breach of the accepted standard of care, an injury caused by that breach, and quantifiable damages. A bad outcome alone is not malpractice.",
      },
      {
        q: "Why are these cases so expensive to bring?",
        a: "Med-mal requires 2–4 expert physicians at $5k–$15k each, plus sometimes years of litigation against well-funded insurance defense. Most firms screen carefully before accepting.",
      },
    ],
  },
  "civil-rights": {
    shortDef:
      "Civil rights attorneys represent people whose constitutional or statutory rights have been violated by government actors, employers, schools, or businesses — including police misconduct, discrimination, and voting rights claims.",
    whatTheyHandle: [
      "Police excessive force / Section 1983 claims",
      "Discrimination in housing, employment, or education",
      "First Amendment claims",
      "Disability rights / ADA enforcement",
      "Voting rights",
      "Prisoner rights",
    ],
    whenToHire:
      "Immediately after the incident. Evidence (video, witnesses, medical records) disappears quickly. Many civil rights claims have short notice-of-claim deadlines.",
    typicalFees:
      "Most plaintiff civil rights work is on contingency. Section 1983 includes a fee-shifting provision so prevailing plaintiffs can recover attorney fees from the government.",
    faqs: [
      {
        q: "Can I sue the police for excessive force?",
        a: "Yes, under 42 U.S.C. § 1983, though qualified immunity creates significant hurdles. Strong evidence — video, contemporaneous medical records, witness statements — is critical.",
      },
      {
        q: "How long do I have to file?",
        a: "Section 1983 borrows the state's personal-injury statute (1–6 years). Many municipalities also require a notice of claim within 30–180 days.",
      },
    ],
  },
};

const FALLBACK: PracticeAreaData = {
  shortDef:
    "Attorneys in this practice area help clients navigate the legal issues specific to this field, advising on strategy, drafting documents, and representing clients in negotiations and litigation when needed.",
  whatTheyHandle: [
    "Initial case evaluation and strategy",
    "Document drafting and review",
    "Negotiation with opposing parties",
    "Court filings and litigation",
    "Settlement and resolution",
  ],
  whenToHire:
    "As early as possible. Most legal matters have deadlines that, once missed, can permanently bar your claim or defense.",
  typicalFees:
    "Fees vary by complexity. Many attorneys offer free or low-cost initial consultations. Common arrangements include flat fee, hourly ($200–$600), and contingency (typically 33% in plaintiff-side cases).",
  faqs: [
    {
      q: "Do I need a lawyer for this?",
      a: "For anything more than the most routine matter, yes. Self-representation is legally permitted but rarely economically rational once meaningful money or rights are at stake.",
    },
    {
      q: "What should I bring to the first meeting?",
      a: "Any documents related to the matter, a written timeline, and a list of questions. Most consultations last 30–60 minutes.",
    },
  ],
};

export function getPracticeAreaData(slug: string): PracticeAreaData {
  return PRACTICE_AREA_DATA[slug] || FALLBACK;
}
