---
type: blog
title: "How to Use ChatGPT for Legal Work (Ethical Guide)"
slug: "how-to-use-chatgpt-for-legal-work"
date: "2026-04-12"
author: "AttorneyAITools Editorial Team"
tags:
  - legal-ai
  - ai-tools
  - lawyers
description: "A practical, ethics-first guide to using ChatGPT for lawyers in 2026. Learn safe use cases, prompts, ABA Opinion 512, and when to choose legal AI."
featured_image: "/images/blog/how-to-use-chatgpt-for-legal-work.jpg"
reading_time: "12 min"
---

# How to Use ChatGPT for Legal Work (Ethical Guide)

If you are a practicing attorney in the United States, you have almost certainly been asked by a partner, a client, or your own curiosity: "Can I just use ChatGPT for this?" The honest answer in 2026 is: sometimes yes, sometimes absolutely not, and the difference between the two can cost you your license.

This guide is written for U.S. lawyers who want to use **ChatGPT for lawyers** responsibly. We will cover what the tool is actually good at, what it is dangerously bad at, the ABA's new guidance, ten safe use cases, five hard prohibitions, copy-paste prompt templates, and when you should close ChatGPT and open a specialized legal AI platform like [Harvey AI](/ai-tools/harvey-ai), [Casetext](/ai-tools/casetext-ai), or [CoCounsel](/ai-tools/cocounsel) instead.

## The Mata v. Avianca Case Lesson

No discussion of ChatGPT and legal work can start anywhere except *Mata v. Avianca, Inc.*, 22-cv-1461 (S.D.N.Y. 2023). In that now-infamous personal injury case, attorneys Steven Schwartz and Peter LoDuca submitted a brief citing six federal cases that did not exist. ChatGPT had hallucinated *Varghese v. China Southern Airlines*, *Shaboon v. Egyptair*, and four others, complete with fake judges, fake quotes, and fake docket numbers. When opposing counsel could not find the cases, Schwartz went back to ChatGPT and asked, "Are these real?" ChatGPT said yes. They were not.

Judge P. Kevin Castel sanctioned both attorneys and their firm $5,000, required them to send copies of the sanctions order to every judge falsely identified as an author of the fake opinions, and referred the matter widely in the profession. The opinion is required reading. Since *Mata*, courts have sanctioned lawyers in at least a dozen other jurisdictions for nearly identical conduct, including a Colorado attorney suspended in 2024 and a federal filing in the Western District of Texas in early 2025 where opposing counsel caught fabricated Fifth Circuit citations.

The lesson is not "ChatGPT is useless for lawyers." The lesson is that ChatGPT is a **language prediction engine**, not a legal research database. It generates text that sounds like case law because it has read a lot of case law. It does not know whether that text is true.

Every single use case in this article flows from that distinction.

## What ChatGPT Can and Cannot Do for Lawyers

ChatGPT (GPT-4o, GPT-5, and the o-series reasoning models) is extraordinary at manipulating language. It is mediocre to terrible at verifying facts about the external world when those facts are not in its context window.

**ChatGPT is good at:**
- Summarizing long documents you paste in
- Rewriting your own draft prose in a different tone or register
- Brainstorming arguments, counterarguments, and edge cases
- Explaining unfamiliar concepts (tax code sections, industry jargon, a scientific principle for cross-examination)
- Generating structured outputs (timelines, tables, checklists) from unstructured text you provide
- Translating between English and other languages at a working-draft level
- Drafting routine correspondence, intake questionnaires, and internal memos

**ChatGPT is bad at (and will confidently lie about):**
- Citing real case law with correct reporter numbers, pincites, and holdings
- Identifying the current state of a statute or regulation
- Knowing local court rules, judges' standing orders, or filing deadlines
- Calculating damages, interest, or anything requiring arithmetic on large numbers
- Keeping your uploaded client data confidential unless you are on a contractually protected tier
- Knowing what it does not know

Hold those two lists in mind. Every safe use case lives in the first list. Every disaster lives in the second.

## 10 Safe Use Cases

Here are ten things I would be comfortable seeing a partner, an associate, or a solo practitioner do with ChatGPT today, assuming they are on ChatGPT Team, ChatGPT Enterprise, or the API with zero-data-retention enabled.

1. **Summarize a deposition transcript you paste in.** Ask for a chronological summary, a list of admissions, and a list of topics the witness evaded. You are summarizing text you already have.
2. **Tighten your own brief.** Paste your draft argument section and ask ChatGPT to cut 20% of the words without losing substance. Then review every change.
3. **Explain technical subject matter.** Before a deposition of a cardiologist or a software engineer, ask ChatGPT to explain the concept at a 101, 201, and 301 level and to list the ten questions a skeptical cross-examiner would ask.
4. **Generate a first-draft timeline.** Paste emails, text messages, or chronological document excerpts and ask for a timeline with dates, actors, and events.
5. **Draft routine correspondence.** Engagement letter follow-ups, scheduling emails, client status updates. Review and sign.
6. **Brainstorm cross-examination outlines.** Given a witness statement you paste in, ask for the ten weakest points and ten impeachment angles. Treat it as a junior associate's brainstorm, not a final product.
7. **Convert a rambling client narrative into a structured fact section.** You paste the intake notes, you get back clean prose.
8. **Create intake questionnaires and checklists** for a new practice area you are exploring.
9. **Translate marketing copy** for your firm website into Spanish, Mandarin, or other languages at draft quality (always get a native speaker to review).
10. **Draft internal training materials and SOPs** for your staff. This is some of the highest-ROI ChatGPT work in any firm.

