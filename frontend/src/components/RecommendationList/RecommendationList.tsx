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
      className="rounded-xl p-5 transition-all duration-200 hover:shadow-lg border border-[var(--neutral-border)] bg-[var(--neutral-surface)] hover:border-[var(--primary-border)] hover:bg-[var(--neutral-surface-low-emphasis)]"
      data-testid="recommendation-item"
    >
      <h3 className="font-semibold text-lg mb-2 text-[var(--neutral-text-high-emphasis)]">
        {recommendation.name}
      </h3>
      {recommendation.category && (
        <span 
          className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 bg-[var(--primary-surface-low-emphasis)] text-[var(--primary-text)]"
        >
          {recommendation.category}
        </span>
      )}

      {recommendation.preferences && recommendation.preferences.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-2 text-[var(--neutral-text-high-emphasis)]">
            Preferências atendidas:
          </h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.preferences.map((pref, idx) => (
              <span
                key={idx}
                className="inline-block text-xs px-2.5 py-1 rounded-md bg-[var(--success-surface-low-emphasis)] text-[var(--success-text)]"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>
      )}

      {recommendation.features && recommendation.features.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2 text-[var(--neutral-text-high-emphasis)]">
            Funcionalidades:
          </h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-block text-xs px-2.5 py-1 rounded-md bg-[var(--highlight-surface-low-emphasis)] text-[var(--highlight-text)]"
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
  <div className="text-center py-12 flex flex-col items-center" data-testid="empty-recommendations">
    <img 
      src="/empty.png" 
      alt="Nenhuma recomendação encontrada" 
      className="w-48 h-auto mb-6 opacity-80"
    />
    <p className="text-lg font-medium text-[var(--neutral-text-low-emphasis)]">Nenhuma recomendação encontrada.</p>
    <p className="text-sm mt-2 max-w-xs mx-auto text-[var(--neutral-text-disabled)]">
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
        className="text-xl font-semibold mb-4 text-[var(--neutral-text-high-emphasis)]"
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
