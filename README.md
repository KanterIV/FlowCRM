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

<br>

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
>   коммуникации с ним ( функция **_sendLeadInfoInTelegram()_** )

**📥 Request Body**:

```ts
{
  userId: string,
  verificationCode: string,
}
```

<br>

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

<br>

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

> [!IMPORTANT]
>
> 💡 Особенности:
>
> - Возвращает **_JWT_** с сроком действия **_30 дней_**
> - Поддерживает **_keitaro_subid_**, который обновляется при необходимости
> - Автоматически генерирует персональный **_referralCode_**, если его ещё нет
> - Если пользователь не прошёл верификацию — вход не разрешается

**📥 Request Body**:

```ts
{
  email: string,
  password: string,
  keitaro_subid?: string,
}
```

<br>

**📤 Response**:

_Пользовтель не верифицирован_

```ts
{
  code: number,
  message: string,
  data: {
    verificationMode: 'telegram' | 'whatsapp' | 'viber' | null,
    userId: string,
  };
}
```

_Пользовтель веривицирован_

```ts
{
  success: boolean,
  code: number,
  message: string,
  data: {
    token: string,
  };
}
```

5. ### 🔹 POST `/auth/forgot-password`

Запрос на сброс пароля. Отправляет на email пользователя ссылку с временным
токеном (действует 10 минут). Если email не найден — возвращается ошибка.
Локализация для перевода теста сообщения определяется по полю `locale`.

> [!IMPORTANT]
>
> 💡 Особенности:
>
> - Токен **_(passwordResetToken)_** живёт 10 минут
> - Ссылка сброса: **_https://ducksay-pwa.com?forgotPass=TOKEN_**
> - Письмо отправляется через **_Amazon SES_**

**📥 Request Body**:

```ts
{
  email: string,
  locale?: string,
}
```

<br>

**📤 Response**:

```ts
{
  success: boolean,
  message: string,
}
```

6. ### 🔹 PATCH `/auth/reset-password/:token`

Сброс пароля пользователя по ранее высланной ссылке. Проверяет JWT-токен из
параметра `:token`, устанавливает новый пароль и удаляет токен из БД.

**📥 Request Body**:

```ts
{
  password: string,
}
```

<br>

**📤 Response**:

```ts
{
  message: string,
}
```

7. ### 🔹 POST `/auth/logout`

Выход из системы.

```ts
{
  success: boolean,
}
```

<br>

## Кейс - cors error

```bash
pm2 stop ducksay-express
npm run dev
Ctrl + C
pm2 start ducksay-express
```
