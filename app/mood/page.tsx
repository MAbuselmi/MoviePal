"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MoodPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false)

  // PANAS items
  const positiveItems = [
    "Interested",
    "Excited",
    "Strong",
    "Enthusiastic",
    "Proud",
    "Alert",
    "Inspired",
    "Determined",
    "Attentive",
    "Active",
  ]

  const negativeItems = [
    "Distressed",
    "Upset",
    "Guilty",
    "Scared",
    "Hostile",
    "Irritable",
    "Ashamed",
    "Nervous",
    "Jittery",
    "Afraid",
  ]

  const allItems = [...positiveItems, ...negativeItems]
  const itemsPerStep = 5
  const totalSteps = Math.ceil(allItems.length / itemsPerStep)

  const getCurrentItems = () => {
    const startIndex = (currentStep - 1) * itemsPerStep
    return allItems.slice(startIndex, startIndex + itemsPerStep)
  }

  const handleResponse = (item: string, value: string) => {
    setResponses({
      ...responses,
      [item]: Number.parseInt(value),
    })
  }

  const handleNext = () => {
    const currentItems = getCurrentItems()
    const allAnswered = currentItems.every((item) => responses[item] !== undefined)

    if (!allAnswered) {
      return // Don't proceed if not all questions are answered
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Calculate PANAS scores
      let positiveAffect = 0
      let negativeAffect = 0

      positiveItems.forEach((item) => {
        positiveAffect += responses[item] || 0
      })

      negativeItems.forEach((item) => {
        negativeAffect += responses[item] || 0
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to recommendations page with mood data
      router.push(`/recommendations?positive=${positiveAffect}&negative=${negativeAffect}&type=mood`)
    } catch (error) {
      console.error("Error submitting mood data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isCurrentStepComplete = () => {
    const currentItems = getCurrentItems()
    return currentItems.every((item) => responses[item] !== undefined)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">How Are You Feeling Today?</h1>
            <p className="text-gray-400">
              Rate how you feel right now to get movie recommendations that match your mood.
            </p>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Step {currentStep}</span>
              <span>
                {currentStep} of {totalSteps}
              </span>
            </div>
          </div>

          <Card className="bg-black/60 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Indicate to what extent you feel this way right now</CardTitle>
              <CardDescription className="text-gray-400">
                Rate each feeling on a scale from 1 (very slightly or not at all) to 5 (extremely)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getCurrentItems().map((item) => (
                  <div key={item} className="panas-item p-4 rounded-lg border border-gray-800">
                    <Label className="text-lg font-medium text-white mb-3 block">{item}</Label>
                    <RadioGroup
                      value={responses[item]?.toString() || ""}
                      onValueChange={(value) => handleResponse(item, value)}
                      className="flex justify-between"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex flex-col items-center gap-1.5">
                          <RadioGroupItem
                            value={value.toString()}
                            id={`${item}-${value}`}
                            className="border-gray-600"
                          />
                          <Label htmlFor={`${item}-${value}`} className="text-xs text-gray-400 cursor-pointer">
                            {value === 1 && "Not at all"}
                            {value === 2 && "A little"}
                            {value === 3 && "Moderately"}
                            {value === 4 && "Quite a bit"}
                            {value === 5 && "Extremely"}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isLoading}
                className="border-gray-700 text-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepComplete() || isLoading}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isLoading ? "Processing..." : currentStep === totalSteps ? "Get Recommendations" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

