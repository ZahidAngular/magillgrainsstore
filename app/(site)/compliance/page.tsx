import type { Metadata } from "next"
import { withSocial } from "@/lib/seo"
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = withSocial({
  title: "Compliance & Consumer Information",
  description:
    "Magill Grain Store is committed to conducting its business responsibly and giving customers clear information about our products, services and purchasing.",
}, "/compliance")

export default function CompliancePage() {
  return (
    <LegalPageLayout
      title="Compliance & Consumer Information"
      lastUpdated="1 September 2026"
      intro={
        <>
          <p>
            Magill Grain Store is committed to conducting its business
            responsibly and providing customers with clear and useful
            information about our products, services and purchasing
            processes.
          </p>
          <p>
            Our store operates in Magill, South Australia, and supplies
            products including grains, poultry feed, bird seed, animal feed,
            fertilisers, hay, garden products, poultry equipment and animal
            health products.
          </p>
        </>
      }
    >
      <LegalSection title="1. Australian Consumer Law">
        <p>
          Magill Grain Store recognises the rights provided to Australian
          consumers under the Australian Consumer Law.
        </p>
        <p>Consumer guarantees apply automatically to eligible goods and services.</p>
        <p>These guarantees can include requirements relating to:</p>
        <LegalList
          items={[
            "Acceptable quality",
            "Fitness for purpose",
            "Matching description",
            "Matching sample or demonstration model",
            "Safety",
            "Durability",
          ]}
        />
        <p>
          Where a product does not meet an applicable consumer guarantee, the
          customer may be entitled to an appropriate remedy.
        </p>
        <p>
          Depending on the circumstances, this may include repair,
          replacement, refund or compensation.
        </p>
      </LegalSection>

      <LegalSection title="2. Consumer Rights Cannot Be Removed">
        <p>
          Magill Grain Store does not intend to exclude or restrict rights
          that cannot legally be excluded.
        </p>
        <p>
          A business cannot remove consumer guarantees through terms and
          conditions, signage or a refund policy.
        </p>
      </LegalSection>

      <LegalSection title="3. Product Safety">
        <p>
          We aim to supply products that are appropriate for their intended
          use and comply with applicable requirements.
        </p>
        <p>Customers should always:</p>
        <LegalList
          items={[
            "Read product labels",
            "Follow manufacturer instructions",
            "Follow storage instructions",
            "Follow safety warnings",
            "Use products only for their intended purpose",
          ]}
        />
        <p>
          Australian product safety requirements can apply to products sold
          online as well as products sold through physical stores.
        </p>
      </LegalSection>

      <LegalSection title="4. Product Labelling">
        <p>
          Customers should rely on the manufacturer&rsquo;s current product
          label and packaging for detailed information regarding:
        </p>
        <LegalList
          items={[
            "Ingredients",
            "Feeding directions",
            "Dosage",
            "Warnings",
            "Storage",
            "Expiry information",
            "Application rates",
            "Safety instructions",
          ]}
        />
        <p>Website information may not always reflect subsequent packaging changes.</p>
      </LegalSection>

      <LegalSection title="5. Animal Feed">
        <p>Magill Grain Store supplies feed and grain products for a range of animals.</p>
        <p>
          Customers are responsible for selecting products appropriate for
          their animals and following manufacturer feeding directions.
        </p>
        <p>
          Where there is uncertainty about an animal&rsquo;s nutritional
          requirements, veterinary or professional nutritional advice should
          be obtained.
        </p>
      </LegalSection>

      <LegalSection title="6. Animal Health Products">
        <p>Use animal health products responsibly.</p>
        <p>Customers must follow the relevant product label and manufacturer instructions.</p>
        <p>
          If a product requires professional veterinary oversight, or if an
          animal is unwell, customers should seek appropriate professional
          advice.
        </p>
      </LegalSection>

      <LegalSection title="7. Safe Storage">
        <p>Customers should store products according to manufacturer recommendations.</p>
        <p>This may include protecting products from:</p>
        <LegalList
          items={[
            "Moisture",
            "Excessive heat",
            "Direct sunlight",
            "Contamination",
            "Pests",
            "Animals or children where relevant",
          ]}
        />
        <p>Specific storage instructions should always be taken from the product label.</p>
      </LegalSection>

      <LegalSection title="8. Website Transparency">
        <p>Magill Grain Store provides business contact information through its website.</p>
        <p>
          <strong>Business:</strong> Magill Grain Store
          <br />
          <strong>Address:</strong> 574 Magill Road, Magill SA 5072, South
          Australia
          <br />
          <strong>Phone:</strong> (08) 8331 8159
          <br />
          <strong>Email:</strong> magillgrainstore@gmail.com
        </p>
        <p>
          The website currently states that Magill Grain Store has been
          operating since 1998 and serves South Australian farms, breeders
          and backyard flock keepers.
        </p>
      </LegalSection>

      <LegalSection title="9. Online Purchasing">
        <p>
          When purchasing online, customers should receive clear information
          about products, pricing, delivery and relevant purchasing terms.
        </p>
        <p>
          Australian Consumer Law applies to online purchases in the same
          general way it applies to other consumer purchases.
        </p>
      </LegalSection>

      <LegalSection title="10. Customer Information Security">
        <p>Magill Grain Store takes reasonable steps to protect customer information.</p>
        <p>
          Customers should also take reasonable precautions when using
          online services, including protecting passwords and avoiding
          sending sensitive payment information through unsecured channels.
        </p>
      </LegalSection>

      <LegalSection title="11. Complaints and Product Issues">
        <p>If you have a concern regarding:</p>
        <LegalList
          items={[
            "A product",
            "An order",
            "Delivery",
            "Payment",
            "A return",
            "A refund",
            "Product quality",
            "Product information",
          ]}
        />
        <p>Please contact Magill Grain Store directly.</p>
        <p>
          We encourage customers to give us the opportunity to understand and
          resolve an issue before escalating the matter.
        </p>
      </LegalSection>

      <LegalSection title="12. Compliance Updates">
        <p>Our compliance practices may be updated when:</p>
        <LegalList
          items={[
            "Laws change",
            "Products change",
            "Website functionality changes",
            "Payment systems change",
            "Delivery arrangements change",
            "Business processes change",
          ]}
        />
        <p>This page may therefore be updated from time to time.</p>
      </LegalSection>

      <LegalSection title="13. Contact Us">
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
