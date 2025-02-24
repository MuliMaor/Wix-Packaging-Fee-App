import { webMethod, Permissions } from '@wix/web-methods';
import { collections, items } from "@wix/data";
import { auth } from "@wix/essentials";
import { secrets } from "@wix/secrets";

export const getPackagingFee = webMethod(
  Permissions.Admin,
  async () => {
    const secretName = 'packagingFee';
    const secret = await secrets.getSecretValue(secretName);
    return parseFloat(secret.value);
  });

  export const setPackagingFee = webMethod(
    Permissions.Admin,
    async (amount) => {
      const secretName = 'packagingFee';
      await secrets.updateSecret(secretName, {value: amount} );
    });