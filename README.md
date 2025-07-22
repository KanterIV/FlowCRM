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

3. ### 🔹 POST `/auth/resend-verification-code`

Повторно отправляет 6-значный код верификации пользователю в один из доступных
мессенджеров: Telegram или WhatsApp (в порядке приоритета). Используется, если
код утерян или не дошёл при первичной регистрации.

**📥 Request Body**:

```ts
{
  userId: string,
}
```

**📤 Response**:

```ts
{
  success: boolean,
  code: number,
  message: string,
}
```

4. ### 🔹 POST `/auth/login`

Аутентификация пользователя. Проверяет email и пароль, статус верификации и
возвращает JWT-токен. Если пользователь не верифицирован — возвращает `userId` и
доступный мессенджер для подтверждения.

> [!Особенности]
>
> -Возвращает JWT с сроком действия 30 дней -Поддерживает keitaro_subid, который
> обновляется при необходимости -Автоматически генерирует персональный
> referralCode, если его ещё нет -Если пользователь не прошёл верификацию — вход
> не разрешается

**📥 Request Body**:

```ts
{
  email: string,
  password: string,
  keitaro_subid?: string,
}
```

**📤 Response**:

//Пользовтель не верифицирован

```ts
{
  code: number;
  message: string,
  data: {
    verificationMode: 'telegram' | 'whatsapp' | 'viber' | null,
    userId: string,
  };
}
```

//Пользовтель веривицирован

```ts
{
  success: boolean,
  code: number,
  message: string,
  data: {
    token: string, // JWT
  };
}
```
