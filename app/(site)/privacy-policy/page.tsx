import type { Metadata } from "next"
import { withSocial } from "@/lib/seo"
import Link from "next/link"
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = withSocial({
  title: "Privacy Policy",
  description:
    "Magill Grain Store respects your privacy and is committed to handling your personal information responsibly. Read how we collect, use and protect it.",
}, "/privacy-policy")

const anchorLink = "underline hover:text-accent-ink"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="1 September 2026"
      intro={
        <>
          <p>Magill Grain Store respects your privacy and is committed to handling your personal information responsibly.</p>
          <p>
            This Privacy Policy explains how Magill Grain Store collects,
            uses, stores and protects personal information when you visit
            our website, contact us, enquire about our products, place an
            order or otherwise interact with our business.
          </p>
          <p>Magill Grain Store operates from 574 Magill Road, Magill SA 5072, South Australia.</p>
        </>
      }
    >
      <LegalSection id="about" title="1. About This Privacy Policy">
        <p>This Privacy Policy explains:</p>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>What personal information we may collect?</li>
          <li>
            <Link href="#how-we-collect" className={anchorLink}>
              How we collect
            </Link>{" "}
            personal information?
          </li>
          <li>
            <Link href="#how-we-use" className={anchorLink}>
              Why we collect
            </Link>{" "}
            personal information?
          </li>
          <li>How we use and disclose personal information?</li>
          <li>
            <Link href="#data-security" className={anchorLink}>
              How we protect
            </Link>{" "}
            personal information?
          </li>
          <li>How long we retain information?</li>
          <li>Your privacy rights</li>
          <li>Cookies and website technologies</li>
          <li>Third party services</li>
          <li>
            How{" "}
            <Link href="#contact" className={anchorLink}>
              you can
            </Link>{" "}
            contact us about privacy?
          </li>
        </ol>
        <p>Where applicable, this Policy is intended to operate consistently with the Privacy Act 1988 and the Australian Privacy Principles.</p>
        <p>The Office of the Australian Information Commissioner explains that a privacy policy should clearly describe what personal information an organisation collects, how it is collected and how it is handled.</p>
      </LegalSection>

      <LegalSection id="personal-information" title="2. Personal Information We May Collect">
        <p>Depending on how you interact with Magill Grain Store, we may collect information including:</p>

        <p className="font-bold text-ink">Contact Information</p>
        <p>This may include:</p>
        <LegalList items={["Full name", "Email address", "Phone number", "Residential address", "Delivery address", "Billing address"]} />

        <p className="font-bold text-ink">Order Information</p>
        <p>Where you purchase products or request an order, we may collect:</p>
        <LegalList
          items={[
            "Products ordered",
            "Quantity purchased",
            "Order date",
            "Delivery information",
            "Order value",
            "Order status",
            "Payment status",
            "Customer communications relating to the order",
          ]}
        />

        <p className="font-bold text-ink">Enquiry Information</p>
        <p>If you contact us, we may collect information contained in your enquiry, including questions about:</p>
        <LegalList
          items={[
            "Poultry feed",
            "Bird seed",
            "Grain",
            "Animal feed",
            "Fertilisers",
            "Hay and mulch",
            "Garden products",
            "Poultry equipment",
            "Animal health products",
            "Delivery",
            "Product availability",
          ]}
        />
      </LegalSection>

      <LegalSection id="payment-information" title="3. Payment Information">
        <p>Where online payments are available, payments may be processed through a third party payment provider.</p>
        <p>Depending on the payment system used by the website, payment information may be collected and processed directly by the relevant payment provider.</p>
        <p>Magill Grain Store should not require customers to provide complete payment card details through ordinary email or other unsecured communication channels.</p>
        <p>Customers should never send payment card numbers, passwords or other sensitive financial information by email unless specifically instructed through a secure payment process.</p>
      </LegalSection>

      <LegalSection id="how-we-collect" title="4. How We Collect Personal Information">
        <p>We may collect information when you:</p>
        <LegalList
          items={[
            "Visit our website",
            "Submit an enquiry",
            "Contact us by phone",
            "Contact us by email",
            "Place an order",
            "Request delivery",
            "Create an account, if account functionality is available",
            "Subscribe to communications",
            "Contact customer support",
            "Communicate with us through other available channels",
          ]}
        />
        <p>We may also automatically collect limited technical information when you visit our website.</p>
      </LegalSection>

      <LegalSection id="website-technical" title="5. Website and Technical Information">
        <p>When you use our website, certain technical information may be collected automatically.</p>
        <p>This may include:</p>
        <LegalList
          items={[
            "IP address",
            "Browser type",
            "Device type",
            "Operating system",
            "Pages visited",
            "Referring website",
            "Approximate location information",
            "Date and time of visits",
            "Website interaction information",
          ]}
        />
        <p>This information may be used to understand website performance, identify technical issues, improve the user experience and maintain website security.</p>
      </LegalSection>

      <LegalSection id="how-we-use" title="6. How We Use Personal Information">
        <p>We may use personal information to:</p>
        <LegalList
          items={[
            "Process customer orders",
            "Arrange deliveries",
            "Respond to enquiries",
            "Provide customer service",
            "Confirm product availability",
            "Process payments",
            "Manage customer accounts",
            "Communicate about orders",
            "Handle returns and refunds",
            "Improve our products and services",
            "Improve website functionality",
            "Monitor website performance",
            "Maintain website security",
            "Prevent fraud or misuse",
            "Maintain business records",
            "Meet legal and regulatory obligations",
          ]}
        />
      </LegalSection>

      <LegalSection id="marketing" title="7. Marketing Communications">
        <p>Where permitted by law, Magill Grain Store may use customer contact information to provide information about products, services, promotions or other relevant business communications.</p>
        <p>You may unsubscribe from marketing communications at any time by following the unsubscribe instructions provided in the communication or by contacting us directly.</p>
        <p>Unsubscribing from marketing communications will not prevent us from sending important transactional communications relating to an existing order.</p>
      </LegalSection>

      <LegalSection id="disclosure" title="8. Disclosure of Personal Information">
        <p>We may disclose personal information where reasonably necessary to operate our business.</p>
        <p>This may include disclosure to:</p>
        <LegalList
          items={[
            "Payment service providers",
            "Delivery and courier providers",
            "Website hosting providers",
            "Website development and technology providers",
            "Analytics providers",
            "Email communication providers",
            "IT and security providers",
            "Professional advisers",
            "Government agencies where legally required",
          ]}
        />
        <p>We only provide information that is reasonably necessary for the relevant service or business purpose.</p>
      </LegalSection>

      <LegalSection id="third-party-services" title="9. Third Party Services">
        <p>Our website may use third party technologies and services.</p>
        <p>These may include services for:</p>
        <LegalList
          items={["Website hosting", "Payment processing", "Website analytics", "Email communications", "Maps and location services", "Security", "Marketing", "Customer support"]}
        />
        <p>Third party providers may collect and process information according to their own privacy policies.</p>
      </LegalSection>

      <LegalSection id="cookies" title="10. Cookies">
        <p>
          Magill Grain Store may use cookies and similar technologies to
          help operate the website, remember preferences, understand website
          usage and improve website performance.
        </p>
        <p>
          For more information, please see our{" "}
          <strong>
            <Link href="/cookie-policy" className={anchorLink}>
              Cookie Policy
            </Link>
          </strong>
          .
        </p>
      </LegalSection>

      <LegalSection id="data-security" title="11. Data Security">
        <p>We take reasonable steps to protect personal information from:</p>
        <LegalList items={["Unauthorised access", "Misuse", "Loss", "Modification", "Disclosure", "Destruction"]} />
        <p>However, no website, online service or electronic transmission can be guaranteed to be completely secure.</p>
        <p>Customers should also take reasonable precautions when using online services, including keeping passwords secure and avoiding sharing sensitive information through unsecured communication channels.</p>
      </LegalSection>

      <LegalSection id="data-retention" title="12. Data Retention">
        <p>We retain personal information only for as long as reasonably required for legitimate business, legal, accounting, taxation, dispute resolution, security or regulatory purposes.</p>
        <p>When information is no longer reasonably required, it may be securely deleted, destroyed or de identified where appropriate.</p>
      </LegalSection>

      <LegalSection id="access" title="13. Access to Personal Information">
        <p>You may contact us to request access to personal information we hold about you.</p>
        <p>We may need to verify your identity before providing access.</p>
        <p>In some circumstances, access may be limited or refused where permitted or required by law.</p>
      </LegalSection>

      <LegalSection id="correcting" title="14. Correcting Personal Information">
        <p>If you believe information we hold about you is inaccurate, incomplete or outdated, please contact us.</p>
        <p>We will take reasonable steps to correct information where appropriate.</p>
      </LegalSection>

      <LegalSection id="complaints" title="15. Privacy Complaints">
        <p>If you believe we have handled your personal information incorrectly, please contact us first so that we can investigate the matter.</p>
        <p>We will review your concern and aim to respond within a reasonable period.</p>
        <p>If you are not satisfied with our response and the matter falls within the jurisdiction of the relevant privacy regulator, you may have the right to make a complaint to the Office of the Australian Information Commissioner.</p>
      </LegalSection>

      <LegalSection id="changes" title="16. Changes to This Privacy Policy">
        <p>We may update this Privacy Policy from time to time to reflect changes to our business, website, technology, legal requirements or privacy practices.</p>
        <p>The latest version will be published on this page.</p>
      </LegalSection>

      <LegalSection id="contact" title="17. Contact Us">
        <p>For privacy enquiries, please contact:</p>
        <p>
          <strong>Magill Grain Store</strong>
          <br />
          574 Magill Road
          <br />
          Magill SA 5072
          <br />
          South Australia
          <br />
          <strong>Phone:</strong> (08) 8331 8159
          <br />
          <strong>Email:</strong> magillgrainstore@gmail.com
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
