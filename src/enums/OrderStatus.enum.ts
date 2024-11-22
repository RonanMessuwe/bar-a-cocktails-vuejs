/**
 * Status of an `Order`.
 */
export enum OrderStatus {
  Pending = 'pending',
  SelectingIngredients = 'selecting_ingredients',
  Shaking = 'shaking',
  AddingIceCubes = 'adding_ice_cubes',
  Ready = 'ready',
}
