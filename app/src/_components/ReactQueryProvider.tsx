"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {

  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;