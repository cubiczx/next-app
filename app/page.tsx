import CSSExternal from "./CSSExternal";
import SCSSExternal from "./SCSSExternal";

import Menu from "./Menu";

export default function Home() {

  return (
    <div>
      <Menu />
      <h1 style={{ color: "green", textAlign: "center" }}>Welcome to Next.js!</h1>
      <CSSExternal />
      <SCSSExternal />
    </div>
  );
}
