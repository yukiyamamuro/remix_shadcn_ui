import { useState } from "react"
import { Slider } from "~/components/ui/slider"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export function PricingCalculatorComponent() {
  const [seats, setSeats] = useState(1)
  const [usage, setUsage] = useState(100)
  const [discount, setDiscount] = useState(0)

  const basePrice = 10 // Base price per seat
  const usageRate = 0.05 // Price per unit of usage
  const discounts = {
    none: 0,
    yearly: 0.1,
    enterprise: 0.2
  }

  const calculatePrice = () => {
    const seatCost = seats * basePrice
    const usageCost = usage * usageRate
    const subtotal = seatCost + usageCost
    const discountAmount = subtotal * discounts[discount]
    return (subtotal - discountAmount).toFixed(2)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>SaaS Pricing Calculator</CardTitle>
        <CardDescription>Calculate your custom plan based on seats, usage, and discounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="seats">Number of Seats</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="seats"
              min={1}
              max={100}
              step={1}
              value={[seats]}
              onValueChange={(value) => setSeats(value[0])}
              className="flex-grow"
            />
            <Input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage">Monthly Usage (GB)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="usage"
              min={0}
              max={1000}
              step={10}
              value={[usage]}
              onValueChange={(value) => setUsage(value[0])}
              className="flex-grow"
            />
            <Input
              type="number"
              value={usage}
              onChange={(e) => setUsage(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Discount</Label>
          <Select value={discount} onValueChange={setDiscount}>
            <SelectTrigger id="discount">
              <SelectValue placeholder="Select a discount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="yearly">Yearly (10% off)</SelectItem>
              <SelectItem value="enterprise">Enterprise (20% off)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-6 text-center">
          <h3 className="text-2xl font-bold">Total Price</h3>
          <p className="text-4xl font-bold text-primary">${calculatePrice()}/month</p>
        </div>
      </CardContent>
    </Card>
  )
}