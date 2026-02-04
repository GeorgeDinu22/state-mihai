"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      if (user.app_metadata?.role !== "admin") {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      setAllowed(true);
    }

    verify();
  }, [router]);

  if (!allowed) return null;

  return <>{children}</>;
}
