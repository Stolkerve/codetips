const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailRules = [
  requiredRule("email"),
  (v: string) => {
    return emailPattern.test(v) || 'Invalid e-mail.'
  }
];

export const passwordRules = [
  requiredRule("password"),
  (v: string) => (v && v.length > 8) || "The password most be greater than 8 characters",
]

export function requiredRule(name: string) {
  return (v: string) => !!v || `the ${name} is required`;
}

export function maxCharsRule(number: Number) {
  return (v: string) => (v && v.length <= number ) || `Max ${number} characters`;
}