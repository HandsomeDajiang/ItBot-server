// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/user/Desktop/ItBot-server/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/BasicLayout').default,
    "routes": [
      {
        "path": "/",
        "component": require('@/pages/video-call').default,
        "exact": true
      },
      {
        "path": "/detail",
        "component": require('@/pages/video-call').default,
        "exact": true
      },
      {
        "path": "/form",
        "component": require('@/pages/meeting-end').default,
        "exact": true
      },
      {
        "component": require('/Users/user/Desktop/ItBot-server/pages/404').default,
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
