import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    /**
     * Web-only: maps a key to a `data-*` attribute.
     * React Native Web supports it, but the React Native types do not include it.
     */
    dataSet?: Record<string, string>;
  }
}
