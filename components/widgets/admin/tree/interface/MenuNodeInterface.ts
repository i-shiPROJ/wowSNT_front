export interface MenuNodeInterface {
  id: string,
  active: boolean,
  name: string,
  icon?: any,
  tooltip?: string,
  functions?: object,
  children: MenuNodeInterface[];
}