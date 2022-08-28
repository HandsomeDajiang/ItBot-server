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
    try {
      setupWKWebViewJavascriptBridge((bridge: any) => {
        bridge.callHandler('removeMiniProgramToken', {}, (response: any) => {
          console.log(response);
        });
        bridge.callHandler('getMiniProgramToken', {}, async (response: any) => {
          console.log(response);
          const { token } = response?.data || {};

          // TODO OperationID 参数会在 url 中带上，因为是本地测试，所以暂时就用一个可用的 OperationID 测试。
          // const urlParams = new URL(document.location).searchParams;
          // const OperationID = urlParams.get('OperationID');
          try {
            const OperationID = '38';
            const info = await getVerificationDetail(OperationID, token);
            setDetail(info);
          } catch (e) {}
        });
      });
    } catch (e) {
    } finally {
    }
  };

  const renderErrorPage = () => {
    return (
      <>
        <div className={adaptStyles.item} style={{ fontWeight: 'bold' }}>
          User activity details
        </div>
      </>
    );
  };

  const renderOperationDetail = () => {
    return (
      <>
        <div className={adaptStyles.item} style={{ fontWeight: 'bold' }}>
          User activity details
        </div>
        <div className={adaptStyles.item}>User: {detail.name}</div>
        <div className={adaptStyles.item}>
          Serial No: {detail.serial_number}
        </div>
        <div className={adaptStyles.item}>Email: {detail.email}</div>
        <div className={adaptStyles.item}>IP: {detail.ip}</div>
        <div className={adaptStyles.item}>Time: {detail.time}</div>
        <div className={adaptStyles.item}>
          Activity: Access {detail.app_name}
        </div>
        <div
          className={adaptStyles.item}
          style={{ fontWeight: 'bold', marginTop: '20px' }}
        >
          Operation details
        </div>
        <div className={adaptStyles.item}>
          Mark as company device? : {detail.company_device}
        </div>
        <div className={adaptStyles.item}>Note: {detail.note}</div>
        <div className={adaptStyles.item}>Operator: {detail.operator_name}</div>
        <div className={adaptStyles.item}>
          Operation time: {detail.opt_time}
        </div>
      </>
    );
  };
  return (
    <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
      <div className={adaptStyles.box}>{renderOperationDetail()}</div>
    </div>
  );
};

export default Detail;
