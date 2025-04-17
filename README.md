# QR Code Generator API

Это публичный API на Node.js для генерации кастомных QR-кодов с помощью `qr-code-styling-node`.

## 🔧 Установка

```bash
git clone https://github.com/SifArtz/qr-api.git
cd qr-api
npm install
```

## 🚀 Запуск локально

```bash
npm start
```

Сервер будет доступен на `http://localhost:3000`.

## 🌐 Деплой на Render

1. Перейди на https://render.com
2. Войди с помощью GitHub и нажми **New Web Service**
3. Выбери репозиторий `qr-api`
4. Настройки:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
   - **Instance type:** Free

## 📥 POST /generate

Создает QR-код на основе переданных параметров.

### Тело запроса (JSON)

| Поле             | Тип      | Описание |
|------------------|----------|----------|
| `data`           | string   | Ссылка или текст (по умолчанию: https://example.com) |
| `dotsColor`      | string   | Цвет точек QR-кода |
| `eyeInnerColor`  | string   | Цвет внутренней части глаза |
| `eyeOuterColor`  | string   | Цвет внешней части глаза |
| `dotsType`       | string   | Форма точек (`square`, `dots`, `rounded`, `classy`, `classy-rounded`, `extra-rounded`) |
| `eyeInnerShape`  | string   | Форма внутреннего глаза (`square`, `dot`, `rounded`, `extra-rounded`) |
| `eyeOuterShape`  | string   | Форма внешнего глаза (`square`, `dot`, `rounded`, `extra-rounded`) |
| `transparent`    | boolean  | Прозрачный фон |
| `backgroundColor`| string   | Цвет фона (если `transparent = false`) |
| `logo`           | string   | Base64 изображение логотипа (опционально) |
| `format`         | string   | `png` или `svg` (по умолчанию: `png`) |

### Ответ

Генерирует изображение QR-кода и отдает как файл.

## 🧪 Пример запроса

```bash
curl -X POST https://your-render-url.onrender.com/generate \
  -H "Content-Type: application/json" \
  -d '{{
    "data": "https://example.com",
    "dotsColor": "#ff0000",
    "eyeInnerColor": "#00ff00",
    "eyeOuterColor": "#0000ff",
    "transparent": true
  }}' --output qr-code.png
```

---

Создано ❤️ с использованием [qr-code-styling-node](https://www.npmjs.com/package/qr-code-styling-node)
