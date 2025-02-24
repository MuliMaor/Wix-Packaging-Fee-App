import { additionalFees } from '@wix/ecom/service-plugins';

additionalFees.provideHandlers({

  calculateAdditionalFees: async ({ request, metadata }) => {
    
    console.log('Adding Packaging Fee!');
    console.log('metadata.currency = ' + metadata.currency);
    const siteCurrency = metadata.currency ?? 'USD';
    return {
      // Return your response exactly as documented to integrate with Wix.
      // Return value example:
      additionalFees: [
        {
          code: "packaging-fee",
          name: "Packaging Fee",
          price: '7',
          taxDetails: {
            taxable: true,
          },
        },
      ],
      currency: siteCurrency,
    };
  },
});