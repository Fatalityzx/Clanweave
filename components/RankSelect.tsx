import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RankSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

const ranks = ["ME1", "ME2", "ME3", "ME4", "ME5", "ME6"]

export function RankSelect({ value, onValueChange, placeholder = "Select rank" }: RankSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {ranks.map((rank) => (
          <SelectItem key={rank} value={rank}>
            {rank}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

