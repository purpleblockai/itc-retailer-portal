# ITC Retailer Portal

A modern web application for ITC retailers featuring speech-to-text game variations and interactive user experiences.

## Features

### 1. Game Variations
- **ITC Classic**
- **ITC Flake**
- **ITC Navy Cut**
Each variation features unique branding while maintaining consistent gameplay mechanics.

### 2. Speech Recognition & Validation
- Enhanced speech-to-text validation system
- Exact phrase matching requirement
- Improved text cleaning and comparison logic
- Manual recording stop functionality
- 8-second automatic recording timer
- Visual feedback for recording state

### 3. UI/UX Improvements
- **Consistent Design Language**
  - Spiral background pattern across all games
  - Standardized box sizes and styling
  - Uniform button dimensions and colors
  - Cohesive layout structure

- **Game Won Page**
  - Minimalist design with circular back button
  - Animated trophy icon
  - Congratulatory message
  - Clean, modern aesthetic

- **Verification Success Page**
  - Purple checkmark icon
  - Updated text styling
  - Matching background pattern
  - Clear success indicators

## Technical Requirements

- Node.js
- pnpm (Package Manager)
- OpenAI API Key for speech validation

## Environment Variables

```env
OPENAI_API_KEY=your_api_key_here
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/purpleblockai/itc-retailer-portal.git
cd itc-retailer-portal
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
- Create a `.env` file in the root directory
- Add your OpenAI API key as shown above

4. Run the development server:
```bash
pnpm dev
```

5. Build for production:
```bash
pnpm build
```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Import your repository on Vercel
2. Add the required environment variables
3. Deploy the project

## Features in Detail

### Speech Validation
- Improved accuracy with exact phrase matching
- Enhanced text cleaning algorithms
- Real-time feedback during recording
- Manual stop recording capability

### User Interface
- Consistent styling across all game variations
- Responsive design for all screen sizes
- Interactive feedback elements
- Smooth transitions and animations

### Game Flow
1. User Registration/Login
2. Game Selection (Classic/Flake/Navy Cut)
3. Speech Recording Interface
4. Validation Process
5. Success/Retry Flow
6. Prize Collection Information

## Technical Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- OpenAI API for Speech Validation

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is private and proprietary. All rights reserved. 