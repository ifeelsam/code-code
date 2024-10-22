import React from 'react'
import { Button } from "@/components/ui/button"
import { FileTextIcon, BeakerIcon } from 'lucide-react'

interface TopBarProps {
  onRunTests: () => void;
  onSubmit: () => void;
  toggleProblemVisibility: () => void;
  toggleTestCasesVisibility: () => void;
}

export function TopBar({ onRunTests, onSubmit, toggleProblemVisibility, toggleTestCasesVisibility }: TopBarProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-700">
      <div className="flex space-x-2">
        <Button onClick={onRunTests} size="sm">
          Run Tests
        </Button>
        <Button onClick={onSubmit} size="sm">
          Submit
        </Button>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={toggleProblemVisibility}
          className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded focus:outline-none"
        >
          <FileTextIcon size={20} />
        </button>
        <button
          onClick={toggleTestCasesVisibility}
          className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded focus:outline-none"
        >
          <BeakerIcon size={20} />
        </button>
      </div>
    </div>
  )
}
