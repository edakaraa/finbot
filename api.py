from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/stock/<symbol>', methods=['GET'])
def get_stock(symbol):
    try:
        print(f"Hisse senedi sembolü: {symbol}")
        # BIST hisseleri için .IS ekle
        stock = yf.Ticker(f"{symbol}.IS")
        info = stock.info
        
        print(f"Yahoo Finance verisi: {info}")
        
        response = {
            "symbol": symbol,
            "price": info.get('regularMarketPrice', 0),
            "change": info.get('regularMarketChange', 0),
            "changePercent": info.get('regularMarketChangePercent', 0),
            "volume": info.get('regularMarketVolume', 0),
            "high": info.get('regularMarketDayHigh', 0),
            "low": info.get('regularMarketDayLow', 0)
        }
        
        print(f"API yanıtı: {response}")
        return jsonify(response)
        
    except Exception as e:
        print(f"Hata: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 