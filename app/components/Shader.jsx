import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY
const NewShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    pointer: new THREE.Vector2(),
    uRings: 0,
    uFract: 0,
    // uColor1: new THREE.Color("#ff0000"),
    // uColor2: new THREE.Color("#00ff00"),
    // uColor3: new THREE.Color("#0000ff"),
    // uColor4: new THREE.Color("#ff00ff"),
    side: THREE.DoubleSide,
  },
  // THREE.doubleSide renders both sides of the plane

  /*vertex*/ `      
      varying vec2 vUv;
      void main()
      {
        //Position
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        // Final position
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vUv = uv;
      }
      `,
  /*fragment*/ `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 pointer;
      uniform float uRings;
      uniform float uFract;

      varying vec2 vUv;  
      
      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }
       
      void main()
      {
      // // vec2 clipSpace = vUv * 2.0 - 1.0;
      // // vec2 clipSpace = vUv;
      //  // fix aspect ratio
      // // clipSpace.x *= uResolution.x / uResolution.y;

       vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y; 

       // UV Before screen split
       vec2 oldUv = uv;


       // DIVIDE SCREEN INTO 4 QUADRANTS INTIALLY
       uv = fract(uv * uFract) - 0.5;



      float distanceFromCenter = length(uv);

      // Add palette
      vec3 color = palette(length(oldUv) + uTime);

      //  // MIDDLE RING
      // // distanceFromCenter -= 0.5;

      //RADIAL RINGS
       distanceFromCenter = sin(distanceFromCenter * uRings + uTime) / uRings;
       distanceFromCenter = abs(distanceFromCenter);


      



      //  // RING HARD EDGE
      //  // distanceFromCenter = step(0.1, distanceFromCenter);

      //  // smooth ring
      // // distanceFromCenter = smoothstep(0.0, 0.1, distanceFromCenter);

       // inverse glow ring
       distanceFromCenter = 0.02 / distanceFromCenter;


       // add palette to the rings
       color *= distanceFromCenter;

       vec3 finalColor = vec3(0.0);
       finalColor += color;

       gl_FragColor = vec4(finalColor, 1.0);
      }`
)

extend({ NewShaderMaterial })

export { NewShaderMaterial }
