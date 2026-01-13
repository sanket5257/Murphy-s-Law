import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-migra mb-4 text-white">Privacy Policy</h1>
          <p className="font-montreal text-white/70 text-lg">
            Last updated: January 13, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 pb-16">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">1. Introduction</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              Murphy's Law AI ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered legal assistance platform and related services (collectively, the "Service").
            </p>
            <p className="font-montreal text-white/70 leading-relaxed">
              By accessing or using our Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">2. Information We Collect</h2>
            
            <h3 className="text-xl font-migra mb-4 text-white">2.1 Personal Information</h3>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              We may collect the following types of personal information:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>Contact information (name, email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Professional information (law firm, practice area, bar admission details)</li>
              <li>Billing and payment information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-migra mb-4 text-white">2.2 Legal Documents and Content</h3>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              When you use our Service, we may collect:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>Legal documents you upload for review, analysis, or drafting</li>
              <li>Search queries and research requests</li>
              <li>Generated legal content and documents</li>
              <li>Case law research history</li>
              <li>Usage patterns and preferences</li>
            </ul>

            <h3 className="text-xl font-migra mb-4 text-white">2.3 Technical Information</h3>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Access times and pages viewed</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">3. How We Use Your Information</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>Provide and maintain our AI-powered legal assistance services</li>
              <li>Process legal document analysis, drafting, and research requests</li>
              <li>Improve our AI algorithms and service quality</li>
              <li>Authenticate users and prevent unauthorized access</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service-related communications and updates</li>
              <li>Provide customer support and technical assistance</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Detect and prevent fraud, abuse, or security incidents</li>
            </ul>
          </section>

          {/* Data Security and Protection */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">4. Data Security and Protection</h2>
            
            <h3 className="text-xl font-migra mb-4 text-white">4.1 Security Measures</h3>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>End-to-end encryption for data transmission and storage</li>
              <li>Multi-factor authentication for account access</li>
              <li>Regular security audits and penetration testing</li>
              <li>SOC 2 Type II compliance</li>
              <li>ISO 27001 certified data centers</li>
              <li>Role-based access controls and data segregation</li>
            </ul>

            <h3 className="text-xl font-migra mb-4 text-white">4.2 GDPR Compliance</h3>
            <p className="font-montreal text-white/70 leading-relaxed mb-6">
              With our technical team based in Sweden, we operate under GDPR — the world's strictest standard for data privacy. We ensure full compliance with European data protection regulations and provide comprehensive data subject rights.
            </p>
          </section>

          {/* Information Sharing and Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">5. Information Sharing and Disclosure</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li><strong className="text-white">Service Providers:</strong> With trusted third-party vendors who assist in operating our Service</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong className="text-white">Consent:</strong> When you have given explicit consent for specific sharing</li>
              <li><strong className="text-white">Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">6. Data Retention</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              We retain your information for as long as necessary to:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Improve our AI models and service quality (in anonymized form)</li>
            </ul>
            <p className="font-montreal text-white/70 leading-relaxed">
              Legal documents and research data are typically retained for 7 years in accordance with legal industry standards, unless you request earlier deletion.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">7. Your Rights and Choices</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li><strong className="text-white">Access:</strong> Request access to your personal information</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
              <li><strong className="text-white">Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong className="text-white">Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong className="text-white">Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong className="text-white">Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="font-montreal text-white/70 leading-relaxed">
              To exercise these rights, please contact us at privacy@murphyslawai.com.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">8. Cookies and Tracking Technologies</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>Maintain your login session and preferences</li>
              <li>Analyze usage patterns and improve our Service</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p className="font-montreal text-white/70 leading-relaxed">
              You can control cookie settings through your browser preferences. However, disabling certain cookies may limit your ability to use some features of our Service.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">9. Third-Party Services</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              Our Service may integrate with third-party services, including:
            </p>
            <ul className="font-montreal text-white/70 leading-relaxed mb-6 list-disc pl-6">
              <li>Legal databases and case law repositories</li>
              <li>Document management systems (DMS)</li>
              <li>Microsoft SharePoint integrations</li>
              <li>Payment processing services</li>
              <li>Analytics and monitoring tools</li>
            </ul>
            <p className="font-montreal text-white/70 leading-relaxed">
              These third-party services have their own privacy policies. We encourage you to review their privacy practices before using integrated services.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">10. International Data Transfers</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-6">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, including Standard Contractual Clauses approved by the European Commission.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">11. Children's Privacy</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-6">
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">12. Changes to This Privacy Policy</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-6">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our Service after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">13. Contact Us</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <p className="font-montreal text-white leading-relaxed mb-2">
                <strong>Murphy's Law AI</strong>
              </p>
              <p className="font-montreal text-white/70 leading-relaxed mb-2">
                Email: privacy@murphyslawai.com
              </p>
              <p className="font-montreal text-white/70 leading-relaxed mb-2">
                Data Protection Officer: dpo@murphyslawai.com
              </p>
              <p className="font-montreal text-white/70 leading-relaxed">
                Address: [Company Address]
              </p>
            </div>
          </section>

          {/* Jurisdiction */}
          <section className="mb-12">
            <h2 className="text-2xl font-migra mb-6 text-white">14. Governing Law</h2>
            <p className="font-montreal text-white/70 leading-relaxed mb-6">
              This Privacy Policy is governed by and construed in accordance with the laws of South Africa and the European Union General Data Protection Regulation (GDPR), without regard to conflict of law principles.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}