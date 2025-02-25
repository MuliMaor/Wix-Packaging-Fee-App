import { webMethod, Permissions } from '@wix/web-methods';
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
    console.log('called setPackagingFee with amount = ' + amount);
    const secretId = (await secrets.listSecretInfo()).secrets?.find(secret => secret.name === secretName)?._id;
    console.log('got secert id');
    if (secretId !== null && secretId !== undefined) {
      await secrets.updateSecret(secretId, { value: amount.toString() });
    }
    console.log('updated fee amount');
  });