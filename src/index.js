const connBrowser = require('./services/connBrowser');
const { 
  markCheckboxes, 
  clickValidateButton, 
  waitUntil100Percent, 
  closeProgress 
} = require('./automation');
const { sleep } = require('./helpers/sleeper');

async function runCycle(page) {
  await markCheckboxes(page);
  await clickValidateButton(page);
  await waitUntil100Percent(page);
  await closeProgress(page);
}

async function automateInExistingWindow() {
  const { page } = await connBrowser.connectToExistingBrowser();

  if (!page) {
    console.error('Nenhuma página encontrada!');
    return;
  }

  console.log(`Conectado à página: ${await page.title()}`);

  while (true) {
    try {
      await runCycle(page);
      await sleep(2000);
    } catch (error) {
      console.error('Erro no ciclo:', error.message);
      await sleep(5000);
    }
  }
}

automateInExistingWindow().catch(console.error);