import type { MenuNodeInterface } from "./MenuNodeInterface";

export interface MenuInterface {
  id: string;
  type: string;
  settings: {
    id?: string;
    active?: boolean;
    name?: string;
    icon?: string | null;
    arrayNode?: MenuNodeInterface[];
  };
}