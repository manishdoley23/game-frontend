# Game Frontend

##### Game Link: https://game-frontend-alpha.vercel.app/

A game where you have 3 cops and guess the location of the criminal. Given the 3 locations and 3 vehicles to choose from if the location is correct and the vehicle has enough range to make a round trip and the vehicle is available (i.e., count > 0) you win else you lose

#### City Choice

| City         | Distance from current city |
| ------------ | -------------------------- |
| Yapkashnagar | 60 KM                      |
| Lihaspur     | 50 KM                      |
| Narmis City  | 40 KM                      |
| Shekharvati  | 30 KM                      |
| Nuravgram    | 20 KM                      |

#### Vehicle Choice

| Kind    | Range  | Count |
| ------- | ------ | ----- |
| EV Bike | 60 KM  | 2     |
| EV Car  | 100 KM | 1     |
| EV SUV  | 120 KM | 1     |

## Frontend

This is the frontend of the game the backend is in https://github.com/manishdoley23/game-backend.git

### Tech Stack

#### Core Technologies

- **Language:** TypeScript
- **Framework:** React
- **Routing:** React Router
- **State Management:** Zustand
- **Styling:** Tailwind

#### UI Components & Utilities

- Shadcn-ui (`shadcn-ui/ui`)

#### Build Tools & Development

- **Build Tool:** Vite 6
- **Package Manager:** yarn

### Scripts

```bash
# Start development server
yarn dev

# Build for production
yarn build

```
