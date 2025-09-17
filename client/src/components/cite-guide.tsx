import { useState } from "react";
import { Copy, Check, Quote, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CiteGuideProps {
  title: string;
  author: string;
  publishDate: string;
  url: string;
  className?: string;
}

export default function CiteGuide({ title, author, publishDate, url, className = "" }: CiteGuideProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const { toast } = useToast();

  const fullUrl = `${window.location.origin}${url}`;
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const accessDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Different citation formats
  const citations = {
    apa: `${author}. (${new Date(publishDate).getFullYear()}). ${title}. Lendura Capital. Retrieved ${accessDate}, from ${fullUrl}`,
    mla: `${author}. "${title}." Lendura Capital, ${formattedDate}, ${fullUrl}. Accessed ${accessDate}.`,
    chicago: `${author}. "${title}." Lendura Capital. Last modified ${formattedDate}. ${fullUrl}.`,
    harvard: `${author} (${new Date(publishDate).getFullYear()}) '${title}', Lendura Capital, ${formattedDate}. Available at: ${fullUrl} (Accessed: ${accessDate}).`,
    simple: `${title} by ${author} - Lendura Capital (${formattedDate}) - ${fullUrl}`
  };

  const handleCopy = async (format: keyof typeof citations) => {
    try {
      await navigator.clipboard.writeText(citations[format]);
      setCopiedFormat(format);
      toast({
        title: "Citation copied!",
        description: `${format.toUpperCase()} citation has been copied to your clipboard.`,
      });
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy citation. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Quote className="w-5 h-5 text-[#193a59]" />
        <h3 className="text-lg font-semibold text-gray-900">Cite This Guide</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Reference this guide in your research, reports, or articles using one of these citation formats:
      </p>

      <div className="space-y-4">
        {Object.entries(citations).map(([format, citation]) => (
          <div key={format} className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#193a59] uppercase tracking-wide">
                {format === 'simple' ? 'Simple Format' : format}
              </span>
              <Button
                onClick={() => handleCopy(format as keyof typeof citations)}
                variant="outline"
                size="sm"
                className="text-xs hover:bg-[#193a59] hover:text-white"
                data-testid={`button-copy-citation-${format}`}
              >
                {copiedFormat === format ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-mono bg-gray-50 p-3 rounded border-l-4 border-[#193a59]">
              {citation}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-blue-200">
        <div className="flex items-start gap-3">
          <FileText className="w-4 h-4 text-[#193a59] mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Citation Guidelines:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Always include the access date when citing online sources</li>
              <li>Check with your institution for specific citation requirements</li>
              <li>This content is regularly updated - verify publication dates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}