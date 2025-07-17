import { 
  Mail, 
  Webhook, 
  Calendar, 
  Code, 
  Edit3,
  Split,
  Globe,
  Database,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Slack,
  Chrome,
  CreditCard,
  Table,
  Sheet,
  Book,
  CheckCircle,
  BarChart3,
  Cloud,
  Video,
  MessageCircle,
  Phone,
  Send,
  Zap,
  type LucideIcon
} from 'lucide-react';

interface ServiceIconProps {
  nodeType: string;
  className?: string;
}

const getIconForNodeType = (nodeType: string): LucideIcon => {
  const type = nodeType.toLowerCase();
  
  // Triggers
  if (type.includes('webhook')) return Webhook;
  if (type.includes('schedule')) return Calendar;
  
  // Communication
  if (type.includes('email') || type.includes('mail')) return Mail;
  if (type.includes('slack')) return Slack;
  if (type.includes('telegram')) return Send;
  if (type.includes('discord')) return MessageCircle;
  if (type.includes('whatsapp')) return Phone;
  if (type.includes('teams')) return Video;
  
  // Social Media
  if (type.includes('facebook')) return Facebook;
  if (type.includes('twitter')) return Twitter;
  if (type.includes('instagram')) return Instagram;
  if (type.includes('linkedin')) return Linkedin;
  
  // Development
  if (type.includes('github')) return Github;
  if (type.includes('code')) return Code;
  
  // Productivity
  if (type.includes('sheets')) return Sheet;
  if (type.includes('airtable')) return Table;
  if (type.includes('notion')) return Book;
  if (type.includes('trello')) return CheckCircle;
  
  // Utilities
  if (type.includes('http')) return Globe;
  if (type.includes('set') || type.includes('edit')) return Edit3;
  if (type.includes('if') || type.includes('switch')) return Split;
  if (type.includes('database')) return Database;
  
  // E-commerce
  if (type.includes('stripe')) return CreditCard;
  
  // Analytics
  if (type.includes('analytics')) return BarChart3;
  
  // Cloud Storage
  if (type.includes('drive') || type.includes('cloud')) return Cloud;
  
  // Default
  return Zap;
};

export function ServiceIcon({ nodeType, className = "w-6 h-6" }: ServiceIconProps) {
  const IconComponent = getIconForNodeType(nodeType);
  return <IconComponent className={className} />;
}

export function ServiceIconWithColor({ 
  serviceName, 
  nodeType, 
  className = "w-8 h-8",
  color = "#6b7280" 
}: { 
  serviceName?: string;
  nodeType: string;
  className?: string;
  color?: string;
}) {
  const IconComponent = getIconForNodeType(nodeType);
  
  return (
    <div 
      className={`rounded-lg flex items-center justify-center font-semibold text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      <IconComponent className="w-4 h-4" />
    </div>
  );
}
