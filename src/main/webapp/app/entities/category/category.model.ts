export interface ICategory {
  id: number;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  parent?: Pick<ICategory, 'id' | 'name'> | null;
}

export type NewCategory = Omit<ICategory, 'id'> & { id: null };
