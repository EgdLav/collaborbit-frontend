# Collaborbit Frontend

Frontend application for Collaborbit — a real-time collaboration platform.

## Stack

- Vue 3
- TypeScript
- Vite

## Features

- User authentication interface
- Project management UI
- Real-time chat interface
- WebSocket communication

## Installation

### Requirements

- Node.js
- npm

Clone the repository:

```bash
git clone github.com/EgdLav/collaborbit-frontend
cd collaborbit-frontend
````

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Start development server:

```bash
npm run dev
```

## Environment

Configure `.env`:

```env
VITE_API_URL=
VITE_REVERB_HOST=
VITE_REVERB_PORT=
VITE_REVERB_SCHEME=
```

## Architecture

```text
                 Vue 3 Application
                         |
                         |
              ---------------------
              |                   |
          REST API            WebSocket
              |                   |
              ↓                   ↓
        Laravel Backend     Laravel Reverb
```

## Project Structure

```text
src/
├── components/     # Reusable UI components
├── views/          # Application pages
├── router/         # Vue Router configuration
├── stores/         # State management
├── services/       # API communication
└── types/          # TypeScript types
```

## Development

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Related Repository

Backend: https://github.com/EgdLav/collaborbit-backend

[Backend](https://github.com/EgdLav/collaborbit-backend) | [Frontend](https://github.com/EgdLav/collaborbit-frontend) | [Live Demo](https://github.com/EgdLav/collaborbit-frontend)