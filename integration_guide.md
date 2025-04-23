# Portfolyo Sitesi için Chatbot Entegrasyon Kılavuzu

Bu kılavuz, geliştirdiğimiz finans odaklı chatbot'u mevcut portfolyo sitenize entegre etmeniz için gereken adımları içermektedir.

## 1. Gerekli Dosyaları Kopyalama

Chatbot'un çalışması için aşağıdaki dosyaları portfolyo sitenize eklemeniz gerekmektedir:

### Temel Dosyalar
- `src/components/ChatComponent.tsx` - Chatbot'un kullanıcı arayüzü
- `src/app/api/chat/route.ts` - Chatbot'un API endpoint'i
- `src/utils/financeApi.js` - Finans veri API'leri için yardımcı fonksiyonlar

### Bağımlılıklar
Aşağıdaki paketleri projenize eklemeniz gerekmektedir:
```bash
npm install ai langchain @langchain/openai openai
```

## 2. API Anahtarı Yapılandırması

Chatbot'un çalışması için OpenAI API anahtarı gereklidir. Bu anahtarı güvenli bir şekilde yapılandırmak için:

1. Projenizin kök dizininde `.env.local` dosyası oluşturun
2. Dosyaya OpenAI API anahtarınızı ekleyin:
```
OPENAI_API_KEY=sk-your-api-key-here
```

3. `src/app/api/chat/route.ts` dosyasını güncelleyerek API anahtarını çevre değişkeninden alın:
```typescript
// Bu satırı
const OPENAI_API_KEY = 'sk-örnek-anahtar-gerçek-uygulamada-değiştirilmeli';

// Şu şekilde değiştirin
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
```

## 3. Chatbot Bileşenini Sayfanıza Ekleme

Chatbot bileşenini istediğiniz sayfaya eklemek için:

1. İlgili sayfa dosyasını açın (örneğin, `src/app/page.tsx`)
2. Dosyanın başına import ifadesini ekleyin:
```typescript
import ChatComponent from '@/components/ChatComponent';
```

3. Sayfa bileşeninizin return ifadesine ChatComponent'i ekleyin:
```tsx
return (
  <div>
    {/* Mevcut sayfa içeriğiniz */}
    
    {/* Chatbot bileşeni */}
    <ChatComponent />
  </div>
);
```

## 4. Stil Özelleştirmesi

Chatbot'un görünümünü portfolyo sitenize uygun şekilde özelleştirmek için:

1. `src/components/ChatComponent.tsx` dosyasını açın
2. Aşağıdaki stil değişkenlerini kendi renk şemanıza göre güncelleyin:
```tsx
// Örnek: Mavi renk şemasını kendi renk şemanızla değiştirin
<div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
// ...
<button
  type="submit"
  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
>
```

## 5. Chatbot Davranışını Özelleştirme

Chatbot'un davranışını özelleştirmek için:

1. `src/app/api/chat/route.ts` dosyasını açın
2. Site içi yönlendirme mantığını kendi sitenizin yapısına göre güncelleyin:
```typescript
// Basit site içi yönlendirme mantığı
let response;
if (lastMessage.toLowerCase().includes('anasayfa') || lastMessage.toLowerCase().includes('ana sayfa')) {
  response = 'Anasayfaya gitmek için üst menüdeki "Ana Sayfa" bağlantısına tıklayabilirsiniz.';
} else if (lastMessage.toLowerCase().includes('projeler') || lastMessage.toLowerCase().includes('portfolyo')) {
  // Kendi sayfa yapınıza göre güncelleyin
  response = 'Projelerimi görmek için üst menüdeki "Projeler" veya "Portfolyo" bağlantısına tıklayabilirsiniz.';
}
// ...
```

3. Finans terimleri sözlüğünü `src/utils/financeApi.js` dosyasında genişletebilir veya özelleştirebilirsiniz.

## 6. Mobil Uyumluluk

Chatbot bileşeni zaten responsive tasarıma sahiptir, ancak mobil görünümü daha da iyileştirmek için:

1. `src/components/ChatComponent.tsx` dosyasında mobil görünüm için ek stiller ekleyebilirsiniz:
```tsx
<div className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-lg flex flex-col h-96 border border-gray-200">
```

2. Küçük ekranlarda chatbot'un tam genişlikte görünmesi için:
```tsx
<div className="fixed bottom-0 right-0 w-full sm:w-80 md:w-96 sm:bottom-4 sm:right-4 bg-white rounded-lg shadow-lg flex flex-col h-96 border border-gray-200">
```

## 7. Performans İyileştirmeleri

Chatbot'un performansını iyileştirmek için:

1. Chatbot bileşenini dinamik olarak import edin:
```typescript
import dynamic from 'next/dynamic';

const ChatComponent = dynamic(() => import('@/components/ChatComponent'), {
  loading: () => <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-lg flex flex-col h-96 border border-gray-200">Yükleniyor...</div>,
  ssr: false
});
```

2. API yanıtlarını önbelleğe alarak tekrarlanan sorguları optimize edin.

## 8. Sorun Giderme

Yaygın sorunlar ve çözümleri:

### API Hatası
- OpenAI API anahtarınızın doğru olduğundan emin olun
- API kullanım limitinizi kontrol edin
- `.env.local` dosyasının doğru konumda olduğunu doğrulayın

### Chatbot Görünmüyor
- ChatComponent'in doğru şekilde import edildiğinden emin olun
- Konsol hatalarını kontrol edin
- Tailwind CSS'in doğru yapılandırıldığından emin olun

### Finans Verileri Gelmiyor
- Ağ bağlantınızı kontrol edin
- CoinGecko API'nin hız sınırlamalarını aşıp aşmadığınızı kontrol edin
- Yahoo Finance API entegrasyonunun doğru çalıştığından emin olun

## 9. Güvenlik Önlemleri

1. API anahtarlarını her zaman `.env.local` dosyasında saklayın, asla doğrudan kodda tutmayın
2. Kullanıcı girdilerini doğrulayın ve temizleyin
3. API isteklerini rate-limiting ile sınırlayın
4. Hassas finansal bilgileri işlerken uygun sorumluluk reddi bildirimleri ekleyin

## 10. Daha Fazla Özelleştirme

Chatbot'u daha da geliştirmek için:

1. Kullanıcı tercihlerini yerel depolamada saklama
2. Sohbet geçmişini kaydetme
3. Daha fazla finans API'si entegre etme
4. Çoklu dil desteği ekleme
5. Sesli komut desteği ekleme

Bu kılavuzu takip ederek, finans odaklı chatbot'u portfolyo sitenize kolayca entegre edebilirsiniz. Herhangi bir sorunla karşılaşırsanız veya ek yardıma ihtiyacınız olursa, lütfen iletişime geçin.
