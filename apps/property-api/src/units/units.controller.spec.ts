import { Test, TestingModule } from '@nestjs/testing';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

describe('UnitsController', () => {
  let controller: UnitsController;

  const mockUnitsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByProperty: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
      providers: [
        {
          provide: UnitsService,
          useValue: mockUnitsService,
        },
      ],
    }).compile();

    controller = module.get<UnitsController>(UnitsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new unit', async () => {
      const newUnit = {
        propertyId: 1,
        unitNumber: '101',
        rooms: 3,
        bathrooms: 2,
        squareMeters: 85,
        monthlyRent: 125000, // 1250.00€ in cents
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

      mockUnitsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(newUnit);

      expect(mockUnitsService.create).toHaveBeenCalledWith(newUnit);
      expect(mockUnitsService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of units', async () => {
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

      mockUnitsService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(mockUnitsService.findAll).toHaveBeenCalled();
      expect(mockUnitsService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should return an empty array when no units exist', async () => {
      mockUnitsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findByProperty', () => {
    it('should return units for a specific property', async () => {
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

      mockUnitsService.findByProperty.mockResolvedValue(expectedResult);

      const result = await controller.findByProperty('1');

      expect(mockUnitsService.findByProperty).toHaveBeenCalledWith(1);
      expect(mockUnitsService.findByProperty).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string propertyId to number', async () => {
      mockUnitsService.findByProperty.mockResolvedValue([]);

      await controller.findByProperty('42');

      expect(mockUnitsService.findByProperty).toHaveBeenCalledWith(42);
    });

    it('should return empty array when property has no units', async () => {
      mockUnitsService.findByProperty.mockResolvedValue([]);

      const result = await controller.findByProperty('999');

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

      mockUnitsService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(mockUnitsService.findOne).toHaveBeenCalledWith(1);
      expect(mockUnitsService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string id to number', async () => {
      mockUnitsService.findOne.mockResolvedValue([]);

      await controller.findOne('42');

      expect(mockUnitsService.findOne).toHaveBeenCalledWith(42);
    });
  });

  describe('update', () => {
    it('should update a unit', async () => {
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

      mockUnitsService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', updateData);

      expect(mockUnitsService.update).toHaveBeenCalledWith(1, updateData);
      expect(mockUnitsService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string id to number when updating', async () => {
      const updateData = { rooms: 4 };

      mockUnitsService.update.mockResolvedValue([]);

      await controller.update('5', updateData);

      expect(mockUnitsService.update).toHaveBeenCalledWith(5, updateData);
    });
  });

  describe('remove', () => {
    it('should delete a unit', async () => {
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

      mockUnitsService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');

      expect(mockUnitsService.remove).toHaveBeenCalledWith(1);
      expect(mockUnitsService.remove).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string id to number when deleting', async () => {
      mockUnitsService.remove.mockResolvedValue([]);

      await controller.remove('99');

      expect(mockUnitsService.remove).toHaveBeenCalledWith(99);
    });
  });
});
