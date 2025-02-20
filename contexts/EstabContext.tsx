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

// Updated initial positions (keeping the existing data, just showing a few for brevity)
const initialPositions: EstabPosition[] = [
  {
    id: "1",
    title: "Hd xyz", // Changed from CEO
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
    remarks: "Head position", // Updated from "Executive position"
    personnel: "John Doe",
  },
  // ... update other positions similarly
  {
    id: "2",
    title: "Hd 123", // Changed from COO
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
    remarks: "Head position", // Updated from "Operations leadership"
    personnel: "Jane Smith",
  },
  {
    id: "3",
    title: "OC 123", // Changed from CTO
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
    remarks: "OC position", // Updated from "Technical leadership"
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
    title: "Hd xxxx",
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
  {
    id: "30", // New ID after the existing positions
    title: "Test Transfer",
    posnId: "TEST001",
    rank: "ME5",
    unit: "Test Unit",
    creationDate: "01/02/2024",
    requirements: {
      minRank: "ME5",
      experience: "5+ years",
      priority: "Medium",
      readyDate: "Immediate",
    },
    remarks: "Test position for transfers",
    personnel: "Vacant",
  },
]

// Updated initial transfer history with more comprehensive and realistic data
const initialTransferHistory: Record<string, TransferData[]> = {
  "1": [
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "Hd xyz", // Changed from CEO
      approvedBy: "Board of Directors",
      remarks: "Initial appointment",
    },
  ],
  // ... update other transfer history entries
  "2": [
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "Hd 123", // Changed from COO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "Initial appointment as Hd 123", // Changed from COO
    },
    {
      date: "15/06/2021",
      previously: "Hd 123", // Changed from COO
      transferredTo: "Dy Hd", // Changed from Deputy CEO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "Promotion to Dy Hd role", // Changed from Deputy CEO
    },
    {
      date: "01/01/2023",
      previously: "Dy Hd", // Changed from Deputy CEO
      transferredTo: "Hd 123", // Changed from COO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "Organizational restructuring",
    },
  ],
  "3": [
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "OC 123", // Changed from CTO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "Initial appointment as OC 123", // Changed from CTO
    },
  ],
  "4": [
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "OC xyz", // Changed from Head of HR
      approvedBy: "Hd 123", // Changed from COO
      remarks: "Initial appointment as OC xyz", // Changed from Head of HR
    },
    {
      date: "01/07/2022",
      previously: "OC xyz", // Changed from Head of HR
      transferredTo: "OC 456", // Changed from Director of People Operations
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "Role expansion and title change",
    },
  ],
  "5": [
    {
      date: "01/01/2020",
      previously: "NA",
      transferredTo: "OC ABC", // Changed from Head of Finance
      approvedBy: "Hd 123", // Changed from COO
      remarks: "Initial appointment as OC ABC", // Changed from Head of Finance
    },
    {
      date: "15/03/2023",
      previously: "OC ABC", // Changed from Head of Finance
      transferredTo: "OC xxx", // Changed from CFO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "Promotion to OC xxx position", // Changed from CFO
    },
  ],
  "6": [
    {
      date: "01/01/2021",
      previously: "NA",
      transferredTo: "HR Specialist",
      approvedBy: "OC xyz", // Changed from Head of HR
      remarks: "New position created",
    },
    {
      date: "01/04/2023",
      previously: "HR Specialist",
      transferredTo: "Senior HR Specialist",
      approvedBy: "OC 456", // Changed from Director of People Operations
      remarks: "Promotion based on performance",
    },
  ],
  "7": [
    {
      date: "01/01/2021",
      previously: "NA",
      transferredTo: "Financial Analyst",
      approvedBy: "OC ABC", // Changed from Head of Finance
      remarks: "New position created",
    },
  ],
  "8": [
    {
      date: "01/01/2021",
      previously: "NA",
      transferredTo: "Software Engineer",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "New position created",
    },
    {
      date: "01/10/2022",
      previously: "Software Engineer",
      transferredTo: "Senior Software Engineer",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "Promotion based on technical expertise",
    },
  ],
  "9": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "Hd xxxx",
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "New leadership position created",
    },
  ],
  "10": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "Delta 1A",
      approvedBy: "Hd",
      remarks: "New position created in Delta structure",
    },
  ],
  "11": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "Delta 1B",
      approvedBy: "Hd",
      remarks: "New position created in Delta structure",
    },
  ],
  "12": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "OC xxx",
      approvedBy: "Hd",
      remarks: "New position created in Delta structure",
    },
  ],
  "13": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "SM",
      approvedBy: "Hd",
      remarks: "New position created in Delta structure",
    },
  ],
  "14": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "PC '1B' Coy",
      approvedBy: "Hd",
      remarks: "New position created in Delta structure",
    },
  ],
  "15": [
    {
      date: "01/01/2022",
      previously: "NA",
      transferredTo: "PC 'xxx' Coy",
      approvedBy: "Hd",
      remarks: "New position created in Delta structure",
    },
  ],
  "16": [
    {
      date: "01/02/2023",
      previously: "NA",
      transferredTo: "Dy Hd", // Changed from Deputy COO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "New position created",
    },
  ],
  "17": [
    {
      date: "01/03/2023",
      previously: "NA",
      transferredTo: "Senior HR Specialist",
      approvedBy: "Director of People Operations",
      remarks: "New position created",
    },
  ],
  "18": [
    {
      date: "01/04/2023",
      previously: "NA",
      transferredTo: "Project Manager",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "New position created",
    },
  ],
  "19": [
    {
      date: "01/05/2023",
      previously: "NA",
      transferredTo: "Systems Analyst",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "New position created",
    },
  ],
  "20": [
    {
      date: "01/06/2023",
      previously: "NA",
      transferredTo: "Financial Controller",
      approvedBy: "OC xxx", // Changed from CFO
      remarks: "New position created",
    },
  ],
  "21": [
    {
      date: "01/07/2023",
      previously: "NA",
      transferredTo: "Software Developer",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "New position created",
    },
  ],
  "22": [
    {
      date: "01/08/2023",
      previously: "NA",
      transferredTo: "Dy OC", // Changed from Deputy CTO
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "New position created",
    },
  ],
  "23": [
    {
      date: "15/08/2023",
      previously: "NA",
      transferredTo: "Head of Cybersecurity",
      approvedBy: "Hd xyz", // Changed from CEO
      remarks: "New position created",
    },
  ],
  "24": [
    {
      date: "01/09/2023",
      previously: "NA",
      transferredTo: "Senior Data Analyst",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "New position created",
    },
  ],
  "25": [
    {
      date: "15/09/2023",
      previously: "NA",
      transferredTo: "Operations Manager",
      approvedBy: "Hd 123", // Changed from COO
      remarks: "New position created",
    },
  ],
  "26": [
    {
      date: "01/10/2023",
      previously: "NA",
      transferredTo: "IT Support Specialist",
      approvedBy: "OC 123", // Changed from CTO
      remarks: "New position created",
    },
  ],
  "27": [
    {
      date: "15/10/2023",
      previously: "NA",
      transferredTo: "Junior Accountant",
      approvedBy: "OC xxx", // Changed from CFO
      remarks: "New position created",
    },
  ],
  "30": [
    {
      date: "15/10/2023",
      previously: "NA",
      transferredTo: "Test",
      approvedBy: "Tester",
      remarks: "New position created",
    },
  ],
}

