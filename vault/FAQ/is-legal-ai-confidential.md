---
type: faq
question: "Is legal AI confidential and attorney-client privileged?"
slug: "is-legal-ai-confidential"
category: "ai-ethics"
date: "2026-04-12"
description: "Is legal AI confidential? How attorney-client privilege, work product, and vendor data practices interact when lawyers use AI tools on client matters."
related_tools: ["harvey-ai", "lexis-ai", "casetext-cocounsel"]
---

# Is Legal AI Confidential and Attorney-Client Privileged?

## Short Answer

It depends on the vendor, the contract, and how the tool is used. Enterprise legal AI products from reputable vendors can preserve confidentiality when configured correctly and covered by a BAA-equivalent data processing agreement. Attorney-client privilege, as a legal doctrine, is a separate question and is not automatically destroyed by AI use, though careless deployment can raise waiver arguments. Free and consumer-tier tools should be treated as public channels.

## Full Answer

There are two different questions tangled together in "is legal AI confidential." The first is whether the vendor will keep your inputs private: a factual and contractual question. The second is whether feeding client information to an AI tool waives attorney-client privilege or work-product protection: a legal doctrine question. They have different answers and need to be analyzed separately.

On the factual side, confidentiality depends on the tier of product you are using. Enterprise legal AI platforms like Harvey, CoCounsel, Lexis+ AI, and Westlaw Precision AI sell themselves in part on their data practices. A properly negotiated enterprise contract will commit the vendor to not training on your inputs, to encrypting data at rest and in transit, to restricting access to named personnel, to deleting content on your schedule, and to notifying you of any security incident. Most also have SOC 2 Type 2 reports, penetration testing, and in some cases ISO 27001 certification. These commitments are real and enforceable, and they put enterprise legal AI on roughly the same footing as any other cloud-based legal technology you already trust with client data.

Consumer tiers are a different story. Free ChatGPT, free Claude, free Gemini, and the many small-vendor wrappers that proxy through them do not give you the same contractual posture. Inputs may be used for training, may be reviewed by human labelers for quality monitoring, and may be retained longer than you would prefer. A lawyer who pastes a client's settlement demand into free ChatGPT is not committing malpractice in any black-letter sense, but is creating a situation where, if asked on cross-examination "did you share your client's confidential strategy with a third party," the honest answer is yes. State bar ethics committees have been increasingly willing to call this a violation of Rule 1.6.

On the legal doctrine side, the analysis is more nuanced and less settled. Attorney-client privilege protects confidential communications between lawyer and client made for the purpose of seeking or providing legal advice. Work-product protection covers materials prepared in anticipation of litigation. Neither doctrine automatically evaporates because a lawyer uses a technology tool to process protected material. You do not waive privilege by running client documents through Westlaw, or by storing them on Microsoft 365, or by having your assistant type them. The reasoning is that these vendors are functionally part of the lawyer's own operation, bound by confidentiality, and not adverse parties or disinterested third parties.

AI tools at the enterprise tier fit comfortably in that same analytical frame. Courts that have considered AI-adjacent technology confidentiality questions have generally applied the same "is the vendor contractually obligated and functionally internal" test they apply to any other cloud vendor. The doctrinal risk becomes real in two situations. First, when the AI vendor's terms allow it to use inputs to train models that will then produce outputs for third parties, because at that point information about your client could surface in someone else's response. Second, when the lawyer cannot describe with any specificity what the vendor does with the data. Courts and bar committees are both skeptical of "we trust the vendor" as a confidentiality analysis, and so is your malpractice carrier.

Work-product protection has its own wrinkles. If you use AI to generate a litigation memo analyzing the opposing side's case, the memo is work product. If you then paste the memo back into a consumer AI tool to get a second opinion, you have arguably disclosed work product to a third party. Whether that is a waiver depends on the specific terms of the tool and the jurisdiction's waiver doctrine. The safer practice is to do all work-product-sensitive AI work inside a single enterprise environment whose confidentiality posture you have verified, and not to shuttle materials between tools.

Practical takeaways for confidentiality and privilege. Pick an enterprise tool with written confidentiality commitments. Read the data processing addendum, not just the marketing page. Make sure the contract disables training on your inputs and commits to deletion on request. Document your confidentiality analysis for each tool in a short internal memo, so that if you are ever asked, you have a contemporaneous record of the diligence you did. Train staff to use only approved tools for client information. Treat free tiers as public. And remember that ABA Formal Opinion 512 makes the duty of technological competence explicit: "I didn't know" is not a defense a 2026 ethics panel will accept.

## Related Questions

- [Is ChatGPT safe for lawyers to use?](/faq/is-chatgpt-safe-for-lawyers)
- [Is it ethical for lawyers to use AI?](/faq/is-ai-ethical-for-lawyers)
- [Does malpractice insurance cover AI mistakes?](/faq/does-insurance-cover-ai-mistakes)

## Recommended Tools

- [Harvey AI](/ai-tools/harvey-ai) - Enterprise platform with strong contractual confidentiality posture.
- [Lexis+ AI](/ai-tools/lexis-ai) - Covered by existing Lexis enterprise agreements.
- [CoCounsel](/ai-tools/casetext-cocounsel) - Thomson Reuters contractual protections.
