const { exec } = require('child_process');

describe('Pruebas de la tienda de celulares', () => {
  let serverProcess;

  beforeAll(async () => {
    // Inicia el servidor antes de todas las pruebas
    serverProcess = exec('npm start');

    // Espera un poco para que el servidor se inicie completamente
    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.goto('http://localhost:3000'); // Cambia la URL según sea necesario
  });

  afterAll(async () => {
    // Detiene el servidor después de todas las pruebas
    exec('pkill node'); 
  });

  // Pruebas para agregar un celular

  // Caso de prueba: Agregar un nuevo celular con datos válidos
  test('debería agregar un nuevo celular con datos válidos', async () => {
    // Explicación del caso de prueba
    console.log('Agregar un nuevo celular con datos válidos');

    // Explicación del paso
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
    await page.click('button[onclick="agregarTelefono()"]');
    await page.waitForTimeout(3000);

    console.log('Aceptar el diálogo de alerta');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      await dialog.accept();
    });
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
  });

  // Caso de prueba: No se puede agregar un celular con campos vacíos
  test('no debería agregar un celular con campos vacíos', async () => {
    // Explicación del caso de prueba
    console.log('No se puede agregar un celular con campos vacíos');

    // Explicación del paso
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
    await page.click('button[onclick="agregarTelefono()"]');
    await page.waitForTimeout(3000);

    console.log('Verificar la aparición de la alerta de campos vacíos');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor complete todos los campos');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);
  });

  // Caso de prueba: No se puede agregar un celular con un precio inválido
  test('no debería agregar un celular con un precio inválido', async () => {
    // Explicación del caso de prueba
    console.log('No se puede agregar un celular con un precio inválido');

    // Explicación del paso
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
    await page.click('button[onclick="agregarTelefono()"]');
    await page.waitForTimeout(3000);

    console.log('Verificar la aparición de la alerta de precio inválido');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor ingrese un precio válido');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);
  });

  // Pruebas para actualizar un celular

  // Caso de prueba: Actualizar un celular con datos válidos
  test('debería actualizar un celular con datos válidos', async () => {
    // Explicación del caso de prueba
    console.log('Actualizar un celular con datos válidos');

    // Explicación del paso
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
    await page.click(`${lastRowSelector} button[onclick^="guardarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Aceptar la acción en el diálogo de confirmación');
    page.once('dialog', async dialog => {
      console.log('Mensaje de confirmación:', dialog.message());
      dialog.accept();
    });
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
  });

  // Caso de prueba: No se puede actualizar un celular con campos vacíos
  test('no debería actualizar un celular con campos vacíos', async () => {
    // Explicación del caso de prueba
    console.log('No se puede actualizar un celular con campos vacíos');

    // Explicación del paso
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
    await page.click(`${lastRowSelector} button[onclick^="guardarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Verificar la aparición de la alerta de campos vacíos');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor complete todos los campos');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);
  });

  // Caso de prueba: No se puede actualizar un celular con un precio inválido
  test('no debería actualizar un celular con un precio inválido', async () => {
    // Explicación del caso de prueba
    console.log('No se puede actualizar un celular con un precio inválido');

    // Explicación del paso
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
    await page.click(`${lastRowSelector} button[onclick^="guardarTelefono"]`);
    await page.waitForTimeout(3000);

    console.log('Verificar la aparición de la alerta de precio inválido');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Por favor ingrese un precio válido');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);
  });

  // Pruebas para eliminar un celular

  // Caso de prueba: Eliminar un celular y cancelar la acción
  test('no debería eliminar un celular cuando se cancela la acción', async () => {
    // Explicación del caso de prueba
    console.log('Eliminar un celular y cancelar la acción');

    // Explicación del paso
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de eliminar de un celular');
    await page.click('#tabla-telefonos tr:last-child button[onclick^="eliminarTelefono"]');
    await page.waitForTimeout(3000);

    console.log('Cancelar la acción en el diálogo de confirmación');
    page.once('dialog', async dialog => {
      console.log('Mensaje de confirmación:', dialog.message());
      dialog.dismiss();
    });
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular no fue eliminado');
    await page.waitForSelector('#tabla-telefonos tr');
    const rowCount = await page.$$eval('#tabla-telefonos tr', rows => rows.length);
    expect(rowCount).toBeGreaterThan(0);
  });

  // Caso de prueba: Eliminar un celular y confirmar la acción
  test('debería eliminar un celular cuando se confirma la acción', async () => {
    // Explicación del caso de prueba
    console.log('Eliminar un celular y confirmar la acción');

    // Explicación del paso
    console.log('Navegar al panel de ingresar celulares');
    await page.click('.navbar a:nth-child(1)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de administrador sea visible');
    const adminViewVisible = await page.isVisible('#vista-admin');
    console.log('Vista de administrador visible:', adminViewVisible);
    expect(adminViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de eliminar de un celular');
    await page.click('#tabla-telefonos tr:last-child button[onclick^="eliminarTelefono"]');
    await page.waitForTimeout(3000);

    console.log('Aceptar la acción en el diálogo de confirmación');
    page.once('dialog', async dialog => {
      console.log('Mensaje de confirmación:', dialog.message());
      dialog.accept();
    });
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular fue eliminado');
    await page.waitForSelector('#tabla-telefonos tr', { state: 'detached' });
    const rowCount = await page.$$eval('#tabla-telefonos tr', rows => rows.length);
    expect(rowCount).toBe(0);
  });

  // Pruebas para comprar un celular

  // Caso de prueba: Comprar un celular y cancelar la acción
  test('no debería comprar un celular cuando se cancela la acción', async () => {
    // Explicación del caso de prueba
    console.log('Comprar un celular y cancelar la acción');

    // Explicación del paso
    console.log('Navegar al panel de cliente');
    await page.click('.navbar a:nth-child(2)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de cliente sea visible');
    const clientViewVisible = await page.isVisible('#vista-cliente');
    console.log('Vista de cliente visible:', clientViewVisible);
    expect(clientViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de comprar de un celular');
    await page.click('#tabla-telefonos-cliente tr:last-child button[onclick^="comprarTelefono"]');
    await page.waitForTimeout(3000);

    console.log('Cancelar la acción en el diálogo de confirmación');
    page.once('dialog', async dialog => {
      console.log('Mensaje de confirmación:', dialog.message());
      dialog.dismiss();
    });
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular no fue eliminado');
    await page.waitForSelector('#tabla-telefonos-cliente tr');
    const rowCount = await page.$$eval('#tabla-telefonos-cliente tr', rows => rows.length);
    expect(rowCount).toBeGreaterThan(0);
  });

  // Caso de prueba: Comprar un celular y confirmar la acción
  test('debería comprar un celular cuando se confirma la acción', async () => {
    // Explicación del caso de prueba
    console.log('Comprar un celular y confirmar la acción');

    // Explicación del paso
    console.log('Navegar al panel de cliente');
    await page.click('.navbar a:nth-child(2)');
    await page.waitForTimeout(3000);

    console.log('Verificar que la vista de cliente sea visible');
    const clientViewVisible = await page.isVisible('#vista-cliente');
    console.log('Vista de cliente visible:', clientViewVisible);
    expect(clientViewVisible).toBe(true);
    await page.waitForTimeout(3000);

    console.log('Hacer clic en el botón de comprar de un celular');
    await page.click('#tabla-telefonos-cliente tr:last-child button[onclick^="comprarTelefono"]');
    await page.waitForTimeout(3000);

    console.log('Aceptar la acción en el diálogo de confirmación');
    page.once('dialog', async dialog => {
      console.log('Mensaje de confirmación:', dialog.message());
      dialog.accept();
    });
    await page.waitForTimeout(3000);

    console.log('Aceptar la alerta de compra exitosa');
    page.once('dialog', async dialog => {
      console.log('Mensaje de alerta:', dialog.message());
      expect(dialog.message()).toBe('Teléfono comprado exitosamente');
      await dialog.accept();
    });
    await page.waitForTimeout(3000);

    console.log('Verificar que el celular fue eliminado de la lista del cliente');
    await page.waitForSelector('#tabla-telefonos-cliente tr', { state: 'detached' });
    const rowCount = await page.$$eval('#tabla-telefonos-cliente tr', rows => rows.length);
    expect(rowCount).toBe(0);
  });
});
