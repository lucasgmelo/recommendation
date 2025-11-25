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
      <div className="space-y-3" role="radiogroup">
        {['single', 'multiple'].map((type) => (
          <div key={type} className="flex items-center group cursor-pointer">
            <div className="relative flex items-center">
              <input
                id={`${type}-product`}
                type="radio"
                name="recommendationType"
                value={type}
                checked={selectedType === type}
                onChange={() => onRecommendationTypeChange(type as 'single' | 'multiple')}
                className="peer appearance-none w-5 h-5 border rounded-full transition-all duration-200 cursor-pointer border-[var(--neutral-border-interactive)] bg-[var(--neutral-surface)] checked:bg-[var(--primary-surface-high-emphasis)] checked:border-[var(--primary-border)] hover:border-[var(--neutral-border-interactive-hover)]"
              />
              <div 
                className="absolute w-2 h-2 rounded-full pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200 bg-black translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2"
              />
            </div>
            <label
              htmlFor={`${type}-product`}
              className="ml-3 text-sm font-medium cursor-pointer transition-colors text-[var(--neutral-text-high-emphasis)]"
            >
              {type === 'single' ? 'Produto Único' : 'Múltiplos Produtos'}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RecommendationType;
