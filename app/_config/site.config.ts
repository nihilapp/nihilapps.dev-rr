import type { SiteConfig } from '@/_entities/common';

export const siteConfig: SiteConfig = {
  title: '사이트 이름',
  description: '사이트 설명',
  keywords: '사이트,키워드',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:3000',
  cover: {
    link: '/opengraph-image.png',
    alt: '이미지',
  },
  logo: '/images/nihil-logo.png',
  darkLogo: '/images/nihil-logo-w.png',
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  get apiRoute() {
    return `${this.url}/api`;
  },
};
