"use client";

import clsx from "clsx";
import type { ElementType } from "react";
import { useEffect, useState } from "react";

import {
  BuildingsIcon,
  CertificateIcon,
  MapPinLineIcon,
  SparkleIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import * as motion from "motion/react-client";

type OrbitLabelProps = {
  className: string;
  delay: number;
  icon: ElementType;
  label: string;
  reduceMotion: boolean;
};

// O clsx organiza os blocos do radar sem espalhar strings longas pelo JSX.
const signalViewportClass = clsx(
  "relative hidden w-full justify-center",
  "lg:flex lg:min-h-[32rem]",
);

const signalCanvasClass = clsx("relative aspect-square w-full max-w-[30rem]");
const signalOuterRingClass = clsx(
  "pointer-events-none absolute inset-0 rounded-full border border-border/60",
);
const signalPrimaryRingClass = clsx(
  "pointer-events-none absolute inset-[9%] rounded-full border border-primary/20",
);
const signalDashedRingClass = clsx(
  "pointer-events-none absolute inset-[18%] rounded-full border border-border/50 border-dashed",
);
const signalInnerRingClass = clsx(
  "pointer-events-none absolute inset-[26%] rounded-full border border-primary/10",
);
const signalGlowClass = clsx(
  "pointer-events-none absolute inset-[30%] rounded-full",
  "bg-[radial-gradient(circle_at_center,rgba(56,104,255,0.2),transparent_68%)] blur-3xl",
);
const signalBeamPrimaryClass = clsx(
  "pointer-events-none absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent",
);
const signalBeamSecondaryClass = clsx(
  "pointer-events-none absolute left-1/2 top-1/2 h-px w-[66%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-foreground/15 to-transparent",
);
const signalCenterClass = clsx(
  "pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center",
);
const signalPulseClass = clsx(
  "h-4 w-4 rounded-full bg-primary shadow-[0_0_80px_12px_rgba(56,104,255,0.35)]",
);
const signalEyebrowClass = clsx(
  "text-[0.72rem] uppercase tracking-[0.45em] text-foreground/68",
  "dark:text-muted-foreground",
);
const signalTitleClass = clsx(
  "font-heading text-xl leading-[1.05] tracking-[-0.04em] text-foreground",
  "sm:text-2xl",
);
const signalCopyClass = clsx("text-sm text-foreground/72 dark:text-muted-foreground");
const signalContentStackClass = clsx("space-y-2");
const orbitLabelBaseClass = clsx(
  "absolute flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-foreground/68",
  "dark:text-muted-foreground",
);
const orbitIconClass = clsx("h-3.5 w-3.5 shrink-0 text-primary");
const signalSparkleClass = clsx(
  "pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2 text-primary",
);
const signalSparkleIconClass = clsx("h-5 w-5");
const orbitRioClass = clsx("left-[12%] top-[18%]");
const orbitFuturumaClass = clsx("right-[10%] top-[27%]");
const orbitSeguidoresClass = clsx("left-[4%] bottom-[22%]");
const orbitDadosClass = clsx("right-[12%] bottom-[18%]");

// Cada label orbital flutua de forma independente para o campo parecer vivo sem aumentar o trabalho de layout.
function OrbitLabel({
  className,
  delay,
  icon: Icon,
  label,
  reduceMotion,
}: OrbitLabelProps) {
  return (
    <motion.div
      className={clsx(orbitLabelBaseClass, className)}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: [0.82, 1, 0.82], y: [0, -8, 0] }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 6, delay, ease: "easeInOut", repeat: Infinity }
      }
    >
      <Icon className={orbitIconClass} weight="bold" />
      <span>{label}</span>
    </motion.div>
  );
}

export default function HeroSignal() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Respeita a preferencia de movimento reduzido do sistema, em vez de forcar animacao para todo mundo.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <div aria-hidden="true" className={signalViewportClass}>
      {/* A composicao usa transform e opacity para parecer rica sem custar caro ao browser. */}
      {/* Os aneis, feixes e o pulso central formam um sinal em estilo radar, mas so transform e opacity animam. */}
      <div className={signalCanvasClass}>
        <div className={signalOuterRingClass} />
        <motion.div
          className={signalPrimaryRingClass}
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 28, ease: "linear", repeat: Infinity }
          }
        />
        <motion.div
          className={signalDashedRingClass}
          animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 36, ease: "linear", repeat: Infinity }
          }
        />
        <motion.div
          className={signalInnerRingClass}
          animate={
            reduceMotion
              ? { opacity: 0.45 }
              : { opacity: [0.34, 0.6, 0.34] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8, ease: "easeInOut", repeat: Infinity }
          }
        />
        <motion.div
          className={signalGlowClass}
          animate={
            reduceMotion
              ? { opacity: 0.45 }
              : { opacity: [0.28, 0.56, 0.28] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8, ease: "easeInOut", repeat: Infinity }
          }
        />
        <motion.div
          className={signalBeamPrimaryClass}
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 26, ease: "linear", repeat: Infinity }
          }
        />
        <motion.div
          className={signalBeamSecondaryClass}
          animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 32, ease: "linear", repeat: Infinity }
          }
        />
        <motion.div
          className={signalCenterClass}
          animate={
            reduceMotion ? { y: 0, scale: 1 } : { y: [0, -12, 0], scale: [1, 1.02, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 7, ease: "easeInOut", repeat: Infinity }
          }
        >
          <span className={signalPulseClass} />
          <div className={signalContentStackClass}>
            <p className={signalEyebrowClass}>
              Sinal
            </p>
            <p className={signalTitleClass}>Web Desenvolvedor Full Stack</p>
            <p className={signalCopyClass}>
              Leitura, direção e narrativa
            </p>
          </div>
        </motion.div>

        {/* Os labels orbitais reutilizam icones para manter um tom profissional e guiado por dados. */}
        <OrbitLabel
          className={orbitRioClass}
          delay={0}
          icon={MapPinLineIcon}
          label="Rio de Janeiro"
          reduceMotion={reduceMotion}
        />
        <OrbitLabel
          className={orbitFuturumaClass}
          delay={0.8}
          icon={BuildingsIcon}
          label="FUTURUMÃ"
          reduceMotion={reduceMotion}
        />
        <OrbitLabel
          className={orbitSeguidoresClass}
          delay={1.6}
          icon={TrendUpIcon}
          label="3 mil seguidores"
          reduceMotion={reduceMotion}
        />
        <OrbitLabel
          className={orbitDadosClass}
          delay={2.2}
          icon={CertificateIcon}
          label="Dados 360"
          reduceMotion={reduceMotion}
        />
        <motion.div
          className={signalSparkleClass}
          animate={
            reduceMotion
              ? { rotate: 0, scale: 1 }
              : { rotate: [0, 18, 0], scale: [1, 1.1, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 6, ease: "easeInOut", repeat: Infinity }
          }
        >
          <SparkleIcon className={signalSparkleIconClass} weight="bold" />
        </motion.div>
      </div>
    </div>
  );
}
