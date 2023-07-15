export const ConvertWeathercodetoText = ({ weathercode }: { weathercode: number }) => {
  switch (weathercode) {
    case 0:
      return <span>晴れ</span>
    case 1:
    case 2:
    case 3:
      return <span>晴れ時々曇り</span>
    case 45:
    case 48:
      return <span>曇り</span>
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return <span>雨</span>
    case 71:
    case 73:
    case 75:
    case 77:
      return <span>雪</span>
    case 80:
    case 81:
    case 82:
      return <span>雨</span>
    case 85:
    case 86:
      return <span>雪</span>
    case 95:
    case 96:
    case 99:
      return <span>雨</span>
    default:
      return <span>-</span>
  }
}