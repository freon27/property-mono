import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps } from './timestamps.partial-entity';

export const tenant = pgTable('tenant', {
  ...timestamps,
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
});

export const selectTenantSchema = createSelectSchema(tenant);
export type SelectTenant = z.infer<typeof selectTenantSchema>;

export const insertTenantSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});
export type InsertTenant = z.infer<typeof insertTenantSchema>;

export const updateTenantSchema = insertTenantSchema.partial();
export type UpdateTenant = z.infer<typeof updateTenantSchema>;
