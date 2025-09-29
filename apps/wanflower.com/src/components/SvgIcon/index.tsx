import ArrowLeftIcon from "@/assets/material/arrow-left.svg";
import CartIcon from "@/assets/material/cart.svg";
import MenuIcon from "@/assets/material/menu.svg";
import MessageSquare from "@/assets/material/message-square.svg";
import HeartLine from "@/assets/material/heart-line.svg";
import Share from '@/assets/material/share.svg';

const iconMaps = {
	ArrowLeftIcon,
	CartIcon,
	MenuIcon,
	MessageSquare,
	HeartLine,
  Share
};

export interface SvgIconProps {
	name: keyof typeof iconMaps;
	className?: string;
	size?: number;
	color?: string;
}

export default function SvgIcon(props: SvgIconProps) {
	const { name, size = 16, color = 'transparent', ...reset } = props;
	const Icon = iconMaps[name];
	const width = size;
	const height = size;
	return <Icon width={width} height={height} fill={color} {...reset} />;
}
