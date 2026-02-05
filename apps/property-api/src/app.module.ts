import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { ConfigModule } from '@nestjs/config';
import { UnitsModule } from './units/units.module';
import { TenantsModule } from './tenants/tenants.module';
import { DrizzleModule } from '@property-mono/shared';

@Module({
  imports: [
    PropertiesModule,
    UnitsModule,
    TenantsModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
