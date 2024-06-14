const request = require('supertest');
const app = require('../src/server');
const Phone = require('../src/models/phone');

const mockPhones = [
  { imei: 'IMEI-123', model: 'iPhone', brand: 'Apple', price: 999 },
  { imei: 'IMEI-456', model: 'Galaxy', brand: 'Samsung', price: 899 }
];

describe('Phones API', () => {
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

  it('should get all phones successfully', done => {
    request(app)
      .post('/rpc')
      .send({ method: 'getAllPhones' })
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockPhones);
        done();
      });
  });

  it('should handle error when getting all phones', done => {
    findAllStub.mockRejectedValue(new Error('Database Error'));

    request(app)
      .post('/rpc')
      .send({ method: 'getAllPhones' })
      .end((err, res) => {
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
        done();
      });
  });

  it('should get phone by IMEI successfully', done => {
    findByPkStub.mockResolvedValue({
      ...mockPhones[0],
      update: updateStub
    });

    request(app)
      .post('/rpc')
      .send({ method: 'getPhoneByIMEI', params: { imei: 'IMEI-123' } })
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockPhones[0]);
        done();
      });
  });

  it('should handle phone not found when getting by IMEI', done => {
    findByPkStub.mockResolvedValue(null);

    request(app)
      .post('/rpc')
      .send({ method: 'getPhoneByIMEI', params: { imei: 'IMEI-999' } })
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Phone not found' });
        done();
      });
  });

  it('should handle error when getting phone by IMEI', done => {
    findByPkStub.mockRejectedValue(new Error('Database Error'));

    request(app)
      .post('/rpc')
      .send({ method: 'getPhoneByIMEI', params: { imei: 'IMEI-123' } })
      .end((err, res) => {
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
        done();
      });
  });

  it('should add a new phone successfully', done => {
    createStub.mockResolvedValue();

    request(app)
      .post('/rpc')
      .send({ method: 'addPhone', params: { model: 'Pixel', brand: 'Google', price: 799 } })
      .end((err, res) => {
        expect(res.status).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({ message: 'Phone added successfully' }));
        done();
      });
  });

  it('should handle error when adding a new phone', done => {
    createStub.mockRejectedValue(new Error('Database Error'));

    request(app)
      .post('/rpc')
      .send({ method: 'addPhone', params: { model: 'Pixel', brand: 'Google', price: 799 } })
      .end((err, res) => {
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
        done();
      });
  });

  it('should update a phone successfully', done => {
    jest.setTimeout(10000); // Aumentar el tiempo de espera
    findByPkStub.mockResolvedValue({
      ...mockPhones[0],
      update: updateStub
    });

    request(app)
      .post('/rpc')
      .send({ method: 'updatePhone', params: { imei: 'IMEI-123', model: 'Pixel', brand: 'Google', price: 799 } })
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: `Phone with IMEI IMEI-123 updated successfully` });
        done();
      });
  });

  it('should handle phone not found when updating', done => {
    jest.setTimeout(10000); // Aumentar el tiempo de espera
    findByPkStub.mockResolvedValue(null);

    request(app)
      .post('/rpc')
      .send({ method: 'updatePhone', params: { imei: 'IMEI-999', model: 'Pixel', brand: 'Google', price: 799 } })
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Phone not found' });
        done();
      });
  });

  it('should handle error when updating a phone', done => {
    jest.setTimeout(10000); // Aumentar el tiempo de espera
    findByPkStub.mockRejectedValue(new Error('Database Error'));

    request(app)
      .post('/rpc')
      .send({ method: 'updatePhone', params: { imei: 'IMEI-123', model: 'Pixel', brand: 'Google', price: 799 } })
      .end((err, res) => {
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
        done();
      });
  });

  it('should delete a phone successfully', done => {
    jest.setTimeout(10000); // Aumentar el tiempo de espera
    findByPkStub.mockResolvedValue({
      ...mockPhones[0],
      destroy: destroyStub
    });

    request(app)
      .post('/rpc')
      .send({ method: 'deletePhone', params: { imei: 'IMEI-123' } })
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: `Phone with IMEI IMEI-123 deleted successfully` });
        done();
      });
  });

  it('should handle phone not found when deleting', done => {
    jest.setTimeout(10000); // Aumentar el tiempo de espera
    findByPkStub.mockResolvedValue(null);

    request(app)
      .post('/rpc')
      .send({ method: 'deletePhone', params: { imei: 'IMEI-999' } })
      .end((err, res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Phone not found' });
        done();
      });
  });

  it('should handle error when deleting a phone', done => {
    jest.setTimeout(10000); // Aumentar el tiempo de espera
    findByPkStub.mockRejectedValue(new Error('Database Error'));

    request(app)
      .post('/rpc')
      .send({ method: 'deletePhone', params: { imei: 'IMEI-123' } })
      .end((err, res) => {
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
        done();
      });
  });
});
