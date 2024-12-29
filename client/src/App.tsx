import { useWebSocketContext } from "@/hooks/useWebsockets";

import { cn } from "@/utils/cl";

import InitialLoading from "@/components/initial-loading/InitialLoading";
import { TopBar } from "@/components/top-bar/top-bar/TopBar";
import { MainContainer } from "@/components/main-container/MainContainer";

import "./App.css";

function App() {
  const { isConnecting } = useWebSocketContext();

  return (
    <main
      className={cn(
        "flex-grow flex flex-col bg-gradient-to-br from-emerald-900 to-emerald-700"
      )}
    >
      {isConnecting ? (
        <InitialLoading />
      ) : (
        <>
          <TopBar />
          <MainContainer classNames="flex-grow" />
        </>
      )}
    </main>
  );
}

export default App;
