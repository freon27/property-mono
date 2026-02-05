import { pgTable, serial, timestamp, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps } from './timestamps.partial-entity';

export const property = pgTable('property', {
  ...timestamps,
  id: serial().primaryKey(),
  name: text().notNull(),
  purchaseDate: timestamp('purchase_date').notNull(),
  saleDate: timestamp('sale_date'),
});

export const selectPropertySchema = createSelectSchema(property);
export type SelectProperty = z.infer<typeof selectPropertySchema>;

export const insertPropertySchema = z.object({
  name: z.string().min(1),
  purchaseDate: z.coerce.date(),
  saleDate: z.coerce.date().optional(),
});
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export const updatePropertySchema = insertPropertySchema.partial();
export type UpdateProperty = z.infer<typeof updatePropertySchema>;
