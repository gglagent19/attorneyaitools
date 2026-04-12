---
type: blog
title: "Can ChatGPT Pass the Bar Exam? What the Data Actually Shows"
slug: "chatgpt-bar-exam"
date: "2026-04-12"
author: "AttorneyAITools Editorial Team"
tags: [legal-ai, trends, analysis]
description: "Can ChatGPT pass the bar exam? A data-driven look at GPT-4's 90th percentile UBE score, the Bommarito and Katz studies, and what it means for lawyers."
reading_time: "11 min"
---

# Can ChatGPT Pass the Bar Exam? What the Data Actually Shows

In March 2023, OpenAI announced GPT-4, and buried inside a long technical report was a claim that set the legal profession on fire. The new model, they said, had scored in the 90th percentile on the Uniform Bar Exam. A few weeks earlier, Daniel Katz and Michael Bommarito of Michigan State University published a preprint titled "GPT-4 Passes the Bar Exam," reporting that GPT-4 had achieved a combined UBE score of roughly 297 out of 400, a result that would not only pass the exam in every UBE jurisdiction but beat the average human test taker by a comfortable margin.

The news went viral for a reason. The bar exam is the gateway credential of the American legal profession. It is the instrument that law schools orient their curricula around, that state supreme courts use to regulate entry to practice, and that generations of lawyers have regarded as the hardest standardized test of their lives. To hear that a machine could pass it, and pass it well, felt like a symbolic shift. If AI could clear the bar, what else could it do?

Three years later, the answer is more complicated, more interesting, and more useful for practicing lawyers than the original headline implied. Let us look at what the data actually shows, what it means for legal reasoning, where AI still fails, and what practicing attorneys should take away from all of it.

## GPT-4 Versus the UBE: The Numbers in Context

The original Bommarito and Katz study, published in late 2022, tested GPT-3.5 on the Multistate Bar Examination, the 200-question multiple choice component that accounts for roughly half of the UBE score. GPT-3.5 got about 50% of the MBE questions correct, which was notable because it beat random chance, but would have placed the model somewhere around the 10th percentile of human test takers. Not close to passing.

Three months later, with GPT-4, the same research team reran the experiment with dramatically different results. GPT-4 scored approximately 76% on the MBE, which would place it in the 90th percentile of test takers. On the essay portions, the Multistate Essay Examination and the Multistate Performance Test, GPT-4's graded responses were scored by blind human graders and fell solidly above passing in every category. The combined result of 297 out of 400 exceeded the minimum passing score in every UBE jurisdiction, and would have been well above average among actual bar takers.

Those numbers have since been probed, debated, and partially revised. A subsequent analysis by researchers at MIT argued that the 90th percentile claim was inflated because it compared GPT-4's score to the percentile of repeat test takers, who tend to score lower than first-time takers. Corrected for that bias, GPT-4's performance looks more like the 68th percentile on the MBE, which is still a passing score in every UBE jurisdiction but less dramatic than the original headline. Other researchers at Stanford and in the Netherlands have replicated the core finding with similar qualifications, and a handful of subsequent frontier models from Anthropic, Google, and Meta have reportedly matched or exceeded GPT-4's performance on bar exam questions.

The headline takeaway survives the scrutiny. A modern frontier large language model, working from a prompt alone, can pass the bar exam. That is a claim that no one could have made before 2023, and it deserves to be taken seriously.

## What This Means for Legal Reasoning

The bar exam is a specific kind of test. It asks test takers to apply black letter law to stylized fact patterns, identify issues, and explain the analytical path from rule to conclusion in a time-pressured setting. It rewards breadth, accuracy, and a particular rhetorical structure known to every American law student as IRAC, for issue, rule, application, and conclusion.

Here is the important observation. The bar exam is actually a fairly good match for what large language models are intrinsically good at. Language models excel at pattern completion over large training corpora, and bar exam questions are, almost by design, pattern-rich. The facts are narrow, the legal rules are well-documented, and the expected answers follow a predictable rhetorical format. It is not a coincidence that AI systems became able to pass the bar exam before they became able to, say, win a medical malpractice case on cross-examination.

So the fact that GPT-4 passes the bar should not be read as a claim that GPT-4 can practice law. It should be read as a claim that GPT-4 can perform competently at the specific, narrow, closed-form task the bar exam tests. Those are related but different things, and conflating them is the single most common mistake in the legal AI discourse.

