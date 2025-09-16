import { CheckCircle, Star, ArrowRight } from "lucide-react";

interface BenefitListProps {
  benefits: string[];
  title?: string;
  variant?: 'bullets' | 'checkmarks' | 'numbers' | 'stars' | 'arrows';
  columns?: 1 | 2 | 3;
  className?: string;
  itemClassName?: string;
  iconColor?: 'green' | 'blue' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  'data-testid'?: string;
}

export default function BenefitList({
  benefits,
  title,
  variant = 'checkmarks',
  columns = 1,
  className = '',
  itemClassName = '',
  iconColor = 'green',
  size = 'md',
  'data-testid': testId = 'benefit-list'
}: BenefitListProps) {
  
  if (benefits.length === 0) {
    return null;
  }

  const getIconColorClass = () => {
    switch (iconColor) {
      case 'blue':
        return 'text-blue-500';
      case 'primary':
        return 'text-[#193a59]';
      case 'green':
      default:
        return 'text-green-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          text: 'text-sm',
          icon: 'w-4 h-4',
          spacing: 'space-y-2',
          gap: 'gap-2'
        };
      case 'lg':
        return {
          text: 'text-lg',
          icon: 'w-6 h-6',
          spacing: 'space-y-4',
          gap: 'gap-4'
        };
      case 'md':
      default:
        return {
          text: 'text-base',
          icon: 'w-5 h-5',
          spacing: 'space-y-3',
          gap: 'gap-3'
        };
    }
  };

  const getColumnClasses = () => {
    switch (columns) {
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-x-6';
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6';
      case 1:
      default:
        return 'space-y-0';
    }
  };

  const renderIcon = (index: number) => {
    const iconColorClass = getIconColorClass();
    const sizeClasses = getSizeClasses();
    
    switch (variant) {
      case 'checkmarks':
        return (
          <CheckCircle 
            className={`${sizeClasses.icon} ${iconColorClass} flex-shrink-0`}
            aria-hidden="true"
          />
        );
      case 'stars':
        return (
          <Star 
            className={`${sizeClasses.icon} ${iconColorClass} flex-shrink-0 fill-current`}
            aria-hidden="true"
          />
        );
      case 'arrows':
        return (
          <ArrowRight 
            className={`${sizeClasses.icon} ${iconColorClass} flex-shrink-0`}
            aria-hidden="true"
          />
        );
      case 'numbers':
        return (
          <div 
            className={`${sizeClasses.icon} ${iconColorClass} border-2 border-current rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0`}
            aria-hidden="true"
          >
            {index + 1}
          </div>
        );
      case 'bullets':
      default:
        return (
          <div 
            className={`w-2 h-2 ${iconColorClass.replace('text-', 'bg-')} rounded-full flex-shrink-0 mt-2`}
            aria-hidden="true"
          />
        );
    }
  };

  const sizeClasses = getSizeClasses();
  const columnClasses = getColumnClasses();

  return (
    <div 
      className={`${className}`}
      data-testid={testId}
    >
      {title && (
        <h3 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8"
          data-testid="benefit-list-title"
        >
          {title}
        </h3>
      )}
      
      <div className={columnClasses}>
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`flex items-start ${sizeClasses.gap} ${columns > 1 ? 'mb-3' : ''} ${itemClassName}`}
            data-testid={`benefit-item-${index}`}
          >
            {renderIcon(index)}
            <span 
              className={`${sizeClasses.text} text-gray-700 leading-relaxed flex-1`}
              data-testid={`benefit-text-${index}`}
            >
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Specialized benefit list components for common use cases
export const FeatureList = (props: Omit<BenefitListProps, 'variant'>) => (
  <BenefitList variant="checkmarks" iconColor="green" {...props} />
);

export const ProcessSteps = (props: Omit<BenefitListProps, 'variant'>) => (
  <BenefitList variant="numbers" iconColor="primary" {...props} />
);

export const KeyPoints = (props: Omit<BenefitListProps, 'variant'>) => (
  <BenefitList variant="arrows" iconColor="blue" {...props} />
);

// Common benefit lists for business funding (can be imported and reused)
export const commonBusinessFundingBenefits = [
  "Fast approval in 24-48 hours",
  "No collateral required for most programs",
  "Credit scores as low as 500 accepted",
  "Funding amounts from $10K to $750K",
  "Multiple repayment options available",
  "Use funds for any business purpose",
  "No restrictions on industry type",
  "Dedicated funding specialist assigned"
];

export const quickApprovalProcess = [
  "Complete our simple 3-minute application",
  "Receive pre-approval decision within hours",
  "Submit required documents digitally",
  "Get final approval and funding terms",
  "Receive funds in your account next business day"
];

export const competitiveAdvantages = [
  "Higher approval rates than traditional banks",
  "Faster funding than conventional loans",
  "Flexible repayment terms",
  "No hidden fees or prepayment penalties",
  "Experienced team with 15+ years in business funding",
  "A+ BBB rating and excellent customer reviews"
];