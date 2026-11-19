/**
 * Who is signed in, asked once.
 *
 * Several places need the answer at the same time — the route guard, the masthead, and
 * the parts of the overview page that stand in for the predictor when nobody is signed
 * in. Each calling `/api/v1/auth/me` separately would fire three identical requests on
 * every page load and could render three different answers mid-flight, so the promise
 * is shared and the result cached for the life of the page.
 *
 * `clearSession()` drops that cache. Call it after signing in or out, or the interface
 * keeps showing the previous answer until a full reload.
 */

import { useEffect, useState } from 'react'

import { api } from '@/lib/api'

export type SessionStatus = 'loading' | 'authenticated' | 'guest'

/**
 * Taken from what `/auth/me` actually returns rather than from the exported `User`
 * type: the two differ on which profile fields are optional, and pinning this to the
 * response keeps the difference from being papered over with a cast.
 */
export type SessionUser = Awaited<ReturnType<typeof api.me>>['user']

let pending: Promise<SessionUser | null> | null = null

function load(): Promise<SessionUser | null> {
  // A 401 is the expected answer for a visitor, not a failure, so it resolves to null
  // rather than rejecting. Anything else — the API being down, say — is also a guest
  // as far as the interface is concerned: it cannot prove a session either way, and
  // showing the signed-out state is the safe reading.
  if (!pending) pending = api.me().then((result) => result.user).catch(() => null)
  return pending
}

export function clearSession(): void {
  pending = null
}

export function useSession(): { status: SessionStatus; user: SessionUser | null } {
  const [status, setStatus] = useState<SessionStatus>('loading')
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    let active = true
    void load().then((result) => {
      if (!active) return
      setUser(result)
      setStatus(result ? 'authenticated' : 'guest')
    })
    return () => {
      active = false
    }
  }, [])

  return { status, user }
}

/**
 * Where to send someone after they sign in.
 *
 * Kept in sessionStorage rather than router state because the journey from a guarded
 * page to a usable session can be four steps — guard, register, verify email, sign in —
 * and threading a redirect through all of them is how it gets lost. Reads and writes
 * are wrapped because sessionStorage throws in a private window with site data blocked.
 */
const RETURN_KEY = 'inhibiepdt:return-to'

export function rememberReturnTo(path: string): void {
  try {
    sessionStorage.setItem(RETURN_KEY, path)
  } catch {
    /* no storage available; the caller falls back to the dashboard */
  }
}

export function takeReturnTo(): string | null {
  try {
    const value = sessionStorage.getItem(RETURN_KEY)
    if (value) sessionStorage.removeItem(RETURN_KEY)
    return value
  } catch {
    return null
  }
}
