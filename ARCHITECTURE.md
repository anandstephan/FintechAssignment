# Architecture Document - SDUI Platform

This document outlines the architectural decisions and technical implementation of the Server-Driven UI (SDUI) system used in the Gold Investment Platform.

## 1. SDUI Rendering Engine

The rendering engine is built on a **top-down iterative approach**. 
1. **Fetch**: The app fetches a flat array of component objects from the backend.
2. **Iterate**: The `DashboardScreen` iterates through this array.
3. **Map**: Each object is passed to the `ComponentMapper`.
4. **Render**: The mapper returns the corresponding React Native component, passing the `data` and `feature_flags` as props.

## 2. Component Registry

The `src/components/ComponentMapper.tsx` acts as the **Central Registry**.
- It decouples the screen layout from individual component implementations.
- New components can be added to the app by creating the component file and adding a new `case` to the mapper.
- This registry pattern ensures that the backend only needs to know the "type" name to trigger a render.

## 3. Feature Flags Strategy

Feature flags are treated as **First-Class Citizens** in the SDUI payload.
- The `feature_flags` object is provided at the root level of the screen JSON.
- These flags are passed down through the `ComponentMapper` to child components.
- **Example**: The `GoldRateBanner` uses the `enable_live_gold_rate` flag to conditionally start/stop the price update interval.
- **Layout Control**: In `DashboardScreen`, feature flags are used to completely omit certain components (like `investment_cards`) based on user eligibility or backend configuration.

## 4. API Versioning

While not implemented in this mock, the strategy for production would be:
- **Header-based Versioning**: The app sends `X-App-Version` in headers.
- **Payload Versioning**: The backend returns a `version` field in the SDUI JSON.
- The `ComponentMapper` would use this version to handle breaking changes in component data structures.

## 5. Unknown Component Handling

To prevent app crashes when the backend sends a component type that the app doesn't recognize (e.g., a newer version of the app adds a "Rewards" component), the `ComponentMapper` includes a **Default Fallback**:
- Any unrecognized `type` returns `null` (or a `DebugUnknownComponent` in development).
- This ensures the rest of the dashboard remains perfectly functional even if new features are being rolled out.

## 6. Failure Recovery

- **Image Fallbacks**: Components like `BannerCarousel` and `RecommendedProducts` use a local state to track image load errors. If an image fails, a reliable fallback URL is used.
- **Graceful Degradation**: If the SDUI API fails entirely, the app is designed to check for a locally cached version of the last successful response to allow offline/limited functionality.

## 7. Analytics Strategy

The SDUI architecture simplifies analytics:
- Each component object in the JSON can include an `analytics_id` or `tracking_metadata`.
- The `ComponentMapper` can wrap all rendered components in a `Pressable` or `AnalyticsWrapper` that automatically logs impressions and clicks using these IDs.

## 8. Native Module Strategy

The app is currently purely React Native (TypeScript). However, for performance-critical sections:
- **Kotlin/Swift**: We would implement a Native Module for the **Live Gold Rate WebSocket** to ensure the socket connection remains stable even when the app is in the background or the JS thread is busy.
- **Bridge**: The native side would emit events to the JS layer, which the `GoldRateBanner` would listen to.

## 9. Performance Optimisation Decisions

- **Shallow Props**: Data is passed to components in chunks (`component.data`), preventing large unnecessary prop trees.
- **Animated Skeletons**: Minimizes perceived latency and prevents "Layout Jitter" as remote assets load.
- **StyleSheet Pre-computation**: All styles are defined outside the render cycle using `StyleSheet.create` for optimal native performance.
