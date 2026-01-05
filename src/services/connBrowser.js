const puppeteer = require('puppeteer');

async function connectToExistingBrowser() {
  // URL de depuração do Chrome
  const browserURL = 'http://127.0.0.1:9222';
  
  // Conectar ao Chrome já em execução
  const browser = await puppeteer.connect({
    browserURL: browserURL,
    defaultViewport: null
  });
  
  // Obter todas as abas
  const pages = await browser.pages();
  
  // Selecionar a página/aba específica (última ou por URL)
  let targetPage;
  
  // Método 1: Pegar a última aba aberta
  targetPage = pages[pages.length - 1];
  
  if (!targetPage && pages.length > 0) {
    targetPage = pages[0];
  }
  
  return { browser, page: targetPage };
}

module.exports = {
  connectToExistingBrowser
};