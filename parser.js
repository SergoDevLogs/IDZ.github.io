const fs = require('fs');
const cheerio = require('cheerio');

const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const htmlContent = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(htmlContent);
const workingMainContainer = $('.working-main');
workingMainContainer.empty();
jsonData.forEach((item, index) => {
    const cardIndex = index + 1;
    const stepNumber = cardIndex.toString().padStart(2, '0');
    const cardHtml = `
        <div class="working-main-card">
            <div class="working-main-card-left">
                <div class="working-main-card-left-number">
                    ${stepNumber}
                </div>
                <div class="working-main-card-left-name">
                    ${item.stepName}
                </div>
            </div>
            <img src="/images/plus-icon.svg">
        </div>
        <div class="card-expanded-content">
            <div class="underline"></div>
            <div class="expanded-text">
                ${item.description}
            </div>
        </div>
    `;
    workingMainContainer.append(cardHtml);
});
fs.writeFileSync('index.html', $.html());
console.log(`Готово! Обновлено ${jsonData.length} карточек в index.html`);