import type { Metadata } from "next"
import { withSocial } from "@/lib/seo"
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/legal/LegalPageLayout"

export const metadata: Metadata = withSocial({
  title: "Returns & Refunds Policy",
  description:
    "At Magill Grain Store, we aim to provide quality products and reliable service to our customers. Read our returns, refunds and exchange information.",
}, "/returns-refunds-policy")

export default function ReturnsRefundsPolicyPage() {
  return (
    <LegalPageLayout
      title="Returns & Refunds Policy"
      lastUpdated="1 September 2026"
      intro={
        <>
          <p>At Magill Grain Store, we aim to provide quality products and reliable service to our customers.</p>
          <p>
            If there is a problem with a product you have purchased from us,
            please contact Magill Grain Store as soon as reasonably
            possible. We will review the circumstances and work with you to
            determine the appropriate solution.
          </p>
        </>
      }
    >
      <LegalSection title="1. Australian Consumer Law">
        <p>Any purchases from Magill Grain Store are subject to the Australian Consumer Law (ACL), including any consumer guaranties that may apply.</p>
        <p>
          Consumer guarantees give customers certain rights if the goods do
          not meet the required standards. These rights are automatic and
          cannot be removed, restricted or excluded by a store policy .
        </p>
        <p>The right remedy may be repair, replacement or refund depending on the circumstances and whether the product has a major or minor failure.</p>
        <p>Nothing in this policy is intended to exclude, restrict or modify any rights or remedies which cannot be excluded at law under the Australian Consumer Law.</p>
      </LegalSection>

      <LegalSection title="2. Mandatory Consumer Guarantee Statement">
        <p>The following consumer guaranty statement applies to goods supplied by Magill Grain Store:</p>
        <p>We give guarantees on our goods that cannot be excluded under the Australian Consumer Law.</p>
        <p>For a major failure you are entitled to a replacement or refund. You are also entitled to compensation for any other reasonably foreseeable loss or damage .</p>
        <p>You are also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the failure does not amount to a major failure.</p>
        <p>These rights are not dependent upon any voluntary return and change of mind policy.</p>
      </LegalSection>

      <LegalSection title="3. Products With a Problem">
        <p>If a product: Please contact us if a product:</p>
        <LegalList
          items={[
            "faulty or defective",
            "Arrives in damaged condition",
            "Does not fit description",
            "Is very different from what you ordered",
            "Of unacceptably low quality",
            "Not safe.",
            "Is not reasonably fit for the purpose for which it was supplied.",
            "Not otherwise comply with an applicable consumer guaranty",
          ]}
        />
        <p>We may need to look at the product and the circumstances before we can identify the right remedy.</p>
        <p>A business may consider a product before providing an appropriate remedy where required by law.</p>
      </LegalSection>

      <LegalSection title="4. Major Product Problems">
        <p>For example, a product has a major failure if:</p>
        <p>
          It is unsafe. It is significantly different from the description,
          sample or demonstration model. It cannot be used for its normal
          purpose and cannot be easily fixed. It has a serious problem that
          would have stopped a reasonable consumer from buying the product.
        </p>
        <p>If a product is faulty under the Australian Consumer Law, the customer is usually entitled to choose between:</p>
        <LegalList items={["Refund", "Replacement of the same kind of product"]} />
        <p>In addition, the customer may have a right to compensation for reasonably foreseeable loss or damage caused by the failure.</p>
        <p>The appropriate remedy will depend on the circumstances and the applicable law.</p>
      </LegalSection>

      <LegalSection title="5. Minor Product Problems">
        <p>If there is a minor failure of a product, Magill Grain Store may offer an appropriate remedy, such as repairing the product.</p>
        <p>If a minor problem can be fixed, the Australian Consumer Law requires that it be fixed within a reasonable time and, if required, at no cost.</p>
        <p>If a minor problem can&rsquo;t be fixed in a reasonable time or can&rsquo;t be fixed, you may be entitled to another remedy. This might include a replacement or refund depending on the circumstances.</p>
      </LegalSection>

      <LegalSection title="6. Damaged Products">
        <p>If your product is damaged on arrival, please contact Magill Grain Store as soon as reasonably possible.</p>
        <p>In an effort to help us investigate the issue, we may ask you to send us:</p>
        <LegalList
          items={[
            "Order no.",
            "Name of product",
            "Description of damage",
            "Photos of product",
            "Packaging photos (where applicable)",
            "Delivery information",
            "Such other information reasonably required to make an assessment of the issue",
          ]}
        />
        <p>Photos can assist us in investigating delivery or product damage more efficiently.</p>
      </LegalSection>

      <LegalSection title="7. Incorrect Products">
        <p>
          If you receive a product different than the product you ordered,
          please contact us.
          <br />
          We will review your order and if appropriate make arrangements for
          a suitable solution.
        </p>
        <p>Depending on the circumstances this may involve arranging the correct product, replacement or other remedy available under the Australian Consumer Law.</p>
      </LegalSection>

      <LegalSection title="8. Change of Mind">
        <p>
          Generally, the Australian Consumer Law does not require a business
          to give you a refund or replacement if you: change your mind, find
          the product cheaper elsewhere, decide you do not like the product
          or no longer have a use for it.
        </p>
        <p>Magill Grain Store may have a voluntary change of mind return policy on certain products. Where such an arrangement is available, any applicable conditions will be communicated to the customer and will apply to that voluntary return arrangement.</p>
        <p>Any voluntary change of mind policy is in addition to and does not replace or limit any rights under the Australian Consumer Law.</p>
      </LegalSection>

      <LegalSection title="9. Feed, Grain and Agricultural Products">
        <p>Magill Grain Store stocks a range of agricultural, animal and related products that may require special storage, handling and use conditions.</p>
        <p>They can include:</p>
        <LegalList
          items={["Cereal", "Seeds for birds", "Poultry feeding.", "Feed for animals", "Straw", "Fertilizer", "Products of agriculture", "Animal health products"]}
        />
        <p>Customers should store, handle, dose and use according to the manufacturer&rsquo;s or supplier&rsquo;s instructions carefully.</p>
        <p>Products must be maintained under appropriate conditions to avoid contamination, deterioration, moisture damage or other problems.</p>
        <p>If you believe that a product is contaminated, unsafe, damaged or otherwise unsuitable for use, cease use of the product where appropriate and contact Magill Grain Store immediately.</p>
        <p>Nothing in this section affects or limits your statutory rights as a consumer.</p>
      </LegalSection>

      <LegalSection title="10. Animal Health Products">
        <p>Always use animal health products strictly in accordance with the manufacturer&rsquo;s instructions and any directions or warnings.</p>
        <p>This may include poultry medicines, ruminant medicines and other animal health products.</p>
        <p>If a product has been incorrectly eaten, given in an incorrect dose or there is concern about an animal&rsquo;s health or wellbeing, customers should seek appropriate veterinary advice.</p>
        <p>Magill Grain Store does not offer veterinary advice as part of its returns process.</p>
        <p>Any question about the quality, condition or fitness for purpose of a product is a question to be determined having regard to the circumstances and the law.</p>
      </LegalSection>

      <LegalSection title="11. Products Incorrectly Used or Stored">
        <p>Under the Australian Consumer Law, the customer may not be entitled to a remedy where the problem is because the customer has misused the product, failed to follow reasonable instructions, stored it incorrectly, damaged it accidentally or some other reason for which the business is not responsible.</p>
        <p>This will be decided on a case by case basis.</p>
        <p>Any statutory rights of a customer, where they would otherwise apply, will not be affected by a product being opened, used or taken out of its original packaging.</p>
      </LegalSection>

      <LegalSection title="12. How to Request a Return or Report a Product Issue">
        <p>If you would like to return or report a problem with a product, please contact:</p>
        <p>
          Magill&rsquo;s Grain Store
          <br />
          Phone: (08) 8331 8159
          <br />
          Email: magillgrainstore@gmail.com
        </p>
        <p>Please. provide where appropriate:</p>
        <LegalList
          items={[
            "Your full name",
            "Order number / order information",
            "Name of product",
            "Date of purchase",
            "Description of the problem",
            "Pictures of the product or damage",
            "Photographs of packaging, where applicable",
            "Any other information reasonably required to assess the issue:",
          ]}
        />
        <p>Giving us all the info means we can deal with your request more quickly.</p>
      </LegalSection>

      <LegalSection title="13. Return Instructions">
        <p>Do not return a product without first contacting Magill Grain Store and obtaining return instructions where applicable.</p>
        <p>Depending on the product, condition of the product and the nature of the issue we may:</p>
        <LegalList
          items={[
            "Give instructions for return",
            "Pick-up arrangement",
            "Ask for photos or additional information",
            "Arrange for a replacement",
            "If applicable, organize repair",
            "Process a refund if applicable",
            "Obtain some other appropriate remedy",
          ]}
        />
        <p>Some agricultural, feed, animal health or other products may not be suitable for return for safety, hygiene, contamination or handling reasons. Under these circumstances we may issue alternative instructions.</p>
      </LegalSection>

      <LegalSection title="14. Refunds">
        <p>If a refund is approved or required under the Australian Consumer Law, we will generally process your refund using the original payment method where practical.</p>
        <p>How long it will take to appear in a customer&rsquo;s account may depend on the customer&rsquo;s bank, card provider or payment service provider.</p>
        <p>Magill Grain Store cannot control the processing times of third party payment providers.</p>
        <p>If a refund is due because of a major failure, the refund will be made in accordance with the customer&rsquo;s rights under Australian Consumer Law.</p>
        <p>&ldquo;There may be conditions attached to a voluntary change of mind return, such as product type, time limits, product condition or original packaging requirements.&rdquo;</p>
        <p>These conditions do not override consumer guaranty rights where a product fails in a major or minor way.</p>
      </LegalSection>

      <LegalSection title="15. Replacement Products">
        <p>In the case of an approved or required replacement, Magill Grain Store will work with the customer to provide a reasonable replacement where available.</p>
        <p>In the event that the same product is not available, we shall discuss with the customer the options open to them in accordance with the circumstances and the applicable consumer law.</p>
      </LegalSection>

      <LegalSection title="16. Return and Delivery Costs">
        <p>If we find that a product has a problem covered by the Australian Consumer Law, we may have to reimburse you for reasonable costs incurred in returning the product.</p>
        <p>Customers should keep their receipts or other proof of reasonable return, postage or transport costs where applicable.</p>
        <p>Different arrangements may apply for large, heavy or difficult to return products including collection or other appropriate way to resolve the issue.</p>
      </LegalSection>

      <LegalSection title="17. Proof of Purchase">
        <p>We may ask for reasonable evidence that the product was purchased from Magill Grain Store.</p>
        <p>Examples might be:</p>
        <LegalList
          items={["Order acknowledgment", "Receipt • Receipt", "Details of transaction", "Customer order information", "Other acceptable proof of purchase"]}
        />
        <p>If the original packaging is missing, a customer does not lose their consumer guaranty rights.</p>
      </LegalSection>

      <LegalSection title="18. Product Safety">
        <p>Product safety is an important consideration in the purchase and use of agricultural, animal and other products.</p>
        <p>If a product is considered to be unsafe, contaminated or there is a safety concern, customers should stop using the product (where appropriate) and contact Magill Grain Store immediately.</p>
        <p>If a product is unsafe and the matter falls under the Australian Consumer Law, then consumer guaranty remedies that may be available include a replacement or refund. Customers may also have rights in respect of reasonably foreseeable loss or damage.</p>
      </LegalSection>

      <LegalSection title="19. No Exclusion of Consumer Rights">
        <p>Nothing in this Returns &amp; Refunds Policy excludes, restricts or modifies any rights or remedies which cannot be excluded under Australian Consumer Law.</p>
        <p>Magill Grain Store will not use a blanket no refund policy or any other store policy to refuse a customer&rsquo;s statutory consumer guaranty rights.</p>
        <p>Consumer guarantees apply automatically where they are relevant, and a business cannot use its policies or terms to take those rights away.</p>
      </LegalSection>

      <LegalSection title="20. Questions About Returns or Refunds">
        <p>If you are unsure if your purchase may be eligible for a return, replacement, repair or refund please contact Magill Grain Store.</p>
        <p>We will explore the situation and outline what options are available.</p>
        <p>
          Magill&rsquo;s Grain Store.
          <br />
          Phone: (08) 8331 8159
          <br />
          Email: magillgrainstore@gmail.com
        </p>
        <p>This This policy should be read in conjunction with other relevant policies and terms on the Magill Grain Store website.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}
