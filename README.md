
# Практична робота № 8

## Тема: Моделювання зв'язків між сутностями та керування міграціями

**Варіант:** 10 — Зоотовари  
**Рівень виконання:** Рівень 1  
**Технології:** NestJS, TypeScript, TypeORM, PostgreSQL, Docker

## 1. Мета роботи

Навчитися моделювати зв'язки між сутностями за допомогою TypeORM, налаштовувати міграції бази даних, створювати DataSource та отримувати пов'язані дані через REST API.

## 2. Опис проєкту

Проєкт є бекендом інтернет-магазину зоотоварів.

У межах практичної роботи реалізовано зв'язок між двома сутностями:

- `PetSupplyEntity` — товар зоомагазину.
- `AnimalTypeEntity` — вид тварини.

Для моделювання зв'язку використано:
- `@ManyToOne()` — зв'язок багато-до-одного.
- `@OneToMany()` — зворотний зв'язок один-до-багатьох.
- `@JoinColumn()` — визначення зовнішнього ключа `animal_type_id`.

## 3. Структура проєкту

```text
src/
├── database/
│   ├── migrations/
│   │   └── 1794838603046-AddAnimalTypeRelation.ts
│   └── data-source.ts
│
├── pet-supplies/
│   ├── dto/
│   ├── entities/
│   │   ├── animal-type.entity.ts
│   │   └── pet-supply.entity.ts
│   ├── pet-supplies.controller.ts
│   ├── pet-supplies.module.ts
│   └── pet-supplies.service.ts
│
├── auth/
├── users/
└── app.module.ts
```

## 4. Реалізований функціонал

### 4.1. Налаштування TypeORM

Створено файл `src/database/data-source.ts` для конфігурації підключення до PostgreSQL та керування міграціями.

У `app.module.ts` вимкнено автоматичну синхронізацію структури бази даних:

```typescript
synchronize: false
```

### 4.2. Зв'язок One-to-Many / Many-to-One

У `PetSupplyEntity` реалізовано зв'язок із `AnimalTypeEntity` через `@ManyToOne()`.

У `AnimalTypeEntity` реалізовано зворотний зв'язок через `@OneToMany()`.

Зовнішній ключ: `animal_type_id`.

### 4.3. Міграції

Створено та успішно застосовано міграцію:

`1794838603046-AddAnimalTypeRelation.ts`

Міграція створює таблицю `animal_types`, додає поле `animal_type_id` до таблиці `pet_supplies` та встановлює зовнішній ключ.

### 4.4. REST API

Реалізовано маршрути:

| Метод | Endpoint | Призначення |
|---|---|---|
| GET | `/pet-supplies` | Отримання всіх товарів |
| GET | `/pet-supplies/:id` | Отримання товару за UUID разом із пов'язаним видом тварини |

Для завантаження пов'язаних даних використовується параметр `relations`.

## 5. Інструкція запуску

### Вимоги

- Node.js 22+
- npm
- Docker Desktop
- PostgreSQL 16

### Встановлення залежностей

```bash
npm install
```

### Запуск PostgreSQL

```bash
docker compose up -d
```

### Запуск NestJS

```bash
npm run start:dev
```

Сервер запускається за адресою:

`http://localhost:3000`

### Генерація міграції

```powershell
node -r ts-node/register ./node_modules/typeorm/cli.js migration:generate src/database/migrations/AddAnimalTypeRelation -d src/database/data-source.ts
```

### Застосування міграцій

```powershell
node -r ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database/data-source.ts
```

## 6. Результати тестування

У PostgreSQL створено таблиці:

- `pet_supplies`
- `animal_types`
- `users`
- `migrations`

Для перевірки додано тестові види тварин: «Собаки» та «Коти», а також тестовий товар «Сухий корм для собак».

GET-запит за UUID успішно повернув товар разом із вкладеним об'єктом `animalType`.

## 7. Скріншоти роботи програми

Додати скриншоти до папки `docs/screenshots/`.

1. `01-nestjs-running.png` — успішний запуск NestJS без помилок.
2. `02-migration-generated.png` — успішна генерація міграції.
3. `03-migration-run.png` — успішне застосування міграції.
4. `04-database-tables.png` — таблиці PostgreSQL.
5. `05-api-response.png` — відповідь GET-запиту з вкладеним `animalType`.

## 8. Висновок

Під час виконання практичної роботи №8 було налаштовано TypeORM DataSource, вимкнено автоматичну синхронізацію структури бази даних та реалізовано керування міграціями PostgreSQL.

Для предметної області інтернет-магазину зоотоварів створено зв'язок One-to-Many / Many-to-One між сутностями `PetSupplyEntity` та `AnimalTypeEntity`.

Успішно згенеровано та застосовано міграцію. Реалізовано REST API для отримання товарів із пов'язаними даними. Роботу зв'язку перевірено на тестових записах.

Практичну роботу виконано на базовому рівні — рівень 1.
