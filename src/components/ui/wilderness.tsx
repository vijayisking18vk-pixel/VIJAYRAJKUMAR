import { cn } from "@/lib/utils";
import React from "react";
import { ParallaxHero, ParallaxHeroProps, defaultLayers } from "./demo";

export const ParallaxHeroDemo: React.FC = () => {
  return <ParallaxHero title="VIJAY" />;
};

export { ParallaxHero, defaultLayers };
export default ParallaxHeroDemo;
