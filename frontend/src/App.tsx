import { useState, useCallback } from 'react';
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
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Recomendador de Produtos RD Station
        </h1>
      </header>

      <main className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
        <section className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section aria-labelledby="form-section">
            <Form onRecommendationsChange={handleRecommendationsChange} />
          </section>

          <section aria-labelledby="recommendations-section">
            <RecommendationList recommendations={recommendations} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
