"use client"

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { AnalyticsChartProps, DataPoint } from "@/interfaces/dashboardStatsInterface";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function AnalyticsChart({
  title,
  value: initialValue,
  currency = "€",
  subtitle: initialSubtitle,
  data: initialData,
  currentPeriod,
  filterOptions = [
    { label: "PlinC", value: "plinc" },
    { label: "Commission", value: "commission" },
  ],
  filterLabel = "PlinC",
  defaultFilter = "plinc",
  valuePrefix = "",
  valueSuffix = "0",
  color = "#2563eb",
}: AnalyticsChartProps) {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter)
  const [filteredData, setFilteredData] = useState<DataPoint[]>(initialData)
  const [displayValue, setDisplayValue] = useState(initialValue)
  const [subtitle, setSubtitle] = useState(initialSubtitle)

  useEffect(() => {
    setFilteredData(initialData)
    setDisplayValue(initialValue)
    setSubtitle(initialSubtitle)

  }, [selectedFilter, initialData, initialValue, initialSubtitle])

  const currentPeriodIndex = filteredData.findIndex((item) => item.name === currentPeriod)

  const CustomDot = (props: { cx?: number; cy?: number; index?: number }) => {
    const { cx, cy, index } = props
    if (index === currentPeriodIndex) {
      return (
        <>
          {/* Outer glow effect */}
          <circle cx={cx} cy={cy} r={20} fill="rgba(37, 99, 235, 0.15)" />
          {/* Middle glow effect */}
          <circle cx={cx} cy={cy} r={12} fill="rgba(59, 130, 246, .20)" />
          {/* Inner circle with border */}
          <circle cx={cx} cy={cy} r={6} fill="#fff" stroke={color} strokeWidth={2} />
        </>
      )
    }
    return null
  }

  return (
    <Card className="bg-blue-50/80 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {filterOptions.find((option) => option.value === selectedFilter)?.label || filterLabel}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filterOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={selectedFilter === option.value ? "bg-primary/10" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-gray-500 mr-2">{currency}</span>
            <span className="text-4xl font-bold text-blue-500">
              {valuePrefix}
              {displayValue.toLocaleString()}
            </span>
          </div>
          {subtitle && <p className="text-sm text-neutral-high flex items-center gap-0.5"><span className="text-blue-500 block">{valueSuffix}</span>{subtitle}</p>}
        </div>
        <div className="h-[250px] mt-4">
          <ResponsiveContainer className="w-full max-w-full">
            <LineChart data={filteredData} margin={{ top: 20, right: 18, left: 18, bottom: 5 }} >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickMargin={15}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                            <span className="font-bold text-muted-foreground">
                              {currency} {payload[0].value}
                            </span>
                          </div>
                          {payload[0].payload.date && (
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                              <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "white", stroke: color, strokeWidth: 2 }}
                isAnimationActive={true}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="transparent"
                dot={<CustomDot />}
                isAnimationActive={false}
              />
              {/* {currentPeriod && currentPeriodIndex !== -1 && (
                <line
                  x1={currentPeriodIndex * (100 / (filteredData.length - 1)) + "%"}
                  y1="0%"
                  x2={currentPeriodIndex * (100 / (filteredData.length - 1)) + "%"}
                  y2="100%"
                  stroke={color}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  strokeOpacity={0.6}
                />
              )} */}
              <Area type="monotone" dataKey="value" fill="url(#colorValue)" fillOpacity={1} stroke="transparent" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}