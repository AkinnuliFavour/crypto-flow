import React from "react";
import { TrendingUp, Hash } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface TrendingTopic {
  tag: string;
  count: number;
  change: number; // percentage change
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  onTopicClick?: (topic: string) => void;
}

export const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  topics,
  onTopicClick,
}) => {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Trending Topics</h3>
      </div>

      <div className="space-y-2">
        {topics.map((topic, index) => (
          <div
            key={topic.tag}
            className="flex items-center justify-between p-2 rounded hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">
                #{index + 1}
              </span>
              <Hash className="h-4 w-4 text-muted-foreground" />
              <Button
                variant="link"
                className="h-auto p-0 text-sm font-medium hover:underline"
                onClick={() => onTopicClick?.(topic.tag)}
              >
                {topic.tag}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {topic.count}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  topic.change >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {topic.change >= 0 ? "+" : ""}
                {topic.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
