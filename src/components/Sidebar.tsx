'use client'

import { useState } from 'react'

interface SidebarProps {
  sections: Array<{
    id: string
    title: string
    subsections?: Array<{
      id: string
      title: string
    }>
  }>
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

export default function Sidebar({ sections, activeSection, onSectionClick }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['1', '2', '3'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <nav className="sidebar w-64 h-screen fixed left-0 top-0 overflow-y-auto p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-2">
          Complete Gradle Tutorial
        </h1>
        <p className="text-sm opacity-80">
          Android Development Guide
        </p>
      </div>

      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.id}>
            <div
              className={`nav-item cursor-pointer flex items-center justify-between ${
                activeSection === section.id ? 'active' : ''
              }`}
              onClick={() => {
                onSectionClick(section.id)
                if (section.subsections) {
                  toggleSection(section.id)
                }
              }}
            >
              <span className="text-sm">{section.title}</span>
              {section.subsections && (
                <span className={`text-xs transition-transform ${
                  expandedSections.includes(section.id) ? 'rotate-90' : ''
                }`}>
                  ▶
                </span>
              )}
            </div>

            {section.subsections && expandedSections.includes(section.id) && (
              <div className="ml-4 mt-2 space-y-1">
                {section.subsections.map((subsection) => (
                  <div
                    key={subsection.id}
                    className={`nav-item cursor-pointer text-xs ${
                      activeSection === subsection.id ? 'active' : ''
                    }`}
                    onClick={() => onSectionClick(subsection.id)}
                  >
                    {subsection.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}