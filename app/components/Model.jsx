/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useMemo, useRef } from "react"
import { useGLTF, MeshTransmissionMaterial, Edges } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { NewShaderMaterial } from "./Shader"
import { easing } from "maath"

export function Model({ ...props }) {
  const { nodes, materials } = useGLTF("/assets/mxk-logo.glb")
  const { viewport, size } = useThree()
  const model = useRef()
  const shaderRef = useRef([])

  const shaderProps = useControls("Shader Props", {
    rings: { value: 30, min: 1, max: 100 },
    fract: { value: 2.0, min: 0.1, max: 10 },
  })

  const shaderMaterial = useMemo(() => {
    const shaderMaterial = new NewShaderMaterial({
      uResolution: [size.width * viewport.dpr, size.height * viewport.dpr],
      uRings: shaderProps.rings,
      uFract: shaderProps.fract,
    })
    return shaderMaterial
  }, [shaderProps])

  const geometry = useMemo(
    () => [
      nodes.M1.geometry,
      nodes.M2.geometry,
      nodes.M3.geometry,
      nodes.K1.geometry,
      nodes.K2.geometry,
      nodes.K3.geometry,
    ],
    []
  )

  useFrame((state, delta) => {
    model.current.rotation.y += 0.05 * delta
    shaderMaterial.uTime += delta
    // ease the pointer
    easing.damp3(shaderMaterial.uPointer, state.pointer, 0.2, delta)
  })

  return (
    <group dispose={null} scale={viewport.width / 15} ref={model} {...props}>
      {geometry.map((geometry, index) => (
        <mesh
          key={index}
          geometry={geometry}
          material={shaderMaterial}
          position={[0, 1, 0]}
        >
          <Edges color="white" linewidth={1} />
        </mesh>
      ))}
    </group>
  )
}

useGLTF.preload("/mxk-logo.glb")
