# CertLine Mobile Frontend

React Native mobile application for the CertLine platform.

## Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Start the Expo development server and open Android emulator
- `npm run ios`: Start the Expo development server and open iOS simulator
- `npm run web`: Start the Expo development server for web

## Dependencies

- React Native with Expo
- TypeScript
- React Navigation
- AsyncStorage for token storage

## Project Structure

```
mobile_front/
├── components/          # Shared components
├── screens/             # Screen components
├── services/            # API and data services
├── .env                 # Environment variables
├── App.tsx              # Main application component
└── babel.config.js      # Babel configuration
```


# CertLine Mobile Application

CertLine Mobile is a React Native application built with Expo that connects businesses with certification experts, educational resources, and job opportunities in the certification industry.

## Features

- Browse and search for certification consultants
- Discover educational courses and training programs
- Find job opportunities in the certification industry
- Stay updated with industry news and announcements
- Filter content by certification type (ISMS-P, ISO 27001, ISO 9001, etc.)
- Responsive design for various mobile devices

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Framework and platform for universal React applications
- **TypeScript** - Typed superset of JavaScript
- **React Navigation** - Routing and navigation for React Native apps
- **FontAwesome5** - Icon library for UI elements

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI (installed globally)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the mobile front directory:
   ```bash
   cd mobile_front
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Running on Devices

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser
```bash
npm run web
```

### Physical Device
1. Install the Expo Go app on your device
2. Scan the QR code displayed in the terminal or Expo DevTools

## Project Structure

```
mobile_front/
├── assets/                 # Images and other static assets
├── components/             # Reusable UI components
│   ├── Header.tsx          # Top navigation header
│   └── SideMenu.tsx        # Side navigation menu
├── screens/                # Main screen components
│   ├── components/         # Screen-specific UI components
│   │   ├── ConsultantCard.tsx
│   │   ├── EducationCard.tsx
│   │   ├── JobCard.tsx
│   │   ├── NoticeItem.tsx
│   │   ├── RecommendedConsultantCard.tsx
│   │   ├── RecommendedEducationCard.tsx
│   │   ├── SectionTitle.tsx
│   │   └── UrgentCard.tsx
│   ├── data/               # Mock data
│   │   └── mokup.json
│   ├── styles/             # Stylesheets
│   │   └── styles.js
│   ├── subforms/           # Tab components
│   │   ├── ConsultantsTab.tsx
│   │   ├── EducationTab.tsx
│   │   ├── JobsTab.tsx
│   │   └── NoticesTab.tsx
│   └── HomeScreen.tsx      # Main home screen
├── services/               # Data services and utilities
│   └── dataService.ts      # Data management service
├── App.tsx                 # Main application component
├── app.json                # Expo configuration
├── index.ts                # Entry point
└── package.json            # Project dependencies and scripts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run the app on iOS simulator
- `npm run android` - Run the app on Android emulator
- `npm run web` - Run the app in a web browser

## Development

### Adding New Features

1. Create new components in the appropriate directory (`components/` or `screens/`)
2. Import and use components in the relevant screen files
3. Update navigation if adding new screens

### Styling

Styles are defined using React Native's StyleSheet API. All styles are centralized in [styles.js](file:///Users/chalskim/src/certmatch/certmatch/mobile_front/screens/styles/styles.js) file for consistency and maintainability.

### Data Management

The app uses mock data stored in `screens/data/mokup.json`. The [dataService.ts](file:///Users/chalskim/src/certmatch/certmatch/mobile_front/services/dataService.ts) file provides methods to access and manipulate this data.

### UI Components

The application is composed of several reusable components:
- **Header**: Top navigation bar with menu and notification icons
- **SideMenu**: Sliding side navigation menu
- **Cards**: Various card components for displaying data (ConsultantCard, EducationCard, JobCard, etc.)
- **Tabs**: Tab components for organizing content (JobsTab, EducationTab, etc.)

## Troubleshooting

### Common Issues

1. **Metro Bundler fails to start**
   - Clear cache: `npx react-native start --reset-cache`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

2. **iOS build fails**
   - Ensure you have Xcode installed (macOS only)
   - Run `cd ios && pod install` to install CocoaPods dependencies

3. **Android build fails**
   - Ensure you have Android Studio installed
   - Make sure ANDROID_HOME environment variable is set

### Clearing Cache

If you encounter unexpected behavior, try clearing the cache:

```bash
# Clear Expo cache
npx expo start -c

# Clear npm cache
npm start -- --reset-cache
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or open an issue in the repository.