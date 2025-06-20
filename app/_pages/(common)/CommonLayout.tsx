import { Outlet } from 'react-router';

import { CommonContent, CommonFooter, CommonHeader, CommonNav } from '@/_pages/(common)/_layouts';

import type { Route } from './+types/CommonLayout';

export default function CommonLayout({}: Route.ComponentProps) {
  return (
    <>
      <CommonHeader />
      <CommonNav />
      <CommonContent>
        <Outlet />
      </CommonContent>
      <CommonFooter />
    </>
  );
}
