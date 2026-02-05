import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps } from './timestamps.partial-entity';

export const unit = pgTable('unit', {
  ...timestamps,
  id: serial().primaryKey(),
  propertyId: integer('property_id').notNull(),
  unitNumber: text('unit_number').notNull(),
  rooms: integer().notNull(),
  bathrooms: integer().notNull(),
  squareMeters: integer('square_meters'),
  monthlyRent: integer('monthly_rent').notNull(),
});

export const selectUnitSchema = createSelectSchema(unit);
export type SelectUnit = z.infer<typeof selectUnitSchema>;

export const insertUnitSchema = z.object({
  propertyId: z.number().int().positive(),
  unitNumber: z.string().min(1),
  rooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  squareMeters: z.number().int().positive().optional(),
  monthlyRent: z.number().int().positive(),
});
export type InsertUnit = z.infer<typeof insertUnitSchema>;

export const updateUnitSchema = insertUnitSchema.partial();
export type UpdateUnit = z.infer<typeof updateUnitSchema>;
