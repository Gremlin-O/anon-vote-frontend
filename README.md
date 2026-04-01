# Сервис анонимных опросов

Anon-vote - это сервис для проведения анонимных опросов в любой сфере, позволяет быстро создавать опросы для социологических или маркетинговых исследований.

**Ссылка:** http://anon-vote.ru

**Swagger Open API** http://anon-vote.ru:8081/swagger-ui/index.html

**Backend:**  
Java 21, Spring Boot 3, PostgreSQL 15, Redis 8

**Frontend:**  
Next.js 15.5, Tailwind, Zustand

**Infrastructure:**  
Docker, Docker Compose

**Additional:**  
Spring Data JPA, Spring MVC, Spring Security, Liquibase, Telegram Bot API, Angus Mail

## Архитектура проекта

В проекте используется модульная кастомная архитектура

## Как запустить проект

### 1. Запуск в dev режиме

1. npm install
2. npm run dev

#### Шаги для запуска:

### 1. Запуск в prod режиме

docker compose -f ./docker/docker-compose.prod.yml up -d --build
После этого проект будет доступен на http://localhost:3001
