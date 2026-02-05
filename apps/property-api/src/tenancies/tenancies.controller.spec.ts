import { Test, TestingModule } from '@nestjs/testing';
import { TenanciesController } from './tenancies.controller';
import { TenanciesService } from './tenancies.service';

describe('TenanciesController', () => {
  let controller: TenanciesController;

  const mockTenanciesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByUnit: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenanciesController],
      providers: [
        {
          provide: TenanciesService,
          useValue: mockTenanciesService,
        },
      ],
    }).compile();

    controller = module.get<TenanciesController>(TenanciesController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tenancy', async () => {
      const newTenancy = {
        unitId: 1,
        tenantName: 'John Doe',
        tenantEmail: 'john@example.com',
        tenantPhone: '555-0100',
        leaseStartDate: new Date('2024-01-01'),
        leaseEndDate: new Date('2024-12-31'),
        monthlyRent: 1500,
        securityDeposit: 3000,
      };

      const expectedResult = [{ id: 1, ...newTenancy }];
      mockTenanciesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(newTenancy);

      expect(mockTenanciesService.create).toHaveBeenCalledWith(newTenancy);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of tenancies', async () => {
      const expectedResult = [
        {
          id: 1,
          unitId: 1,
          tenantName: 'John Doe',
          tenantEmail: 'john@example.com',
          monthlyRent: 1500,
        },
        {
          id: 2,
          unitId: 2,
          tenantName: 'Jane Smith',
          tenantEmail: 'jane@example.com',
          monthlyRent: 2000,
        },
      ];

      mockTenanciesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(mockTenanciesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findByUnit', () => {
    it('should return tenancies for a specific unit', async () => {
      const unitId = '1';
      const expectedResult = [
        {
          id: 1,
          unitId: 1,
          tenantName: 'John Doe',
          tenantEmail: 'john@example.com',
          monthlyRent: 1500,
        },
      ];

      mockTenanciesService.findByUnit.mockResolvedValue(expectedResult);

      const result = await controller.findByUnit(unitId);

      expect(mockTenanciesService.findByUnit).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single tenancy by id', async () => {
      const id = '1';
      const expectedResult = [
        {
          id: 1,
          unitId: 1,
          tenantName: 'John Doe',
          tenantEmail: 'john@example.com',
          monthlyRent: 1500,
        },
      ];

      mockTenanciesService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(mockTenanciesService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a tenancy', async () => {
      const id = '1';
      const updateTenancy = {
        tenantName: 'John Doe Updated',
        monthlyRent: 1600,
      };

      const expectedResult = [
        {
          id: 1,
          unitId: 1,
          tenantName: 'John Doe Updated',
          tenantEmail: 'john@example.com',
          monthlyRent: 1600,
        },
      ];

      mockTenanciesService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateTenancy);

      expect(mockTenanciesService.update).toHaveBeenCalledWith(
        1,
        updateTenancy,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a tenancy', async () => {
      const id = '1';
      const expectedResult = [
        {
          id: 1,
          unitId: 1,
          tenantName: 'John Doe',
          tenantEmail: 'john@example.com',
          monthlyRent: 1500,
        },
      ];

      mockTenanciesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(mockTenanciesService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedResult);
    });
  });
});
