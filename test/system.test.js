const { exec } = require('child_process');

describe('Pruebas de la tienda de celulares', () => {
  let serverProcess;

  beforeAll(async () => {
    serverProcess = exec('npm start');
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.goto('http://localhost:3000');
  });

  afterAll(async () => {
    exec('pkill node');
  });

  // Pruebas para agregar un celular

  // Caso de prueba: Agregar un nuevo celular con datos válidos
  test('debería agregar un nuevo celular con datos válidos', async () => {
    console.log('Agregar un nuevo celular con datos válidos');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Rellenar el formulario con datos válidos');
    await page.fill('#modelo', 'iPhone 13');
    await page.fill('#marca', 'Apple');
    await page.fill('#precio', '999');
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de agregar');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click('button[onclick="agregarTelefono()"]');
    await page.waitForTimeout(3000);

    console.log('Verificar si el celular fue agregado correctamente');
    await page.waitForSelector('#tabla-telefonos tr');
    const lastRowSelector = '#tabla-telefonos tr:last-child';
    const imeiText = await page.textContent(`${lastRowSelector} td:nth-child(1)`);
    const modeloText = await page.inputValue(`${lastRowSelector} td:nth-child(2) input`);
    const marcaText = await page.inputValue(`${lastRowSelector} td:nth-child(3) input`);
    const precioText = await page.inputValue(`${lastRowSelector} td:nth-child(4) input`);

    console.log('IMEI del último celular:', imeiText);
    console.log('Modelo del último celular:', modeloText);
    console.log('Marca del último celular:', marcaText);
    console.log('Precio del último celular:', precioText);

    expect(modeloText).toBe('iPhone 13');
    expect(marcaText).toBe('Apple');
    expect(precioText).toBe('999');
  }, 60000);

  // Caso de prueba: No se puede agregar un celular con campos vacíos
  test('no debería agregar un celular con campos vacíos', async () => {
    console.log('No se puede agregar un celular con campos vacíos');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Rellenar el formulario con campos vacíos');
    await page.fill('#modelo', '');
    await page.fill('#marca', '');
    await page.fill('#precio', '');
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de agregar');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor complete todos los campos');
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click('button[onclick="agregarTelefono()"]');
    await page.waitForTimeout(3000);
  }, 60000);

  // Caso de prueba: No se puede agregar un celular con un precio inválido
  test('no debería agregar un celular con un precio inválido', async () => {
    console.log('No se puede agregar un celular con un precio inválido');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Rellenar el formulario con un precio inválido');
    await page.fill('#modelo', 'iPhone 13');
    await page.fill('#marca', 'Apple');
    await page.fill('#precio', '-50');
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de agregar');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor ingrese un precio válido');
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click('button[onclick="agregarTelefono()"]');
    await page.waitForTimeout(3000);
  }, 60000);

  // Pruebas para actualizar un celular

  // Caso de prueba: Actualizar un celular con datos válidos
  test('debería actualizar un celular con datos válidos', async () => {
    console.log('Actualizar un celular con datos válidos');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Actualizar los datos de un celular existente');
    const lastRowSelector = '#tabla-telefonos tr:last-child';
    await page.fill(`${lastRowSelector} td:nth-child(2) input`, 'iPhone 14');
    await page.fill(`${lastRowSelector} td:nth-child(3) input`, 'Apple');
    await page.fill(`${lastRowSelector} td:nth-child(4) input`, '1200');
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de guardar');
    page.once('dialog', async dialog => {
      console.log('Mensaje de confirmación:', dialog.message());
      await page.waitForTimeout(3000);
      dialog.accept();
    });
    await page.click(`${lastRowSelector} button[onclick^="guardarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Verificar si el celular fue actualizado correctamente');
    const modeloText = await page.inputValue(`${lastRowSelector} td:nth-child(2) input`);
    const marcaText = await page.inputValue(`${lastRowSelector} td:nth-child(3) input`);
    const precioText = await page.inputValue(`${lastRowSelector} td:nth-child(4) input`);

    console.log('Modelo del último celular:', modeloText);
    console.log('Marca del último celular:', marcaText);
    console.log('Precio del último celular:', precioText);

    expect(modeloText).toBe('iPhone 14');
    expect(marcaText).toBe('Apple');
    expect(precioText).toBe('1200');
  }, 60000);

  // Caso de prueba: No se puede actualizar un celular con campos vacíos
  test('no debería actualizar un celular con campos vacíos', async () => {
    console.log('No se puede actualizar un celular con campos vacíos');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Actualizar los datos de un celular existente con campos vacíos');
    const lastRowSelector = '#tabla-telefonos tr:last-child';
    await page.fill(`${lastRowSelector} td:nth-child(2) input`, '');
    await page.fill(`${lastRowSelector} td:nth-child(3) input`, '');
    await page.fill(`${lastRowSelector} td:nth-child(4) input`, '');
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de guardar');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor complete todos los campos');
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click(`${lastRowSelector} button[onclick^="guardarTelefono"]`);
    await page.waitForTimeout(3000);
  }, 60000);

  // Caso de prueba: No se puede actualizar un celular con un precio inválido
  test('no debería actualizar un celular con un precio inválido', async () => {
    console.log('No se puede actualizar un celular con un precio inválido');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Actualizar los datos de un celular existente con un precio inválido');
    const lastRowSelector = '#tabla-telefonos tr:last-child';
    await page.fill(`${lastRowSelector} td:nth-child(2) input`, 'iPhone 14');
    await page.fill(`${lastRowSelector} td:nth-child(3) input`, 'Apple');
    await page.fill(`${lastRowSelector} td:nth-child(4) input`, '-1200');
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de guardar');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor ingrese un precio válido');
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click(`${lastRowSelector} button[onclick^="guardarTelefono"]`);
    await page.waitForTimeout(3000);
  }, 60000);

  // Pruebas para eliminar un celular

  // Caso de prueba: Eliminar un celular y cancelar la acción
  test('no debería eliminar un celular cuando se cancela la acción', async () => {
    console.log('Eliminar un celular y cancelar la acción');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de eliminar de un celular');
    const lastRowSelector = '#tabla-telefonos tr:last-child';
    const imeiText = await page.textContent(`${lastRowSelector} td:nth-child(1)`);
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe(`¿Está seguro de que desea eliminar el teléfono con IMEI ${imeiText}?`);
      await page.waitForTimeout(3000);
      await dialog.dismiss();
    });
    await page.click(`${lastRowSelector} button[onclick^="eliminarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular no fue eliminado');
    const rowCount = await page.$$eval('#tabla-telefonos tr', rows => rows.length);
    expect(rowCount).toBeGreaterThan(0);
  }, 60000);

  // Caso de prueba: Eliminar un celular y confirmar la acción
  test('debería eliminar un celular cuando se confirma la acción', async () => {
    console.log('Eliminar un celular y confirmar la acción');
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de eliminar de un celular');
    const lastRowSelector = '#tabla-telefonos tr:last-child';
    const imeiText = await page.textContent(`${lastRowSelector} td:nth-child(1)`);
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe(`¿Está seguro de que desea eliminar el teléfono con IMEI ${imeiText}?`);
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click(`${lastRowSelector} button[onclick^="eliminarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular fue eliminado');
    const rowCount = await page.$$eval('#tabla-telefonos tr', rows => rows.length);
    expect(rowCount).toBe(1);
  }, 60000);

  // Pruebas para comprar un celular

  // Caso de prueba: Comprar un celular y cancelar la acción
  test('no debería comprar un celular cuando se cancela la acción', async () => {
    console.log('Comprar un celular y cancelar la acción');
    console.log('Navegar al panel de cliente');
    await page.click('.navbar a:nth-child(2)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de cliente sea visible');
    const clientViewVisible = await page.isVisible('#vista-cliente');
    console.log('Vista de cliente visible:', clientViewVisible);
    expect(clientViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de comprar de un celular');
    const lastRowSelector = '#tabla-telefonos-cliente tr:last-child';
    const imeiText = await page.textContent(`${lastRowSelector} td:nth-child(1)`);
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe(`¿Está seguro de que desea comprar el teléfono con IMEI ${imeiText}?`);
      await page.waitForTimeout(3000);
      await dialog.dismiss();
    });
    await page.click(`${lastRowSelector} button[onclick^="comprarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular no fue comprado');
    const rowCount = await page.$$eval('#tabla-telefonos-cliente tr', rows => rows.length);
    expect(rowCount).toBeGreaterThan(0);
  }, 60000);

  // Caso de prueba: Comprar un celular y confirmar la acción
  test('debería comprar un celular cuando se confirma la acción', async () => {
    console.log('Comprar un celular y confirmar la acción');
    console.log('Navegar al panel de cliente');
    await page.click('.navbar a:nth-child(2)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de cliente sea visible');
    const clientViewVisible = await page.isVisible('#vista-cliente');
    console.log('Vista de cliente visible:', clientViewVisible);
    expect(clientViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de comprar de un celular');
    const lastRowSelector = '#tabla-telefonos-cliente tr:last-child';
    const imeiText = await page.textContent(`${lastRowSelector} td:nth-child(1)`);
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe(`¿Está seguro de que desea comprar el teléfono con IMEI ${imeiText}?`);
      await page.waitForTimeout(3000);
      await dialog.accept();
    });
    await page.click(`${lastRowSelector} button[onclick^="comprarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Aceptar la alerta de compra exitosa');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Teléfono comprado exitosamente');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular fue eliminado de la lista del cliente');
    const rowCount = await page.$$eval('#tabla-telefonos-cliente tr', rows => rows.length);
    expect(rowCount).toBe(0);
  }, 60000);
});
