import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - SocialFix Pro',
  description: 'Terms of Service for SocialFix Pro account recovery services',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-4">Last updated: March 2026</p>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Service Description</h2>
            <p>SocialFix Pro provides consulting and assistance services for users seeking to recover their disabled or compromised social media accounts. We help guide clients through the official appeal processes of various social media platforms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Consulting Services</h2>
            <p>Our services include:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Guidance on official appeal processes</li>
              <li>Review of account recovery documentation</li>
              <li>Strategic advice for account reinstatement</li>
              <li>Support during the recovery process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. No Guarantee</h2>
            <p><strong>Important:</strong> We do not guarantee that any social media account will be recovered. Account decisions are made solely by the respective platform (Meta, Twitter/X, TikTok, etc.). Our role is limited to providing consulting and guidance services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <p>Consulting fees range from $300 to $1000 depending on case complexity. Payment is due before services begin. If we are unable to provide services, a refund may be considered on a case-by-case basis.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Client Responsibilities</h2>
            <p>Clients agree to:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Provide accurate information</li>
              <li>Cooperate with our consulting process</li>
              <li>Follow platform-specific appeal procedures</li>
              <li>Not involve us in any illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>SocialFix Pro shall not be liable for any damages arising from the use of our services. We are not affiliated with, endorsed by, or connected to any social media platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
            <p>For questions about these terms, contact us at: recoveryexpert16@outlook.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
