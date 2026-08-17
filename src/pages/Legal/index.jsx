import { Download, FileText } from "lucide-react";
import SEO from "../../components/common/SEO";
import config from "../../config";

const legalDocuments = {
  privacy: {
    title: "Privacy Policy",
    fileName: "privacy_policy.pdf",
    intro: [
      "This Privacy Policy explains how Autoways Pvt. Ltd. (“Autoways,” “we,” “us,” or “our”) collects, uses, shares, and protects information in connection with the Autoways Dealer Management System (“Autoways DMS” or the “Service”), which we use to manage vehicle sales, service, and inventory operations across our dealerships, including our system at dms.autoways.com.np and related support services.",
      "By purchasing a vehicle from us, bringing a vehicle in for service, requesting a quote, or otherwise sharing information with Autoways, you agree to the practices described in this policy. If you do not agree, please do not share your information with us.",
    ],
    sections: [
      {
        heading: "1. Who This Policy Applies To",
        paragraphs: ["This policy covers different groups of people, and it's important to understand the difference:"],
        bullets: [
          "Customers and clients: individuals and businesses who purchase, lease, or service a Toyota, Eicher, or Komatsu vehicle through Autoways, or who request a quote, test drive, financing, or maintenance appointment. For this information, Autoways acts as the data controller.",
          "Staff and authorized users: employees and contractors who use Autoways DMS in the course of their work to manage inventory, sales, and service records.",
          "Business partners: banks, financial institutions, and insurers who help arrange financing or insurance for your purchase, and vehicle manufacturers (Toyota, Eicher, Komatsu) involved in warranty and recall administration.",
        ],
      },
      {
        heading: "2. Information We Collect",
        groups: [
          {
            label: "Information you provide to us:",
            bullets: [
              "Contact details, such as your name, address, phone number, and email address.",
              "Identification details required for vehicle registration, financing, or warranty purposes, such as citizenship or identification numbers.",
              "Vehicle purchase, lease, and service history, including make, model, chassis/engine numbers, and maintenance records.",
              "Financing and payment details you share with us or that are shared with us by a lender on your behalf.",
              "Any information you provide when requesting a quote, test drive, trade-in valuation, or service appointment.",
            ],
          },
          {
            label: "Information collected automatically:",
            bullets: [
              "Usage data, such as login activity and feature usage within the Service, used to maintain and improve the Service.",
              "Device and browser information, including IP address, browser type, and operating system, collected when you access our systems or website.",
              "Cookies and similar tracking technologies used on our website for functionality and analytics purposes.",
            ],
          },
          {
            label: "Information from third parties:",
            bullets: [
              "Information from financial institutions or insurers involved in arranging your financing or insurance.",
              "Information from vehicle manufacturers relevant to warranty claims, service bulletins, or recall administration.",
            ],
          },
        ],
      },
      {
        heading: "3. How We Use Information",
        paragraphs: [
          "We use the information described above to process vehicle sales, leases, and service bookings; maintain vehicle and customer records for warranty, recall, and servicing purposes; process financing and payment arrangements; and communicate with you about your purchase, service appointments, or account.",
          "We also use it to maintain security and prevent misuse of the Service, including monitoring for unauthorized access and enforcing user permissions; to meet legal and regulatory obligations, including recordkeeping requirements under applicable Nepalese law; and to improve our Service using aggregated and de-identified usage patterns.",
          "We market our services only where you've requested information or consented to receive it, such as by requesting a quote or test drive. We do not sell personal information to third parties.",
        ],
      },
      {
        heading: "4. How Information Is Shared",
        paragraphs: ["We share information with:"],
        bullets: [
          "Service providers who support our operations, such as cloud hosting providers, who are contractually required to protect your data.",
          "Financial institutions and insurers involved in your purchase or financing, where you have requested or consented to this.",
          "Vehicle manufacturers (Toyota, Eicher, Komatsu) for warranty registration, service bulletins, recalls, and quality reporting.",
          "Staff within Autoways, based on their role and the permissions needed to serve you.",
          "Government authorities or regulators, when required by law, or to establish, exercise, or defend legal claims.",
        ],
        after: ["We do not share your personal information with unrelated third parties for their own marketing purposes."],
      },
      {
        heading: "5. Data Security",
        paragraphs: [
          "We take reasonable technical and organizational measures to protect information processed through the Service, including access controls and user permission settings, secure storage of sensitive business and customer documents, and audit tracking to help maintain accurate records.",
          "No method of storage or transmission is completely secure, and we cannot guarantee absolute security. If we become aware of a security incident affecting your data, we will take appropriate steps to notify affected individuals in accordance with applicable law.",
        ],
      },
      {
        heading: "6. Data Retention",
        paragraphs: ["We retain customer and vehicle information for as long as necessary to service your vehicle, honor warranty obligations, and meet legal, accounting, tax, or regulatory recordkeeping requirements under applicable Nepalese law. When information is no longer needed for these purposes, we take reasonable steps to delete or anonymize it."],
      },
      {
        heading: "7. Your Rights",
        paragraphs: ["Depending on applicable law, you may have rights regarding your personal information, including the right to request access, request correction of inaccurate information, request deletion, or object to certain types of processing. You can direct such requests to us using the contact details below, and we will respond in accordance with applicable law."],
      },
      {
        heading: "8. Cookies and Tracking Technologies",
        paragraphs: ["Our website uses cookies and similar technologies to keep the website functioning properly and to understand how visitors use our website. You can control cookie preferences through your browser settings."],
      },
      {
        heading: "9. Data Storage and Transfers",
        paragraphs: [
          "Autoways DMS runs on our own in-house internal servers, which are maintained and secured by our internal technical team. Day-to-day processing of your information takes place on these internal servers located in Nepal, not on third-party cloud infrastructure.",
          "For data protection and business continuity purposes, we maintain backup copies of this information on cloud storage, which may be located outside Nepal. These backups are used solely for disaster recovery and backup purposes, not for ongoing processing of your information. Where backup data is stored internationally, we take reasonable steps to ensure it continues to be protected and handled in accordance with this policy and applicable law.",
        ],
      },
      {
        heading: "10. Children's Privacy",
        paragraphs: ["Autoways DMS is a business tool intended for use by our staff and adult customers, and is not directed at children. We do not knowingly collect personal information from children."],
      },
      {
        heading: "11. Contact Us",
        paragraphs: ["If you have questions about this Privacy Policy or how your information is handled, please contact us at:"],
        bullets: [
          "Email: it@autoways.com.np",
          "Address: Autoways Pvt. Ltd., Nayabazar Road, Pokhara, Gandaki Province, Nepal",
        ],
        note: "[Note: please confirm the contact email and registered address above before publishing this policy.]",
      },
      {
        heading: "12. Changes to This Policy",
        paragraphs: ["We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy with a revised “Last updated” date. Continued use of the Service after changes take effect constitutes acceptance of the updated policy."],
      },
    ],
  },
  terms: {
    title: "Terms and Conditions",
    fileName: "tos.pdf",
    intro: [
      "These Terms and Conditions (“Terms”) govern access to and use of the Autoways Dealer Management System (“Autoways DMS” or the “Service”), an internal system owned and operated by Autoways Pvt. Ltd. (“Autoways,” “we,” “us,” or “our”) to manage its dealership operations. By accessing or using the Service, you (“User,” “you,” or “your”) agree to be bound by these Terms.",
      "Access to Autoways DMS is limited to authorized employees, contractors, and other personnel who have been granted access by Autoways in connection with their role. If you do not agree to these Terms, do not access or use the Service.",
    ],
    sections: [
      {
        heading: "1. Description of Service",
        paragraphs: ["Autoways DMS is an internal dealer management system that helps Autoways manage vehicle sales, service, inventory, logistics, customer records, and related business operations across its Toyota, Eicher, and Komatsu dealership activities. Specific features and functionality may be added, changed, or discontinued over time at our discretion, and we will provide reasonable notice of any material changes that affect your use of the Service."],
      },
      {
        heading: "2. Account Registration and Access",
        bullets: [
          "Access to the Service is granted individually to authorized personnel and is not transferable.",
          "You must provide accurate and complete information when your account is set up, and keep your login credentials confidential.",
          "You are responsible for all activity that occurs under your account.",
          "You agree to notify your supervisor or the IT team promptly of any unauthorized use of your account or any other security concern you become aware of.",
          "Access to the Service is granted in connection with your employment or engagement with Autoways and may be modified, restricted, or revoked at our discretion, including upon a change in your role or the end of your employment or engagement.",
        ],
      },
      {
        heading: "3. Access to the Service",
        paragraphs: [
          "Autoways DMS is an internal business tool. It is provided to authorized users at no charge as part of their employment or engagement with Autoways, and is not sold, licensed, or made available to external organizations or individuals.",
          "Autoways reserves the right to determine, at its discretion, which personnel or roles are granted access to the Service, and to withdraw or adjust that access at any time.",
        ],
      },
      {
        heading: "4. Data in the Service",
        paragraphs: [
          "All business, customer, and vehicle data entered into or generated by the Service (“Service Data”), including inventory records, customer information, and sales and service history, is owned by Autoways. Handling of personal information within Service Data is governed by the Autoways DMS Privacy Policy.",
          "You are responsible for the accuracy of information you enter into the Service, and for entering and handling customer information in accordance with Autoways policies and applicable law.",
          "If your access to the Service ends, Autoways will retain Service Data in accordance with its data retention practices; you should not expect to independently export or retain copies of Service Data after your access ends, except as authorized by Autoways.",
        ],
      },
      {
        heading: "5. Acceptable Use",
        paragraphs: ["You agree not to:"],
        bullets: [
          "Use the Service for any unlawful purpose or in violation of any applicable law or regulation.",
          "Attempt to gain unauthorized access to the Service, other accounts, or any systems or networks connected to the Service, including records outside the scope of your role.",
          "Interfere with or disrupt the integrity or performance of the Service, including through introducing malware or attempting to overload our systems.",
          "Reverse engineer, decompile, or attempt to extract the source code of the Service, except where applicable law expressly permits it.",
          "Enter, store, or transmit any content that is unlawful, inaccurate, or violates the rights of any third party.",
          "Share your access credentials with, or provide access to the Service to, any person not authorized by Autoways.",
        ],
        after: ["Autoways reserves the right to suspend or terminate access to the Service for any user found to be in violation of these Terms."],
      },
      {
        heading: "6. Intellectual Property",
        paragraphs: [
          "The Service, including its underlying software, design, features, and documentation, is owned by Autoways Pvt. Ltd. and protected by applicable intellectual property laws.",
          "These Terms grant you a limited, non-exclusive, non-transferable right to access and use the Service for Autoways' internal business operations, for as long as you remain an authorized user. No other rights are granted.",
          "Any feedback or suggestions you provide regarding the Service may be used by Autoways without restriction or obligation to you.",
        ],
      },
      {
        heading: "7. Service Availability",
        paragraphs: ["We aim to maintain reliable access to the Service, but we do not guarantee uninterrupted or error-free operation. Scheduled maintenance, updates, and occasional unplanned downtime may affect availability. Where possible, we will provide advance notice of planned maintenance windows."],
      },
      {
        heading: "8. Disclaimer of Warranties",
        paragraphs: ["The Service is provided on an “as is” and “as available” basis. To the fullest extent permitted by applicable law, Autoways disclaims all warranties, whether express or implied, including any implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be free of errors or interruptions."],
      },
      {
        heading: "9. Term and Termination",
        paragraphs: [
          "Your right to access the Service continues for as long as you remain an authorized user in accordance with your employment or engagement with Autoways.",
          "Autoways may suspend or terminate your access immediately if you materially breach these Terms, or upon the end of your employment or engagement, or at our discretion for legitimate business reasons, with or without notice where circumstances require.",
        ],
      },
      {
        heading: "10. Limitation of Liability",
        paragraphs: ["To the fullest extent permitted by applicable law, Autoways will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for gross negligence or willful misconduct."],
      },
      {
        heading: "11. Indemnification",
        paragraphs: ["You agree to indemnify and hold Autoways harmless from any claims, damages, or expenses arising from your breach of these Terms, your misuse of the Service, or your violation of any applicable law in connection with your use of the Service."],
      },
      {
        heading: "12. Confidentiality",
        paragraphs: ["Information accessed through the Service, including customer records and business data, is confidential. You agree to protect this information using reasonable care, and not to disclose it except as necessary to perform your role or as required by law."],
      },
      {
        heading: "13. Modifications to These Terms",
        paragraphs: ["We may update these Terms from time to time to reflect changes in the Service, legal requirements, or our business practices. We will provide reasonable notice of material changes. Continued use of the Service after changes take effect constitutes acceptance of the updated Terms."],
      },
      {
        heading: "14. Governing Law",
        paragraphs: ["These Terms are governed by the laws of the Government of Nepal, without regard to conflict of law principles. Any disputes arising from these Terms will be resolved through the applicable internal grievance process, or in the courts of Nepal."],
      },
    ],
  },
};

