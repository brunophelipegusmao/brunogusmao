import clsx from "clsx";

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className = "" }: SpinLoaderProps) {
  // Compõe as classes base com as classes recebidas de fora.
  const classes = clsx("flex", "items-center", "justify-center", className);

  return (
    // Renderiza o contêiner centralizado e o elemento visual da animação.
    <div className={classes} role="status" aria-label="Carregando">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="h-10 w-10 text-primary"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeOpacity="0.75"
          strokeWidth="15"
          style={{ transformOrigin: "center" }}
          d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="2"
            values="0;120"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
