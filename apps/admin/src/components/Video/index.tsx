import { useModal } from "@/hooks/useModal";
import clsx from "clsx";

interface VideoProps {
  src?: string
  className?: string
}

export const Video = ({
  src,
  className
}: VideoProps) => {
  const showModal = useModal()
  const onClick = () => {
    showModal({
      footer: null,
      modalRender: () => {
        return <video src={src} className="object-cover rounded" controls autoPlay />
      },
      maskClosable: true
    })
  };
  return <video src={src} className={clsx('cursor-pointer', className)} onClick={onClick} />
}