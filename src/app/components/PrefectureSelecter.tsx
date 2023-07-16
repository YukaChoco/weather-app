
import { Prefectures } from '../entities/PrefecturesEntity'
import prefectureData from '../data/prefectureData'
import { City } from '../entities/CoordinatesEntity'

export const PrefectureSelecter = ({ location }: { location: City }) => {

  const PrefectureOption = prefectureData.map(prefecture => {
    return (
      <option key={prefecture.id} value={prefecture.id}>{prefecture.name}</option>
    )
  })

  return (
    <select>
      {PrefectureOption}
    </select>
  )
}
