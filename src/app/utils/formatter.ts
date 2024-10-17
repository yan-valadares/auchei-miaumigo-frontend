export function phoneFormatter(phone: string): string {
  if (phone.length === 11) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`
  }

  if (phone.length === 10) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`
  }

  return phone
}

export function cepFormatter(cep: string): string {
  return `${cep.slice(0, 5)}-${cep.slice(5)}`
}
