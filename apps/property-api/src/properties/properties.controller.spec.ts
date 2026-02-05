import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

describe('PropertiesController', () => {
  let controller: PropertiesController;

  const mockPropertiesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: mockPropertiesService,
        },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new property', async () => {
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

      mockPropertiesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(newProperty);

      expect(mockPropertiesService.create).toHaveBeenCalledWith(newProperty);
      expect(mockPropertiesService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of properties', async () => {
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

      mockPropertiesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(mockPropertiesService.findAll).toHaveBeenCalled();
      expect(mockPropertiesService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should return an empty array when no properties exist', async () => {
      mockPropertiesService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

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

      mockPropertiesService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(mockPropertiesService.findOne).toHaveBeenCalledWith(1);
      expect(mockPropertiesService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string id to number', async () => {
      mockPropertiesService.findOne.mockResolvedValue([]);

      await controller.findOne('42');

      expect(mockPropertiesService.findOne).toHaveBeenCalledWith(42);
    });
  });

  describe('update', () => {
    it('should update a property', async () => {
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

      mockPropertiesService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', updateData);

      expect(mockPropertiesService.update).toHaveBeenCalledWith(1, updateData);
      expect(mockPropertiesService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string id to number when updating', async () => {
      const updateData = { name: 'Updated' };

      mockPropertiesService.update.mockResolvedValue([]);

      await controller.update('5', updateData);

      expect(mockPropertiesService.update).toHaveBeenCalledWith(5, updateData);
    });
  });

  describe('remove', () => {
    it('should delete a property', async () => {
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

      mockPropertiesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');

      expect(mockPropertiesService.remove).toHaveBeenCalledWith(1);
      expect(mockPropertiesService.remove).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });

    it('should convert string id to number when deleting', async () => {
      mockPropertiesService.remove.mockResolvedValue([]);

      await controller.remove('99');

      expect(mockPropertiesService.remove).toHaveBeenCalledWith(99);
    });
  });
});
