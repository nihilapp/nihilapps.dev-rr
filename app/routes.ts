import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout(
    './_pages/(common)/CommonLayout.tsx',
    [
      index('./_pages/(common)/IndexPage.tsx'),
      route('/test', './_pages/(common)/test/TestPage.tsx'),
    ]
  ),

  layout(
    './_pages/(auth)/AuthLayout.tsx',
    [
      route(
        '/auth/signin',
        './_pages/(auth)/auth/signin/SignInPage.tsx'
      ),
      route(
        '/auth/signup',
        './_pages/(auth)/auth/signup/SignUpPage.tsx'
      ),
    ]
  ),
] satisfies RouteConfig;
