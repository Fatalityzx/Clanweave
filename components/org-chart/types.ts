export interface OrgNode {
  id: string
  title: string
  type: "hq" | "branch" | "unit"
  section?: "purple" | "red" | "green"
  isVacant?: boolean
  children?: OrgNode[]
  headcount?: {
    [key: string]: string // e.g., "ME1": "2/3"
  }
}

export interface PopupPosition {
  x: number
  y: number
  nodeId: string
}

