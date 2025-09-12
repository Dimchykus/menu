export interface ActionState<T> {
  values: T;
  errors: Record<string, string[]>;
}
