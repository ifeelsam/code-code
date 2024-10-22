import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react'

interface TestCasesProps {
  testCases: string;
  setTestCases: (testCases: string) => void;
  output: string;
  isVisible: boolean;
  toggleVisibility: () => void;
}

export function TestCases({ testCases, setTestCases, output, isVisible, toggleVisibility }: TestCasesProps) {
  return (
    <div className={`bg-gray-700 transition-all duration-300 ease-in-out ${isVisible ? 'h-64' : 'h-0'} overflow-hidden`}>
      <div className="flex justify-between items-center p-2 bg-gray-600">
        <span className="text-sm font-medium">Test Cases</span>
        <button
          onClick={toggleVisibility}
          className="text-white focus:outline-none"
        >
          {isVisible ? <ChevronDownIcon size={20} /> : <ChevronUpIcon size={20} />}
        </button>
      </div>
      <div className="p-4 h-full flex flex-col">
        <Textarea
          className="flex-grow w-full p-2 bg-gray-800 text-white font-mono resize-none focus:outline-none rounded-md mb-4"
          placeholder="Enter test cases here"
          value={testCases}
          onChange={(e) => setTestCases(e.target.value)}
        />
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-xs text-gray-300">{output}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
