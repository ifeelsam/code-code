import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProblemStatementProps {
  title: string;
  description: string;
  example: string;
  isVisible: boolean;
}

export function ProblemStatement({ title, description, example, isVisible }: ProblemStatementProps) {
  return (
    <div className={`h-full overflow-auto ${isVisible ? '' : 'hidden'}`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="mb-4 text-gray-700">{description}</p>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Example:</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{example}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
