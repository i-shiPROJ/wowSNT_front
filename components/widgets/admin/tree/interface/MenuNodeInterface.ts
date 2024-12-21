export interface MenuNodeInterface {
  id: string,
  active: boolean,
  name: string,
  icon?: any,
  children: MenuNodeInterface[];
}