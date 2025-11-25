import { useState, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import { Product } from './types';

function App() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleRecommendationsChange = useCallback(
    (newRecommendations: Product[]) => {
      setRecommendations(newRecommendations);
    },
    []
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[var(--neutral-surface-low-emphasis)]">
        <header className="py-16 px-4 relative overflow-hidden bg-[var(--neutral-surface)] border-b border-[var(--neutral-border)] border-t-[6px] border-t-[var(--primary-surface-high-emphasis)]">
          <div className="max-w-7xl mx-auto relative z-10 px-[var(--grid-margin)]">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--neutral-text-high-emphasis)]">
                Encontre o produto ideal para o seu negócio
              </h1>
              <p className="text-xl leading-relaxed text-[var(--neutral-text-low-emphasis)]">
                De CRM a Marketing, de Conversas a Inteligência Artificial. 
                Descubra como a RD Station pode ajudar você a alcançar seus objetivos.
              </p>
            </div>
          </div>
          <div 
            className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none translate-x-[30%] -translate-y-[30%]"
            style={{ 
              background: 'radial-gradient(circle at center, var(--primary-surface-high-emphasis) 0%, transparent 70%)',
            }} 
          />
        </header>

        <main className="flex-grow w-full max-w-7xl mx-auto py-12 px-[var(--grid-margin)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--grid-gutter)]">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-8 rounded-2xl p-6 shadow-sm bg-[var(--neutral-surface)] border border-[var(--neutral-border)]">
                <section aria-labelledby="form-section">
                  <Form onRecommendationsChange={handleRecommendationsChange} />
                </section>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              <section aria-labelledby="recommendations-section">
                <RecommendationList recommendations={recommendations} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
