# Gold Investment Platform - Server-Driven UI Dashboard

This is a React Native project implementing a Server-Driven UI (SDUI) architecture for a Gold Investment Platform. The app dynamically renders its Home Dashboard layout and content based completely on a JSON payload provided by the backend, allowing instant layout updates without app store releases.

## Setup Instructions

1. **Install Dependencies:**
   ```sh
   npm install
   # OR
   yarn install
   ```

2. **iOS Pods Setup (Mac only):**
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

3. **Start the Metro Bundler:**
   ```sh
   npm start
   ```

4. **Run the App:**
   - For Android: `npm run android`
   - For iOS: `npm run ios`

## Architecture Explanation

The app leverages a Server-Driven UI engine. The backend serves a JSON structure containing `screen` metadata, `feature_flags`, and an array of `components`. 

- **App.tsx** fetches this JSON (simulated via local `mockData.ts`) and iterates through the `components` array.
- **ComponentMapper.tsx** acts as a registry, mapping a `type` string (e.g., `investment_cards`) to a specific React functional component.
- The UI is entirely decoupled from the business logic of "what" to show, enabling dynamic A/B testing and layout shifts natively driven by API responses.

*For more details, see [ARCHITECTURE.md](./ARCHITECTURE.md).*

## Assumptions

- The backend response is trusted and structurally valid (e.g., if a component is of type `banner_carousel`, its `data` object will reliably contain an `items` array).
- Real-time updates for Gold Rates are currently simulated via a `setInterval` hook in `GoldRateBanner.tsx`. In production, this would be tied to a `WebSocket` instance.
- Feature flags are resolved client-side against the `feature_flags` object sent in the JSON.

## Performance Decisions

- **Sticky CTA Extraction:** The Sticky CTA is filtered out of the main `ScrollView` list and rendered absolutely at the bottom to ensure it doesn't cause layout thrashing during scroll.
- **Component Granularity:** Components are strictly separated, allowing for easy `React.memo` integration to prevent unnecessary re-renders when data updates (like live gold price ticks).

## Security Considerations

- **Data Sanitization:** URLs for images and redirects passed from the JSON should be validated/sanitized before passing them to native components (e.g., preventing XSS via malicious deeplink URLs).
- **Network Security:** The SDUI API payload should only be fetched over HTTPS, using cert pinning to prevent Man-in-the-Middle (MitM) attacks injecting fraudulent components (e.g., fake payment banners).

## Offline Fallback

Currently, the app relies on the simulated backend fetch. In a production environment:
1. The last successfully fetched SDUI JSON payload would be cached locally using `AsyncStorage` or `MMKV`.
2. On app launch without internet, the cached JSON would render the layout.
3. Components reliant on real-time data (Gold Rate) would display an "Offline" badge and disable their "Buy Now" CTAs.

## What I Would Improve With More Time

- **Transition to FlatList:** Refactor `ScrollView` to `FlatList` to optimize memory usage for an infinitely growing list of SDUI components.
- **WebSocket Integration:** Build an actual `Socket.io` or raw WebSocket hook context to manage live gold rates across the app, replacing the `setInterval` mockup.
- **Error Boundaries:** Implement React Error Boundaries around `renderComponent` so that if one specific SDUI component crashes due to bad data, the rest of the screen remains functional.
- **Animations:** Add `Reanimated` layout transitions for when feature flags toggle sections on and off smoothly.
