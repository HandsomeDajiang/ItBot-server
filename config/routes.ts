export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: '@/pages/dashboard' },
      { path: '/detail', component: '@/pages/detail' },
      { path: '/form', component: '@/pages/form' },
    ],
  },
];
