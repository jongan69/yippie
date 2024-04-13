import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking } from "react-native";
import { Link, router } from "expo-router";
import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ROUTES } from "@utils/constants";
import * as Updates from 'expo-updates';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      onError: (error) => {
        if ("message" in error) {
          console.error(error.message);
        }
      }
    }
  },
});

const RootLayout = () => {
  useReactQueryDevTools(client);
  const segments = useSegments();
  const isLogin = segments[segments.length - 1] === "(tabs)";
  const drawerTitle = isLogin ? "Welcome" : segments.length > 0 ? segments[segments.length - 1].toUpperCase() : "";

  const runTypeMessage = Updates.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : 'This app is running an update';

  console.log('runTypeMessage', runTypeMessage)

  return (
    <QueryClientProvider
      client={client}
    >
      <Drawer
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItem 
              label="Join Whitelist" 
              //onPress={() => Linking.openURL('https://mememe.ooo')} 
              onPress={() => router.replace('/')}
              />
              <Link href={ROUTES.Home} onPress={() => props.navigation.closeDrawer()}>
                Home
              </Link>
              <Link
                href={{ pathname: ROUTES.Stickers }}
                onPress={() => props.navigation.closeDrawer()}
              >
                Stickers
              </Link>
            </DrawerContentScrollView>
          );
        }}
        initialRouteName="/"
        screenOptions={{
          title: drawerTitle,
          headerBackgroundContainerStyle: {
            backfaceVisibility: "hidden"
          }
        }}
      />
    </QueryClientProvider>
  );
};

export default RootLayout;
