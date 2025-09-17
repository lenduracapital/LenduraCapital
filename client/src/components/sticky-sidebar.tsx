import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle, Clock, Tag, ChevronRight } from "lucide-react";
import { useLocation, Link } from "wouter";

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  slug: string;
  image?: string;
}

interface StickySidebarProps {
  relatedPosts?: RelatedPost[];
  currentPostTitle?: string;
  currentPostUrl?: string;
  showShareButtons?: boolean;
  showRelatedPosts?: boolean;
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  maxRelatedPosts?: number;
}

export default function StickySidebar({
  relatedPosts = [],
  currentPostTitle = "Business Funding Resources",
  currentPostUrl,
  showShareButtons = true,
  showRelatedPosts = true,
  showCTA = true,
  ctaTitle = "Need Business Funding?",
  ctaDescription = "Get pre-approved in 24 hours with competitive rates and flexible terms.",
  ctaButtonText = "Apply Now - Free",
  maxRelatedPosts = 3
}: StickySidebarProps) {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Get current URL for sharing
  const currentUrl = currentPostUrl || (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyNow = () => {
    setLocation('/apply-now');
  };

  const handleShare = async (platform: string) => {
    const title = encodeURIComponent(currentPostTitle);
    const url = encodeURIComponent(currentUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(currentUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          return;
        } catch (err) {
          console.error('Failed to copy URL:', err);
          return;
        }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const displayedRelatedPosts = relatedPosts.slice(0, maxRelatedPosts);

  return (
    <div className={`sticky top-24 space-y-6 transition-all duration-300 ${isSticky ? 'opacity-100' : 'opacity-90'}`}>
      
      {/* Social Share Section */}
      {showShareButtons && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
            <Share2 className="w-5 h-5 text-[#193a59] mr-2" />
            Share This Article
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleShare('facebook')}
              variant="outline"
              size="sm"
              className="w-full justify-center text-blue-600 border-blue-200 hover:bg-blue-50"
              data-testid="button-share-facebook"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            <Button
              onClick={() => handleShare('twitter')}
              variant="outline"
              size="sm"
              className="w-full justify-center text-blue-400 border-blue-200 hover:bg-blue-50"
              data-testid="button-share-twitter"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button
              onClick={() => handleShare('linkedin')}
              variant="outline"
              size="sm"
              className="w-full justify-center text-blue-700 border-blue-200 hover:bg-blue-50"
              data-testid="button-share-linkedin"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              onClick={() => handleShare('copy')}
              variant="outline"
              size="sm"
              className="w-full justify-center text-gray-600 border-gray-200 hover:bg-gray-50"
              data-testid="button-share-copy"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {showCTA && (
        <div className="bg-gradient-to-br from-[#193a59] to-[#2a5a7a] rounded-lg p-6 text-white shadow-lg">
          <h3 className="font-bold text-xl mb-3">{ctaTitle}</h3>
          <p className="text-blue-100 mb-4 text-sm leading-relaxed">
            {ctaDescription}
          </p>
          <Button
            onClick={handleApplyNow}
            className="w-full bg-white text-[#193a59] hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg mb-3"
            data-testid="button-sidebar-cta-apply"
          >
            {ctaButtonText}
          </Button>
          <div className="text-center">
            <a 
              href="tel:3058347168"
              className="text-white font-semibold text-sm hover:underline block"
              data-testid="link-sidebar-phone"
            >
              (305) 834-7168
            </a>
            <p className="text-blue-200 text-xs mt-1">Free consultation available</p>
          </div>
        </div>
      )}

      {/* Related Posts Section */}
      {showRelatedPosts && displayedRelatedPosts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Related Articles</h3>
          <div className="space-y-4">
            {displayedRelatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <a className="block group hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200 -m-3">
                  <div className="flex gap-3">
                    {post.image && (
                      <div className="flex-shrink-0">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-[#193a59] transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#193a59] transition-colors duration-200 flex-shrink-0" />
                  </div>
                </a>
              </Link>
            ))}
          </div>
          
          {/* View More Link */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link href="/blog">
              <a className="text-[#193a59] font-semibold text-sm hover:underline flex items-center justify-center group">
                View All Articles
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Contact Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 text-sm mb-3">Need Help Choosing?</h4>
        <p className="text-gray-600 text-xs mb-3 leading-relaxed">
          Our funding experts can help you find the best financing solution for your business needs.
        </p>
        <a 
          href="tel:3058347168"
          className="block text-center bg-[#193a59] text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-[#2a5a7a] transition-colors duration-200"
          data-testid="link-sidebar-contact"
        >
          Call Now: (305) 834-7168
        </a>
      </div>
    </div>
  );
}