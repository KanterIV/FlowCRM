# REST API для [ducksay-pwa](https://ducksay-pwa.com/) приложения

<br>

## Регистраци, верификация и авторизация юзера.

1. ### 🔹 POST `/auth/register`

Регистрирует нового пользователя. Выполняется хеширование пароля, создание
пользователя в базе, генерация 6-значного кода и отправка его через доступный
мессенджер (WhatsApp, Telegram или Viber) для дальнейшей верификации. Также
обрабатываются реферальные и промо-коды.

**📥 Request Body**:

{ **email**: _string_, **password**: _string_, telegram: _string_ (optional) }

**📥 Response**:

```json
{
  "message": _string_,
  "success": true,
  "data": {
    "email": _string_,
    "userId": _string_
  }
}
```
