import React, { useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ProfileCardProps {
  user: {
    name: string
    email: string
    phone?: string
  }
  getInitial: (name: string) => string
}

export default function ProfileCard({ user, getInitial }: ProfileCardProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    password: '',
    photo: null as File | null,
  })

  const [editingField, setEditingField] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (field: string) => {
    setEditingField(null)
    console.log(`Updated ${field}:`, form[field as keyof typeof form])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setForm((prev) => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-gray-700 text-white shadow rounded-lg p-8 flex flex-col items-center max-w-xxl mx-auto">
      {/* Avatar */}
      <div className="h-24 w-24 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold text-2xl mb-4 overflow-hidden">
        {photoPreview ? (
          <img src={photoPreview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          getInitial(form.name)
        )}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-sky-400 hover:text-yellow-400 cursor-pointer text-sm underline mb-2"
      >
        {t('profile.chooseImage')}
      </button>
      <p className="text-xs text-gray-300 mb-4">
        {t('profile.maxSize')}
      </p>
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Data Items */}
      <div className="w-full border-t border-gray-600 pt-2">
        <div className="space-y-3 text-sm">
          <DataItem
            label={t('profile.name')}
            value={form.name}
            isEditing={editingField === 'name'}
            onChange={(e) => handleChange('name', e.target.value)}
            onEdit={() => setEditingField('name')}
            onSave={() => handleSave('name')}
          />
          <DataItem
            label={t('profile.email')}
            value={form.email}
            isEditing={editingField === 'email'}
            onChange={(e) => handleChange('email', e.target.value)}
            onEdit={() => setEditingField('email')}
            onSave={() => handleSave('email')}
          />
          <DataItem
            label={t('profile.phone')}
            value={form.phone || t('profile.notFilled')}
            isEditing={editingField === 'phone'}
            onChange={(e) => handleChange('phone', e.target.value)}
            onEdit={() => setEditingField('phone')}
            onSave={() => handleSave('phone')}
          />
          <DataItem
            label={t('profile.password')}
            value={form.password || '********'}
            isEditing={editingField === 'password'}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => handleChange('password', e.target.value)}
            onEdit={() => setEditingField('password')}
            onSave={() => handleSave('password')}
            showToggle
            showValue={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  )
}

type DataItemProps = {
  label: string
  value: string
  isEditing?: boolean
  type?: 'text' | 'password'
  onEdit?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave?: () => void
  showToggle?: boolean
  showValue?: boolean
  onToggle?: () => void
}

const DataItem = ({
  label,
  value,
  isEditing = false,
  type = 'text',
  onEdit,
  onChange,
  onSave,
  showToggle = false,
  showValue = false,
  onToggle,
}: DataItemProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between items-start border-b border-gray-600 pb-2">
      <div className="flex-1 pr-4">
        <p className="text-gray-300">{label}</p>
        {isEditing ? (
          <div className="flex gap-2 items-center mt-1 relative">
            <div className="relative w-full">
              <input
                type={type}
                value={value}
                onChange={onChange}
                className="bg-gray-600 text-white rounded px-2 py-1 text-sm w-full pr-8"
              />
              {showToggle && (
                <button
                  type="button"
                  onClick={onToggle}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showValue ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
            <button
              onClick={onSave}
              className="text-xs text-sky-400 hover:text-yellow-400 underline"
            >
              {t('profile.save')}
            </button>
          </div>
        ) : (
          <p className="font-medium text-white mt-1">{value}</p>
        )}
      </div>
      {!isEditing && onEdit && (
        <button
          onClick={onEdit}
          className="text-sky-400 hover:text-yellow-400 text-sm font-semibold mt-2 cursor-pointer"
        >
          {t('profile.edit')}
        </button>
      )}
    </div>
  )
}
