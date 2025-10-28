// Simple helper to provide stock images based on item name or category.
// Uses Unsplash source queries for lightweight, realistic images.
export function getStockImage(item) {
  if (!item) return 'https://source.unsplash.com/600x400/?food';
  const name = (item.name || '').toLowerCase();
  const category = (item.category || '').toLowerCase();

  if (name.includes('pizza') || category.includes('pizza')) {
    return 'https://source.unsplash.com/600x400/?pizza';
  }

  if (name.includes('burger') || category.includes('burger')) {
    return 'https://source.unsplash.com/600x400/?burger';
  }

  if (category.includes('drink') || name.includes('juice') || name.includes('cola') || name.includes('coca')) {
    return 'https://source.unsplash.com/600x400/?drink';
  }

  if (category.includes('dessert') || name.includes('cake') || name.includes('dessert')) {
    return 'https://source.unsplash.com/600x400/?dessert';
  }

  // Generic food fallback
  return 'https://source.unsplash.com/600x400/?food';
}
