# Gold Investment Platform - Server-Driven UI Dashboard

This is a React Native project implementing a Server-Driven UI (SDUI) architecture for a Gold Investment Platform. The app dynamically renders its Home Dashboard layout and content based completely on a JSON payload provided by the backend, allowing instant layout updates without app store releases.

## Features implemented
- **Server-Driven UI**: Entire dashboard (Header, Banners, Cards, Forms, FAQs) is rendered from a JSON payload.
- **Authentication Flow**: Full Login and OTP verification flow with hardcoded credentials (`1234567890` / `1234`).
- **Persistent Session**: Uses `AsyncStorage` to persist login state across app restarts.
- **Advanced Navigation**: Implementation of `React Navigation` with Stack and Bottom Tab Navigators.
- **Feature Flags**: Dynamic toggling of UI sections and functionalities (e.g., live gold rate simulation) via backend-driven flags.
- **Resilient UI**: Image fallback handling for broken remote assets.
- **Loading UX**: Custom animated Skeleton Screens for a premium loading experience.

## Setup Instructions

1. **Install Dependencies:**
   ```sh
   npm install
   ```

2. **Run the App:**
   - For Android: `npm run android`
   - For iOS: `npm run ios` (Requires Mac and `cd ios && pod install`)

## Architecture Explanation

The app leverages a Server-Driven UI engine. The backend serves a JSON structure containing `screen` metadata, `feature_flags`, and an array of `components`. 

- **App.tsx**: Acts as the root navigator. It checks the persistent login state and routes the user to either the Login stack or the Main Tab stack.
- **ComponentMapper.tsx**: Acts as the central SDUI rendering engine. It maps component `type` strings (e.g., `investment_cards`) to specific React components.
- **DashboardScreen.tsx**: Fetches the SDUI payload (simulated via `mockData.ts`) and renders the components dynamically using the mapper.

*For more details, see [ARCHITECTURE.md](./ARCHITECTURE.md).*

## Assumptions

- **Credentials**: Hardcoded for testing: Mobile `1234567890`, OTP `1234`.
- **Backend structure**: The backend response is trusted and follows a strict schema for each component type.
- **Real-time updates**: Simulated via `setInterval` in `GoldRateBanner.tsx`. In production, this would use WebSockets.

## Performance Decisions

- **Skeleton Screens**: Used to prevent layout shifts and improve perceived performance during data fetching.
- **Optimized Rendering**: Components are designed as pure functions; conditional rendering is handled early in the mapper to avoid unnecessary mounts.
- **Sticky CTA**: Extracted from the ScrollView to remain fixed at the bottom, ensuring zero layout thrashing during scroll.

## Security Considerations

- **Persistent Auth**: Login state is stored securely (using `AsyncStorage` for now; `Keychain`/`EncryptedSharedPrefs` would be used in production).
- **Data Sanitization**: Image URLs and redirection links from the SDUI payload should be validated before use.

## Offline Fallback

- **Image Fallbacks**: If a remote image fails to load (e.g., 404 or no network), a reliable local/remote placeholder is displayed to maintain UI integrity.
- **Cached Layout**: In production, the last fetched SDUI JSON would be cached to allow offline dashboard rendering.

## What I Would Improve With More Time

- **FlatList Migration**: Replace `ScrollView` with `FlatList` in the dashboard for better memory management with larger payloads.
- **Unit Testing**: Add Jest/RTL tests for the `ComponentMapper` to ensure component types are mapped correctly.
- **Deep Linking**: Implement deep linking to allow SDUI components to navigate to specific sections of the app (e.g., a banner navigating to a product detail page).
- **Theming**: Implement a dynamic theme provider to allow "Dark Mode" or brand-based colors to be driven by the SDUI payload.
