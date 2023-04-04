import { Provider, createClient, cacheExchange, subscriptionExchange, dedupExchange} from "urql";
import { Client, createClient as createWSClient } from 'graphql-ws';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { AuthProvider } from "../services/useAuth";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Progress } from "../components/shared/ProgressBar/Progress";
import { useProgressStore } from "../components/shared/ProgressBar/useProgressStore";


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
      //@ts-ignore
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
  
  const [isDown] = useState<boolean>(false);


  if(isDown) return (
    <section className="flex font-primary items-center h-screen p-16 bg-dark text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-primary-focus">
                        <span className="sr-only">Error</span>503
                    </h2>
                    <p className="text-2xl font-semibold md:text-4xl">Gamingpills is not available at this time</p>
                    <p className="mt-4 mb-8 text-lg text-gray-400">Sorry, we're down for maintenance. Check back shortly</p>
                </div>
            </div>
    </section>
  )

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
