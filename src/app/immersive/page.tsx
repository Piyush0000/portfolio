import type { Metadata } from "next";
import ImmersiveClient from "./ImmersiveClient";

export const metadata: Metadata = {
  title: "Immersive gallery",
  description: "Projects floating as interactive panels in a WebXR-ready 3D space.",
  alternates: { canonical: "/immersive" },
};

export default function ImmersivePage() {
  return <ImmersiveClient />;
}
