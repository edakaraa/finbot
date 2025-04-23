# Portfolyo Sitesi için Finans Chatbot Projesi

## Proje Özeti

Bu proje, Next.js ile geliştirilmiş bir portfolyo sitesi için özelleştirilmiş bir chatbot uygulamasıdır. Chatbot, ziyaretçileri karşılama ve site içi yönlendirme yapmanın yanı sıra, finans, borsa, hisse senedi ve kripto para konularında kullanıcılara bilgi sağlama yeteneğine sahiptir.

## Özellikler

- **Ziyaretçi Karşılama**: Kullanıcıları karşılar ve sitenin temel özelliklerini tanıtır
- **Site İçi Yönlendirme**: Kullanıcıları portfolyo sitesinin farklı bölümlerine yönlendirir
- **Finans Bilgileri**: Finans terimleri, hisse senetleri ve kripto paralar hakkında bilgi sağlar
- **Gerçek Zamanlı Veri**: Yahoo Finance API ve CoinGecko API entegrasyonu ile güncel finans verileri sunar
- **Duyarlı Tasarım**: Hem masaüstü hem de mobil cihazlarda sorunsuz çalışır

## Teknoloji Yığını

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI/NLP**: Langchain.js, OpenAI
- **Veri Kaynakları**: Yahoo Finance API, CoinGecko API

## Proje Yapısı

```
chatbot-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts       # Chatbot API endpoint'i
│   │   ├── globals.css            # Global stil dosyası
│   │   ├── layout.tsx             # Ana sayfa düzeni
│   │   └── page.tsx               # Ana sayfa içeriği
│   ├── components/
│   │   └── ChatComponent.tsx      # Chatbot kullanıcı arayüzü bileşeni
│   └── utils/
│       └── financeApi.js          # Finans API'leri için yardımcı fonksiyonlar
├── package.json                   # Proje bağımlılıkları
└── tsconfig.json                  # TypeScript yapılandırması
```

## Kurulum

1. Projeyi klonlayın veya indirin
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. `.env.local` dosyası oluşturun ve OpenAI API anahtarınızı ekleyin:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
5. Tarayıcınızda `http://localhost:3000` adresine gidin

## Chatbot Özellikleri

### 1. Hisse Senedi Bilgileri

Chatbot, Yahoo Finance API entegrasyonu sayesinde hisse senetleri hakkında güncel bilgiler sağlayabilir. Örnek sorgu:

```
AAPL hisse senedi
```

Yanıt, şu bilgileri içerir:
- Güncel fiyat ve değişim
- Günlük ve 52 haftalık fiyat aralıkları
- İşlem hacmi

### 2. Kripto Para Bilgileri

Chatbot, CoinGecko API entegrasyonu sayesinde kripto paralar hakkında güncel bilgiler sağlayabilir. Örnek sorgu:

```
Bitcoin kripto
```

Yanıt, şu bilgileri içerir:
- Güncel fiyat (USD ve TRY cinsinden)
- 24 saatlik değişim
- Piyasa değeri ve işlem hacmi
- Dolaşımdaki arz
- Tüm zamanların en yüksek değeri

### 3. Finans Terimleri Sözlüğü

Chatbot, 30'dan fazla finans terimi hakkında açıklamalar sağlayabilir. Örnek sorgu:

```
Blockchain nedir?
```

Sözlük, hisse senedi, borsa, kripto para, blockchain, yatırım, portföy, tahvil, enflasyon, DeFi, NFT, staking, mining ve daha fazlası gibi terimleri içerir.

### 4. Site İçi Yönlendirme

Chatbot, kullanıcıları portfolyo sitesinin farklı bölümlerine yönlendirebilir. Örnek sorgular:

```
Anasayfaya nasıl giderim?
Projelerinizi görebilir miyim?
İletişim bilgileriniz nerede?
```

## Entegrasyon

Chatbot'u mevcut bir Next.js portfolyo sitesine entegre etmek için `integration_guide.md` dosyasındaki adımları izleyin. Kılavuz, dosya kopyalama, API anahtarı yapılandırması, bileşen entegrasyonu, stil özelleştirmesi ve daha fazlası hakkında detaylı bilgiler içerir.

## Güvenlik Notları

- API anahtarlarını her zaman `.env.local` dosyasında saklayın, asla doğrudan kodda tutmayın
- Kullanıcı girdilerini doğrulayın ve temizleyin
- API isteklerini rate-limiting ile sınırlayın
- Hassas finansal bilgileri işlerken uygun sorumluluk reddi bildirimleri ekleyin

## Sorumluluk Reddi

Bu chatbot tarafından sağlanan tüm finansal bilgiler sadece bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Yatırım kararları vermeden önce profesyonel finansal danışmanlık almanız önerilir.

## Gelecek Geliştirmeler

- Kullanıcı tercihlerini yerel depolamada saklama
- Sohbet geçmişini kaydetme
- Daha fazla finans API'si entegre etme
- Çoklu dil desteği ekleme
- Sesli komut desteği ekleme

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
"# finbot" 
