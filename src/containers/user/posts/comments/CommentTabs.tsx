import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CommentTabsProps {
  tab: "positive" | "negative";
  onTabChange: (value: "positive" | "negative") => void;
}

export const CommentTabs = ({ tab, onTabChange }: CommentTabsProps) => (
  <Tabs defaultValue={tab} onValueChange={(value) => onTabChange(value as "positive" | "negative")} className="mr-4">
    <TabsList>
      <TabsTrigger value="positive">긍정댓글</TabsTrigger>
      <TabsTrigger value="negative">부정댓글</TabsTrigger>
    </TabsList>
  </Tabs>
);
