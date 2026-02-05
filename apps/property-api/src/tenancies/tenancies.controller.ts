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
import { TenanciesService } from './tenancies.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { InsertTenancy, insertTenancySchema, UpdateTenancy } from '@property-mono/shared';

@Controller('tenancies')
export class TenanciesController {
  constructor(private readonly tenanciesService: TenanciesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(insertTenancySchema))
  create(@Body() tenancy: InsertTenancy) {
    return this.tenanciesService.create(tenancy);
  }

  @Get()
  findAll() {
    return this.tenanciesService.findAll();
  }

  @Get('unit/:unitId')
  findByUnit(@Param('unitId') unitId: string) {
    return this.tenanciesService.findByUnit(+unitId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenanciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenancy: UpdateTenancy) {
    return this.tenanciesService.update(+id, updateTenancy);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenanciesService.remove(+id);
  }
}
