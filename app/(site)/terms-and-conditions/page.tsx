import type { Metadata } from "next"
import { withSocial } from "@/lib/seo"
import Link from "next/link"
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = withSocial({
  title: "Terms & Conditions",
  description:
    "These Terms and Conditions govern your use of the Magill Grain Store website and your purchase of products through our online services, where available.",
}, "/terms-and-conditions")

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="1 September 2026"
      intro={
        <>
          <p>
            These Terms and Conditions govern your use of the Magill Grain
            Store website and your purchase of products through our online
            services, where available.
          </p>
          <p>By accessing or using the website, you agree to comply with these Terms.</p>
        </>
      }
    >
      <LegalSection title="1. About Magill Grain Store">
        <p>
          Magill Grain Store is a South Australian business supplying
          grains, poultry feed, bird seed, animal feed, fertilisers, hay,
          garden supplies, poultry equipment, animal health products and
          related goods.
        </p>
        <p>Our physical store is located at:</p>
        <p>
          574 Magill Road
          <br />
          Magill SA 5072
          <br />
          South Australia
        </p>
        <p>Phone: (08) 8331 8159</p>
      </LegalSection>

      <LegalSection title="2. Website Use">
        <p>You agree to use this website for lawful purposes only.</p>
        <p>You must not:</p>
        <LegalList
          items={[
            "Use the website for fraudulent purposes",
            "Attempt to gain unauthorised access",
            "Interfere with website security",
            "Introduce malicious software",
            "Copy website content for unauthorised commercial use",
            "Misuse website functionality",
            "Submit false or misleading information",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Product Information">
        <p>We make reasonable efforts to ensure product information is accurate and current.</p>
        <p>Product information may include:</p>
        <LegalList
          items={[
            "Product descriptions",
            "Product images",
            "Product sizes",
            "Product weights",
            "Ingredients",
            "Feeding information",
            "Manufacturer information",
            "Pricing",
            "Availability",
          ]}
        />
        <p>However, product packaging, labels, specifications and availability may change.</p>
        <p>The actual product packaging received may differ from website imagery.</p>
        <p>Customers should always refer to the product packaging and manufacturer instructions supplied with the product.</p>
      </LegalSection>

      <LegalSection title="4. Product Availability">
        <p>All products are subject to availability.</p>
        <p>If a product becomes unavailable after an order has been submitted, we may contact you regarding:</p>
        <LegalList
          items={["An alternative product", "A revised order", "Cancellation", "A refund where applicable"]}
        />
      </LegalSection>

      <LegalSection title="5. Pricing">
        <p>Prices displayed on the website may change from time to time.</p>
        <p>We take reasonable care to ensure prices are accurate.</p>
        <p>If an obvious pricing error occurs, we may contact you before fulfilling the order.</p>
      </LegalSection>

      <LegalSection title="6. Orders">
        <p>Submitting an order does not necessarily mean that Magill Grain Store has accepted the order.</p>
        <p>An order may require confirmation depending on product availability, delivery requirements, payment status or other circumstances.</p>
        <p>We may contact you where additional information is required.</p>
      </LegalSection>

      <LegalSection title="7. Payment">
        <p>Where online payment is available, payment may be processed through a third party payment provider.</p>
        <p>Customers are responsible for providing accurate payment and contact information.</p>
      </LegalSection>

      <LegalSection title="8. Delivery">
        <p>
          Magill Grain Store offers delivery services to selected areas,
          including Adelaide&rsquo;s eastern suburbs, subject to
          availability and applicable delivery arrangements.
        </p>
        <p>Delivery availability may depend on:</p>
        <LegalList
          items={["Delivery address", "Product type", "Product quantity", "Order size", "Vehicle requirements", "Delivery capacity", "Weather or other external conditions"]}
        />
        <p>Customers must provide accurate delivery details.</p>
      </LegalSection>

      <LegalSection title="9. Delivery Delays">
        <p>We aim to meet stated delivery expectations, but delays may occur because of:</p>
        <LegalList
          items={["Weather", "Traffic", "Vehicle problems", "Supplier delays", "High demand", "Incorrect delivery information", "Circumstances outside our reasonable control"]}
        />
        <p>We will make reasonable efforts to communicate significant delivery issues.</p>
      </LegalSection>

      <LegalSection title="10. Customer Responsibilities">
        <p>Customers are responsible for:</p>
        <LegalList
          items={["Providing accurate contact details", "Providing accurate delivery information", "Ensuring someone is available where required", "Providing safe access for delivery", "Using products according to instructions", "Storing products appropriately"]}
        />
      </LegalSection>

      <LegalSection title="11. Animal Feed Products">
        <p>Animal feed should be selected and used according to the requirements of the relevant animal.</p>
        <p>The appropriate feed may depend on:</p>
        <LegalList
          items={["Animal species", "Age", "Breed", "Weight", "Activity level", "Health status", "Production requirements", "Other dietary requirements"]}
        />
        <p>Product descriptions on our website are not veterinary or professional nutritional advice.</p>
      </LegalSection>

      <LegalSection title="12. Animal Health Products">
        <p>
          Products categorised as poultry medicine, ruminant medicine or
          other animal health products must be used according to the
          manufacturer&rsquo;s instructions and applicable requirements.
        </p>
        <p>Customers are responsible for reading labels, warnings, directions and dosage information before use.</p>
        <p>Where professional advice is required, customers should consult an appropriately qualified veterinarian or animal health professional.</p>
      </LegalSection>

      <LegalSection title="13. Returns and Refunds">
        <p>
          Returns and refunds are handled according to our{" "}
          <strong>
            <Link href="/returns-refunds-policy" className="underline hover:text-accent-ink">
              Returns &amp; Refunds Policy
            </Link>
          </strong>{" "}
          and applicable Australian Consumer Law.
        </p>
        <p>Nothing in these Terms removes or limits consumer rights that cannot legally be excluded.</p>
      </LegalSection>

      <LegalSection title="14. Australian Consumer Law">
        <p>Nothing in these Terms is intended to exclude, restrict or modify rights available to consumers under the Australian Consumer Law.</p>
        <p>Consumer guarantees automatically apply to eligible goods and services.</p>
      </LegalSection>

      <LegalSection title="15. Intellectual Property">
        <p>Unless otherwise stated, website content including:</p>
        <LegalList
          items={["Text", "Graphics", "Photographs", "Logos", "Website design", "Product presentation", "Page layouts"]}
        />
        <p>may be protected by intellectual property laws.</p>
        <p>You must not reproduce or commercially exploit website content without appropriate permission.</p>
      </LegalSection>

      <LegalSection title="16. External Websites">
        <p>Our website may contain links to external websites.</p>
        <p>We are not responsible for the content, security, availability or privacy practices of third party websites.</p>
      </LegalSection>

      <LegalSection title="17. Website Availability">
        <p>We aim to maintain reliable website access but cannot guarantee that the website will always be available or free from technical errors.</p>
        <p>Temporary interruptions may occur because of maintenance, hosting issues, technical faults or circumstances outside our reasonable control.</p>
      </LegalSection>

      <LegalSection title="18. Changes to These Terms">
        <p>We may update these Terms from time to time.</p>
        <p>The updated version will be published on this page.</p>
      </LegalSection>

      <LegalSection title="19. Contact">
        <p>
          Magill Grain Store
          <br />
          574 Magill Road
          <br />
          Magill SA 5072
          <br />
          South Australia
          <br />
          Phone: (08) 8331 8159
          <br />
          Email: magillgrainstore@gmail.com
        </p>
      </LegalSection>
    </LegalPageLayout>
  )
}
