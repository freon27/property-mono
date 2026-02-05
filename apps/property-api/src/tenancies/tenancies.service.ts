import { Injectable } from '@nestjs/common';
import { DrizzleService, InsertTenancy, tenancy, UpdateTenancy } from '@property-mono/shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class TenanciesService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(newTenancy: InsertTenancy) {
    return this.drizzle.db.insert(tenancy).values(newTenancy).returning();
  }

  findAll() {
    return this.drizzle.db.select().from(tenancy);
  }

  findOne(id: number) {
    return this.drizzle.db.select().from(tenancy).where(eq(tenancy.id, id));
  }

  findByUnit(unitId: number) {
    return this.drizzle.db
      .select()
      .from(tenancy)
      .where(eq(tenancy.unitId, unitId));
  }

  update(id: number, updateTenancy: UpdateTenancy) {
    return this.drizzle.db
      .update(tenancy)
      .set(updateTenancy)
      .where(eq(tenancy.id, id))
      .returning();
  }

  remove(id: number) {
    return this.drizzle.db
      .delete(tenancy)
      .where(eq(tenancy.id, id))
      .returning();
  }
}
