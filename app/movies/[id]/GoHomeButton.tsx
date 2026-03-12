'use client';

import { useRouter } from "next/navigation";

export default function GoHomeButton() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <button onClick={goToHome} style={{ margin: "0 10px" }}>
      Go to Home
    </button>
  );
}
