import * as React from 'react'
import { Check, ChevronDown, X, Plus } from 'lucide-react'
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Checkbox } from "~/components/ui/checkbox"

type Tag = {
  id: string
  name: string
}

export function MultiTagSelectComponent() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [tags, setTags] = React.useState<Tag[]>([
    { id: 'stg', name: 'stg' },
    { id: 'dev', name: 'dev' },
  ])
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [newTagName, setNewTagName] = React.useState('')

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    )
  }

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const newTag = { id: newTagName.toLowerCase().replace(/\s+/g, '-'), name: newTagName.trim() }
      setTags(prev => [...prev, newTag])
      setSelectedTags(prev => [...prev, newTag.id])
      setNewTagName('')
    }
  }

  return (
    <div className="w-[300px]">
      <div
        className={cn(
          "relative flex items-center min-h-[38px] p-2 bg-white border border-gray-300 rounded cursor-pointer",
          isOpen && "border-b-0 rounded-b-none"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTags.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedTags.map(tagId => {
              const tag = tags.find(t => t.id === tagId)
              return tag ? (
                <span key={tag.id} className="bg-gray-200 text-gray-800 text-sm py-1 px-2 rounded">
                  {tag.name}
                  <button
                    className="ml-1 text-gray-600 hover:text-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTagToggle(tag.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null
            })}
          </div>
        ) : (
          <span className="text-gray-500">タグを選択または作成</span>
        )}
        <ChevronDown className="h-4 w-4 text-gray-500 ml-auto" />
      </div>
      {isOpen && (
        <div className="absolute w-[300px] bg-white border border-t-0 border-gray-300 rounded-b shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="新しいタグを作成"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="flex-grow"
              />
              <Button size="sm" onClick={handleCreateTag} disabled={!newTagName.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="max-h-[200px] overflow-y-auto">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Checkbox
                  checked={selectedTags.includes(tag.id)}
                  onCheckedChange={() => handleTagToggle(tag.id)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-800">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
