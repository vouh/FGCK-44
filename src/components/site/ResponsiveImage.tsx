import Image, { type ImageProps } from "next/image";

type Fit = "cover" | "contain" | "containOnMobile";

type Props = ImageProps & {
  className?: string;
  fit?: Fit;
};

export function ResponsiveImage({ className, fit = "cover", ...props }: Props) {
  const fitClass =
    fit === "contain"
      ? "object-contain"
      : fit === "containOnMobile"
        ? "object-contain sm:object-cover"
        : "object-cover";

  return (
    <Image
      {...props}
      className={[fitClass, className].filter(Boolean).join(" ")}
      sizes={props.sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
    />
  );
}
