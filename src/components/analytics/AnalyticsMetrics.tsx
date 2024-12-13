import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Scale, Timer, TrendingUp, Users, Award, Star } from "lucide-react"

const metrics = [
  {
    title: "Total Cases",
    value: "124",
    description: "+5% from last month",
    icon: Scale,
  },
  {
    title: "Success Rate",
    value: "89%",
    description: "+2% from last month",
    icon: Award,
  },
  {
    title: "Avg. Resolution Time",
    value: "45 days",
    description: "-3 days from average",
    icon: Timer,
  },
  {
    title: "Client Satisfaction",
    value: "4.8/5",
    description: "Based on 98 reviews",
    icon: Star,
  },
  {
    title: "Active Lawyers",
    value: "12",
    description: "8 cases per lawyer",
    icon: Users,
  },
  {
    title: "Revenue Growth",
    value: "+15%",
    description: "Compared to last quarter",
    icon: TrendingUp,
  },
]

export function AnalyticsMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}