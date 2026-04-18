import type { ImgHTMLAttributes } from 'react';

interface UnoptimizedImageProps extends Omit<
   ImgHTMLAttributes<HTMLImageElement>,
   'alt'
> {
   alt: string;
}

export function UnoptimizedImage(props: UnoptimizedImageProps) {
   const { alt, ...rest } = props;

   // biome-ignore lint/performance/noImgElement: Dynamic and CMS-driven image sources cannot be safely constrained to Next Image optimization.
   return <img alt={alt} {...rest} />;
}
