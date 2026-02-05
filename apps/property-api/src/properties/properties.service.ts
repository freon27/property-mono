import { Injectable } from '@nestjs/common';
import { DrizzleService, InsertProperty, property, UpdateProperty } from '@property-mono/shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class PropertiesService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(newProperty: InsertProperty) {
    return this.drizzle.db.insert(property).values(newProperty).returning();
  }

  findAll() {
    return this.drizzle.db.select().from(property);
  }

  async findOne(id: number) {
    return this.drizzle.db.query.property.findFirst({
      where: eq(property.id, id),
      with: {
        units: true,
      },
    });
  }

  update(id: number, updateProperty: UpdateProperty) {
    return this.drizzle.db
      .update(property)
      .set(updateProperty)
      .where(eq(property.id, id))
      .returning();
  }

  remove(id: number) {
    return this.drizzle.db
      .delete(property)
      .where(eq(property.id, id))
      .returning();
  }
}
