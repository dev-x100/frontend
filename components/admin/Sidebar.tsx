"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="w-[220px] bg-[#111] text-white p-5 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">
        Admin Panel
      </h2>

      <ul className="list-none p-0">
        <li>
          <Link href="/admin/dashboard" className="text-white">
            Dashboard
          </Link>
        </li>

        <li className="mt-2.5">
          <Link href="/admin/createwebinar" className="text-white">
            Create Webinar
          </Link>
        </li>
      </ul>
    </div>
  )
}
