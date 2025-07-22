# REST API для [ducksay-pwa](https://ducksay-pwa.com/) приложения

## Регистраци, верификация и авторизация юзера.

### 🔹 POST `/auth/register`

Регистрирует нового пользователя. Выполняется хеширование пароля, создание
пользователя в базе, генерация 6-значного кода и отправка его через доступный
мессенджер (WhatsApp, Telegram или Viber). Также обрабатываются реферальные и
промо-коды.

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "yourSecurePassword",
  "telegram": "@username",
  "whatsapp": "+1234567890",
  "promoCode": "WELCOME123",
  "referralCode": "ABCDEF12",
  "keitaro_subid": "click123"
}
```
