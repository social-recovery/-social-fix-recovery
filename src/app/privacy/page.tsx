import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - SocialFix Pro',
  description: 'Privacy Policy for SocialFix Pro account recovery services',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">Last updated: March 2026</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>We collect information you provide when submitting a recovery request, including:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Social media account details you provide</li>
              <li>Information about the issue with your account</li>
              <li>Screenshots or documentation you choose to upload</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Provide account recovery consulting services</li>
              <li>Communicate with you about your case</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, contact us at: recoveryexpert16@outlook.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
