import { formatDistanceToNow } from "date-fns";
import { Badge } from "./Badge";
import { User, MapPin } from "lucide-react";

interface EventCardProps {
  title: string;
  timeAgo: string;
  owner: string;
  address: string;
  isHot?: boolean;
  phonesVerified?: number;
  phonesTotal?: number;
  isClerkVerified?: boolean;
  onClick?: () => void;
}

export function EventCard({
  title,
  timeAgo,
  owner,
  address,
  isHot,
  phonesVerified,
  phonesTotal,
  isClerkVerified,
  onClick,
}: EventCardProps) {
  const formattedTime = formatDistanceToNow(new Date(timeAgo), { addSuffix: true });

  return (
    <button
      onClick={onClick}
      className="glass-card w-full p-4 text-left transition-all duration-200 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-heading font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground whitespace-nowrap">{formattedTime}</span>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span>{owner}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{address}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {isClerkVerified && <Badge variant="clerk">Clerk Verified</Badge>}
        {phonesVerified !== undefined && phonesTotal !== undefined && (
          <Badge variant="verified">
            Phones: {phonesVerified}/{phonesTotal} ✓
          </Badge>
        )}
        {isHot && <Badge variant="hot">HOT</Badge>}
      </div>
    </button>
  );
}
