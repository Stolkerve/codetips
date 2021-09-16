export const emailRules = [
  (v: string) => !!v || 'The email is required.',
  (v: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(v) || 'Invalid e-mail.'
  }
];

export const passwordRules = [
  (v: string) => !!v || "the password is required",
  (v: string) => (v && v.length > 8) || "The password most be greater than 8 characters",
]