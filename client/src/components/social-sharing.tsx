import { useState } from "react";
import { Share2, Linkedin, Facebook, Twitter, MessageCircle, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialSharingProps {
  title: string;
  description: string;
  url: string;
  className?: string;
  compact?: boolean;
}

export default function SocialSharing({ title, description, url, className = "", compact = false }: SocialSharingProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const fullUrl = `${window.location.origin}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    quora: `https://www.quora.com/q/add?url=${encodedUrl}&title=${encodedTitle}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please copy manually from the address bar.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    window.open(link, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-gray-500 hidden sm:inline">Share:</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('linkedin')}
            className="w-8 h-8 p-0 text-gray-500 hover:text-[#0077b5] hover:bg-blue-50"
            aria-label="Share on LinkedIn"
            data-testid="button-share-linkedin"
          >
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('twitter')}
            className="w-8 h-8 p-0 text-gray-500 hover:text-[#1da1f2] hover:bg-blue-50"
            aria-label="Share on X (Twitter)"
            data-testid="button-share-twitter"
          >
            <Twitter className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('facebook')}
            className="w-8 h-8 p-0 text-gray-500 hover:text-[#4267b2] hover:bg-blue-50"
            aria-label="Share on Facebook"
            data-testid="button-share-facebook"
          >
            <Facebook className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="w-8 h-8 p-0 text-gray-500 hover:text-[#193a59] hover:bg-gray-50"
            aria-label="Copy link"
            data-testid="button-copy-link"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-[#193a59]" />
        <h3 className="text-lg font-semibold text-gray-900">Share This Article</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Button
          onClick={() => handleShare('linkedin')}
          variant="outline"
          className="flex items-center gap-2 justify-center hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-colors"
          data-testid="button-share-linkedin"
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>
        
        <Button
          onClick={() => handleShare('facebook')}
          variant="outline"
          className="flex items-center gap-2 justify-center hover:bg-[#4267b2] hover:text-white hover:border-[#4267b2] transition-colors"
          data-testid="button-share-facebook"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>
        
        <Button
          onClick={() => handleShare('twitter')}
          variant="outline"
          className="flex items-center gap-2 justify-center hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] transition-colors"
          data-testid="button-share-twitter"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">X (Twitter)</span>
        </Button>
        
        <Button
          onClick={() => handleShare('reddit')}
          variant="outline"
          className="flex items-center gap-2 justify-center hover:bg-[#ff4500] hover:text-white hover:border-[#ff4500] transition-colors"
          data-testid="button-share-reddit"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Reddit</span>
        </Button>
        
        <Button
          onClick={() => handleShare('quora')}
          variant="outline"
          className="flex items-center gap-2 justify-center hover:bg-[#b92b27] hover:text-white hover:border-[#b92b27] transition-colors"
          data-testid="button-share-quora"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Quora</span>
        </Button>
        
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="flex items-center gap-2 justify-center hover:bg-[#193a59] hover:text-white hover:border-[#193a59] transition-colors"
          data-testid="button-copy-link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
        </Button>
      </div>
    </div>
  );
}