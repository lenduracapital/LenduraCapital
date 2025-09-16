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

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#193a59',
          color: 'white',
          className: 'hover:bg-[#285d8a] border-[#193a59] hover:border-[#285d8a] shadow-lg hover:shadow-xl'
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: '#193a59',
          className: 'border-2 border-[#193a59] hover:bg-[#193a59] hover:text-white shadow-md hover:shadow-lg'
        };
      case 'apply-now':
        return {
          backgroundColor: '#2AD0C5',
          color: 'white',
          className: 'hover:bg-[#22b8aa] border-[#2AD0C5] hover:border-[#22b8aa] shadow-lg hover:shadow-xl font-semibold'
        };
      case 'phone':
        return {
          backgroundColor: '#10b981',
          color: 'white',
          className: 'hover:bg-[#059669] border-[#10b981] hover:border-[#059669] shadow-lg hover:shadow-xl'
        };
      default:
        return {
          backgroundColor: '#193a59',
          color: 'white',
          className: 'hover:bg-[#285d8a] border-[#193a59] hover:border-[#285d8a] shadow-lg hover:shadow-xl'
        };
    }
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm min-h-[36px]';
      case 'lg':
        return 'px-8 py-3 text-lg min-h-[48px]';
      default:
        return 'px-6 py-2.5 text-base min-h-[44px]';
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
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      style={{
        backgroundColor: variantStyles.backgroundColor,
        color: variantStyles.color
      }}
      className={`
        ${variantStyles.className}
        ${sizeClasses}
        ${widthClass}
        font-medium
        rounded-md
        transition-all
        duration-300
        transform
        hover:scale-105
        hover:-translate-y-1
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:translate-y-0
        focus:outline-none
        focus:ring-2
        focus:ring-[#193a59]
        focus:ring-offset-2
        cta-button
        ${className}
      `}
      data-testid={testId || `cta-button-${variant}`}
      aria-label={
        variant === 'apply-now' 
          ? 'Apply for business funding now'
          : variant === 'phone'
          ? 'Call for business funding consultation'
          : undefined
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