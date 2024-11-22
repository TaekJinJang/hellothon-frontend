import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortSelectProps {
  sortOrder: "newest" | "oldest";
  onSortChange: (value: "newest" | "oldest") => void;
}

export const SortSelect = ({ sortOrder, onSortChange }: SortSelectProps) => (
  <Select onValueChange={(value) => onSortChange(value as "newest" | "oldest")} value={sortOrder}>
    <SelectTrigger className="w-48">
      <SelectValue placeholder="" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="newest">최신순</SelectItem>
      <SelectItem value="oldest">오래된 순</SelectItem>
    </SelectContent>
  </Select>
);
