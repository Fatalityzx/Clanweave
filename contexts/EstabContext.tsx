"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface TransferHistory {
  date: string
  previously: string
  transferredTo: string
  approvedBy: string
  remarks: string
}

export interface EstabPosition {
  id: string | number
  title: string
  posnId: string
  estabRank: string
  creationDate: string
  remarks: string
  lastTransfer: TransferHistory | null
}

interface EstabContextType {
  positions: EstabPosition[]
  transferHistory: { [key: string]: TransferHistory[] }
  updatePosition: (id: string | number, newData: Partial<EstabPosition>) => void
  addTransferHistory: (id: string | number, transfer: TransferHistory) => void
  addNewEstab: (newEstab: EstabPosition) => void
}

const EstabContext = createContext<EstabContextType | undefined>(undefined)

// Initial mock data
const initialPositions: EstabPosition[] = [
  {
    id: 1,
    title: "OC 'C' Coy",
    posnId: "123456789",
    estabRank: "ME4",
    creationDate: "01/01/2020",
    remarks: "Command position",
    lastTransfer: null,
  },
  {
    id: 2,
    title: "Dy Hd",
    posnId: "234567890",
    estabRank: "ME4",
    creationDate: "15/03/2019",
    remarks: "Staff position",
    lastTransfer: null,
  },
  {
    id: 3,
    title: "OC 'A' Coy",
    posnId: "345678901",
    estabRank: "ME4",
    creationDate: "10/06/2018",
    remarks: "Command position",
    lastTransfer: null,
  },
  {
    id: 4,
    title: "OC Regal",
    posnId: "456789012",
    estabRank: "ME4",
    creationDate: "22/09/2021",
    remarks: "Special unit position",
    lastTransfer: null,
  },
  {
    id: 5,
    title: "PC",
    posnId: "567890123",
    estabRank: "ME3",
    creationDate: "05/04/2022",
    remarks: "Junior command position",
    lastTransfer: null,
  },
  {
    id: 6,
    title: "Project Officer",
    posnId: "678901234",
    estabRank: "ME4",
    creationDate: "30/11/2020",
    remarks: "Project management role",
    lastTransfer: null,
  },
  {
    id: 7,
    title: "Exe",
    posnId: "789012345",
    estabRank: "ME4",
    creationDate: "18/07/2019",
    remarks: "Executive position",
    lastTransfer: null,
  },
  {
    id: 8,
    title: "Hd Ops",
    posnId: "890123456",
    estabRank: "ME5",
    creationDate: "25/02/2018",
    remarks: "Operations leadership",
    lastTransfer: null,
  },
  {
    id: 9,
    title: "Hd xx",
    posnId: "901234567",
    estabRank: "ME6",
    creationDate: "12/12/2017",
    remarks: "Department head position",
    lastTransfer: null,
  },
]