// Updated initial version history to reflect transfers and other changes
const initialVersionHistory: Record<string, VersionHistoryEntry[]> = {
  "1": [
    {
      date: "01/01/2020",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "Hd xyz", // Changed from CEO
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
  ],
  "2": [
    {
      date: "01/01/2020",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "Hd 123", // Changed from COO
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
    {
      date: "15/06/2021",
      modifiedBy: "HR Manager",
      changes: [
        {
          field: "Title",
          from: "Hd 123", // Changed from COO
          to: "Dy Hd", // Changed from Deputy CEO
        },
        {
          field: "Remarks",
          from: "Operations leadership",
          to: "Deputy to Hd, overseeing all operations",
        },
      ],
    },
    {
      date: "01/01/2023",
      modifiedBy: "HR Director",
      changes: [
        {
          field: "Title",
          from: "Dy Hd", // Changed from Deputy CEO
          to: "Hd 123", // Changed from COO
        },
        {
          field: "Remarks",
          from: "Deputy to Hd, overseeing all operations",
          to: "Head of operations",
        },
      ],
    },
  ],
  "3": [
    {
      date: "01/01/2020",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "OC 123", // Changed from CTO
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
  ],
  "4": [
    {
      date: "01/01/2020",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "OC xyz", // Changed from Head of HR
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
    {
      date: "01/07/2022",
      modifiedBy: "HR Manager",
      changes: [
        {
          field: "Title",
          from: "OC xyz", // Changed from Head of HR
          to: "OC 456", // Changed from Director of People Operations
        },
        {
          field: "Remarks",
          from: "HR leadership",
          to: "Oversees all operations",
        },
      ],
    },
  ],
  "5": [
    {
      date: "01/01/2020",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "OC ABC", // Changed from Head of Finance
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
    {
      date: "15/03/2023",
      modifiedBy: "HR Director",
      changes: [
        {
          field: "Title",
          from: "OC ABC", // Changed from Head of Finance
          to: "OC xxx", // Changed from CFO
        },
        {
          field: "Rank",
          from: "ME5",
          to: "ME6",
        },
        {
          field: "Remarks",
          from: "Finance leadership",
          to: "Operations leadership",
        },
      ],
    },
  ],
  "6": [
    {
      date: "01/01/2021",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "HR Specialist",
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
    {
      date: "01/04/2023",
      modifiedBy: "HR Manager",
      changes: [
        {
          field: "Title",
          from: "HR Specialist",
          to: "Senior HR Specialist",
        },
        {
          field: "Remarks",
          from: "HR operations",
          to: "Senior HR role, focusing on strategic initiatives",
        },
      ],
    },
  ],
  "7": [
    {
      date: "01/01/2021",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "Financial Analyst",
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
  ],
  "8": [
    {
      date: "01/01/2021",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "Software Engineer",
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
    {
      date: "01/10/2022",
      modifiedBy: "CTO",
      changes: [
        {
          field: "Title",
          from: "Software Engineer",
          to: "Senior Software Engineer",
        },
        {
          field: "Remarks",
          from: "Software development",
          to: "Senior role in software development, leading key projects",
        },
      ],
    },
  ],
  "9": [
    {
      date: "01/01/2022",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "Hd xxxx",
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
        },
      ],
    },
  ],
  "10": [
    {
      date: "01/01/2022",
      modifiedBy: "System Admin",
      changes: [
        {
          field: "Title",
          from: "NA",
          to: "Delta 1A",
        },
        {
          field: "Creation",
          from: "NA",
          to: "Position Created",
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
    // Trigger a custom event for immediate UI updates
    window.dispatchEvent(new Event("estabUpdated"))
  }

  const addTransferHistory = (id: string | number, transfer: TransferData) => {
    setTransferHistory((prev) => ({
      ...prev,
      [id.toString()]: [...(prev[id.toString()] || []), transfer],
    }))

    // Update the position title after transfer
    updatePosition(id, {
      title: transfer.transferredTo,
      lastTransfer: transfer,
    })

    // Trigger a custom event for immediate UI updates
    window.dispatchEvent(new Event("estabTransferred"))
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

