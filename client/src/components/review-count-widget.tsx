import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useLocation } from "wouter";

interface ReviewCountWidgetProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export default function ReviewCountWidget({ variant = 'compact', className = '' }: ReviewCountWidgetProps) {
  const [, setLocation] = useLocation();
  const [averageRating] = useState(4.8);
  const [totalReviews] = useState(93);
  const [verifiedCount] = useState(87);

  const handleClick = () => {
    setLocation('/reviews');
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 text-sm hover:opacity-80 transition-opacity ${className}`}
      >
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{averageRating}</span>
        </div>
        <span className="text-gray-600">({totalReviews} reviews)</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow ${className}`}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= averageRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{averageRating}</div>
        <div className="text-sm text-gray-600 mb-1">{totalReviews} verified reviews</div>
        <div className="text-xs text-green-600 font-medium">{verifiedCount} verified clients</div>
      </div>
    </button>
  );
}