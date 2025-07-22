import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TransaksiSection() {
  const { t } = useTranslation()

  const [transaksiList] = useState(() => [
    {
      id: generateId(),
      tanggal: '10 Juli 2025',
      deskripsi: t('transaksi.item1'),
      jumlah: 'Rp1.250.000',
    },
    {
      id: generateId(),
      tanggal: '5 Juli 2025',
      deskripsi: t('transaksi.item2'),
      jumlah: 'Rp500.000',
    },
    {
      id: generateId(),
      tanggal: '28 Juni 2025',
      deskripsi: t('transaksi.item3'),
      jumlah: 'Rp2.000.000',
    },
  ])

  return (
    <div className="bg-gray-700 text-white shadow rounded-lg p-8 flex flex-col items-center max-w-xxl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">
        {t('transaksi.title')}
      </h2>

      <div className="w-full border-t border-gray-600 pt-4 space-y-4 text-sm">
        {transaksiList.map((trx) => (
          <TransaksiItem
            key={trx.id}
            id={trx.id}
            tanggal={trx.tanggal}
            deskripsi={trx.deskripsi}
            jumlah={trx.jumlah}
          />
        ))}
      </div>
    </div>
  )
}

interface TransaksiItemProps {
  id: string
  tanggal: string
  deskripsi: string
  jumlah: string
}

function TransaksiItem({ id, tanggal, deskripsi, jumlah }: TransaksiItemProps) {
  const { t } = useTranslation()
  return (
    <div className="flex justify-between border-b border-gray-600 pb-2">
      <div>
        <p className="text-gray-300">{tanggal}</p>
        <p className="font-medium text-white">{deskripsi}</p>
        <p className="text-xs text-gray-400">
          {t('transaksi.id')}: {id}
        </p>
      </div>
      <div className="text-right">
        <p className="text-gray-300 font-semibold">{jumlah}</p>
        <button className="cursor-pointer text-sm text-sky-400 hover:text-yellow-400 hover:underline mt-1">
          {t('transaksi.detail')}
        </button>
      </div>
    </div>
  )
}

// ID generator sederhana dan unik per mount
function generateId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}
