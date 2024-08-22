import { Breadcrumb as BreadcrumbAntd, BreadcrumbProps } from "antd";
import { usePathname } from "next/navigation";
import SeparatorIcon from "./icons/SeparatorIcon";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

const { Item } = BreadcrumbAntd;

interface Props extends BreadcrumbProps {
  items: ItemType[];
}

const Breadcrumb: React.FC<Props> = (props) => {
  const path = usePathname();

  return (
    <BreadcrumbAntd separator={<SeparatorIcon />} {...props}>
      {props.items?.map((item) => (
        <Item key={item.key} href={item.href}>
          {item.title}
        </Item>
      ))}
    </BreadcrumbAntd>
  );
};
export default Breadcrumb;
