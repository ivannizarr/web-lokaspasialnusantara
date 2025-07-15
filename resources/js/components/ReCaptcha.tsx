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
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // ganti pakai sitekey asli
      ref={recaptchaRef}
    />
  )
})

ReCaptchaWrapper.displayName = 'ReCaptchaWrapper'
export default ReCaptchaWrapper
