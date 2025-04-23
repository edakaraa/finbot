import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

type SymbolKey = keyof typeof SYMBOLS;
type CategoryKey = keyof typeof CATEGORIES;

// Sembol eşleştirmeleri
const SYMBOLS = {
  // BIST hisseleri
  'THYAO': 'THYAO.IS',
  'ASELS': 'ASELS.IS',
  'GARAN': 'GARAN.IS',
  'AKBNK': 'AKBNK.IS',
  'EREGL': 'EREGL.IS',
  'SISE': 'SISE.IS',
  'KCHOL': 'KCHOL.IS',
  'TUPRS': 'TUPRS.IS',
  'YKBNK': 'YKBNK.IS',
  'PGSUS': 'PGSUS.IS',
  
  // NASDAQ hisseleri
  'AAPL': 'AAPL',
  'MSFT': 'MSFT',
  'GOOGL': 'GOOGL',
  'AMZN': 'AMZN',
  'META': 'META',
  'TSLA': 'TSLA',
  'NVDA': 'NVDA',
  'AMD': 'AMD',
  'INTC': 'INTC',
  'NFLX': 'NFLX',
  
  // Emtialar
  'ALTIN': 'GC=F',
  'GUMUS': 'SI=F',
  'PETROL': 'CL=F',
  'BAKIR': 'HG=F',
  'PLATIN': 'PL=F',
  
  // Kripto paralar
  'BTC': 'BTC-USD',
  'ETH': 'ETH-USD',
  'BNB': 'BNB-USD',
  'XRP': 'XRP-USD',
  'DOGE': 'DOGE-USD',
  
  // Dövizler
  'DOLAR': 'TRY=X',
  'EURO': 'EURTRY=X',
  'STERLIN': 'GBPTRY=X'
} as const;

// Sembol kategorileri
const CATEGORIES = {
  'BIST': ['THYAO', 'ASELS', 'GARAN', 'AKBNK', 'EREGL', 'SISE', 'KCHOL', 'TUPRS', 'YKBNK', 'PGSUS'],
  'NASDAQ': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'AMD', 'INTC', 'NFLX'],
  'EMTİA': ['ALTIN', 'GUMUS', 'PETROL', 'BAKIR', 'PLATIN'],
  'KRİPTO': ['BTC', 'ETH', 'BNB', 'XRP', 'DOGE'],
  'DÖVİZ': ['DOLAR', 'EURO', 'STERLIN']
} as const;

// Türkçe isimler
const TURKISH_NAMES: Record<SymbolKey, string> = {
  'THYAO': 'Türk Hava Yolları',
  'ASELS': 'Aselsan',
  'GARAN': 'Garanti Bankası',
  'AKBNK': 'Akbank',
  'EREGL': 'Ereğli Demir Çelik',
  'SISE': 'Şişe Cam',
  'KCHOL': 'Koç Holding',
  'TUPRS': 'Tüpraş',
  'YKBNK': 'Yapı Kredi',
  'PGSUS': 'Pegasus',
  
  // NASDAQ hisseleri
  'AAPL': 'Apple',
  'MSFT': 'Microsoft',
  'GOOGL': 'Alphabet (Google)',
  'AMZN': 'Amazon',
  'META': 'Meta (Facebook)',
  'TSLA': 'Tesla',
  'NVDA': 'NVIDIA',
  'AMD': 'AMD',
  'INTC': 'Intel',
  'NFLX': 'Netflix',
  
  'ALTIN': 'Altın',
  'GUMUS': 'Gümüş',
  'PETROL': 'Petrol',
  'BAKIR': 'Bakır',
  'PLATIN': 'Platin',
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'BNB': 'Binance Coin',
  'XRP': 'Ripple',
  'DOGE': 'Dogecoin',
  'DOLAR': 'Amerikan Doları',
  'EURO': 'Euro',
  'STERLIN': 'İngiliz Sterlini'
};

