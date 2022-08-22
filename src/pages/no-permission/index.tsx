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

const Permission: React.FC = () => {
  const [adaptStyles, setAdaptStyles] = useState<any>(macStyles);
  return <div className={adaptStyles.box}></div>;
};

export default Permission;
