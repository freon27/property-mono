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
import { PropertiesService } from './properties.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { InsertProperty, insertPropertySchema, UpdateProperty } from '@property-mono/shared';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(insertPropertySchema))
  create(@Body() property: InsertProperty) {
    return this.propertiesService.create(property);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProperty: UpdateProperty) {
    return this.propertiesService.update(+id, updateProperty);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
