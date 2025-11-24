import { memo } from 'react';
import { Product } from '../../types';

interface RecommendationListProps {
  recommendations: Product[];
}

interface RecommendationItemProps {
  recommendation: Product;
}

const RecommendationItem = memo<RecommendationItemProps>(
  ({ recommendation }) => (
    <article
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      data-testid="recommendation-item"
    >
      <h3 className="font-semibold text-lg text-gray-900 mb-2">
        {recommendation.name}
      </h3>
      {recommendation.category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
          {recommendation.category}
        </span>
      )}

      {recommendation.preferences && recommendation.preferences.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            Preferências atendidas:
          </h4>
          <div className="flex flex-wrap gap-1">
            {recommendation.preferences.map((pref, idx) => (
              <span
                key={idx}
                className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
      )}

      {recommendation.features && recommendation.features.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">
            Funcionalidades:
          </h4>
          <div className="flex flex-wrap gap-1">
            {recommendation.features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
);

RecommendationItem.displayName = 'RecommendationItem';

const EmptyState = () => (
  <div className="text-center py-8" data-testid="empty-recommendations">
    <p className="text-gray-600 text-lg">Nenhuma recomendação encontrada.</p>
    <p className="text-gray-500 text-sm mt-2">
      Configure suas preferências no formulário para receber sugestões
      personalizadas.
    </p>
  </div>
);

const RecommendationList = ({ recommendations }: RecommendationListProps) => {
  return (
    <section aria-labelledby="recommendations-heading">
      <h2
        id="recommendations-heading"
        className="text-xl font-semibold text-gray-900 mb-4"
      >
        Recomendações de Produtos
      </h2>

      {recommendations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <RecommendationItem
              key={recommendation.id || index}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </section>
  );
};

RecommendationList.displayName = 'RecommendationList';

export default RecommendationList;
