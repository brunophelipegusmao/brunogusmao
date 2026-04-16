import { cn } from '@/lib/utils';

interface ParticlesProps {
   className?: string;
   quantity?: number;
}

interface ParticleItem {
   left: number;
   delay: number;
   duration: number;
   size: number;
   opacity: number;
}

function buildParticles(quantity: number): ParticleItem[] {
   return Array.from({ length: quantity }, (_, index) => {
      const seed = index + 1;

      return {
         left: (seed * 17) % 100,
         delay: ((seed * 0.37) % 2.8) * -1,
         duration: 5 + ((seed * 0.43) % 4.2),
         size: 2 + ((seed * 0.51) % 3.4),
         opacity: 0.12 + ((seed * 0.29) % 0.22),
      };
   });
}

export function Particles({ className, quantity = 28 }: ParticlesProps) {
   const particles = buildParticles(quantity);

   return (
      <div
         aria-hidden='true'
         className={cn(
            'pointer-events-none absolute inset-0 overflow-hidden',
            className,
         )}
      >
         {particles.map((particle, index) => (
            <span
               key={`${particle.left}-${index}`}
               className='magic-particle'
               style={{
                  left: `${particle.left}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
               }}
            />
         ))}
      </div>
   );
}
