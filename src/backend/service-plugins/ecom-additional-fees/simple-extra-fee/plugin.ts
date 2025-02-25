import { additionalFees } from '@wix/ecom/service-plugins';
import { secrets } from "@wix/secrets";
import { auth } from '@wix/essentials';

additionalFees.provideHandlers({

  calculateAdditionalFees: async ({ request, metadata }) => {
    const elevatedCall = auth.elevate(secrets.getSecretValue);
    const response = await elevatedCall('packagingFee');
    const price = response.value;
    
    console.log('Adding Packaging Fee! ' + price);
    console.log('metadata.currency = ' + metadata.currency);
    const siteCurrency = metadata.currency ?? 'USD';
    return {
      additionalFees: [
        {
          code: "packaging-fee",
          name: "Packaging Fee",
          price: price,
          taxDetails: {
            taxable: true,
          },
        },
      ],
      currency: siteCurrency,
    };
  },
});