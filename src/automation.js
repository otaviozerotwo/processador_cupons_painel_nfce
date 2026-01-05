const { sleep } = require("./helpers/sleeper");

async function markCheckboxes(page) {
  await page.waitForSelector('input[type="checkbox"]', { timeout: 5000 });

  await page.evaluate(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length < 2) {
      throw new Error('Menos de 2 checkboxes encontrados');
    }

    checkboxes.forEach(cb => {
      if (!cb.checked) {
        return cb.click();
      }
    });
  });

  console.log('1. Checkboxes marcados');
  await sleep(2000);
}

async function clickValidateButton(page) {
  const selector = 'i.fa-check-square-o, i.fa-check';
  await page.waitForSelector(selector, { timeout: 5000 });
  await page.click(selector);
  console.log('2. Botão Validar clicado');
  await sleep(2000);
}

async function waitUntil100Percent(page) {
  console.log('3. Aguardando processamento...');

  let lastValue = null;
  const timeoutMs = 200000;
  const start = Date.now();

  while (true) {
    if (Date.now() - start > timeoutMs) {
      throw new Error('Timout aguardando processamento chegar a 100%');
    }

    const progressText = await page.evaluate(() => {
      const el = document.getElementById('PGB_TEXT');
      return el ? el.innerText.trim() : null;
    });

    if (progressText && progressText !== lastValue) {
      console.log(`Progresso: ${progressText}`);
      lastValue = progressText;
    }

    if (progressText === '100%' && lastValue !== null) {
      await sleep(8000);
      console.log('4. Processamento chegou a 100%');
      lastValue = null;
      return;
    }

    await sleep(2000);
  }
}

async function closeProgress(page) {
  await page.waitForSelector('#IMGCLOSEPROGRES', { timeout: 5000 });
  await page.click('#IMGCLOSEPROGRES');
  console.log('4. Janela de progresso fechada');
  await sleep(2000);
}

module.exports = {
  markCheckboxes,
  clickValidateButton,
  waitUntil100Percent,
  closeProgress,
};