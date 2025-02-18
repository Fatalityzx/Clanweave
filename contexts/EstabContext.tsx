"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TransferData {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

interface VersionHistoryEntry {
  date: string
  modifiedBy: string
  changes: { field: string; from: string; to: string }[]
}

export interface EstabPosition {
  id: string | number
  title: string
  posnId: string
  rank: string
  unit: string
  creationDate: string
  requirements: {
    minRank: string
    experience: string
    priority: string
    readyDate: string
  }
  remarks: string
  personnel: string
  lastTransfer?: TransferData | null
}

interface EstabContextType {
  positions: EstabPosition[]
  transferHistory: Record<string, TransferData[]>
  versionHistory: Record<string, VersionHistoryEntry[]>
  updatePosition: (id: string | number, newData: Partial<EstabPosition>) => void
  addTransferHistory: (id: string | number, transfer: TransferData) => void
  addVersionHistory: (id: string | number, data: VersionHistoryEntry) => void
  addNewEstab: (newEstab: EstabPosition) => void
}

const EstabContext = createContext<EstabContextType | undefined>(undefined)

// Initial positions with complete details
const initialPositions: EstabPosition[] = [
  {
    id: "1",
    title: "CEO",
    posnId: "CEO001",
    rank: "ME6",
    unit: "HQ xyz",
    creationDate: "01/01/2020",
    requirements: {
      minRank: "ME6",
      experience: "10+ years in executive leadership",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Executive position",
    personnel: "John Doe",
  },
  {
    id: "2",
    title: "COO",
    posnId: "COO001",
    rank: "ME5",
    unit: "HQ xyz",
    creationDate: "01/01/2020",
    requirements: {
      minRank: "ME5",
      experience: "8+ years in operations management",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Operations leadership",
    personnel: "Jane Smith",
  },
  {
    id: "3",
    title: "CTO",
    posnId: "CTO001",
    rank: "ME5",
    unit: "HQ xyz",
    creationDate: "01/01/2020",
    requirements: {
      minRank: "ME5",
      experience: "8+ years in technical leadership",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Technical leadership",
    personnel: "Bob Johnson",
  },
  {
    id: "4",
    title: "Head of HR",
    posnId: "HR001",
    rank: "ME4",
    unit: "HQ xyz",
    creationDate: "01/01/2020",
    requirements: {
      minRank: "ME4",
      experience: "6+ years in HR management",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "HR leadership",
    personnel: "Alice Brown",
  },
  {
    id: "5",
    title: "Head of Finance",
    posnId: "FIN001",
    rank: "ME4",
    unit: "HQ xyz",
    creationDate: "01/01/2020",
    requirements: {
      minRank: "ME4",
      experience: "6+ years in finance",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Finance leadership",
    personnel: "Charlie Davis",
  },
  {
    id: "6",
    title: "HR Specialist",
    posnId: "HR002",
    rank: "ME2",
    unit: "HQ xyz",
    creationDate: "01/01/2021",
    requirements: {
      minRank: "ME2",
      experience: "3+ years in HR",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "HR operations",
    personnel: "Grace Lee",
  },
  {
    id: "7",
    title: "Financial Analyst",
    posnId: "FIN002",
    rank: "ME2",
    unit: "HQ xyz",
    creationDate: "01/01/2021",
    requirements: {
      minRank: "ME2",
      experience: "3+ years in finance",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Financial analysis",
    personnel: "Henry Wang",
  },
  {
    id: "8",
    title: "Software Engineer",
    posnId: "ENG003",
    rank: "ME2",
    unit: "xxxx",
    creationDate: "01/01/2021",
    requirements: {
      minRank: "ME2",
      experience: "3+ years in software development",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Software development",
    personnel: "Ivy Chen",
  },
  {
    id: "9",
    title: "Hd",
    posnId: "ENG555",
    rank: "ME6",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME6",
      experience: "10+ years in leadership",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Harry",
  },
  {
    id: "10",
    title: "Delta 1A",
    posnId: "ENG556",
    rank: "ME4",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME4",
      experience: "6+ years",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Wane",
  },
  {
    id: "11",
    title: "Delta 1B",
    posnId: "ENG557",
    rank: "ME4",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME4",
      experience: "6+ years",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Rooney",
  },
  {
    id: "12",
    title: "OC xxx",
    posnId: "ENG558",
    rank: "ME4",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME4",
      experience: "6+ years",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Jerry",
  },
  {
    id: "13",
    title: "SM",
    posnId: "ENG560",
    rank: "ME3",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME3",
      experience: "4+ years",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Watsons",
  },
  {
    id: "14",
    title: "PC '1B' Coy",
    posnId: "ENG559",
    rank: "ME2",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME2",
      experience: "2+ years",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Tommy",
  },
  {
    id: "15",
    title: "PC 'xxx' Coy",
    posnId: "ENG560",
    rank: "ME2",
    unit: "HQ xxxx",
    creationDate: "01/01/2022",
    requirements: {
      minRank: "ME2",
      experience: "2+ years",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Standard position",
    personnel: "Hans",
  },
  {
    id: "16",
    title: "Deputy COO",
    posnId: "COO002",
    rank: "ME4",
    unit: "HQ xyz",
    creationDate: "01/02/2023",
    requirements: {
      minRank: "ME4",
      experience: "6+ years in operations",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Operations management",
    personnel: "Vacant",
  },
  {
    id: "17",
    title: "Senior HR Specialist",
    posnId: "HR003",
    rank: "ME3",
    unit: "HQ xyz",
    creationDate: "01/03/2023",
    requirements: {
      minRank: "ME3",
      experience: "5+ years in HR",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Senior HR role",
    personnel: "Vacant",
  },
  {
    id: "18",
    title: "Project Manager",
    posnId: "ENG004",
    rank: "ME3",
    unit: "xxxx",
    creationDate: "01/04/2023",
    requirements: {
      minRank: "ME3",
      experience: "5+ years in project management",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Project management",
    personnel: "Vacant",
  },
  {
    id: "19",
    title: "Systems Analyst",
    posnId: "ENG005",
    rank: "ME2",
    unit: "xxxx",
    creationDate: "01/05/2023",
    requirements: {
      minRank: "ME2",
      experience: "3+ years in systems analysis",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Systems analysis",
    personnel: "Vacant",
  },
  {
    id: "20",
    title: "Financial Controller",
    posnId: "FIN003",
    rank: "ME4",
    unit: "HQ xyz",
    creationDate: "01/06/2023",
    requirements: {
      minRank: "ME4",
      experience: "6+ years in financial control",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Financial control",
    personnel: "Vacant",
  },
  {
    id: "21",
    title: "Software Developer",
    posnId: "ENG006",
    rank: "ME2",
    unit: "xxxx",
    creationDate: "01/07/2023",
    requirements: {
      minRank: "ME2",
      experience: "3+ years in software development",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Software development",
    personnel: "Vacant",
  },
  {
    id: "22",
    title: "Deputy CTO",
    posnId: "CTO002",
    rank: "ME4",
    unit: "HQ xyz",
    creationDate: "01/08/2023",
    requirements: {
      minRank: "ME4",
      experience: "6+ years in technical management",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Technical management",
    personnel: "Vacant",
  },
  {
    id: "23",
    title: "Head of Cybersecurity",
    posnId: "CTO003",
    rank: "ME4",
    unit: "HQ xyz",
    creationDate: "15/08/2023",
    requirements: {
      minRank: "ME4",
      experience: "6+ years in cybersecurity",
      priority: "High",
      readyDate: "Immediate",
    },
    remarks: "Cybersecurity leadership",
    personnel: "Vacant",
  },
  {
    id: "24",
    title: "Senior Data Analyst",
    posnId: "ENG007",
    rank: "ME3",
    unit: "xxxx",
    creationDate: "01/09/2023",
    requirements: {
      minRank: "ME3",
      experience: "5+ years in data analysis",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Data analysis",
    personnel: "Vacant",
  },
  {
    id: "25",
    title: "Operations Manager",
    posnId: "COO003",
    rank: "ME3",
    unit: "HQ xyz",
    creationDate: "15/09/2023",
    requirements: {
      minRank: "ME3",
      experience: "5+ years in operations",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Operations management",
    personnel: "Vacant",
  },
  {
    id: "26",
    title: "IT Support Specialist",
    posnId: "ENG008",
    rank: "ME2",
    unit: "xxxx",
    creationDate: "01/10/2023",
    requirements: {
      minRank: "ME2",
      experience: "3+ years in IT support",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "IT support",
    personnel: "Vacant",
  },
  {
    id: "27",
    title: "Junior Accountant",
    posnId: "FIN004",
    rank: "ME1",
    unit: "HQ xyz",
    creationDate: "15/10/2023",
    requirements: {
      minRank: "ME1",
      experience: "1+ year in accounting",
      priority: "Low",
      readyDate: "Immediate",
    },
    remarks: "Entry level accounting",
    personnel: "Vacant",
  },
]

// Initial transfer history with comprehensive data
const initialTransferHistory: Record<string, TransferData[]> = {
  "1": [
    {
      date: "14/1/2024",
      previously: "CEO (Acting)",
      transferredTo: "CEO",
      approvedBy: "Board of Directors",
      remarks: "Permanent appointment",
    },
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "CEO (Acting)",
      approvedBy: "Board of Directors",
      remarks: "Initial establishment",
    },
  ],
  "2": [
    {
      date: "25/11/2023",
      previously: "Dy Hd Planning",
      transferredTo: "COO",
      approvedBy: "ME6 John",
      remarks: "Department reorganization",
    },
    {
      date: "15/06/2021",
      previously: "Dy Hd Ops",
      transferredTo: "Dy Hd Planning",
      approvedBy: "ME6 Sarah",
      remarks: "Career development rotation",
    },
  ],
  "4": [
    // Head of HR
    {
      date: "01/07/2023",
      previously: "HR Manager",
      transferredTo: "Head of HR",
      approvedBy: "ME5 Thompson",
      remarks: "Promotion due to department expansion",
    },
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "HR Manager",
      approvedBy: "ME5 Wilson",
      remarks: "Initial position creation",
    },
  ],
  "5": [
    // Head of Finance
    {
      date: "15/08/2023",
      previously: "Financial Controller",
      transferredTo: "Head of Finance",
      approvedBy: "ME5 Anderson",
      remarks: "Restructuring of finance department",
    },
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "Financial Controller",
      approvedBy: "ME5 Roberts",
      remarks: "Initial position creation",
    },
  ],
  "6": [
    // HR Specialist
    {
      date: "01/01/2021",
      previously: "HR Assistant",
      transferredTo: "HR Specialist",
      approvedBy: "ME4 Brown",
      remarks: "Role upgrade following review",
    },
  ],
  "7": [
    // Financial Analyst
    {
      date: "01/01/2021",
      previously: "Junior Analyst",
      transferredTo: "Financial Analyst",
      approvedBy: "ME4 Davis",
      remarks: "Position regrading",
    },
  ],
  "8": [
    // Software Engineer
    {
      date: "01/01/2021",
      previously: "Junior Developer",
      transferredTo: "Software Engineer",
      approvedBy: "ME4 Chen",
      remarks: "Technical role restructuring",
    },
  ],
  "9": [
    // Hd
    {
      date: "14/1/2024",
      previously: "OC 'C' Coy",
      transferredTo: "Hd",
      approvedBy: "ME5 xxx",
      remarks: "Promotion and restructuring",
    },
    {
      date: "04/10/2022",
      previously: "OC 'N' Coy",
      transferredTo: "OC 'C' Coy",
      approvedBy: "ME5 xxx",
      remarks: "Unit reorganization",
    },
  ],
  "16": [
    // Deputy COO
    {
      date: "01/02/2023",
      previously: "Operations Manager",
      transferredTo: "Deputy COO",
      approvedBy: "ME6 Wilson",
      remarks: "Creation of deputy position",
    },
  ],
  "17": [
    // Senior HR Specialist
    {
      date: "01/03/2023",
      previously: "HR Specialist",
      transferredTo: "Senior HR Specialist",
      approvedBy: "ME4 Thompson",
      remarks: "Career progression",
    },
  ],
  "18": [
    // Project Manager
    {
      date: "01/04/2023",
      previously: "Team Lead",
      transferredTo: "Project Manager",
      approvedBy: "ME4 Zhang",
      remarks: "New project initiative",
    },
  ],
  "19": [
    // Systems Analyst
    {
      date: "01/05/2023",
      previously: "Junior Analyst",
      transferredTo: "Systems Analyst",
      approvedBy: "ME3 Lee",
      remarks: "Role expansion",
    },
  ],
  "20": [
    // Financial Controller
    {
      date: "01/06/2023",
      previously: "Senior Accountant",
      transferredTo: "Financial Controller",
      approvedBy: "ME5 Davis",
      remarks: "Department restructuring",
    },
  ],
  "21": [
    // Software Developer
    {
      date: "01/07/2023",
      previously: "Junior Developer",
      transferredTo: "Software Developer",
      approvedBy: "ME3 Wang",
      remarks: "Technical team expansion",
    },
  ],
  "22": [
    // Deputy CTO
    {
      date: "01/08/2023",
      previously: "Technical Lead",
      transferredTo: "Deputy CTO",
      approvedBy: "ME5 Johnson",
      remarks: "Creation of deputy position",
    },
  ],
  "23": [
    // Head of Cybersecurity
    {
      date: "15/08/2023",
      previously: "Security Lead",
      transferredTo: "Head of Cybersecurity",
      approvedBy: "ME5 Chen",
      remarks: "New department formation",
    },
  ],
  "24": [
    // Senior Data Analyst
    {
      date: "01/09/2023",
      previously: "Data Analyst",
      transferredTo: "Senior Data Analyst",
      approvedBy: "ME4 Liu",
      remarks: "Role upgrade",
    },
  ],
  "25": [
    // Operations Manager
    {
      date: "15/09/2023",
      previously: "Operations Lead",
      transferredTo: "Operations Manager",
      approvedBy: "ME4 Smith",
      remarks: "Organizational restructuring",
    },
  ],
  "26": [
    // IT Support Specialist
    {
      date: "01/10/2023",
      previously: "IT Support",
      transferredTo: "IT Support Specialist",
      approvedBy: "ME3 Kumar",
      remarks: "Role standardization",
    },
  ],
  "27": [
    // Junior Accountant
    {
      date: "15/10/2023",
      previously: "NA",
      transferredTo: "Junior Accountant",
      approvedBy: "ME3 Taylor",
      remarks: "New entry-level position",
    },
  ],
}

// Initial version history
const initialVersionHistory: Record<string, VersionHistoryEntry[]> = {
  "1": [
    {
      date: "14/1/2024",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "CEO (Acting)",
          to: "CEO",
        },
        {
          field: "Requirements",
          from: "8+ years experience",
          to: "10+ years in executive leadership",
        },
      ],
    },
  ],
  "4": [
    // Head of HR
    {
      date: "01/07/2023",
      modifiedBy: "HR Director",
      changes: [
        {
          field: "Requirements",
          from: "5+ years in HR",
          to: "6+ years in HR management",
        },
        {
          field: "Priority",
          from: "Medium",
          to: "High",
        },
      ],
    },
  ],
  "5": [
    // Head of Finance
    {
      date: "15/08/2023",
      modifiedBy: "Finance Director",
      changes: [
        {
          field: "Requirements",
          from: "5+ years in finance",
          to: "6+ years in finance",
        },
        {
          field: "Remarks",
          from: "Finance operations",
          to: "Finance leadership",
        },
      ],
    },
  ],
  "16": [
    // Deputy COO
    {
      date: "01/02/2023",
      modifiedBy: "COO",
      changes: [
        {
          field: "Requirements",
          from: "5+ years in operations",
          to: "6+ years in operations",
        },
        {
          field: "Priority",
          from: "Medium",
          to: "High",
        },
      ],
    },
  ],
  "17": [
    // Senior HR Specialist
    {
      date: "01/03/2023",
      modifiedBy: "HR Manager",
      changes: [
        {
          field: "Requirements",
          from: "4+ years in HR",
          to: "5+ years in HR",
        },
      ],
    },
  ],
  "20": [
    // Financial Controller
    {
      date: "01/06/2023",
      modifiedBy: "Head of Finance",
      changes: [
        {
          field: "Requirements",
          from: "5+ years in finance",
          to: "6+ years in financial control",
        },
        {
          field: "Priority",
          from: "Medium",
          to: "High",
        },
      ],
    },
  ],
  "22": [
    // Deputy CTO
    {
      date: "01/08/2023",
      modifiedBy: "CTO",
      changes: [
        {
          field: "Requirements",
          from: "5+ years in technical management",
          to: "6+ years in technical management",
        },
        {
          field: "Priority",
          from: "Medium",
          to: "High",
        },
      ],
    },
  ],
  "23": [
    // Head of Cybersecurity
    {
      date: "15/08/2023",
      modifiedBy: "CTO",
      changes: [
        {
          field: "Requirements",
          from: "5+ years in cybersecurity",
          to: "6+ years in cybersecurity",
        },
        {
          field: "Priority",
          from: "Medium",
          to: "High",
        },
      ],
    },
  ],
}

export function EstabProvider({ children }: { children: ReactNode }) {
  const [positions, setPositions] = useState<EstabPosition[]>(initialPositions)
  const [transferHistory, setTransferHistory] = useState<Record<string, TransferData[]>>(initialTransferHistory)
  const [versionHistory, setVersionHistory] = useState<Record<string, VersionHistoryEntry[]>>(initialVersionHistory)

  const updatePosition = (id: string | number, newData: Partial<EstabPosition>) => {
    setPositions((prev) =>
      prev.map((pos) => {
        if (pos.id.toString() === id.toString()) {
          return {
            ...pos,
            ...newData,
            requirements: {
              ...pos.requirements,
              ...(newData.requirements || {}),
            },
          }
        }
        return pos
      }),
    )
  }

  const addTransferHistory = (id: string | number, transfer: TransferData) => {
    setTransferHistory((prev) => ({
      ...prev,
      [id.toString()]: [...(prev[id.toString()] || []), transfer],
    }))

    updatePosition(id, {
      title: transfer.transferredTo,
      lastTransfer: transfer,
    })
  }

  const addVersionHistory = (id: string | number, data: VersionHistoryEntry) => {
    setVersionHistory((prev) => ({
      ...prev,
      [id.toString()]: [...(prev[id.toString()] || []), data],
    }))
  }

  const addNewEstab = (newEstab: EstabPosition) => {
    setPositions((prev) => [...prev, newEstab])
    if (!transferHistory[newEstab.id]) {
      addTransferHistory(newEstab.id, {
        date: newEstab.creationDate,
        previously: "NA",
        transferredTo: newEstab.title,
        approvedBy: "System",
        remarks: "Initial creation",
      })
    }
  }

  return (
    <EstabContext.Provider
      value={{
        positions,
        transferHistory,
        versionHistory,
        updatePosition,
        addTransferHistory,
        addVersionHistory,
        addNewEstab,
      }}
    >
      {children}
    </EstabContext.Provider>
  )
}

export function useEstab() {
  const context = useContext(EstabContext)
  if (context === undefined) {
    throw new Error("useEstab must be used within an EstabProvider")
  }
  return context
}

