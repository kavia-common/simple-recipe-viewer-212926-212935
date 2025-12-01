

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  ingredients: string[];
  steps: string[];
}

// PUBLIC_INTERFACE
export async function fetchRecipes(): Promise<Recipe[]> {
  /** Fetch recipes from VITE_API_BASE if present; otherwise return local mock data. */
  const base = import.meta.env.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/recipes`, { headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const data = (await res.json()) as Recipe[];
      return data;
    } catch (e) {
      console.warn('Falling back to mock data due to API error:', e);
      const { mockRecipes } = await import('../services/mockData');
      return mockRecipes;
    }
  } else {
    const { mockRecipes } = await import('../services/mockData');
    return mockRecipes;
  }
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id: string): Promise<Recipe | undefined> {
  /** Return a single recipe by id, using API if available else mock data. */
  const base = import.meta.env.VITE_API_BASE as string | undefined;
  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/recipes/${encodeURIComponent(id)}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        return (await res.json()) as Recipe;
      }
    } catch {
      // ignore and fall back
    }
  }
  const { mockRecipes } = await import('../services/mockData');
  return mockRecipes.find(r => r.id === id);
}