Notice what is missing: legal research, citation, regulatory lookup, deadline calculation, and anything involving unreviewed client-confidential data on a consumer account.

## 5 Things to NEVER Do With ChatGPT

1. **Never cite a case ChatGPT gave you without pulling the full opinion from Westlaw, Lexis, Fastcase, or Google Scholar and reading it.** No exceptions. This is the *Mata* rule.
2. **Never paste privileged client information into the free consumer tier of ChatGPT.** The consumer ChatGPT terms historically allowed training on inputs unless you opted out. Even with opt-out, you are handing confidential data to a third party without a business associate or data processing agreement. For anything privileged, use ChatGPT Team, Enterprise, or the API with a DPA and zero-retention enabled, or use a legal-specific platform.
3. **Never ask ChatGPT for the current version of a statute or rule.** Its training cutoff is months to years old, and statutes change. Use the official code or a paid legal database.
4. **Never let ChatGPT do math that matters.** Damages calculations, interest, statute-of-limitations math, settlement offsets. Use a spreadsheet or a calculator.
5. **Never file, send, or rely on ChatGPT output without a human attorney reviewing every substantive sentence.** Rule 5.1 and Rule 5.3 require supervision of non-lawyer assistance, and the ABA has confirmed that GenAI counts.

## Prompt Templates for Legal Tasks

Here are five templates you can copy into ChatGPT right now. Each one is structured to produce useful output and to minimize hallucination risk by keeping the model focused on text you provide rather than facts it has to invent.

**Template 1: Deposition Summary**
```
You are my paralegal. I will paste a deposition transcript below.
Produce:
1) A chronological fact summary (max 500 words)
2) A bullet list of every admission helpful to the plaintiff
3) A bullet list of every admission helpful to the defense
4) A list of topics where the witness was evasive, with line cites
Do not add any facts that are not in the transcript. If something is unclear, say so.

TRANSCRIPT:
[paste]
```

**Template 2: Brief Tightening**
```
Below is a draft argument section from a motion to dismiss. Cut it by 25% without removing any legal argument, case citation, or record cite. Keep my voice. Return only the edited text, then a short list of what you cut and why.

DRAFT:
[paste]
```

**Template 3: Cross-Examination Brainstorm**
```
Act as a skeptical trial lawyer. I am preparing to cross-examine a witness whose prior statement is below. Identify:
- 10 internal contradictions or ambiguities
- 10 topics for impeachment
- 5 questions that would box the witness in before I reach the key point
Do not invent facts about the witness. Base everything on the statement.

STATEMENT:
[paste]
```

**Template 4: Technical Concept Primer**
```
Explain [CONCEPT, e.g., "how a TCAS collision avoidance system works in commercial aviation"] at three levels:
1) A two-paragraph overview for a jury
2) A one-page primer for me as the attorney
3) The 10 questions a hostile expert would ask to challenge my theory
Flag any place where you are uncertain.
```

**Template 5: Client Update Letter**
```
Draft a client status letter based on the facts below. Tone: warm but professional. Length: one page. Include next steps, what I need from the client, and realistic timing. Do not make promises about outcomes.

FACTS:
[paste bullet points]
```

Notice that none of these templates ask ChatGPT to find cases, cite statutes, or invent facts. They ask it to manipulate language you supply.

## ChatGPT vs Specialized Legal AI

ChatGPT is a general-purpose tool. Legal-specific AI platforms are built on top of similar foundation models but add three things that matter enormously for practice:

1. **Retrieval-augmented generation over verified legal databases.** [Casetext CoCounsel](/ai-tools/casetext-ai) and [Thomson Reuters CoCounsel](/ai-tools/cocounsel) are connected to Westlaw's case database. [Harvey AI](/ai-tools/harvey-ai) is trained and grounded on licensed legal corpora. When these tools cite a case, it is a real case because the citation came from a database lookup, not from token prediction.
2. **Contractually protected confidentiality.** These vendors sign business-associate-style agreements, commit to zero data retention for training, and in many cases offer SOC 2 Type II reports and on-premise or single-tenant deployment.
3. **Legal-task workflows.** Document review, deposition prep, contract redlining, and timeline generation are built as first-class features with legal evaluation criteria, not generic chat.

When should you reach for ChatGPT and when should you reach for a specialized tool?

