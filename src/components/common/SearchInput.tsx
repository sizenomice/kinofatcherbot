import { memo, useCallback } from 'react'
import SearchIcon from '../icons/SearchIcon'
import CloseIcon from '../icons/CloseIcon'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  placeholder?: string
}

function SearchInput({ 
  value, 
  onChange, 
  onClear, 
  placeholder = 'Введите название фильма...' 
}: SearchInputProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, [onChange])

  const handleClear = useCallback(() => {
    onChange('')
    onClear?.()
  }, [onChange, onClear])

  return (
    <div className="search-container">
      <div className="search-form">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
          {value && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
              aria-label="Очистить поиск"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(SearchInput)

