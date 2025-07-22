import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export type ReCaptchaRef = {
  getValue: () => string | null
  reset: () => void
}

const ReCaptchaWrapper = forwardRef<ReCaptchaRef>((_, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [token, setToken] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    getValue: () => token,
    reset: () => {
      recaptchaRef.current?.reset()
      setToken(null)
    }
  }))

  return (
    <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    ref={recaptchaRef}
    onChange={(value) => setToken(value)}
  />
  )
})

ReCaptchaWrapper.displayName = 'ReCaptchaWrapper'
export default ReCaptchaWrapper
