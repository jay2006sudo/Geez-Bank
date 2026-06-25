# Geez Bank Mobile App - Android Installation Guide

## Installation Methods

### Method 1: Direct APK Download (Recommended)

1. **Visit the download page:**
   ```
   https://github.com/jay2006sudo/Geez-Bank/releases
   ```

2. **Download the latest APK:**
   - Look for the latest release
   - Click on `geez-bank-v1.0.0.apk` to download
   - File size: ~50-60 MB

3. **Install on your Android phone:**
   - Open your Downloads folder
   - Tap on the APK file
   - Allow installation from unknown sources if prompted
   - Tap "Install"
   - Wait for installation to complete
   - Tap "Open" to launch the app

### Method 2: Build from Source

#### Prerequisites:
- Android Studio installed
- JDK 8 or higher
- Node.js 16+
- React Native CLI

#### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jay2006sudo/Geez-Bank.git
   cd Geez-Bank
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **Find the APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

5. **Transfer to phone:**
   - Use USB cable or cloud storage
   - Install as described in Method 1

### Method 3: Google Play Store (Future)

The app will be available on Google Play Store soon. You'll be able to:
- Search "Geez Bank"
- Tap "Install"
- Wait for automatic installation and updates

## System Requirements

- **Android Version:** 7.0 or higher
- **RAM:** Minimum 2 GB (4 GB recommended)
- **Storage:** 100 MB free space
- **Network:** Internet connection required

## Enable Installation from Unknown Sources

If you're installing from APK directly:

1. **For Android 8.0+:**
   - Go to Settings
   - Tap Apps & notifications
   - Tap Advanced
   - Tap Special app access
   - Tap Install unknown apps
   - Find and select your browser or file manager
   - Toggle "Allow from this source" ON

2. **For Android 7.x:**
   - Go to Settings
   - Tap Security
   - Toggle "Unknown Sources" ON

## First Launch Setup

1. **Allow Permissions:**
   - Storage access (for local data)
   - Network access (for API calls)

2. **Configure API Settings:**
   - Open Settings in the app
   - Set your API endpoint
   - Enter server credentials if required

3. **Create Account or Login:**
   - Tap "Sign Up" to create a new account
   - Or "Login" if you already have credentials

## Troubleshooting

### App Won't Install
- **Problem:** "Parse error"
  - **Solution:** Download file is corrupted. Try downloading again.

- **Problem:** "Insufficient storage"
  - **Solution:** Free up at least 150 MB space on your device.

- **Problem:** "Unknown sources not allowed"
  - **Solution:** Enable installation from unknown sources (see above).

### App Crashes on Launch
- Clear app data: Settings > Apps > Geez Bank > Storage > Clear Data
- Uninstall and reinstall the app
- Check that you have internet connection

### Can't Connect to Server
- Verify internet connection
- Check API endpoint configuration
- Ensure server is running and accessible

## Uninstall

1. Go to Settings
2. Tap Apps
3. Find "Geez Bank"
4. Tap "Uninstall"
5. Confirm uninstallation

## Support

- **Documentation:** [README.md](README.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Issues:** [GitHub Issues](https://github.com/jay2006sudo/Geez-Bank/issues)
- **Email:** support@geezbank.com

## Version History

### v1.0.0 (Current)
- ✅ User authentication (Login/Register)
- ✅ Account management
- ✅ Transaction history
- ✅ Money transfers
- ✅ User profile
- ✅ Local data encryption

### Upcoming Features
- 🔄 Biometric authentication
- 🔔 Push notifications
- 📊 Analytics dashboard
- 💳 Bill payments
- 📱 Mobile top-up
- 🌙 Dark mode

## Security Notice

⚠️ **Important:**
- Only download from official GitHub repository
- Never share your login credentials
- Sensitive data is encrypted locally
- Transactions use HTTPS encryption
- Log out when not using the app

---

**Last Updated:** June 25, 2026

**Need Help?** Open an issue on [GitHub](https://github.com/jay2006sudo/Geez-Bank/issues)
