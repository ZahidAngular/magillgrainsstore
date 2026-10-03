import type { Metadata } from "next"
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "The information provided by Magill Grain Store through this website is intended to provide general information about our business, products and services.",
}

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated="1 September 2026"
      intro={
        <>
          <p>
            The information provided by Magill Grain Store through this
            website is intended to provide general information about our
            business, products and services.
          </p>
          <p>
            While we make reasonable efforts to keep website information
            accurate and current, information may change without notice.
          </p>
        </>
      }
    >
      <LegalSection title="1. General Information">
        <p>Website information may include:</p>
        <LegalList
          items={[
            "Product descriptions",
            "Product specifications",
            "Product images",
            "Pricing",
            "Availability",
            "Feeding information",
            "Delivery information",
            "General agricultural information",
          ]}
        />
        <p>Information should be considered general information unless specifically stated otherwise.</p>
      </LegalSection>

      <LegalSection title="2. Product Information">
        <p>Product information may be based on information supplied by manufacturers, suppliers or distributors.</p>
        <p>Manufacturers may change:</p>
        <LegalList
          items={["Ingredients", "Packaging", "Product specifications", "Instructions", "Warnings", "Recommended use", "Product formulation"]}
        />
        <p>Customers should always check the product packaging and manufacturer&rsquo;s instructions before using a product.</p>
      </LegalSection>

      <LegalSection title="3. Animal Feed Disclaimer">
        <p>Magill Grain Store supplies products for poultry, birds, horses, cattle, goats, rabbits, pets and other animals.</p>
        <p>Information published on this website should not be treated as veterinary advice, medical advice or personalised nutritional advice.</p>
        <p>Animal dietary requirements can vary considerably.</p>
        <p>Customers should consider factors such as:</p>
        <LegalList
          items={["Species", "Age", "Breed", "Weight", "Health", "Activity", "Production requirements", "Existing dietary requirements"]}
        />
        <p>Where there is uncertainty, customers should consult a qualified veterinarian or animal nutrition professional.</p>
      </LegalSection>

      <LegalSection title="4. Poultry Medicine and Animal Health Products">
        <p>Information about poultry medicine, ruminant medicine, drenches, tonics and other animal health products is provided for general product information only.</p>
        <p>Customers must follow:</p>
        <LegalList
          items={["Product labels", "Manufacturer instructions", "Dosage instructions", "Safety warnings", "Storage requirements", "Applicable restrictions"]}
        />
        <p>Magill Grain Store does not provide veterinary diagnosis through this website.</p>
      </LegalSection>

      <LegalSection title="5. Fertilisers and Garden Products">
        <p>Fertilisers, soil products, garden products and other agricultural products should be used according to their manufacturer&rsquo;s instructions.</p>
        <p>Incorrect application or excessive use may damage plants, soil, animals or the environment.</p>
        <p>Customers should read all product labels before use.</p>
      </LegalSection>

      <LegalSection title="6. Product Results">
        <p>Magill Grain Store does not guarantee specific results from the use of any product.</p>
        <p>Results may depend on:</p>
        <LegalList
          items={["Product selection", "Animal condition", "Feeding program", "Storage", "Environment", "Application", "Individual circumstances"]}
        />
      </LegalSection>

      <LegalSection title="7. Website Accuracy">
        <p>We make reasonable efforts to maintain accurate website information.</p>
        <p>However, we do not guarantee that all website information will always be:</p>
        <LegalList
          items={["Complete", "Current", "Error free", "Available", "Suitable for every individual purpose"]}
        />
      </LegalSection>

      <LegalSection title="8. Website Availability">
        <p>The website may occasionally become unavailable because of:</p>
        <LegalList
          items={["Maintenance", "Hosting issues", "Technical faults", "Internet problems", "Security events", "Circumstances outside our control"]}
        />
      </LegalSection>

      <LegalSection title="9. External Links">
        <p>Our website may contain links to third party websites.</p>
        <p>These links may be provided for convenience or additional information.</p>
        <p>Magill Grain Store does not control and is not responsible for third party websites, their content, privacy practices or availability.</p>
      </LegalSection>

      <LegalSection title="10. No Professional Advice">
        <p>Nothing on this website should be interpreted as professional veterinary, medical, nutritional, agricultural, legal or financial advice.</p>
        <p>Where professional advice is required, customers should consult an appropriately qualified professional.</p>
      </LegalSection>

      <LegalSection title="11. Australian Consumer Law">
        <p>Nothing in this Disclaimer is intended to exclude, restrict or modify any rights or remedies available under Australian Consumer Law.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
