import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { filterOptions, sortOptions } from '@/config';
import { ArrowUpDownIcon, KeyIcon } from 'lucide-react';
import React, { useState } from 'react';

const studentViewCoursesPage = () => {
  const [sort, setSort] = useState('');
  console.log('Sort Options:', sortOptions);
  console.log('Selected Sort:', sort);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>

      {/* Flex container for layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters Section */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="p-4 space-y-4 overflow-y-auto max-h-[400px]">
            {Object.keys(filterOptions).map((KeyItem) => (
              <div key={KeyItem} className="p-4 space-y-4">
                <h3 className="font-bold mb-3">{KeyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[KeyItem].map((option) => (
                    <Label
                      key={option.id}
                      className="flex font-medium items-center gap-3"
                    >
                      <Checkbox
                        checked={false}
                        onCheckedChange={() =>
                          handleFilterOnChange(KeyItem, option.id)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 ">
          {/* Sort By Dropdown */}
          <div className="flex justify-end items-center mb-4 gap-5 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-4 p-5"
                  size="sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className='text-sm text-black font-bold'>10 Results</span>
          </div>

          {/* Other content can go here */}
        </main>
      </div>
    </div>
  );
};

export default studentViewCoursesPage;