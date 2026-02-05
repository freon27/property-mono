import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { DrizzleService } from '../drizzle/drizzle.service';

describe('PropertiesService', () => {
  let service: PropertiesService;

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
        PropertiesService,
        {
          provide: DrizzleService,
          useValue: mockDrizzleService,
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);

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
    it('should insert a new property and return it', async () => {
      const newProperty = {
        name: 'Test Property',
        purchaseDate: new Date('2024-01-01'),
        saleDate: undefined,
      };

      const expectedResult = [
        {
          id: 1,
          name: 'Test Property',
          purchaseDate: new Date('2024-01-01'),
          saleDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockDrizzleDb.returning.mockResolvedValue(expectedResult);

      const result = await service.create(newProperty);

      expect(mockDrizzleDb.insert).toHaveBeenCalledWith(expect.any(Object));
      expect(mockDrizzleDb.values).toHaveBeenCalledWith(newProperty);
      expect(mockDrizzleDb.returning).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all properties', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Property 1',
          purchaseDate: new Date('2024-01-01'),
          saleDate: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Property 2',
          purchaseDate: new Date('2024-02-01'),
          saleDate: new Date('2024-12-01'),
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

    it('should return empty array when no properties exist', async () => {
      mockDrizzleDb.from.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a property by id', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Property',
          purchaseDate: new Date('2024-01-01'),
          saleDate: null,
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

    it('should return empty array when property not found', async () => {
      mockDrizzleDb.where.mockResolvedValue([]);

      const result = await service.findOne(999);

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a property and return it', async () => {
      const updateData = {
        name: 'Updated Property',
        saleDate: new Date('2024-12-01'),
      };

      const expectedResult = [
        {
          id: 1,
          name: 'Updated Property',
          purchaseDate: new Date('2024-01-01'),
          saleDate: new Date('2024-12-01'),
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
    it('should delete a property and return it', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Deleted Property',
          purchaseDate: new Date('2024-01-01'),
          saleDate: null,
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

    it('should return empty array when property to delete not found', async () => {
      mockDrizzleDb.returning.mockResolvedValue([]);

      const result = await service.remove(999);

      expect(result).toEqual([]);
    });
  });
});
