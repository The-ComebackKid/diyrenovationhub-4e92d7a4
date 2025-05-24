
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

const SocialShare = ({ 
  url = window.location.href,
  title = "DIY Renovation Hub - Transform Your Home",
  description = "Get expert DIY guidance, project ideas, and renovation tips"
}: SocialShareProps) => {
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + ' ' + url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const openShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => openShare('facebook')}
        className="p-2"
      >
        <Facebook size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => openShare('twitter')}
        className="p-2"
      >
        <Twitter size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => openShare('linkedin')}
        className="p-2"
      >
        <Linkedin size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => openShare('email')}
        className="p-2"
      >
        <Mail size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="p-2"
      >
        <Link2 size={16} />
      </Button>
    </div>
  );
};

export default SocialShare;
