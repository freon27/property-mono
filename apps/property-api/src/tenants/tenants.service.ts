import { Injectable } from '@nestjs/common';
import { DrizzleService, InsertTenant, tenant, UpdateTenant } from '@property-mono/shared';
import { eq } from 'drizzle-orm';


@Injectable()
export class TenantsService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(newTenant: InsertTenant) {
    return this.drizzle.db.insert(tenant).values(newTenant).returning();
  }

  findAll() {
    return this.drizzle.db.select().from(tenant);
  }

  async findOne(id: number) {
    return this.drizzle.db.query.tenant.findFirst({
      where: eq(tenant.id, id),
      with: {
        tenancies: true,
      },
    });
  }

  update(id: number, updateTenant: UpdateTenant) {
    return this.drizzle.db
      .update(tenant)
      .set(updateTenant)
      .where(eq(tenant.id, id))
      .returning();
  }

  remove(id: number) {
    return this.drizzle.db.delete(tenant).where(eq(tenant.id, id)).returning();
  }
}
