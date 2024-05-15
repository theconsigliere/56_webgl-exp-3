"use client"
import { Canvas } from "@react-three/fiber"
import { Model } from "./Model"
import { Perf } from "r3f-perf"
import { Environment, OrbitControls } from "@react-three/drei"

import Plane from "./Plane"

export default function Scene() {
  return (
    <Canvas dpr={[1, 2]} style={{ backgroundColor: "#141414" }}>
      <Perf position={"bottom-left"} />

      {/* <Environment preset="night" /> */}
      <OrbitControls makeDefault />
      {/* <Plane /> */}
      <Model position={[0, -0.5, 0]} />

      {/* <gridHelper
        args={[10, 40, "#404040", "#404040"]}
        position={[0, -1.15, 0]}
        rotation={[0, 0, 0]}
      /> */}
    </Canvas>
  )
}
