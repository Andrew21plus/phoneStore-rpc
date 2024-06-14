const phonesController = require('../src/controllers/phonesController');
const Phone = require('../src/models/phone');

const mockPhones = [
  { imei: 'IMEI-123', model: 'iPhone', brand: 'Apple', price: 999 },
  { imei: 'IMEI-456', model: 'Galaxy', brand: 'Samsung', price: 899 }
];

describe('Phones Controller', () => {
  let findAllStub, findByPkStub, createStub, updateStub, destroyStub;

  beforeEach(() => {
    findAllStub = jest.spyOn(Phone, 'findAll').mockResolvedValue(mockPhones);
    findByPkStub = jest.spyOn(Phone, 'findByPk');
    createStub = jest.spyOn(Phone, 'create');
    updateStub = jest.fn();
    destroyStub = jest.fn();

    Phone.prototype.update = updateStub;
    Phone.prototype.destroy = destroyStub;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should get all phones successfully', async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await phonesController.getAllPhonesRPC(req, res);

    expect(res.json).toHaveBeenCalledWith(mockPhones);
  });

  it('should handle error when getting all phones', async () => {
    findAllStub.mockRejectedValue(new Error('Database Error'));

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await phonesController.getAllPhonesRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('should get phone by IMEI successfully', async () => {
    const req = { body: { imei: 'IMEI-123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    findByPkStub.mockResolvedValue(mockPhones[0]);

    await phonesController.getPhoneByIMEIRPC(req, res);

    expect(res.json).toHaveBeenCalledWith(mockPhones[0]);
  });

  it('should handle phone not found when getting by IMEI', async () => {
    const req = { body: { imei: 'IMEI-999' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    findByPkStub.mockResolvedValue(null);

    await phonesController.getPhoneByIMEIRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Phone not found' });
  });

  it('should handle error when getting phone by IMEI', async () => {
    findByPkStub.mockRejectedValue(new Error('Database Error'));

    const req = { body: { imei: 'IMEI-123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await phonesController.getPhoneByIMEIRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('should add a new phone successfully', async () => {
    const req = { body: { model: 'Pixel', brand: 'Google', price: 799 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    createStub.mockResolvedValue();

    await phonesController.addPhoneRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Phone added successfully' }));
  });

  it('should handle error when adding a new phone', async () => {
    createStub.mockRejectedValue(new Error('Database Error'));

    const req = { body: { model: 'Pixel', brand: 'Google', price: 799 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await phonesController.addPhoneRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('should update a phone successfully', async () => {
    const req = { body: { imei: 'IMEI-123', model: 'Pixel', brand: 'Google', price: 799 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    findByPkStub.mockResolvedValue({
      ...mockPhones[0],
      update: updateStub
    });

    await phonesController.updatePhoneRPC(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: `Phone with IMEI IMEI-123 updated successfully` });
  });

  it('should handle phone not found when updating', async () => {
    const req = { body: { imei: 'IMEI-999', model: 'Pixel', brand: 'Google', price: 799 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    findByPkStub.mockResolvedValue(null);

    await phonesController.updatePhoneRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Phone not found' });
  });

  it('should handle error when updating a phone', async () => {
    findByPkStub.mockRejectedValue(new Error('Database Error'));

    const req = { body: { imei: 'IMEI-123', model: 'Pixel', brand: 'Google', price: 799 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await phonesController.updatePhoneRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });

  it('should delete a phone successfully', async () => {
    const req = { body: { imei: 'IMEI-123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    findByPkStub.mockResolvedValue({
      ...mockPhones[0],
      destroy: destroyStub
    });

    await phonesController.deletePhoneRPC(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: `Phone with IMEI ${req.body.imei} deleted successfully` });
  });

  it('should handle phone not found when deleting', async () => {
    const req = { body: { imei: 'IMEI-999' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    findByPkStub.mockResolvedValue(null);

    await phonesController.deletePhoneRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Phone not found' });
  });

  it('should handle error when deleting a phone', async () => {
    findByPkStub.mockRejectedValue(new Error('Database Error'));

    const req = { body: { imei: 'IMEI-123' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await phonesController.deletePhoneRPC(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
