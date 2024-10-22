import React from 'react'
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
  return (
    <div className="flex-grow p-4 overflow-auto">
      <Textarea
        className="w-full h-full p-4 bg-gray-900 text-white font-mono resize-none focus:outline-none rounded-md"
        placeholder="Write your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  )
}