Bommarito and Katz themselves made this point in their paper. They were careful to note that bar exam performance is a measure of ability to reason about law under a specific set of constraints, not a measure of the messier, more contested, more relationship-driven skills that actual legal practice requires. The bar exam tests whether a candidate has the minimum analytic competence to be trusted with a law license. It does not test whether the candidate can manage a client, draft a complex motion from scratch, read a jury, or negotiate a settlement.

## Where AI Still Fails

Three years of follow-up research has given us a much clearer picture of where current legal AI breaks down. These are the places where even GPT-4, Claude 3, Gemini, and their successors still struggle.

**Open-ended novel reasoning.** Bar exam questions are built from known doctrines and common fact patterns. When researchers have tested AI systems on genuinely novel questions, for instance, how a new statute should be interpreted before any court has ruled on it, performance degrades sharply. The models are much better at retrieving and recombining known patterns than at generating original doctrinal analysis.

**Jurisdictional nuance.** The UBE is deliberately designed to test general principles that are common across jurisdictions. Real practice is full of state-specific quirks, local rules, and procedural traps that vary between Cook County and Dallas County. AI systems trained predominantly on federal and generic sources often miss these details, and they miss them silently, without flagging uncertainty.

**Citation accuracy.** The now-infamous Mata v. Avianca case of 2023, in which a New York lawyer filed a federal brief citing multiple completely fabricated cases generated by ChatGPT, remains the canonical warning. Even three years later, ungrounded large language models will confidently invent case names, docket numbers, and quotations. Retrieval-augmented systems like [Casetext CoCounsel](/ai-tools/casetext-ai) and [Harvey AI](/ai-tools/harvey-ai), which cite back to verified case databases, have largely solved this problem for their domain, but consumer chatbots absolutely have not.

**Temporal knowledge.** Large language models are frozen at a training cutoff and do not know about laws, rules, or cases decided after that date unless they are explicitly connected to a live database. A lawyer who relies on a raw chatbot for current law is flying blind.

**Strategic judgment.** The bar exam asks what the rule is. Practice asks what to do about it. These are very different questions, and current AI systems are far better at the first than the second. Asking an AI whether to settle a case, whether to take a deposition, or whether to push for discovery sanctions is like asking a very well-read law student who has never stepped into a courtroom. The answer may be smart, but it will not be wise.

**Long-context coherence.** The bar exam gives models a few paragraphs of facts. Real cases involve thousands of pages of discovery, months of procedural history, and dozens of related filings. Models that ace short-context reasoning still degrade when asked to keep a sprawling record consistent over many interactions.

## Jurisdictional Variations and the MPRE Question

The UBE is adopted in some form by 41 jurisdictions as of 2024, which means passing the UBE transfers broadly, but not universally. California, long the biggest holdout, rolled out its own new bar exam in 2025 that relies less on the standard UBE format and includes more performance-based questions. Early reports suggest that AI systems perform well on the California exam too, but with more variance on the performance-test portions.

The Multistate Professional Responsibility Examination, or MPRE, is the ethics component every American lawyer must pass separately. Researchers have found that GPT-4 and its successors also pass the MPRE comfortably, which is arguably more interesting than passing the substantive bar, because the MPRE tests the kind of normative judgment that one might expect a machine to struggle with. The models do well because the ABA Model Rules are well-documented and the MPRE's fact patterns are relatively formulaic, but the result still surprises people.

Bar examiners are paying attention. In 2024, the National Conference of Bar Examiners announced a phased transition to a next-generation bar exam that will place more weight on skills like client counseling, negotiation, and the kind of integrated problem solving that current AI systems struggle with. Whether the new format will meaningfully separate human from machine performance remains to be seen, but the intent is clear.

## Practical Takeaways for Practicing Attorneys

What should a practicing lawyer actually do with the knowledge that AI can pass the bar?

**Treat raw chatbots as capable but unreliable research assistants.** A frontier model can draft a credible memo on a well-trodden area of law in seconds, but it can also fabricate a case citation in the same paragraph without flagging the difference. Never file AI-generated text without verifying every citation against a primary source. This is not a theoretical risk. Real lawyers have been sanctioned, fined, and publicly embarrassed because they skipped this step.

