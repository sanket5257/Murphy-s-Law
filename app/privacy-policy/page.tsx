import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <section className="min-h-screen pt-32 bg-white text-black">
        {/* Header */}
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-migra mb-4 text-black">Privacy Policy</h1>
            <p className="font-montreal text-black/70 text-lg mb-4">
              Murphy also drafted his own Privacy Policy – and it fits perfectly with the Terms & Conditions, because he's a genius.
            </p>
            <p className="font-montreal text-black/70 text-lg">
              <strong>LEGAL STUFF</strong><br />
              Effective Date: January 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                At Murphy's Law, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our AI legal assistant services, whether on the free or paid version. By using our services, you agree to the terms outlined in this Privacy Policy.
              </p>
            </section>

            {/* Who We Are */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">1. Who We Are</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                Murphy's Law is an AI-powered legal assistant based in South Africa. We assist clients with answering legal queries, drafting agreements, and conducting legal research. Our goal is to make legal assistance accessible and affordable for everyone.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">2. Information We Collect</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                We collect and process personal data to provide, improve, and secure our services. The types of data we collect include:
              </p>
              
              <h3 className="text-xl font-migra mb-4 text-black">2.1. Personal Information:</h3>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Name, email address, and contact details (provided during account registration).</li>
                <li>Payment information (for paid version users).</li>
              </ul>

              <h3 className="text-xl font-migra mb-4 text-black">2.2. Legal Information:</h3>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Any legal queries, documents, or agreements you provide for processing or drafting purposes.</li>
              </ul>

              <h3 className="text-xl font-migra mb-4 text-black">2.3. Usage Data:</h3>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Information about how you interact with our platform, such as IP address, browser type, device information, and usage statistics.</li>
              </ul>

              <h3 className="text-xl font-migra mb-4 text-black">2.4. Cookies and Tracking Technologies:</h3>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>We use cookies and similar technologies to enhance user experience and collect analytical data.</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">3. How We Use Your Information</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                We use the information collected for the following purposes:
              </p>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li><strong>Service Delivery:</strong> To provide responses to legal queries, draft agreements, and conduct legal research.</li>
                <li><strong>Account Management:</strong> To manage your account, process payments, and provide customer support.</li>
                <li><strong>Service Improvement:</strong> To enhance the functionality and performance of our services.</li>
                <li><strong>Compliance:</strong> To comply with legal obligations, enforce our terms, and prevent misuse of the platform.</li>
              </ul>
            </section>

            {/* Data Sharing and Disclosure */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">4. Data Sharing and Disclosure</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                We do not sell your personal data to third parties. However, we may share your information in the following situations:
              </p>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in providing our services (e.g., payment processors or cloud service providers).</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights.</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information.</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">5. Data Security</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure storage, and regular security audits. However, no system is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">6. Your Rights</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                As a user, you have the following rights under South African data protection laws (e.g., POPIA):
              </p>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate or incomplete data.</li>
                <li><strong>Deletion:</strong> Request the deletion of your data, subject to legal obligations.</li>
                <li><strong>Restriction:</strong> Request that we limit the processing of your data.</li>
                <li><strong>Objection:</strong> Object to the processing of your data for certain purposes.</li>
              </ul>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                To exercise your rights, please contact us at tim@kvelld.co.za.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">7. Data Retention</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                We retain your data only as long as necessary to fulfil the purposes outlined in this policy or as required by law. For free version users, data may be anonymized and retained for analytical purposes. Paid version users' data is retained per their subscription agreement.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">8. Children's Privacy</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                Murphy's Law is not intended for use by individuals under the age of 18. We do not knowingly collect data from minors. If you believe a minor has provided us with personal data, please contact us immediately.
              </p>
            </section>

            {/* Changes to This Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">9. Changes to This Privacy Policy</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">10. Contact Us</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-black/5 p-6 rounded-lg border border-black/10">
                <p className="font-montreal text-black leading-relaxed mb-2">
                  <strong>Murphy's Law</strong>
                </p>
                <p className="font-montreal text-black/70 leading-relaxed mb-2">
                  28 6th Street, Wynberg, Sandton, 2191
                </p>
                <p className="font-montreal text-black/70 leading-relaxed mb-2">
                  tim@kvelld.co.za
                </p>
                <p className="font-montreal text-black/70 leading-relaxed">
                  Cell: 076 787 7637
                </p>
              </div>
              <p className="font-montreal text-black/70 leading-relaxed mt-6">
                By using Murphy's Law, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
              </p>
            </section>

          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}