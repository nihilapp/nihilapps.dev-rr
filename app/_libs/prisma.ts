// import { PrismaClient } from '@/_prisma/client/client.js';

// // PrismaClient는 전역 싱글톤으로 사용합니다.
// // https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

// export class DB {
//   static client() {
//     const globalForPrisma = global as unknown as { prisma: PrismaClient };

//     const prisma = globalForPrisma.prisma
//       || new PrismaClient({
//         log: process.env.NODE_ENV === 'development' ? [ 'query', 'error', 'warn', ] : [ 'error', ],
//       });

//     if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

//     // 서버 종료 시 연결 정리
//     if (!globalForPrisma.prisma) {
//       process.on('SIGINT', async () => {
//         await prisma.$disconnect();
//         process.exit(0);
//       });

//       process.on('SIGTERM', async () => {
//         await prisma.$disconnect();
//         process.exit(0);
//       });
//     }

//     return prisma;
//   }

//   static user() {
//     return this.client().user;
//   }

//   static userAuth() {
//     return this.client().userAuth;
//   }

//   // 명시적으로 연결을 초기화하는 메서드
//   static async connect() {
//     try {
//       await this.client().$connect();
//       console.log('✅ 데이터베이스 연결 성공');
//       return true;
//     }
//     catch (error) {
//       console.error('❌ 데이터베이스 연결 실패:', error);
//       return false;
//     }
//   }

//   // 명시적으로 연결을 종료하는 메서드
//   static async disconnect() {
//     try {
//       await this.client().$disconnect();
//       console.log('✅ 데이터베이스 연결 종료');
//       return true;
//     }
//     catch (error) {
//       console.error('❌ 데이터베이스 연결 종료 실패:', error);
//       return false;
//     }
//   }
// }
