---
type: blog
title: "Data Privacy in Legal AI: Is Your Client Info Safe?"
slug: "legal-ai-data-privacy"
date: "2026-04-12"
author: "AttorneyAITools Editorial Team"
tags: [legal-ai, trends, analysis]
description: "A partner-level guide to legal AI data privacy. Vendor architectures, GDPR/CCPA compliance, privilege risks, and a 15-point vendor evaluation checklist."
reading_time: "12 min"
---

# Data Privacy in Legal AI: Is Your Client Info Safe?

The most consequential conversation in legal AI is not about capability. It is about confidentiality. Every lawyer who pastes a draft contract into ChatGPT, uploads a deposition into an AI summarizer, or asks Claude to analyze a client email is making a data privacy decision. Most of them are making that decision without understanding what actually happens to the data on the other side of the API call, which vendor sees it, how long it is stored, whether it feeds a training run, and who is legally liable if it leaks.

This piece is written for the lawyer who has to answer these questions for a risk committee, a general counsel, a malpractice carrier, or a skeptical client. It is not a sales pitch for any vendor. It is an honest look at what the actual architectures are, where the risks live, how the major tools compare, and what a defensible vendor evaluation process looks like in 2026. Include the checklist at the end in your next vendor due diligence cycle. It will survive contact with procurement.

## The Core Risk: Training Data Leakage and What It Actually Means

Start with the technical truth. Large language models are trained on enormous corpora of text. When you send a prompt to a foundation model, two things can happen to your input. First, it can be used to generate a response and then discarded, never persisted, never used for any other purpose. Second, it can be logged, stored, and potentially used in some form to improve the model, fine-tune a variant, train safety filters, or support abuse monitoring. Which of these actually happens depends entirely on the contract between the vendor and the customer, and on the technical controls the vendor has in place.

The most-cited fear is that confidential client information will end up in a future version of the model and surface in another user's output. This is technically possible with poorly configured systems but is not the most likely failure mode. More common failure modes include logs being accessed by support engineers, data being stored longer than necessary and exposed in a breach, prompts being retained for abuse monitoring and reviewed by human annotators, data being sent to subprocessors in jurisdictions with different privacy regimes, and the user's own firm failing to restrict who inside the firm can see which prompts and outputs.

None of these risks are unique to AI. They exist in every cloud software deployment. What is unique is the pace at which legal AI is being adopted, the sensitivity of the underlying data, and the absence of well-established norms for what good vendor behavior looks like. The result is that every firm has to do its own due diligence, and most firms are doing it badly.

## How the Major Legal AI Tools Actually Handle Client Data

The big distinction in vendor architecture is between consumer-grade foundation model APIs, which come with default terms that were never designed for privileged material, and enterprise legal AI platforms, which wrap those APIs in data isolation, contractual protections, and deployment models designed for regulated industries. Here is the state of play as of early 2026.

**Harvey AI.** [Harvey](/ai-tools/harvey-ai) runs as an enterprise tenant on top of OpenAI's Azure-hosted models. Each law firm customer gets an isolated environment with contractual commitments that prompts and completions are not used for model training, are not accessible to OpenAI personnel outside narrow abuse review, and are logged only to the extent required for the firm's own audit and governance. Harvey offers BAAs to customers with covered-entity obligations and has published details on its data handling architecture in response to customer procurement questionnaires. Data residency options exist for European and UK customers. Firms deploying Harvey still need to configure their own internal access controls and retention policies, but the vendor baseline is among the strongest in the market.

**Casetext CoCounsel.** [CoCounsel](/ai-tools/casetext-ai), now owned by Thomson Reuters, runs in a Thomson Reuters-managed cloud tenant with explicit no-training commitments and SOC 2 Type II certification. Thomson Reuters brings decades of experience handling confidential legal research data through Westlaw, and that institutional experience shows in the detail of its privacy and security documentation. Data is encrypted at rest and in transit, subprocessor lists are disclosed, and the company offers enterprise data protection agreements with indemnification for privacy breaches. Data residency is available in multiple regions.

**LegalOn.** [LegalOn](/ai-tools/legalon) markets itself heavily to compliance-sensitive corporate legal departments and has built its architecture around customer trust. LegalOn uses a private deployment model with customer data isolated per tenant, no use of customer content for training, and SOC 2 and ISO 27001 certifications. LegalOn has historically been strong in Japan and has invested heavily in APPI compliance, and has more recently expanded GDPR and US-oriented controls as it scaled internationally.

**Kira Systems.** [Kira Systems](/ai-tools/kira-systems), now part of Litera, is a contract analysis platform with a longer history than the generative AI wave. Kira's models are trained on its own curated data, not on customer documents by default, and customer deployments are isolated. Kira offers on-premises deployment as an option for the most privacy-sensitive customers, which is increasingly rare in the AI space. For firms that cannot accept any cloud deployment of customer data, Kira's on-prem option is a meaningful differentiator.

