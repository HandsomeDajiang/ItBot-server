import React, { useEffect, useState } from 'react';
import macStyles from './mac_index.less';
import iosStyles from './ios_index.less';
import { getVerificationDetail } from '@/service/services';
import {
  setupWKWebViewJavascriptBridge,
  createJsBridge,
  setUpBridge,
  isMac,
} from '@/utils/jsBridge';

const Detail: React.FC = () => {
  const [detail, setDetail] = useState<any>({});
  const [adaptStyles, setAdaptStyles] = useState<any>(macStyles);
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.style.height = '100%';
      root.style.backgroundColor = 'rgb(245,246,247)';
    }
    if (isMac()) {
      createJsBridge();
      setUpBridge();
      setAdaptStyles(macStyles);
    } else {
      setAdaptStyles(iosStyles);
    }
  });
  useEffect(() => {
    getVerificationData();
  }, []);

  const getVerificationData = async () => {
    // const params = {};
    // setupWKWebViewJavascriptBridge((bridge: any) => {
    //   bridge.callHandler('removeMiniProgramToken', {}, (response: any) => {
    //     console.log(response);
    //   });
    //   bridge.callHandler('getMiniProgramToken', {}, async (response: any) => {
    //     console.log(response);
    //     const { token } = response || {};
    //     const urlParams = new URL(document.location).searchParams;
    //     const OperationID = urlParams.get('OperationID');
    //     const { data } = await getVerificationDetail({OperationID}, token) || {};
    //     setDetail(data);
    //   });
    // });
    const { data } =
      (await getVerificationDetail({ OperationID: '123' }, 'sdfsdffds')) || {};
  };
  const renderOperationDetail = () => {
    return (
      <>
        <div className={adaptStyles.item} style={{ fontWeight: 'bold' }}>
          User activity details
        </div>
        <div className={adaptStyles.item}>User: Tristan</div>
        <div className={adaptStyles.item}>Serial No: C02XH40CJG5L</div>
        <div className={adaptStyles.item}>Email: tristan@difft.com</div>
        <div className={adaptStyles.item}>IP: 127.0.0.1</div>
        <div className={adaptStyles.item}>Time: 22/08/2022 11:59PM</div>
        <div className={adaptStyles.item}>Activity: Access </div>
        <div
          className={adaptStyles.item}
          style={{ fontWeight: 'bold', marginTop: '20px' }}
        >
          Operation details
        </div>
        <div className={adaptStyles.item}>Mark as company device? :</div>
        <div className={adaptStyles.item}>Note: </div>
        <div className={adaptStyles.item}>Operator: </div>
        <div className={adaptStyles.item}>Operation time: </div>
      </>
    );
  };
  return (
    <div className={adaptStyles.box}>
      {detail && detail instanceof Object && renderOperationDetail()}
    </div>
  );
};

export default Detail;
