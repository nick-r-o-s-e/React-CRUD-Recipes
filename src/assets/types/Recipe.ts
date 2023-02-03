interface Recipe {
  id: number | string;
  image: string;
  title: string;
  ingredients: string[][];
  prepTime: string;
  coocTime: string;
  servings: string;
  directions: string[];
}

export default Recipe;