const initialTransferHistory: { [key: string]: TransferHistory[] } = {
  "1": [
    {
      date: "14/1/2024",
      previously: "OC 'C' Coy",
      transferredTo: "OC xxx",
      approvedBy: "ME5 xxx",
      remarks: "Info 1, 2, 3",
    },
    {
      date: "04/10/2022",
      previously: "OC 'N' Coy",
      transferredTo: "OC 'C' Coy",
      approvedBy: "ME5 xxx",
      remarks: "Info 1, 2, 3",
    },
    {
      date: "20/12/2020",
      previously: "OC 'M' Coy",
      transferredTo: "OC 'N' Coy",
      approvedBy: "ME6 xxx",
      remarks: "Unit restructuring",
    },
  ],
  "2": [
    {
      date: "25/11/2023",
      previously: "Dy Hd Planning",
      transferredTo: "Dy Hd",
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
    {
      date: "03/04/2019",
      previously: "NA",
      transferredTo: "Dy Hd Ops",
      approvedBy: "ME6 Michael",
      remarks: "Initial establishment",
    },
  ],
  "3": [
    {
      date: "30/09/2023",
      previously: "OC Support",
      transferredTo: "OC 'A' Coy",
      approvedBy: "ME5 James",
      remarks: "Unit reorganization",
    },
    {
      date: "12/03/2021",
      previously: "OC Training",
      transferredTo: "OC Support",
      approvedBy: "ME5 Emma",
      remarks: "Operational requirements",
    },
    {
      date: "18/06/2018",
      previously: "NA",
      transferredTo: "OC Training",
      approvedBy: "ME6 William",
      remarks: "New position creation",
    },
  ],
  "4": [
    {
      date: "15/12/2023",
      previously: "OC Special Ops",
      transferredTo: "OC Regal",
      approvedBy: "ME6 Alex",
      remarks: "Unit designation change",
    },
    {
      date: "22/09/2021",
      previously: "NA",
      transferredTo: "OC Special Ops",
      approvedBy: "ME6 David",
      remarks: "Special unit establishment",
    },
  ],
  "5": [
    {
      date: "20/01/2024",
      previously: "PC Alpha",
      transferredTo: "PC",
      approvedBy: "ME4 Thomas",
      remarks: "Position standardization",
    },
    {
      date: "05/04/2022",
      previously: "NA",
      transferredTo: "PC Alpha",
      approvedBy: "ME5 Richard",
      remarks: "New PC position",
    },
  ],
  "6": [
    {
      date: "10/12/2023",
      previously: "Technical Officer",
      transferredTo: "Project Officer",
      approvedBy: "ME5 George",
      remarks: "Role redefinition",
    },
    {
      date: "30/11/2020",
      previously: "NA",
      transferredTo: "Technical Officer",
      approvedBy: "ME5 Peter",
      remarks: "Technical role establishment",
    },
  ],
  "7": [
    {
      date: "05/01/2024",
      previously: "Senior Executive",
      transferredTo: "Exe",
      approvedBy: "ME5 Charles",
      remarks: "Position restructuring",
    },
    {
      date: "18/07/2019",
      previously: "NA",
      transferredTo: "Senior Executive",
      approvedBy: "ME6 Andrew",
      remarks: "Executive position creation",
    },
  ],
  "8": [
    {
      date: "28/11/2023",
      previously: "Hd Strategic Ops",
      transferredTo: "Hd Ops",
      approvedBy: "ME6 Christopher",
      remarks: "Department consolidation",
    },
    {
      date: "15/05/2021",
      previously: "Hd Operations",
      transferredTo: "Hd Strategic Ops",
      approvedBy: "ME6 Daniel",
      remarks: "Strategic realignment",
    },
    {
      date: "25/02/2018",
      previously: "NA",
      transferredTo: "Hd Operations",
      approvedBy: "ME6 Matthew",
      remarks: "Operations department creation",
    },
  ],
  "9": [
    {
      date: "01/12/2023",
      previously: "Hd Strategic Planning",
      transferredTo: "Hd xx",
      approvedBy: "ME6 Joseph",
      remarks: "Department restructuring",
    },
    {
      date: "20/06/2021",
      previously: "Hd Planning",
      transferredTo: "Hd Strategic Planning",
      approvedBy: "ME6 Robert",
      remarks: "Strategic elevation",
    },
    {
      date: "12/12/2017",
      previously: "NA",
      transferredTo: "Hd Planning",
      approvedBy: "ME6 Edward",
      remarks: "Department head establishment",
    },
  ],
}

export function EstabProvider({ children }: { children: ReactNode }) {
  const [positions, setPositions] = useState<EstabPosition[]>(initialPositions)
  const [transferHistory, setTransferHistory] = useState<{ [key: string]: TransferHistory[] }>(initialTransferHistory)

  const updatePosition = (id: string | number, newData: Partial<EstabPosition>) => {
    setPositions((prev) => prev.map((pos) => (pos.id.toString() === id.toString() ? { ...pos, ...newData } : pos)))
  }

  const addTransferHistory = (id: string | number, transfer: TransferHistory) => {
    setTransferHistory((prev) => {
      const existingHistory = prev[id.toString()] || []
      const lastTransfer = existingHistory[0] // Get most recent transfer

      // If there's a previous transfer, use its destination as the "previously" value
      const updatedTransfer = {
        ...transfer,
        previously: lastTransfer ? lastTransfer.transferredTo : transfer.previously,
      }

      return {
        ...prev,
        [id.toString()]: [updatedTransfer, ...existingHistory],
      }
    })

    // Update the position's title and last transfer
    updatePosition(id, {
      title: transfer.transferredTo,
      lastTransfer: transfer,
    })
  }

  const addNewEstab = (newEstab: EstabPosition) => {
    setPositions((prev) => [...prev, newEstab])
    // Add an initial transfer history entry
    addTransferHistory(newEstab.id, {
      date: newEstab.creationDate,
      previously: "NA",
      transferredTo: newEstab.title,
      approvedBy: newEstab.lastTransfer?.approvedBy || "Unknown",
      remarks: newEstab.remarks,
    })
  }

  return (
    <EstabContext.Provider
      value={{
        positions,
        transferHistory,
        updatePosition,
        addTransferHistory,
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