const LegalPage = ({ document }) => {
  const { title, fileName, intro, sections } = legalDocuments[document];
  const downloadUrl = `${config.assetUrl}/assets/pdf/legal/${fileName}`;

  return (
    <main className="min-h-screen bg-primary text-secondary">
      <SEO
        title={title}
        description={`${title} for the Autoways Dealer Management System.`}
        url={`/${document === "privacy" ? "privacy" : "terms"}`}
        type="article"
      />

      <section className="border-b border-secondary/15 bg-primary-autoways px-4 py-12 text-primary-autoways sm:px-6 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{title}</h1>
              <p className="mt-3 text-base text-primary/75 sm:text-lg">Autoways Dealer Management System (Autoways DMS)</p>
              <p className="mt-1 text-sm text-primary/60">Last updated: August 14, 2026</p>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="max-w-[75ch] text-[0.98rem] leading-7 text-secondary/80 sm:text-base">
          {intro.map((paragraph) => <p key={paragraph} className="mb-5">{paragraph}</p>)}
        </div>

        <div className="mt-12 space-y-11">
          {sections.map((section) => (
            <section key={section.heading} className="max-w-[75ch] scroll-mt-8">
              <h2 className="text-xl font-bold tracking-[-0.015em] text-secondary sm:text-2xl">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-secondary/80">{paragraph}</p>)}
              {section.groups?.map((group) => (
                <div key={group.label} className="mt-5">
                  <p className="leading-7 text-secondary/80">{group.label}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-secondary/80 marker:text-accent">
                    {group.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-secondary/80 marker:text-accent">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.after?.map((paragraph) => <p key={paragraph} className="mt-5 leading-7 text-secondary/80">{paragraph}</p>)}
              {section.note && <p className="mt-5 text-sm italic leading-6 text-secondary/65">{section.note}</p>}
            </section>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-3 border-t border-secondary/15 pt-7 text-sm text-secondary/65">
        <a
              href={downloadUrl}
              download
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
            <FileText size={18} aria-hidden="true" />
              Download PDF
            </a>
        </div>
      </article>
    </main>
  );
};

export const PrivacyPolicy = () => <LegalPage document="privacy" />;
export const TermsAndConditions = () => <LegalPage document="terms" />;
