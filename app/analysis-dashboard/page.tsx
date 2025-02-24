"use client"

import { useState, useMemo } from "react"
import { CollapsibleSidebar } from "@/components/layout/collapsible-sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { ArrowUpRight, ArrowDownRight, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const fullData = [
  { year: 2000, count: 15, attrition: 2 },
  { year: 2001, count: 17, attrition: 1 },
  { year: 2002, count: 20, attrition: 3 },
  { year: 2003, count: 22, attrition: 2 },
  { year: 2004, count: 19, attrition: 4 },
  { year: 2005, count: 23, attrition: 3 },
  { year: 2006, count: 26, attrition: 2 },
  { year: 2007, count: 28, attrition: 3 },
  { year: 2008, count: 25, attrition: 5 },
  { year: 2009, count: 30, attrition: 4 },
  { year: 2010, count: 32, attrition: 3 },
  { year: 2011, count: 35, attrition: 4 },
  { year: 2012, count: 33, attrition: 5 },
  { year: 2013, count: 36, attrition: 3 },
  { year: 2014, count: 38, attrition: 4 },
  { year: 2015, count: 40, attrition: 5 },
  { year: 2016, count: 42, attrition: 4 },
  { year: 2017, count: 39, attrition: 6 },
  { year: 2018, count: 41, attrition: 5 },
  { year: 2019, count: 44, attrition: 4 },
  { year: 2020, count: 46, attrition: 5 },
  { year: 2021, count: 48, attrition: 6 },
  { year: 2022, count: 50, attrition: 5 },
  { year: 2023, count: 52, attrition: 6 },
  { year: 2024, count: 55, attrition: 5 },
]

const rankDistribution = [
  { rank: "ME1", count: 89, percentage: "41.5%" },
  { rank: "ME2", count: 50, percentage: "23.3%" },
  { rank: "ME3", count: 40, percentage: "18.6%" },
  { rank: "ME4", count: 34, percentage: "15.8%" },
  { rank: "ME5", count: 15, percentage: "7%" },
  { rank: "ME6", count: 2, percentage: "0.9%" },
]

export default function AnalysisDashboard() {
  const [timeRange, setTimeRange] = useState("25")

  const filteredData = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - Number.parseInt(timeRange)
    return fullData.filter((item) => item.year >= startYear)
  }, [timeRange])

  const totalME1s = filteredData[filteredData.length - 1].count
  const inService = totalME1s - filteredData[filteredData.length - 1].attrition
  const outOfService = filteredData[filteredData.length - 1].attrition
  const averageAttritionRate = (
    filteredData.reduce((sum, item) => sum + item.attrition, 0) / filteredData.length
  ).toFixed(1)

  const growthRate = (
    ((filteredData[filteredData.length - 1].count - filteredData[0].count) / filteredData[0].count) *
    100
  ).toFixed(1)

  const predictiveAttritionData = useMemo(() => {
    const lastYear = filteredData[filteredData.length - 1].year
    return [
      { year: lastYear + 1, count: Math.round(totalME1s * 1.03) },
      { year: lastYear + 2, count: Math.round(totalME1s * 1.06) },
      { year: lastYear + 3, count: Math.round(totalME1s * 1.09) },
      { year: lastYear + 4, count: Math.round(totalME1s * 1.12) },
      { year: lastYear + 5, count: Math.round(totalME1s * 1.15) },
      { year: lastYear + 6, count: Math.round(totalME1s * 1.18) },
      { year: lastYear + 7, count: Math.round(totalME1s * 1.21) },
      { year: lastYear + 8, count: Math.round(totalME1s * 1.24) },
      { year: lastYear + 9, count: Math.round(totalME1s * 1.27) },
      { year: lastYear + 10, count: Math.round(totalME1s * 1.3) },
    ]
  }, [filteredData, totalME1s])

  const predictedShortfall = useMemo(() => {
    const lastYear = filteredData[filteredData.length - 1].year
    return [
      { year: lastYear + 7, shortfall: Math.round(totalME1s * 0.05), supply: Math.round(totalME1s * 1.21) },
      { year: lastYear + 8, shortfall: Math.round(totalME1s * 0.07), supply: Math.round(totalME1s * 1.24) },
      { year: lastYear + 9, shortfall: Math.round(totalME1s * 0.09), supply: Math.round(totalME1s * 1.27) },
    ]
  }, [filteredData, totalME1s])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CollapsibleSidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-800">Analysis Dashboard</h1>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  // Add your data pulling logic here
                  console.log("Pulling data...")
                }}
              >
                Pull Data
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Snapshot data as at 14/1/2024</div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">Last 25 Years</SelectItem>
                  <SelectItem value="10">Last 10 Years</SelectItem>
                  <SelectItem value="5">Last 5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total ME1s</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalME1s}</div>
                <p className="text-xs text-muted-foreground">
                  {growthRate}% growth over {timeRange} years
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Service</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inService}</div>
                <p className="text-xs text-muted-foreground">
                  {((inService / totalME1s) * 100).toFixed(1)}% of total ME1s
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Out of Service</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{outOfService}</div>
                <p className="text-xs text-muted-foreground">
                  {((outOfService / totalME1s) * 100).toFixed(1)}% of total ME1s
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attrition Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageAttritionRate}%</div>
                <p className="text-xs text-muted-foreground">Average per year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Total of New METs by Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Rank Distribution</h3>
                  <div className="space-y-4">
                    {rankDistribution.map((rank) => (
                      <div key={rank.rank} className="flex items-center gap-4">
                        <span className="text-sm font-medium w-12">{rank.rank}</span>
                        <div className="flex-1 flex items-center">
                          <div className="flex-1 h-2 bg-blue-100 rounded-full">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: rank.percentage }} />
                          </div>
                          <span className="text-sm text-gray-500 ml-4 w-16">{rank.percentage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Predictive Attrition Analysis Over Next 10 Years</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={predictiveAttritionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Predicted Shortfall</h3>
                  <div className="space-y-4">
                    {predictedShortfall.map((year) => (
                      <div key={year.year} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{year.year}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-red-500">{year.shortfall}</span>
                          <span className="text-sm text-green-500">{year.supply}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                      <span className="text-sm font-medium">Projected Growth</span>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span>+3%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                      <span className="text-sm font-medium">Projected Decline</span>
                      <div className="flex items-center text-red-600">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        <span>-2%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Service Duration</h4>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                        <span className="text-sm">0-10 years: 80%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                        <span className="text-sm">10-20 years: 20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

