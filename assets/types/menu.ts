export interface MenuItem {
  url: string;
  title: string;
  active?: boolean;
}

export interface MenuProps {
  menu?: Record<string, MenuItem>;
}

export interface MenuItemProps {
  url: string;
  title: string;
  active?: boolean;
}

export type MenuToggleEvent = CustomEvent<{ isOpen: boolean }>;
export type MenuItemSelectEvent = CustomEvent<{ url: string; title: string }>;
