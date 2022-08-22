import React from 'react';
import BinanceIcon from '@/components/BinanceIcon';
import { notification } from 'antd';

import type { ArgsProps } from 'antd/lib/notification';

const successIcon = React.createElement(BinanceIcon, {
  type: 'icon-success-filled-f',
  style: { color: '#02c076' },
});

const success: (args: Partial<ArgsProps>) => void = ({
  icon = successIcon,
  message = 'success',
  description,
}) =>
  notification.success({
    icon,
    message,
    description,
  });

const error: (args: Partial<ArgsProps>) => void = ({
  // icon = errorIcon,
  message = 'error',
  description,
}) =>
  notification.error({
    // icon,
    message,
    description,
  });

const warning: (args: Partial<ArgsProps>) => void = ({
  // icon = warningIcon,
  message = 'error',
  description,
}) =>
  notification.warning({
    // icon,
    message,
    description,
  });

const info: (args: Partial<ArgsProps>) => void = ({
  // icon = infoIcon,
  message = 'error',
  description,
}) =>
  notification.info({
    // icon,
    message,
    description,
  });

export default {
  success,
  error,
  warning,
  info,
};
