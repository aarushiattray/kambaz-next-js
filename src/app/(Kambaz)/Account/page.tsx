"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/Account/Signin");
  }, [router]);

  return null; // nothing rendered, but layout (sidebar) still loads
}