**General-purpose chatbots.** Consumer ChatGPT, Claude.ai, Gemini, and similar products are not appropriate for client-confidential information unless you are using the enterprise or team tiers with explicit data protection terms, and even then the risk profile is worse than a legal-specific platform. Never paste privileged material into a consumer AI product. If you or anyone on your team is doing this, stop today.

The gap between a tool like Harvey or CoCounsel and a raw consumer chatbot is enormous. It is measured in contractual protections, architectural isolation, regulatory certifications, and the simple fact that legal-specific platforms have been built with the assumption that every input is privileged. Consumer products have not.

## GDPR and CCPA Compliance: What Lawyers Actually Need to Know

The two regulatory frameworks that matter most for US firms using legal AI are the EU General Data Protection Regulation and the California Consumer Privacy Act, now expanded into the California Privacy Rights Act. Both impose real obligations on firms that handle personal data of regulated subjects, and both treat AI processing as an area of heightened risk.

Under GDPR, if your firm represents EU data subjects or processes personal data in the EU, you are a controller or joint controller with any AI vendor you use. You must have a lawful basis for processing, a data processing agreement with the vendor, a documented legitimate interest or consent basis, and appropriate technical and organizational measures. The EU AI Act, which began phasing in through 2024 and 2025, adds further obligations for high-risk AI systems, including most legal applications that make or support decisions about individuals. Firms deploying AI in European matters should have a written AI use policy, a data protection impact assessment for each substantial deployment, and DPAs with every vendor.

Under CCPA and CPRA, California residents have rights of notice, access, deletion, and opt-out with respect to personal information processed by businesses. Law firms were traditionally exempt from many CCPA obligations, but the exemption is narrower than most lawyers assume, and the expansion of CPRA has pulled many firms into scope. If you use AI to process client data that includes California residents' personal information, you need to ensure your vendor commitments support those rights.

The practical upshot is that your AI vendor must support data subject rights, honor deletion requests, disclose subprocessors, maintain records of processing, and carry appropriate technical safeguards. Any vendor that cannot meet these requirements is not enterprise ready, period.

## Attorney Client Privilege Implications

The most important privacy concept in legal AI is not GDPR or CCPA. It is attorney-client privilege. Every state bar in the United States treats the confidentiality of client communications as one of the core duties of lawyering, and the privilege itself is an evidentiary protection that can be destroyed by careless disclosure.

The open legal question is whether sending client information to a third-party AI vendor constitutes a disclosure that waives privilege. The consensus answer, supported by ABA Formal Opinion 512 and parallel state bar opinions, is that privilege is preserved when the vendor relationship is structured like any other confidential service provider relationship. The vendor must have a duty of confidentiality to the firm, must not use the data for unauthorized purposes, must protect it with appropriate safeguards, and must be engaged under a written agreement that reflects these obligations. This is the same framework that has long governed outsourced transcription services, cloud backup providers, and outside copy shops.

What this means in practice is that using a legal-specific AI platform under a proper enterprise agreement does not waive privilege. Using a consumer chatbot with default terms might, because the default terms typically do not include the kind of confidentiality duty and usage restrictions that privilege preservation requires. This is not a settled legal question in every jurisdiction, and the cautious position is to treat consumer chatbot usage as presumptively privilege-destroying until courts say otherwise.

Your engagement letters should address AI usage. Your client should know, in general terms, that you use AI tools in your practice, what vendors you use, and that appropriate safeguards are in place. Some sophisticated clients are now demanding specific vendor disclosure in outside counsel guidelines. Expect this to become more common.

## Due Diligence Checklist: 18 Questions to Ask Every Legal AI Vendor

Procurement teams at risk-aware firms use questionnaires that run to dozens of pages. Here is a tight 18-question core checklist that covers the issues that actually matter. Every vendor should answer each question in writing, ideally in a single document you can share with your risk committee and malpractice carrier.

1. **Model provenance.** Which underlying foundation models does your product use, and are they hosted by your company or by a third-party provider like OpenAI, Anthropic, or Google? If third-party, what is your contractual relationship with them with respect to data handling?

2. **Tenant isolation.** How is customer data isolated between tenants? Is isolation logical, physical, or both? Can you demonstrate that one customer's data cannot be accessed by another customer's users under any circumstances?

3. **Training use.** Is customer prompt, completion, or document data ever used to train, fine-tune, or otherwise improve any model, yours or a third party's? If yes, under what conditions, and can the customer opt out?

4. **Data retention.** How long are prompts, completions, uploaded documents, and logs retained? Is the retention period configurable by the customer? What is the default?

5. **Subprocessors.** Who are your subprocessors, where are they located, and what data do they have access to? How do you notify customers of subprocessor changes?

6. **Data residency.** Where is customer data stored and processed? Can customers require storage and processing in specific jurisdictions, such as the EU or the US, for regulatory compliance?

7. **Encryption.** How is customer data encrypted at rest and in transit? What key management practices do you use? Can customers bring their own keys?

