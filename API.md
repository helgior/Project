//Система авторизации
Оглавление

1.Регистрация пользователя
2.Вход пользователя
3.Выход пользователя
4.Добавление пользователя администратором

1. Регистрация пользователя
Endpoint: /api/register

Method: POST

Описание: Регистрация нового пользователя.

Тело запроса:


{
    "login": "new_user",
    "password": "new_password",
    "name": "New User",
    "role": "user"
}
Ответ:

Успех:
{
    "id": 1,
    "name": "New User",
    "role": "user",
    "token": "generated_token"
}
Ошибка:
{
    "error": 1001,
    "message": "Пользователь уже существует"
}
2. Вход пользователя
Endpoint: /api/login

Method: POST

Описание: Вход пользователя в систему.
Тело запроса:
{
    "login": "user1",
    "password": "user1_password",
    "rnd": "random_string"
}
Ответ:
Успех:
{
    "id": 1,
    "name": "User One",
    "role": "user",
    "token": "generated_token"
}
Ошибка:
{
    "error": 1002,
    "message": "Неверный логин или пароль"
}
3. Выход пользователя
Endpoint: /api/logout

Method: POST

Описание: Выход пользователя из системы.

Тело запроса:
{
    "token": "user_token"
}
Ответ:
Успех:
{
    "message": "Выход выполнен успешно"
}
Ошибка:
{
    "error": 705,
    "message": "Неверный токен"
}
4. Добавление пользователя администратором
Endpoint: /api/admin/add_user
Method: POST
Описание: Добавление нового пользователя администратором.
Тело запроса:
{
    "login": "new_user",
    "password": "new_password",
    "name": "New User",
    "role": "user"
}
Ответ:
Успех:
{
    "message": "Пользователь успешно добавлен"
}
Ошибка:
{
    "error": 1001,
    "message": "Пользователь уже существует"
}