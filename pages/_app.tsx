import { Provider, createClient, dedupExchange, cacheExchange, subscriptionExchange} from "urql";
import { createClient as createWSClient } from 'graphql-ws';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { AuthProvider } from "../services/useAuth";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Progress } from "../components/shared/ProgressBar/Progress";
import {useProgressStore} from "../components/shared/ProgressBar/useProgressStore";

function MyApp({ Component, pageProps }) {
  //subscription channel
  const wsClient = typeof window !== "undefined" && createWSClient({
    url: 'ws://localhost:4000/graphql',
    //passing the user from local storage
    // so the user can start listening to new notifications
    connectionParams: {
      id:localStorage.getItem("id")
    }
  });


  //normal channel
  const client = createClient({
    //TODO: PROD
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include", 
      headers: {
        // @ts-ignore
        'apollo-require-preflight': true,
        
      },
    },
  
    exchanges: [
      dedupExchange,
      cacheExchange, 
      multipartFetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
      
    ],
  });


  //animation bar
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