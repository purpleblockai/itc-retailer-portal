import { Button } from "@/components/ui/button"

export function UIExample() {
  return (
    <div className="flex flex-col space-y-4 items-center p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold">UI Components Example</h2>
      <p className="text-gray-600">This is an example of how to use the UI components in this project.</p>
      <div className="flex space-x-2">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  )
}
