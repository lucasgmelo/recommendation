import { useState, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import { Product } from './types';

function App() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleRecommendationsChange = useCallback(
    (newRecommendations: Product | Product[]) => {
      const recommendationsArray = Array.isArray(newRecommendations)
        ? newRecommendations
        : [newRecommendations];

      setRecommendations(recommendationsArray);
    },
    []
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--neutral-surface-low-emphasis)' }}>
        <header className="py-16 px-4 relative overflow-hidden" style={{ 
          backgroundColor: 'var(--neutral-surface)',
          borderBottom: '1px solid var(--neutral-border)',
          borderTop: '6px solid var(--primary-surface-high-emphasis)'
        }}>
          <div className="max-w-7xl mx-auto relative z-10" style={{ 
            paddingLeft: 'var(--grid-margin)', 
            paddingRight: 'var(--grid-margin)' 
          }}>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--neutral-text-high-emphasis)' }}>
                Encontre o produto ideal para o seu negócio
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: 'var(--neutral-text-low-emphasis)' }}>
                De CRM a Marketing, de Conversas a Inteligência Artificial. 
                Descubra como a RD Station pode ajudar você a alcançar seus objetivos.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none" 
               style={{ 
                 background: 'radial-gradient(circle at center, var(--primary-surface-high-emphasis) 0%, transparent 70%)',
                 transform: 'translate(30%, -30%)'
               }} 
          />
        </header>

        <main className="flex-grow w-full max-w-7xl mx-auto py-12" style={{ 
          paddingLeft: 'var(--grid-margin)', 
          paddingRight: 'var(--grid-margin)' 
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ gap: 'var(--grid-gutter)' }}>
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-8 rounded-2xl p-6 shadow-sm" style={{ 
                backgroundColor: 'var(--neutral-surface)',
                border: '1px solid var(--neutral-border)'
              }}>
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
