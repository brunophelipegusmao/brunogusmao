import type { ImgHTMLAttributes } from 'react';

interface UnoptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function UnoptimizedImage(props: UnoptimizedImageProps) {
   // biome-ignore lint/performance/noImgElement: Dynamic and CMS-driven image sources cannot be safely constrained to Next Image optimization.
   return <img {...props} />;
}
