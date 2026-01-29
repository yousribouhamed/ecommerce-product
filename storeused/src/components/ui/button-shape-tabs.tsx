'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Home', 'Docs', 'Components', 'Effects']

interface TabProps {
    text: string
    selected: boolean
    setSelected: (text: string) => void
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
    return (
        <button
            onClick={() => setSelected(text)}
            className={`${selected
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
                } relative rounded-md px-2 py-1 text-sm font-semibold transition-colors`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-md bg-primary"
                ></motion.span>
            )}
        </button>
    )
}

interface ButtonShapeTabsProps {
    tabs: string[]
    defaultTab?: string
    onTabChange?: (tab: string) => void
}

const ButtonShapeTabs = ({ tabs, defaultTab, onTabChange }: ButtonShapeTabsProps) => {
    const [selected, setSelected] = useState<string>(defaultTab || tabs[0])

    const handleSelect = (tab: string) => {
        setSelected(tab)
        onTabChange?.(tab)
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
                <Tab
                    text={tab}
                    selected={selected === tab}
                    setSelected={handleSelect}
                    key={tab}
                />
            ))}
        </div>
    )
}

export default ButtonShapeTabs
