import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 bg-white text-black">
        {/* Header */}
        <div className="py-16 px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-migra mb-4 text-black">Terms & Conditions</h1>
            <p className="font-montreal text-black/70 text-lg mb-4">
              Murphy drafted his own T's & C's – just one example of the many things he is capable of.
            </p>
            <p className="font-montreal text-black/70 text-lg">
              <strong>A LEGAL DISCLAIMER</strong>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                Welcome to Murphy's Law, your AI legal companion. By accessing or using our services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our platform.
              </p>
            </section>

            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Overview</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                Murphy's Law is an AI-powered legal assistant based in South Africa, designed to assist users with answering legal queries, drafting agreements, and conducting legal research. Our services are offered through both free and paid versions.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Acceptance of Terms</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                By using Murphy's Law, you acknowledge that you have read, understood, and agree to these Terms and Conditions. If you do not agree, you may not use our services.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Eligibility</h2>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>You must be at least 18 years old to use our services.</li>
                <li>By using Murphy's Law, you represent that you have the legal capacity to enter into binding agreements.</li>
              </ul>
            </section>

            {/* Services Provider */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Services Provider</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                Murphy's Law provides the following services:
              </p>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li><strong>Legal Queries:</strong> General guidance based on South African laws.</li>
                <li><strong>Drafting Agreements:</strong> Assistance with creating contracts and legal documents.</li>
                <li><strong>Legal Research:</strong> Summaries of legal concepts and case law.</li>
              </ul>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                Our AI is a tool for informational purposes and does not constitute legal advice. Always consult a qualified attorney for specific legal issues.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">User Responsibilities</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                By using Murphy's Law, you agree to:
              </p>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Provide accurate and truthful information when using the platform.</li>
                <li>Use the services for lawful purposes only.</li>
                <li>Not misuse, exploit, or reverse-engineer our platform or AI tools.</li>
                <li>Not rely solely on Murphy's Law for critical or high-stakes legal matters.</li>
              </ul>
            </section>

            {/* Free and Paid Version */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Free and Paid Version</h2>
              
              <h3 className="text-xl font-migra mb-4 text-black">6.1 Free Version:</h3>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Access to basic legal query assistance.</li>
                <li>Limited features compared to the paid version.</li>
              </ul>

              <h3 className="text-xl font-migra mb-4 text-black">6.2 Paid Version:</h3>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Access to advanced features, including more comprehensive document drafting and detailed legal research.</li>
                <li>Subscription fees apply, as outlined on our website.</li>
              </ul>
            </section>

            {/* Payments and Refunds */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Payments and Refunds</h2>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Payments for the paid version are processed through secure third-party payment gateways.</li>
                <li>Subscription fees are non-refundable except as required by applicable law.</li>
                <li>Users may cancel subscriptions at any time, but no refunds will be issued for unused portions of the subscription term.</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Limitation of Liability</h2>
              <ul className="font-montreal text-black/70 leading-relaxed mb-6 list-disc pl-6">
                <li>Murphy's Law is provided "as is" and "as available."</li>
                <li>We do not guarantee the accuracy, reliability, or completeness of the information provided by the AI.</li>
                <li>To the extent permitted by law, Murphy's Law and its affiliates are not liable for any damages, losses, or claims arising from your use of the platform, including but not limited to:</li>
                <ul className="list-disc pl-6 mt-2">
                  <li>Misuse of drafted documents.</li>
                  <li>Service interruptions or technical issues.</li>
                  <li>Incorrect or incomplete legal information.</li>
                </ul>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Intellectual Property</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                All content, features, and functionality on Murphy's Law, including but not limited to text, graphics, code, and software, are the intellectual property of Murphy's Law and are protected by copyright and other applicable laws.
              </p>
            </section>

            {/* Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Privacy Policy</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                Your use of Murphy's Law is governed by our Privacy Policy, which outlines how we collect, use, and safeguard your personal information. By using our services, you agree to the terms of the Privacy Policy.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Termination</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                We reserve the right to suspend or terminate your access to Murphy's Law at any time without prior notice if you violate these Terms and Conditions or engage in unlawful or inappropriate behaviour.
              </p>
            </section>

            {/* Modification of Terms & Conditions */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Modification of Terms & Conditions</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                Murphy's Law reserves the right to update or modify these Terms and Conditions at any time. Changes will be effective upon posting to our platform. Continued use of the services after modifications indicates acceptance of the updated terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Governing Law</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-6">
                These Terms and Conditions are governed by the laws of South Africa. Any disputes arising from your use of Murphy's Law shall be subject to the exclusive jurisdiction of South African courts.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-migra mb-6 text-black">Contact Information</h2>
              <p className="font-montreal text-black/70 leading-relaxed mb-4">
                If you have questions or concerns regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-black/5 p-6 rounded-lg border border-black/10">
                <p className="font-montreal text-black leading-relaxed mb-2">
                  <strong>Murphy's Law</strong>
                </p>
                <p className="font-montreal text-black/70 leading-relaxed mb-2">
                  28 6th Street, Wynberg
                </p>
                <p className="font-montreal text-black/70 leading-relaxed mb-2">
                  Sandton, 2191
                </p>
                <p className="font-montreal text-black/70 leading-relaxed mb-2">
                  tim@kvelld.co.za
                </p>
                <p className="font-montreal text-black/70 leading-relaxed">
                  Cell: 076 787 7637
                </p>
              </div>
              <p className="font-montreal text-black/70 leading-relaxed mt-6">
                By using Murphy's Law, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}