# Energy Dashboard

Frontend application for a clean energy dashboard created.

The application displays Great Britain energy mix forecast data and allows users to find the cleanest electric vehicle charging window based on the selected charging duration.

## Features

* displays energy mix forecast for today, tomorrow and the day after tomorrow,
* shows three donut charts with generation source shares,
* displays clean energy percentage for each day,
* explains which sources are treated as clean energy,
* allows selecting EV charging duration from 1 to 6 hours,
* fetches optimal charging window from the backend,
* displays recommended start time, end time and average clean energy percentage,
* handles loading and error states,
* responsive layout for desktop and mobile.

Clean energy sources used in the application:

* biomass
* nuclear
* hydro
* wind
* solar

## Tech stack

* Next.js
* TypeScript
* Tailwind CSS
* Recharts
* Lucide React
* Vitest
* Testing Library
* pnpm

## Requirements

* Node.js
* pnpm
* running backend API

Backend API should be available locally at:

```text
http://localhost:8080
```

## Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Example file is available in:

```text
.env.example
```

## Running locally

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

## Docker

Build image:

```bash
docker build -t energy-dashboard .
```

Run container:

```bash
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=http://localhost:8080 energy-dashboard
```

The application will be available at:

```text
http://localhost:3000
```

The backend API should be running at:

```text
http://localhost:8080
```

## Available scripts

Run development server:

```bash
pnpm dev
```

Build production version:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

Run linter:

```bash
pnpm lint
```

Run tests:

```bash
pnpm test:run
```

## API integration

The frontend communicates with the backend using the following endpoints:

```text
GET /api/energy-mix
```

Returns daily energy mix forecast for today, tomorrow and the day after tomorrow.

```text
GET /api/charging-window?durationHours=3
```

Returns the best EV charging window for the selected charging duration.

## Validation

The charging duration is selected using a slider with values from 1 to 6 hours.

The frontend restricts user input to valid values, while the backend also validates the request to ensure data correctness.

## Tests

Current frontend tests cover:

* formatting helpers,
* clean energy source recognition,
* energy mix card rendering,
* charging result card rendering.

Run tests with:

```bash
pnpm test:run
```

## Project structure

- `src`
  - `app`
  - `components`
  - `lib`
  - `test`
  - `types`

## Notes

This frontend is designed to work together with a Spring Boot backend service that provides the energy mix and charging window API.