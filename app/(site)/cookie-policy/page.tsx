import type { Metadata } from "next"
import { withSocial } from "@/lib/seo"
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
  LegalSubheading,
} from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = withSocial({
  title: "Cookie Policy",
  description:
    "This Cookie Policy explains how Magill Grain Store may use cookies and similar technologies when you visit our website.",
}, "/cookie-policy")

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="1 September 2026"
      intro={
        <p>
          This Cookie Policy explains how Magill Grain Store may use cookies
          and similar technologies when you visit our website.
        </p>
      }
    >
      <LegalSection title="1. What Are Cookies?">
        <p>
          Cookies are small text files that may be stored on your computer,
          smartphone, tablet or other device when you visit a website.
        </p>
        <p>
          Cookies allow websites to recognise a device and remember certain
          information between visits.
        </p>
        <p>
          Cookies can help websites function correctly and can also provide
          information about how visitors use a website.
        </p>
      </LegalSection>

      <LegalSection title="2. Why We Use Cookies">
        <p>Magill Grain Store may use cookies to:</p>
        <LegalList
          items={[
            "Operate essential website functions",
            "Remember preferences",
            "Maintain website security",
            "Understand website usage",
            "Improve website performance",
            "Analyse website traffic",
            "Improve website navigation",
            "Remember shopping or ordering information where applicable",
            "Support marketing activities where applicable",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Types of Cookies">
        <LegalSubheading>Essential Cookies</LegalSubheading>
        <p>Essential cookies may be required for the website to function correctly.</p>
        <p>They may support functions such as:</p>
        <LegalList
          items={[
            "Website navigation",
            "Security",
            "Session management",
            "Shopping functionality",
            "Checkout functionality",
          ]}
        />
        <p>
          These cookies generally cannot be disabled through website
          settings without affecting website functionality.
        </p>

        <LegalSubheading>Functional Cookies</LegalSubheading>
        <p>Functional cookies may remember user preferences and settings.</p>
        <p>For example, they may help a website remember certain choices during a visit.</p>

        <LegalSubheading>Analytics Cookies</LegalSubheading>
        <p>Analytics cookies may help us understand how visitors use the website.</p>
        <p>This may include information about:</p>
        <LegalList
          items={[
            "Number of visitors",
            "Popular pages",
            "Traffic sources",
            "Time spent on pages",
            "Navigation patterns",
            "Device types",
            "Website performance",
          ]}
        />
        <p>
          Analytics information is generally used in an aggregated or
          analytical manner to improve the website.
        </p>

        <LegalSubheading>Marketing Cookies</LegalSubheading>
        <p>
          Where marketing technologies are used, marketing cookies may help
          measure advertising campaigns or understand interactions with
          marketing content.
        </p>
        <p>
          The specific cookies used may change depending on the services
          integrated into the website.
        </p>
      </LegalSection>

      <LegalSection title="4. Third Party Cookies">
        <p>Some services integrated into our website may place their own cookies.</p>
        <p>These may include:</p>
        <LegalList
          items={[
            "Analytics providers",
            "Payment providers",
            "Advertising platforms",
            "Social media services",
            "Maps and location services",
            "Security providers",
          ]}
        />
        <p>Third party providers manage these technologies according to their own policies.</p>
      </LegalSection>

      <LegalSection title="5. Managing Cookies">
        <p>Most internet browsers allow users to:</p>
        <LegalList
          items={[
            "View cookies",
            "Delete cookies",
            "Block cookies",
            "Allow cookies from selected websites",
            "Block third party cookies",
          ]}
        />
        <p>Disabling cookies may affect the functionality of some website features.</p>
      </LegalSection>

      <LegalSection title="6. Changes to This Cookie Policy">
        <p>We may update this Cookie Policy when our website technology or third party services change.</p>
        <p>The latest version will always be published on this page.</p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>For questions regarding cookies or privacy, contact:</p>
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
