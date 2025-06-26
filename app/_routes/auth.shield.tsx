import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';
import { z } from 'zod';

import { FirstShield } from '@/_components/auth';
import { Button } from '@/_components/common/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/_components/common/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/common/ui/form';
import { Input } from '@/_components/common/ui/input';
import { createErrorResponse, setMeta } from '@/_libs';

import type { Route } from './+types/auth.shield';

export function loader({ request, }: Route.LoaderArgs) {
  return {};
}

export async function action({ request, }: Route.ActionArgs) {
  return {};
}

export function meta({}: Route.MetaArgs) {
  return setMeta({
    title: `1차 보호막`,
    url: `/auth/shield`,
  });
}

export default function AuthShieldPage({ }: Route.ComponentProps) {
  // 사용자가 이메일을 입력하면 패스코드 입력란이 노출되기 위해 스테이트를 만듬.
  const [ isOpen, setIsOpen, ] = useState(false);

  return (
    <>
      {/* 패스코드 입력란이 노출되지 않은 상태. 이메일을 입력받도록 함. */}
      {!isOpen && (
        <FirstShield setIsOpen={setIsOpen} />
      )}

      {/* 패스코드 입력란이 노출된 상태. 패스코드를 입력받도록 함. */}
      {isOpen && (
        <></>
      )}
    </>
  );
}
