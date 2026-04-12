---
type: blog
title: "The Mata v. Avianca Case: What Every Lawyer Should Know About AI"
slug: "mata-v-avianca-chatgpt-case-lessons"
date: "2026-04-12"
author: "AttorneyAITools Editorial Team"
tags: [legal-ai, analysis]
description: "A detailed analysis of Mata v. Avianca, the ChatGPT hallucination case that sanctioned lawyers $5,000 and reshaped how attorneys use generative AI."
reading_time: "14 min"
---

# The Mata v. Avianca Case: What Every Lawyer Should Know About AI

In the short history of generative artificial intelligence in the legal profession, one case looms larger than any other. It is cited in continuing legal education seminars, judicial standing orders, law firm AI policies, and bar association ethics opinions from coast to coast. That case is **Mata v. Avianca, Inc.**, 22-cv-1461 (PKC) (S.D.N.Y. June 22, 2023), and the lessons it teaches are now required knowledge for any attorney who touches a large language model.

This post walks through exactly what happened, what Judge P. Kevin Castel held, why the sanction was only $5,000 but the reputational damage was priceless, and the seven concrete lessons every practicing lawyer should internalize before the next brief deadline.

## What Happened in Mata v. Avianca

The underlying case was unremarkable. Roberto Mata alleged that he was injured when a metal serving cart struck his knee during an August 2019 Avianca Airlines flight from El Salvador to New York. Avianca moved to dismiss, arguing the claim was time-barred under the Montreal Convention.

Mata's counsel at the Levidow, Levidow & Oberman firm filed an opposition brief. The brief cited a string of supposedly on-point federal decisions, including:

- **Varghese v. China Southern Airlines Co., Ltd.**, 925 F.3d 1339 (11th Cir. 2019)
- **Shaboon v. Egyptair**, 2013 IL App (1st) 111279-U
- **Petersen v. Iran Air**, 905 F. Supp. 2d 121 (D.D.C. 2012)
- **Martinez v. Delta Airlines, Inc.**, 2019 WL 4639462
- **Estate of Durden v. KLM Royal Dutch Airlines**, 2017 WL 2418825
- **Miller v. United Airlines, Inc.**, 2019 WL 6894012

When opposing counsel went to pull the cases, they could not find them. Neither could the court. Neither could Westlaw, Lexis, PACER, or any other legal database in existence. The citations looked real. The reporter volumes existed. The pinpoint page numbers were plausible. The docket numbers conformed to the conventions of the issuing courts. But the opinions themselves did not exist.

On April 11, 2023, Judge Castel issued an order describing the citations as "bogus judicial decisions with bogus quotes and bogus internal citations" and directed Mata's counsel to show cause why sanctions should not be imposed.

### Enter Steven Schwartz

The attorney who drafted the brief was Steven A. Schwartz, a lawyer with more than three decades of experience. Schwartz was not admitted in the Southern District of New York, so his colleague **Peter LoDuca** served as counsel of record and signed the filings.

In a now-famous affidavit, Schwartz admitted that he had used ChatGPT to conduct legal research. He explained that he had heard about the tool from his college-age children and from articles touting its capabilities. When he could not find supporting authority through his usual Fastcase subscription, he turned to the chatbot and asked it for cases supporting his tolling argument.

ChatGPT obliged. It generated the citations above and, when Schwartz asked whether the cases were real, the model reassured him that they were. He asked ChatGPT to produce the full text of the Varghese opinion; it fabricated an entire decision, complete with procedural history, factual background, and reasoned analysis. Schwartz copied substantial portions into the brief.

LoDuca, meanwhile, signed the filing without verifying the cases. When the court first questioned the citations, the lawyers doubled down by submitting an affidavit that attached purported copies of the fake opinions, which Schwartz had again obtained from ChatGPT.

## Judge Castel's Ruling

On June 22, 2023, Judge Castel issued a 34-page opinion and order imposing sanctions. The opinion is worth reading in full, but three themes stand out.

**First, the court was careful to note that using AI is not inherently sanctionable.** Judge Castel wrote that there is "nothing inherently improper about using a reliable artificial intelligence tool for assistance." The problem was not the technology. The problem was that the lawyers "abandoned their responsibilities" when they submitted nonexistent authority and "continued to stand by the fake opinions after judicial orders called their existence into question."

**Second, the court focused on the duty to verify.** Rule 11(b) of the Federal Rules of Civil Procedure requires that every filing be grounded in legal contentions "warranted by existing law." That duty is personal and non-delegable. It cannot be outsourced to a junior associate, a paralegal, a research service, or a language model. When Schwartz cut and pasted ChatGPT's output into a brief, he was personally certifying that those cases existed and stood for what he claimed.

**Third, the court emphasized the aggravating conduct after the citations were challenged.** If Schwartz had confessed immediately, apologized, and withdrawn the brief, the outcome would likely have been different. Instead, the lawyers submitted additional false materials and maintained the fiction for weeks. That course of conduct transformed a negligent error into sanctionable bad faith.

### The $5,000 Sanction

The monetary penalty was, by federal court standards, modest: $5,000 jointly and severally against Schwartz, LoDuca, and the Levidow firm. Judge Castel also required the lawyers to send letters notifying each of the real judges whose names had been falsely attached to the fabricated opinions.

But the reputational consequences far exceeded the dollar amount. The case was covered by the New York Times, the Wall Street Journal, the BBC, and every major legal publication on the planet. "Schwartz" became shorthand for AI misuse. Federal judges across the country issued standing orders requiring disclosure of AI use in filings. State bars opened ethics inquiries. And "Mata v. Avianca" entered the permanent vocabulary of legal AI discussions.