8. **Access controls.** Who inside your company can access customer data under what circumstances? Is there logging and audit trail for every internal access? Are internal accesses subject to customer notification?

9. **Human review.** Under what circumstances, if any, do human reviewers see customer prompts or outputs? Does this include contractors, vendors, or offshored staff?

10. **Certifications.** What security and privacy certifications have you achieved? SOC 2 Type II is the minimum. ISO 27001 is expected. HIPAA, FedRAMP, and similar certifications are relevant in specific contexts.

11. **Incident response.** What is your breach notification policy and timeline? Under what contractual terms do you notify customers of security incidents? Will you indemnify customers for breach-related losses?

12. **Deletion.** How do customers delete their data? Is deletion verified and irreversible? What about data in backups, logs, and subprocessor systems? Is there a written deletion process?

13. **Compliance with data protection law.** Do you offer a data processing agreement compliant with GDPR, UK GDPR, CCPA, and equivalent laws? Are you prepared to sign the EU standard contractual clauses?

14. **Audit rights.** Do customers have the right to audit your security and privacy practices, either directly or through a third party, on reasonable notice?

15. **Indemnification.** Do you indemnify customers against third-party claims arising from the vendor's breach of its privacy obligations or from AI-generated output that infringes intellectual property rights?

16. **Output rights and IP.** Who owns the outputs generated by your product? Are customers free to use them without further license? Are customers responsible for verifying accuracy?

17. **Logging and customer visibility.** Can customers see what their users are doing with the product? Are usage logs exportable to the customer's SIEM? Does the product support role-based access control?

18. **Exit and portability.** If a customer terminates, how is their data returned or destroyed? Is there a documented offboarding process? Is there a reasonable window in which the customer can export their data?

Any vendor that hesitates on more than two or three of these questions should not be deployed with privileged material. A vendor that has good answers to all eighteen is ready to be evaluated on the basis of its product features.

## Red Flags to Watch

Some warning signs that a vendor is not ready for enterprise legal deployment.

**Vague training language.** If the privacy policy says customer data "may be used to improve services" without defining what that means, treat it as a no-go.

**No enterprise agreement.** If the only terms available are the consumer terms of service, the vendor is not set up for your use case.

**Unknown subprocessors.** If the vendor will not tell you who sees the data downstream, assume the answer is uncomfortable.

**No certifications.** SOC 2 Type II should be table stakes for any vendor handling privileged material. Its absence is a red flag.

**No breach notification commitments.** If the vendor will not commit in writing to timely breach notification, you will find out about your own breach from the newspaper.

**Vague data residency.** If the vendor cannot tell you where data is stored and processed, you cannot meet GDPR or jurisdictional obligations.

**Reluctance to indemnify.** Indemnification pushes back against the vendor in ways that align incentives with customer risk. A vendor that refuses to indemnify for its own breaches is telling you something.

**No deletion mechanism.** Clients have rights. Your vendor must support them or you cannot.

## Frequently Asked Questions

**Can I use ChatGPT for client work if I turn off chat history?**
Turning off history is a partial mitigation but does not convert a consumer product into an enterprise-grade, privilege-preserving service. For client-confidential work, use a legal-specific platform with an enterprise agreement.

**Does using legal AI waive attorney-client privilege?**
Not if the vendor is engaged under an appropriate confidentiality and data protection agreement that mirrors the standards applied to any other confidential service provider. Under consumer default terms, the analysis is much more uncertain, and caution is warranted.

**Do I need a data processing agreement with my AI vendor?**
If you process personal data subject to GDPR, UK GDPR, or similar laws, yes. In practice, you should have a DPA in place with any AI vendor regardless, because privacy law is moving quickly and coverage is expanding.

**How often should I re-evaluate my vendors?**
At least annually, and immediately when there is a material change in the vendor's ownership, subprocessor list, or product architecture.

**What is the most important thing to check?**
Training data usage. Ensure in writing that your prompts, completions, and documents are not used for model training under any circumstances without your explicit consent.

**Which legal AI tools should I start with if privacy is my top concern?**
[Harvey AI](/ai-tools/harvey-ai), [Casetext CoCounsel](/ai-tools/casetext-ai), [LegalOn](/ai-tools/legalon), and [Kira Systems](/ai-tools/kira-systems) are all built with enterprise privacy assumptions and offer the contractual protections privileged material requires. All four publish substantial security documentation that you can review as part of due diligence.

## Conclusion

Legal AI is worth using. The productivity gains are real, the competitive pressure is real, and the tools have matured enough to be deployed safely in serious practice. But they must be deployed thoughtfully. The difference between a firm that uses AI defensibly and a firm that creates a breach incident, a privilege waiver, or a client relationship crisis is the quality of its vendor due diligence, its written AI use policy, and its ongoing governance. Use the checklist above, ask the uncomfortable questions, get the answers in writing, and you will be in the top quartile of firms on this dimension. That is a good place to be, because the regulators, the clients, and the malpractice carriers are all paying attention.
