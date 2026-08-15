import { Heart, MessageCircle, Eye } from "lucide-react";
import { PLATFORM_ICONS } from "@/lib/platform-icons";
import { brandGradient } from "@/lib/brand-visual";
import { formatCompactNumber } from "@/lib/utils";
import type { TopPost } from "@/types/analytics";

export function TopPosts({ posts }: { posts: TopPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {posts.map((post) => {
        const Icon = PLATFORM_ICONS[post.platform];
        return (
          <div
            key={post.id}
            className="flex gap-3 rounded-lg p-3 ring-1 ring-foreground/10 hover:ring-brand/40 transition-colors cursor-pointer"
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md text-white"
              style={{ backgroundImage: brandGradient(post.id) }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-foreground line-clamp-2">
                {post.caption}
              </p>
              <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-faint">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {formatCompactNumber(post.views)}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" /> {formatCompactNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" /> {formatCompactNumber(post.comments)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}