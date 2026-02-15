import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { property } from './schema/property.entity';
import { unit } from './schema/unit.entity';
import { tenant } from './schema/tenant.entity';
import { tenancy } from './schema/tenancy.entity';

dotenv.config();

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'],
});

const db = drizzle(pool);

async function seed() {
  console.log('🌱 Starting seed...');

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log('Clearing existing data...');
    await db.delete(tenancy);
    await db.delete(tenant);
    await db.delete(unit);
    await db.delete(property);

    // Insert properties
    console.log('Creating properties...');
    const [prop1, prop2, prop3, prop4] = await db
      .insert(property)
      .values([
        {
          name: 'Sunset Apartments',
          purchaseDate: new Date('2020-01-15'),
          residentialUnitCount: 3,
          commercialUnitCount: 0,
          location: { x: 13.3895, y: 52.5170 }, // Charlottenburg, Berlin
        },
        {
          name: 'Downtown Plaza',
          purchaseDate: new Date('2021-06-01'),
          residentialUnitCount: 2,
          commercialUnitCount: 1,
          location: { x: 13.4050, y: 52.5200 }, // Mitte, Berlin
        },
        {
          name: 'Lakeside Villas',
          purchaseDate: new Date('2019-09-10'),
          residentialUnitCount: 2,
          commercialUnitCount: 0,
          location: { x: 13.4288, y: 52.5165 }, // Friedrichshain, Berlin
        },
        {
          name: 'Hilltop Homes',
          purchaseDate: new Date('2022-03-20'),
          residentialUnitCount: 2,
          commercialUnitCount: 0,
          location: { x: 13.4407, y: 52.4934 }, // Kreuzberg, Berlin
        },
      ])
      .returning();

    console.log(`✓ Created ${4} properties`);

    // Insert units
    console.log('Creating units...');
    const units = await db
      .insert(unit)
      .values([
        // Sunset Apartments units
        {
          propertyId: prop1.id,
          unitNumber: '101',
          rooms: 2,
          bathrooms: 1,
          squareMeters: 75,
          monthlyRent: 1200,
        },
        {
          propertyId: prop1.id,
          unitNumber: '102',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 95,
          monthlyRent: 1500,
        },
        {
          propertyId: prop1.id,
          unitNumber: '201',
          rooms: 2,
          bathrooms: 1,
          squareMeters: 75,
          monthlyRent: 1250,
        },
        // Downtown Plaza units
        {
          propertyId: prop2.id,
          unitNumber: 'A1',
          rooms: 1,
          bathrooms: 1,
          squareMeters: 55,
          monthlyRent: 1000,
        },
        {
          propertyId: prop2.id,
          unitNumber: 'A2',
          rooms: 2,
          bathrooms: 1,
          squareMeters: 70,
          monthlyRent: 1300,
        },
        // Lakeside Villas units
        {
          propertyId: prop3.id,
          unitNumber: 'L1',
          rooms: 4,
          bathrooms: 3,
          squareMeters: 150,
          monthlyRent: 2500,
        },
        {
          propertyId: prop3.id,
          unitNumber: 'L2',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 120,
          monthlyRent: 2000,
        },
        // Hilltop Homes units
        {
          propertyId: prop4.id,
          unitNumber: 'H1',
          rooms: 2,
          bathrooms: 1,
          squareMeters: 80,
          monthlyRent: 1400,
        },
        {
          propertyId: prop4.id,
          unitNumber: 'H2',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 110,
          monthlyRent: 1800,
        },
      ])
      .returning();

    console.log(`✓ Created ${units.length} units`);

    // Insert tenants
    console.log('Creating tenants...');
    const tenants = await db
      .insert(tenant)
      .values([
        {
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1-555-0101',
        },
        {
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '+1-555-0102',
        },
        {
          name: 'Michael Brown',
          email: 'mbrown@example.com',
          phone: '+1-555-0103',
        },
        {
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          phone: '+1-555-0104',
        },
        {
          name: 'David Wilson',
          email: 'dwilson@example.com',
        },
        {
          name: 'Olivia Martinez',
          email: 'olivia.martinez@example.com',
          phone: '+1-555-0105',
        },
        {
          name: 'James Lee',
          email: 'james.lee@example.com',
          phone: '+1-555-0106',
        },
        {
          name: 'Sophia Kim',
          email: 'sophia.kim@example.com',
          phone: '+1-555-0107',
        },
      ])
      .returning();

    console.log(`✓ Created ${tenants.length} tenants`);

    // Insert tenancies
    console.log('Creating tenancies...');
    const tenancies = await db
      .insert(tenancy)
      .values([
        // Current tenancies
        {
          unitId: units[0].id,
          tenantId: tenants[0].id,
          leaseStartDate: new Date('2024-01-01'),
          leaseEndDate: new Date('2025-12-31'),
          monthlyRent: 1200,
          securityDeposit: 2400,
        },
        {
          unitId: units[1].id,
          tenantId: tenants[1].id,
          leaseStartDate: new Date('2024-06-01'),
          leaseEndDate: new Date('2025-05-31'),
          monthlyRent: 1500,
          securityDeposit: 3000,
        },
        {
          unitId: units[3].id,
          tenantId: tenants[2].id,
          leaseStartDate: new Date('2025-01-01'),
          leaseEndDate: new Date('2026-12-31'),
          monthlyRent: 1000,
          securityDeposit: 2000,
        },
        {
          unitId: units[4].id,
          tenantId: tenants[3].id,
          leaseStartDate: new Date('2025-03-01'),
          leaseEndDate: new Date('2026-02-28'),
          monthlyRent: 1300,
          securityDeposit: 2600,
        },
        // Past tenancy - showing tenant history
        {
          unitId: units[0].id,
          tenantId: tenants[0].id,
          leaseStartDate: new Date('2022-01-01'),
          leaseEndDate: new Date('2023-12-31'),
          monthlyRent: 1100,
          securityDeposit: 2200,
        },
        // Future tenancy
        {
          unitId: units[2].id,
          tenantId: tenants[4].id,
          leaseStartDate: new Date('2026-04-01'),
          leaseEndDate: new Date('2027-03-31'),
          monthlyRent: 1250,
          securityDeposit: 2500,
        },
        // New tenancies for new properties/units/tenants
        {
          unitId: units[5].id,
          tenantId: tenants[5].id,
          leaseStartDate: new Date('2023-05-01'),
          leaseEndDate: new Date('2024-04-30'),
          monthlyRent: 2500,
          securityDeposit: 5000,
        },
        {
          unitId: units[6].id,
          tenantId: tenants[6].id,
          leaseStartDate: new Date('2024-09-01'),
          leaseEndDate: new Date('2025-08-31'),
          monthlyRent: 2000,
          securityDeposit: 4000,
        },
        {
          unitId: units[7].id,
          tenantId: tenants[7].id,
          leaseStartDate: new Date('2025-11-01'),
          leaseEndDate: new Date('2026-10-31'),
          monthlyRent: 1400,
          securityDeposit: 2800,
        },
        {
          unitId: units[8].id,
          tenantId: tenants[1].id,
          leaseStartDate: new Date('2023-01-01'),
          leaseEndDate: new Date('2023-12-31'),
          monthlyRent: 1800,
          securityDeposit: 3600,
        },
      ])
      .returning();

    console.log(`✓ Created ${tenancies.length} tenancies`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\nSummary:');
    console.log(`- ${2} properties`);
    console.log(`- ${units.length} units`);
    console.log(`- ${tenants.length} tenants`);
    console.log(`- ${tenancies.length} tenancies`);
    console.log(
      '\nNote: John Smith has 2 tenancies (past and current) in unit 101, demonstrating tenant history.',
    );
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
