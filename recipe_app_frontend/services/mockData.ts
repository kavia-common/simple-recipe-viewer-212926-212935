import type { Recipe } from './recipes';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Chicken',
    description: 'Juicy chicken marinated with lemon and fresh herbs.',
    image: 'https://images.unsplash.com/photo-1604908554021-6e6e8f02c0eb?q=80&w=1200&auto=format&fit=crop',
    time: '35 min',
    ingredients: [
      '2 chicken breasts',
      '1 lemon (zest and juice)',
      '2 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tsp dried oregano',
      'Fresh parsley',
      'Salt & pepper',
    ],
    steps: [
      'Whisk lemon juice, zest, olive oil, garlic, oregano, salt and pepper.',
      'Marinate chicken for 15 minutes.',
      'Pan-sear 6–7 minutes per side until cooked through.',
      'Rest, slice, and garnish with chopped parsley.',
    ],
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    description: 'Silky pasta tossed in a rich mushroom cream sauce.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
    time: '25 min',
    ingredients: [
      '200g pasta',
      '250g mushrooms, sliced',
      '1 cup cream',
      '1 small onion, diced',
      '2 cloves garlic, minced',
      '2 tbsp butter',
      'Parmesan, salt, pepper',
    ],
    steps: [
      'Cook pasta until al dente.',
      'Sauté onion in butter, add mushrooms and cook until browned.',
      'Add garlic, cream; simmer until slightly thickened.',
      'Toss with pasta, season, and top with parmesan.',
    ],
  },
  {
    id: '3',
    title: 'Avocado Toast Deluxe',
    description: 'Crispy sourdough topped with creamy avocado and extras.',
    image: 'https://images.unsplash.com/photo-1553633205-0e02589e5d9f?q=80&w=1200&auto=format&fit=crop',
    time: '10 min',
    ingredients: [
      '2 slices sourdough',
      '1 ripe avocado',
      'Cherry tomatoes',
      'Red pepper flakes',
      'Olive oil, lemon, salt, pepper',
    ],
    steps: [
      'Toast sourdough to preference.',
      'Mash avocado with lemon, salt and pepper.',
      'Spread on toast, top with halved tomatoes, drizzle oil, sprinkle pepper flakes.',
    ],
  },
];