- **Use ChatGPT** for language work on text you already possess: drafting, summarizing, brainstorming, explaining.
- **Use a specialized legal AI** for anything that requires a verified citation, a search of case law, a privileged document review, or a defensible audit trail. Start with [Harvey AI](/ai-tools/harvey-ai) for Big Law and sophisticated mid-market work, [Casetext](/ai-tools/casetext-ai) or [CoCounsel](/ai-tools/cocounsel) for research-heavy litigation, and browse our full [AI tools directory](/ai-tools) for narrower use cases.

A useful rule of thumb: if a mistake in the output could end up in a filing, use a specialized tool. If the output will never leave your office, ChatGPT is often fine.

## Ethical Considerations (Rules 1.1, 5.3, 1.6)

In July 2024 the American Bar Association issued **Formal Opinion 512**, the first comprehensive ABA ethics guidance on generative AI. The opinion does not ban GenAI; it applies existing rules to it. Every U.S. lawyer should read it in full. The short version:

**Rule 1.1 (Competence).** Competence now includes understanding the "benefits and risks" of the technology you use. If you use ChatGPT, you are expected to understand that it hallucinates, that it has a training cutoff, and that its output must be verified. Ignorance of how the tool works is no longer a defense.

**Rule 1.6 (Confidentiality).** You may not disclose information relating to the representation without informed consent. Pasting client documents into a consumer AI tool that uses inputs for training is almost certainly a disclosure. Opinion 512 essentially requires that you understand the vendor's data-handling terms and, for anything sensitive, obtain client informed consent or use a tool whose terms prohibit training on your data and provide confidentiality protections.

**Rule 5.1 and 5.3 (Supervision).** Partners and supervising attorneys must take reasonable steps to ensure that subordinate lawyers and nonlawyer assistants (which the ABA has explicitly said includes GenAI tools) comply with the rules. Practically, this means your firm needs a written AI use policy, training, and a verification workflow for any AI-assisted output.

**Rule 1.5 (Fees).** If you bill hourly and AI did the work in two minutes, you cannot bill the client for the two hours it would have taken manually. Opinion 512 is explicit on this. Either bill for the actual time, disclose the AI usage and reach agreement on value billing, or move to a flat fee.

**Rule 3.3 (Candor to the Tribunal).** The *Mata* rule. You are responsible for every citation in every filing. "ChatGPT told me so" is not a defense; it is an aggravator.

Many state bars have issued their own opinions layering on top of 512, including California, Florida, New York, New Jersey, Pennsylvania, and Texas. Check your jurisdiction before finalizing your firm's AI policy.

## FAQs

**Is it malpractice to use ChatGPT?**
No. It is malpractice to file hallucinated citations, to disclose privileged information to an unapproved vendor, or to fail to supervise AI output. Using ChatGPT carefully and within ABA Opinion 512 is not malpractice.

**Can I use the free ChatGPT for client work?**
For anything touching client-confidential information, no. Move to ChatGPT Team or Enterprise (which contractually prohibits training on your data and offers admin controls) or use a legal-specific platform.

**Do I have to tell my client I used AI?**
Opinion 512 stops short of requiring categorical disclosure, but it strongly suggests disclosure when AI use is material to the representation, when the engagement letter requires it, or when the client would reasonably want to know. Many firms now include a short AI-use clause in their standard engagement letter.

**Does ChatGPT Enterprise solve the confidentiality problem?**
It solves most of it. OpenAI commits not to train on Enterprise inputs, offers SOC 2 Type II, SAML SSO, and admin controls. For highly sensitive matters (government investigations, M&A with material nonpublic information, certain healthcare data) you may still want a single-tenant legal-specific platform.

**What about GPT-5 and reasoning models? Do they still hallucinate?**
Less often and less flagrantly, but yes. The o-series and GPT-5 reasoning models are dramatically better at math and logic, and they are more likely to say "I don't know" on factual questions. They still invent citations when asked to find case law without a connected database. The *Mata* rule still applies.

**Is there a ChatGPT plugin or GPT that gives real legal citations?**
Custom GPTs and plugins that search Westlaw, Lexis, or Fastcase exist, but most are wrappers around consumer accounts and do not solve the underlying contractual and confidentiality issues for a law firm. If you want real citations with real audit trails, use [Casetext](/ai-tools/casetext-ai), [CoCounsel](/ai-tools/cocounsel), or [Harvey](/ai-tools/harvey-ai).

**What should my firm's AI policy cover?**
Approved tools, prohibited tools, the types of data that can be entered into each tier, mandatory verification of any cited authority, a supervisory review step, client-disclosure language, and a training requirement. ABA Opinion 512 is a good scaffold.

---

ChatGPT is neither a miracle nor a malpractice trap. It is a powerful language tool with specific strengths and specific failure modes. Used inside its competence, with the prompts above and the supervision the Model Rules require, it will make you faster and sharper. Used outside its competence, it will land you in a published opinion. Choose carefully, verify everything, and when the stakes require a real citation, use a real legal AI. Start with our curated list of [specialized legal AI tools](/ai-tools) and pick the one that matches your practice.
