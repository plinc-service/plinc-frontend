"use client";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Area,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  rawData: {
    plinc: {
      points: number[];
      legends: {
        month: string[];
        year: string[];
        three_months: string[];
      };
    };
    commission: {
      points: number[];
      legends: {
        month: string[];
        year: string[];
        three_months: string[];
      };
    };
  };
}

interface ChartDataItem {
  name: string;
  value: number;
  date: string;
}

export function AnalyticsChart({ rawData }: Props) {
  const [selectedFilter, setSelectedFilter] = useState<"plinc" | "commission">("plinc");
  const [activeIndex, setActiveIndex] = useState(3); // default to last month interval

  const filterOptions = [
    { label: "PlinC", value: "plinc" },
    { label: "Cashflow", value: "commission" },
  ];

  const data = rawData[selectedFilter];
  const opposite = selectedFilter === "plinc" ? rawData.commission : rawData.plinc;

  const chartData = data.points.map((value, index) => ({
    name: data.legends.month[index] || `Point ${index + 1}`,
    value,
    date: data.legends.month[index] || `Point ${index + 1}`,
  }));

  const value = data.points[activeIndex];
  const valueSuffix = opposite.points[activeIndex];
  const currentPeriod = data.legends.month[activeIndex]?.replace(",", " - ");
  const color = selectedFilter === "plinc" ? "#14B8A6" : "#2563eb";

  const subtitleText =
    selectedFilter === "plinc" ? "CA Total" : "Plinc au total";

  const currentPeriodIndex = chartData.findIndex((item) => item.name === currentPeriod);

  const CustomDot = ({ cx, cy, index }: { cx?: number; cy?: number; index?: number }) => {
    if (index === currentPeriodIndex) {
      return (
        <>
          <circle cx={cx} cy={cy} r={20} fill={color + "33"} />
          <circle cx={cx} cy={cy} r={12} fill={color + "44"} />
          <circle cx={cx} cy={cy} r={6} fill="#fff" stroke={color} strokeWidth={2} />
        </>
      );
    }
    return null;
  };

  const CustomActiveDot = (props: {
    cx?: number;
    cy?: number;
    color?: string;
    payload?: ChartDataItem;
  }) => {
    const { cx, cy, color, payload } = props;

    if (cx === undefined || cy === undefined || !payload) return null;

    const index = chartData.findIndex((d) => d.date === payload.date);

    return (
      <g
        onClick={() => {
          if (index !== undefined) {
            setActiveIndex(index);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        {/* Zone de clic élargie (invisible) */}
        <circle cx={cx} cy={cy} r={20} fill="transparent" />

        {/* Visuel du dot */}
        <circle cx={cx} cy={cy} r={12} fill={color + "44"} />
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#fff"
          stroke={color}
          strokeWidth={2}
          style={{ transition: "all 0.2s ease" }} />
      </g>
    );
  };


  return (
    <Card className="bg-blue-50/80 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Analyse des plincs</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {filterOptions.find((opt) => opt.value === selectedFilter)?.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filterOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  setSelectedFilter(option.value as "plinc" | "commission");
                  setActiveIndex(3);
                }}
                className={selectedFilter === option.value ? "bg-primary/20" : ""}
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
            {selectedFilter === "commission" && (
              <span className="text-gray-500 mr-2">€</span>
            )}
            <span className="text-4xl font-bold text-blue-500">
              {value ?? "—"}
            </span>
          </div>
          {subtitleText && (
            <p className="text-sm text-neutral-high flex items-center gap-0.5">
              <span className="text-blue-500 block">
                {valueSuffix ?? "—"}
              </span>
              {subtitleText}
            </p>
          )}
        </div>

        <div className="h-[250px] mt-4">
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 18, left: 18, bottom: 5 }}
            >
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
                tick={({ payload, x, y, index }) => {
                  const isActive = index === activeIndex;
                  return (
                    <text
                      x={x}
                      y={y + 10}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight={isActive ? 700 : 400}
                      fill={isActive ? color : "#94a3b8"}
                    >
                      {payload.value}
                    </text>
                  );
                }}
                tickMargin={15}
                padding={{ left: 20, right: 20, }}
              />
              <YAxis hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <span className="text-sm font-bold text-muted-foreground">
                          {payload[0].payload.date}
                        </span>
                        <div className="text-muted-foreground">
                          {payload[0].value} {selectedFilter === "commission" ? "€" : "Plinc"}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={<CustomActiveDot color={color} />}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="transparent"
                dot={<CustomDot />}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="value"
                fill="url(#colorValue)"
                stroke="transparent"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
