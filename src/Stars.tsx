import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function Stars() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0A0A1F",
        },
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: { enable: true },
        },
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: "#E6E6FA",
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 1, max: 3, offset: 0 },
          random: {
            enable: true,
            minimumValue: 1,
          },
          animation: {
            enable: false,
          },
        },
        move: {
          enable: true,
          speed: { min: 2, max: 5, offset: 0 },
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: OutMode.out,
          },
          angle: {
            value: { min: 0, max: 360 },
            offset: 0,
          },

          decay: 0,
          gravity: {
            enable: false,
            acceleration: 0,
          },
        },
        opacity: {
          value: { min: 0.5, max: 0.8, offset: 0 },
          random: {
            enable: true,
            minimumValue: 0.5,
          },
          animation: {
            enable: false,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 z-0"
      />
    );
  }

  return <></>;
}
