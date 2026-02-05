import { Injectable } from '@nestjs/common';
import { eq, and, lte, or, gte, isNull } from 'drizzle-orm';
import { DrizzleService, unit, tenancy, InsertUnit, UpdateUnit } from '@property-mono/shared';



@Injectable()
export class UnitsService {
  constructor(private readonly drizzle: DrizzleService
  ) {}

  create(newUnit: InsertUnit) {
    return this.drizzle.db.insert(unit).values(newUnit).returning();
  }

  findAll() {
    return this.drizzle.db.select().from(unit);
  }

  async findOne(id: number) {
    const now = new Date();

    return this.drizzle.db.query.unit.findFirst({
      where: eq(unit.id, id),
      with: {
        tenancies: {
          where: and(
            lte(tenancy.leaseStartDate, now),
            or(gte(tenancy.leaseEndDate, now), isNull(tenancy.leaseEndDate)),
          ),
          with: {
            tenant: true,
          },
        },
      },
    });
  }

  findByProperty(propertyId: number) {
    return this.drizzle.db
      .select()
      .from(unit)
      .where(eq(unit.propertyId, propertyId));
  }

  update(id: number, updateUnit: UpdateUnit) {
    return this.drizzle.db
      .update(unit)
      .set(updateUnit)
      .where(eq(unit.id, id))
      .returning();
  }

  remove(id: number) {
    return this.drizzle.db.delete(unit).where(eq(unit.id, id)).returning();
  }
}
