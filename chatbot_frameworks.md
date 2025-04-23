# Next.js Chatbot Çerçeveleri ve Finans Veri Entegrasyonu Araştırması

## Next.js ile Uyumlu Chatbot Çözümleri

### 1. Vercel AI SDK
- **Açıklama**: Next.js ile tam entegrasyon sağlayan, Vercel tarafından geliştirilen resmi AI SDK.
- **Özellikler**:
  - LLM'ler ile metin, yapılandırılmış nesneler ve araç çağrıları oluşturmak için birleşik API
  - Dinamik sohbet ve üretken kullanıcı arayüzleri oluşturmak için kancalar (hooks)
  - Next.js ile sorunsuz entegrasyon
  - Açık kaynak ve ücretsiz
- **Kaynak**: [Vercel AI Chatbot](https://vercel.com/templates/next.js/nextjs-ai-chatbot)
- **GitHub**: [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)

### 2. Langchain.js + Next.js
- **Açıklama**: Langchain, LLM'leri kullanarak karmaşık uygulamalar oluşturmak için popüler bir kütüphanedir.
- **Özellikler**:
  - Ajan tabanlı chatbot oluşturma yeteneği
  - Harici API'ler ile entegrasyon için araçlar
  - Belge tabanlı sohbet için RAG (Retrieval Augmented Generation) desteği
- **Kaynaklar**: Çeşitli eğitimler ve YouTube videoları

### 3. ChatBotKit Next SDK
- **Açıklama**: Next.js uygulamaları için özel olarak tasarlanmış bir SDK.
- **Özellikler**:
  - Next.js uygulamalarına sorunsuz entegrasyon
  - Edge için optimize edilmiş
  - Konuşma AI'sı eklemek için kolaylaştırılmış bir yol
- **Kaynak**: [ChatBotKit Next SDK](https://chatbotkit.com/features/next-sdk)

### 4. OpenAI API + Next.js
- **Açıklama**: OpenAI'nin ChatGPT API'sini kullanarak özel chatbot oluşturma.
- **Özellikler**:
  - Güçlü dil modeli yetenekleri
  - Özelleştirilebilir yanıtlar
  - Next.js ile API entegrasyonu için çeşitli eğitimler mevcut
- **Kaynaklar**: Çeşitli eğitimler ve blog yazıları

### 5. Gemini API + Next.js AI SDK
- **Açıklama**: Google'ın Gemini API'si ile Next.js AI SDK kullanarak chatbot oluşturma.
- **Özellikler**:
  - Google'ın güçlü dil modeli
  - Next.js AI SDK ile kolay entegrasyon
  - Çeşitli kullanım örnekleri mevcut
- **Kaynaklar**: Reddit tartışmaları ve blog yazıları

## Finans Veri Entegrasyonu Seçenekleri

### 1. Yahoo Finance API
- **Açıklama**: Hisse senedi verileri, şirket bilgileri ve piyasa analizleri için kapsamlı bir API.
- **Özellikler**:
  - Hisse senedi grafikleri
  - Şirket içi ticaret bilgileri
  - Finansal analizler ve teknik göstergeler
- **Entegrasyon**: Manus datasource modülü üzerinden erişilebilir

### 2. CoinGecko API
- **Açıklama**: Kripto para verileri için popüler ve güvenilir bir API.
- **Özellikler**:
  - Gerçek zamanlı kripto para bilgileri
  - Fiyat, hacim, piyasa değeri verileri
  - 10.000'den fazla kripto para birimi desteği
- **Kaynaklar**: 
  - [CoinGecko API ile Kripto Uygulaması Oluşturma](https://andisiambuku.medium.com/creating-a-cryptocurrency-app-with-next-js-and-coin-gecko-api-838e58ec4022)
  - [AI Kripto Chatbot Oluşturma](https://www.coingecko.com/learn/ai-crypto-chatbot)

### 3. Open Banking API'leri
- **Açıklama**: Kişisel finans yönetimi için banka API'lerine bağlanma.
- **Özellikler**:
  - Kullanıcının banka hesaplarına güvenli erişim
  - Finansal işlem verileri
  - Kişiselleştirilmiş finansal tavsiyeler
- **Kaynaklar**: Kişisel finans chatbotları hakkında blog yazıları

## Önerilen Çözüm Yaklaşımı

Araştırmalarımıza dayanarak, portfolyo sitesi için en uygun chatbot çözümü şu şekilde olabilir:

1. **Chatbot Çerçevesi**: Vercel AI SDK
   - Next.js ile tam entegrasyon
   - Açık kaynak ve ücretsiz
   - Geniş topluluk desteği
   - Hazır şablonlar ve örnekler

2. **Finans Veri Entegrasyonu**:
   - Hisse senedi verileri için Yahoo Finance API (Manus datasource modülü üzerinden)
   - Kripto para verileri için CoinGecko API
   - Gerekirse diğer finansal API'ler ile genişletilebilir

3. **Geliştirme Yaklaşımı**:
   - Önce basit bir chatbot prototipi oluşturma
   - Temel site içi yönlendirme özelliklerini ekleme
   - Finans veri API'lerini entegre etme
   - Kullanıcı arayüzünü portfolyo sitesine uygun şekilde özelleştirme

Bu yaklaşım, hem hızlı bir başlangıç yapmanızı sağlayacak hem de gerekli tüm özellikleri (ziyaretçi karşılama, site içi yönlendirme, finans bilgileri) içerecek şekilde tasarlanmıştır.