async function getQuote(symbol: string) {
  try {
    console.log('Yahoo Finance API çağrısı yapılıyor:', symbol);
    const result = await yahooFinance.quote(symbol);
    console.log('API yanıtı:', result);
    return result;
  } catch (error) {
    console.error(`${symbol} için veri alınamadı:`, error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();
    console.log('Gelen mesaj:', lastMessage);

    let response = '';

    // Önce finans terimleri kontrolü
    if (lastMessage.includes('nedir') || lastMessage.includes('ne demek')) {
      const financeTerms: { [key: string]: string } = {
        'borsa': 'Borsa, menkul kıymetlerin alınıp satıldığı organize bir piyasadır.',
        'hisse senedi': 'Hisse senedi, bir şirketin sermayesinin belirli bir oranını temsil eden ve sahibine o şirkette ortaklık hakkı veren menkul kıymettir.',
        'tahvil': 'Tahvil, devlet veya şirketlerin borç para bulmak için çıkardıkları borç senetleridir.',
        'enflasyon': 'Enflasyon, fiyatların genel seviyesindeki sürekli artıştır.',
        'faiz': 'Faiz, borç alınan paranın kullanımı karşılığında ödenen bedeldir.',
        'döviz': 'Döviz, yabancı ülke para birimleridir.',
        'emtia': 'Emtia, altın, gümüş, petrol gibi uluslararası piyasalarda işlem gören ticari mallardır.',
        'kripto para': 'Kripto para, şifreleme teknolojisi kullanılarak oluşturulan ve merkezi olmayan dijital para birimleridir.'
      };

      let foundTerm = false;
      for (const [term, definition] of Object.entries(financeTerms)) {
        if (lastMessage.includes(term)) {
          response = `${term}: ${definition}`;
          foundTerm = true;
          break;
        }
      }

      if (foundTerm) {
        return NextResponse.json({ response });
      }
    }

    // Fiyat sorgusu kontrolü
    let foundSymbol: SymbolKey | '' = '';
    for (const symbol of Object.keys(SYMBOLS) as SymbolKey[]) {
      if (lastMessage.includes(symbol.toLowerCase()) || 
          lastMessage.includes(TURKISH_NAMES[symbol].toLowerCase())) {
        foundSymbol = symbol;
        break;
      }
    }

    // Eğer bir sembol bulunduysa
    if (foundSymbol) {
      console.log('Bulunan sembol:', foundSymbol);
      try {
        const quote = await getQuote(SYMBOLS[foundSymbol]);
        
        if (!quote || !quote.regularMarketPrice) {
          response = `${TURKISH_NAMES[foundSymbol]} için güncel veri alınamadı. Lütfen daha sonra tekrar deneyin.`;
        } else {
          let price = quote.regularMarketPrice;
          let currency = 'TL';

          // Döviz kurları için özel format
          if (['DOLAR', 'EURO', 'STERLIN'].includes(foundSymbol)) {
            price = 1 / price;
            currency = 'TL';
          }
          // Kripto paralar için USD
          else if (CATEGORIES['KRİPTO'].includes(foundSymbol as any)) {
            currency = 'USD';
          }

          response = `${TURKISH_NAMES[foundSymbol]} güncel bilgileri:\n` +
            `Fiyat: ${price.toLocaleString('tr-TR')} ${currency}\n` +
            `Değişim: %${quote.regularMarketChangePercent?.toFixed(2) || '0.00'}\n` +
            `Günlük En Yüksek: ${quote.regularMarketDayHigh?.toLocaleString('tr-TR')} ${currency}\n` +
            `Günlük En Düşük: ${quote.regularMarketDayLow?.toLocaleString('tr-TR')} ${currency}`;
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        response = `${TURKISH_NAMES[foundSymbol]} verisi alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.`;
      }
    }
    // Kategori sorgusu kontrolü
    else if (Object.keys(CATEGORIES).some(category => 
      lastMessage.toLowerCase().includes(category.toLowerCase()))) {
      for (const [category, symbols] of Object.entries(CATEGORIES)) {
        if (lastMessage.toLowerCase().includes(category.toLowerCase())) {
          response = `${category} kategorisindeki takip edilebilen semboller:\n`;
          for (const symbol of symbols) {
            response += `- ${TURKISH_NAMES[symbol as SymbolKey]} (${symbol})\n`;
          }
          break;
        }
      }
    }
    // Hiçbir şey bulunamadıysa
    else {
      response = '👋 Merhaba! Ben FinBot, finans dünyasındaki asistanınız.\n\n' +
        '📊 Fiyat sorgulayabilirsiniz:\n' +
        '   • "Apple fiyatı nedir?"\n' +
        '   • "THYAO değeri ne kadar?"\n' +
        '   • "Dolar kaç TL?"\n' +
        '   • "Bitcoin fiyatı nedir?"\n\n' +
        '📚 Finans terimlerini öğrenebilirsiniz:\n' +
        '   • "Borsa nedir?"\n' +
        '   • "Kripto para nedir?"\n\n' +
        '📋 Listeleri görebilirsiniz:\n' +
        '   • "BIST hisselerini göster"\n' +
        '   • "NASDAQ hisselerini göster"\n' +
        '   • "Kripto paraları göster"';
    }

    console.log('Gönderilen yanıt:', response);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.' }, { status: 500 });
  }
} 