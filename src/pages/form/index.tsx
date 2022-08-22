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
import { Input } from 'antd';
const { TextArea } = Input;
const Form: React.FC = () => {
  const [adaptStyles, setAdaptStyles] = useState<any>(macStyles);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.style.height = '100%';
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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('Change:', e.target.value);
  };

  const getVerificationData = async () => {
    const params = {};
    setupWKWebViewJavascriptBridge((bridge: any) => {
      bridge.callHandler('removeMiniProgramToken', {}, (response: any) => {
        console.log(response);
      });
      bridge.callHandler('getMiniProgramToken', {}, async (response: any) => {
        // console.log(response);
        // const { token } = response || {};
        // const urlParams = new URL(document.location).searchParams;
        // const OperationID = urlParams.get('OperationID');
        // const { data } = await getVerificationDetail({OperationID}, token) || {};
        // setDetail(data);
      });
    });
  };
  const renderReasonInput = () => {
    return (
      <>
        <div className={adaptStyles.tip}>Note:</div>
        <textarea onChange={onChange} className={adaptStyles.reason} />
        <div className={adaptStyles.count}>{count} / 500</div>
        <div className={adaptStyles.actionBox}>
          <button className={adaptStyles.cancel}>Cancel</button>
          <button className={adaptStyles.confirm}>Confirm</button>
        </div>
      </>
    );
  };
  return <div className={adaptStyles.box}>{renderReasonInput()}</div>;
};

export default Form;
