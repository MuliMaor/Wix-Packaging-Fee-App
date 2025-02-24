import React, { type FC, useState, useRef, useEffect } from 'react';
import { EmptyState, Page, WixDesignSystemProvider, Button } from '@wix/design-system';
import { dashboard } from '@wix/dashboard';
import '@wix/design-system/styles.global.css';
import { getPackagingFee, setPackagingFee } from "../../../backend/returnValue.web.ts.js";

const DashboardPage: FC = () => {
  const [feeValue, setFeeValue] = useState<any>(null);
  const inputRef = useRef<any>(null);
  let packagingFeeAmount = null;

  useEffect(() => {
    async function func() {
      await getFeeValue();
    }
    console.log('calling getFeeValue in useEffect');
    func();
    console.log('finished calling getFeeValue in useEffect');
  }, []);

  async function getFeeValue() {
    console.log('calling getPackagingFee');
    try {
      const response = await getPackagingFee();
      console.log('getPackagingFee returned: ' + response);

      packagingFeeAmount = response;
      console.log('numerical value: ' + packagingFeeAmount);

      setFeeValue(packagingFeeAmount);
      return;

      if (packagingFeeAmount === null || packagingFeeAmount === undefined) {
        dashboard.showToast({
          message: 'getPackagingFee failed.',
          type: 'error',
        });
        return;
      }
      //setFeeValue(packagingFeeAmount);

      dashboard.showToast({
        message: `Successfully fetched amount: ${feeValue}`,
        type: 'success',
      });
    } catch (e) {
      console.log(e);
      dashboard.showToast({
        message: 'Failed to fetch fee amount. Please refresh the page.',
        type: 'error',
      });
    }
    finally {
      console.log('Done running getPackagingFee');
    }
  }

  async function handleChangeFee() {
    const value = parseFloat(inputRef.current.value);

    if (isNaN(value) || value < 0) {
      dashboard.showToast({
        message: 'Fee value must be a positive number',
        type: 'error',
      });
    } else {
      try {
        const response = await setPackagingFee(value);
        setFeeValue(value);
        dashboard.showToast({
          message: 'Packaging fee updated successfully.',
          type: 'success',
        });
      } catch (e) {
        console.log(e);
        dashboard.showToast({
          message: 'Failed to update packaging fee. Please try again.',
          type: 'error',
        });
      }
    }
  }

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Packaging Fee"
          subtitle="View and set it in this page"
        />
        <Page.Content>
          <h1>Current Packaging Fee: {feeValue}</h1>
          <EmptyState
            title="Packaging Fee"
            subtitle="Input the fee amount here"
            theme="page"
          >
            <input type='text' ref={inputRef} />
            <Button onClick={handleChangeFee}>Apply</Button>
          </EmptyState>
          {
            <p>trying secrets</p>
          }
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;