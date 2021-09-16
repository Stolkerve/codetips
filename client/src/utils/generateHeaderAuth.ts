export default function generateHeaderAuth(token: string) {
  return {Authorization: "Bearer " + token}
}