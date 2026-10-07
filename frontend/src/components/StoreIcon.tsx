import type { SVGProps } from "react";
import type { IconName } from "../config/store";
import {
  CalendarIcon,
  ExchangeIcon,
  FlagIcon,
  RulerIcon,
  RupeeIcon,
  ShieldIcon,
  SofaIcon,
  StarIcon,
  StoreIcon as ShopIcon,
  ToolsIcon,
  TruckIcon,
  UsersIcon,
} from "./Icons";

const icons: Record<IconName, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  calendar: CalendarIcon,
  users: UsersIcon,
  flag: FlagIcon,
  shield: ShieldIcon,
  tools: ToolsIcon,
  truck: TruckIcon,
  star: (p) => <StarIcon filled={false} {...p} />,
  rupee: RupeeIcon,
  ruler: RulerIcon,
  sofa: SofaIcon,
  exchange: ExchangeIcon,
  store: ShopIcon,
};

/** Renders an icon chosen by name in the store settings. */
export default function StoreIcon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Icon = icons[name] ?? ShieldIcon;
  return <Icon {...props} />;
}
