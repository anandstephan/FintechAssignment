# Server-Driven UI (SDUI) Architecture Document

## 1. SDUI Rendering Engine
The core of the SDUI engine is located in `App.tsx` and `ComponentMapper.tsx`.
- **Backend Driven:** The entire screen is constructed by parsing the `components` array from the JSON payload.
- **Dynamic Iteration:** `App.tsx` maps over the `components` array and passes each item to `renderComponent`.
- **Separation of Concerns:** Each UI component only cares about rendering its specific `data` props.

## 2. Component Registry (`ComponentMapper.tsx`)
A centralized registry maps backend `type` strings (e.g., `gold_rate_banner`, `investment_cards`) to React Native components. 
- It uses a simple switch-case (can be scaled to a hash map/dictionary for O(1) lookups in larger apps).
- Ensures that new components only need to be registered in one place.

## 3. Feature Flags Strategy
Feature flags are passed alongside the screen data (`screen.feature_flags`).
- Evaluated on the client-side *before* rendering the component in the scroll view.
- E.g., `show_wallet_section` or `show_recommendation_section` directly determine if a mapped component should be dropped or rendered.
- **Future scaling:** Can be integrated with LaunchDarkly or Firebase Remote Config to override or supplement backend flags.

## 4. API Versioning
The JSON response includes a `version: "2.1.0"` key.
- **Usage:** This version determines which parser or component set the app should use.
- **Backward Compatibility:** If the app detects an older version, it can fall back to legacy rendering or apply data transformation adapters.

## 5. Unknown Component Handling & Failure Recovery
Graceful degradation is a core requirement.
- **FallbackComponent:** If a `type` string (e.g., `premium_exclusive_section`) does not exist in the registry, the engine falls back to a warning/placeholder rather than throwing an unhandled exception.
- **UI Safety:** Prevents white screens of death (WSOD). In production, `FallbackComponent` returns `null` so the user doesn't see broken UI, but it silently logs the anomaly.

## 6. Analytics Strategy
SDUI enables highly granular analytics.
- Since all data comes from the backend, each component can have an injected `tracking_id`.
- The `ComponentMapper` can wrap each component in an `ImpressionTracker` higher-order component to automatically fire events (e.g., `Component_Viewed`) when the component enters the viewport.

## 7. Native Module Strategy (Kotlin/Swift)
While the UI is rendered via React Native JS thread:
- Heavy tasks (like the actual real-time WebSocket connection for Gold Rates) should ideally be offloaded to Native Modules.
- We would build a `GoldRateWebSocketManager` in Kotlin/Swift, which maintains the connection in the background and emits events to the JS layer, minimizing bridge traffic.

## 8. Performance Optimisation Decisions
- **Memoization:** Components are stateless functional components. In a production scenario, they should be wrapped in `React.memo` with custom comparison functions to prevent re-renders when other sections update.
- **FlatList vs ScrollView:** Currently using `ScrollView`. For screens with >20 components, we would switch to `FlatList` with `windowSize` optimizations to lazily render off-screen SDUI sections.
- **Image Caching:** Heavy use of `react-native-fast-image` (mocked in this assignment via native `Image` for simplicity) would be employed to ensure banners don't jitter during scroll.
