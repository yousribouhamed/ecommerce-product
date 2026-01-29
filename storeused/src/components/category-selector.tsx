'use client'

import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ChevronDownIcon,
    TagIcon,
} from '@heroicons/react/16/solid'

const categories = [
    { name: 'Electronics', id: 'electronics' },
    { name: 'Clothing', id: 'clothing' },
    { name: 'Home & Garden', id: 'home-garden' },
    { name: 'Books', id: 'books' },
    { name: 'Sports', id: 'sports' },
]

export function CategorySelector({ name = 'category', defaultValue = '' }: { name?: string, defaultValue?: string }) {
    const [selected, setSelected] = useState<string>(defaultValue)

    return (
        <div className="w-full">
            <input type="hidden" name={name} value={selected} />
            <Menu>
                <MenuButton className="inline-flex w-full items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5 text-sm/6 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none data-hover:bg-gray-50 data-open:bg-gray-50 data-focus:outline-2 data-focus:outline-indigo-600">
                    <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
                        {selected || 'Select a category'}
                    </span>
                    <ChevronDownIcon className="size-4 fill-gray-500" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom start"
                    className="w-[var(--button-width)] origin-top rounded-xl border border-gray-200 bg-white p-1 text-sm/6 text-gray-900 shadow-lg ring-1 ring-black/5 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50"
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id}>
                            <button
                                type="button"
                                onClick={() => setSelected(category.name)}
                                className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-100"
                            >
                                <TagIcon className="size-4 fill-gray-400 group-data-focus:fill-gray-500" />
                                {category.name}
                            </button>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    )
}
