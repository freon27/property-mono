import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps } from './timestamps.partial-entity';

export const tenancy = pgTable('tenancy', {
  ...timestamps,
  id: serial().primaryKey(),
  unitId: integer('unit_id').notNull(),
  tenantId: integer('tenant_id').notNull(),
  leaseStartDate: timestamp('lease_start_date').notNull(),
  leaseEndDate: timestamp('lease_end_date'),
  monthlyRent: integer('monthly_rent').notNull(),
  securityDeposit: integer('security_deposit').notNull(),
});

export const selectTenancySchema = createSelectSchema(tenancy);
export type SelectTenancy = z.infer<typeof selectTenancySchema>;

export const insertTenancySchema = z.object({
  unitId: z.number().int().positive(),
  tenantId: z.number().int().positive(),
  leaseStartDate: z.coerce.date(),
  leaseEndDate: z.coerce.date().optional(),
  monthlyRent: z.number().int().positive(),
  securityDeposit: z.number().int().min(0),
});
export type InsertTenancy = z.infer<typeof insertTenancySchema>;

export const updateTenancySchema = insertTenancySchema.partial();
export type UpdateTenancy = z.infer<typeof updateTenancySchema>;
