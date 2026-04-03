"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";

// O clsx deixa o shell e o fallback com a mesma base visual sem repetir strings gigantes no JSX.
const shellViewportClass = clsx(
  "relative hidden w-full justify-center",
  "lg:flex lg:min-h-[32rem]",
);

const shellCanvasClass = clsx("relative aspect-square w-full max-w-[30rem]");
const shellOuterRingClass = clsx(
  "pointer-events-none absolute inset-0 rounded-full border border-border/60",
);
const shellPrimaryRingClass = clsx(
  "pointer-events-none absolute inset-[9%] rounded-full border border-primary/20",
);
const shellDashedRingClass = clsx(
  "pointer-events-none absolute inset-[18%] rounded-full border border-border/50 border-dashed",
);
const shellInnerRingClass = clsx(
  "pointer-events-none absolute inset-[26%] rounded-full border border-primary/10",
);
const shellGlowClass = clsx(
  "pointer-events-none absolute inset-[30%] rounded-full",
  "bg-[radial-gradient(circle_at_center,rgba(56,104,255,0.18),transparent_68%)] blur-3xl",
);
const shellBeamPrimaryClass = clsx(
  "pointer-events-none absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]",
  "bg-gradient-to-r from-transparent via-primary/60 to-transparent",
);
const shellBeamSecondaryClass = clsx(
  "pointer-events-none absolute left-1/2 top-1/2 h-px w-[66%] -translate-x-1/2 -translate-y-1/2 rotate-[22deg]",
  "bg-gradient-to-r from-transparent via-foreground/15 to-transparent",
);
const shellCenterClass = clsx(
  "pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center",
);
const shellPulseClass = clsx(
  "h-4 w-4 rounded-full bg-primary shadow-[0_0_80px_12px_rgba(56,104,255,0.35)]",
);
const shellEyebrowClass = clsx(
  "text-[0.72rem] uppercase tracking-[0.45em] text-foreground/68",
  "dark:text-muted-foreground",
);
const shellTitleClass = clsx(
  "font-heading text-xl leading-[1.05] tracking-[-0.04em] text-foreground",
  "sm:text-2xl",
);
const shellCopyClass = clsx("text-sm text-foreground/72 dark:text-muted-foreground");
const shellContentStackClass = clsx("space-y-2");
const shellOrbitTagClass = clsx(
  "flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-foreground/68",
  "dark:text-muted-foreground",
);
const shellOrbitDotClass = clsx("h-2 w-2 rounded-full bg-primary");
const shellOrbitRioClass = clsx("left-[12%] top-[18%]");
const shellOrbitFuturumaClass = clsx("right-[10%] top-[27%]");
const shellOrbitSeguidoresClass = clsx("left-[4%] bottom-[22%]");
const shellOrbitDadosClass = clsx("right-[12%] bottom-[18%]");
const shellSparkleClass = clsx(
  "pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2 text-primary",
);
const shellSparkleDotClass = clsx("block h-3 w-3 rounded-full border border-primary/60");

// O Motion fica isolado em um chunk so de cliente para o Hero do servidor continuar simples e seguro no build.
const HeroSignal = dynamic(() => import("./hero-signal"), {
  loading: () => (
    <div aria-hidden="true" className={shellViewportClass}>
      {/* Fallback estatico que acompanha a composicao final, para o layout nao colapsar enquanto o chunk do cliente carrega. */}
      <div className={shellCanvasClass}>
        <div className={shellOuterRingClass} />
        <div className={shellPrimaryRingClass} />
        <div className={shellDashedRingClass} />
        <div className={shellInnerRingClass} />
        <div className={shellGlowClass} />
        <div className={shellBeamPrimaryClass} />
        <div className={shellBeamSecondaryClass} />
        <div className={shellCenterClass}>
          <span className={shellPulseClass} />
          <div className={shellContentStackClass}>
            <p className={shellEyebrowClass}>
              Sinal
            </p>
            <p className={shellTitleClass}>Web Desenvolvedor Full Stack</p>
            <p className={shellCopyClass}>
              Leitura, direção e narrativa
            </p>
          </div>
        </div>
        <div className={clsx(shellOrbitTagClass, shellOrbitRioClass)}>
          <span className={shellOrbitDotClass} />
          <span>Rio de Janeiro</span>
        </div>
        <div className={clsx(shellOrbitTagClass, shellOrbitFuturumaClass)}>
          <span className={shellOrbitDotClass} />
          <span>FUTURUMÃ</span>
        </div>
        <div className={clsx(shellOrbitTagClass, shellOrbitSeguidoresClass)}>
          <span className={shellOrbitDotClass} />
          <span>3 mil seguidores</span>
        </div>
        <div className={clsx(shellOrbitTagClass, shellOrbitDadosClass)}>
          <span className={shellOrbitDotClass} />
          <span>Dados 360</span>
        </div>
        <div className={shellSparkleClass}>
          <span className={shellSparkleDotClass} />
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

// Este export entrega a versao carregavel do painel visual sem expor Motion ao servidor.
export default HeroSignal;
