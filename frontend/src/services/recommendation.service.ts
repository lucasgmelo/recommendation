import { Product, RecommendationInput, RecommendationResult } from '../types';

export const getRecommendations = (
  formData: RecommendationInput,
  products: Product[]
): Product[] => {
  const { preferences, features, type } = formData;
  const preferencesSet = new Set(preferences);
  const featuresSet = new Set(features);

  const scoredProducts: RecommendationResult[] = products.map(
    (product, index) => {
      const matchingPreferences = product.preferences.filter((pref) =>
        preferencesSet.has(pref)
      );
      const matchingFeatures = product.features.filter((feat) =>
        featuresSet.has(feat)
      );

      const score = matchingPreferences.length + matchingFeatures.length;

      return {
        product,
        score,
        matchingPreferences,
        matchingFeatures,
        originalIndex: index,
      };
    }
  );

  const validProducts = scoredProducts
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      if (a.score === b.score) {
        return b.originalIndex - a.originalIndex;
      }
      return b.score - a.score;
    });

  if (type === 'single') {
    return validProducts.length > 0 ? [validProducts[0].product] : [products[0]];
  } else {
    return validProducts.map((result) => result.product);
  }
};

const recommendationService = { getRecommendations };
export default recommendationService;
