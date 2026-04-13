---
type: faq
question: "Can AI pass the bar exam?"
slug: "can-ai-pass-the-bar-exam"
category: "legal"
date: "2026-04-12"
description: "Can AI pass the bar exam? A look at GPT-4's UBE score, the methodology controversy, what it means for lawyers, and what AI still cannot do."
related_tools: ["chatgpt", "harvey-ai", "casetext-cocounsel"]
---

# Can AI Pass the Bar Exam?

## Short Answer

Yes, several frontier AI models can pass the Uniform Bar Exam. GPT-4 famously scored in the 90th percentile on a simulated UBE in early 2023, and newer models (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro) have matched or exceeded that score. But the result is narrower than the headlines suggest: it measures pattern recognition on multiple-choice and short-essay questions, not the judgment, client counseling, or ethical reasoning that define actual practice.

## Full Answer

When Daniel Katz, Michael Bommarito, and colleagues published "GPT-4 Passes the Bar Exam" in March 2023, the legal industry briefly lost its collective mind. The paper reported that GPT-4, taking a simulated Uniform Bar Exam, achieved a combined score of 297 out of 400, placing it in roughly the 90th percentile of human test-takers. A year earlier, GPT-3.5 had scored in the bottom 10th percentile on the same exam, so the jump was dramatic. The implications seemed clear: if an AI can pass the bar, what exactly is a junior associate for?

The actual story is more interesting. A 2024 reanalysis by MIT's Eric Martinez argued that the original study overstated GPT-4's performance by comparing it against all test-takers, including repeat failers, rather than first-time takers, and by using a non-standard scoring normalization. Martinez's recalculation put GPT-4 closer to the 48th percentile overall and much lower on the written essay component. OpenAI has not disputed the recalculation. Subsequent models have closed the gap and then some: by mid-2025, Claude 3.5 Sonnet and GPT-4o were scoring in the top quartile on full UBE simulations, and legal-specific fine-tunes (Harvey's internal benchmarks, for instance) report even higher.

So yes, AI can pass the bar. The more useful question is what that fact actually tells us. The bar exam tests issue-spotting, rule recall, and the ability to apply rules to a fact pattern within a tight time window. Large language models are phenomenally good at all three, because the task closely resembles the training objective of next-token prediction on text that includes millions of case summaries, outlines, and study guides. The UBE is a closed-world exam; LLMs thrive in closed worlds. Real practice is an open world. A client walks in with a problem that has never been written down anywhere, tells you half the relevant facts and none of the embarrassing ones, and asks you to tell them what to do. No benchmark measures that.

It also matters what the bar exam does not test. It does not test negotiation, client counseling, witness preparation, the ability to read a room during a deposition, the judgment call of whether to file a motion or keep powder dry, billing ethics, trust accounting, supervising staff, or any of the operational competencies that separate a lawyer from a very well-read person. An AI that scores 320 on the UBE still cannot decide whether to settle a case for 60 percent of policy limits based on how the mediator looked at your client. The exam-passing result is best understood as "this system has internalized the rules of the game," not "this system can play the game."

For practicing lawyers, the takeaway is practical. AI tools that can pass the bar are reliable for the work that resembles bar-exam questions: summarizing the black-letter rule on a given topic, spotting issues in a fact pattern, outlining elements a plaintiff must prove, generating first-pass memos. They remain unreliable for work that resembles real practice: predicting what a specific judge will do, weighing credibility, advising a client whose goals are unclear or conflicted. Use AI where it is strong, keep humans in the loop where it is weak, and do not let the bar-exam headline convince you that the second category has shrunk as much as the first.

For law students, the implication is different. If an AI can now outperform the median applicant on the exam that was designed to measure basic competence, the profession's signal problem gets harder. Law schools are revisiting what they teach and how they evaluate; employers are revisiting what they expect of first-year associates. The bar exam's role as a gatekeeper is not going away, but its role as a credentialing signal is weakening. The lawyers who will thrive over the next decade are the ones who use these tools to operate one or two levels above their nominal experience, not the ones who treat the tools as competitors.

## Related Questions

- [Can AI actually do legal research?](/faq/can-ai-do-legal-research)
- [Does AI replace paralegals?](/faq/does-ai-replace-paralegals)
- [What's the future of AI in legal practice?](/faq/future-of-ai-in-law)

## Recommended Tools

- [Harvey AI](/ai-tools/harvey-ai) - Legal-specific model fine-tuned for practice tasks.
- [CoCounsel](/ai-tools/casetext-cocounsel) - Thomson Reuters' legal assistant built on GPT-4.
- [ChatGPT](/ai-tools/chatgpt) - The model that started the bar-exam conversation.
