import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

export default flatRoutes({
  rootDirectory: '_routes',
}) satisfies RouteConfig;

// export default [
//   layout(
//     './_pages/(common)/CommonLayout.tsx',
//     [
//       index('./_pages/(common)/IndexPage.tsx'),
//       route('/test', './_pages/(common)/test/TestPage.tsx'),
//     ]
//   ),

//   layout(
//     './_pages/(auth)/AuthLayout.tsx',
//     [
//       route(
//         '/auth/signin',
//         './_pages/(auth)/auth/signin/SignInPage.tsx'
//       ),
//       route(
//         '/auth/signup',
//         './_pages/(auth)/auth/signup/SignUpPage.tsx'
//       ),
//     ]
//   ),
// ] satisfies RouteConfig;
