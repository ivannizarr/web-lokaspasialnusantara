import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export type ReCaptchaRef = {
  getValue: () => string | null
  reset: () => void
}

const ReCaptchaWrapper = forwardRef<ReCaptchaRef>((_, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  useImperativeHandle(ref, () => ({
    getValue: () => recaptchaRef.current?.getValue() || null,
    reset: () => recaptchaRef.current?.reset()
  }))

  return (
    <ReCAPTCHA
      sitekey="6LeQnXsrAAAAANFieN4itVexbew087KcJDTWTLXn" // ganti pakai sitekey aslimu
      ref={recaptchaRef}
    />
  )
})

ReCaptchaWrapper.displayName = 'ReCaptchaWrapper'
export default ReCaptchaWrapper
