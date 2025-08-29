import React from 'react';

interface RecommendationTypeProps {
  selectedType?: 'single' | 'multiple';
  onRecommendationTypeChange: (type: 'single' | 'multiple') => void;
}

const RecommendationType: React.FC<RecommendationTypeProps> = ({
  selectedType,
  onRecommendationTypeChange,
}) => {
  return (
    <fieldset>
      <legend className="text-lg font-medium text-gray-900 mb-3">
        Tipo de Recomendação
      </legend>
      <div className="space-y-2" role="radiogroup">
        <div className="flex items-center">
          <input
            id="single-product"
            type="radio"
            name="recommendationType"
            value="single"
            checked={selectedType === 'single'}
            onChange={() => onRecommendationTypeChange('single')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="single-product"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Produto Único
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="multiple-products"
            type="radio"
            name="recommendationType"
            value="multiple"
            checked={selectedType === 'multiple'}
            onChange={() => onRecommendationTypeChange('multiple')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="multiple-products"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Múltiplos Produtos
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default RecommendationType;
