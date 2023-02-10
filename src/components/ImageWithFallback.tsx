import Image from "next/image"
import { useEffect, useState } from "react"

type ImageWithFallbackProps = {
  src: string
  alt: string
  width: number
  height: number
  fallbackSrc: string
}

export const ImageWithFallback = ({
  src,
  alt,
  width,
  height,
  fallbackSrc,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src ? src : fallbackSrc)
  }, [fallbackSrc, src])

  return (
    <Image
      alt={alt}
      src={imgSrc}
      width={width}
      height={height}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}

export default ImageWithFallback
