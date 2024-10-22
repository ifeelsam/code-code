"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { ProblemStatement } from '@/components/Editor/problemStatement'
import { CodeEditor } from '@/components/Editor/codeEditor'
import { TestCases } from '@/components/Editor/testCases'
import { TopBar } from '@/components/Editor/topBar'

export default function LeetCodeClone() {
  const [code, setCode] = useState('')
  const [testCases, setTestCases] = useState('')
  const [output, setOutput] = useState('')
  const [isProblemVisible, setIsProblemVisible] = useState(true)
  const [isTestCasesVisible, setIsTestCasesVisible] = useState(true)
  const [splitPosition, setSplitPosition] = useState(50) // 50% by default

  const problem = {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1]."
  }

  const handleRunTests = () => {
    setOutput(`Running tests...\n\nTest Case 1: Passed\nTest Case 2: Failed\n\nExecution time: 15ms`)
  }

  const handleSubmit = () => {
    setOutput(`Submitting solution...\n\nResult: Accepted\nRuntime: 52ms\nMemory Usage: 39.8 MB`)
  }

  const toggleProblemVisibility = () => {
    setIsProblemVisible(!isProblemVisible)
  }

  const toggleTestCasesVisibility = () => {
    setIsTestCasesVisible(!isTestCasesVisible)
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPosition = (e.clientX / window.innerWidth) * 100
    setSplitPosition(Math.min(Math.max(newPosition, 20), 80)) // Limit between 20% and 80%
  }, [])

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseMove])

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-white transition-all duration-300 ease-in-out ${isProblemVisible ? '' : 'w-0 overflow-hidden'}`}
        style={{ width: isProblemVisible ? `${splitPosition}%` : '0%' }}
      >
        <ProblemStatement
          title={problem.title}
          description={problem.description}
          example={problem.example}
          isVisible={isProblemVisible}
        />
      </div>
      {isProblemVisible && (
        <div
          className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
          onMouseDown={handleMouseDown}
        />
      )}
      <div
        className={`flex flex-col bg-gray-800 text-white transition-all duration-300 ease-in-out`}
        style={{ width: isProblemVisible ? `${100 - splitPosition}%` : '100%' }}
      >
        <TopBar
          onRunTests={handleRunTests}
          onSubmit={handleSubmit}
          toggleProblemVisibility={toggleProblemVisibility}
          toggleTestCasesVisibility={toggleTestCasesVisibility}
        />
        <CodeEditor code={code} setCode={setCode} />
        <TestCases
          testCases={testCases}
          setTestCases={setTestCases}
          output={output}
          isVisible={isTestCasesVisible}
          toggleVisibility={toggleTestCasesVisibility}
        />
      </div>
    </div>
  )
}
