import React, { useEffect, useState } from "react";

export default function useClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}
