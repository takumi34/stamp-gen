# Slack Stamp Generator

A web-based tool for creating custom Slack emoji stamps (128×128px PNG images)

**Demo**: https://takumi34.github.io/stamp-gen/

### Tech Stack

- React 19 with TypeScript
- Tailwind CSS v4 for styling
- Canvas API for image rendering
- CVA (class-variance-authority) for component variants
- Vite for build tooling
- Vitest for testing

## Project Structure

```
src/
├── components/       # React components
│   └── ui/          # Base UI components with CVA variants
├── hooks/           # Custom React hooks
├── utils/           # canvas, validation
├── types/           # TypeScript type definitions
├── styles/          # Custom CSS
└── constants/       # Configuration values
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```
