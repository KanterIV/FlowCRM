# REST API для [ducksay-pwa](https://ducksay-pwa.com/) приложения

<br>

## Регистраци, верификация и авторизация юзера.

1. ### 🔹 POST `/auth/register`

Регистрирует нового пользователя. Выполняется хеширование пароля, создание
пользователя в базе, генерация 6-значного кода и отправка его через доступный
мессенджер (WhatsApp) для дальнейшей верификации. Также обрабатываются
реферальные и промо-коды.

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

2. ### 🔹 POST `/auth/user-verification`

Подтверждает код верификации, отправленный пользователю после регистрации. В
случае успеха пользователь считается верифицированным, и возвращается JWT-токен
для авторизации.

<br>

> [!IMPORTANT]
>
> Так же во время верфикаци:
>
> - если код верификации устарел и был удален из базы - создается новый код,
>   который юзер может повторно затребовать.
> - после успешной верификации пользователя в Telegram бот менеджеру отсылается
>   уведомление об успешной регистрации нового пользователя для дальнейшей
>   коммуникации с ним ( функция **sendLeadInfoInTelegram()** )

**📥 Request Body**:

```ts
{
  userId: string;
  verificationCode: string;
}
```

**📤 Response**:

```ts
{
  success: boolean,
      code: number,
      message: string,
      data: {
        token: string,
      },
}
```

### 🔹 POST `/auth/resend-verification-code`

Повторно отправляет 6-значный код верификации пользователю в один из доступных
мессенджеров: Telegram или WhatsApp (в порядке приоритета). Используется, если
код утерян или не дошёл при первичной регистрации.

**📥 Request Body**:

```ts
{
  userId: string;
}
```

**📤 Response**:

```ts
{
  success: boolean,
  code: number,
  message: string;
}
```

In case of cors error

```bash
pm2 stop ducksay-express
npm run dev
Ctrl + C
pm2 start ducksay-express
```
