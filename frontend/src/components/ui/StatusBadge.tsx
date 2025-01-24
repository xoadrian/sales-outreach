import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import clsx from 'clsx'
import { CONTACT_STATUSES, ContactStatus } from '../../types/contact'
import { capitalize } from '../../utils/string'
import Select from './Select'

interface StatusBadgeProps {
  status: ContactStatus
  onStatusChange: (status: ContactStatus) => void
}

export const StatusBadge = ({ status, onStatusChange }: StatusBadgeProps) => {
  const statusStyles = {
    new: 'bg-green-100 text-green-800',
    contacted: 'bg-blue-100 text-blue-800',
    responded: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-purple-100 text-purple-800',
  }

  return (
    <Popover>
      {({ close }) => (
        <>
          <PopoverButton
            className={clsx('px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer', statusStyles[status])}
          >
            {capitalize(status)}
          </PopoverButton>

          <PopoverPanel className="absolute z-10 mt-1">
            <div className="bg-white rounded-md shadow-lg p-2 min-w-[150px]">
              <Select
                value={status}
                onChange={(value) => {
                  onStatusChange(value as ContactStatus)
                  close()
                }}
                options={CONTACT_STATUSES.map((s) => ({
                  value: s,
                  label: capitalize(s),
                }))}
              />
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}
