'use client';

import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ label, values, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState('');

  function addValue() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addValue();
    } else if (event.key === 'Backspace' && draft === '' && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  function removeValue(value: string) {
    onChange(values.filter((item) => item !== value));
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-admin-body">{label}</label>
      <div className="flex flex-wrap gap-2 rounded-xl border border-admin-border bg-admin-surface-alt p-3">
        {values.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-1.5 rounded-lg bg-admin-primary-soft px-2.5 py-1 text-xs text-admin-primary"
          >
            {value}
            <button type="button" onClick={() => removeValue(value)} aria-label={`Remove ${value}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addValue}
          placeholder={placeholder}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-admin-ink outline-none placeholder:text-admin-muted"
        />
      </div>
    </div>
  );
}
