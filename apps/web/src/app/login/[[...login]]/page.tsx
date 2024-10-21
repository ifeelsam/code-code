"use client"

import { userAtom } from '@/store/atoms/user'
import React from 'react'
import { useRecoilValue } from 'recoil'

export default function Login() {
  const user = useRecoilValue(userAtom)
  return (
    <div>you are loged in as {user.user}</div>
  )
}

