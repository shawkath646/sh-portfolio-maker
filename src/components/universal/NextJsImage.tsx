import Image from "next/image";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import type { RenderPhotoProps } from "react-photo-album";


export default function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={{ ...wrapperStyle, padding: "15px", backgroundColor: "#fff", margin: 10 }}>
      <Image
        src={photo}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
}