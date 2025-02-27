import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // 💡 Export qilish shart
})
export class ConfigModule {}
