# Crypto Flow

A comprehensive cryptocurrency dashboard and news platform built as a monorepo. Stay ahead in the crypto world with real-time market data, personalized news feeds, portfolio tracking, and advanced analytics.

## Features

- **Real-time Market Data**: Live cryptocurrency prices, market caps, and trading volumes
- **News Aggregation**: Curated cryptocurrency news from industry sources
- **Portfolio Tracking**: Monitor your crypto investments with detailed analytics
- **Watchlist Management**: Track your favorite cryptocurrencies
- **Interactive Charts**: Visualize price movements and market trends
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Theme**: Customizable UI themes

## Tech Stack

### Frontend (Client)

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons

### Backend (Server)

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript

### Shared

- **TypeScript** - Shared types and utilities

### Development Tools

- **ESLint** - Code linting
- **npm workspaces** - Monorepo management

## Project Structure

```
crypto-flow-monorepo/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Express backend API
│   ├── src/
│   └── package.json
├── shared/                 # Shared utilities and types
│   ├── src/
│   └── package.json
├── docs/                   # Documentation
├── package.json           # Root package.json with workspaces
└── README.md
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crypto-flow-monorepo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install dependencies for all workspaces**
   ```bash
   npm run install:all
   ```

## Development

### Running the Client

```bash
npm run dev
```

This starts the Vite dev server for the React application at `http://localhost:5173`.

### Running the Server

```bash
npm run dev:server
```

This starts the Express server with hot reloading.

### Running All Services

```bash
npm run dev:all
```

## Available Scripts

### Root Scripts

- `npm run dev` - Start the client in development mode
- `npm run build` - Build the client for production
- `npm run lint` - Run linting across all workspaces
- `npm run type-check` - Run TypeScript type checking across all workspaces

### Client Scripts

- `npm run dev` (in client/) - Start Vite dev server
- `npm run build` (in client/) - Build for production
- `npm run lint` (in client/) - Run ESLint
- `npm run preview` (in client/) - Preview production build

### Server Scripts

- `npm run dev` (in server/) - Start with tsx watch
- `npm run build` (in server/) - Compile TypeScript
- `npm run start` (in server/) - Start production server
- `npm run lint` (in server/) - Run ESLint
- `npm run type-check` (in server/) - Type check

### Shared Scripts

- `npm run build` (in shared/) - Compile TypeScript
- `npm run lint` (in shared/) - Run ESLint
- `npm run type-check` (in shared/) - Type check

## Environment Variables

Create `.env` files in the respective directories as needed:

### Client (.env)

```
VITE_API_URL=http://localhost:3000
```

### Server (.env)

```
PORT=3000
NODE_ENV=development
```

## Building for Production

1. **Build the client**

   ```bash
   npm run build
   ```

2. **Build the server**

   ```bash
   cd server && npm run build
   ```

3. **Start the server**
   ```bash
   cd server && npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (if configured)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Crypto data provided by [CoinGecko API](https://www.coingecko.com/en/api)
- Icons by [Lucide](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)</content>
  <parameter name="filePath">/home/gandort/Documents/personal/crypto-flow/README.md
