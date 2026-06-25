# Geez Bank Mobile App

A fully functional banking mobile application built with React Native, featuring secure authentication, account management, transactions, and money transfers.

## Features

- 🔐 **Secure Authentication** - Login/Registration with encrypted credentials
- 💳 **Account Management** - View account details and balance
- 📊 **Transaction History** - Complete transaction tracking
- 💸 **Money Transfers** - Send money between accounts
- 📱 **Responsive Design** - Works on iOS and Android
- 🛡️ **Security** - Encrypted local storage for sensitive data
- 🧪 **Testing** - Comprehensive Jest test suite
- 📲 **Native Feel** - Native components and navigation

## Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe code
- **Redux Toolkit** - State management
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **SQLite** - Local database
- **Encrypted Storage** - Secure credential storage

## Prerequisites

- Node.js 16+
- npm or yarn
- Xcode (for iOS) or Android Studio (for Android)
- React Native CLI

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay2006sudo/Geez-Bank.git
   cd Geez-Bank
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API configuration
   ```

4. **Install pods (iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

### Run Tests
```bash
npm test
# or
yarn test
```

## Project Structure

```
Geez-Bank/
├── src/
│   ├── screens/           # App screens (Login, Home, Transactions, etc.)
│   ├── components/        # Reusable UI components
│   ├── navigation/        # Navigation configuration
│   ├── redux/             # Redux store, slices, and selectors
│   ├── services/          # API calls and external services
│   ├── utils/             # Helper functions
│   ├── types/             # TypeScript type definitions
│   └── App.tsx            # Root app component
├── __tests__/             # Test files
├── ios/                   # iOS native code
├── android/               # Android native code
├── app.json               # App configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## API Integration

The app is configured to connect to a backend API. Update the API base URL in `src/config/api.ts`:

```typescript
const API_BASE_URL = 'https://your-api-endpoint.com';
```

## Security

- Credentials are encrypted using `react-native-encrypted-storage`
- JWT tokens are stored securely
- API calls use HTTPS
- Sensitive data is cleared on logout

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please open an issue on [GitHub Issues](https://github.com/jay2006sudo/Geez-Bank/issues).
