const yahooFinance = require('yahoo-finance2').default;

async function test() {
    try {
        // BIST hissesi testi
        console.log('\nBIST Hisse Testi:');
        const thyao = await yahooFinance.quote('THYAO.IS');
        console.log('THYAO:', thyao.regularMarketPrice);

        // Döviz testi
        console.log('\nDöviz Testi:');
        const usd = await yahooFinance.quote('TRY=X');
        console.log('USD/TRY:', usd.regularMarketPrice);

        // Altın testi
        console.log('\nAltın Testi:');
        const gold = await yahooFinance.quote('GC=F');
        console.log('Altın:', gold.regularMarketPrice);

        // Kripto testi
        console.log('\nKripto Testi:');
        const btc = await yahooFinance.quote('BTC-USD');
        console.log('Bitcoin:', btc.regularMarketPrice);

    } catch (error) {
        console.error('Hata:', error);
    }
}

test(); 