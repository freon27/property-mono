import { Test, TestingModule } from '@nestjs/testing';
import { UnitsService } from './units.service';
import { DrizzleService } from '@property-mono/shared';

describe('UnitsService', () => {
  let service: UnitsService;

  const mockDrizzleDb = {
    insert: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    values: jest.fn(),
    from: jest.fn(),
    where: jest.fn(),
    set: jest.fn(),
    returning: jest.fn(),
  };

  const mockDrizzleService = {
    db: mockDrizzleDb,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        {
          provide: DrizzleService,
          useValue: mockDrizzleService,
        },
      ],
    }).compile();

    service = module.get<UnitsService>(UnitsService);

    // Reset and reconfigure mocks before each test
    jest.clearAllMocks();

    // Re-setup the method chaining
    mockDrizzleDb.insert.mockReturnThis();
    mockDrizzleDb.select.mockReturnThis();
    mockDrizzleDb.update.mockReturnThis();
    mockDrizzleDb.delete.mockReturnThis();
    mockDrizzleDb.values.mockReturnThis();
    mockDrizzleDb.from.mockReturnThis();
    mockDrizzleDb.where.mockReturnThis();
    mockDrizzleDb.set.mockReturnThis();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should insert a new unit and return it', async () => {
      const newUnit = {
        propertyId: 1,
        unitNumber: '101',
        rooms: 3,
        bathrooms: 2,
        squareMeters: 85,
        monthlyRent: 125000,
      };

      const expectedResult = [
        {
          id: 1,
          propertyId: 1,
          unitNumber: '101',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 85,
          monthlyRent: 125000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.returning.mockResolvedValue(expectedResult);

      const result = await service.create(newUnit);

      expect(mockDrizzleDb.insert).toHaveBeenCalledWith(expect.any(Object));
      expect(mockDrizzleDb.values).toHaveBeenCalledWith(newUnit);
      expect(mockDrizzleDb.returning).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all units', async () => {
      const expectedResult = [
        {
          id: 1,
          propertyId: 1,
          unitNumber: '101',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 85,
          monthlyRent: 125000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          propertyId: 1,
          unitNumber: '102',
          rooms: 2,
          bathrooms: 1,
          squareMeters: 60,
          monthlyRent: 95000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.from.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(mockDrizzleDb.select).toHaveBeenCalled();
      expect(mockDrizzleDb.from).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual(expectedResult);
    });

    it('should return empty array when no units exist', async () => {
      mockDrizzleDb.from.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a unit by id', async () => {
      const expectedResult = [
        {
          id: 1,
          propertyId: 1,
          unitNumber: '101',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 85,
          monthlyRent: 125000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.where.mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(mockDrizzleDb.select).toHaveBeenCalled();
      expect(mockDrizzleDb.from).toHaveBeenCalledWith(expect.any(Object));
      expect(mockDrizzleDb.where).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should return empty array when unit not found', async () => {
      mockDrizzleDb.where.mockResolvedValue([]);

      const result = await service.findOne(999);

      expect(result).toEqual([]);
    });
  });

  describe('findByProperty', () => {
    it('should return all units for a specific property', async () => {
      const expectedResult = [
        {
          id: 1,
          propertyId: 1,
          unitNumber: '101',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 85,
          monthlyRent: 125000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          propertyId: 1,
          unitNumber: '102',
          rooms: 2,
          bathrooms: 1,
          squareMeters: 60,
          monthlyRent: 95000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.where.mockResolvedValue(expectedResult);

      const result = await service.findByProperty(1);

      expect(mockDrizzleDb.select).toHaveBeenCalled();
      expect(mockDrizzleDb.from).toHaveBeenCalledWith(expect.any(Object));
      expect(mockDrizzleDb.where).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should return empty array when property has no units', async () => {
      mockDrizzleDb.where.mockResolvedValue([]);

      const result = await service.findByProperty(999);

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a unit and return it', async () => {
      const updateData = {
        unitNumber: '101A',
        monthlyRent: 135000,
      };

      const expectedResult = [
        {
          id: 1,
          propertyId: 1,
          unitNumber: '101A',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 85,
          monthlyRent: 135000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.returning.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateData);

      expect(mockDrizzleDb.update).toHaveBeenCalledWith(expect.any(Object));
      expect(mockDrizzleDb.set).toHaveBeenCalledWith(updateData);
      expect(mockDrizzleDb.where).toHaveBeenCalled();
      expect(mockDrizzleDb.returning).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a unit and return it', async () => {
      const expectedResult = [
        {
          id: 1,
          propertyId: 1,
          unitNumber: '101',
          rooms: 3,
          bathrooms: 2,
          squareMeters: 85,
          monthlyRent: 125000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.returning.mockResolvedValue(expectedResult);

      const result = await service.remove(1);

      expect(mockDrizzleDb.delete).toHaveBeenCalledWith(expect.any(Object));
      expect(mockDrizzleDb.where).toHaveBeenCalled();
      expect(mockDrizzleDb.returning).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should return empty array when unit to delete not found', async () => {
      mockDrizzleDb.returning.mockResolvedValue([]);

      const result = await service.remove(999);

      expect(result).toEqual([]);
    });
  });
});
