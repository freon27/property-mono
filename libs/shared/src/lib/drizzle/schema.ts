import { relations } from 'drizzle-orm';
import { property } from './schema/property.entity';
import { unit } from './schema/unit.entity';
import { tenant } from './schema/tenant.entity';
import { tenancy } from './schema/tenancy.entity';

// Define relations here to avoid circular imports
export const propertyRelations = relations(property, ({ many }) => ({
  units: many(unit),
}));

export const unitRelations = relations(unit, ({ one, many }) => ({
  property: one(property, {
    fields: [unit.propertyId],
    references: [property.id],
  }),
  tenancies: many(tenancy),
}));

export const tenantRelations = relations(tenant, ({ many }) => ({
  tenancies: many(tenancy),
}));

export const tenancyRelations = relations(tenancy, ({ one }) => ({
  unit: one(unit, {
    fields: [tenancy.unitId],
    references: [unit.id],
  }),
  tenant: one(tenant, {
    fields: [tenancy.tenantId],
    references: [tenant.id],
  }),
}));

export const schema = {
  property,
  unit,
  tenant,
  tenancy,
  propertyRelations,
  unitRelations,
  tenantRelations,
  tenancyRelations,
};
export type Schema = typeof schema;
export type SchemaName = keyof Schema;
export type { SelectProperty } from './schema/property.entity';
export type { SelectUnit } from './schema/unit.entity';
export type { SelectTenant } from './schema/tenant.entity';
export type { SelectTenancy } from './schema/tenancy.entity';
