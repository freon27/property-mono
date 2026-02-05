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
import { UnitsService } from './units.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { InsertUnit, insertUnitSchema, UpdateUnit } from '@property-mono/shared';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(insertUnitSchema))
  create(@Body() unit: InsertUnit) {
    return this.unitsService.create(unit);
  }

  @Get()
  findAll() {
    return this.unitsService.findAll();
  }

  @Get('property/:propertyId')
  findByProperty(@Param('propertyId') propertyId: string) {
    return this.unitsService.findByProperty(+propertyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnit: UpdateUnit) {
    return this.unitsService.update(+id, updateUnit);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(+id);
  }
}
