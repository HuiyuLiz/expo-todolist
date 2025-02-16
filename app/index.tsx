import { useEffect, useCallback } from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useSSO } from "@clerk/clerk-expo"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from './components/';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
    // Return empty cleanup function for web platform
    return () => { };
  }, []);
};

// Handle any pending authentication sessions
if (Platform.OS !== 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

export default function Index() {
  useWarmUpBrowser()
  const { startSSOFlow } = useSSO()
  const { top } = useSafeAreaInsets()

  const handleGoogleOAuth = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
        console.log('Signed in!')
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        console.log('Missing requirements to sign in')
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  const handleOpenLink = async () => {
    await WebBrowser.openBrowserAsync('https://github.com/huiyuliz')
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Text style={{ fontSize: 40 }}>Todo List</Text>
      <Button text="Sign in with Google" fullWidth onPress={handleGoogleOAuth} />

      <Text style={styles.description}>
        By continuing you agree to Todoist's{' '}
        <Text style={styles.link} onPress={handleOpenLink}>
          Terms of Service
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={handleOpenLink}>
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    margin: 20,
  },
  description: {
    width: '70%',
    lineHeight: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
  },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline' as const,
  },
});