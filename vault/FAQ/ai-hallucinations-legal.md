---
type: faq
question: "What are AI hallucinations in legal work and how to prevent them?"
slug: "ai-hallucinations-legal"
category: "ai-ethics"
date: "2026-04-12"
description: "AI hallucinations in legal work: what they are, the Mata v. Avianca cautionary tale, which tools reduce the risk, and a practical verification workflow for lawyers."
related_tools: ["lexis-ai", "westlaw-precision", "casetext-cocounsel"]
---

# What Are AI Hallucinations in Legal Work and How to Prevent Them?

## Short Answer

An AI hallucination is when a language model confidently produces information that is false, including fabricated case names, invented citations, or misstated holdings. In legal work they are a sanctions-level risk. The prevention recipe is straightforward: use retrieval-grounded legal AI tools instead of raw chatbots, verify every citation against a primary source, and never rely on an AI-generated legal proposition that you have not independently confirmed.

## Full Answer

"Hallucination" is the technical term in AI research for a model output that is fluent, confident, and wrong. Large language models do not have a separate module for facts and a separate module for language; they generate language by predicting the next token based on patterns in training data, and when the patterns suggest something that sounds right but is not actually true, the model produces it anyway. In most domains, hallucinations are annoying. In law, they are career-ending, because legal work depends on citations to real authority and a citation that does not exist is not a minor error.

The canonical legal hallucination story is Mata v. Avianca, a 2023 federal case in the Southern District of New York in which two attorneys filed a brief containing six cases that did not exist. ChatGPT had generated the cases, complete with plausible-sounding names (Varghese v. China Southern Airlines, Shaboon v. Egyptair, and so on), fabricated reporter citations, and even fabricated excerpts from the fabricated opinions. When opposing counsel could not find the cases and the judge ordered the attorneys to produce copies, the attorneys went back to ChatGPT, which cheerfully produced fabricated PDFs of the fabricated opinions. The court sanctioned the attorneys and their firm, and the story became the number-one AI competence CLE topic for two years running. Similar sanctions have since been imposed in Texas, California, Colorado, and at least a dozen other jurisdictions.

Understanding why hallucinations happen helps you prevent them. A raw chatbot like free ChatGPT or Claude does not have access to a legal database. When you ask it for a case, it predicts what a case citation on your topic would look like, based on millions of examples of case citations it has seen during training. If it has actually seen the specific case, it can often reproduce it correctly; if it has not, or if it has seen similar-sounding cases, it will stitch together a plausible fiction. The model has no internal signal that distinguishes "I am reciting something I saw" from "I am generating something that would be consistent with what I would see." Both feel the same from the model's perspective, which is why the output sounds equally confident in both cases.

The primary defense is to stop using raw chatbots for citation-bearing work. Retrieval-augmented legal AI tools like Lexis+ AI, Westlaw Precision AI, CoCounsel, and Harvey solve this problem by first running a real search against a real legal database and then asking a language model to write an answer grounded in the documents that search returned. The model still generates fluent language, but the facts it generates are constrained to come from retrieved authority. Hallucinations in these systems are much rarer, and when they do happen they usually take the form of misstated holdings from real cases rather than invented cases from nowhere. That is a better failure mode, because misstated holdings are catchable by reading the actual opinion the tool linked to.

The secondary defense is human verification, every single time. Treat every AI-generated citation as unverified until you have personally pulled the opinion and read at least the relevant paragraph. Treat every AI-generated legal proposition as a research lead, not a conclusion. This sounds tedious, but in practice it is not: a lawyer who reviews AI output with the same attention they would give a summer associate's memo will catch fabricated citations immediately, because the fabricated cases will not appear in Westlaw when you check. The total workflow, even including verification, is still faster than doing the research manually, because the AI gave you a scaffold and a direction.

A specific verification checklist that works: for every citation in an AI draft, (1) confirm the case exists by pulling it on Westlaw or Lexis, (2) confirm the quoted language actually appears in the opinion, (3) confirm the proposition the AI attributes to the case is actually what the case held, and (4) confirm the case has not been overturned or negatively treated. Steps one and two catch pure fabrication; steps three and four catch misstatement and staleness. For every unsourced legal proposition, either generate a verified citation to back it or delete the proposition. Make this checklist part of your standard workflow and train associates on it before they touch an AI tool for citation work.

Finally, know your jurisdiction's disclosure rules. Many federal judges now require certification regarding AI use in filings; some require disclosure of which tools were used and on what portions. Failing to disclose when disclosure is required is a separate sanction risk, independent of whether the AI hallucinated anything. Read the standing orders for every court you appear in. The administrative cost of compliance is low; the cost of non-compliance is not.

## Related Questions

- [Is ChatGPT safe for lawyers to use?](/faq/is-chatgpt-safe-for-lawyers)
- [Can AI actually do legal research?](/faq/can-ai-do-legal-research)
- [How should lawyers cite AI-generated content?](/faq/how-to-cite-ai-generated-content)

## Recommended Tools

- [Lexis+ AI](/ai-tools/lexis-ai) - Retrieval-grounded legal AI with verified citations.
- [Westlaw Precision AI](/ai-tools/westlaw-precision) - Thomson Reuters equivalent with strong citation accuracy.
- [CoCounsel](/ai-tools/casetext-cocounsel) - Legal-specific assistant with grounded research mode.
