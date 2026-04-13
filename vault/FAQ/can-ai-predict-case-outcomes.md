---
type: faq
question: "Can AI predict case outcomes?"
slug: "can-ai-predict-case-outcomes"
category: "legal"
date: "2026-04-12"
description: "Can AI predict case outcomes? What judge analytics and litigation prediction tools actually do, where they work, and why headline accuracy numbers mislead."
related_tools: ["lex-machina", "premonition", "pre-dicta"]
---

# Can AI Predict Case Outcomes?

## Short Answer

AI can produce statistical predictions about case outcomes in specific, well-defined contexts, primarily for commoditized litigation types with large historical datasets. But "predict" is doing a lot of work in that sentence. Current tools offer judge analytics, motion-grant rates, and base-rate estimates that are genuinely useful, but they do not predict individual case outcomes with the accuracy the marketing implies, and they work much better for aggregate questions than for "will I win this case."

## Full Answer

The promise of AI-predicted litigation outcomes has been around since at least the early 2010s, when the first judge-analytics tools started showing up and academics published papers claiming 70- or 80-percent accuracy on Supreme Court decisions. The promise has not been fully delivered in the way the marketing suggested, but the underlying technology has become genuinely useful for a narrower set of questions than "who will win." Understanding the narrower set is the key to using these tools without being disappointed or misled.

Start with what actually works. Judge analytics tools like Lex Machina, Premonition, and Bloomberg Law's litigation analytics can tell you, for a given federal judge, the base rates at which they grant specific types of motions, the typical time to ruling, how they have ruled in comparable matters, and how often their decisions are reversed on appeal. This is statistically grounded information pulled from public dockets, and for litigators it is legitimately valuable. Knowing that the judge you drew grants summary judgment in 14 percent of patent cases versus a 28 percent baseline changes how you think about the motion practice strategy. None of that is a prediction about your case; it is a prior that informs your judgment. Treated as a prior, it is useful. Treated as a forecast, it is misleading.

Outcome prediction proper, meaning "will plaintiff win this case," works much better in aggregate than per-case. A tool can tell you, from a dataset of thousands of truck accident cases in Harris County, Texas, that plaintiffs recover in 61 percent of cases that go to verdict, that the median award is X, and that settlements cluster at roughly 30 percent of median verdict value. This information is useful for valuation and settlement strategy. It is not a prediction about your specific case, because your case has features the aggregate dataset cannot capture: the credibility of your client, the specific defense counsel, the strength of the medical causation evidence, the judge's mood on a given day, and the mood of a jury of twelve people who do not exist yet. The aggregate statistics are a prior; the work of litigation is assembling the evidence that will move a specific case away from that prior.

The academic literature on AI outcome prediction has gotten more honest over the past five years. Early papers reported eye-catching accuracy numbers by training models on features that were only available after the case was decided (a classic data leakage problem). Better papers from 2023 to 2025 that trained on pre-decision features report accuracy in the 60 to 70 percent range for specific case types, barely above the chance baseline for two-party disputes. The best-performing models use a mix of structured features (case type, court, judge, party types) and unstructured features (pleadings text, motion language) and hit higher accuracy on narrow case types like SSDI appeals or criminal sentencing (where the defendant has a limited set of outcomes and the features are relatively legible). None of the current tools hit accuracy levels that would let a litigator confidently tell a client "the AI says we win."

The emerging class of litigation prediction tools like Pre/Dicta and Premonition lean into the statistical framing rather than pretending to be oracles. Pre/Dicta, for instance, publishes methodology papers, reports confidence intervals alongside predictions, and is explicit that their outputs are probabilistic. This is the honest way to use prediction tools: as a second opinion that surfaces base rates you might have missed, not as a truth machine that replaces judgment. Used that way, they add real value to early case assessment and settlement negotiations, and they occasionally catch blind spots that a lawyer focused on their own case theory might miss.

Where to be careful. Do not use prediction tools to tell clients their odds of winning without a lot of caveats, because clients will remember the number and you will live with it. Do not use these tools for case selection in ways that create disparate impact on protected classes, because some of the training data reflects historical biases in the legal system and the tools can perpetuate them. Do not trust any tool whose methodology is not published or auditable. And remember that the most important predictive feature in most cases, the quality of the specific lawyers and witnesses, is not legible to any current tool and never enters the data.

The bottom line: AI can produce statistical priors about case outcomes that are useful for valuation, motion strategy, and settlement posture. AI cannot predict individual case outcomes with the accuracy the word "predict" implies in ordinary English. Use the tools for the narrower, real use case, and manage client expectations about what the numbers mean.

## Related Questions

- [Can AI actually do legal research?](/faq/can-ai-do-legal-research)
- [What's the future of AI in legal practice?](/faq/future-of-ai-in-law)
- [How much time does AI actually save lawyers?](/faq/time-saved-ai-legal)

## Recommended Tools

- [Lex Machina](/ai-tools/lex-machina) - Leading judge and litigation analytics platform.
- [Premonition](/ai-tools/premonition) - Lawyer and judge win-rate analytics.
- [Pre/Dicta](/ai-tools/pre-dicta) - Probabilistic litigation outcome prediction with published methodology.
