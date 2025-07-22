# REST API для [ducksay-pwa](https://ducksay-pwa.com/) приложения

<br>

## Регистраци, верификация и авторизация юзера.

1. ### 🔹 POST `/auth/register`

Регистрирует нового пользователя. Выполняется хеширование пароля, создание
пользователя в базе, генерация 6-значного кода и отправка его через доступный
мессенджер (WhatsApp, Telegram или Viber) для дальнейшей верификации. Также
обрабатываются реферальные и промо-коды.

**📥 Request Body**:

```ts
{
  email: string,
  password: string,
  telegram: string,
  whatsapp: string,
  promoCode?: string,
  referralCode?: string,
  keitaro_subid?: string
}

```

**📥 Response**:

```ts
{
  message: string,
  success: boolean,
  data: {
    email: string,
    userId: string,
    unusedPromocode: null | string //промокод возвращается в response если его илспользование на этапе регистрации невозможно (например ошибка сервера или промокод на депозит)
  }
}
```
