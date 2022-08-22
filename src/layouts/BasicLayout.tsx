import React from 'react';
import ErrorBoundary from '@/components/ErrorPage/ErrorBoundary';

const BasicLayout = (props: any) => {
  return <ErrorBoundary>{props.children || null}</ErrorBoundary>;
};
export default BasicLayout;
