import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as express from 'express'; // 🛠 Express import qilish

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Express JSON va URL Encoded middleware-larini qo‘shish
  app.use(express.json()); // 🔥 SHU YO‘QLIGI UCHUN body undefined
  app.use(express.urlencoded({ extended: true }));

  // 🛠️ Request Logger - Har bir requestni log qilish
  app.use((req, res, next) => {
    console.log(`🟢 REQUEST: ${req.method} ${req.url}`);
    console.log(`🔹 Headers:`, req.headers);
    console.log(`🔸 Body:`, req.body); // ✅ Endi undefined bo‘lmaydi!
    next();
  });

  // ✅ DTO va validatsiya
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 🌍 CORS yoqish
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  // 🚀 Serverni ishga tushirish
  await app.listen(process.env.PORT || 4000);
  Logger.log('🚀 Server ishga tushdi: http://localhost:4000', 'Bootstrap');
}

bootstrap();
