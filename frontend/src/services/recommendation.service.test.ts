import { getRecommendations } from './recommendation.service';
import mockProducts from '../mocks/mockProducts';
import { RecommendationInput } from '../types';

describe('recommendationService', () => {
  test('Retorna recomendação correta para single com base nas preferências selecionadas', () => {
    const formData: RecommendationInput = {
      preferences: ['Integração com chatbots'],
      features: ['Chat ao vivo e mensagens automatizadas'],
      type: 'single',
    };

    const recommendation = getRecommendations(formData, mockProducts);

    expect(Array.isArray(recommendation)).toBe(true);
    expect(recommendation).toHaveLength(1);
    expect(recommendation[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para multiple com base nas preferências selecionadas', () => {
    const formData: RecommendationInput = {
      preferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      features: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      type: 'multiple',
    };

    const recommendations = getRecommendations(formData, mockProducts);

    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para single com mais de um produto de match', () => {
    const formData: RecommendationInput = {
      preferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      features: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      type: 'single',
    };

    const recommendation = getRecommendations(formData, mockProducts);

    expect(Array.isArray(recommendation)).toBe(true);
    expect(recommendation).toHaveLength(1);
    expect(recommendation[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para single', () => {
    const formData: RecommendationInput = {
      preferences: ['Automação de marketing', 'Integração com chatbots'],
      features: [],
      type: 'single',
    };

    const recommendation = getRecommendations(formData, mockProducts);

    expect(Array.isArray(recommendation)).toBe(true);
    expect(recommendation).toHaveLength(1);
    expect(recommendation[0].name).toBe('RD Conversas');
  });

  test('Retorna o produto com maior score quando há diferença de pontuação', () => {
    const formData: RecommendationInput = {
      preferences: ['Integração fácil com ferramentas de e-mail'],
      features: ['Gestão de leads e oportunidades'],
      type: 'single',
    };

    const recommendation = getRecommendations(formData, mockProducts);

    expect(Array.isArray(recommendation)).toBe(true);
    expect(recommendation).toHaveLength(1);
    expect(recommendation[0].name).toBe('RD Station CRM');
  });
});