**Use grounded, legal-specific tools for client work.** Platforms like [Harvey AI](/ai-tools/harvey-ai) and [Casetext CoCounsel](/ai-tools/casetext-ai) are built on top of the same foundation models, but they are wrapped in retrieval architectures that ground every answer in verified case law. For any substantive research or drafting you plan to bill for, use these, not a generic chatbot.

**Do not confuse competence with expertise.** A 90th-percentile bar exam score means a model has general legal knowledge at the level of a strong new lawyer. It does not mean the model has the expertise of a twenty-year specialist in your practice area. Treat AI output the way you would treat the output of a bright first-year associate. Read it, question it, and improve it.

**Raise the floor, not the ceiling, of your junior associate work.** Bar-level AI is most useful for catching the errors a junior associate would catch, at speed. Use it to pressure-test draft memos, spot missing issues, and generate counterarguments you might not have thought of. Those are places where it consistently adds value without creating outsized risk.

**Update your engagement letters and malpractice coverage.** Many state bars have issued guidance about AI use in practice. Several have required, or will soon require, disclosure to clients when generative AI is used in their matters. Your engagement letters should reflect current guidance, and your malpractice carrier should know how you use AI in practice.

## Future Tests and the Longer Arc

The fact that GPT-4 passes the bar is interesting in 2023 and boring in 2027. Every new model in the frontier class passes the bar by default now, and the interesting question has shifted to whether AI can pass more demanding legal tests.

Researchers are already probing the next frontier. Can AI win appellate moots? Can it handle complex, multi-count federal indictments? Can it do competent tax planning under Subchapter K? Can it evaluate conflicts under the Model Rules in genuinely novel situations? The early results suggest that current models are strong at individual pieces of these tasks and weak at orchestrating them into a coherent representation of a client's interest over time. That gap is the real battleground for legal AI over the next three to five years.

The other frontier is oral advocacy and cross-examination. No standardized test exists for these skills, and none is likely to soon. They depend on physical presence, social cognition, and real-time adaptation in ways that current AI systems cannot match. Most observers think this is the most durable moat for human lawyers, at least through the end of the decade.

## Frequently Asked Questions

**Did GPT-4 really pass the bar in the 90th percentile?**
It did, by the original Bommarito and Katz methodology. A subsequent reanalysis by MIT researchers corrected for sampling issues and placed the true performance around the 68th percentile, which is still a passing score in every UBE jurisdiction. Either way, GPT-4 clears the bar.

**Does this mean AI is ready to practice law?**
No. The bar exam tests a narrow set of closed-form analytical skills. Actual practice requires judgment, relationships, courtroom skills, and long-context strategic thinking that current AI systems cannot match.

**Can I use ChatGPT to answer client questions?**
Only with extreme care. Never paste confidential client information into a consumer chatbot. Never file AI-generated work without verifying citations. For substantive client work, use grounded legal platforms like [Harvey AI](/ai-tools/harvey-ai) or [Casetext CoCounsel](/ai-tools/casetext-ai).

**Will bar examiners redesign the exam to defeat AI?**
They are trying. The new generation UBE is designed to emphasize skills that AI performs poorly at, including integrated client counseling and performance-based tasks. Whether it will actually separate human from machine performance remains an open question.

**What about the MPRE and state-specific exams?**
Frontier AI systems pass the MPRE comfortably and perform well on most state-specific bar exams, including California's new format. Jurisdictional nuance remains a weakness, but not enough to keep models below passing in aggregate.

**What should I tell a nervous law student who reads this?**
Tell them that passing the bar has always been table stakes, not a career. The bar exam measures the floor of legal competence, not the ceiling. The lawyers who thrive in the AI era will be the ones who build the ceiling with the skills AI cannot replicate.

## Conclusion

Can ChatGPT pass the bar exam? Yes, and has for years. That fact is less important than it sounded in 2023. The bar exam measures a narrow slice of legal competence, and the ways in which AI passes it are the same ways in which AI is already transforming the economics of legal research, drafting, and document review. The ways in which it does not pass the bar, specifically the strategic, relational, and courtroom skills of actual practice, remain the moat around human lawyering. Understanding both sides of that picture is the difference between reading headlines and actually preparing for the next decade of practice.
