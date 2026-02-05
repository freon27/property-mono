import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { InsertTenant, insertTenantSchema, UpdateTenant } from '@property-mono/shared';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(insertTenantSchema))
  create(@Body() tenant: InsertTenant) {
    return this.tenantsService.create(tenant);
  }

  @Get()
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenant: UpdateTenant) {
    return this.tenantsService.update(+id, updateTenant);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(+id);
  }
}
