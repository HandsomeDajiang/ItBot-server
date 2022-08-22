import { Result, Button } from 'antd';
import React from 'react';
import { history } from '@@/core/history';

const SystemErrorPage: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <Result status="500" title="500" subTitle="Sorry, something went wrong." />
  );
};

export default SystemErrorPage;
