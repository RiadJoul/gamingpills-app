import { Provider, createClient, dedupExchange, cacheExchange, subscriptionExchange} from "urql";
import { Client, createClient as createWSClient } from 'graphql-ws';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { AuthProvider } from "../services/useAuth";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Progress } from "../components/Shared/ProgressBar/Progress";
import {useProgressStore} from "../components/Shared/ProgressBar/useProgressStore";

function MyApp({ Component, pageProps }) {
  //TODO: add constants for this
  const wsUrl = 'ws://localhost:4000/graphql';
  const httpUrl = 'http://localhost:4000/graphql';
  
  // create websocket client and listen to changes in localStorage
  let wsClient:Client;
  if (typeof window !== "undefined") {
    const createWebSocketClient = (id:string) => createWSClient({
      url: wsUrl,
      connectionParams: { id },
    });
    wsClient = createWebSocketClient(localStorage.getItem("id"));
    window.addEventListener('storage', () => {
      wsClient.terminate();
      wsClient = createWebSocketClient(localStorage.getItem("id"));
    });
  }
  
  // create http client
  const client = createClient({
    url: httpUrl,
    fetchOptions: {
      credentials: "include", 
      headers: {
        //@ts-ignore
        'apollo-require-preflight': true,
      },
    },
    exchanges: [
      dedupExchange,
      cacheExchange, 
      multipartFetchExchange,
      ...(wsClient
        ? [
            subscriptionExchange({
              forwardSubscription: (operation) => ({
                subscribe: (sink) => ({
                  unsubscribe: wsClient.subscribe(operation, sink),
                }),
              }),
            }),
          ]
        : []),
    ],
  });

  // animation bar
  const setIsAnimating = useProgressStore((state:any) => state.setIsAnimating);
  const isAnimating = useProgressStore((state:any) => state.isAnimating);
  const router = useRouter();
  
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true)
    }
    const handleStop = () => {
      setIsAnimating(false)
    }

    router.events.on('routeChangeStart',handleStart);
    router.events.on('routeChangeComplete',handleStop);
    router.events.on('routeChangeError',handleStop);

    return () => {
      router.events.off('routeChangeStart',handleStart);
      router.events.off('routeChangeComplete',handleStop);
      router.events.off('routeChangeError',handleStop);
    }
  },[router])
  

  return (
    <Provider value={client}>
      <AuthProvider>
        <div className="font-primary">
          <Progress isAnimating={isAnimating}/>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
