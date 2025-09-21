import Phase7 from "@/components/Maps/Phase7";
import { ThemedView } from "@/components/themed-view";
import React from "react";

export default function map() {
  return (
    <ThemedView
      style={{
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Phase7 />
    </ThemedView>
  );
}