## Rule 11 Implications

The case is now the leading authority on Rule 11's application to AI-generated content. The doctrinal takeaway is simple: **using AI does not lower the Rule 11 bar**. A lawyer who files a brief citing fake cases is subject to sanctions whether those cases came from ChatGPT, a hallucinating associate, or thin air. The source does not matter. The certification does.

Several courts have since cited Mata when imposing their own sanctions. In 2024 and 2025, at least a dozen reported decisions have addressed AI-generated fabrications in briefs, and virtually all of them begin their analysis with Judge Castel's opinion.

## Seven Lessons for Attorneys

### 1. Verify Every Citation, Every Time

This is the lesson that subsumes all the others. Before a brief leaves your desk, every case cite must be pulled from an authoritative reporter or database. Not summarized. Not described. Actually pulled. If the case does not exist in Westlaw, Lexis, Bloomberg Law, Fastcase, or on PACER, it does not exist.

### 2. Understand What Hallucination Actually Is

Many lawyers still think of hallucination as a "bug" that will be fixed in the next software release. It is not a bug. It is a fundamental property of how large language models generate text. These systems predict plausible sequences of tokens; they do not retrieve facts from a database. A model can produce a citation that looks perfect because plausibility is exactly what it optimizes for. General-purpose chatbots like ChatGPT, Gemini, and Claude are particularly prone to fabricating citations when asked for authority that does not exist.

### 3. Use Purpose-Built Legal Tools Where Possible

Legal-specific platforms that use retrieval-augmented generation against verified case law databases reduce hallucination risk by grounding answers in real documents. Tools like [Harvey AI](/ai-tools/harvey-ai) and [Casetext CoCounsel](/ai-tools/casetext-ai) are designed to cite only cases that actually exist in their underlying corpora. They are not infallible, but the failure mode is fundamentally different from a general chatbot inventing citations out of whole cloth.

### 4. Build a Citation-Check Workflow

Treat AI output the way you would treat a first-year associate's research memo: useful, promising, and in need of verification. Create a written checklist that every brief must pass before filing. At minimum: (a) every case Shepardized or KeyCited, (b) every quotation compared to the actual opinion, (c) every pinpoint cite verified. Tools like [Clearbrief](/ai-tools/clearbrief-ai) can automate much of this verification step.

### 5. Disclose When Courts Require It

Dozens of federal judges now require disclosure of AI use in filings. Some require certification that a human verified all citations. Know the standing orders in every court where you practice. When in doubt, disclose.

### 6. Train Everyone Who Touches a Filing

Schwartz was an experienced lawyer who did not understand the technology. Assume that everyone in your firm, from the managing partner to the newest paralegal, needs training before they use AI for legal research. A written AI policy is table stakes in 2026.

### 7. Own Your Mistakes Immediately

If a citation turns out to be wrong, the only correct response is immediate disclosure, withdrawal, and correction. Schwartz's sanction was driven as much by his post-discovery conduct as by the original error. Courts will forgive a mistake; they will not forgive a cover-up.

## How Legal-Specific AI Prevents This

The Mata disaster would have been very difficult to produce with modern legal AI platforms. Here's why.

Purpose-built legal AI tools retrieve answers from curated databases of actual case law, statutes, and secondary sources. When you ask such a tool for cases on a tolling question, it searches an indexed corpus of real opinions, retrieves the relevant passages, and then asks the language model to synthesize an answer grounded in those retrieved passages. The model is not free to invent citations because it is constrained to quote from documents that the retrieval system has actually pulled.

Platforms like [Harvey AI](/ai-tools/harvey-ai) use this retrieval-augmented architecture for matters ranging from research to drafting. [Casetext CoCounsel](/ai-tools/casetext-ai) similarly grounds its outputs in its underlying case law database. And verification tools like [Clearbrief](/ai-tools/clearbrief-ai) can be pointed at a finished brief to confirm that every citation resolves to a real document and that every quoted passage actually appears in the cited opinion.

None of these tools eliminate the lawyer's duty to verify. But they make verification faster, and they dramatically reduce the probability of the specific failure mode that ensnared Schwartz.

## Frequently Asked Questions

**Was Steven Schwartz disbarred?**
No. He was sanctioned $5,000 and required to notify the real judges whose names had been misappropriated. He was not disbarred, though the incident produced significant professional consequences.

**Can I use ChatGPT for legal research at all?**
You can use it for brainstorming, outlining, and drafting non-citation text. You should not rely on it for case citations or quotations without independent verification in an authoritative database. Many firms now prohibit general chatbot use for substantive research.

**Do I have to tell opposing counsel if I used AI?**
Generally no, unless a court order or local rule requires disclosure. Several federal judges have standing orders on point. Check before you file.

**What is Rule 11's role here?**
Rule 11 requires that every filing be grounded in existing law. A signature on a brief is a personal certification. Using AI does not relax that certification.

**How can I check if a case is real quickly?**
Pull it in Westlaw, Lexis, Bloomberg Law, or Fastcase. If it does not appear, it is not real. KeyCite and Shepard's flags add additional signal.

**Is retrieval-augmented generation foolproof?**
No. It significantly reduces hallucination but does not eliminate it. Always verify.

**What should my firm's AI policy cover?**
At minimum: approved tools, prohibited tools, verification requirements, confidentiality rules for client data, disclosure obligations, and training requirements.

The Mata case was a gift to the profession, even if it was a costly one for the lawyers involved. It drew a bright line that every practitioner can now see. Cross it at your peril.
