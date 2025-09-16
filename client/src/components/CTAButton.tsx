import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useLocation } from "wouter";

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'apply-now' | 'phone';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: 'arrow' | 'phone' | 'none';
  fullWidth?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
  trackingEvent?: string; // For future analytics integration
}

export default function CTAButton({
  variant = 'primary',
  children,
  href,
  onClick,
  size = 'md',
  className = '',
  icon = 'arrow',
  fullWidth = false,
  disabled = false,
  'data-testid': testId,
  trackingEvent
}: CTAButtonProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    // Future analytics tracking
    if (trackingEvent && window.gtag) {
      window.gtag('event', trackingEvent, {
        event_category: 'CTA',
        event_label: variant,
        value: 1
      });
    }

    if (onClick) {
      onClick();
    } else if (href) {
      // Handle different href patterns
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else if (href.startsWith('tel:')) {
        window.location.href = href;
      } else if (href === '/apply' || href === '/app' || href === '/applynow' || href === '/apply-now') {
        // Route to internal application forms
        setLocation(href);
        window.scrollTo(0, 0);
      } else {
        setLocation(href);
        window.scrollTo(0, 0);
      }
    } else {
      // Default action for apply-now variant - route to /apply
      if (variant === 'apply-now') {
        setLocation('/apply');
        window.scrollTo(0, 0);
      }
    }
  };

  // Variant styles - Updated to use brand tokens
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          className: 'bg-brand-primary text-white hover:bg-brand-primary-hover border-brand-primary hover:border-brand-primary-hover shadow-brand hover:shadow-brand-hover'
        };
      case 'secondary':
        return {
          className: 'bg-transparent text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white shadow-md hover:shadow-brand'
        };
      case 'apply-now':
        return {
          className: 'bg-brand-secondary text-white hover:bg-brand-secondary-dark border-brand-secondary hover:border-brand-secondary-dark shadow-brand hover:shadow-brand-hover font-semibold'
        };
      case 'phone':
        return {
          className: 'bg-success text-white hover:bg-success/90 border-success hover:border-success/90 shadow-brand hover:shadow-brand-hover'
        };
      default:
        return {
          className: 'bg-brand-primary text-white hover:bg-brand-primary-hover border-brand-primary hover:border-brand-primary-hover shadow-brand hover:shadow-brand-hover'
        };
    }
  };

  // Mobile-first size classes with enhanced touch targets
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2.5 text-sm min-h-[44px] sm:min-h-[40px]';
      case 'lg':
        return 'px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg min-h-[48px] sm:min-h-[52px]';
      default:
        return 'px-5 sm:px-6 py-2.5 sm:py-3 text-base min-h-[44px] sm:min-h-[44px]';
    }
  };

  // Icon component
  const getIcon = () => {
    if (icon === 'none') return null;
    
    const iconClass = `w-4 h-4 ${children ? 'ml-2' : ''}`;
    
    switch (icon) {
      case 'phone':
        return <Phone className={iconClass} />;
      case 'arrow':
      default:
        return <ArrowRight className={iconClass} />;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeClasses = getSizeClasses();
  const widthClass = fullWidth ? 'w-full' : 'w-full sm:w-auto';

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${variantStyles.className}
        ${sizeClasses}
        ${widthClass}
        font-medium
        rounded-lg
        transition-all
        duration-300
        transform
        hover:scale-105
        hover:-translate-y-1
        active:scale-95
        touch-manipulation
        select-none
        relative
        overflow-hidden
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:translate-y-0
        focus:outline-none
        focus:ring-2
        focus:ring-brand-primary
        focus:ring-offset-2
        ${className}
      `}
      data-testid={testId || `cta-button-${variant}`}
      aria-label={
        variant === 'apply-now' 
          ? 'Apply for business funding now'
          : variant === 'phone'
          ? 'Call for business funding consultation'
          : children ? `${children}` : undefined
      }
    >
      <span className="flex items-center justify-center">
        {children}
        {getIcon()}
      </span>
    </Button>
  );
}

// Convenience export for common CTA buttons
export const ApplyNowButton = (props: Omit<CTAButtonProps, 'variant'>) => (
  <CTAButton variant="apply-now" {...props}>
    {props.children || "Apply Now"}
  </CTAButton>
);

export const CallNowButton = (props: Omit<CTAButtonProps, 'variant' | 'icon' | 'href'>) => (
  <CTAButton 
    variant="phone" 
    icon="phone" 
    href="tel:3058347168"
    {...props}
  >
    {props.children || "Call (305) 834-7168"}
  </CTAButton>
);