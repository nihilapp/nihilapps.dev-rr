import type { MetaDescriptor } from 'react-router';

import { siteConfig } from '@/_config';
import type { SiteMetadata } from '@/_entities/common';

/**
 * 메타데이터 설정 함수
 * @param meta 사이트 메타데이터
 * @returns React Router 7 메타데이터 배열
 */
export function setMeta(meta: SiteMetadata): MetaDescriptor[] {
  const siteTitle = `${meta.title} - ${siteConfig.title}`;
  const siteDescription = meta.description || siteConfig.description;
  const siteKeywords = meta.keywords
    ? `${siteConfig.keywords}, ${meta.keywords}`
    : siteConfig.keywords;
  const siteUrl = `${siteConfig.url}${meta.url}`;
  const siteImageLink = meta.imageLink
    ? `${siteConfig.url}${meta.imageLink}`
    : `${siteConfig.url}${siteConfig.cover.link}`;
  const siteImageAlt = meta.imageAlt || siteConfig.cover.alt;
  const siteType = meta.type || siteConfig.type;

  const metaData: MetaDescriptor[] = [
    // 기본 메타 태그
    { title: siteTitle, },
    { name: 'description', content: siteDescription, },
    { name: 'keywords', content: siteKeywords, },
    { name: 'robots', content: meta.robots || 'index, follow', },
    { name: 'author', content: siteConfig.author.name, },

    // Open Graph 메타 태그
    { property: 'og:title', content: meta.title, },
    { property: 'og:description', content: siteDescription, },
    { property: 'og:url', content: siteUrl, },
    { property: 'og:type', content: siteType, },
    { property: 'og:site_name', content: siteConfig.title, },
    { property: 'og:locale', content: 'ko_KR', },
    { property: 'og:image', content: siteImageLink, },
    { property: 'og:image:alt', content: siteImageAlt, },
    { property: 'og:image:width', content: '1920', },
    { property: 'og:image:height', content: '1080', },

    // Twitter 메타 태그
    { name: 'twitter:card', content: 'summary_large_image', },
    { name: 'twitter:title', content: siteTitle, },
    { name: 'twitter:description', content: siteDescription, },
    { name: 'twitter:image', content: siteImageLink, },

    // 추가 메타 태그
    { name: 'version', content: siteConfig.version, },
    { tagName: 'link', rel: 'canonical', href: siteUrl, },
  ];

  // Google 사이트 인증이 있을 경우
  if (siteConfig.googleVerfi) {
    metaData.push(
      { name: 'google-site-verification', content: siteConfig.googleVerfi, }
    );
  }

  // Google Analytics ID가 있을 경우
  if (siteConfig.googleAnalyticsId) {
    metaData.push(
      {
        'script:async': {
          src: `https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`,
        },
      },
      {
        'script:gtag': {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.googleAnalyticsId}');
          `,
        },
      }
    );
  }

  // Google AdSense 스크립트 URL이 있을 경우
  if (siteConfig.googleAdSrc) {
    metaData.push(
      {
        'script:async': {
          src: siteConfig.googleAdSrc,
          crossOrigin: 'anonymous',
        },
      }
    );
  }

  // Schema.org JSON-LD
  metaData.push({
    'script:ld+json': {
      '@context': 'https://schema.org',
      ...(siteType === 'article'
        ? {
            '@type': 'Article',
            'name': `${meta.title} - ${siteConfig.title}`,
            'headline': meta.title,
            'description': siteDescription,
            'url': siteUrl,
            'author': {
              '@type': 'Person',
              'name': siteConfig.author.name,
              'url': siteConfig.author.url,
            },
            'datePublished': meta.created,
            'dateModified': meta.updated || meta.created,
            'image': siteImageLink,
          }
        : {
            '@type': 'WebSite',
            'name': siteConfig.title,
            'description': siteDescription,
            'url': siteUrl,
          }),
    },
  });

  return metaData;
}
